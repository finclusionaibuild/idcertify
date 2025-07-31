import React from 'react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Lock, Shield, ArrowRight } from 'lucide-react';

interface FeatureGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requiredTier?: 'tier1' | 'tier2' | 'tier3';
}

const FeatureGate: React.FC<FeatureGateProps> = ({ 
  feature, 
  children, 
  fallback,
  requiredTier = 'tier1' 
}) => {
  const { canAccessFeature, state, setCurrentStep } = useOnboarding();

  if (canAccessFeature(feature)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const handleUpgrade = () => {
    setCurrentStep('kyc-prompt');
  };

  const tierNames = {
    tier1: 'KYC Tier 1',
    tier2: 'KYC Tier 2',
    tier3: 'KYC Tier 3',
  };

  return (
    <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
      <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Feature Locked</h3>
      <p className="text-gray-600 mb-4">
        This feature requires {tierNames[requiredTier]} verification to access.
      </p>
      <button
        onClick={handleUpgrade}
        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        <Shield className="w-4 h-4 mr-2" />
        Upgrade Verification
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    </div>
  );
};

export default FeatureGate;