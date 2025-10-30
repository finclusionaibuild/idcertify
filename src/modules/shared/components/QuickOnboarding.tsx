import React, { useState } from 'react';
import { useOnboarding } from '../contexts/OnboardingContext';
import { Building2, User, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';

const QuickOnboarding: React.FC = () => {
  const { state, setCurrentStep, setUserType, setKYCTier } = useOnboarding();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organizationName: '',
    industry: '',
    role: '',
  });

  const handleUserTypeSelect = (type: 'individual' | 'organization') => {
    setUserType(type);
    setCurrentStep('quick-setup');
  };

  const handleQuickSetup = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate quick setup completion
    setCurrentStep('tour');
  };

  const handleSkipToTour = () => {
    setCurrentStep('tour');
  };

  if (state.currentStep === 'welcome') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 animate-slide-up">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to IDCertify</h2>
            <p className="text-gray-600">Let's get you started with secure digital identity verification</p>
          </div>
          
          <div className="space-y-4">
            <button
              onClick={() => handleUserTypeSelect('individual')}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 flex items-center space-x-3"
            >
              <User className="w-6 h-6 text-primary-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Individual</div>
                <div className="text-sm text-gray-600">Personal identity verification</div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
            </button>
            
            <button
              onClick={() => handleUserTypeSelect('organization')}
              className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all duration-200 flex items-center space-x-3"
            >
              <Building2 className="w-6 h-6 text-primary-600" />
              <div className="text-left">
                <div className="font-semibold text-gray-900">Organization</div>
                <div className="text-sm text-gray-600">Business verification & employee management</div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (state.currentStep === 'quick-setup') {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-8 max-w-lg w-full mx-4 animate-slide-up">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Quick Setup</h2>
            <p className="text-gray-600">
              {state.userType === 'individual' 
                ? 'Tell us a bit about yourself to personalize your experience'
                : 'Set up your organization profile to get started'
              }
            </p>
          </div>
          
          <form onSubmit={handleQuickSetup} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {state.userType === 'individual' ? 'Full Name' : 'Contact Name'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
            
            {state.userType === 'organization' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Organization Name</label>
                  <input
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => setFormData(prev => ({ ...prev, organizationName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select Industry</option>
                    <option value="fintech">FinTech</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="education">Education</option>
                    <option value="government">Government</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}
            
            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={handleSkipToTour}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Skip for now
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return null;
};

export default QuickOnboarding;