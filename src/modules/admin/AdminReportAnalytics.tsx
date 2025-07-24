import React, { useState } from 'react'
import BarChartIcon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import DescriptionIcon from '@mui/icons-material/Description';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import DownloadIcon from '@mui/icons-material/Download';
import FilterListIcon from '@mui/icons-material/FilterList';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchIcon from '@mui/icons-material/Search';
import VisibilityIcon from '@mui/icons-material/Visibility';
import StorageIcon from '@mui/icons-material/Storage';
import SettingsIcon from '@mui/icons-material/Settings';
  Clock,
  User,
  Building,
  Zap,
  Target,
  Globe,
  Database,
  Server,
  Bell,
  ArrowUp,
  ArrowDown,
  Settings
} from 'lucide-react'

const AdminReportAnalytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days')
  const [loading, setLoading] = useState(false)

  // Mock data for reports and analytics
  const analyticsData = {
    summary: {
      totalReportsGenerated: 1250,
      averageReportSize: '5.2 MB',
      mostRequestedReport: 'Comprehensive User Verification',
      reportGenerationSuccessRate: 98.5,
      totalAnalyticsViews: 5678,
      activeDashboards: 12
    },
    reportTypes: [
      { type: 'User Verification', count: 450, percentage: 36, icon: User, color: 'bg-blue-500' },
      { type: 'Organisation Compliance', count: 300, percentage: 24, icon: Building, color: 'bg-green-500' },
      { type: 'Trust Score Analysis', count: 200, percentage: 16, icon: TrendingUp, color: 'bg-purple-500' },
      { type: 'Transaction History', count: 150, percentage: 12, icon: DollarSign, color: 'bg-orange-500' },
      { type: 'System Audit', count: 100, percentage: 8, icon: FileText, color: 'bg-red-500' },
      { type: 'Custom Reports', count: 50, percentage: 4, icon: BarChart3, color: 'bg-gray-500' }
    ],
    reportTrends: [
      { month: 'Jan', generated: 100, viewed: 250 },
      { month: 'Feb', generated: 120, viewed: 300 },
      { month: 'Mar', generated: 150, viewed: 350 },
      { month: 'Apr', generated: 130, viewed: 320 },
      { month: 'May', generated: 180, viewed: 400 },
      { month: 'Jun', generated: 200, viewed: 450 }
    ],
    alertSummary: {
      critical: 2,
      warning: 5,
      info: 10
    }
  }

  const handleRefresh = () => {
    setLoading(true)
    // Simulate data refresh
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'warning': return 'bg-yellow-100 text-yellow-800'
      case 'info': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Report & Analytics Management</h1>
          <p className="text-gray-600 mt-1">Generate, manage, and analyze reports and system analytics</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Reports Generated',
            value: analyticsData.summary.totalReportsGenerated.toLocaleString(),
            icon: FileText,
            color: 'bg-blue-500',
            description: 'Last 30 days'
          },
          {
            title: 'Avg. Report Size',
            value: analyticsData.summary.averageReportSize,
            icon: Database,
            color: 'bg-green-500',
            description: 'Average size'
          },
          {
            title: 'Success Rate',
            value: `${analyticsData.summary.reportGenerationSuccessRate}%`,
            icon: CheckCircle,
            color: 'bg-purple-500',
            description: 'Report generation'
          },
          {
            title: 'Analytics Views',
            value: analyticsData.summary.totalAnalyticsViews.toLocaleString(),
            icon: Eye,
            color: 'bg-orange-500',
            description: 'Total dashboard views'
          }
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="w-6 h-6 text-white" />
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

      {/* Report Types Distribution */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Report Types Distribution</h3>
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="30days">Last 30 days</option>
            <option value="90days">Last 90 days</option>
            <option value="1year">Last year</option>
          </select>
        </div>

        <div className="space-y-4">
          {analyticsData.reportTypes.map((type, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3 flex-1">
                <div className={`w-4 h-4 rounded-full ${type.color}`}></div>
                <span className="text-sm font-medium text-gray-700">{type.type}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                  <div
                    className={`h-2 rounded-full ${type.color}`}
                    style={{ width: `${type.percentage}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-gray-900">{type.count}</p>
                <p className="text-xs text-gray-500">{type.percentage}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Trends Chart */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Generation & View Trends</h3>
        <div className="h-64">
          {/* Simple Bar Chart */}
          <div className="h-full flex items-end justify-between space-x-2">
            {analyticsData.reportTrends.map((data, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${(data.generated / 200) * 100}%` }}
                    title={`Generated: ${data.generated}`}
                  ></div>
                  <div
                    className="w-full bg-green-500 rounded-t mt-1"
                    style={{ height: `${(data.viewed / 450) * 100}%` }}
                    title={`Viewed: ${data.viewed}`}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-center mt-4 space-x-6">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Generated</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-xs text-gray-600">Viewed</span>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Alerts & Notifications</h3>
        <div className="space-y-4">
          {[
            {
              type: 'critical',
              title: 'Report Generation Failed',
              description: 'Daily user verification report failed to generate.',
              time: '2 hours ago'
            },
            {
              type: 'warning',
              title: 'High Analytics Dashboard Load',
              description: 'Dashboard experiencing slow load times.',
              time: '5 hours ago'
            },
            {
              type: 'info',
              title: 'New Custom Report Created',
              description: 'Admin user created a new custom report template.',
              time: '1 day ago'
            }
          ].map((alert, index) => (
            <div key={index} className={`p-4 rounded-lg flex items-start space-x-3 ${getAlertColor(alert.type)}`}>
              <AlertTriangle className="w-5 h-5 flex-shrink-0" />
              <div>
                <p className="font-medium">{alert.title}</p>
                <p className="text-sm">{alert.description}</p>
                <p className="text-xs text-gray-600 mt-1">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Report Management Actions */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Management Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button className="bg-primary-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center">
            <FileText className="w-5 h-5 mr-2" />
            Generate New Report
          </button>
          <button className="bg-green-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Create Custom Dashboard
          </button>
          <button className="bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center">
            <Settings className="w-5 h-5 mr-2" />
            Configure Report Settings
          </button>
          <button className="bg-indigo-600 text-white px-4 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center">
            <Download className="w-5 h-5 mr-2" />
            Schedule Report Exports
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdminReportAnalytics