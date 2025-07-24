import React, { useState } from 'react'
import BellIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Email';
import MessageSquareIcon from '@mui/icons-material/Chat';
import UsersIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import SendIcon from '@mui/icons-material/Send';
import EyeIcon from '@mui/icons-material/Visibility';
import Trash2Icon from '@mui/icons-material/Delete';
import PlusIcon from '@mui/icons-material/Add';
import FilterIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import ClockIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AlertTriangleIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import XIcon from '@mui/icons-material/Close';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Building, 
  FileText, 
  X, 
  Send, 
  Save,
  Settings,
  Mail,
  MessageSquare,
  Smartphone,
  Globe,
  Calendar,
  RefreshCw,
  AlertTriangle,
  Info,
  Zap,
  Users
} from 'lucide-react'

interface NotificationTemplate {
  id: string
  name: string
  description: string
  category: 'verification' | 'system' | 'security' | 'marketing' | 'billing'
  channels: ('email' | 'in_app' | 'sms' | 'push')[]
  status: 'active' | 'draft' | 'disabled'
  createdAt: string
  updatedAt: string
  lastSent?: string
  variables: string[]
}

interface NotificationLog {
  id: string
  templateId: string
  templateName: string
  recipient: {
    id: string
    name: string
    type: 'individual' | 'organization'
  }
  channel: 'email' | 'in_app' | 'sms' | 'push'
  status: 'sent' | 'delivered' | 'failed' | 'opened'
  sentAt: string
  deliveredAt?: string
  openedAt?: string
  failureReason?: string
}

