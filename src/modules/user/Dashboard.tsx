import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Shield, 
  FileText, 
  Users, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle, 
  Clock,
  Wallet,
  Bell,
  Activity,
  Server,
  Eye,
  ExternalLink,
  ChevronRight,
  Calendar,
  BarChart3,
  PieChart,
  Settings,
  UserCheck,
  UserX,
  Building,
  Search,
  Filter,
  Download,
  RefreshCw,
  MessageSquare,
  Zap,
  Globe,
  Lock,
  Database,
  HelpCircle,
  ArrowUp,
  ArrowDown,
  MoreHorizontal
} from 'lucide-react'
import { getTrustScoreBadge, mockDocuments, mockVerificationRequests, mockTransactions } from '../lib/mockData'
import VerificationTrendsChart from '../components/VerificationTrendsChart'
import IndividualDashboard from './IndividualDashboard'
import OrganisationDashboard from './OrganisationDashboard'

const Dashboard = () => {
  const { profile } = useAuth()
  const [stats, setStats] = useState({
    documents: 0,
    verifications: 0,
    pendingRequests: 0,
    walletBalance: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [profile])

  const loadDashboardData = async () => {
    if (!profile) return

    try {
      // Simulate loading delay
      await new Promise(resolve => setTimeout(resolve, 500))

      // Load statistics based on user role
      if (profile.role === 'individual') {
        await loadIndividualStats()
      } else if (profile.role === 'organisation') {
        await loadOrganisationStats()
      } else if (profile.role === 'admin') {
        await loadAdminStats()
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadIndividualStats = async () => {
    const userDocuments = mockDocuments.filter(d => d.user_id === profile!.id)
    const userVerifications = mockVerificationRequests.filter(r => r.target_user_id === profile!.id)
    const userTransactions = mockTransactions.filter(t => t.user_id === profile!.id)
    
    const walletBalance = userTransactions
      .filter(t => t.status === 'completed')
      .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0)

    setStats({
      documents: userDocuments.length,
      verifications: userVerifications.length,
      pendingRequests: userVerifications.filter(r => r.status === 'pending').length,
      walletBalance: walletBalance,
    })
  }

  const loadOrganisationStats = async () => {
    const orgVerifications = mockVerificationRequests.filter(r => r.requester_id === profile!.id)
    
    setStats({
      documents: 0, // Organisations don't have personal documents
      verifications: orgVerifications.length,
      pendingRequests: orgVerifications.filter(r => r.status === 'pending').length,
      walletBalance: 5, // Mock staff count
    })
  }

  const loadAdminStats = async () => {
    setStats({
      documents: 150, // Total individual users
      verifications: mockVerificationRequests.length,
      pendingRequests: mockVerificationRequests.filter(r => r.status === 'pending').length,
      walletBalance: 25, // Total organisations
    })
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getUserName = () => {
    if (profile?.role === 'organisation') {
      return profile.company_name || 'Organization'
    }
    if (profile?.role === 'admin') {
      return profile.first_name || 'Admin'
    }
    return profile?.first_name || 'User'
  }

  const getDashboardCards = () => {
    if (profile?.role === 'organisation') {
      return [
        {
          title: 'Staff Members',
          value: stats.walletBalance, // We stored staff count here
          icon: Users,
          color: 'bg-blue-500',
          description: 'Active staff'
        },
        {
          title: 'Verifications',
          value: stats.verifications,
          icon: Shield,
          color: 'bg-green-500',
          description: 'Total requested'
        },
        {
          title: 'Pending Reviews',
          value: stats.pendingRequests,
          icon: Clock,
          color: 'bg-yellow-500',
          description: 'Awaiting completion'
        },
        {
          title: 'This Month',
          value: stats.verifications,
          icon: TrendingUp,
          color: 'bg-purple-500',
          description: 'New verifications'
        }
      ]
    }

    // Admin dashboard - Enhanced with more comprehensive stats
    return [
      {
        title: 'TOTAL VERIFICATIONS',
        value: '1,204,539',
        change: '+16.5%',
        changeValue: '+71,534 in the last',
        icon: Shield,
        color: 'bg-blue-500',
        description: 'All platform verifications'
      },
      {
        title: 'PENDING VERIFICATION',
        value: '43,678',
        action: 'View',
        icon: Clock,
        color: 'bg-orange-500',
        description: 'Awaiting review'
      },
      {
        title: 'COMPLETED BACKGROUND CHECK',
        value: '43,678',
        change: '+16.5%',
        changeValue: '+71,534 in the last',
        icon: CheckCircle,
        color: 'bg-green-500',
        description: 'Successfully completed'
      },
      {
        title: 'PENDING BACKGROUND CHECKS',
        value: '43,678',
        action: 'View',
        icon: AlertCircle,
        color: 'bg-red-500',
        description: 'Require attention'
      }
    ]
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  // Use Individual Dashboard for individual users
  if (profile?.role === 'individual') {
    return <IndividualDashboard />
  }

  // Use Organisation Dashboard for organisation users
  if (profile?.role === 'organisation') {
    return <OrganisationDashboard />
  }

  const trustScoreBadge = getTrustScoreBadge(profile?.trust_score || 0)

  // Admin Dashboard Layout
  if (profile?.role === 'admin') {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Hey, {getUserName()}
            </h1>
            <p className="text-gray-500 text-sm">Monday, 24 February 2024</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="What service are looking for today?"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-80"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <MessageSquare className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">O</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {getDashboardCards().map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">{card.title}</p>
                {card.action && (
                  <button className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
                    {card.action} →
                  </button>
                )}
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
              {card.change && (
                <div className="flex items-center text-xs text-green-600">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  <span>{card.change} {card.changeValue}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Enhanced Verification Trends Chart */}
            <VerificationTrendsChart />

            {/* Fraud & Risk Snapshot */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Fraud & Risk Snapshot</h3>
                  <p className="text-sm text-gray-500">as of 14 May 2021, 09:41 PM</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">5 flagged passport mismatches</span>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-700">
                    View & Address →
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">2 guarantor inconsistencies</span>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-700">
                    View & Address →
                  </button>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
                    <span className="text-sm text-gray-700">5 flagged passport mismatches</span>
                  </div>
                  <button className="text-sm text-red-600 hover:text-red-700">
                    View & Address →
                  </button>
                </div>
              </div>
            </div>

            {/* System Users */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">System Users</h3>
                  <p className="text-sm text-green-600">(+23) than last week</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Trending view</span>
                  <select className="border border-gray-300 rounded px-3 py-1 text-sm">
                    <option>Monthly</option>
                    <option>Weekly</option>
                    <option>Daily</option>
                  </select>
                </div>
              </div>

              {/* User Stats */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'TOTAL USERS', value: '1,204,539' },
                  { label: 'ORGANISATION SIGNUPS', value: '1,204,539' },
                  { label: 'PERSONAL USERS', value: '1,204,539' },
                  { label: 'TOTAL USERS', value: '1,204,539' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">{stat.label}</p>
                    <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Chart */}
              <div className="h-32">
                <div className="flex items-end justify-between h-full space-x-2">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month, index) => (
                    <div key={month} className="flex flex-col items-center flex-1">
                      <div className="flex flex-col items-center space-y-1 mb-2">
                        <div className={`w-full rounded-t ${index % 2 === 0 ? 'bg-blue-500' : 'bg-green-500'}`} 
                             style={{ height: `${Math.random() * 60 + 20}px` }}></div>
                        <div className={`w-full rounded-b ${index % 2 === 0 ? 'bg-green-500' : 'bg-blue-500'}`} 
                             style={{ height: `${Math.random() * 40 + 10}px` }}></div>
                      </div>
                      <span className="text-xs text-gray-500">{month}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center mt-4 space-x-6">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Organisation</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-xs text-gray-600">Personal Users</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - System Health & Activity */}
          <div className="space-y-6">
            {/* System Health */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SYSTEM HEALTH</h3>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600 mb-2">99.98%</div>
                <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center mx-auto">
                  View System/API Usage
                  <ExternalLink className="w-3 h-3 ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">API CALL TODAY</p>
                  <p className="text-2xl font-bold text-green-600">13</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">FAILED VERIFICATION</p>
                  <p className="text-2xl font-bold text-gray-900">27</p>
                </div>
              </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View details →
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">as of 14 May 2021, 09:41 PM</p>
              
              {/* Featured Ticket */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">#1015674KHJ</h4>
                  <span className="text-xs text-gray-500">11:27AM</span>
                </div>
                <h5 className="font-medium text-gray-900 mb-2">My Verification is Cancelled</h5>
                <p className="text-sm text-gray-600 mb-3">
                  Hey Admin I went out for yoga this morning and while I was doing it, I came upon a new idea.
                </p>
                <button className="text-sm bg-gray-200 text-gray-700 px-3 py-1 rounded">
                  Response
                </button>
              </div>

              {/* Ticket Stats */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Open Ticket</span>
                  <span className="text-sm font-medium text-gray-900">4238</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Waiting on responses</span>
                  <span className="text-sm font-medium text-gray-900">1005</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Closed Ticket</span>
                  <span className="text-sm font-medium text-gray-900">281</span>
                </div>
              </div>
            </div>

            {/* Recent Activity Log */}
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activity Log</h3>
                <button className="text-sm text-blue-600 hover:text-blue-700">
                  View →
                </button>
              </div>
              <p className="text-sm text-gray-500 mb-4">as of 14 May 2021, 09:41 PM</p>
              
              <div className="space-y-4">
                {[
                  {
                    user: 'Org ABC',
                    action: 'requested job verification for John Doe',
                    time: 'Just now',
                    avatar: 'bg-blue-500'
                  },
                  {
                    user: 'Jane Doe',
                    action: 'declined attestation request from Sa...',
                    time: '27 minutes ago',
                    avatar: 'bg-green-500'
                  },
                  {
                    user: 'Jane Doe',
                    action: 'declined attestation request from Sa...',
                    time: '31 minutes ago',
                    avatar: 'bg-green-500'
                  },
                  {
                    user: 'Admin Olu',
                    action: 'added a new trust score rule',
                    time: '12 hours ago',
                    avatar: 'bg-purple-500'
                  },
                  {
                    user: 'Modified A',
                    action: 'data in Page X.',
                    time: 'Today, 11:59 AM',
                    avatar: 'bg-orange-500'
                  },
                  {
                    user: 'Deleted a',
                    action: 'page in Project X.',
                    time: 'Feb 2, 2023',
                    avatar: 'bg-gray-500'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 ${activity.avatar} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white text-xs font-medium">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Fallback - should not reach here
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
      <p className="text-gray-600 mt-2">Welcome to IDCertify</p>
    </div>
  )
}

export default Dashboard