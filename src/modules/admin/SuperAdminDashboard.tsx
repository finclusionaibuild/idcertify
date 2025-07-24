import React from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ChatIcon from '@mui/icons-material/Chat';
import PaletteIcon from '@mui/icons-material/Palette';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import WebAssetIcon from '@mui/icons-material/WebAsset';
import LogoutIcon from '@mui/icons-material/Logout';
import ArticleIcon from '@mui/icons-material/Article';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GavelIcon from '@mui/icons-material/Gavel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import EmailIcon from '@mui/icons-material/Email';
import BackupIcon from '@mui/icons-material/Backup';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import HistoryIcon from '@mui/icons-material/History';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import AnalyticsIcon from '@mui/icons-material/Analytics';

// Import existing components
import AdminUserManagement from './AdminUserManagement';
import AdminOrganisationManagement from './AdminOrganisationManagement';
import AdminSystemSettings from './AdminSystemSettings';
import AdminSecurityCenter from './AdminSecurityCenter';
import AdminDatabaseManagement from './AdminDatabaseManagement';
import AdminReportAnalytics from './AdminReportAnalytics';
import KYC_KYB_Management from './KYC_KYB_Management';
import AdminChatManagement from './AdminChatManagement';
import RegionalManagement from './RegionalManagement';
import AdminWhiteLabellingCustomization from './AdminWhiteLabellingCustomization';
import AdminReferralManagement from './AdminReferralManagement';
import AdminRewardManagement from './AdminRewardManagement';
import AdminRatingsManagement from './AdminRatingsManagement';
import AdminContentManagement from './AdminContentManagement';
import AdminDocumentManagement from './AdminDocumentManagement';
import AdminWalletManagement from './AdminWalletManagement';
import AdminDisputeManagement from './AdminDisputeManagement';
import AdminNotificationManagement from './AdminNotificationManagement';
import AdminIntegrationManagement from './AdminIntegrationManagement';
import AdminTransactionManagement from './AdminTransactionManagement';
import AdminEmailTemplateManagement from './AdminEmailTemplateManagement';
import AdminBackupRecovery from './AdminBackupRecovery';
import AdminDeveloperTools from './AdminDeveloperTools';
import AdminHistoricalDataManagement from './AdminHistoricalDataManagement';
import AdminTicketingSystemManagement from './AdminTicketingSystemManagement';
import SystemLogConfiguration from './SystemLogConfiguration';