const AdminNotificationManagement = () => {
  const [activeTab, setActiveTab] = useState<'templates' | 'logs' | 'settings'>('templates')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedChannel, setSelectedChannel] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showTemplateModal, setShowTemplateModal] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<NotificationTemplate | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock notification templates
  const notificationTemplates: NotificationTemplate[] = [
    {
      id: 'template_001',
      name: 'Verification Approved',
      description: 'Sent when a verification is approved',
      category: 'verification',
      channels: ['email', 'in_app'],
      status: 'active',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-15',
      lastSent: '2024-01-20',
      variables: ['user_name', 'verification_type', 'verification_date']
    },
    {
      id: 'template_002',
      name: 'New Verification Request',
      description: 'Sent when a user receives a new verification request',
      category: 'verification',
      channels: ['email', 'in_app', 'push'],
      status: 'active',
      createdAt: '2024-01-12',
      updatedAt: '2024-01-15',
      lastSent: '2024-01-19',
      variables: ['user_name', 'requester_name', 'verification_type']
    },
    {
      id: 'template_003',
      name: 'Password Changed',
      description: 'Sent when a user changes their password',
      category: 'security',
      channels: ['email'],
      status: 'active',
      createdAt: '2024-01-08',
      updatedAt: '2024-01-15',
      lastSent: '2024-01-18',
      variables: ['user_name', 'change_time', 'ip_address']
    },
    {
      id: 'template_004',
      name: 'Payment Received',
      description: 'Sent when a payment is received',
      category: 'billing',
      channels: ['email', 'in_app'],
      status: 'active',
      createdAt: '2024-01-14',
      updatedAt: '2024-01-15',
      lastSent: '2024-01-17',
      variables: ['user_name', 'amount', 'payment_date', 'transaction_id']
    },
    {
      id: 'template_005',
      name: 'Monthly Newsletter',
      description: 'Monthly newsletter with platform updates',
      category: 'marketing',
      channels: ['email'],
      status: 'draft',
      createdAt: '2024-01-18',
      updatedAt: '2024-01-18',
      variables: ['user_name', 'month', 'year']
    },
    {
      id: 'template_006',
      name: 'System Maintenance',
      description: 'Notification about scheduled system maintenance',
      category: 'system',
      channels: ['email', 'in_app'],
      status: 'disabled',
      createdAt: '2023-12-10',
      updatedAt: '2024-01-05',
      lastSent: '2023-12-15',
      variables: ['user_name', 'maintenance_date', 'maintenance_duration']
    }
  ]

  // Mock notification logs
  const notificationLogs: NotificationLog[] = [
    {
      id: 'log_001',
      templateId: 'template_001',
      templateName: 'Verification Approved',
      recipient: {
        id: 'user_001',
        name: 'John Doe',
        type: 'individual'
      },
      channel: 'email',
      status: 'delivered',
      sentAt: '2024-01-20T10:30:00Z',
      deliveredAt: '2024-01-20T10:30:05Z',
      openedAt: '2024-01-20T10:35:00Z'
    },
    {
      id: 'log_002',
      templateId: 'template_002',
      templateName: 'New Verification Request',
      recipient: {
        id: 'user_002',
        name: 'Jane Smith',
        type: 'individual'
      },
      channel: 'in_app',
      status: 'delivered',
      sentAt: '2024-01-19T14:15:00Z',
      deliveredAt: '2024-01-19T14:15:01Z'
    },
    {
      id: 'log_003',
      templateId: 'template_003',
      templateName: 'Password Changed',
      recipient: {
        id: 'user_003',
        name: 'Michael Johnson',
        type: 'individual'
      },
      channel: 'email',
      status: 'opened',
      sentAt: '2024-01-18T11:20:00Z',
      deliveredAt: '2024-01-18T11:20:05Z',
      openedAt: '2024-01-18T11:25:00Z'
    },
    {
      id: 'log_004',
      templateId: 'template_004',
      templateName: 'Payment Received',
      recipient: {
        id: 'user_004',
        name: 'TechCorp Solutions',
        type: 'organization'
      },
      channel: 'email',
      status: 'failed',
      sentAt: '2024-01-17T09:45:00Z',
      failureReason: 'Invalid email address'
    },
    {
      id: 'log_005',
      templateId: 'template_001',
      templateName: 'Verification Approved',
      recipient: {
        id: 'user_005',
        name: 'Sarah Wilson',
        type: 'individual'
      },
      channel: 'push',
      status: 'delivered',
      sentAt: '2024-01-16T16:30:00Z',
      deliveredAt: '2024-01-16T16:30:02Z'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'draft':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'disabled':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'sent':
        return <Send className="w-5 h-5 text-blue-500" />
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'opened':
        return <Eye className="w-5 h-5 text-green-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'disabled':
        return 'bg-red-100 text-red-800'
      case 'sent':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'opened':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'verification':
        return 'bg-blue-100 text-blue-800'
      case 'system':
        return 'bg-purple-100 text-purple-800'
      case 'security':
        return 'bg-red-100 text-red-800'
      case 'marketing':
        return 'bg-green-100 text-green-800'
      case 'billing':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="w-4 h-4 text-blue-500" />
      case 'in_app':
        return <Bell className="w-4 h-4 text-purple-500" />
      case 'sms':
        return <Smartphone className="w-4 h-4 text-green-500" />
      case 'push':
        return <Bell className="w-4 h-4 text-orange-500" />
      default:
        return <Bell className="w-4 h-4 text-gray-500" />
    }
  }

  // Filter templates based on search/filters
  const filteredTemplates = notificationTemplates.filter(template => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by category
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    
    // Filter by channel
    const matchesChannel = selectedChannel === 'all' || template.channels.includes(selectedChannel as any)
    
    // Filter by status
    const matchesStatus = selectedStatus === 'all' || template.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesChannel && matchesStatus
  })

  // Filter logs based on search/filters
  const filteredLogs = notificationLogs.filter(log => {
    // Filter by search query
    const matchesSearch = searchQuery === '' || 
      log.templateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.recipient.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by channel
    const matchesChannel = selectedChannel === 'all' || log.channel === selectedChannel
    
    // Filter by status
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus
    
    return matchesSearch && matchesChannel && matchesStatus
  })

  const handleSaveTemplate = () => {
    setLoading(true)
    
    // Simulate saving template
    setTimeout(() => {
      setLoading(false)
      setShowTemplateModal(false)
      
      // In a real app, this would update the template
      console.log('Saving template:', selectedTemplate)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notification Management</h1>
          <p className="text-gray-600 mt-1">Manage notification templates, delivery channels, and notification logs</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          {activeTab === 'templates' && (
            <button 
              onClick={() => {
                setSelectedTemplate(null)
                setShowTemplateModal(true)
              }}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </button>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Templates',
            value: notificationTemplates.length,
            icon: Bell,
            color: 'bg-blue-500',
            description: 'All notification templates'
          },
          {
            title: 'Notifications Sent',
            value: '15,678',
            icon: Send,
            color: 'bg-green-500',
            description: 'Last 30 days'
          },
          {
            title: 'Open Rate',
            value: '68%',
            icon: Eye,
            color: 'bg-purple-500',
            description: 'Average open rate'
          },
          {
            title: 'Delivery Rate',
            value: '99.2%',
            icon: CheckCircle,
            color: 'bg-orange-500',
            description: 'Successful deliveries'
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
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'templates'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notification Templates</span>
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'logs'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Notification Logs</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'settings'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Notification Settings</span>
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      {activeTab !== 'settings' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder={activeTab === 'templates' ? "Search templates..." : "Search notification logs..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {activeTab === 'templates' && (
                <select 
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Categories</option>
                  <option value="verification">Verification</option>
                  <option value="system">System</option>
                  <option value="security">Security</option>
                  <option value="marketing">Marketing</option>
                  <option value="billing">Billing</option>
                </select>
              )}
              
              <select 
                value={selectedChannel}
                onChange={(e) => setSelectedChannel(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Channels</option>
                <option value="email">Email</option>
                <option value="in_app">In-App</option>
                <option value="sms">SMS</option>
                <option value="push">Push</option>
              </select>
              
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                {activeTab === 'templates' ? (
                  <>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="disabled">Disabled</option>
                  </>
                ) : (
                  <>
                    <option value="sent">Sent</option>
                    <option value="delivered">Delivered</option>
                    <option value="opened">Opened</option>
                    <option value="failed">Failed</option>
                  </>
                )}
              </select>
              
              <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Templates Table */}
      {activeTab === 'templates' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channels
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Sent
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTemplates.map((template) => (
                  <tr key={template.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Bell className="w-5 h-5 text-gray-600 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{template.name}</div>
                          <div className="text-xs text-gray-500">{template.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                        {template.category.charAt(0).toUpperCase() + template.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {template.channels.map((channel) => (
                          <div key={channel} title={channel.charAt(0).toUpperCase() + channel.slice(1)}>
                            {getChannelIcon(channel)}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(template.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(template.status)}`}>
                          {template.status.charAt(0).toUpperCase() + template.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(template.updatedAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {template.lastSent ? new Date(template.lastSent).toLocaleDateString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedTemplate(template)
                            setShowTemplateModal(true)
                          }}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
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
          
          {filteredTemplates.length === 0 && (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Notification Logs */}
      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Template
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Recipient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Channel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sent At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Opened At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{log.templateName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-2">
                          {log.recipient.type === 'individual' ? (
                            <User className="w-4 h-4 text-white" />
                          ) : (
                            <Building className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div className="text-sm text-gray-900">{log.recipient.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getChannelIcon(log.channel)}
                        <span className="text-sm text-gray-900 capitalize">
                          {log.channel === 'in_app' ? 'In-App' : log.channel.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(log.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                          {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(log.sentAt).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.openedAt ? new Date(log.openedAt).toLocaleString() : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <Eye className="w-4 h-4" />
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
          
          {filteredLogs.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notification logs found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Channel Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Channels</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Email Notifications</p>
                    <p className="text-sm text-gray-600">Send notifications via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Bell className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">In-App Notifications</p>
                    <p className="text-sm text-gray-600">Show notifications within the application</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Smartphone className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">SMS Notifications</p>
                    <p className="text-sm text-gray-600">Send notifications via SMS</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Bell className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Push Notifications</p>
                    <p className="text-sm text-gray-600">Send push notifications to mobile devices</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Default Notification Preferences</h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Individual Users</h4>
                <div className="space-y-3">
                  {[
                    { category: 'Verification Updates', email: true, inApp: true, sms: false, push: true },
                    { category: 'Security Alerts', email: true, inApp: true, sms: true, push: true },
                    { category: 'System Announcements', email: true, inApp: true, sms: false, push: false },
                    { category: 'Marketing Communications', email: false, inApp: false, sms: false, push: false }
                  ].map((pref, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{pref.category}</span>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            defaultChecked={pref.email}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Mail className="w-4 h-4 text-gray-600" />
                        </label>
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            defaultChecked={pref.inApp}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Bell className="w-4 h-4 text-gray-600" />
                        </label>
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            defaultChecked={pref.sms}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Smartphone className="w-4 h-4 text-gray-600" />
                        </label>
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            defaultChecked={pref.push}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Bell className="w-4 h-4 text-gray-600" />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Organizations</h4>
                <div className="space-y-3">
                  {[
                    { category: 'Verification Updates', email: true, inApp: true, sms: false, push: false },
                    { category: 'Security Alerts', email: true, inApp: true, sms: false, push: false },
                    { category: 'System Announcements', email: true, inApp: true, sms: false, push: false },
                    { category: 'Billing Notifications', email: true, inApp: true, sms: false, push: false }
                  ].map((pref, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm font-medium text-gray-900">{pref.category}</span>
                      <div className="flex items-center space-x-4">
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            defaultChecked={pref.email}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Mail className="w-4 h-4 text-gray-600" />
                        </label>
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            defaultChecked={pref.inApp}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Bell className="w-4 h-4 text-gray-600" />
                        </label>
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            defaultChecked={pref.sms}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Smartphone className="w-4 h-4 text-gray-600" />
                        </label>
                        <label className="flex items-center space-x-1">
                          <input
                            type="checkbox"
                            defaultChecked={pref.push}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <Bell className="w-4 h-4 text-gray-600" />
                        </label>
                      </div>
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

      {/* Create/Edit Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  {selectedTemplate ? 'Edit Notification Template' : 'Create New Notification Template'}
                </h2>
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name *
                </label>
                <input
                  type="text"
                  defaultValue={selectedTemplate?.name || ''}
                  placeholder="e.g., Verification Approved"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  defaultValue={selectedTemplate?.description || ''}
                  placeholder="Brief description of the template's purpose"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select 
                  defaultValue={selectedTemplate?.category || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select Category</option>
                  <option value="verification">Verification</option>
                  <option value="system">System</option>
                  <option value="security">Security</option>
                  <option value="marketing">Marketing</option>
                  <option value="billing">Billing</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Channels *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'email', name: 'Email', icon: Mail },
                    { id: 'in_app', name: 'In-App', icon: MessageSquare },
                    { id: 'sms', name: 'SMS', icon: Smartphone },
                    { id: 'push', name: 'Push', icon: Zap }
                  ].map((channel) => (
                    <label key={channel.id} className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        defaultChecked={selectedTemplate?.channels.includes(channel.id as any) || false}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3 flex items-center space-x-2">
                        <channel.icon className="w-5 h-5 text-gray-600" />
                        <span className="text-sm text-gray-700">{channel.name}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select 
                  defaultValue={selectedTemplate?.status || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Variables (comma-separated)
                </label>
                <input
                  type="text"
                  defaultValue={selectedTemplate?.variables.join(', ') || ''}
                  placeholder="e.g., user_name, verification_type"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowTemplateModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSaveTemplate}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  {selectedTemplate ? 'Save Changes' : 'Create Template'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminNotificationManagement