import React, { useState, useEffect } from 'react';
import { useOnboarding } from '../contexts/OnboardingContext';
import QuickOnboarding from './QuickOnboarding';
import OnboardingTour from './OnboardingTour';
import KYCPrompt from './KYCPrompt';

// Define the onboarding steps - modify this array to change the progress bar
const ONBOARDING_STEPS = [
  { id: 1, label: 'Welcome', description: 'Get started with IDCertify' },
  { id: 2, label: 'Profile Setup', description: 'Complete your basic information' },
  { id: 3, label: 'Identity Verification', description: 'Verify your identity for full access' },
  { id: 4, label: 'Dashboard Tour', description: 'Learn about platform features' }
];

interface OnboardingFlowProps {
  children: React.ReactNode;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ children }) => {
  const { state } = useOnboarding();
  const [showTour, setShowTour] = useState(false);
  const totalSteps = ONBOARDING_STEPS.length;

  useEffect(() => {
    if (state.currentStep === 'tour' && !state.hasCompletedTour) {
      setShowTour(true);
    }
  }, [state.currentStep, state.hasCompletedTour]);

  const handleCloseTour = () => {
    setShowTour(false);
  };

  const handleTourComplete = () => {
    completeOnboarding();
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