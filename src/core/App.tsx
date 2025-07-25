import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../modules/shared/contexts/AuthContext';
import AuthGuard from '../modules/shared/components/AuthGuard';
import Layout from '../modules/shared/components/Layout';
import DemoLogin from '../modules/shared/DemoLogin';

// User modules
import IndividualDashboard from '../modules/user/IndividualDashboard';
import OrganisationDashboard from '../modules/user/OrganisationDashboard';
import Dashboard from '../modules/user/Dashboard';
import DocumentVault from '../modules/user/DocumentVault';
import VerificationCenter from '../modules/user/VerificationCenter';
import TrustScoreAnalytics from '../modules/user/TrustScoreAnalytics';
import AttestationEndorsement from '../modules/user/AttestationEndorsement';
import BulkUpload from '../modules/user/BulkUpload';
import BulkHistoricalUpload from '../modules/user/BulkHistoricalUpload';
import CompanyProfile from '../modules/user/CompanyProfile';
import StaffManagement from '../modules/user/StaffManagement';
import Settings from '../modules/user/Settings';
import Onboarding from '../modules/user/Onboarding';
import Auth from '../modules/user/Auth';
import Wallet from '../modules/user/Wallet';
import ApiKeys from '../modules/user/ApiKeys';
import Billing from '../modules/user/Billing';

// Admin modules
import SuperAdminDashboard from '../modules/admin/SuperAdminDashboard';
import AdminUserManagement from '../modules/admin/AdminUserManagement';
import AdminOrganisationManagement from '../modules/admin/AdminOrganisationManagement';
import AdminVerificationManagement from '../modules/admin/AdminVerificationManagement';
import AdminReportAnalytics from '../modules/admin/AdminReportAnalytics';
import AdminSystemSettings from '../modules/admin/AdminSystemSettings';
import AdminSecurityCenter from '../modules/admin/AdminSecurityCenter';
import AdminBackupRecovery from '../modules/admin/AdminBackupRecovery';
import AdminDeveloperTools from '../modules/admin/AdminDeveloperTools';
import AdminAnalytics from '../modules/admin/AdminAnalytics';
import CompanyManagement from '../modules/admin/CompanyManagement';
import ProfileManagement from '../modules/admin/ProfileManagement';
import KYC_KYB_Management from '../modules/admin/KYC_KYB_Management';
import SureAMLManagement from '../modules/admin/SureAMLManagement';
import SureComplianceManagement from '../modules/admin/SureComplianceManagement';
import RegionalManagement from '../modules/admin/RegionalManagement';
import EmployerManagement from '../modules/admin/EmployerManagement';
import SystemHealthCheck from '../modules/admin/SystemHealthCheck';
import DownTimeTracker from '../modules/admin/DownTimeTracker';
import RBACManagement from '../modules/admin/RBACManagement';
import HelpSupport from '../modules/admin/HelpSupport';
import SubscriptionManagement from '../modules/admin/SubscriptionManagement';
import SystemLogConfiguration from '../modules/admin/SystemLogConfiguration';
import DataMonitoringManagement from '../modules/admin/DataMonitoringManagement';
import EmployeeManagementSystem from '../modules/admin/EmployeeManagementSystem';
import AdminChatManagement from '../modules/admin/AdminChatManagement';
import AdminTicketingSystem from '../modules/admin/AdminTicketingSystem';
import AdminApprovalWorkflow from '../modules/admin/AdminApprovalWorkflow';
import AdminEscrowManagement from '../modules/admin/AdminEscrowManagement';
import AdminWalletManagement from '../modules/admin/AdminWalletManagement';
import AdminRewardManagement from '../modules/admin/AdminRewardManagement';
import AdminContentManagement from '../modules/admin/AdminContentManagement';
import AdminDisputeManagement from '../modules/admin/AdminDisputeManagement';
import AdminRatingsManagement from '../modules/admin/AdminRatingsManagement';
import AdminReferralManagement from '../modules/admin/AdminReferralManagement';
import AdminTransactionManagement from '../modules/admin/AdminTransactionManagement';
import AdminNotificationManagement from '../modules/admin/AdminNotificationManagement';
import AdminIntegrationManagement from '../modules/admin/AdminIntegrationManagement';
import AdminDatabaseManagement from '../modules/admin/AdminDatabaseManagement';
import AdminDocumentManagement from '../modules/admin/AdminDocumentManagement';
import AdminEmailTemplateManagement from '../modules/admin/AdminEmailTemplateManagement';
import AdminMultiRegionalManagement from '../modules/admin/AdminMultiRegionalManagement';
import AdminWhiteLabelCustomization from '../modules/admin/AdminWhiteLabelCustomization';
import AdminHistoricalDataManagement from '../modules/admin/AdminHistoricalDataManagement';
import AdminBackgroundCheckManagement from '../modules/admin/AdminBackgroundCheckManagement';
import AdminTicketingSystemManagement from '../modules/admin/AdminTicketingSystemManagement';
import AdminWhiteLabellingCustomization from '../modules/admin/AdminWhiteLabellingCustomization';

