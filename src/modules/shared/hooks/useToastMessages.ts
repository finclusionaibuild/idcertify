import { useToast } from '../contexts/ToastContext'

export const useToastMessages = () => {
  const { addToast } = useToast()

  const showSuccess = (title: string, message?: string, showConfetti = false) => {
    addToast({
      type: 'success',
      title,
      message,
      showConfetti,
      duration: 5000
    })
  }

  const showError = (title: string, message?: string) => {
    addToast({
      type: 'error',
      title,
      message,
      duration: 7000
    })
  }

  const showWarning = (title: string, message?: string) => {
    addToast({
      type: 'warning',
      title,
      message,
      duration: 6000
    })
  }

  const showInfo = (title: string, message?: string) => {
    addToast({
      type: 'info',
      title,
      message,
      duration: 5000
    })
  }

  // Predefined success messages with confetti
  const showKYCVerificationSuccess = () => {
    showSuccess(
      'KYC Verification Complete! 🎉',
      'Your identity has been successfully verified. You now have full access to all platform features.',
      true
    )
  }

  const showTransactionSuccess = (amount?: string, type?: string) => {
    const title = type ? `${type} Successful! 🎉` : 'Transaction Successful! 🎉'
    const message = amount 
      ? `Your ${type?.toLowerCase() || 'transaction'} of ${amount} has been completed successfully.`
      : 'Your transaction has been completed successfully.'
    
    showSuccess(title, message, true)
  }

  const showPaymentSuccess = (amount?: string) => {
    showSuccess(
      'Payment Successful! 🎉',
      amount ? `Payment of ${amount} has been processed successfully.` : 'Payment has been processed successfully.',
      true
    )
  }

  const showBackupSuccess = () => {
    showSuccess(
      'Backup Created Successfully! 🎉',
      'Your system backup has been created and stored securely.',
      true
    )
  }

  const showRecoverySuccess = () => {
    showSuccess(
      'Recovery Completed! 🎉',
      'System recovery has been completed successfully.',
      true
    )
  }

  const showProfileUpdateSuccess = () => {
    showSuccess(
      'Profile Updated! 🎉',
      'Your profile information has been updated successfully.',
      true
    )
  }

  const showDocumentUploadSuccess = () => {
    showSuccess(
      'Document Uploaded! 🎉',
      'Your document has been uploaded and is being processed.',
      true
    )
  }

  const showVerificationRequestSuccess = () => {
    showSuccess(
      'Verification Request Submitted! 🎉',
      'Your verification request has been submitted successfully.',
      true
    )
  }

  // Predefined error messages
  const showKYCVerificationError = () => {
    showError(
      'KYC Verification Failed',
      'There was an issue with your verification. Please try again or contact support.'
    )
  }

  const showTransactionError = () => {
    showError(
      'Transaction Failed',
      'Your transaction could not be completed. Please check your details and try again.'
    )
  }

  const showPaymentError = () => {
    showError(
      'Payment Failed',
      'Your payment could not be processed. Please check your payment method and try again.'
    )
  }

  const showUploadError = () => {
    showError(
      'Upload Failed',
      'There was an issue uploading your file. Please try again or contact support.'
    )
  }

  const showNetworkError = () => {
    showError(
      'Network Error',
      'Unable to connect to the server. Please check your internet connection and try again.'
    )
  }

  // Predefined warning messages
  const showSessionExpiryWarning = () => {
    showWarning(
      'Session Expiring Soon',
      'Your session will expire in 5 minutes. Please save your work.'
    )
  }

  const showMaintenanceWarning = () => {
    showWarning(
      'Scheduled Maintenance',
      'The platform will be under maintenance in 30 minutes. Please save your work.'
    )
  }

  // Predefined info messages
  const showProcessingInfo = () => {
    showInfo(
      'Processing',
      'Your request is being processed. This may take a few moments.'
    )
  }

  const showSavingInfo = () => {
    showInfo(
      'Saving Changes',
      'Your changes are being saved automatically.'
    )
  }

  return {
    // Generic methods
    showSuccess,
    showError,
    showWarning,
    showInfo,
    
    // Success messages with confetti
    showKYCVerificationSuccess,
    showTransactionSuccess,
    showPaymentSuccess,
    showBackupSuccess,
    showRecoverySuccess,
    showProfileUpdateSuccess,
    showDocumentUploadSuccess,
    showVerificationRequestSuccess,
    
    // Error messages
    showKYCVerificationError,
    showTransactionError,
    showPaymentError,
    showUploadError,
    showNetworkError,
    
    // Warning messages
    showSessionExpiryWarning,
    showMaintenanceWarning,
    
    // Info messages
    showProcessingInfo,
    showSavingInfo
  }
}