const SuperAdminDashboard = () => {
  const location = useLocation();

  const coreManagementLinks = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/admin' },
    { name: 'User Management', icon: PeopleIcon, path: '/admin/users' },
    { name: 'Organisation Management', icon: BusinessIcon, path: '/admin/organisations' },
    { name: 'Regional Management', icon: PublicIcon, path: '/admin/regional' },
    { name: 'Database Management', icon: StorageIcon, path: '/admin/database' },
    { name: 'Security Center', icon: SecurityIcon, path: '/admin/security' },
    { name: 'System Settings', icon: SettingsIcon, path: '/admin/settings' },
    { name: 'KYC/KYB Management', icon: VerifiedUserIcon, path: '/admin/kyc-kyb' },
    { name: 'Chat Management', icon: ChatIcon, path: '/admin/chat' },
    { name: 'Report & Analytics', icon: AnalyticsIcon, path: '/admin/analytics' },
  ];

  const advancedManagementLinks = [
    { name: 'White Label & Customization', icon: PaletteIcon, path: '/admin/whitelabel' },
    { name: 'Referrals Management', icon: CardGiftcardIcon, path: '/admin/referrals' },
    { name: 'Reward Management', icon: EmojiEventsIcon, path: '/admin/rewards' },
    { name: 'Ratings Management', icon: ThumbUpIcon, path: '/admin/ratings' },
    { name: 'Document Management', icon: DescriptionIcon, path: '/admin/documents' },
    { name: 'Content Management', icon: WebAssetIcon, path: '/admin/content' },
    { name: 'News Management', icon: ArticleIcon, path: '/admin/news' },
    { name: 'Wallet Management', icon: AccountBalanceWalletIcon, path: '/admin/wallets' },
    { name: 'Dispute Management', icon: GavelIcon, path: '/admin/disputes' },
    { name: 'Notification Management', icon: NotificationsIcon, path: '/admin/notifications' },
    { name: 'Integration Management', icon: IntegrationInstructionsIcon, path: '/admin/integrations' },
    { name: 'Transaction Management', icon: MonetizationOnIcon, path: '/admin/transactions' },
    { name: 'Email Template Management', icon: EmailIcon, path: '/admin/email-templates' },
    { name: 'Backup & Recovery', icon: BackupIcon, path: '/admin/backup' },
    { name: 'Developer Tools', icon: DeveloperModeIcon, path: '/admin/developer' },
    { name: 'Historical Data Management', icon: HistoryIcon, path: '/admin/historical' },
    { name: 'Ticketing System', icon: ConfirmationNumberIcon, path: '/admin/ticketing' },
    { name: 'System Logs', icon: SettingsIcon, path: '/admin/logs' },
  ];

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out...');
  };

  // Placeholder components for routes that don't have dedicated components yet
  const NewsManagement = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">News Management</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">News management functionality will be implemented here.</p>
      </div>
    </div>
  );

  const DashboardOverview = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Super Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">System Overview</h3>
          <p className="text-gray-600">Monitor system health and performance metrics.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">User Statistics</h3>
          <p className="text-gray-600">View user registration and activity trends.</p>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Recent Activities</h3>
          <p className="text-gray-600">Track recent system activities and changes.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Super Admin</h2>
        </div>
        
        <nav className="mt-6">
          {/* Core Management Links */}
          <div className="px-6 mb-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Core Management</h3>
          </div>
          {coreManagementLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}

          {/* Advanced Management Links */}
          <div className="px-6 mb-4 mt-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Advanced Management</h3>
          </div>
          {advancedManagementLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-primary-600 bg-primary-50 border-r-2 border-primary-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`
              }
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </NavLink>
          ))}

          {/* Logout */}
          <div className="px-6 mt-8">
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-0 py-3 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <LogoutIcon className="w-5 h-5 mr-3" />
              Logout
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/admin" element={<DashboardOverview />} />
          <Route path="/admin/users" element={<AdminUserManagement />} />
          <Route path="/admin/organisations" element={<AdminOrganisationManagement />} />
          <Route path="/admin/regional" element={<RegionalManagement />} />
          <Route path="/admin/database" element={<AdminDatabaseManagement />} />
          <Route path="/admin/security" element={<AdminSecurityCenter />} />
          <Route path="/admin/settings" element={<AdminSystemSettings />} />
          <Route path="/admin/kyc-kyb" element={<KYC_KYB_Management />} />
          <Route path="/admin/chat" element={<AdminChatManagement />} />
          <Route path="/admin/analytics" element={<AdminReportAnalytics />} />
          
          {/* Advanced Management Routes */}
          <Route path="/admin/whitelabel" element={<AdminWhiteLabellingCustomization />} />
          <Route path="/admin/referrals" element={<AdminReferralManagement />} />
          <Route path="/admin/rewards" element={<AdminRewardManagement />} />
          <Route path="/admin/ratings" element={<AdminRatingsManagement />} />
          <Route path="/admin/documents" element={<AdminDocumentManagement />} />
          <Route path="/admin/content" element={<AdminContentManagement />} />
          <Route path="/admin/news" element={<NewsManagement />} />
          <Route path="/admin/wallets" element={<AdminWalletManagement />} />
          <Route path="/admin/disputes" element={<AdminDisputeManagement />} />
          <Route path="/admin/notifications" element={<AdminNotificationManagement />} />
          <Route path="/admin/integrations" element={<AdminIntegrationManagement />} />
          <Route path="/admin/transactions" element={<AdminTransactionManagement />} />
          <Route path="/admin/email-templates" element={<AdminEmailTemplateManagement />} />
          <Route path="/admin/backup" element={<AdminBackupRecovery />} />
          <Route path="/admin/developer" element={<AdminDeveloperTools />} />
          <Route path="/admin/historical" element={<AdminHistoricalDataManagement />} />
          <Route path="/admin/ticketing" element={<AdminTicketingSystemManagement />} />
          <Route path="/admin/logs" element={<SystemLogConfiguration />} />
        </Routes>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;