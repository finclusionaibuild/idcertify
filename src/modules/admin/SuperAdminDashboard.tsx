import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Database, 
  Globe, 
  DollarSign,
  MessageSquare,
  Settings,
  BarChart3,
  Clock,
  Server,
  Lock,
  FileText,
  Zap,
  UserCheck,
  Building,
  Eye,
  Award,
  Briefcase,
  HeadphonesIcon,
  MonitorSpeaker
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SuperAdminDashboard: React.FC = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('7d');

  // Mock data - replace with actual API calls
  const platformStats = {
    totalUsers: 125847,
    totalOrganizations: 3421,
    totalEmployers: 892,
    totalEmployees: 45623,
    systemUptime: 99.97,
    activeVerifications: 1247,
    pendingTickets: 23,
    criticalAlerts: 2
  };

  const systemHealth = {
    database: { status: 'healthy', uptime: 99.99 },
    api: { status: 'healthy', uptime: 99.95 },
    storage: { status: 'warning', uptime: 98.2 },
    monitoring: { status: 'healthy', uptime: 100 }
  };

  const complianceMetrics = {
    kycCompliance: 94.2,
    amlCompliance: 97.8,
    gdprCompliance: 99.1,
    overallTrustScore: 8.7
  };

  const recentActivity = [
    { type: 'security', message: 'New AML alert triggered for Company ABC', time: '2 min ago', severity: 'high' },
    { type: 'system', message: 'Database backup completed successfully', time: '15 min ago', severity: 'info' },
    { type: 'user', message: '47 new user registrations in the last hour', time: '1 hour ago', severity: 'info' },
    { type: 'compliance', message: 'GDPR compliance check completed', time: '2 hours ago', severity: 'success' }
  ];

  const quickActions = [
    { title: 'System Health', icon: Activity, link: '/admin/system-health', color: 'bg-green-500' },
    { title: 'User Management', icon: Users, link: '/admin/user-management', color: 'bg-blue-500' },
    { title: 'Security Center', icon: Shield, link: '/admin/security-center', color: 'bg-red-500' },
    { title: 'Analytics', icon: BarChart3, link: '/admin/analytics', color: 'bg-purple-500' },
    { title: 'Support Tickets', icon: HeadphonesIcon, link: '/admin/help-support', color: 'bg-orange-500' },
    { title: 'System Settings', icon: Settings, link: '/admin/system-settings', color: 'bg-gray-500' }
  ];

  const managementSections = [
    {
      title: 'User & Organization Management',
      items: [
        { name: 'User Management', link: '/admin/user-management', icon: Users, count: platformStats.totalUsers },
        { name: 'Organization Management', link: '/admin/organisation-management', icon: Building2, count: platformStats.totalOrganizations },
        { name: 'Employer Management', link: '/admin/employer-management', icon: Briefcase, count: platformStats.totalEmployers },
        { name: 'Employee Management', link: '/admin/employee-management', icon: UserCheck, count: platformStats.totalEmployees },
        { name: 'Company Management', link: '/admin/company-management', icon: Building, count: platformStats.totalOrganizations },
        { name: 'Profile Management', link: '/admin/profile-management', icon: Users, count: '∞' }
      ]
    },
    {
      title: 'Compliance & Security',
      items: [
        { name: 'SureAML Management', link: '/admin/sure-aml-management', icon: Shield, count: '24/7' },
        { name: 'SureCompliance Management', link: '/admin/sure-compliance-management', icon: CheckCircle, count: '6 Standards' },
        { name: 'Security Center', link: '/admin/security-center', icon: Lock, count: platformStats.criticalAlerts },
        { name: 'KYC/KYB Management', link: '/admin/kyc-kyb-management', icon: FileText, count: platformStats.activeVerifications },
        { name: 'Background Check Management', link: '/admin/background-check-management', icon: Eye, count: 'Active' },
        { name: 'Trust Score Management', link: '/admin/trust-score-management', icon: Award, count: complianceMetrics.overallTrustScore }
      ]
    },
    {
      title: 'System & Infrastructure',
      items: [
        { name: 'System Health Check', link: '/admin/system-health-check', icon: Activity, count: `${platformStats.systemUptime}%` },
        { name: 'Downtime Tracker', link: '/admin/downtime-tracker', icon: Clock, count: 'Live' },
        { name: 'Data Monitoring', link: '/admin/data-monitoring-management', icon: MonitorSpeaker, count: 'Real-time' },
        { name: 'Database Management', link: '/admin/database-management', icon: Database, count: 'Healthy' },
        { name: 'System Log Configuration', link: '/admin/system-log-configuration', icon: FileText, count: 'Active' },
        { name: 'Developer Tools', link: '/admin/developer-tools', icon: Zap, count: 'Available' }
      ]
    },
    {
      title: 'Platform Configuration',
      items: [
        { name: 'System Settings', link: '/admin/system-settings', icon: Settings, count: 'Global' },
        { name: 'Integration Management', link: '/admin/integration-management', icon: Globe, count: 'APIs' },
        { name: 'Email Template Management', link: '/admin/email-template-management', icon: FileText, count: 'Templates' },
        { name: 'Notification Management', link: '/admin/notification-management', icon: MessageSquare, count: 'Live' },
        { name: 'Multi-Regional Management', link: '/admin/multi-regional-management', icon: Globe, count: 'Regions' },
        { name: 'White Label Customization', link: '/admin/white-label-customization', icon: Settings, count: 'Brands' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Complete platform oversight and management</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
            </div>
          </div>
        </div>

        {/* Platform Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900">{platformStats.totalUsers.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">↗ +12.5% from last month</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Organizations</p>
                <p className="text-3xl font-bold text-gray-900">{platformStats.totalOrganizations.toLocaleString()}</p>
                <p className="text-sm text-green-600 mt-1">↗ +8.3% from last month</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">System Uptime</p>
                <p className="text-3xl font-bold text-gray-900">{platformStats.systemUptime}%</p>
                <p className="text-sm text-green-600 mt-1">Excellent performance</p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Alerts</p>
                <p className="text-3xl font-bold text-gray-900">{platformStats.criticalAlerts}</p>
                <p className="text-sm text-orange-600 mt-1">Requires attention</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* System Health Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health Status</h3>
            <div className="space-y-4">
              {Object.entries(systemHealth).map(([service, data]) => (
                <div key={service} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      data.status === 'healthy' ? 'bg-green-500' : 
                      data.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                    }`}></div>
                    <span className="font-medium capitalize">{service}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium">{data.uptime}%</span>
                    <p className="text-xs text-gray-500 capitalize">{data.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-soft p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">KYC Compliance</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${complianceMetrics.kycCompliance}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{complianceMetrics.kycCompliance}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">AML Compliance</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${complianceMetrics.amlCompliance}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{complianceMetrics.amlCompliance}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">GDPR Compliance</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: `${complianceMetrics.gdprCompliance}%` }}></div>
                  </div>
                  <span className="text-sm font-medium">{complianceMetrics.gdprCompliance}%</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm font-semibold text-gray-900">Overall Trust Score</span>
                <span className="text-lg font-bold text-green-600">{complianceMetrics.overallTrustScore}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:shadow-md transition-all duration-200"
              >
                <div className={`p-3 rounded-full ${action.color} mb-2`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-900 text-center">{action.title}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {managementSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white rounded-lg shadow-soft p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    to={item.link}
                    className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-gray-50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{item.name}</span>
                    </div>
                    <span className="text-sm font-medium text-primary-600">{item.count}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-soft p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Platform Activity</h3>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                <div className={`w-2 h-2 rounded-full ${
                  activity.severity === 'high' ? 'bg-red-500' :
                  activity.severity === 'success' ? 'bg-green-500' : 'bg-blue-500'
                }`}></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  activity.severity === 'high' ? 'bg-red-100 text-red-800' :
                  activity.severity === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;