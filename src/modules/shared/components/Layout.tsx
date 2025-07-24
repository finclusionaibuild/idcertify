import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Shield, 
  FileCheck, 
  UserCheck,
  UsersRound,
  Settings,
  Database,
  Globe,
  MapPin,
  HardDrive,
  Activity,
  CreditCard,
  Wallet,
  ArrowLeftRight,
  ShieldCheck,
  GitBranch,
  AlertTriangle,
  CheckCircle,
  Code,
  Plug,
  BarChart3,
  TrendingUp,
  FileBarChart,
  Target,
  MessageSquare,
  FileText,
  FolderOpen,
  Mail,
  Bell,
  LifeBuoy,
  Star,
  Gift,
  Users2,
  Palette,
  ChevronDown,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

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

interface NavigationData {
  standalone: NavigationItem[];
  groups: NavigationGroup[];
}

const navigationData: NavigationData = {
  standalone: [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard }
  ],
  groups: [
    {
      name: 'User & Access Management',
      icon: Users,
      children: [
        { name: 'User Management', path: '/admin/user-management', icon: Users },
        { name: 'Organisation Management', path: '/admin/organisation-management', icon: Building2 },
        { name: 'RBAC Management', path: '/admin/rbac-management', icon: Shield },
        { name: 'KYC/KYB Management', path: '/admin/kyc-kyb-management', icon: FileCheck },
        { name: 'Profile Management', path: '/admin/profile-management', icon: UserCheck },
        { name: 'Staff Management', path: '/admin/staff-management', icon: UsersRound }
      ]
    },
    {
      name: 'System Operations & Configuration',
      icon: Settings,
      children: [
        { name: 'System Health Check', path: '/admin/system-health-check', icon: Activity },
        { name: 'System Settings', path: '/admin/system-settings', icon: Settings },
        { name: 'System Log Configuration', path: '/admin/system-log-configuration', icon: FileText },
        { name: 'Database Management', path: '/admin/database-management', icon: Database },
        { name: 'Regional Management', path: '/admin/regional-management', icon: Globe },
        { name: 'Multi-Regional Management', path: '/admin/multi-regional-management', icon: MapPin },
        { name: 'Backup & Recovery', path: '/admin/backup-recovery', icon: HardDrive }
      ]
    },
    {
      name: 'Financial Management',
      icon: CreditCard,
      children: [
        { name: 'Subscription Management', path: '/admin/subscription-management', icon: CreditCard },
        { name: 'Transaction Management', path: '/admin/transaction-management', icon: ArrowLeftRight },
        { name: 'Escrow Management', path: '/admin/escrow-management', icon: Wallet },
        { name: 'Wallet Management', path: '/admin/wallet-management', icon: Wallet }
      ]
    },
    {
      name: 'Security & Compliance',
      icon: ShieldCheck,
      children: [
        { name: 'Security Center', path: '/admin/security-center', icon: ShieldCheck },
        { name: 'Approval Workflows', path: '/admin/approval-workflow', icon: GitBranch },
        { name: 'Dispute Management', path: '/admin/dispute-management', icon: AlertTriangle },
        { name: 'Verification Oversight', path: '/admin/verification-management', icon: CheckCircle }
      ]
    },
    {
      name: 'Developer & Integrations',
      icon: Code,
      children: [
        { name: 'Developer Tools', path: '/admin/developer-tools', icon: Code },
        { name: 'Integration Management', path: '/admin/integration-management', icon: Plug }
      ]
    },
    {
      name: 'Data & Analytics',
      icon: BarChart3,
      children: [
        { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
        { name: 'Report & Analytics Management', path: '/admin/report-analytics', icon: TrendingUp },
        { name: 'Historical Data Management', path: '/admin/historical-data-management', icon: FileBarChart },
        { name: 'Trust Score Analytics', path: '/admin/trust-score-analytics', icon: Target }
      ]
    },
    {
      name: 'Communication',
      icon: MessageSquare,
      children: [
        { name: 'Chat Management', path: '/admin/chat-management', icon: MessageSquare },
        { name: 'Email & Template Management', path: '/admin/email-template-management', icon: Mail },
        { name: 'Notification Management', path: '/admin/notification-management', icon: Bell },
        { name: 'Ticketing System Management', path: '/admin/ticketing-system', icon: LifeBuoy }
      ]
    },
    {
      name: 'Features',
      icon: Settings,
      children: [
        { name: 'Content Management', path: '/admin/content-management', icon: FileText },
        { name: 'Document Management', path: '/admin/document-management', icon: FolderOpen },
        { name: 'Background Check Management', path: '/admin/background-check-management', icon: CheckCircle },
        { name: 'Ratings Management', path: '/admin/ratings-management', icon: Star },
        { name: 'Referral Management', path: '/admin/referral-management', icon: Users2 },
        { name: 'Reward Management', path: '/admin/reward-management', icon: Gift },
        { name: 'White Label Customization', path: '/admin/white-label-customization', icon: Palette }
      ]
    }
  ]
};

