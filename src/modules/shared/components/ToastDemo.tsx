import React from 'react'
import { useToastMessages } from '../hooks/useToastMessages'

const ToastDemo: React.FC = () => {
  const {
    showKYCVerificationSuccess,
    showTransactionSuccess,
    showPaymentSuccess,
    showBackupSuccess,
    showRecoverySuccess,
    showProfileUpdateSuccess,
    showDocumentUploadSuccess,
    showVerificationRequestSuccess,
    showKYCVerificationError,
    showTransactionError,
    showPaymentError,
    showUploadError,
    showNetworkError,
    showSessionExpiryWarning,
    showMaintenanceWarning,
    showProcessingInfo,
    showSavingInfo,
    showSuccess,
    showError,
    showWarning,
    showInfo
  } = useToastMessages()

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Toast Notification Demo</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Success Messages with Confetti */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Success Messages (with Confetti)</h2>
            <div className="space-y-3">
              <button
                onClick={showKYCVerificationSuccess}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                KYC Verification Success
              </button>
              <button
                onClick={() => showTransactionSuccess('$1,000', 'Payment')}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Transaction Success
              </button>
              <button
                onClick={() => showPaymentSuccess('$500')}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Payment Success
              </button>
              <button
                onClick={showBackupSuccess}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Backup Success
              </button>
              <button
                onClick={showRecoverySuccess}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Recovery Success
              </button>
              <button
                onClick={showProfileUpdateSuccess}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Profile Update Success
              </button>
              <button
                onClick={showDocumentUploadSuccess}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Document Upload Success
              </button>
              <button
                onClick={showVerificationRequestSuccess}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Verification Request Success
              </button>
            </div>
          </div>

          {/* Error Messages */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Error Messages</h2>
            <div className="space-y-3">
              <button
                onClick={showKYCVerificationError}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                KYC Verification Error
              </button>
              <button
                onClick={showTransactionError}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Transaction Error
              </button>
              <button
                onClick={showPaymentError}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Payment Error
              </button>
              <button
                onClick={showUploadError}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Upload Error
              </button>
              <button
                onClick={showNetworkError}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Network Error
              </button>
            </div>
          </div>

          {/* Warning Messages */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Warning Messages</h2>
            <div className="space-y-3">
              <button
                onClick={showSessionExpiryWarning}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Session Expiry Warning
              </button>
              <button
                onClick={showMaintenanceWarning}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Maintenance Warning
              </button>
            </div>
          </div>

          {/* Info Messages */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Info Messages</h2>
            <div className="space-y-3">
              <button
                onClick={showProcessingInfo}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Processing Info
              </button>
              <button
                onClick={showSavingInfo}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Saving Info
              </button>
            </div>
          </div>

          {/* Custom Messages */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Custom Messages</h2>
            <div className="space-y-3">
              <button
                onClick={() => showSuccess('Custom Success! 🎉', 'This is a custom success message with confetti!', true)}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Custom Success (with Confetti)
              </button>
              <button
                onClick={() => showError('Custom Error', 'This is a custom error message')}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Custom Error
              </button>
              <button
                onClick={() => showWarning('Custom Warning', 'This is a custom warning message')}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Custom Warning
              </button>
              <button
                onClick={() => showInfo('Custom Info', 'This is a custom info message')}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Custom Info
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => {
                  showKYCVerificationSuccess()
                  setTimeout(() => showTransactionSuccess('$2,500', 'Transfer'), 1000)
                  setTimeout(() => showPaymentSuccess('$750'), 2000)
                }}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Multiple Success Messages
              </button>
              <button
                onClick={() => {
                  showProcessingInfo()
                  setTimeout(() => showSuccess('Process Complete! 🎉', 'All operations completed successfully!', true), 2000)
                }}
                className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Process Flow Demo
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Toast Notifications</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Multiple types: Success, Error, Warning, Info</li>
                <li>• Auto-dismiss with configurable duration</li>
                <li>• Manual dismiss with close button</li>
                <li>• Smooth animations and transitions</li>
                <li>• Responsive design for all screen sizes</li>
                <li>• High z-index to appear above all content</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Confetti Effects</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Triggered automatically with success toasts</li>
                <li>• 150 colorful particles with physics</li>
                <li>• 3-second duration with smooth animation</li>
                <li>• Gravity and air resistance simulation</li>
                <li>• Non-intrusive (pointer-events: none)</li>
                <li>• Optimized performance with requestAnimationFrame</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToastDemo
