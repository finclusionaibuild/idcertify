import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Building, 
  Shield, 
  Download, 
  RefreshCw, 
  ArrowUp, 
  ArrowDown, 
  Zap, 
  Target, 
  Database, 
  Server, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Settings
} from 'lucide-react'

const AdminAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days')
  const [selectedChart, setSelectedChart] = useState('line')
  const [isLoading, setIsLoading] = useState(false)

  // Mock analytics data
  const analyticsData = {
    summary: {
      totalUsers: 1247,
      totalOrganisations: 156,
      totalVerifications: 15420,
      successRate: 94.2,
      activeUsers: 892,
      pendingVerifications: 156,
      averageTrustScore: 78.5,
      apiCalls: 28470
    },
    userGrowth: [
      { date: '2024-01-01', individual: 950, organisation: 120, admin: 10 },
      { date: '2024-01-08', individual: 980, organisation: 130, admin: 10 },
      { date: '2024-01-15', individual: 1020, organisation: 140, admin: 12 },
      { date: '2024-01-22', individual: 1050, organisation: 148, admin: 12 },
      { date: '2024-01-29', individual: 1080, organisation: 152, admin: 15 },
      { date: '2024-02-05', individual: 1120, organisation: 156, admin: 15 }
    ],
    verificationsByType: [
      { type: 'Identity', count: 6250, percentage: 40.5 },
      { type: 'Address', count: 3850, percentage: 25.0 },
      { type: 'Employment', count: 2780, percentage: 18.0 },
      { type: 'Education', count: 1540, percentage: 10.0 },
      { type: 'Reference', count: 1000, percentage: 6.5 }
    ],
    verificationsByStatus: [
      { status: 'Approved', count: 14526, percentage: 94.2 },
      { status: 'Rejected', count: 894, percentage: 5.8 }
    ],
    trustScoreDistribution: [
      { range: '0-20', count: 25, percentage: 2.0 },
      { range: '21-40', count: 63, percentage: 5.1 },
      { range: '41-60', count: 204, percentage: 16.4 },
      { range: '61-80', count: 580, percentage: 46.5 },
      { range: '81-100', count: 375, percentage: 30.0 }
    ],
    topOrganisations: [
      { name: 'TechCorp Solutions', verifications: 1245, successRate: 96.8 },
      { name: 'ABC Bank', verifications: 980, successRate: 95.2 },
      { name: 'XYZ Corporation', verifications: 756, successRate: 92.5 },
      { name: 'Global Finance Ltd', verifications: 645, successRate: 94.1 },
      { name: 'University of Lagos', verifications: 520, successRate: 98.2 }
    ],
    revenueData: [
      { month: 'Jan', revenue: 1250000 },
      { month: 'Feb', revenue: 1380000 },
      { month: 'Mar', revenue: 1420000 },
      { month: 'Apr', revenue: 1180000 },
      { month: 'May', revenue: 1650000 },
      { month: 'Jun', revenue: 1890000 }
    ]
  }

  const refreshData = () => {
    setIsLoading(true)
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and statistics about platform usage and performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="7days">Last 7 days</option>
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
            <option value="all">All time</option>
          </select>
          
          <button 
            onClick={refreshData}
            disabled={isLoading}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center disabled:opacity-50"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </button>
          
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Users',
            value: analyticsData.summary.totalUsers.toLocaleString(),
            change: '+12.5%',
            changeType: 'positive',
            icon: Users,
            color: 'bg-blue-500',
            description: 'All registered users'
          },
          {
            title: 'Total Verifications',
            value: analyticsData.summary.totalVerifications.toLocaleString(),
            change: '+8.3%',
            changeType: 'positive',
            icon: Shield,
            color: 'bg-green-500',
            description: 'All time'
          },
          {
            title: 'Success Rate',
            value: `${analyticsData.summary.successRate}%`,
            change: '+1.2%',
            changeType: 'positive',
            icon: CheckCircle,
            color: 'bg-purple-500',
            description: 'Verification success'
          },
          {
            title: 'API Calls',
            value: analyticsData.summary.apiCalls.toLocaleString(),
            change: '+15.8%',
            changeType: 'positive',
            icon: Zap,
            color: 'bg-orange-500',
            description: 'This month'
          }
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <div className={`flex items-center text-xs font-medium ${
                card.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.changeType === 'positive' ? (
                  <ArrowUp className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDown className="w-3 h-3 mr-1" />
                )}
                {card.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* User Growth Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">User Growth</h2>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <select 
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="line">Line Chart</option>
                <option value="bar">Bar Chart</option>
                <option value="area">Area Chart</option>
              </select>
            </div>
            <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
          </div>
        </div>
        
        {/* Simple Chart Visualization */}
        <div className="h-80">
          <div className="h-64 flex items-end justify-between space-x-2">
            {analyticsData.userGrowth.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="flex flex-col items-center space-y-1 mb-2 w-full">
                  <div 
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(data.individual / 1200) * 200}px` }}
                    title={`Individual: ${data.individual}`}
                  ></div>
                  <div 
                    className="w-full bg-green-500 rounded-t"
                    style={{ height: `${(data.organisation / 200) * 100}px` }}
                    title={`Organisation: ${data.organisation}`}
                  ></div>
                  <div 
                    className="w-full bg-purple-500 rounded-t"
                    style={{ height: `${(data.admin / 20) * 50}px` }}
                    title={`Admin: ${data.admin}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-6">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Individual Users</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Organisations</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-600">Admins</span>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Verification by Type */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Verifications by Type</h2>
          
          <div className="space-y-4">
            {analyticsData.verificationsByType.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-sm font-medium text-gray-700">{item.type}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                    <div 
                      className="h-2 rounded-full bg-primary-600"
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{item.count.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Score Distribution */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Trust Score Distribution</h2>
          
          <div className="space-y-4">
            {analyticsData.trustScoreDistribution.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1">
                  <span className="text-sm font-medium text-gray-700">{item.range}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                    <div 
                      className={`h-2 rounded-full ${
                        index === 4 ? 'bg-green-500' :
                        index === 3 ? 'bg-blue-500' :
                        index === 2 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-orange-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{item.count.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{item.percentage}%</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Organisations */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Top Organisations by Verification Volume</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Organisation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verifications
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Success Rate
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {analyticsData.topOrganisations.map((org, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {org.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {org.verifications.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-3 w-24">
                        <div 
                          className="h-2 rounded-full bg-green-500"
                          style={{ width: `${org.successRate}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{org.successRate}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-5 h-5 mr-1" />
                      <span className="text-sm font-medium">+{Math.floor(Math.random() * 10) + 5}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
          <div className="flex items-center space-x-3">
            <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
              <option>Monthly</option>
              <option>Quarterly</option>
              <option>Yearly</option>
            </select>
            <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-1" />
              Export
            </button>
          </div>
        </div>
        
        {/* Simple Revenue Chart */}
        <div className="h-64">
          <div className="h-56 flex items-end justify-between space-x-2">
            {analyticsData.revenueData.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-green-500 rounded-t transition-all duration-500 hover:bg-green-600"
                  style={{ height: `${(data.revenue / 2000000) * 200}px` }}
                  title={`${data.month}: ₦${data.revenue.toLocaleString()}`}
                ></div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div>
            <p className="text-sm text-gray-600">Total Revenue (YTD)</p>
            <p className="text-xl font-bold text-gray-900">₦{(analyticsData.revenueData.reduce((sum, item) => sum + item.revenue, 0)).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Average Monthly</p>
            <p className="text-xl font-bold text-gray-900">₦{Math.round(analyticsData.revenueData.reduce((sum, item) => sum + item.revenue, 0) / analyticsData.revenueData.length).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Growth Rate</p>
            <div className="flex items-center text-green-600">
              <ArrowUp className="w-4 h-4 mr-1" />
              <p className="text-xl font-bold">+15.8%</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Performance */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">System Performance</h2>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'API Response Time', value: '145ms', status: 'good', change: '-12ms', icon: Zap },
            { name: 'Database Load', value: '28%', status: 'good', change: '+3%', icon: Database },
            { name: 'Storage Usage', value: '42%', status: 'good', change: '+5%', icon: Server },
            { name: 'Verification Engine', value: '98.7%', status: 'good', change: '+0.2%', icon: Shield },
            { name: 'Error Rate', value: '0.08%', status: 'good', change: '-0.02%', icon: AlertTriangle },
            { name: 'Uptime', value: '99.99%', status: 'good', change: '0%', icon: Clock }
          ].map((metric, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <metric.icon className="w-5 h-5 text-gray-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{metric.name}</p>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                </div>
              </div>
              <div className={`text-sm font-medium ${
                metric.status === 'good' ? 'text-green-600' : 
                metric.status === 'warning' ? 'text-yellow-600' : 
                'text-red-600'
              }`}>
                {metric.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Export Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'User Analytics Report', format: 'PDF', icon: Users },
            { name: 'Verification Analytics', format: 'Excel', icon: Shield },
            { name: 'Revenue Report', format: 'Excel', icon: BarChart3 },
            { name: 'System Performance', format: 'PDF', icon: Server },
            { name: 'Trust Score Analysis', format: 'Excel', icon: Target },
            { name: 'Custom Report Builder', format: 'Multiple', icon: Settings }
          ].map((report, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-primary-100 rounded-lg">
                  <report.icon className="w-5 h-5 text-primary-600" />
                </div>
                <p className="font-medium text-gray-900">{report.name}</p>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{report.format} Format</span>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                  <Download className="w-4 h-4 mr-1" />
                  Export
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminAnalytics