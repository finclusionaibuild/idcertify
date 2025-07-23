import React, { useState } from 'react'
import { 
  Shield, 
  Users, 
  GitBranch,
  Settings,
  History,
  Database, 
  Server, 
  Globe, 
  Key, 
  Lock, 
  Bell, 
  FileText, 
  Download, 
  Upload, 
  MessageSquare,
  Ticket,
  Palette,
  Globe,
  Gift,
  Star,
  FileText,
  Layout
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Search, 
  Filter, 
  RefreshCw, 
  ArrowUp, 
  ArrowDown, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  User, 
  Building, 
  Calendar, 
  Save
} from 'lucide-react'
import { Link } from 'react-router-dom'

interface SystemMetric {
  name: string
  value: string | number
  change: string
  changeType: 'positive' | 'negative' | 'neutral'
  icon: any
}

interface AdminUser {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
  permissions: string[]
}

const SuperAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'settings' | 'logs'>('dashboard')
  const [showAddUserModal, setShowAddUserModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null)
  const [showEditUserModal, setShowEditUserModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock system metrics
  const systemMetrics: SystemMetric[] = [
    {
      name: 'Total Users',
      value: '12,458',
      change: '+16.5%',
      changeType: 'positive',
      icon: Users
    },
    {
      name: 'Verifications',
      value: '43,678',
      change: '+12.3%',
      changeType: 'positive',
      icon: Shield
    },
    {
      name: 'System Uptime',
      value: '99.98%',
      change: '+0.02%',
      changeType: 'positive',
      icon: Server
    },
    {
      name: 'API Calls',
      value: '1.2M',
      change: '+24.8%',
      changeType: 'positive',
      icon: Globe
    }
  ]

  // Mock admin users
  const adminUsers: AdminUser[] = [
    {
      id: '1',
      name: 'John Admin',
      email: 'john.admin@idcertify.com',
      role: 'Super Admin',
      status: 'active',
      lastLogin: '2024-01-20T14:30:00Z',
      permissions: ['all']
    },
    {
      id: '2',
      name: 'Sarah Manager',
      email: 'sarah.manager@idcertify.com',
      role: 'Admin',
      status: 'active',
      lastLogin: '2024-01-19T10:15:00Z',
      permissions: ['users.view', 'users.create', 'verifications.manage', 'settings.view']
    },
    {
      id: '3',
      name: 'Michael Support',
      email: 'michael.support@idcertify.com',
      role: 'Support',
      status: 'active',
      lastLogin: '2024-01-20T09:45:00Z',
      permissions: ['users.view', 'verifications.view', 'verifications.manage']
    },
    {
      id: '4',
      name: 'Amanda Viewer',
      email: 'amanda.viewer@idcertify.com',
      role: 'Viewer',
      status: 'inactive',
      lastLogin: '2024-01-15T11:20:00Z',
      permissions: ['users.view', 'verifications.view']
    }
  ]

  const handleAddUser = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowAddUserModal(false)
    } catch (error) {
      console.error('Error adding user:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditUser = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowEditUserModal(false)
      setSelectedUser(null)
    } catch (error) {
      console.error('Error updating user:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Complete platform control and configuration</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            System Settings
          </button>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemMetrics.map((metric, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-primary-100 rounded-lg">
                <metric.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className={`flex items-center text-xs font-medium ${
                metric.changeType === 'positive' ? 'text-green-600' : 
                metric.changeType === 'negative' ? 'text-red-600' : 'text-gray-600'
              }`}>
                {metric.changeType === 'positive' ? (
                  <ArrowUp className="w-3 h-3 mr-1" />
                ) : metric.changeType === 'negative' ? (
                  <ArrowDown className="w-3 h-3 mr-1" />
                ) : null}
                {metric.change}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{metric.name}</p>
              <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'users', label: 'Admin Users', icon: Users },
            { id: 'settings', label: 'System Settings', icon: Settings },
            { id: 'logs', label: 'System Logs', icon: FileText }
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
      {activeTab === 'dashboard' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Platform Overview */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Platform Overview</h3>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last year</option>
              </select>
            </div>
            
            {/* Simple Chart Visualization */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center space-y-1 mb-2 w-full">
                    <div 
                      className="w-full bg-blue-500 rounded-t"
                      style={{ height: `${Math.random() * 60 + 20}px` }}
                      title="Users"
                    ></div>
                    <div 
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${Math.random() * 40 + 10}px` }}
                      title="Verifications"
                    ></div>
                    <div 
                      className="w-full bg-purple-500 rounded-t"
                      style={{ height: `${Math.random() * 20 + 5}px` }}
                      title="API Calls"
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Users</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Verifications</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">API Calls</span>
              </div>
              <Link to="/admin/approval-workflow" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                <GitBranch className="w-5 h-5 text-indigo-600 mr-3" />
                <span className="text-sm">Approval Workflows</span>
              </Link>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <Link to="/admin/users" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Users className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Manage Users</span>
                </Link>
                <Link to="/admin/organisations" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Building className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm">Manage Organisations</span>
                </Link>
                <Link to="/admin/verifications" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Shield className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm">Verification Oversight</span>
                </Link>
                <Link to="/admin/system" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-orange-600 mr-3" />
                  <span className="text-sm">System Configuration</span>
                </Link>
                <Link to="/admin/regions" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Globe className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Regional Management</span>
                </Link>
                <Link to="/admin/bulk-historical" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <History className="w-5 h-5 text-indigo-600 mr-3" />
                  <span className="text-sm">Historical Data Import</span>
                </Link>
                <Link to="/admin/historical-data" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <FileCheck className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm">Manage Historical Records</span>
                </Link>
                <Link to="/admin/transactions" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Wallet className="w-5 h-5 text-red-600 mr-3" />
                  <span className="text-sm">Transaction Management</span>
                </Link>
              </div>
            </div>

            {/* System Health */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">System Health</h3>
                <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Refresh
                </button>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: 'API Services', status: 'Operational', icon: Globe, color: 'text-green-600', bgColor: 'bg-green-100' },
                  { name: 'Database', status: 'Operational', icon: Database, color: 'text-green-600', bgColor: 'bg-green-100' },
                  { name: 'Storage', status: 'Operational', icon: Server, color: 'text-green-600', bgColor: 'bg-green-100' },
                  { name: 'Authentication', status: 'Operational', icon: Lock, color: 'text-green-600', bgColor: 'bg-green-100' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${service.bgColor}`}>
                        <service.icon className={`w-4 h-4 ${service.color}`} />
                      </div>
                      <span className="text-sm text-gray-700">{service.name}</span>
                    </div>
                    <span className={`text-sm ${service.color} font-medium`}>{service.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="space-y-6">
          {/* Admin Users Management */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Admin Users</h3>
              <button 
                onClick={() => setShowAddUserModal(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Admin User
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Permissions
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {adminUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {user.status === 'active' ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.lastLogin).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.includes('all') ? (
                            <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                              All Permissions
                            </span>
                          ) : (
                            user.permissions.slice(0, 2).map((perm, index) => (
                              <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                {perm.split('.').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('.')}
                              </span>
                            ))
                          )}
                          {user.permissions.length > 2 && !user.permissions.includes('all') && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{user.permissions.length - 2} more
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedUser(user)
                              setShowEditUserModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <MoreHorizontal className="w-4 h-4" />
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

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* System Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">System Configuration</h3>
            
            <div className="space-y-6">
              {/* General Settings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">General Settings</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Platform Name', value: 'IDCertify', type: 'text' },
                    { name: 'Support Email', value: 'support@idcertify.com', type: 'email' },
                    { name: 'Maintenance Mode', value: false, type: 'toggle' }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{setting.name}</p>
                      </div>
                      {setting.type === 'toggle' ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={setting.value as boolean} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      ) : (
                        <input
                          type={setting.type}
                          defaultValue={setting.value as string}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Security Settings */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Security Settings</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Session Timeout (minutes)', value: 30, type: 'number' },
                    { name: 'Maximum Login Attempts', value: 5, type: 'number' },
                    { name: 'Require 2FA for Admins', value: true, type: 'toggle' },
                    { name: 'Password Expiry (days)', value: 90, type: 'number' }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{setting.name}</p>
                      </div>
                      {setting.type === 'toggle' ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={setting.value as boolean} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      ) : (
                        <input
                          type={setting.type}
                          defaultValue={setting.value as string}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Verification Settings */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Verification Settings</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Verification Expiry (days)', value: 365, type: 'number' },
                    { name: 'Auto-approve Low-risk Verifications', value: false, type: 'toggle' },
                    { name: 'Minimum Document Quality Score', value: 70, type: 'number' }
                  ].map((setting, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{setting.name}</p>
                      </div>
                      {setting.type === 'toggle' ? (
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" defaultChecked={setting.value as boolean} />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        </label>
                      ) : (
                        <input
                          type={setting.type}
                          defaultValue={setting.value as string}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Reset to Defaults
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">System Logs</h3>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Log Types</option>
                  <option>Error</option>
                  <option>Warning</option>
                  <option>Info</option>
                  <option>Debug</option>
                </select>
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { timestamp: '2024-01-20 15:30:45', level: 'ERROR', source: 'API', message: 'Rate limit exceeded for API key API-123456', user: 'TechCorp Solutions', ip: '192.168.1.1' },
                  { timestamp: '2024-01-20 14:22:10', level: 'WARNING', source: 'Auth', message: 'Failed login attempt', user: 'john.doe@example.com', ip: '192.168.1.2' },
                  { timestamp: '2024-01-20 13:15:22', level: 'INFO', source: 'Verification', message: 'Verification request approved', user: 'admin@idcertify.com', ip: '192.168.1.3' },
                  { timestamp: '2024-01-20 12:05:18', level: 'INFO', source: 'User', message: 'New user registered', user: 'jane.smith@company.com', ip: '192.168.1.4' },
                  { timestamp: '2024-01-20 11:30:05', level: 'ERROR', source: 'Database', message: 'Connection timeout', user: 'System', ip: '192.168.1.5' },
                  { timestamp: '2024-01-20 10:45:30', level: 'WARNING', source: 'Security', message: 'Suspicious login attempt blocked', user: 'Unknown', ip: '192.168.1.6' },
                  { timestamp: '2024-01-20 09:20:15', level: 'INFO', source: 'Admin', message: 'System settings updated', user: 'admin@idcertify.com', ip: '192.168.1.7' },
                  { timestamp: '2024-01-20 08:10:40', level: 'DEBUG', source: 'API', message: 'API request processed successfully', user: 'TechCorp Solutions', ip: '192.168.1.8' }
                ].map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                        log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                        log.level === 'INFO' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.source}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add Admin User</h2>
                <button 
                  onClick={() => setShowAddUserModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Support</option>
                  <option>Viewer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {[
                    { id: 'all', label: 'All Permissions' },
                    { id: 'users.view', label: 'View Users' },
                    { id: 'users.create', label: 'Create Users' },
                    { id: 'users.edit', label: 'Edit Users' },
                    { id: 'users.delete', label: 'Delete Users' },
                    { id: 'verifications.view', label: 'View Verifications' },
                    { id: 'verifications.manage', label: 'Manage Verifications' },
                    { id: 'settings.view', label: 'View Settings' },
                    { id: 'settings.edit', label: 'Edit Settings' }
                  ].map((permission) => (
                    <div key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={permission.id}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={permission.id} className="ml-2 text-sm text-gray-700">
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddUserModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddUser}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Admin User</h2>
                <button 
                  onClick={() => {
                    setShowEditUserModal(false)
                    setSelectedUser(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  defaultValue={selectedUser.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={selectedUser.email}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <select 
                  defaultValue={selectedUser.role}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option>Super Admin</option>
                  <option>Admin</option>
                  <option>Support</option>
                  <option>Viewer</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select 
                  defaultValue={selectedUser.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Permissions
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-200 rounded-lg p-3">
                  {[
                    { id: 'all', label: 'All Permissions' },
                    { id: 'users.view', label: 'View Users' },
                    { id: 'users.create', label: 'Create Users' },
                    { id: 'users.edit', label: 'Edit Users' },
                    { id: 'users.delete', label: 'Delete Users' },
                    { id: 'verifications.view', label: 'View Verifications' },
                    { id: 'verifications.manage', label: 'Manage Verifications' },
                    { id: 'settings.view', label: 'View Settings' },
                    { id: 'settings.edit', label: 'Edit Settings' }
                  ].map((permission) => (
                    <div key={permission.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`edit-${permission.id}`}
                        defaultChecked={
                          selectedUser.permissions.includes('all') ? 
                          permission.id === 'all' : 
                          selectedUser.permissions.includes(permission.id)
                        }
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <label htmlFor={`edit-${permission.id}`} className="ml-2 text-sm text-gray-700">
                        {permission.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => {
                    setShowEditUserModal(false)
                    setSelectedUser(null)
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditUser}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuperAdminDashboard