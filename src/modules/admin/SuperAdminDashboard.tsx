import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, Building2, Shield, FileText, Activity, 
  CreditCard, Settings, Database, Globe, Clock, Headphones, 
  Palette, Gift, Star, FolderOpen, Edit3, Mail, Plug, 
  UserCheck, HardDrive, BarChart3, TrendingUp
} from 'lucide-react';

// Import all the admin components
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
import AdminBackgroundCheckManagement from './AdminBackgroundCheckManagement';

const SuperAdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigationItems = [
    {
      section: 'Overview',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard, path: 'dashboard' },
      ]
    },
    {
      section: 'User & Access Management',
      items: [
        { name: 'User Management', icon: Users, path: 'user-management' },
        { name: 'Organisations', icon: Building2, path: 'organisations' },
        { name: 'RBAC Management', icon: Shield, path: 'rbac' },
        { name: 'KYC/KYB Management', icon: FileText, path: 'kyc-kyb' },
      ]
    },
    {
      section: 'System Operations',
      items: [
        { name: 'System Health Check', icon: Activity, path: 'system-health' },
        { name: 'System Log & Configuration', icon: Settings, path: 'system-logs' },
        { name: 'Regional Management', icon: Globe, path: 'regional' },
        { name: 'Backup & Recovery', icon: HardDrive, path: 'backup-recovery' },
      ]
    },
    {
      section: 'Financial & Subscriptions',
      items: [
        { name: 'Subscription Management', icon: CreditCard, path: 'subscriptions' },
      ]
    },
    {
      section: 'Data & Analytics',
      items: [
        { name: 'Historical Data', icon: Database, path: 'historical-data' },
        { name: 'Analytics & Reports', icon: BarChart3, path: 'analytics' },
        { name: 'Report Analytics', icon: TrendingUp, path: 'report-analytics' },
      ]
    },
    {
      section: 'Feature Management',
      items: [
        { name: 'Background Checks', icon: UserCheck, path: 'background-checks' },
        { name: 'Content Management', icon: Edit3, path: 'content-management' },
        { name: 'Document Management', icon: FolderOpen, path: 'document-management' },
        { name: 'Email Templates', icon: Mail, path: 'email-templates' },
        { name: 'Integration Management', icon: Plug, path: 'integration-management' },
        { name: 'Ratings Management', icon: Star, path: 'ratings-management' },
        { name: 'Referrals Management', icon: Gift, path: 'referral-management' },
        { name: 'Reward Management', icon: Gift, path: 'reward-management' },
        { name: 'Ticketing System', icon: Headphones, path: 'ticketing-system' },
        { name: 'White Label Customization', icon: Palette, path: 'white-label-customization' },
      ]
    }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <div className="p-6"><h1 className="text-2xl font-bold">Super Admin Dashboard</h1></div>;
      case 'user-management':
        return <AdminUserManagement />;
      case 'organisations':
        return <AdminOrganisationManagement />;
      case 'rbac':
        return <RBACManagement />;
      case 'kyc-kyb':
        return <KYC_KYB_Management />;
      case 'system-health':
        return <SystemHealthCheck />;
      case 'system-logs':
        return <SystemLogConfiguration />;
      case 'regional':
        return <RegionalManagement />;
      case 'backup-recovery':
        return <AdminBackupRecovery />;
      case 'subscriptions':
        return <SubscriptionManagement />;
      case 'historical-data':
        return <AdminHistoricalDataManagement />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'report-analytics':
        return <AdminReportAnalytics />;
      case 'background-checks':
        return <AdminBackgroundCheckManagement />;
      case 'content-management':
        return <AdminContentManagement />;
      case 'document-management':
        return <AdminDocumentManagement />;
      case 'email-templates':
        return <AdminEmailTemplateManagement />;
      case 'integration-management':
        return <AdminIntegrationManagement />;
      case 'ratings-management':
        return <AdminRatingsManagement />;
      case 'referral-management':
        return <AdminReferralManagement />;
      case 'reward-management':
        return <AdminRewardManagement />;
      case 'ticketing-system':
        return <AdminTicketingSystem />;
      case 'white-label-customization':
        return <AdminWhiteLabelCustomization />;
      default:
        return <div className="p-6"><h1 className="text-2xl font-bold">Super Admin Dashboard</h1></div>;
    }
  };

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
          <nav className="flex-1 px-2 py-4 overflow-y-auto">
            {navigationItems.map((section, sectionIndex) => (
              <div key={sectionIndex} className="mb-6">
                <h3 className="px-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {section.section}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item, itemIndex) => {
                    const isActive = activeTab === item.path;
                    return (
                      <button
                        key={itemIndex}
                        onClick={() => setActiveTab(item.path)}
                        className={`w-full group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                          isActive
                            ? 'bg-primary-100 text-primary-700 border-r-2 border-primary-500'
                            : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 transition-colors duration-200 ${
                            isActive
                              ? 'text-primary-500'
                              : 'text-gray-400 group-hover:text-gray-500'
                          }`}
                          aria-hidden="true"
                        />
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;