export default function Layout() {
  const location = useLocation();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleGroup = (groupName: string) => {
    setExpandedGroups(prev => 
      prev.includes(groupName) 
        ? prev.filter(name => name !== groupName)
        : [...prev, groupName]
    );
  };

  const isGroupExpanded = (groupName: string) => expandedGroups.includes(groupName);

  const isActiveLink = (path: string) => location.pathname === path;

  const isGroupActive = (group: NavigationGroup) => 
    group.children.some(child => isActiveLink(child.path));

  // Auto-expand groups that contain the current active page
  React.useEffect(() => {
    navigationData.groups.forEach(group => {
      if (isGroupActive(group) && !isGroupExpanded(group.name)) {
        setExpandedGroups(prev => [...prev, group.name]);
      }
    });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-primary-600 text-white shadow-xl transition-transform duration-300 ease-in-out flex flex-col ${
        fixed inset-y-0 left-0 z-50 w-80 bg-primary-600 transform transition-transform duration-300 ease-in-out flex flex-col lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-primary-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <span className="text-white font-bold text-lg">IDCertify</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white hover:text-gray-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 flex-grow overflow-y-auto">
          {/* Standalone items */}
          {navigationData.standalone.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${isActiveLink(item.path)
                    ? 'bg-primary-700 text-white shadow-lg'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                {item.name}
              </Link>
            );
          })}

          {/* Grouped items */}
          {navigationData.groups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = isGroupExpanded(group.name);
            const isActive = isGroupActive(group);

            return (
              <div key={group.name} className="space-y-1">
                <button
                  onClick={() => toggleGroup(group.name)}
                  className={`
                    w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200
                    ${isActive
                      ? 'bg-primary-700 text-white shadow-lg'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                    }
                  `}
                >
                  <div className="flex items-center text-left">
                    <GroupIcon className="w-5 h-5 mr-3 flex-shrink-0" />
                    {group.name}
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                  )}
                </button>

                {/* Group children */}
                {isExpanded && (
                  <div className="ml-4 space-y-1 animate-slide-up">
                    {group.children.map((child) => {
                      const ChildIcon = child.icon;
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          className={`
                            flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200
                            ${isActiveLink(child.path)
                              ? 'bg-primary-800 text-white shadow-md border-l-4 border-white'
                              : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                            }
                          `}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <ChildIcon className="w-4 h-4 mr-3 flex-shrink-0" />
                          {child.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User info at bottom */}
        <div className="p-4 border-t border-primary-500 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Super Admin</p>
              <p className="text-primary-200 text-xs">Admin</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Mobile header */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-primary-600 rounded-full"></div>
                </div>
              </div>
              <span className="text-gray-900 font-bold">IDCertify</span>
            </div>
            <div className="w-6 h-6"></div> {/* Spacer for centering */}
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}