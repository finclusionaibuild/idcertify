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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="p-6 border-b border-gray-200 bg-white rounded-t-2xl flex-shrink-0">
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

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
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
                      <div className="w-full h-full bg-white rounded-full scale-75"></div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{tier.description}</p>
                
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Requirements:</h4>
                  <ul className="space-y-1">
                    {tier.requirements.map((req, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-green-500 mr-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mb-3">
                  <h4 className="text-xs font-medium text-gray-700 mb-2">Features:</h4>
                  <ul className="space-y-1">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-xs text-gray-600">
                        <CheckCircle className="w-3 h-3 text-primary-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="text-xs text-gray-500">
                  Estimated time: {tier.time}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action Buttons - Fixed at Bottom */}
        <div className="p-6 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0">
          <div className="flex items-center justify-end space-x-3">
            <button
              onClick={handleSkip}
              className="bg-pink-50 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-pink-100 transition-colors border-2 border-pink-200"
            >
              Skip for now
            </button>
            <button
              onClick={handleStartKYC}
              className="flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Verification
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCPrompt;