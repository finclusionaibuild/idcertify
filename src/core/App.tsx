import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../modules/shared/contexts/AuthContext'
import { OnboardingProvider } from '../modules/shared/contexts/OnboardingContext'

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
import Onboarding from '../modules/user/Onboarding'
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
    <AuthProvider>
      <OnboardingProvider>
        <Router>
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
                <OnboardingFlow>
                  <Layout />
                </OnboardingFlow>
              </AuthGuard>
            }>
              <Route index element={<Navigate to="/individual/dashboard" replace />} />
              
              {/* Individual Account Routes */}
              <Route path="individual/dashboard" element={<IndividualDashboard />} />
              <Route path="individual/quick-actions" element={<div className="p-6"><h1 className="text-2xl font-bold">Quick Actions</h1><p>Individual quick actions coming soon...</p></div>} />
              
              {/* Organization Account Routes */}
              <Route path="organization/dashboard" element={<OrganisationDashboard />} />
              
              {/* Shared Feature Routes */}
              <Route path="document-vault" element={<DocumentVault />} />
              <Route path="verification-center" element={<VerificationCenter />} />
              <Route path="trust-score" element={<TrustScore />} />
              <Route path="trust-score-analytics" element={<TrustScoreAnalytics />} />
              <Route path="background-check" element={<BackgroundCheck />} />
              <Route path="attestation-endorsement" element={<AttestationEndorsement />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="billing" element={<Billing />} />
              <Route path="settings" element={<Settings />} />
              <Route path="api-keys" element={<ApiKeys />} />
              
              {/* Organization Specific Routes */}
              <Route path="company-profile" element={<CompanyProfile />} />
              <Route path="staff-management" element={<StaffManagement />} />
              <Route path="bulk-upload" element={<BulkUpload />} />
              <Route path="bulk-historical-upload" element={<BulkHistoricalUpload />} />
              <Route path="verification-requests" element={<VerificationRequests />} />
              
              {/* Placeholder routes for future implementation */}
              <Route path="request-attestation" element={<div className="p-6"><h1 className="text-2xl font-bold">Request Attestation</h1><p>Feature coming soon...</p></div>} />
              <Route path="endorsement-history" element={<div className="p-6"><h1 className="text-2xl font-bold">Endorsement History</h1><p>Feature coming soon...</p></div>} />
              <Route path="transactions" element={<div className="p-6"><h1 className="text-2xl font-bold">Transaction History</h1><p>Feature coming soon...</p></div>} />
              <Route path="privacy" element={<div className="p-6"><h1 className="text-2xl font-bold">Privacy Controls</h1><p>Feature coming soon...</p></div>} />
              <Route path="departments" element={<div className="p-6"><h1 className="text-2xl font-bold">Departments</h1><p>Feature coming soon...</p></div>} />
              <Route path="compliance" element={<div className="p-6"><h1 className="text-2xl font-bold">Compliance Dashboard</h1><p>Feature coming soon...</p></div>} />
              <Route path="audit-logs" element={<div className="p-6"><h1 className="text-2xl font-bold">Audit Logs</h1><p>Feature coming soon...</p></div>} />
              <Route path="usage-analytics" element={<div className="p-6"><h1 className="text-2xl font-bold">Usage Analytics</h1><p>Feature coming soon...</p></div>} />
              <Route path="cost-management" element={<div className="p-6"><h1 className="text-2xl font-bold">Cost Management</h1><p>Feature coming soon...</p></div>} />
              <Route path="webhooks" element={<div className="p-6"><h1 className="text-2xl font-bold">Webhooks</h1><p>Feature coming soon...</p></div>} />
              <Route path="developer-tools" element={<div className="p-6"><h1 className="text-2xl font-bold">Developer Tools</h1><p>Feature coming soon...</p></div>} />
              <Route path="user-permissions" element={<div className="p-6"><h1 className="text-2xl font-bold">User Permissions</h1><p>Feature coming soon...</p></div>} />
              <Route path="security-settings" element={<div className="p-6"><h1 className="text-2xl font-bold">Security Settings</h1><p>Feature coming soon...</p></div>} />
              
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
              
              <Route path="attestation" element={
                <AuthGuard roles={['individual']} requireOnboarding={true}>
                  <Attestation />
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
              
              <Route path="organisation/risk-monitoring" element={
                <AuthGuard roles={['organisation']} requireOnboarding={true}>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900">Risk Monitoring</h2>
                    <p className="text-gray-600 mt-2">Monitor and assess risk factors across your verification portfolio.</p>
                  </div>
                </AuthGuard>
              } />
              
              <Route path="organisation/documents" element={
                <AuthGuard roles={['organisation']} requireOnboarding={true}>
                  <DocumentVault />
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

              <Route path="admin/employer-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <EmployerManagement />
                </AuthGuard>
              } />

              <Route path="admin/employee-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <EmployeeManagementSystem />
                </AuthGuard>
              } />

              <Route path="admin/verification-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <VerificationRequests />
                </AuthGuard>
              } />

              <Route path="admin/trust-score-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <TrustScore />
                </AuthGuard>
              } />

              <Route path="admin/document-vault-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <DocumentVault />
                </AuthGuard>
              } />

              <Route path="admin/attestation-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <Attestation />
                </AuthGuard>
              } />

              <Route path="admin/biobank-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <Biobank />
                </AuthGuard>
              } />

              <Route path="admin/sure-aml-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <SureAMLManagement />
                </AuthGuard>
              } />

              <Route path="admin/sure-compliance-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <SureComplianceManagement />
                </AuthGuard>
              } />

              <Route path="admin/data-monitoring-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <DataMonitoringManagement />
                </AuthGuard>
              } />

              <Route path="admin/company-management" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <CompanyManagement />
                </AuthGuard>
              } />

              <Route path="admin/help-support" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <HelpSupport />
                </AuthGuard>
              } />

              <Route path="admin/downtime-tracker" element={
                <AuthGuard roles={['admin']} permissions={['admin.super']}>
                  <DownTimeTracker />
                </AuthGuard>
              } />
              
              {/* Shared routes */}
              <Route path="notifications" element={
                <div className="text-center py-12">
                  <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                  <p className="text-gray-600 mt-2">Stay updated with your latest notifications and system alerts.</p>
                </div>
              } />
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
        </Router>
      </OnboardingProvider>
    </AuthProvider>
  )
}

export default App