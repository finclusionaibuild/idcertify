import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import {
  Menu, X, ChevronDown, ChevronRight, Bell, User, LogOut,
  LayoutDashboard, FileText, ShieldCheck, CheckCircle, Wallet,
  Settings, Key, CreditCard, Building, Users, ClipboardList,
  Upload, BarChart3, Award, UserCheck, Globe, Briefcase
} from 'lucide-react';
import { useOnboarding } from '../contexts/OnboardingContext';

interface SidebarItem {
  title: string;
  href: string;
}

interface SidebarNavItem {
  title: string;
  icon: React.ComponentType<any>;
  items: SidebarItem[];
}

// Individual Account Navigation
const individualSidebarNavItems: SidebarNavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      { title: 'Dashboard', href: '/individual/dashboard' }
    ]
  },
  {
    title: 'Verification Requests',
    icon: ShieldCheck,
    items: [
      { title: 'Verification Requests', href: '/verification-requests' }
    ]
  },
  {
    title: 'Attestation',
    icon: Users,
    items: [
      { title: 'Attestation', href: '/attestation' }
    ]
  },
  {
    title: 'Trust Score',
    icon: Award,
    items: [
      { title: 'Trust Score', href: '/trust-score' }
    ]
  },
  {
    title: 'Wallet',
    icon: Wallet,
    items: [
      { title: 'Wallet', href: '/wallet' }
    ]
  },
  {
    title: 'Profile',
    icon: User,
    items: [
      { title: 'Profile', href: '/profile' }
    ]
  },
  {
    title: 'Biobank',
    icon: FileText,
    items: [
      { title: 'Biobank', href: '/biobank' }
    ]
  },
  {
    title: 'Settings',
    icon: Settings,
    items: [
      { title: 'Settings', href: '/settings' }
    ]
  }
];

// Organization Account Navigation
const organizationSidebarNavItems: SidebarNavItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      { title: 'Organization Overview', href: '/organization/dashboard' },
      { title: 'Analytics', href: '/trust-score-analytics' },
    ]
  },
  {
    title: 'Company Management',
    icon: Building,
    items: [
      { title: 'Company Profile', href: '/company-profile' },
      { title: 'Staff Management', href: '/staff-management' },
      { title: 'Departments', href: '/departments' },
    ]
  },
  {
    title: 'Verification Services',
    icon: CheckCircle,
    items: [
      { title: 'Verification Requests', href: '/verification-requests' },
      { title: 'Bulk Upload', href: '/bulk-upload' },
      { title: 'Historical Data', href: '/bulk-historical-upload' },
      { title: 'Background Checks', href: '/background-check' },
    ]
  },
  {
    title: 'Trust & Compliance',
    icon: ShieldCheck,
    items: [
      { title: 'Trust Score Management', href: '/trust-score' },
      { title: 'Compliance Dashboard', href: '/compliance' },
      { title: 'Audit Logs', href: '/audit-logs' },
    ]
  },
  {
    title: 'Financial Management',
    icon: CreditCard,
    items: [
      { title: 'Billing & Subscriptions', href: '/billing' },
      { title: 'Usage Analytics', href: '/usage-analytics' },
      { title: 'Cost Management', href: '/cost-management' },
    ]
  },
  {
    title: 'Integration & API',
    icon: Globe,
    items: [
      { title: 'API Management', href: '/api-keys' },
      { title: 'Webhooks', href: '/webhooks' },
      { title: 'Developer Tools', href: '/developer-tools' },
    ]
  },
  {
    title: 'Settings',
    icon: Settings,
    items: [
      { title: 'Organization Settings', href: '/settings' },
      { title: 'User Permissions', href: '/user-permissions' },
      { title: 'Security Settings', href: '/security-settings' },
    ]
  }
];

const sidebarNavItems: SidebarNavItem[] = [
  {
    title: 'User & Access Management',
    icon: Users,
    items: [
      { title: 'User Management', href: '/admin/user-management' },
      { title: 'Organisation Management', href: '/admin/organisation-management' },
      { title: 'RBAC Management', href: '/admin/rbac-management' },
      { title: 'KYC/KYB Management', href: '/admin/kyc-kyb-management' },
      { title: 'Profile Management', href: '/admin/profile-management' },
      { title: 'Staff Management', href: '/admin/staff-management' }
    ]
  },
  {
    title: 'System Operations',
    icon: Settings,
    items: [
      { title: 'System Health Check', href: '/admin/system-health-check' },
      { title: 'System Settings', href: '/admin/system-settings' },
      { title: 'Database Management', href: '/admin/database-management' },
      { title: 'Regional Management', href: '/admin/regional-management' },
      { title: 'Backup & Recovery', href: '/admin/backup-recovery' }
    ]
  },
  {
    title: 'Financial Management',
    icon: CreditCard,
    items: [
      { title: 'Subscription Management', href: '/admin/subscription-management' },
      { title: 'Transaction Management', href: '/admin/transaction-management' },
      { title: 'Escrow Management', href: '/admin/escrow-management' },
      { title: 'Wallet Management', href: '/admin/wallet-management' }
    ]
  },
  {
    title: 'Security & Compliance',
    icon: ShieldCheck,
    items: [
      { title: 'Security Center', href: '/admin/security-center' },
      { title: 'Approval Workflows', href: '/admin/approval-workflow' },
      { title: 'Dispute Management', href: '/admin/dispute-management' },
      { title: 'Verification Oversight', href: '/admin/verification-management' }
    ]
  }
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // Default to individual for now - you can implement user type detection later
  const userType = 'individual';
  
  const location = useLocation();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const toggleExpanded = (title: string) => {
    if (expandedItems.includes(title)) {
      setExpandedItems(expandedItems.filter(item => item !== title));
    } else {
      setExpandedItems([...expandedItems, title]);
    }
  };

  // Get navigation items based on user type
  const getNavigationItems = () => {
    if (userType === 'individual') return individualSidebarNavItems;
    if (userType === 'organization') return organizationSidebarNavItems;
    // Default to admin navigation for admin users or fallback
    return sidebarNavItems;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center justify-between h-16 px-6 bg-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">ID</span>
          </div>
          <span className="text-white font-bold text-lg">IDCertify</span>
        </div>
        <button onClick={toggleSidebar} className="lg:hidden text-gray-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {getNavigationItems().map((item) => {
          const isExpanded = expandedItems.includes(item.title);
          const Icon = item.icon;
          
          return (
            <div key={item.title}>
              <button
                onClick={() => toggleExpanded(item.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>
              
              {isExpanded && (
                <div className="mt-2 space-y-1">
                  {item.items.map((subItem) => (
                    <Link
                      key={subItem.title}
                      to={subItem.href}
                      className={`block px-3 py-2 ml-8 text-sm rounded-md transition-colors ${
                        location.pathname === subItem.href
                          ? 'text-white bg-primary-600'
                          : 'text-gray-400 hover:text-white hover:bg-gray-700'
                      }`}
                    >
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-300" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-400">admin@idcertify.com</p>
          </div>
          <button className="text-gray-400 hover:text-white">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-900 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-900 lg:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Bell className="w-6 h-6" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}