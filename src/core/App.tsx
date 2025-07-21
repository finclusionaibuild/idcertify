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
import Wallet from '../modules/user/Wallet'
import Biobank from '../modules/user/Biobank'
import OrganisationDashboard from '../modules/user/OrganisationDashboard'
import BackgroundCheck from '../modules/user/BackgroundCheck'
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
import AdminTransactionManagement from '../modules/admin/AdminTransactionManagement'
import AdminApprovalWorkflow from '../modules/admin/AdminApprovalWorkflow'
import RBACManagement from '../modules/admin/RBACManagement'
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
        <Routes>
          {/* Public routes */}
          <Route path="/auth" element={<Auth />} />
          <Route path="/demo" element={<DemoLogin />} />
          <Route path="/onboarding" element={
            <AuthGuard>
              <Onboarding />
            </AuthGuard>
          } />
          
          {/* Protected routes */}
          <Route path="/" element={
            <AuthGuard requireOnboarding={true}>
              <Layout />
            </AuthGuard>
          }>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            
            {/* Individual routes */}
            <Route path="profile" element={
              <AuthGuard roles={['individual']} requireOnboarding={true}>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900">Profile Management</h2>
                  <p className="text-gray-600 mt-2">Complete your profile information and manage your identity verification status.</p>
                </div>
              </AuthGuard>
            } />
            
            <Route path="biobank" element={
              <AuthGuard roles={['individual']} requireOnboarding={true}>
                <Biobank />
              </AuthGuard>
            } />
            
            <Route path="verification-requests" element={
              <AuthGuard roles={['individual']} requireOnboarding={true}>
                <VerificationRequests />
              </AuthGuard>
            } />
            
            <Route path="trust-score" element={
              <AuthGuard roles={['individual']} requireOnboarding={true}>
                <TrustScore />
              </AuthGuard>
            } />
            
            <Route path="attestation" element={
              <AuthGuard roles={['individual']} requireOnboarding={true}>
                <Attestation />
              </AuthGuard>
            } />
            
            <Route path="wallet" element={
              <AuthGuard roles={['individual']} requireOnboarding={true}>
                <Wallet />
              </AuthGuard>
            } />
            
            {/* Organisation routes */}
            <Route path="organisation/dashboard" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <OrganisationDashboard />
              </AuthGuard>
            } />
            
            <Route path="organisation/verifications" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <VerificationCenter />
              </AuthGuard>
            } />
            
            <Route path="organisation/profile" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <CompanyProfile />
              </AuthGuard>
            } />
            
            <Route path="organisation/staff" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true} permissions={['staff.manage']}>
                <StaffManagement />
              </AuthGuard>
            } />
            
            <Route path="organisation/background-check" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <BackgroundCheck />
              </AuthGuard>
            } />
            
            <Route path="organisation/bulk-upload" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <BulkUpload />
              </AuthGuard>
            } />
            
            <Route path="organisation/bulk-historical-upload" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <BulkHistoricalUpload />
              </AuthGuard>
            } />
            
            <Route path="organisation/attestation-endorsement" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <AttestationEndorsement />
              </AuthGuard>
            } />
            
            <Route path="organisation/risk-monitoring" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900">Risk Monitoring</h2>
                  <p className="text-gray-600 mt-2">Monitor and assess risk factors across your verification portfolio.</p>
                </div>
              </AuthGuard>
            } />
            
            <Route path="organisation/trust-score" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <TrustScoreAnalytics />
              </AuthGuard>
            } />
            
            <Route path="organisation/documents" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <DocumentVault />
              </AuthGuard>
            } />
            
            <Route path="organisation/billing" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <Billing />
              </AuthGuard>
            } />
            
            <Route path="organisation/api" element={
              <AuthGuard roles={['organisation']} requireOnboarding={true}>
                <ApiKeys />
              </AuthGuard>
            } />
            
            {/* Admin routes */}
            <Route path="admin/users" element={
              <AuthGuard roles={['admin']} permissions={['users.manage']}>
                <AdminUserManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/organisations" element={
              <AuthGuard roles={['admin']} permissions={['organisations.manage']}>
                <AdminOrganisationManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/verifications" element={
              <AuthGuard roles={['admin']} permissions={['verifications.manage']}>
                <AdminVerificationManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/system" element={
              <AuthGuard roles={['admin']} permissions={['settings.manage']}>
                <AdminSystemSettings />
              </AuthGuard>
            } />
            
            <Route path="admin/analytics" element={
              <AuthGuard roles={['admin']} permissions={['analytics.view']}>
                <AdminAnalytics />
              </AuthGuard>
            } />
            
            {/* KYC/KYB Management */}
            <Route path="admin/kyc-kyb" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <KYC_KYB_Management />
              </AuthGuard>
            } />
            
            {/* Super Admin routes */}
            <Route path="admin/super" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <SuperAdminDashboard />
              </AuthGuard>
            } />
            
            <Route path="admin/regions" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <RegionalManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/bulk-historical" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <BulkHistoricalUpload />
              </AuthGuard>
            } />
            
            <Route path="admin/rbac" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <RBACManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/approval-workflow" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminApprovalWorkflow />
              </AuthGuard>
            } />
            
            <Route path="admin/historical-data" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminHistoricalDataManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/transactions" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminTransactionManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/integrations" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminIntegrationManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/developer" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminDeveloperTools />
              </AuthGuard>
            } />
            
            <Route path="admin/security" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminSecurityCenter />
              </AuthGuard>
            } />
            
            <Route path="admin/system-health" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <SystemHealthCheck />
              </AuthGuard>
            } />
            
            <Route path="admin/subscription" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <SubscriptionManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/system-log" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <SystemLogConfiguration />
              </AuthGuard>
            } />
            
            <Route path="admin/profile-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <ProfileManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/database" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminDatabaseManagement />
              </AuthGuard>
            } />

            <Route path="admin/wallet-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminWalletManagement />
              </AuthGuard>
            } />

            <Route path="admin/escrow-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminEscrowManagement />
              </AuthGuard>
            } />

            <Route path="admin/background-check-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminBackgroundCheckManagement />
              </AuthGuard>
            } />

            <Route path="admin/report-analytics-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminReportAnalytics />
              </AuthGuard>
            } />

            <Route path="admin/dispute-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminDisputeManagement />
              </AuthGuard>
            } />

            <Route path="admin/chat-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminChatManagement />
              </AuthGuard>
            } />

            <Route path="admin/email-template-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminEmailTemplateManagement />
              </AuthGuard>
            } />

            <Route path="admin/notification-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminNotificationManagement />
              </AuthGuard>
            } />

            <Route path="admin/ticketing-system-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <AdminTicketingSystemManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/system-health" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <SystemHealthCheck />
              </AuthGuard>
            } />
            
            <Route path="admin/subscription" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <SubscriptionManagement />
              </AuthGuard>
            } />
            
            <Route path="admin/system-log" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <SystemLogConfiguration />
              </AuthGuard>
            } />
            
            <Route path="admin/profile-management" element={
              <AuthGuard roles={['admin']} permissions={['admin.super']}>
                <ProfileManagement />
              </AuthGuard>
            } />
            
            {/* Shared routes */}
            <Route path="notifications" element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                <p className="text-gray-600 mt-2">Stay updated with your latest notifications and system alerts.</p>
              </div>
            } />
            
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Unauthorized page */}
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Access Denied</h1>
                <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
                <button
                  onClick={() => window.history.back()}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700"
                >
                  Go Back
                </button>
              </div>
            </div>
          } />
          
          {/* Catch all route - redirect to demo page */}
          <Route path="*" element={<Navigate to="/demo" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App