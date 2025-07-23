import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "@shared/contexts/AuthContext";
import { 
  Shield, 
  User, 
  Building, 
  CheckCircle, 
  ArrowRight, 
  FileText, 
  Upload, 
  Info, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react'
import OnboardingTour from '../components/OnboardingTour'

const Onboarding = () => {
  const { profile, updateProfile } = useAuth()
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [showTour, setShowTour] = useState(false)
  const [kycTier, setKycTier] = useState(0)
  const [formData, setFormData] = useState({
    bvn: '',
    nin: '',
    businessName: '',
    registrationNumber: '',
    registrationType: 'business_name',
    documentFile: null
  })

  const totalSteps = profile?.role === 'organisation' ? 4 : 3

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, documentFile: e.target.files?.[0] || null }))
    }
  }

  const handleNextStep = async () => {
    if (currentStep === totalSteps) {
      await completeOnboarding()
      return
    }
    setCurrentStep(prev => prev + 1)
  }

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const completeOnboarding = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update profile with onboarding completed
      await updateProfile({
        onboarding_completed: true,
        kyc_status: kycTier >= 2 ? 'verified' : 'in_progress'
      })
      
      // Navigate to dashboard
      navigate('/dashboard')
    } catch (error) {
      console.error('Error completing onboarding:', error)
    } finally {
      setLoading(false)
    }
  }

  const startTour = () => {
    setShowTour(true)
    // In a real implementation, this would trigger a product tour
    console.log('Starting product tour')
  }

  const completeTier1KYC = async () => {
    setLoading(true)
    try {
      // Simulate BVN validation API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setKycTier(1)
      setCurrentStep(prev => prev + 1)
    } catch (error) {
      console.error('Error validating BVN:', error)
    } finally {
      setLoading(false)
    }
  }

  const completeTier2KYC = async () => {
    setLoading(true)
    try {
      // Simulate NIN validation API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setKycTier(2)
      setCurrentStep(prev => prev + 1)
    } catch (error) {
      console.error('Error validating NIN:', error)
    } finally {
      setLoading(false)
    }
  }

  const completeTier3KYB = async () => {
    setLoading(true)
    try {
      // Simulate business registration validation API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setKycTier(3)
      setCurrentStep(prev => prev + 1)
    } catch (error) {
      console.error('Error validating business registration:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center p-4">
      {/* Tour Component */}
      <OnboardingTour 
        isOpen={showTour} 
        onClose={() => setShowTour(false)} 
      />
      
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary-600 p-6 text-white">
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Welcome to IDCertify</h1>
          </div>
          <p className="text-primary-100">
            Let's get you set up with your {profile?.role === 'organisation' ? 'organization' : 'individual'} account.
            Complete the following steps to access all features.
          </p>
          
          {/* Progress Bar */}
          <div className="mt-6 flex items-center">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <React.Fragment key={index}>
                <div 
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep > index + 1 
                      ? 'bg-green-500' 
                      : currentStep === index + 1 
                      ? 'bg-white text-primary-600' 
                      : 'bg-primary-400'
                  }`}
                >
                  {currentStep > index + 1 ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < totalSteps - 1 && (
                  <div 
                    className={`flex-1 h-1 ${
                      currentStep > index + 1 ? 'bg-green-500' : 'bg-primary-400'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Step Content */}
        <div className="p-8">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Welcome to IDCertify</h2>
              <p className="text-gray-600">
                Before you can access all features, we need to verify your identity.
                This helps us maintain a secure and trusted platform for all users.
              </p>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Why we need to verify your identity</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Identity verification helps prevent fraud and ensures that all users on our platform are who they claim to be.
                      Your information is securely stored and only used for verification purposes.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={startTour}
                  className="border border-primary-300 text-primary-700 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center"
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Take a Tour
                </button>
                <button
                  onClick={handleNextStep}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Tier 1 Verification - BVN Validation</h2>
              <p className="text-gray-600">
                Please provide your Bank Verification Number (BVN) for initial verification.
                This is the first step in our KYC process.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Verification Number (BVN)
                  </label>
                  <input
                    type="text"
                    name="bvn"
                    value={formData.bvn}
                    onChange={handleInputChange}
                    placeholder="Enter your 11-digit BVN"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    maxLength={11}
                  />
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900">Your data is secure</p>
                      <p className="text-sm text-yellow-700 mt-1">
                        We only use your BVN for verification purposes and do not store the actual number.
                        All verification is done through secure channels.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrevStep}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={completeTier1KYC}
                  disabled={!formData.bvn || formData.bvn.length !== 11 || loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <>
                      Verify BVN
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Tier 2 Verification - {profile?.role === 'organisation' ? 'NIN Validation' : 'NIN Validation'}
              </h2>
              <p className="text-gray-600">
                {profile?.role === 'organisation' 
                  ? 'Please provide your National Identification Number (NIN) for additional verification.'
                  : 'Please provide your National Identification Number (NIN) for additional verification.'}
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    National Identification Number (NIN)
                  </label>
                  <input
                    type="text"
                    name="nin"
                    value={formData.nin}
                    onChange={handleInputChange}
                    placeholder="Enter your 11-digit NIN"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    maxLength={11}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload NIN Slip (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag & drop your NIN slip or click to browse</p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="nin-upload"
                      accept="image/*,application/pdf"
                    />
                    <label
                      htmlFor="nin-upload"
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors inline-block cursor-pointer"
                    >
                      Select File
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrevStep}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={completeTier2KYC}
                  disabled={!formData.nin || formData.nin.length !== 11 || loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <>
                      Verify NIN
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          {currentStep === 4 && profile?.role === 'organisation' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Tier 3 Verification - Business Registration</h2>
              <p className="text-gray-600">
                Please provide your business registration details for KYB (Know Your Business) verification.
              </p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    placeholder="Enter your registered business name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Type
                  </label>
                  <select
                    name="registrationType"
                    value={formData.registrationType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="business_name">Business Name Registration</option>
                    <option value="cac">CAC Registration (RC Number)</option>
                    <option value="other">Other Government Registration</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    name="registrationNumber"
                    value={formData.registrationNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your registration number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Registration Certificate
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors">
                    <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Drag & drop your registration certificate or click to browse</p>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="cert-upload"
                      accept="image/*,application/pdf"
                    />
                    <label
                      htmlFor="cert-upload"
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors inline-block cursor-pointer"
                    >
                      Select File
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button
                  onClick={handlePrevStep}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={completeTier3KYB}
                  disabled={!formData.businessName || !formData.registrationNumber || loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <>
                      Verify Business
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          {/* Final Step - Completion */}
          {((currentStep === 3 && profile?.role === 'individual') || 
            (currentStep === 4 && profile?.role === 'organisation')) && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">Verification Complete!</h2>
                <p className="text-gray-600 mt-2">
                  Thank you for completing the verification process. You now have access to all features of the platform.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">What's Next?</p>
                    <p className="text-sm text-green-700 mt-1">
                      You'll be redirected to your dashboard where you can start using all the features of IDCertify.
                      If you have any questions, our support team is available to help.
                    </p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={completeOnboarding}
                disabled={loading}
                className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Onboarding