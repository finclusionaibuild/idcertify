import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../modules/shared/contexts/AuthContext'

// Import all dashboard components
import IndividualDashboard from '../modules/user/IndividualDashboard'
import OrganisationDashboard from '../modules/user/OrganisationDashboard'

// Import feature components
import DocumentVault from '../modules/user/DocumentVault'
import TrustScore from '../modules/shared/TrustScore'
import VerificationCenter from '../modules/user/VerificationCenter'
import Wallet from '../modules/shared/Wallet'
import Settings from '../modules/user/Settings'
import ApiKeys from '../modules/user/ApiKeys'
import Billing from '../modules/user/Billing'
import AttestationEndorsement from '../modules/user/AttestationEndorsement'
import BulkUpload from '../modules/user/BulkUpload'
import BulkHistoricalUpload from '../modules/user/BulkHistoricalUpload'
import CompanyProfile from '../modules/user/CompanyProfile'
import StaffManagement from '../modules/user/StaffManagement'
import TrustScoreAnalytics from '../modules/user/TrustScoreAnalytics'
import BackgroundCheck from '../modules/shared/BackgroundCheck'
import VerificationRequests from '../modules/shared/VerificationRequests'

// Import shared components
import Layout from '../modules/shared/components/Layout'
import AuthGuard from '../modules/shared/components/AuthGuard'
import OnboardingFlow from '../modules/shared/components/OnboardingFlow'
import Auth from '../modules/user/Auth'
import DemoLogin from '../modules/shared/DemoLogin'
import Dashboard from '../modules/user/Dashboard'
import Attestation from '../modules/shared/Attestation'
import Biobank from '../modules/shared/Biobank'
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
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={
              <AuthGuard>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                    <Route path="/dashboard" element={<IndividualDashboard />} />
                    <Route path="/individual/dashboard" element={<IndividualDashboard />} />
                    <Route path="/organization/dashboard" element={<OrganisationDashboard />} />
                    <Route path="/document-vault" element={<DocumentVault />} />
                    <Route path="/trust-score" element={<TrustScore />} />
                    <Route path="/verification-center" element={<VerificationCenter />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/api-keys" element={<ApiKeys />} />
                    <Route path="/billing" element={<Billing />} />
                    <Route path="/attestation" element={<AttestationEndorsement />} />
                    <Route path="/bulk-upload" element={<BulkUpload />} />
                    <Route path="/bulk-historical" element={<BulkHistoricalUpload />} />
                    <Route path="/company-profile" element={<CompanyProfile />} />
                    <Route path="/staff-management" element={<StaffManagement />} />
                    <Route path="/verification-requests" element={<VerificationRequests />} />
                    <Route path="/biobank" element={<Biobank />} />
                    <Route path="/background-check" element={<BackgroundCheck />} />
                    <Route path="/rbac" element={<RBACManagement />} />
                    <Route path="/admin/*" element={<SuperAdminDashboard />} />
                  </Routes>
                </Layout>
              </AuthGuard>
            } />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App