import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import KYCProcess from './KYCProcess';
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  XCircle,
  User,
  Building2,
  ArrowRight,
  RefreshCw
} from 'lucide-react';

const KYCStatus: React.FC = () => {
  const { profile, isKYCRequired } = useAuth();
  const { state } = useOnboarding();
  const [showKYCProcess, setShowKYCProcess] = useState(false);

  if (!profile || !isKYCRequired()) {
    return null;
  }

  const getKYCStatusInfo = () => {
    const kycStatus = profile.kyc_status || 'none';
    const kycTier = state.kycTier;

    switch (kycStatus) {
      case 'verified':
        return {
          status: 'verified',
          title: 'KYC Verified',
          description: 'Your identity has been successfully verified',
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          action: null
        };
      case 'pending':
        return {
          status: 'pending',
          title: 'KYC Under Review',
          description: 'Your verification documents are being reviewed',
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
          action: 'update'
        };
      case 'rejected':
        return {
          status: 'rejected',
          title: 'KYC Rejected',
          description: 'Your verification was not approved. Please update your documents',
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          action: 'retry'
        };
      default:
        return {
          status: 'none',
          title: 'KYC Required',
          description: 'Complete your identity verification to access all features',
          icon: AlertCircle,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          action: 'start'
        };
    }
  };

  const getKYCTierInfo = () => {
    switch (state.kycTier) {
      case 'tier1':
        return {
          name: 'Tier 1',
          description: 'Basic verification completed',
          features: ['Document upload', 'Basic trust score', 'Wallet access', 'Verification requests', 'Attestation', 'Biobank']
        };
      case 'tier2':
        return {
          name: 'Tier 2',
          description: 'Enhanced verification completed',
          features: ['All Tier 1 features', 'Bulk operations', 'Verification center', 'Background checks', 'Staff management', 'Company profile', 'Billing', 'API keys', 'Documents']
        };
      case 'tier3':
        return {
          name: 'Tier 3',
          description: 'Complete verification completed',
          features: ['All previous features', 'API access', 'Advanced analytics', 'White-label options', 'Full platform access']
        };
      default:
        return {
          name: 'No Tier',
          description: 'Verification not completed',
          features: ['Limited access to basic features only']
        };
    }
  };

  const statusInfo = getKYCStatusInfo();
  const tierInfo = getKYCTierInfo();
  const StatusIcon = statusInfo.icon;

  const handleAction = () => {
    if (statusInfo.action === 'start' || statusInfo.action === 'retry' || statusInfo.action === 'update') {
      setShowKYCProcess(true);
    }
  };

  const getActionButton = () => {
    if (!statusInfo.action) return null;

    const buttonText = {
      start: 'Start KYC Verification',
      retry: 'Retry KYC Verification',
      update: 'Update KYC Information'
    };

    return (
      <button
        onClick={handleAction}
        className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
      >
        {buttonText[statusInfo.action]}
        <ArrowRight className="w-4 h-4 ml-2" />
      </button>
    );
  };

  return (
    <>
      <div className={`p-6 rounded-lg border ${statusInfo.borderColor} ${statusInfo.bgColor}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <div className={`p-2 rounded-full ${statusInfo.bgColor}`}>
              <StatusIcon className={`w-6 h-6 ${statusInfo.color}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <h3 className="text-lg font-semibold text-gray-900">{statusInfo.title}</h3>
                {profile.role === 'organisation' && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full">
                    <Building2 className="w-3 h-3 text-gray-600" />
                    <span className="text-xs text-gray-600">Organisation</span>
                  </div>
                )}
                {profile.role === 'individual' && (
                  <div className="flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full">
                    <User className="w-3 h-3 text-gray-600" />
                    <span className="text-xs text-gray-600">Individual</span>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-600 mb-4">{statusInfo.description}</p>
              
              {/* KYC Tier Information */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Verification Tier: {tierInfo.name}</h4>
                <p className="text-xs text-gray-600 mb-2">{tierInfo.description}</p>
                <div className="space-y-1">
                  {tierInfo.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              {getActionButton()}
            </div>
          </div>
          
          {/* Status Badge */}
          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
            statusInfo.status === 'verified' ? 'bg-green-100 text-green-800' :
            statusInfo.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            statusInfo.status === 'rejected' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {statusInfo.status.toUpperCase()}
          </div>
        </div>
      </div>

      {/* KYC Process Modal */}
      {showKYCProcess && (
        <KYCProcess
          isOpen={showKYCProcess}
          onClose={() => setShowKYCProcess(false)}
          onComplete={() => setShowKYCProcess(false)}
        />
      )}
    </>
  );
};

export default KYCStatus;
