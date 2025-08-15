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
  kycRequired: boolean;
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
  isKYCRequired: () => boolean;
  updateKYCRequirement: (userRole: string, userEmail?: string) => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

const initialState: OnboardingState = {
  currentStep: 'welcome',
  userType: null,
  kycTier: 'none',
  hasCompletedTour: false,
  isOnboardingComplete: false,
  showLimitedAccess: true,
  kycRequired: true,
};

// Feature access control based on KYC tier
const featureAccess = {
  none: ['dashboard', 'profile', 'basic-verification'],
  tier1: ['dashboard', 'profile', 'basic-verification', 'document-upload', 'trust-score', 'wallet-basic', 'verification-requests', 'attestation', 'biobank'],
  tier2: ['dashboard', 'profile', 'basic-verification', 'document-upload', 'trust-score', 'wallet-basic', 'attestation', 'bulk-upload', 'verification-center', 'background-check', 'staff-management', 'company-profile', 'billing', 'api-keys', 'documents'],
  tier3: ['dashboard', 'profile', 'basic-verification', 'document-upload', 'trust-score', 'wallet-basic', 'attestation', 'bulk-upload', 'api-access', 'advanced-analytics', 'white-label', 'all-features'],
};

interface OnboardingProviderProps {
  children: React.ReactNode;
  userProfile?: any;
}

export const OnboardingProvider: React.FC<OnboardingProviderProps> = ({ children, userProfile }) => {
  const [state, setState] = useState<OnboardingState>(() => {
    const saved = localStorage.getItem('onboarding-state');
    const savedState = saved ? JSON.parse(saved) : initialState;
    
    // Set KYC requirement based on user profile
    if (userProfile) {
      const isKYCRequired = userProfile.role !== 'admin';
      return {
        ...savedState,
        kycRequired: isKYCRequired,
        showLimitedAccess: isKYCRequired && savedState.kycTier === 'none'
      };
    }
    
    return savedState;
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
      showLimitedAccess: tier === 'none' && prev.kycRequired
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
    // If KYC is not required (Admin/Super Admin), allow all features
    if (!state.kycRequired) {
      return true;
    }
    
    return featureAccess[state.kycTier].includes(feature);
  };

  const isKYCRequired = (): boolean => {
    return state.kycRequired;
  };

  const updateKYCRequirement = (userRole: string, userEmail?: string) => {
    const isKYCRequired = userRole !== 'admin';
    setState(prev => ({
      ...prev,
      kycRequired: isKYCRequired,
      showLimitedAccess: isKYCRequired && prev.kycTier === 'none'
    }));
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
      isKYCRequired,
      updateKYCRequirement,
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