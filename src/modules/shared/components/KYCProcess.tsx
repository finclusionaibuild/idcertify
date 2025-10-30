import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useToastMessages } from '../hooks/useToastMessages';
import { 
  Shield, 
  FileText, 
  Camera, 
  CheckCircle, 
  X, 
  Upload, 
  AlertCircle,
  Clock,
  User,
  Building2,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ArrowLeft,
  Loader2
} from 'lucide-react';

interface KYCStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  required: boolean;
}

interface KYCProcessProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const KYCProcess: React.FC<KYCProcessProps> = ({ isOpen, onClose, onComplete }) => {
  const { profile, updateProfile } = useAuth();
  const { state, setKYCTier } = useOnboarding();
  const { showKYCVerificationSuccess, showKYCVerificationError } = useToastMessages();
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File>>({});
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
    phoneNumber: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const kycSteps: KYCStep[] = [
    {
      id: 'personal-info',
      title: 'Personal Information',
      description: 'Provide your basic personal details',
      status: 'pending',
      required: true
    },
    {
      id: 'identity-document',
      title: 'Identity Document',
      description: 'Upload a government-issued ID',
      status: 'pending',
      required: true
    },
    {
      id: 'address-verification',
      title: 'Address Verification',
      description: 'Provide proof of address',
      status: 'pending',
      required: true
    },
    {
      id: 'selfie-verification',
      title: 'Selfie Verification',
      description: 'Take a photo for identity verification',
      status: 'pending',
      required: true
    },
    {
      id: 'additional-documents',
      title: 'Additional Documents',
      description: 'Upload any additional required documents',
      status: 'pending',
      required: false
    }
  ];

  useEffect(() => {
    if (profile) {
      setPersonalInfo({
        firstName: profile.first_name || '',
        lastName: profile.last_name || '',
        dateOfBirth: profile.date_of_birth || '',
        nationality: profile.nationality || '',
        phoneNumber: profile.phone_number || '',
        address: {
          street: profile.address?.street || '',
          city: profile.address?.city || '',
          state: profile.address?.state || '',
          zipCode: profile.address?.zip_code || '',
          country: profile.address?.country || ''
        }
      });
    }
  }, [profile]);

  const handleDocumentUpload = (stepId: string, file: File) => {
    setUploadedDocuments(prev => ({
      ...prev,
      [stepId]: file
    }));
  };

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddressChange = (field: string, value: string) => {
    setPersonalInfo(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const handleNext = async () => {
    if (currentStep < kycSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate KYC submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update profile with KYC information
      await updateProfile({
        first_name: personalInfo.firstName,
        last_name: personalInfo.lastName,
        date_of_birth: personalInfo.dateOfBirth,
        nationality: personalInfo.nationality,
        address: personalInfo.address,
        kyc_status: 'pending',
        kyc_submitted_at: new Date().toISOString()
      });

      // Set KYC tier based on user role
      const kycTier = profile?.role === 'organisation' ? 'tier2' : 'tier1';
      setKYCTier(kycTier);
      
      // Show success toast with confetti
      showKYCVerificationSuccess();
      
      onComplete();
    } catch (error) {
      console.error('KYC submission failed:', error);
      showKYCVerificationError();
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    const step = kycSteps[currentStep];
    
    switch (step.id) {
      case 'personal-info':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={personalInfo.firstName}
                  onChange={(e) => handlePersonalInfoChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={personalInfo.lastName}
                  onChange={(e) => handlePersonalInfoChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  value={personalInfo.dateOfBirth}
                  onChange={(e) => handlePersonalInfoChange('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nationality *
                </label>
                <input
                  type="text"
                  value={personalInfo.nationality}
                  onChange={(e) => handlePersonalInfoChange('nationality', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={personalInfo.phoneNumber}
                onChange={(e) => handlePersonalInfoChange('phoneNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
              />
            </div>
          </div>
        );

      case 'identity-document':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Upload Identity Document
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Please upload a clear photo of your government-issued ID (passport, driver's license, or national ID)
              </p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              {uploadedDocuments['identity-document'] ? (
                <div className="space-y-4">
                  <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                  <p className="text-sm text-gray-600">
                    {uploadedDocuments['identity-document'].name}
                  </p>
                  <button
                    onClick={() => setUploadedDocuments(prev => {
                      const newDocs = { ...prev };
                      delete newDocs['identity-document'];
                      return newDocs;
                    })}
                    className="text-sm text-red-600 hover:text-red-700"
                  >
                    Remove and upload different file
                  </button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 mb-4">
                    Drag and drop your ID document here, or click to browse
                  </p>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        handleDocumentUpload('identity-document', file);
                      }
                    }}
                    className="hidden"
                    id="identity-document-upload"
                  />
                  <label
                    htmlFor="identity-document-upload"
                    className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer"
                  >
                    Choose File
                  </label>
                </div>
              )}
            </div>
          </div>
        );

      case 'address-verification':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Address Verification
              </h3>
              <p className="text-sm text-gray-600">
                Please provide your current residential address
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  type="text"
                  value={personalInfo.address.street}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={personalInfo.address.city}
                    onChange={(e) => handleAddressChange('city', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State/Province *
                  </label>
                  <input
                    type="text"
                    value={personalInfo.address.state}
                    onChange={(e) => handleAddressChange('state', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ZIP/Postal Code *
                  </label>
                  <input
                    type="text"
                    value={personalInfo.address.zipCode}
                    onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  value={personalInfo.address.country}
                  onChange={(e) => handleAddressChange('country', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>
        );

      case 'selfie-verification':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Selfie Verification
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Please take a clear photo of your face for identity verification
              </p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Click to take a photo or upload an existing photo
              </p>
              <input
                type="file"
                accept="image/*"
                capture="user"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    handleDocumentUpload('selfie-verification', file);
                  }
                }}
                className="hidden"
                id="selfie-upload"
              />
              <label
                htmlFor="selfie-upload"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer"
              >
                Take Photo
              </label>
            </div>
          </div>
        );

      case 'additional-documents':
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Additional Documents (Optional)
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Upload any additional documents that may help with verification
              </p>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-sm text-gray-600 mb-4">
                Upload additional documents (optional)
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  files.forEach((file, index) => {
                    handleDocumentUpload(`additional-${index}`, file);
                  });
                }}
                className="hidden"
                id="additional-documents-upload"
              />
              <label
                htmlFor="additional-documents-upload"
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer"
              >
                Choose Files
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

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
                <h2 className="text-xl font-bold text-gray-900">KYC Verification Process</h2>
                <p className="text-sm text-gray-600">Complete your identity verification to access all features</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Steps - Fixed */}
        <div className="p-6 border-b border-gray-200 bg-white flex-shrink-0">
          <div className="flex items-center justify-between">
            {kycSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  index < currentStep
                    ? 'bg-green-500 text-white'
                    : index === currentStep
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {index < currentStep ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < kycSteps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {renderStepContent()}
        </div>

        {/* Navigation - Fixed at Bottom */}
        <div className="p-6 border-t border-gray-200 bg-white rounded-b-2xl flex-shrink-0">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'bg-pink-50 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-pink-100 transition-colors border-2 border-pink-200'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>
            
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`flex items-center px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : currentStep === kycSteps.length - 1 ? (
                <>
                  Submit KYC
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCProcess;
