import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Shield,
  FileCheck,
  Activity,
  Settings,
  Globe,
  Database,
  HardDrive,
  CreditCard,
  Wallet,
  Lock,
  CheckCircle,
  AlertTriangle,
  Code,
  Plug,
  BarChart3,
  TrendingUp,
  FileText,
  MessageSquare,
  Star,
  Gift,
  Ticket,
  Palette,
  Search,
  Mail,
  UserCheck,
  ChevronDown,
  ChevronRight,
  History,
  UserPlus
} from 'lucide-react';

// Import all admin components
import AdminAnalytics from './AdminAnalytics';
import AdminApprovalWorkflow from './AdminApprovalWorkflow';
import AdminBackgroundCheckManagement from './AdminBackgroundCheckManagement';
import AdminBackupRecovery from './AdminBackupRecovery';
import AdminChatManagement from './AdminChatManagement';
import AdminContentManagement from './AdminContentManagement';
import AdminDatabaseManagement from './AdminDatabaseManagement';
import AdminDeveloperTools from './AdminDeveloperTools';
import AdminDisputeManagement from './AdminDisputeManagement';
import AdminDocumentManagement from './AdminDocumentManagement';
import AdminEmailTemplateManagement from './AdminEmailTemplateManagement';
import AdminEscrowManagement from './AdminEscrowManagement';
import AdminHistoricalDataManagement from './AdminHistoricalDataManagement';
import AdminIntegrationManagement from './AdminIntegrationManagement';
import AdminMultiRegionalManagement from './AdminMultiRegionalManagement';
import AdminNotificationManagement from './AdminNotificationManagement';
import AdminOrganisationManagement from './AdminOrganisationManagement';
import AdminRatingsManagement from './AdminRatingsManagement';
import AdminReferralManagement from './AdminReferralManagement';
import AdminReportAnalytics from './AdminReportAnalytics';
import AdminRewardManagement from './AdminRewardManagement';
import AdminSecurityCenter from './AdminSecurityCenter';
import AdminSystemSettings from './AdminSystemSettings';
import AdminTicketingSystem from './AdminTicketingSystem';
import AdminTransactionManagement from './AdminTransactionManagement';
import AdminUserManagement from './AdminUserManagement';
import AdminVerificationManagement from './AdminVerificationManagement';
import AdminWalletManagement from './AdminWalletManagement';
import AdminWhiteLabelCustomization from './AdminWhiteLabelCustomization';
import KYC_KYB_Management from './KYC_KYB_Management';
import ProfileManagement from './ProfileManagement';
import RBACManagement from './RBACManagement';
import RegionalManagement from './RegionalManagement';
import SubscriptionManagement from './SubscriptionManagement';
import SystemHealthCheck from './SystemHealthCheck';
import SystemLogConfiguration from './SystemLogConfiguration';
import StaffManagement from '../user/StaffManagement';
import TrustScoreAnalytics from '../user/TrustScoreAnalytics';

interface NavigationItem {
  name: string;
  path: string;
  icon: React.ComponentType<any>;
}

interface NavigationGroup {
  name: string;
  icon: React.ComponentType<any>;
  children: NavigationItem[];
}

