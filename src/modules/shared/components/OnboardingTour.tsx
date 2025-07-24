import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0)

  // Define tour steps
  const tourSteps = [
    {
      title: 'Welcome to IDCertify',
      description: 'This tour will guide you through the onboarding process and help you understand how to use our platform.'
    },
    {
      title: 'Step 1: Identity Verification',
      description: 'First, we\'ll verify your identity using your BVN. This helps us ensure the security of our platform.'
    },
    {
      title: 'Step 2: Additional Verification',
      description: 'Next, we\'ll verify your NIN to complete your identity verification process.'
    },
    {
      title: 'Step 3: Dashboard Access',
      description: 'Once verification is complete, you\'ll gain access to your personalized dashboard with all platform features.'
    }
  ]

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Last step, close the tour
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <CloseIcon className="w-5 h-5" />
        </button>

        {/* Step indicator */}
        <div className="flex items-center justify-center mb-4">
          {tourSteps.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full mx-1 ${
                index === currentStep ? 'bg-primary-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="text-center mb-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {tourSteps[currentStep].title}
          </h3>
          <p className="text-gray-600">
            {tourSteps[currentStep].description}
          </p>
        </div>

        {/* Navigation buttons */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ArrowBackIcon className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button
            onClick={nextStep}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            {currentStep === tourSteps.length - 1 ? (
              <>
                <CheckCircleIcon className="w-4 h-4 mr-2" />
                Finish
              </>
            ) : (
              <>
                Next
                <ArrowForwardIcon className="w-4 h-4 ml-2" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingTour