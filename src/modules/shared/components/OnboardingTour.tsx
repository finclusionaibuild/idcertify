import React, { useState, useEffect } from 'react'
import { useOnboarding } from '../contexts/OnboardingContext'
import { X, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

interface OnboardingTourProps {
  isOpen: boolean
  onClose: () => void
}

const OnboardingTour: React.FC<OnboardingTourProps> = ({ isOpen, onClose }) => {
  const { state, completeTour, setCurrentStep } = useOnboarding()
  const [currentStepLocal, setCurrentStepLocal] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const handleComplete = () => {
    completeTour()
    setCurrentStep('kyc-prompt')
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const handleSkip = () => {
    completeTour()
    setCurrentStep('kyc-prompt')
    setIsVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  // Tour steps based on user type
  const getTourSteps = () => {
    const baseSteps = [
      {
        target: '[data-tour="dashboard"]',
        title: 'Welcome to Your Dashboard',
        content: 'This is your main hub where you can see all your verification activities and important updates.',
      },
      {
        target: '[data-tour="trust-score"]',
        title: 'Trust Score',
        content: 'Your trust score reflects your verification level. Complete more verifications to increase it.',
      },
      {
        target: '[data-tour="documents"]',
        title: 'Document Vault',
        content: 'Securely store and manage your verification documents here.',
      },
    ]

    if (state.userType === 'organization') {
      return [
        ...baseSteps,
        {
          target: '[data-tour="staff"]',
          title: 'Staff Management',
          content: 'Manage your team members and their verification status from here.',
        },
        {
          target: '[data-tour="bulk-upload"]',
          title: 'Bulk Operations',
          content: 'Upload multiple documents or manage bulk verifications efficiently.',
        },
      ]
    }

    return baseSteps
  }

  const tourSteps = getTourSteps()

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

  if (!isOpen || !isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
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
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous
          </button>
          <button
            onClick={nextStep}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            {currentStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
            {currentStep < tourSteps.length - 1 && <ArrowRight className="w-4 h-4 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  )
}

export default OnboardingTour