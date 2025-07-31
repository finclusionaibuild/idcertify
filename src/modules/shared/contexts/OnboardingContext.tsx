import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserType = 'individual' | 'organization';
export type KYCTier = 'none' | 'tier1' | 'tier2' | 'tier3';
export type OnboardingStep = 'welcome' | 'user-type' | 'quick-setup' | 'tour' | 'kyc-prompt' | 'completed';

interface OnboardingState {
  currentStep: OnboardingStep;
  userType: UserType | null;
  kycTier: KYCTier;
  hasCompletedTour: boolean;
  isOnboardingComplete: boolean;
  showLimitedAccess: boolean;
}

interface OnboardingContextType {
  state: OnboardingState;
  setCurrentStep: (step: OnboardingStep) => void;
  setUserType: (type: UserType) => void;
  setKYCTier: (tier: KYCTier) => void;
  completeOnboarding: () => void;
  completeTour: () => void;
  resetOnboarding: () => void;
  canAccessFeature: (feature: string) => boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialState: OnboardingState = {
  currentStep: 'welcome',
  userType: null,
  kycTier: 'none',
  hasCompletedTour: false,
  isOnboardingComplete: false,
  showLimitedAccess: true,
};

// Feature access control based on KYC tier
const featureAccess = {
  none: ['dashboard', 'profile', 'basic-verification'],
  tier1: ['dashboard', 'profile', 'basic-verification', 'document-upload', 'trust-score', 'wallet-basic'],
  tier2: ['dashboard', 'profile', 'basic-verification', 'document-upload', 'trust-score', 'wallet-basic', 'attestation', 'bulk-upload'],
  tier3: ['dashboard', 'profile', 'basic-verification', 'document-upload', 'trust-score', 'wallet-basic', 'attestation', 'bulk-upload', 'api-access', 'advanced-analytics', 'white-label'],
};

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<OnboardingState>(() => {
    const saved = localStorage.getItem('onboarding-state');
    return saved ? JSON.parse(saved) : initialState;
  });

  useEffect(() => {
    localStorage.setItem('onboarding-state', JSON.stringify(state));
  }, [state]);

  const setCurrentStep = (step: OnboardingStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const setUserType = (type: UserType) => {
    setState(prev => ({ ...prev, userType: type }));
  };

  const setKYCTier = (tier: KYCTier) => {
    setState(prev => ({ 
      ...prev, 
      kycTier: tier,
      showLimitedAccess: tier === 'none'
    }));
  };

  const completeOnboarding = () => {
    setState(prev => ({ 
      ...prev, 
      isOnboardingComplete: true,
      currentStep: 'completed'
    }));
  };

  const completeTour = () => {
    setState(prev => ({ ...prev, hasCompletedTour: true }));
  };

  const resetOnboarding = () => {
    setState(initialState);
    localStorage.removeItem('onboarding-state');
  };

  const canAccessFeature = (feature: string): boolean => {
    return featureAccess[state.kycTier].includes(feature);
  };

  return (
    <OnboardingContext.Provider value={{
      state,
      setCurrentStep,
      setUserType,
      setKYCTier,
      completeOnboarding,
      completeTour,
      resetOnboarding,
      canAccessFeature,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
};