import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { 
  Shield, 
  User, 
  Activity,
  CreditCard,
  Globe, 
  Building, 
  Settings, 
  Bell, 
  Wallet, 
  FileText, 
  Users, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Award,
  UserCheck,
  Upload,
  Target,
  Search,
  ChevronDown,
  History,
  Lock,
  FileCheck,
  GitBranch,
  Code,
  Database,
  AlertTriangle,
  MessageSquare,
  Mail,
} from 'lucide-react'
import { useState } from 'react'
import { getUserDisplayName } from '../lib/mockData'

const Layout = () => {
  const { profile, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/auth')
  }

  const getNavItems = () => {
    const baseItems = [
      { href: '/admin/rbac', label: 'RBAC Management', icon: Lock },
      { href: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    ]

    if (profile?.role === 'individual') {
      return [
        ...baseItems,
        { href: '/verification-requests', label: 'Verification Requests', icon: Shield },
        { href: '/attestation', label: 'Attestation', icon: UserCheck },
        { href: '/trust-score', label: 'Trust Score', icon: Award },
        { href: '/wallet', label: 'Wallet', icon: Wallet },
        { href: '/profile', label: 'Profile', icon: User },
        { href: '/biobank', label: 'Biobank', icon: FileText },
        { href: '/settings', label: 'Settings', icon: Settings },
      ]
    }

    if (profile?.role === 'organisation') {
      return [
        ...baseItems,
        { href: '/organisation/verifications', label: 'Verifications', icon: Shield },
        { href: '/organisation/attestation-endorsement', label: 'Attestation & Endorsement', icon: UserCheck },
        { href: '/organisation/background-check', label: 'Background Check', icon: Search },
        { href: '/organisation/trust-score', label: 'Trust Score', icon: Target },
        { href: '/organisation/bulk-upload', label: 'Bulk Upload', icon: Upload },
        { href: '/organisation/bulk-historical-upload', label: 'Historical Data', icon: History },
        { href: '/organisation/profile', label: 'Company Profile', icon: Building },
        { href: '/organisation/staff', label: 'Staff Management', icon: Users },
        { href: '/organisation/documents', label: 'Document Vault', icon: FileText },
        { href: '/organisation/billing', label: 'Billing', icon: Wallet },
        { href: '/organisation/api', label: 'API Keys', icon: Settings },
      ]
    }

    if (profile?.role === 'admin') {
      return [
        ...baseItems,
        { href: '/admin/kyc-kyb', label: 'KYC/KYB Management', icon: FileCheck },
        { href: '/admin/users', label: 'User Management', icon: Users },
        { href: '/admin/organisations', label: 'Organisations', icon: Building },
        { href: '/admin/regions', label: 'Regional Management', icon: Globe },
        { href: '/admin/bulk-historical', label: 'Historical Data', icon: History },
        { href: '/admin/historical-data', label: 'Historical Records', icon: History },
        { href: '/admin/system-health', label: 'System Health Check', icon: Activity },
        { href: '/admin/subscription', label: 'Subscription & Fee Management', icon: CreditCard },
        { href: '/admin/system-log', label: 'System Log & Configuration', icon: FileText },
        { href: '/admin/profile-management', label: 'Profile Management', icon: User },
        { href: '/admin/system-health', label: 'System Health Check', icon: Activity },
        { href: '/admin/subscription', label: 'Subscription & Fee Management', icon: CreditCard },
        { href: '/admin/system-log', label: 'System Log & Configuration', icon: FileText },
        { href: '/admin/profile-management', label: 'Profile Management', icon: User },
        { href: '/admin/integrations', label: 'Third-Party Integrations', icon: GitBranch },
        { href: '/admin/api-management', label: 'API Integration Management', icon: Code },
        { href: '/admin/developer', label: 'Developer Tools & Sandbox', icon: Database },
        { href: '/admin/security', label: 'Security & Settings Center', icon: Lock },
        { href: '/admin/database', label: 'Database Management', icon: Database },
        { href: '/admin/developer', label: 'Developer Tools & Sandbox', icon: Code },
        { href: '/admin/security', label: 'Security & Settings Center', icon: Shield },
        { href: '/admin/database', label: 'Database Management', icon: Database },
        { href: '/admin/wallet-management', label: 'Wallet Management', icon: Wallet },
        { href: '/admin/escrow-management', label: 'Escrow Management', icon: Lock },
        { href: '/admin/background-check-management', label: 'Background Check Management', icon: Search },
        { href: '/admin/report-analytics-management', label: 'Report & Analytics Management', icon: BarChart3 },
        { href: '/admin/dispute-management', label: 'Dispute Management', icon: AlertTriangle },
        { href: '/admin/chat-management', label: 'Chat Management', icon: MessageSquare },
        { href: '/admin/email-template-management', label: 'Email & Template Management', icon: Mail },
        { href: '/admin/notification-management', label: 'Notification Management', icon: Bell },
        { href: '/admin/ticketing-system-management', label: 'Ticketing System Management', icon: MessageSquare },
        { href: '/admin/approval-workflow', label: 'Approval Workflows', icon: GitBranch },
        { href: '/admin/verifications', label: 'Verification Oversight', icon: Shield },
        { href: '/admin/transactions', label: 'Transaction Management', icon: Wallet },
        { href: '/admin/system', label: 'System Settings', icon: Settings },
        { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      ]
    }

    return baseItems
  }

  const navItems = getNavItems()

  const NavLink = ({ href, label, icon: Icon }: { href: string; label: string; icon: any }) => {
    const isActive = location.pathname === href
    return (
      <Link
        to={href}
        className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
          isActive
            ? 'bg-white bg-opacity-20 text-white border-r-2 border-white'
            : 'text-red-100 hover:bg-white hover:bg-opacity-10 hover:text-white'
        }`}
        onClick={() => setSidebarOpen(false)}
      >
        <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
        <span className="truncate">{label}</span>
      </Link>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 lg:flex">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-col ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`} style={{ backgroundColor: '#B01116' }}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-red-800 border-opacity-30 flex-shrink-0">
          <div className="flex items-center min-w-0">
            <img 
              src="/IDC Logo Landscape Reverse T.png" 
              alt="IDCertify Logo" 
              className="h-8 w-auto"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-red-100 hover:text-white hover:bg-white hover:bg-opacity-10 flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col h-full flex-1">
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink key={item.href} {...item} />
            ))}
          </nav>

          {/* User info and logout */}
          <div className="border-t border-red-800 border-opacity-30 p-4 flex-shrink-0">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="ml-3 min-w-0 flex-1">
                <p className="text-sm font-medium text-white truncate">
                  {profile ? getUserDisplayName(profile) : 'User'}
                </p>
                <p className="text-xs text-red-100 capitalize truncate">{profile?.role}</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex items-center w-full px-4 py-2 text-sm text-red-100 hover:bg-white hover:bg-opacity-10 hover:text-white rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3 flex-shrink-0" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 bg-white border-b border-gray-200 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-4 ml-auto">
            {/* Notifications */}
            <Link
              to="/notifications"
              className="relative p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Bell className="w-5 h-5" />
              {/* Notification badge */}
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>

            {/* Trust Score Display */}
            {profile && (
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">
                  Trust Score: <span className="text-primary-600 font-bold">{profile.trust_score}</span>
                </p>
                <p className="text-xs text-gray-500">{profile.sure_rating}</p>
              </div>
            )}

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">
                      {profile ? getUserDisplayName(profile) : 'User'}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">{profile?.role}</p>
                  </div>
                  
                  <Link
                    to="/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => setProfileDropdownOpen(false)}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </Link>
                  
                  <button
                    onClick={() => {
                      setProfileDropdownOpen(false)
                      handleSignOut()
                    }}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto bg-white">
          <div className="max-w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Click outside to close dropdown */}
      {profileDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </div>
  )
}

export default Layout