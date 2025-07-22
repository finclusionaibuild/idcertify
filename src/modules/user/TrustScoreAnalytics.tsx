import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Shield, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Send,
  Settings,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  User,
  Building,
  GraduationCap,
  MapPin,
  UserCheck,
  Award,
  ExternalLink,
  Bell,
  Search,
  MoreHorizontal,
  Info,
  Zap,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react'

interface TrustScoreUser {
  id: string
  name: string
  email: string
  trustScore: number
  riskLevel: 'low' | 'medium' | 'high'
  lastUpdated: string
  verificationBreakdown: {
    identity: boolean
    employment: boolean
    education: boolean
    address: boolean
    guarantor: boolean
    attestation: boolean
  }
  scoreHistory: { date: string; score: number }[]
  trend: 'up' | 'down' | 'stable'
  trendPercentage: number
}

interface TrustScoreRule {
  id: string
  category: string
  description: string
  points: number
  type: 'positive' | 'negative'
  isActive: boolean
}

const TrustScoreAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [showRulesSection, setShowRulesSection] = useState(false)
  const [selectedUser, setSelectedUser] = useState<TrustScoreUser | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'breakdown' | 'trends' | 'rules'>('overview')

  // Mock analytics data
  const analyticsData = {
    averageTrustScore: 82,
    averageChange: 5.2,
    highRiskCount: 12,
    pendingCompletionCount: 28,
    decliningScoresCount: 8,
    totalUsers: 1247,
    scoreDistribution: {
      high: { range: '71-100', count: 892, percentage: 71.5, color: 'bg-green-500' },
      medium: { range: '41-70', count: 267, percentage: 21.4, color: 'bg-yellow-500' },
      low: { range: '0-40', count: 88, percentage: 7.1, color: 'bg-red-500' }
    }
  }

  // Mock trust score users data
  const trustScoreUsers: TrustScoreUser[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      trustScore: 92,
      riskLevel: 'low',
      lastUpdated: '2024-01-20',
      verificationBreakdown: {
        identity: true,
        employment: true,
        education: true,
        address: true,
        guarantor: true,
        attestation: true
      },
      scoreHistory: [
        { date: '2024-01-01', score: 75 },
        { date: '2024-01-10', score: 82 },
        { date: '2024-01-20', score: 92 }
      ],
      trend: 'up',
      trendPercentage: 12.3
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@company.com',
      trustScore: 45,
      riskLevel: 'high',
      lastUpdated: '2024-01-19',
      verificationBreakdown: {
        identity: true,
        employment: false,
        education: false,
        address: false,
        guarantor: false,
        attestation: false
      },
      scoreHistory: [
        { date: '2024-01-01', score: 65 },
        { date: '2024-01-10', score: 55 },
        { date: '2024-01-19', score: 45 }
      ],
      trend: 'down',
      trendPercentage: -30.8
    },
    {
      id: '3',
      name: 'Michael Johnson',
      email: 'michael.j@email.com',
      trustScore: 78,
      riskLevel: 'medium',
      lastUpdated: '2024-01-18',
      verificationBreakdown: {
        identity: true,
        employment: true,
        education: false,
        address: true,
        guarantor: false,
        attestation: true
      },
      scoreHistory: [
        { date: '2024-01-01', score: 76 },
        { date: '2024-01-10', score: 77 },
        { date: '2024-01-18', score: 78 }
      ],
      trend: 'stable',
      trendPercentage: 2.6
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@corp.com',
      trustScore: 88,
      riskLevel: 'low',
      lastUpdated: '2024-01-17',
      verificationBreakdown: {
        identity: true,
        employment: true,
        education: true,
        address: true,
        guarantor: false,
        attestation: true
      },
      scoreHistory: [
        { date: '2024-01-01', score: 82 },
        { date: '2024-01-10', score: 85 },
        { date: '2024-01-17', score: 88 }
      ],
      trend: 'up',
      trendPercentage: 7.3
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david.brown@example.com',
      trustScore: 35,
      riskLevel: 'high',
      lastUpdated: '2024-01-16',
      verificationBreakdown: {
        identity: true,
        employment: false,
        education: false,
        address: false,
        guarantor: false,
        attestation: false
      },
      scoreHistory: [
        { date: '2024-01-01', score: 50 },
        { date: '2024-01-10', score: 42 },
        { date: '2024-01-16', score: 35 }
      ],
      trend: 'down',
      trendPercentage: -30.0
    }
  ]

  // Mock trust score rules
  const trustScoreRules: TrustScoreRule[] = [
    {
      id: '1',
      category: 'Identity Verification',
      description: 'Verified government-issued ID document',
      points: 25,
      type: 'positive',
      isActive: true
    },
    {
      id: '2',
      category: 'Employment History',
      description: 'Confirmed current employment',
      points: 20,
      type: 'positive',
      isActive: true
    },
    {
      id: '3',
      category: 'Education Credentials',
      description: 'Verified academic qualifications',
      points: 15,
      type: 'positive',
      isActive: true
    },
    {
      id: '4',
      category: 'Address Verification',
      description: 'Confirmed residential address',
      points: 15,
      type: 'positive',
      isActive: true
    },
    {
      id: '5',
      category: 'Guarantor Verification',
      description: 'Valid guarantor confirmation',
      points: 10,
      type: 'positive',
      isActive: true
    },
    {
      id: '6',
      category: 'Professional Attestation',
      description: 'Professional reference or attestation',
      points: 10,
      type: 'positive',
      isActive: true
    },
    {
      id: '7',
      category: 'Missing Address Info',
      description: 'No verified address information',
      points: -10,
      type: 'negative',
      isActive: true
    },
    {
      id: '8',
      category: 'Expired Documents',
      description: 'Documents past expiry date',
      points: -15,
      type: 'negative',
      isActive: true
    }
  ]

  // Historical trend data for chart
  const trendData = [
    { month: 'Jul', score: 78 },
    { month: 'Aug', score: 79 },
    { month: 'Sep', score: 80 },
    { month: 'Oct', score: 81 },
    { month: 'Nov', score: 81 },
    { month: 'Dec', score: 82 },
    { month: 'Jan', score: 82 }
  ]

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrendIcon = (trend: string, percentage: number) => {
    if (trend === 'up') {
      return <ArrowUp className="w-4 h-4 text-green-500" />
    } else if (trend === 'down') {
      return <ArrowDown className="w-4 h-4 text-red-500" />
    } else {
      return <Minus className="w-4 h-4 text-gray-500" />
    }
  }

  const getVerificationIcon = (type: string, verified: boolean) => {
    const iconClass = verified ? 'text-green-500' : 'text-gray-400'
    
    switch (type) {
      case 'identity':
        return <Shield className={`w-4 h-4 ${iconClass}`} />
      case 'employment':
        return <Building className={`w-4 h-4 ${iconClass}`} />
      case 'education':
        return <GraduationCap className={`w-4 h-4 ${iconClass}`} />
      case 'address':
        return <MapPin className={`w-4 h-4 ${iconClass}`} />
      case 'guarantor':
        return <UserCheck className={`w-4 h-4 ${iconClass}`} />
      case 'attestation':
        return <Award className={`w-4 h-4 ${iconClass}`} />
      default:
        return <CheckCircle className={`w-4 h-4 ${iconClass}`} />
    }
  }

  const filteredUsers = trustScoreUsers.filter(user => {
    const matchesSearch = searchQuery === '' || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || user.riskLevel === selectedFilter
    
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trust Score Analytics</h1>
          <p className="text-gray-600 mt-1">Monitor trust levels across individuals you've verified. Identify risks, trends, and verification gaps.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Configure Rules
          </button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Average Trust Score',
            value: `${analyticsData.averageTrustScore}/100`,
            change: `+${analyticsData.averageChange}%`,
            changeType: 'positive',
            icon: Shield,
            color: 'bg-blue-500',
            description: 'From last month'
          },
          {
            title: 'High Risk Profiles',
            value: analyticsData.highRiskCount,
            action: 'View All',
            icon: AlertTriangle,
            color: 'bg-red-500',
            description: 'Users requiring attention'
          },
          {
            title: 'Pending Completion',
            value: analyticsData.pendingCompletionCount,
            action: 'Remind Users',
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Incomplete verifications'
          },
          {
            title: 'Recently Declining',
            value: analyticsData.decliningScoresCount,
            action: 'Review Cases',
            icon: TrendingDown,
            color: 'bg-orange-500',
            description: 'Downward score trends'
          }
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              {card.action && (
                <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  {card.action} →
                </button>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
              <div className="flex items-center space-x-2">
                {card.change && (
                  <span className={`text-xs font-medium ${
                    card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {card.change}
                  </span>
                )}
                <p className="text-xs text-gray-500">{card.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'breakdown', label: 'User Breakdown', icon: Users },
            { id: 'trends', label: 'Trends & Insights', icon: TrendingUp },
            { id: 'rules', label: 'Scoring Rules', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Distribution Chart */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Score Distribution</h3>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
            </div>
            
            {/* Bar Chart Visualization */}
            <div className="space-y-4">
              {Object.entries(analyticsData.scoreDistribution).map(([key, data]) => (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`w-4 h-4 rounded ${data.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{data.range}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 mx-4">
                      <div 
                        className={`h-3 rounded-full ${data.color}`}
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{data.count}</p>
                    <p className="text-xs text-gray-500">{data.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Users</span>
                <span className="font-bold text-gray-900">{analyticsData.totalUsers.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Time-based Trust Trend Graph */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Trust Score Trend</h3>
            
            <div className="mb-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-gray-900 mb-1">{analyticsData.averageTrustScore}</p>
                <p className="text-sm text-gray-600">Current Average</p>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+{analyticsData.averageChange}% this month</span>
                </div>
              </div>
            </div>
            
            {/* Simple Line Chart */}
            <div className="h-32 flex items-end justify-between space-x-1">
              {trendData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-primary-500 rounded-t transition-all duration-500 hover:bg-primary-600"
                    style={{ height: `${(data.score / 100) * 100}px` }}
                    title={`${data.month}: ${data.score}`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'breakdown' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Risk Levels</option>
                  <option value="low">Low Risk</option>
                  <option value="medium">Medium Risk</option>
                  <option value="high">High Risk</option>
                </select>
                
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Trust Score Breakdown Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trust Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification Breakdown
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trend
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                            user.trustScore >= 80 ? 'bg-green-500 text-white' :
                            user.trustScore >= 60 ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                          }`}>
                            {user.trustScore}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {Object.entries(user.verificationBreakdown).map(([type, verified]) => (
                            <div key={type} title={type.charAt(0).toUpperCase() + type.slice(1)}>
                              {getVerificationIcon(type, verified)}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(user.riskLevel)}`}>
                          {user.riskLevel.charAt(0).toUpperCase() + user.riskLevel.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          {getTrendIcon(user.trend, user.trendPercentage)}
                          <span className={`text-sm font-medium ${
                            user.trend === 'up' ? 'text-green-600' :
                            user.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {user.trendPercentage > 0 ? '+' : ''}{user.trendPercentage.toFixed(1)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(user.lastUpdated).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setSelectedUser(user)}
                            className="text-primary-600 hover:text-primary-900 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Profile
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Impact Analysis */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Verification Impact on Trust Scores</h3>
            
            <div className="space-y-4">
              {[
                { type: 'Identity Verification', impact: '+25 avg', completion: 95, color: 'bg-blue-500' },
                { type: 'Employment History', impact: '+20 avg', completion: 78, color: 'bg-green-500' },
                { type: 'Education Credentials', impact: '+15 avg', completion: 65, color: 'bg-purple-500' },
                { type: 'Address Verification', impact: '+15 avg', completion: 82, color: 'bg-orange-500' },
                { type: 'Guarantor Verification', impact: '+10 avg', completion: 45, color: 'bg-pink-500' },
                { type: 'Professional Attestation', impact: '+10 avg', completion: 38, color: 'bg-indigo-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-900">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{item.impact}</p>
                    <p className="text-xs text-gray-500">{item.completion}% completion</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Insights and Recommendations */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Insights & Recommendations</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Opportunity Identified</p>
                    <p className="text-sm text-blue-800 mt-1">
                      28 users need address verification to move to Medium Trust level
                    </p>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2">
                      Send Reminders →
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Low Impact Alert</p>
                    <p className="text-sm text-yellow-800 mt-1">
                      Employment verifications contribute least — consider requiring them
                    </p>
                    <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium mt-2">
                      Review Policy →
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-green-900">Positive Trend</p>
                    <p className="text-sm text-green-800 mt-1">
                      Average trust score increased by 5.2% this month
                    </p>
                    <button className="text-green-600 hover:text-green-700 text-sm font-medium mt-2">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'rules' && (
        <div className="space-y-6">
          {/* Trust Score Calculation Rules */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Trust Score Calculation Rules</h3>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Request Rule Change
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="mb-4">
                <h4 className="font-medium text-gray-900 mb-3">Positive Scoring Rules</h4>
                {trustScoreRules.filter(rule => rule.type === 'positive').map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">+{rule.points}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{rule.category}</p>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Negative Scoring Rules</h4>
                {trustScoreRules.filter(rule => rule.type === 'negative').map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">{rule.points}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{rule.category}</p>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button className="text-gray-400 hover:text-gray-600">
                        <Settings className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Alerts & Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Zap className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Automated Insights</h3>
            <p className="text-gray-600 mb-4">Take action on these recommendations to improve overall trust scores.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  action: 'Send address verification reminders',
                  impact: 'Could improve 28 user scores',
                  urgency: 'Medium'
                },
                {
                  action: 'Review employment verification policy',
                  impact: 'Low completion rate (45%)',
                  urgency: 'Low'
                },
                {
                  action: 'Follow up on declining scores',
                  impact: '8 users need attention',
                  urgency: 'High'
                },
                {
                  action: 'Promote attestation program',
                  impact: 'Only 38% completion',
                  urgency: 'Medium'
                }
              ].map((recommendation, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{recommendation.action}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      recommendation.urgency === 'High' ? 'bg-red-100 text-red-800' :
                      recommendation.urgency === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {recommendation.urgency}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{recommendation.impact}</p>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 transition-colors">
                    Take Action
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Export & API Access */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export & API Access</h3>
            <p className="text-gray-600">Download reports or integrate trust score monitoring via API</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export CSV/PDF Report
            </button>
            <Link to="/organisation/api" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Generate API Key
            </Link>
          </div>
        </div>
      </div>

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Trust Score Profile</h2>
                <button 
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* User Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedUser.name}</h3>
                    <p className="text-gray-600">{selectedUser.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold ${
                        selectedUser.trustScore >= 80 ? 'bg-green-500 text-white' :
                        selectedUser.trustScore >= 60 ? 'bg-yellow-500 text-white' :
                        'bg-red-500 text-white'
                      }`}>
                        {selectedUser.trustScore}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(selectedUser.riskLevel)}`}>
                        {selectedUser.riskLevel.charAt(0).toUpperCase() + selectedUser.riskLevel.slice(1)} Risk
                      </span>
                      <div className="flex items-center space-x-1">
                        {getTrendIcon(selectedUser.trend, selectedUser.trendPercentage)}
                        <span className={`text-sm font-medium ${
                          selectedUser.trend === 'up' ? 'text-green-600' :
                          selectedUser.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          {selectedUser.trendPercentage > 0 ? '+' : ''}{selectedUser.trendPercentage.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Breakdown */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Verification Breakdown</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(selectedUser.verificationBreakdown).map(([type, verified]) => (
                    <div key={type} className={`p-4 border rounded-lg ${verified ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'}`}>
                      <div className="flex items-center space-x-2 mb-2">
                        {getVerificationIcon(type, verified)}
                        <span className="text-sm font-medium text-gray-900">
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </span>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        verified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {verified ? 'Verified' : 'Not Verified'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Score History */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Score History</h4>
                <div className="h-32 flex items-end justify-between space-x-2">
                  {selectedUser.scoreHistory.map((data, index) => (
                    <div key={index} className="flex flex-col items-center flex-1">
                      <div 
                        className="w-full bg-primary-500 rounded-t transition-all duration-500"
                        style={{ height: `${(data.score / 100) * 100}px` }}
                        title={`${data.date}: ${data.score}`}
                      ></div>
                      <span className="text-xs text-gray-500 mt-2">
                        {new Date(data.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Send Reminder
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Request Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TrustScoreAnalytics