// Shared modules
import VerificationRequests from '../modules/shared/VerificationRequests';
import TrustScore from '../modules/shared/TrustScore';
import Attestation from '../modules/shared/Attestation';
import BackgroundCheck from '../modules/shared/BackgroundCheck';
import Biobank from '../modules/shared/Biobank';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<DemoLogin />} />
          <Route path="/auth" element={<Auth />} />
          
          {/* Protected routes */}
          <Route path="/" element={
            <AuthGuard>
              <Layout />
            </AuthGuard>
          }>
            {/* Default redirect */}
            <Route index element={<Navigate to="/dashboard" replace />} />
            
            {/* User routes */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="individual-dashboard" element={<IndividualDashboard />} />
            <Route path="organisation-dashboard" element={<OrganisationDashboard />} />
            <Route path="document-vault" element={<DocumentVault />} />
            <Route path="verification-center" element={<VerificationCenter />} />
            <Route path="trust-score-analytics" element={<TrustScoreAnalytics />} />
            <Route path="attestation-endorsement" element={<AttestationEndorsement />} />
            <Route path="bulk-upload" element={<BulkUpload />} />
            <Route path="bulk-historical-upload" element={<BulkHistoricalUpload />} />
            <Route path="company-profile" element={<CompanyProfile />} />
            <Route path="staff-management" element={<StaffManagement />} />
            <Route path="settings" element={<Settings />} />
            <Route path="onboarding" element={<Onboarding />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="api-keys" element={<ApiKeys />} />
            <Route path="billing" element={<Billing />} />
            
            {/* Admin routes */}
            <Route path="admin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="admin/user-management" element={<AdminUserManagement />} />
            <Route path="admin/organisation-management" element={<AdminOrganisationManagement />} />
            <Route path="admin/verification-management" element={<AdminVerificationManagement />} />
            <Route path="admin/report-analytics" element={<AdminReportAnalytics />} />
            <Route path="admin/system-settings" element={<AdminSystemSettings />} />
            <Route path="admin/security-center" element={<AdminSecurityCenter />} />
            <Route path="admin/backup-recovery" element={<AdminBackupRecovery />} />
            <Route path="admin/developer-tools" element={<AdminDeveloperTools />} />
            <Route path="admin/analytics" element={<AdminAnalytics />} />
            <Route path="admin/company-management" element={<CompanyManagement />} />
            <Route path="admin/profile-management" element={<ProfileManagement />} />
            <Route path="admin/kyc-kyb-management" element={<KYC_KYB_Management />} />
            <Route path="admin/sure-aml-management" element={<SureAMLManagement />} />
            <Route path="admin/sure-compliance-management" element={<SureComplianceManagement />} />
            <Route path="admin/regional-management" element={<RegionalManagement />} />
            <Route path="admin/employer-management" element={<EmployerManagement />} />
            <Route path="admin/system-health-check" element={<SystemHealthCheck />} />
            <Route path="admin/downtime-tracker" element={<DownTimeTracker />} />
            <Route path="admin/rbac-management" element={<RBACManagement />} />
            <Route path="admin/help-support" element={<HelpSupport />} />
            <Route path="admin/subscription-management" element={<SubscriptionManagement />} />
            <Route path="admin/system-log-configuration" element={<SystemLogConfiguration />} />
            <Route path="admin/data-monitoring-management" element={<DataMonitoringManagement />} />
            <Route path="admin/employee-management-system" element={<EmployeeManagementSystem />} />
            <Route path="admin/chat-management" element={<AdminChatManagement />} />
            <Route path="admin/ticketing-system" element={<AdminTicketingSystem />} />
            <Route path="admin/approval-workflow" element={<AdminApprovalWorkflow />} />
            <Route path="admin/escrow-management" element={<AdminEscrowManagement />} />
            <Route path="admin/wallet-management" element={<AdminWalletManagement />} />
            <Route path="admin/reward-management" element={<AdminRewardManagement />} />
            <Route path="admin/content-management" element={<AdminContentManagement />} />
            <Route path="admin/dispute-management" element={<AdminDisputeManagement />} />
            <Route path="admin/ratings-management" element={<AdminRatingsManagement />} />
            <Route path="admin/referral-management" element={<AdminReferralManagement />} />
            <Route path="admin/transaction-management" element={<AdminTransactionManagement />} />
            <Route path="admin/notification-management" element={<AdminNotificationManagement />} />
            <Route path="admin/integration-management" element={<AdminIntegrationManagement />} />
            <Route path="admin/database-management" element={<AdminDatabaseManagement />} />
            <Route path="admin/document-management" element={<AdminDocumentManagement />} />
            <Route path="admin/email-template-management" element={<AdminEmailTemplateManagement />} />
            <Route path="admin/multi-regional-management" element={<AdminMultiRegionalManagement />} />
            <Route path="admin/white-label-customization" element={<AdminWhiteLabelCustomization />} />
            <Route path="admin/historical-data-management" element={<AdminHistoricalDataManagement />} />
            <Route path="admin/background-check-management" element={<AdminBackgroundCheckManagement />} />
            <Route path="admin/ticketing-system-management" element={<AdminTicketingSystemManagement />} />
            <Route path="admin/white-labelling-customization" element={<AdminWhiteLabellingCustomization />} />
            
            {/* Shared routes */}
            <Route path="verification-requests" element={<VerificationRequests />} />
            <Route path="trust-score" element={<TrustScore />} />
            <Route path="attestation" element={<Attestation />} />
            <Route path="background-check" element={<BackgroundCheck />} />
            <Route path="biobank" element={<Biobank />} />
          </Route>
          
          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;