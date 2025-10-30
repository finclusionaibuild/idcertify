import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useOnboarding } from '../contexts/OnboardingContext';
import { useNotifications } from '../contexts/NotificationContext';
import NotificationDropdown from './NotificationDropdown';
import HelpDropdown from './HelpDropdown';
import KYCStatus from './KYCStatus';
import { LayoutDashboard, Building2, Shield, FileCheck, UserCheck, UsersRound, Settings, Database, Globe, MapPin, HardDrive, Activity, CreditCard, Wallet, ArrowLeftRight, ShieldCheck, GitBranch, AlertTriangle, CheckCircle, Code, Plug, BarChart3, TrendingUp, FileBarChart, Target, MessageSquare, FileText, FolderOpen, Mail, Bell, LifeBuoy, Star, Gift, Users as Users2, Palette, ChevronDown, ChevronRight, Menu, X, FileSearch, CheckSquare, Award, Dna, HelpCircle, Clock, User, LogOut, Users, BarChart, FileText as FileTextIcon, User as UserIcon, Award as AwardIcon, Wallet as WalletIcon, Settings as SettingsIcon, Dna as DnaIcon, ChevronLeft } from 'lucide-react';

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

// Individual user navigation
const individualNavigation: NavigationData = {
  standalone: [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }
  ],
  groups: [
    {
      name: 'Identity & Verification',
      icon: Shield,
      children: [
        { name: 'Verification Requests', path: '/verification-requests', icon: FileCheck },
        { name: 'Attestation', path: '/attestation', icon: UserCheck },
        { name: 'Trust Score', path: '/trust-score', icon: Award },
        { name: 'Wallet', path: '/wallet', icon: Wallet },
        { name: 'Profile', path: '/profile', icon: UserIcon },
        { name: 'Biobank', path: '/biobank', icon: Dna },
        { name: 'Settings', path: '/settings', icon: Settings }
      ]
    }
  ]
};

// Organisation user navigation
const organisationNavigation: NavigationData = {
  standalone: [
    { name: 'Dashboard', path: '/organisation/dashboard', icon: LayoutDashboard }
  ],
  groups: [
    {
      name: 'Verification Management',
      icon: Shield,
      children: [
        { name: 'Verification Center', path: '/organisation/verifications', icon: FileCheck },
        { name: 'Background Check', path: '/organisation/background-check', icon: CheckCircle },
        { name: 'Bulk Upload', path: '/organisation/bulk-upload', icon: FileText },
        { name: 'Bulk Historical Upload', path: '/organisation/bulk-historical-upload', icon: FileText },
        { name: 'Attestation Endorsement', path: '/organisation/attestation-endorsement', icon: UserCheck }
      ]
    },
    {
      name: 'Organisation Management',
      icon: Building2,
      children: [
        { name: 'Company Profile', path: '/organisation/profile', icon: Building2 },
        { name: 'Staff Management', path: '/organisation/staff', icon: Users },
        { name: 'Risk Monitoring', path: '/organisation/risk-monitoring', icon: Activity },
        { name: 'Trust Score Analytics', path: '/organisation/trust-score', icon: Award },
        { name: 'Documents', path: '/organisation/documents', icon: FolderOpen },
        { name: 'Billing', path: '/organisation/billing', icon: CreditCard },
        { name: 'API Keys', path: '/organisation/api', icon: Code }
      ]
    }
  ]
};

