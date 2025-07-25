import React, { useState } from 'react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Shield, FileText, Camera, CheckCircle, ArrowRight, X } from 'lucide-react';

const KYCPrompt: React.FC = () => {
  const { state, setCurrentStep, setKYCTier, completeOnboarding } = useOnboarding();
  const [selectedTier, setSelectedTier] = useState<'tier1' | 'tier2' | 'tier3'>('tier1');

  if (state.currentStep !== 'kyc-prompt') {
    return null;
  }

  const handleStartKYC = () => {
    setKYCTier(selectedTier);
    completeOnboarding();
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  const kycTiers = [
    {
      id: 'tier1' as const,
      name: 'KYC Tier 1',
      description: 'Basic verification with essential features',
      requirements: ['Government ID', 'Selfie verification'],
      features: ['Document upload', 'Basic trust score', 'Wallet access'],
      time: '5-10 minutes',
      recommended: true,
    },
    {
      id: 'tier2' as const,
      name: 'KYC Tier 2',
      description: 'Enhanced verification for advanced features',
      requirements: ['Government ID', 'Proof of address', 'Biometric verification'],
      features: ['All Tier 1 features', 'Attestations', 'Bulk operations'],
      time: '15-20 minutes',
      recommended: false,
    },
    {
      id: 'tier3' as const,
      name: 'KYC Tier 3',
      description: 'Complete verification for full platform access',
      requirements: ['All Tier 2 requirements', 'Background check', 'Reference verification'],
      features: ['All previous features', 'API access', 'White-label options'],
      time: '1-2 business days',
      recommended: false,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Complete Your Verification</h2>
                <p className="text-sm text-gray-600">Choose your verification level to unlock platform features</p>
              </div>
            </div>
            <button
              onClick={handleSkip}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {kycTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedTier === tier.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300'
                } ${tier.recommended ? 'ring-2 ring-success-200' : ''}`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.recommended && (
                  <div className="absolute -top-2 left-4 bg-success-500 text-white text-xs px-2 py-1 rounded-full">
                    Recommended
                  </div>
                )}
                
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{tier.name}</h3>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedTier === tier.id
                      ? 'border-primary-500 bg-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedTier === tier.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4">{tier.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">Requirements:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tier.requirements.map((req, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <FileText className="w-3 h-3" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-xs font-medium text-gray-700 mb-1">Unlocks:</h4>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {tier.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-success-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-xs text-gray-500">Time: {tier.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Skip for now
            </button>
            <button
              onClick={handleStartKYC}
              className="inline-flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start {kycTiers.find(t => t.id === selectedTier)?.name}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPrompt;