import React, { useState, useEffect } from 'react';
import { useOnboarding } from '../contexts/OnboardingContext';
import QuickOnboarding from './QuickOnboarding';
import OnboardingTour from './OnboardingTour';
import KYCPrompt from './KYCPrompt';

interface OnboardingFlowProps {
  children: React.ReactNode;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ children }) => {
  const { state } = useOnboarding();
  const [showTour, setShowTour] = useState(false);

  useEffect(() => {
    if (state.currentStep === 'tour' && !state.hasCompletedTour) {
      setShowTour(true);
    }
  }, [state.currentStep, state.hasCompletedTour]);

  const handleCloseTour = () => {
    setShowTour(false);
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
    </>
  );
};

export default OnboardingFlow;