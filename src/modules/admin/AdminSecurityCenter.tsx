import React, { useState } from 'react'
import { 
  Shield, 
  Lock, 
  Key, 
  User, 
  Users, 
  Eye, 
  EyeOff, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Settings, 
  FileText, 
  Download, 
  RefreshCw, 
  Filter, 
  Search, 
  Calendar, 
  Globe, 
  Database, 
  Server, 
  Bell
} from 'lucide-react'

const AdminSecurityCenter = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'logs' | 'settings'>('overview')
  const [selectedTimeframe, setSelectedTimeframe] = useState('7days')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security & Settings Center</h1>
          <p className="text-gray-600 mt-1">Monitor security, audit logs, and manage system settings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Security Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'System Uptime',
            value: '99.98%',
            icon: Server,
            color: 'bg-green-500',
            description: 'Last 30 days'
          },
          {
            title: 'Security Alerts',
            value: '3',
            icon: AlertTriangle,
            color: 'bg-red-500',
            description: 'Require attention'
          },
          {
            title: 'Active Sessions',
            value: '156',
            icon: Users,
            color: 'bg-blue-500',
            description: 'Currently online'
          },
          {
            title: 'Failed Logins',
            value: '24',
            icon: XCircle,
            color: 'bg-yellow-500',
            description: 'Last 24 hours'
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

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'users', label: 'User Security', icon: User },
            { id: 'logs', label: 'Audit Logs', icon: FileText },
            { id: 'settings', label: 'Security Settings', icon: Settings }
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

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Overview</h3>
          
          <div className="space-y-6">
            {/* System Health */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">System Health</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { name: 'API Services', status: 'operational', icon: Globe, color: 'bg-green-500' },
                  { name: 'Database', status: 'operational', icon: Database, color: 'bg-green-500' },
                  { name: 'Storage Services', status: 'operational', icon: Server, color: 'bg-green-500' },
                  { name: 'Authentication', status: 'operational', icon: Lock, color: 'bg-green-500' },
                  { name: 'Verification Engine', status: 'degraded', icon: Shield, color: 'bg-yellow-500' },
                  { name: 'Notification System', status: 'operational', icon: Bell, color: 'bg-green-500' }
                ].map((service, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${service.status === 'operational' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                        <service.icon className={`w-5 h-5 ${service.status === 'operational' ? 'text-green-600' : 'text-yellow-600'}`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-xs text-gray-500">Uptime: 99.9%</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      service.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Security Events */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Recent Security Events</h4>
              <div className="space-y-3">
                {[
                  { event: 'Failed login attempt', user: 'john.doe@example.com', time: '2 hours ago', severity: 'medium' },
                  { event: 'Password changed', user: 'admin@idcertify.com', time: '5 hours ago', severity: 'low' },
                  { event: 'API key generated', user: 'api@techcorp.com', time: '1 day ago', severity: 'low' },
                  { event: 'Multiple failed login attempts', user: 'unknown@mail.com', time: '1 day ago', severity: 'high' },
                  { event: 'User account locked', user: 'jane.smith@example.com', time: '2 days ago', severity: 'medium' }
                ].map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-2 h-2 rounded-full ${
                        event.severity === 'high' ? 'bg-red-500' :
                        event.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{event.event}</p>
                        <p className="text-xs text-gray-500">{event.user} • {event.time}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      event.severity === 'high' ? 'bg-red-100 text-red-800' :
                      event.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Audit Logs</h3>
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="24hours">Last 24 hours</option>
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="custom">Custom range</option>
                </select>
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
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
                    Event
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { timestamp: '2024-01-20 15:30:45', event: 'Login', user: 'admin@idcertify.com', ip: '192.168.1.1', details: 'Successful login' },
                  { timestamp: '2024-01-20 14:22:10', event: 'Failed login', user: 'john.doe@example.com', ip: '192.168.1.2', details: 'Invalid password' },
                  { timestamp: '2024-01-20 13:15:22', event: 'Settings changed', user: 'admin@idcertify.com', ip: '192.168.1.3', details: 'Updated security settings' },
                  { timestamp: '2024-01-20 12:05:18', event: 'User created', user: 'admin@idcertify.com', ip: '192.168.1.4', details: 'Created new admin user' },
                  { timestamp: '2024-01-20 11:30:05', event: 'API key generated', user: 'api@techcorp.com', ip: '192.168.1.5', details: 'New API key for production' },
                  { timestamp: '2024-01-20 10:45:30', event: 'Password reset', user: 'jane.smith@example.com', ip: '192.168.1.6', details: 'Password reset requested' },
                  { timestamp: '2024-01-20 09:20:15', event: 'Account locked', user: 'unknown@mail.com', ip: '192.168.1.7', details: 'Multiple failed login attempts' },
                  { timestamp: '2024-01-20 08:10:40', event: 'Document deleted', user: 'admin@idcertify.com', ip: '192.168.1.8', details: 'Deleted sensitive document' }
                ].map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.event}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ip}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.details}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">User Security Management</h3>
          
          <div className="space-y-6">
            {/* Security Policies */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Security Policies</h4>
              <div className="space-y-4">
                {[
                  { name: 'Two-Factor Authentication', description: 'Require 2FA for all admin users', enabled: true },
                  { name: 'Password Complexity', description: 'Minimum 12 characters with special characters', enabled: true },
                  { name: 'Session Timeout', description: 'Automatically log out after 30 minutes of inactivity', enabled: true },
                  { name: 'Login Attempt Limits', description: 'Lock account after 5 failed attempts', enabled: true },
                  { name: 'IP Restrictions', description: 'Restrict admin access to whitelisted IPs', enabled: false }
                ].map((policy, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{policy.name}</p>
                      <p className="text-sm text-gray-600">{policy.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={policy.enabled} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* User Security Status */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">User Security Status</h4>
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
                        2FA Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Login
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      { name: 'Admin User', email: 'admin@idcertify.com', role: 'Super Admin', twoFA: true, lastLogin: '2 hours ago' },
                      { name: 'Sarah Manager', email: 'sarah@idcertify.com', role: 'Admin', twoFA: true, lastLogin: '1 day ago' },
                      { name: 'John Support', email: 'john@idcertify.com', role: 'Support', twoFA: false, lastLogin: '3 days ago' },
                      { name: 'Jane Viewer', email: 'jane@idcertify.com', role: 'Viewer', twoFA: false, lastLogin: '1 week ago' }
                    ].map((user, index) => (
                      <tr key={index} className="hover:bg-gray-50">
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
                            {user.twoFA ? (
                              <CheckCircle className="w-5 h-5 text-green-500" />
                            ) : (
                              <XCircle className="w-5 h-5 text-red-500" />
                            )}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              user.twoFA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.twoFA ? 'Enabled' : 'Disabled'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {user.lastLogin}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900">
                            Manage Security
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Security Settings</h3>
          
          <div className="space-y-6">
            {/* Password Policy */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Password Policy</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Password Length
                  </label>
                  <input
                    type="number"
                    defaultValue={12}
                    min={8}
                    max={32}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password Expiry (days)
                  </label>
                  <input
                    type="number"
                    defaultValue={90}
                    min={30}
                    max={365}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Failed Login Attempts
                  </label>
                  <input
                    type="number"
                    defaultValue={5}
                    min={3}
                    max={10}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Lockout Duration (minutes)
                  </label>
                  <input
                    type="number"
                    defaultValue={30}
                    min={15}
                    max={1440}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="mt-4 space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Require uppercase letters
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Require lowercase letters
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Require numbers
                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Require special characters
                  </span>
                </label>
              </div>
            </div>
            
            {/* Two-Factor Authentication */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Two-Factor Authentication</h4>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Require 2FA for Admins</p>
                    <p className="text-sm text-gray-600">All admin users must enable two-factor authentication</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Allow Email-based 2FA</p>
                    <p className="text-sm text-gray-600">Send verification codes via email</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Allow SMS-based 2FA</p>
                    <p className="text-sm text-gray-600">Send verification codes via SMS</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Allow Authenticator Apps</p>
                    <p className="text-sm text-gray-600">Use TOTP-based authenticator apps</p>
                  </div>
                  <div className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Reset to Defaults
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminSecurityCenter