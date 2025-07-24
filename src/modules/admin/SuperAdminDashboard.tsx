import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Shield,
  Settings,
  BarChart3,
  Database,
  Bell,
  FileText,
  CreditCard,
  Globe,
  UserCheck,
  Building,
  Ticket,
  Palette,
  Gift,
  Star,
  Palette,
  Gift,
  Star,
  ThumbsUp,
  Layout,
  ThumbsUp,
  Layout,
  HardDrive,
  Mail,
  Zap,
  Archive,
  MessageSquare,
  Brush,
  History,
  Activity,
  User,
  Code
} from 'lucide-react';

// Import existing admin components
import AdminAnalytics from './AdminAnalytics';
import AdminUserManagement from './AdminUserManagement';
import RBACManagement from './RBACManagement';
import SystemHealthCheck from './SystemHealthCheck';
import AdminSystemSettings from './AdminSystemSettings';
import AdminSecurityCenter from './AdminSecurityCenter';
import AdminNotificationManagement from './AdminNotificationManagement';
import AdminReportAnalytics from './AdminReportAnalytics';
import SubscriptionManagement from './SubscriptionManagement';
import AdminMultiRegionalManagement from './AdminMultiRegionalManagement';
import KYC_KYB_Management from './KYC_KYB_Management';
import AdminOrganisationManagement from './AdminOrganisationManagement';

// Import new Super Admin feature components
import AdminTicketingSystem from './AdminTicketingSystem';
import AdminWhiteLabelCustomization from './AdminWhiteLabelCustomization';
import AdminReferralManagement from './AdminReferralManagement';
import AdminRewardManagement from './AdminRewardManagement';
import AdminRatingsManagement from './AdminRatingsManagement';
import AdminDocumentManagement from './AdminDocumentManagement';
import AdminContentManagement from './AdminContentManagement';
import AdminBackupRecovery from './AdminBackupRecovery';
import AdminEmailTemplateManagement from './AdminEmailTemplateManagement';
import AdminIntegrationManagement from './AdminIntegrationManagement';
import AdminHistoricalDataManagement from './AdminHistoricalDataManagement';
import AdminTicketingSystemManagement from './AdminTicketingSystemManagement';
import AdminWhiteLabellingCustomization from './AdminWhiteLabellingCustomization';
import AdminBackgroundCheckManagement from './AdminBackgroundCheckManagement';

const SuperAdminDashboard: React.FC = () => {
  const location = useLocation();

  // Core navigation links
  const coreNavigation = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/admin' },
    { name: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
    { name: 'User Management', icon: Users, path: '/admin/users' },
    { name: 'RBAC Management', icon: Shield, path: '/admin/rbac' },
    { name: 'System Health', icon: Database, path: '/admin/health' },
    { name: 'Security Center', icon: Shield, path: '/admin/security' },
  ];

  // Management navigation links
  const managementNavigation = [
    { name: 'Settings', icon: Settings, path: '/admin/settings' },
    { name: 'Notifications', icon: Bell, path: '/admin/notifications' },
    { name: 'Reports', icon: FileText, path: '/admin/reports' },
    { name: 'Subscriptions', icon: CreditCard, path: '/admin/subscriptions' },
    { name: 'Multi-Regional', icon: Globe, path: '/admin/multiregional' },
    { name: 'KYC/KYB Management', icon: UserCheck, path: '/admin/kyc-kyb' },
    { name: 'Organisation Management', icon: Building, path: '/admin/organisations' },
  ];

  // Advanced Management navigation links (New Features)
  const advancedManagementNavigation = [
    { name: 'Ticketing System', icon: Ticket, path: '/admin/ticketing' },
    { name: 'White Label & Customization', icon: Palette, path: '/admin/whitelabel' },
    { name: 'Referrals Management', icon: Gift, path: '/admin/referrals' },
    { name: 'Reward Management', icon: Star, path: '/admin/rewards' },
    { name: 'Ratings Management', icon: ThumbsUp, path: '/admin/ratings' },
    { name: 'Document Management', icon: FileText, path: '/admin/documents' },
    { name: 'Content Management', icon: Layout, path: '/admin/content' },
    { name: 'Backup & Recovery', icon: HardDrive, path: '/admin/backup-recovery' },
    { name: 'System Health Check', icon: Activity, path: '/admin/system-health' },
    { name: 'Subscription Management', icon: CreditCard, path: '/admin/subscription' },
    { name: 'System Log Configuration', icon: FileText, path: '/admin/system-log' },
    { name: 'Profile Management', icon: User, path: '/admin/profile-management' },
    { name: 'Developer Tools', icon: Code, path: '/admin/developer' },
    { name: 'Security Center', icon: Shield, path: '/admin/security' },
    { name: 'Database Management', icon: Database, path: '/admin/database' },
    { name: 'White Label & Customization', icon: Palette, path: '/admin/whitelabel' },
    { name: 'Referrals Management', icon: Gift, path: '/admin/referrals' },
    { name: 'Reward Management', icon: Star, path: '/admin/rewards' },
    { name: 'Ratings Management', icon: ThumbsUp, path: '/admin/ratings' },
    { name: 'Document Management', icon: FileText, path: '/admin/documents' },
    { name: 'Content Management', icon: Layout, path: '/admin/content' },
    { name: 'Email Templates', icon: Mail, path: '/admin/email-templates' },
    { name: 'Integration Management', icon: Zap, path: '/admin/integrations' },
    { name: 'Historical Data', icon: Archive, path: '/admin/historical-data' },
    { name: 'Ticketing System Mgmt', icon: MessageSquare, path: '/admin/ticketing-mgmt' },
    { name: 'White Labelling', icon: Brush, path: '/admin/white-labelling' },
    { name: 'Background Checks', icon: History, path: '/admin/background-checks' },
  ];

  const renderNavSection = (title: string, links: typeof coreNavigation) => (
    <div className="mb-8">
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-3">
        {title}
      </h3>
      <div className="space-y-1">
        {links.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                isActive
                  ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon
              className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                location.pathname === item.path
                  ? 'text-primary-500'
                  : 'text-gray-400 group-hover:text-gray-500'
              }`}
              aria-hidden="true"
            />
            {item.name}
          </NavLink>
        ))}
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900">Super Admin</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {renderNavSection('Core', coreNavigation)}
            {renderNavSection('Management', managementNavigation)}
            {renderNavSection('Advanced Management', advancedManagementNavigation)}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          <Routes>
            {/* Default Dashboard */}
            <Route path="/admin" element={<AdminAnalytics />} />
            
            {/* Core Routes */}
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/users" element={<AdminUserManagement />} />
            <Route path="/admin/rbac" element={<RBACManagement />} />
            <Route path="/admin/health" element={<SystemHealthCheck />} />
            <Route path="/admin/security" element={<AdminSecurityCenter />} />
            
            <Route path="/admin/whitelabel" element={<AdminWhiteLabelCustomization />} />
            <Route path="/admin/referrals" element={<AdminReferralManagement />} />
            <Route path="/admin/rewards" element={<AdminRewardManagement />} />
            <Route path="/admin/ratings" element={<AdminRatingsManagement />} />
            <Route path="/admin/documents" element={<AdminDocumentManagement />} />
            <Route path="/admin/content" element={<AdminContentManagement />} />
            {/* Management Routes */}
            <Route path="/admin/settings" element={<AdminSystemSettings />} />
            <Route path="/admin/notifications" element={<AdminNotificationManagement />} />
            <Route path="/admin/reports" element={<AdminReportAnalytics />} />
            <Route path="/admin/subscriptions" element={<SubscriptionManagement />} />
            <Route path="/admin/multiregional" element={<AdminMultiRegionalManagement />} />
            <Route path="/admin/kyc-kyb" element={<KYC_KYB_Management />} />
            <Route path="/admin/organisations" element={<AdminOrganisationManagement />} />
            
            {/* Advanced Management Routes (New Features) */}
            <Route path="/admin/ticketing" element={<AdminTicketingSystem />} />
            <Route path="/admin/whitelabel" element={<AdminWhiteLabelCustomization />} />
            <Route path="/admin/referrals" element={<AdminReferralManagement />} />
            <Route path="/admin/rewards" element={<AdminRewardManagement />} />
            <Route path="/admin/ratings" element={<AdminRatingsManagement />} />
            <Route path="/admin/documents" element={<AdminDocumentManagement />} />
            <Route path="/admin/content" element={<AdminContentManagement />} />
            <Route path="/admin/backup-recovery" element={<AdminBackupRecovery />} />
            <Route path="/admin/email-templates" element={<AdminEmailTemplateManagement />} />
            <Route path="/admin/integrations" element={<AdminIntegrationManagement />} />
            <Route path="/admin/historical-data" element={<AdminHistoricalDataManagement />} />
            <Route path="/admin/ticketing-mgmt" element={<AdminTicketingSystemManagement />} />
            <Route path="/admin/white-labelling" element={<AdminWhiteLabellingCustomization />} />
            <Route path="/admin/background-checks" element={<AdminBackgroundCheckManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;