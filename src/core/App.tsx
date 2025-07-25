import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../modules/shared/contexts/AuthContext'
import Layout from '../modules/shared/components/Layout'
import AuthGuard from '../modules/shared/components/AuthGuard'
import Auth from '../modules/user/Auth'
import DemoLogin from '../modules/shared/DemoLogin'
import Dashboard from '../modules/user/Dashboard'
import Onboarding from '../modules/user/Onboarding'
import VerificationRequests from '../modules/shared/VerificationRequests'
import TrustScore from '../modules/shared/TrustScore'
import Attestation from '../modules/shared/Attestation'
import Wallet from '../modules/shared/Wallet'
import Biobank from '../modules/shared/Biobank'
import OrganisationDashboard from '../modules/user/OrganisationDashboard'
import BackgroundCheck from '../modules/shared/BackgroundCheck'
import VerificationCenter from '../modules/user/VerificationCenter'
import TrustScoreAnalytics from '../modules/user/TrustScoreAnalytics'
import AttestationEndorsement from '../modules/user/AttestationEndorsement'
import BulkUpload from '../modules/user/BulkUpload'
import BulkHistoricalUpload from '../modules/user/BulkHistoricalUpload'
import CompanyProfile from '../modules/user/CompanyProfile'
import StaffManagement from '../modules/user/StaffManagement'
import DocumentVault from '../modules/user/DocumentVault'
import Billing from '../modules/user/Billing'
import ApiKeys from '../modules/user/ApiKeys'
import Settings from '../modules/user/Settings'
import AdminVerificationManagement from '../modules/admin/AdminVerificationManagement'
import AdminUserManagement from '../modules/admin/AdminUserManagement'
import AdminOrganisationManagement from '../modules/admin/AdminOrganisationManagement'
import KYC_KYB_Management from '../modules/admin/KYC_KYB_Management'
import AdminSystemSettings from '../modules/admin/AdminSystemSettings'
import AdminHistoricalDataManagement from '../modules/admin/AdminHistoricalDataManagement'
import AdminAnalytics from '../modules/admin/AdminAnalytics'
import SuperAdminDashboard from '../modules/admin/SuperAdminDashboard'
import EmployerManagement from '../modules/admin/EmployerManagement'
import EmployeeManagementSystem from '../modules/admin/EmployeeManagementSystem'
import SureAMLManagement from '../modules/admin/SureAMLManagement'
import SureComplianceManagement from '../modules/admin/SureComplianceManagement'
import DataMonitoringManagement from '../modules/admin/DataMonitoringManagement'
import CompanyManagement from '../modules/admin/CompanyManagement'
import HelpSupport from '../modules/admin/HelpSupport'
import DownTimeTracker from '../modules/admin/DownTimeTracker'
import AdminTransactionManagement from '../modules/admin/AdminTransactionManagement'
import AdminApprovalWorkflow from '../modules/admin/AdminApprovalWorkflow'
import RBACManagement from '../modules/shared/RBACManagement'
import RegionalManagement from '../modules/admin/RegionalManagement'
import AdminIntegrationManagement from '../modules/admin/AdminIntegrationManagement'
import AdminDeveloperTools from '../modules/admin/AdminDeveloperTools'
import AdminSecurityCenter from '../modules/admin/AdminSecurityCenter'
import AdminDatabaseManagement from '../modules/admin/AdminDatabaseManagement'
import AdminWalletManagement from '../modules/admin/AdminWalletManagement'
import AdminEscrowManagement from '../modules/admin/AdminEscrowManagement'
import AdminBackgroundCheckManagement from '../modules/admin/AdminBackgroundCheckManagement'
import AdminReportAnalytics from '../modules/admin/AdminReportAnalytics'
import AdminDisputeManagement from '../modules/admin/AdminDisputeManagement'
import AdminChatManagement from '../modules/admin/AdminChatManagement'
import AdminEmailTemplateManagement from '../modules/admin/AdminEmailTemplateManagement'
import AdminNotificationManagement from '../modules/admin/AdminNotificationManagement'
import AdminTicketingSystemManagement from '../modules/admin/AdminTicketingSystemManagement'
import SystemHealthCheck from '../modules/admin/SystemHealthCheck'
import SubscriptionManagement from '../modules/admin/SubscriptionManagement'
import SystemLogConfiguration from '../modules/admin/SystemLogConfiguration'
import ProfileManagement from '../modules/admin/ProfileManagement'


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<DemoLogin />} />
          <Route path="/*" element={
            <Layout>
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/individual" element={<IndividualDashboard />} />
                <Route path="/organisation" element={<OrganisationDashboard />} />
                <Route path="/verification" element={<VerificationCenter />} />
                <Route path="/documents" element={<DocumentVault />} />
                <Route path="/trust-score" element={<TrustScoreAnalytics />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/attestation" element={<AttestationEndorsement />} />
                <Route path="/bulk-upload" element={<BulkUpload />} />
                <Route path="/bulk-historical" element={<BulkHistoricalUpload />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/company-profile" element={<CompanyProfile />} />
                <Route path="/staff-management" element={<StaffManagement />} />
                <Route path="/api-keys" element={<ApiKeys />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/admin/user-management" element={<AdminUserManagement />} />
              </Routes>
            </Layout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App