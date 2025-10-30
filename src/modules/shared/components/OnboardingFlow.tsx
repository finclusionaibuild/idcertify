import React, { useState, useEffect } from 'react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useAuth } from '../contexts/AuthContext';
import QuickOnboarding from './QuickOnboarding';
import OnboardingTour from './OnboardingTour';
import KYCPrompt from './KYCPrompt';
import KYCProcess from './KYCProcess';

interface OnboardingFlowProps {
  children: React.ReactNode;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ children }) => {
  const { state } = useOnboarding();
  const { profile, isKYCRequired } = useAuth();
  const [showTour, setShowTour] = useState(false);
  const [showKYCProcess, setShowKYCProcess] = useState(false);

  useEffect(() => {
    if (state.currentStep === 'tour' && !state.hasCompletedTour) {
      setShowTour(true);
    }
  }, [state.currentStep, state.hasCompletedTour]);

  useEffect(() => {
    // Show KYC process if user hasn't completed it and should go through it
    if (isKYCRequired() && state.kycTier === 'none' && state.isOnboardingComplete) {
      setShowKYCProcess(true);
    }
  }, [state.kycTier, state.isOnboardingComplete, profile, isKYCRequired]);

  const handleCloseTour = () => {
    setShowTour(false);
  };

  const handleKYCComplete = () => {
    setShowKYCProcess(false);
  };

  const handleKYCClose = () => {
    setShowKYCProcess(false);
  };

  return (
    <>
      {children}
      
      {/* Onboarding Components */}
      {(state.currentStep === 'welcome' || state.currentStep === 'quick-setup') && (
        <QuickOnboarding />
      )}
      
      {showTour && (
        <OnboardingTour isOpen={showTour} onClose={handleCloseTour} />
      )}
      
      {state.currentStep === 'kyc-prompt' && (
        <KYCPrompt />
      )}

      {/* KYC Process for all users except Admin/Super Admin */}
      {showKYCProcess && (
        <KYCProcess 
          isOpen={showKYCProcess} 
          onClose={handleKYCClose}
          onComplete={handleKYCComplete}
        />
      )}
    </>
  );
};

export default OnboardingFlow;