const SuperAdminDashboard: React.FC = () => {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['User & Access Management']);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  const navigationGroups: NavigationGroup[] = [
    {
      name: 'User & Access Management',
      icon: Users,
      children: [
        { name: 'User Management', path: '/super-admin/user-management', icon: Users },
        { name: 'Organisation Management', path: '/super-admin/organisation-management', icon: Building2 },
        { name: 'RBAC Management', path: '/super-admin/rbac-management', icon: Shield },
        { name: 'KYC/KYB Management', path: '/super-admin/kyc-kyb-management', icon: FileCheck },
        { name: 'Profile Management', path: '/super-admin/profile-management', icon: UserCheck },
        { name: 'Staff Management', path: '/super-admin/staff-management', icon: UserPlus },
      ]
    },
    {
      name: 'System Operations & Configuration',
      icon: Settings,
      children: [
        { name: 'System Health Check', path: '/super-admin/system-health', icon: Activity },
        { name: 'System Log Configuration', path: '/super-admin/system-logs', icon: FileText },
        { name: 'Regional Management', path: '/super-admin/regional-management', icon: Globe },
        { name: 'Multi-Regional Management', path: '/super-admin/multi-regional-management', icon: Globe },
        { name: 'Backup & Recovery', path: '/super-admin/backup-recovery', icon: HardDrive },
        { name: 'Database Management', path: '/super-admin/database-management', icon: Database },
      ]
    },
    {
      name: 'Financial Management',
      icon: CreditCard,
      children: [
        { name: 'Subscription Management', path: '/super-admin/subscription-management', icon: CreditCard },
        { name: 'Escrow Management', path: '/super-admin/escrow-management', icon: Lock },
        { name: 'Wallet Management', path: '/super-admin/wallet-management', icon: Wallet },
        { name: 'Transaction Management', path: '/super-admin/transaction-management', icon: CreditCard },
      ]
    },
    {
      name: 'Security & Compliance',
      icon: Lock,
      children: [
        { name: 'Security Center', path: '/super-admin/security-center', icon: Lock },
        { name: 'Approval Workflow', path: '/super-admin/approval-workflow', icon: CheckCircle },
        { name: 'Dispute Management', path: '/super-admin/dispute-management', icon: AlertTriangle },
        { name: 'Verification Management', path: '/super-admin/verification-management', icon: CheckCircle },
      ]
    },
    {
      name: 'Developer & Integrations',
      icon: Code,
      children: [
        { name: 'Developer Tools', path: '/super-admin/developer-tools', icon: Code },
        { name: 'Integration Management', path: '/super-admin/integration-management', icon: Plug },
      ]
    },
    {
      name: 'Data & Analytics',
      icon: BarChart3,
      children: [
        { name: 'Historical Data Management', path: '/super-admin/historical-data', icon: History },
        { name: 'Admin Analytics', path: '/super-admin/analytics', icon: BarChart3 },
        { name: 'Report Analytics', path: '/super-admin/report-analytics', icon: TrendingUp },
        { name: 'Trust Score Analytics', path: '/super-admin/trust-score-analytics', icon: TrendingUp },
      ]
    },
    {
      name: 'Content & Features',
      icon: FileText,
      children: [
        { name: 'Background Check Management', path: '/super-admin/background-checks', icon: Search },
        { name: 'Content Management', path: '/super-admin/content-management', icon: FileText },
        { name: 'Document Management', path: '/super-admin/document-management', icon: FileText },
        { name: 'Email Template Management', path: '/super-admin/email-templates', icon: Mail },
        { name: 'Ratings Management', path: '/super-admin/ratings-management', icon: Star },
        { name: 'Referral Management', path: '/super-admin/referral-management', icon: Users },
        { name: 'Reward Management', path: '/super-admin/reward-management', icon: Gift },
        { name: 'Ticketing System', path: '/super-admin/ticketing-system', icon: Ticket },
        { name: 'White Label Customization', path: '/super-admin/white-label', icon: Palette },
      ]
    },
    {
      name: 'Communication & Notifications',
      icon: MessageSquare,
      children: [
        { name: 'Chat Management', path: '/super-admin/chat-management', icon: MessageSquare },
        { name: 'Notification Management', path: '/super-admin/notification-management', icon: Bell },
      ]
    }
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const isGroupActive = (group: NavigationGroup) => {
    return group.children.some(child => isActiveLink(child.path));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white shadow-lg border-r border-gray-200 overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-900">Super Admin</h1>
          <p className="text-sm text-gray-600 mt-1">System Management Dashboard</p>
        </div>

        <nav className="p-4 space-y-2">
          {/* Dashboard - Always visible */}
          <Link
            to="/super-admin"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              location.pathname === '/super-admin'
                ? 'bg-primary-50 text-primary-700 border border-primary-200'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-medium">Dashboard</span>
          </Link>

          {/* Collapsible Groups */}
          {navigationGroups.map((group) => {
            const isExpanded = expandedGroups.includes(group.name);
            const isActive = isGroupActive(group);
            
            return (
              <div key={group.name} className="space-y-1">
                {/* Group Header */}
                <button
                  onClick={() => toggleGroup(group.name)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 border border-primary-200'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <group.icon className="w-5 h-5" />
                    <span className="font-medium text-left">{group.name}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </button>

                {/* Group Children */}
                {isExpanded && (
                  <div className="ml-4 space-y-1 border-l-2 border-gray-100 pl-4">
                    {group.children.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm ${
                          isActiveLink(item.path)
                            ? 'bg-primary-100 text-primary-800 font-medium'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={
            <div className="p-8">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
                  <p className="text-gray-600">Comprehensive system management and oversight</p>
                </div>

                {/* Dashboard Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Total Users</p>
                        <p className="text-2xl font-bold text-gray-900">12,543</p>
                      </div>
                      <Users className="w-8 h-8 text-primary-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">+12% from last month</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Organizations</p>
                        <p className="text-2xl font-bold text-gray-900">1,234</p>
                      </div>
                      <Building2 className="w-8 h-8 text-secondary-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">+8% from last month</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">System Health</p>
                        <p className="text-2xl font-bold text-gray-900">99.9%</p>
                      </div>
                      <Activity className="w-8 h-8 text-success-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">All systems operational</p>
                  </div>

                  <div className="bg-white p-6 rounded-lg shadow-soft border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Revenue</p>
                        <p className="text-2xl font-bold text-gray-900">$45.2K</p>
                      </div>
                      <CreditCard className="w-8 h-8 text-accent-600" />
                    </div>
                    <p className="text-xs text-green-600 mt-2">+15% from last month</p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-soft border border-gray-200 p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                      to="/super-admin/user-management"
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Users className="w-6 h-6 text-primary-600" />
                      <div>
                        <p className="font-medium text-gray-900">Manage Users</p>
                        <p className="text-sm text-gray-600">View and manage user accounts</p>
                      </div>
                    </Link>

                    <Link
                      to="/super-admin/system-health"
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Activity className="w-6 h-6 text-success-600" />
                      <div>
                        <p className="font-medium text-gray-900">System Health</p>
                        <p className="text-sm text-gray-600">Monitor system performance</p>
                      </div>
                    </Link>

                    <Link
                      to="/super-admin/analytics"
                      className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <BarChart3 className="w-6 h-6 text-secondary-600" />
                      <div>
                        <p className="font-medium text-gray-900">View Analytics</p>
                        <p className="text-sm text-gray-600">Access detailed reports</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          } />
          
          {/* All Routes */}
          <Route path="/user-management" element={<AdminUserManagement />} />
          <Route path="/organisation-management" element={<AdminOrganisationManagement />} />
          <Route path="/rbac-management" element={<RBACManagement />} />
          <Route path="/kyc-kyb-management" element={<KYC_KYB_Management />} />
          <Route path="/profile-management" element={<ProfileManagement />} />
          <Route path="/staff-management" element={<StaffManagement />} />
          
          <Route path="/system-health" element={<SystemHealthCheck />} />
          <Route path="/system-logs" element={<SystemLogConfiguration />} />
          <Route path="/regional-management" element={<RegionalManagement />} />
          <Route path="/multi-regional-management" element={<AdminMultiRegionalManagement />} />
          <Route path="/backup-recovery" element={<AdminBackupRecovery />} />
          <Route path="/database-management" element={<AdminDatabaseManagement />} />
          
          <Route path="/subscription-management" element={<SubscriptionManagement />} />
          <Route path="/escrow-management" element={<AdminEscrowManagement />} />
          <Route path="/wallet-management" element={<AdminWalletManagement />} />
          <Route path="/transaction-management" element={<AdminTransactionManagement />} />
          
          <Route path="/security-center" element={<AdminSecurityCenter />} />
          <Route path="/approval-workflow" element={<AdminApprovalWorkflow />} />
          <Route path="/dispute-management" element={<AdminDisputeManagement />} />
          <Route path="/verification-management" element={<AdminVerificationManagement />} />
          
          <Route path="/developer-tools" element={<AdminDeveloperTools />} />
          <Route path="/integration-management" element={<AdminIntegrationManagement />} />
          
          <Route path="/historical-data" element={<AdminHistoricalDataManagement />} />
          <Route path="/analytics" element={<AdminAnalytics />} />
          <Route path="/report-analytics" element={<AdminReportAnalytics />} />
          <Route path="/trust-score-analytics" element={<TrustScoreAnalytics />} />
          
          <Route path="/background-checks" element={<AdminBackgroundCheckManagement />} />
          <Route path="/content-management" element={<AdminContentManagement />} />
          <Route path="/document-management" element={<AdminDocumentManagement />} />
          <Route path="/email-templates" element={<AdminEmailTemplateManagement />} />
          <Route path="/ratings-management" element={<AdminRatingsManagement />} />
          <Route path="/referral-management" element={<AdminReferralManagement />} />
          <Route path="/reward-management" element={<AdminRewardManagement />} />
          <Route path="/ticketing-system" element={<AdminTicketingSystem />} />
          <Route path="/white-label" element={<AdminWhiteLabelCustomization />} />
          
          <Route path="/chat-management" element={<AdminChatManagement />} />
          <Route path="/notification-management" element={<AdminNotificationManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;