// Admin navigation (existing)
const adminNavigation: NavigationData = {
  standalone: [
    { name: 'Dashboard', path: '/admin/super', icon: LayoutDashboard }
  ],
  groups: [
    {
      name: 'User & Access Management',
      icon: Users,
      children: [
        { name: 'User Management', path: '/admin/users', icon: Users },
        { name: 'Organisation Management', path: '/admin/organisations', icon: Building2 },
        { name: 'RBAC Management', path: '/admin/rbac', icon: Shield },
        { name: 'KYC/KYB Management', path: '/admin/kyc-kyb', icon: FileCheck },
        { name: 'Profile Management', path: '/admin/profile-management', icon: UserCheck },
        { name: 'Staff Management', path: '/admin/users', icon: UsersRound }
      ]
    },
    {
      name: 'System Operations & Configuration',
      icon: Settings,
      children: [
        { name: 'System Health Check', path: '/admin/system-health', icon: Activity },
        { name: 'System Settings', path: '/admin/system', icon: Settings },
        { name: 'System Log Configuration', path: '/admin/system-log', icon: FileText },
        { name: 'Database Management', path: '/admin/database', icon: Database },
        { name: 'Regional Management', path: '/admin/regions', icon: Globe },
        { name: 'Backup & Recovery', path: '/admin/backup-recovery', icon: HardDrive }
      ]
    },
    {
      name: 'Financial Management',
      icon: CreditCard,
      children: [
        { name: 'Subscription Management', path: '/admin/subscription', icon: CreditCard },
        { name: 'Transaction Management', path: '/admin/transactions', icon: ArrowLeftRight },
        { name: 'Escrow Management', path: '/admin/escrow-management', icon: Wallet },
        { name: 'Wallet Management', path: '/admin/wallet-management', icon: Wallet }
      ]
    },
    {
      name: 'Security & Compliance',
      icon: ShieldCheck,
      children: [
        { name: 'Security Center', path: '/admin/security', icon: ShieldCheck },
        { name: 'Approval Workflows', path: '/admin/approval-workflow', icon: GitBranch },
        { name: 'Dispute Management', path: '/admin/dispute-management', icon: AlertTriangle },
        { name: 'Verification Oversight', path: '/admin/verifications', icon: CheckCircle }
      ]
    },
    {
      name: 'Developer & Integrations',
      icon: Code,
      children: [
        { name: 'Developer Tools', path: '/admin/developer', icon: Code },
        { name: 'Integration Management', path: '/admin/integrations', icon: Plug }
      ]
    },
    {
      name: 'Data & Analytics',
      icon: BarChart3,
      children: [
        { name: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
        { name: 'Report & Analytics Management', path: '/admin/report-analytics-management', icon: TrendingUp },
        { name: 'Historical Data Management', path: '/admin/historical-data', icon: FileBarChart },
        { name: 'Trust Score Analytics', path: '/admin/trust-score-management', icon: Target }
      ]
    },
    {
      name: 'Communication',
      icon: MessageSquare,
      children: [
        { name: 'Chat Management', path: '/admin/chat-management', icon: MessageSquare },
        { name: 'Email & Template Management', path: '/admin/email-template-management', icon: Mail },
        { name: 'Notification Management', path: '/admin/notification-management', icon: Bell },
        { name: 'Ticketing System Management', path: '/admin/ticketing-system-management', icon: LifeBuoy }
      ]
    },
    {
      name: 'Features',
      icon: Settings,
      children: [
        { name: 'Content Management', path: '/admin/content-management', icon: FileText },
        { name: 'Document Management', path: '/admin/document-vault-management', icon: FolderOpen },
        { name: 'Background Check Management', path: '/admin/background-check-management', icon: CheckCircle },
        { name: 'Ratings Management', path: '/admin/ratings-management', icon: Star },
        { name: 'Referral Management', path: '/admin/referral-management', icon: Users2 },
        { name: 'Reward Management', path: '/admin/reward-management', icon: Gift },
        { name: 'White Label Customization', path: '/admin/white-label-customization', icon: Palette }
      ]
    },
    {
      name: 'Super Admin Features',
      icon: Shield,
      children: [
        { name: 'Employer Management', path: '/admin/employer-management', icon: Building2 },
        { name: 'Employee Management System', path: '/admin/employee-management', icon: UserCheck },
        { name: 'Verification Management System', path: '/admin/verification-management', icon: CheckSquare },
        { name: 'Trust Score Management System', path: '/admin/trust-score-management', icon: Award },
        { name: 'Attestation Management System', path: '/admin/attestation-management', icon: FileText },
        { name: 'Biobank Management System', path: '/admin/biobank-management', icon: Dna },
        { name: 'SureAML Management System', path: '/admin/sure-aml-management', icon: AlertTriangle },
        { name: 'SureCompliance Management System', path: '/admin/sure-compliance-management', icon: Shield },
        { name: 'Data Monitoring Management System', path: '/admin/data-monitoring-management', icon: Activity },
        { name: 'Company Management', path: '/admin/company-management', icon: Building2 },
        { name: 'Help & Support', path: '/admin/help-support', icon: HelpCircle },
        { name: 'Down Time Tracker System', path: '/admin/downtime-tracker', icon: Clock }
      ]
    }
  ]
};

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationDropdownOpen, setNotificationDropdownOpen] = useState(false);
  const [helpDropdownOpen, setHelpDropdownOpen] = useState(false);

  // Get navigation data based on user role
  const getNavigationData = (): NavigationData => {
    if (!profile) return individualNavigation; // Default fallback
    
    switch (profile.role) {
      case 'individual':
        return individualNavigation;
      case 'organisation':
        return organisationNavigation;
      case 'admin':
        return adminNavigation;
      default:
        return individualNavigation;
    }
  };

  const navigationData = getNavigationData();

  const toggleGroup = (groupName: string) => {
    console.log('Toggling group:', groupName, 'Sidebar collapsed:', sidebarCollapsed);
    setExpandedGroups(prev => {
      // If the group is already expanded, collapse it
      if (prev.includes(groupName)) {
        return prev.filter(name => name !== groupName);
      }
      // If the group is not expanded, expand it and collapse all others (accordion behavior)
      return [groupName];
    });
    setProfileDropdownOpen(false);
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isGroupExpanded = (groupName: string) => expandedGroups.includes(groupName);

  const isActiveLink = (path: string) => location.pathname === path;

  const isGroupActive = (group: NavigationGroup) => 
    group.children.some(child => isActiveLink(child.path));

  // Auto-expand groups that contain the current active page
  useEffect(() => {
    navigationData.groups.forEach(group => {
      if (isGroupActive(group) && !isGroupExpanded(group.name)) {
        setExpandedGroups(prev => [...prev, group.name]);
      }
    });
  }, [location.pathname]);

  // Close popup menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarCollapsed && expandedGroups.length > 0) {
        const target = event.target as Element;
        const sidebar = document.querySelector('[data-sidebar]');
        if (sidebar && !sidebar.contains(target)) {
          setExpandedGroups([]);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [sidebarCollapsed, expandedGroups]);

  // Get user display info
  const getUserDisplayInfo = () => {
    if (!profile) return { name: 'User', role: 'User' };
    
    const roleDisplayNames = {
      individual: 'Individual',
      organisation: 'Organisation',
      admin: 'Admin'
    };
    
    return {
      name: profile.first_name ? `${profile.first_name} ${profile.last_name || ''}`.trim() : profile.email,
      role: roleDisplayNames[profile.role] || 'User'
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on all screen sizes */}
      <div className={`
        fixed inset-y-0 left-0 z-50 bg-primary-600 transform transition-all duration-300 ease-in-out flex flex-col
        ${sidebarCollapsed ? 'w-16' : 'w-80'}
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `} data-sidebar>
        <div className={`flex items-center justify-center h-16 bg-primary-700 ${sidebarCollapsed ? 'px-1' : 'px-6'}`}>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            {!sidebarCollapsed && <span className="text-white font-bold text-lg">IDCertify</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden absolute right-2 text-white hover:text-gray-200 transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Collapse/Expand Button - Outside sidebar bounds */}
        <button
          onClick={toggleSidebarCollapse}
          className={`
            fixed top-20 z-[60] bg-white hover:bg-gray-50 text-primary-600 transition-all duration-300 ease-in-out
            border border-gray-300 shadow-lg rounded-r-lg p-2 flex items-center justify-center w-8 h-8
            ${sidebarCollapsed ? 'left-16' : 'left-80'}
          `}
          title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <ChevronLeft className={`w-5 h-5 transition-transform duration-300 ${sidebarCollapsed ? '' : 'rotate-180'}`} />
        </button>

        <nav className={`flex-1 py-6 space-y-2 flex-grow overflow-y-auto ${sidebarCollapsed ? 'px-1' : 'px-4'}`}>
          {/* Standalone items */}
          {navigationData.standalone.map((item) => {
            const Icon = item.icon;
            const tourAttr = item.name === 'Staff Management' ? { 'data-tour': 'staff' } : 
                            item.name === 'Bulk Upload' ? { 'data-tour': 'bulk-upload' } : {};
            return (
              <Link
                key={item.path}
                to={item.path}
                {...tourAttr}
                className={`
                  flex items-center py-3 text-sm font-medium rounded-lg transition-all duration-200
                  ${sidebarCollapsed ? 'justify-center px-1' : 'px-4'}
                  ${isActiveLink(item.path)
                    ? 'bg-primary-700 text-white shadow-lg'
                    : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}

          {/* Grouped items with semantic HTML structure */}
          <ul className="space-y-1">
          {navigationData.groups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = isGroupExpanded(group.name);
            const isActive = isGroupActive(group);

            return (
                <li 
                  key={group.name} 
                  className={`has-submenu ${sidebarCollapsed ? 'relative group' : ''}`}
                  onMouseEnter={() => {
                    if (sidebarCollapsed) {
                      setExpandedGroups(prev => [...prev, group.name]);
                    }
                  }}
                >
                <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (sidebarCollapsed) {
                        // Toggle the submenu on click
                        toggleGroup(group.name);
                      } else {
                        // When expanded, normal toggle behavior
                        toggleGroup(group.name);
                      }
                    }}
                  className={`
                      w-full flex items-center py-3 text-sm font-medium rounded-lg transition-all duration-200
                      ${sidebarCollapsed ? 'justify-center px-1' : 'px-4 justify-between'}
                    ${isActive
                      ? 'bg-primary-700 text-white shadow-lg'
                      : 'text-primary-100 hover:bg-primary-700 hover:text-white'
                    }
                  `}
                    title={sidebarCollapsed ? group.name : undefined}
                  >
                    <div className="flex items-center">
                      <GroupIcon className="w-5 h-5 flex-shrink-0" />
                      {!sidebarCollapsed && <span className="ml-3">{group.name}</span>}
                  </div>
                    {!sidebarCollapsed && (
                      isExpanded ? (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                      )
                  )}
                </button>

                  {/* Group children - Show as floating tooltip when collapsed */}
                  {sidebarCollapsed && isExpanded && (
                    <div 
                      className="fixed left-16 bg-white rounded-lg shadow-2xl border border-gray-200 z-[9999] min-w-48 animate-in slide-in-from-left-2 duration-200"
                      style={{ 
                        top: '50%',
                        transform: 'translateY(-50%)',
                        marginLeft: '1rem',
                        maxHeight: 'calc(100vh - 100px)',
                        overflowY: 'auto'
                      }}
                      onMouseEnter={() => {
                        // Keep menu open when hovering over it
                        setExpandedGroups(prev => [...prev, group.name]);
                      }}
                      onMouseLeave={() => {
                        // Don't close immediately when leaving tooltip
                        // Only close when clicking outside or selecting item
                      }}
                    >
                      <div className="p-2">
                        <div className="text-gray-700 text-sm font-medium px-3 py-2 border-b border-gray-100">
                          {group.name}
                        </div>
                        <ul className="space-y-1 mt-2 relative submenu">
                          {group.children.map((child) => {
                            const ChildIcon = child.icon;
                            return (
                              <li key={child.path} className="relative">
                                <Link
                                  to={child.path}
                                  className={`
                                    flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 relative
                                    ${isActiveLink(child.path)
                                      ? 'bg-gray-100 text-gray-900'
                                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }
                                  `}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSidebarOpen(false);
                                    setExpandedGroups(prev => prev.filter(name => name !== group.name));
                                  }}
                                >
                                  <ChildIcon className="w-4 h-4 mr-3 flex-shrink-0 relative z-10" />
                                  {child.name}
                                </Link>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Group children - Normal view when expanded */}
                  {isExpanded && !sidebarCollapsed && (
                    <ul className="ml-4 space-y-1 animate-slide-up relative submenu">
                    {group.children.map((child) => {
                      const ChildIcon = child.icon;
                      const tourAttr = child.name === 'Staff Management' ? { 'data-tour': 'staff' } : 
                                      child.name === 'Bulk Upload' ? { 'data-tour': 'bulk-upload' } : {};
                      return (
                          <li key={child.path} className="relative">
                        <Link
                          to={child.path}
                          {...tourAttr}
                          className={`
                                flex items-center px-4 py-2 text-sm rounded-lg transition-all duration-200 relative
                            ${isActiveLink(child.path)
                              ? 'bg-primary-800 text-white shadow-md border-l-4 border-white'
                              : 'text-primary-200 hover:bg-primary-700 hover:text-white'
                            }
                          `}
                          onClick={() => setSidebarOpen(false)}
                        >
                              <ChildIcon className="w-4 h-4 mr-3 flex-shrink-0 relative z-10" />
                          {child.name}
                        </Link>
                          </li>
                      );
                    })}
                    </ul>
                )}
                </li>
            );
          })}
          </ul>
        </nav>

        {/* User info at bottom */}
        <div className={`p-4 border-t border-primary-500 flex-shrink-0 ${sidebarCollapsed ? 'px-1' : 'px-4'}`}>
          <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
            <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            {!sidebarCollapsed && (
            <div>
              <p className="text-white font-medium text-sm">{userInfo.name}</p>
              <p className="text-primary-200 text-xs">{userInfo.role}</p>
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content - Adjusted for fixed sidebar */}
      <div className={`flex-1 flex flex-col ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-80'}`}>
        {/* Top Navigation Bar - Desktop */}
        <div className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            {/* Left side - Breadcrumb or page title */}
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {(() => {
                  const path = location.pathname;
                  if (path.includes('/dashboard')) return 'Dashboard';
                  if (path.includes('/verification')) return 'Verification';
                  if (path.includes('/profile')) return 'Profile';
                  if (path.includes('/settings')) return 'Settings';
                  if (path.includes('/admin')) return 'Admin Panel';
                  if (path.includes('/organisation')) return 'Organisation';
                  return 'IDCertify';
                })()}
              </h1>
            </div>

            {/* Right side - Actions and user menu */}
            <div className="flex items-center space-x-4">
              {/* Compact KYC Status Indicator */}
              <div className="relative">
                {(() => {
                  const { profile, isKYCRequired } = useAuth();
                  const { state } = useOnboarding();
                  
                  if (!profile || !isKYCRequired()) {
                    return null;
                  }
                  
                  const kycStatus = profile.kyc_status || 'none';
                  const kycTier = state.kycTier;
                  
                  const getStatusConfig = () => {
                    switch (kycStatus) {
                      case 'verified':
                        return {
                          bgColor: 'bg-green-50',
                          textColor: 'text-green-700',
                          icon: CheckCircle,
                          text: kycTier === 'tier1' ? 'Tier 1' : kycTier === 'tier2' ? 'Tier 2' : kycTier === 'tier3' ? 'Tier 3' : 'Verified'
                        };
                      case 'pending':
                        return {
                          bgColor: 'bg-yellow-50',
                          textColor: 'text-yellow-700',
                          icon: Clock,
                          text: 'Pending'
                        };
                      case 'rejected':
                        return {
                          bgColor: 'bg-red-50',
                          textColor: 'text-red-700',
                          icon: AlertTriangle,
                          text: 'Rejected'
                        };
                      default:
                        return {
                          bgColor: 'bg-blue-50',
                          textColor: 'text-blue-700',
                          icon: Shield,
                          text: 'No Tier'
                        };
                    }
                  };
                  
                  const statusConfig = getStatusConfig();
                  const StatusIcon = statusConfig.icon;
                  
                  return (
                    <button className={`flex items-center space-x-2 px-3 py-2 text-sm ${statusConfig.bgColor} ${statusConfig.textColor} rounded-lg hover:opacity-80 transition-colors`}>
                      <StatusIcon className="w-4 h-4" />
                      <span className="hidden sm:inline">KYC: {statusConfig.text}</span>
                      <span className="sm:hidden">{statusConfig.text}</span>
                    </button>
                  );
                })()}
              </div>
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </button>
                <NotificationDropdown 
                  isOpen={notificationDropdownOpen}
                  onClose={() => setNotificationDropdownOpen(false)}
                />
              </div>

              {/* Help */}
              <div className="relative">
            <button
                  onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
                  <HelpCircle className="w-5 h-5" />
            </button>
                <HelpDropdown 
                  isOpen={helpDropdownOpen}
                  onClose={() => setHelpDropdownOpen(false)}
                />
              </div>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={toggleProfileDropdown}
                  className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg px-3 py-2 transition-colors"
            >
              <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
                  <div className="text-left">
                    <p className="text-sm font-medium">{userInfo.name}</p>
                    <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    <p className="text-xs text-gray-400 mt-1">{userInfo.role}</p>
                  </div>
              <ChevronDown className="h-4 w-4" />
            </button>

            {/* Dropdown Menu */}
            {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">{userInfo.name}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                      <p className="text-xs text-gray-400 mt-1">{userInfo.role}</p>
                </div>
                <Link
                  to="/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                      <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                      <LogOut className="h-4 w-4 mr-3" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
            </div>
          </div>
        </div>

        {/* Mobile header */}
        <div className="block lg:hidden bg-white shadow-sm border-b border-gray-200">
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
            <div className="flex items-center space-x-2">
              {/* Mobile Notifications */}
              <div className="relative">
                <button 
                  onClick={() => setNotificationDropdownOpen(!notificationDropdownOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[18px] flex items-center justify-center">
                      {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                  )}
                </button>
                <NotificationDropdown 
                  isOpen={notificationDropdownOpen}
                  onClose={() => setNotificationDropdownOpen(false)}
                />
              </div>

              {/* Mobile Help */}
              <div className="relative">
                <button 
                  onClick={() => setHelpDropdownOpen(!helpDropdownOpen)}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                </button>
                <HelpDropdown 
                  isOpen={helpDropdownOpen}
                  onClose={() => setHelpDropdownOpen(false)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {/* KYC Status Banner - Show full KYC information */}
          {(() => {
            const { profile, isKYCRequired } = useAuth();
            const { state } = useOnboarding();
            
            if (!profile || !isKYCRequired() || (profile.kyc_status === 'verified' && state.kycTier !== 'none')) {
              return null;
            }
            
            return (
              <div className="mb-6">
                <KYCStatus />
              </div>
            );
          })()}
          <Outlet />
        </main>
      </div>
    </div>
  );
}