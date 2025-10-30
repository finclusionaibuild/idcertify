import React from 'react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { AlertCircle, Shield, ArrowRight } from 'lucide-react';

const LimitedAccessBanner: React.FC = () => {
  const { state, setCurrentStep } = useOnboarding();

  if (!state.showLimitedAccess || state.kycTier !== 'none') {
    return null;
  }

  const handleStartKYC = () => {
    setCurrentStep('kyc-prompt');
  };

  return (
    <div className="bg-gradient-to-r from-warning-50 to-warning-100 border border-warning-200 rounded-lg p-4 mb-6">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertCircle className="w-5 h-5 text-warning-600 mt-0.5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="text-sm font-semibold text-warning-800">Limited Access Mode</h3>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-warning-200 text-warning-800">
              Tier 0
            </span>
          </div>
          <p className="text-sm text-warning-700 mb-3">
            You're currently using a limited version of IDCertify. Complete KYC Tier 1 verification to unlock full features including document uploads, trust score tracking, and wallet access.
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleStartKYC}
              className="inline-flex items-center px-3 py-1.5 bg-warning-600 text-white text-sm font-medium rounded-md hover:bg-warning-700 transition-colors"
            >
              <Shield className="w-4 h-4 mr-1.5" />
              Start KYC Verification
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
            <div className="text-xs text-warning-600">
              ✓ Quick process • ✓ Secure • ✓ Instant access
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LimitedAccessBanner;