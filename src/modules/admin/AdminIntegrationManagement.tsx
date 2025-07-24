import React, { useState } from 'react'
import { 
  Puzzle, 
  Search, 
  CreditCard,
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
  AlertTriangle, 
  User, 
  Building, 
  FileText, 
  RefreshCw, 
  X, 
  Save, 
  Info, 
  Calendar, 
  Link as LinkIcon,
  Shield,
  Lock,
  Key,
  Globe,
  Database,
  Server,
  Settings,
  ExternalLink,
  BarChart3,
  ArrowUpRight,
  Zap,
  Webhook,
  MessageSquare,
  HelpCircle,
  FileCode,
  Code,
  Copy,
  EyeOff
} from 'lucide-react'

interface Integration {
  id: string
  name: string
  provider: string
  type: 'payment' | 'identity' | 'communication' | 'storage' | 'analytics' | 'other'
  status: 'active' | 'inactive' | 'pending' | 'failed'
  apiKey?: string
  secretKey?: string
  webhookUrl?: string
  callbackUrl?: string
  createdAt: string
  updatedAt: string
  lastSynced?: string
  usageCount: number
  usageLimit: number
  owner: string
  environment: 'production' | 'staging' | 'development'
  config: Record<string, any>
  description?: string
}

interface IntegrationLog {
  id: string
  integrationId: string
  timestamp: string
  event: string
  status: 'success' | 'error' | 'warning' | 'info'
  details: string
  ipAddress?: string
  userId?: string
}

const AdminIntegrationManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'integrations' | 'logs' | 'settings'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedEnvironment, setSelectedEnvironment] = useState('all')
  const [showAddIntegrationModal, setShowAddIntegrationModal] = useState(false)
  const [showEditIntegrationModal, setShowEditIntegrationModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showIntegrationDetailModal, setShowIntegrationDetailModal] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null)
  const [showApiKeys, setShowApiKeys] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock integrations data
  const integrations: Integration[] = [
    {
      id: 'int_001',
      name: 'Stripe Payment Gateway',
      provider: 'Stripe',
      type: 'payment',
      status: 'active',
      apiKey: 'pk_test_51KjH2b2eZvKYlo2C5C7S9F1P0XF2Zr6lQm6tO',
      secretKey: 'sk_test_51KjH2b2eZvKYlo2C5C7S9F1P0XF2Zr6lQm6tO',
      webhookUrl: 'https://api.idcertify.com/webhooks/stripe',
      createdAt: '2023-10-15T10:00:00Z',
      updatedAt: '2024-01-20T15:30:00Z',
      lastSynced: '2024-01-20T15:30:00Z',
      usageCount: 1245,
      usageLimit: 10000,
      owner: 'System',
      environment: 'production',
      config: {
        webhookSecret: 'whsec_12345',
        paymentMethods: ['card', 'bank_transfer'],
        currency: 'NGN'
      },
      description: 'Primary payment processor for all transactions'
    },
    {
      id: 'int_002',
      name: 'AWS S3 Storage',
      provider: 'Amazon Web Services',
      type: 'storage',
      status: 'active',
      apiKey: 'AKIAIOSFODNN7EXAMPLE',
      secretKey: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
      createdAt: '2023-09-01T08:15:00Z',
      updatedAt: '2024-01-15T11:20:00Z',
      lastSynced: '2024-01-15T11:20:00Z',
      usageCount: 8765,
      usageLimit: 50000,
      owner: 'System',
      environment: 'production',
      config: {
        region: 'us-west-2',
        bucket: 'idcertify-documents',
        acl: 'private'
      },
      description: 'Document storage for all verification files'
    },
    {
      id: 'int_003',
      name: 'SendGrid Email Service',
      provider: 'Twilio',
      type: 'communication',
      status: 'active',
      apiKey: 'SG.pKyYRIK4RGSGWeYOgLjLUw.y9QDNjDjPgcnVXrfCxqGWjjE',
      createdAt: '2023-11-10T14:30:00Z',
      updatedAt: '2024-01-10T09:45:00Z',
      lastSynced: '2024-01-10T09:45:00Z',
      usageCount: 5432,
      usageLimit: 100000,
      owner: 'System',
      environment: 'production',
      config: {
        fromEmail: 'noreply@idcertify.com',
        fromName: 'IDCertify',
        templates: {
          welcome: 'template_id_123',
          verification: 'template_id_456',
          reset_password: 'template_id_789'
        }
      },
      description: 'Email notifications and transactional emails'
    },
    {
      id: 'int_004',
      name: 'Google Analytics',
      provider: 'Google',
      type: 'analytics',
      status: 'active',
      apiKey: 'UA-123456789-1',
      createdAt: '2023-08-20T11:00:00Z',
      updatedAt: '2023-12-05T16:20:00Z',
      lastSynced: '2023-12-05T16:20:00Z',
      usageCount: 9876,
      usageLimit: 0, // Unlimited
      owner: 'Marketing Team',
      environment: 'production',
      config: {
        trackingId: 'UA-123456789-1',
        anonymizeIp: true,
        enableDemographics: false
      },
      description: 'Website analytics and user behavior tracking'
    },
    {
      id: 'int_005',
      name: 'Twilio SMS',
      provider: 'Twilio',
      type: 'communication',
      status: 'inactive',
      apiKey: 'AC9e7f7f5d5d5d5d5d5d5d5d5d5d5d5d5d',
      secretKey: '9e7f7f5d5d5d5d5d5d5d5d5d5d5d5d5d',
      createdAt: '2023-07-15T09:30:00Z',
      updatedAt: '2023-12-01T10:15:00Z',
      usageCount: 3210,
      usageLimit: 5000,
      owner: 'System',
      environment: 'production',
      config: {
        fromNumber: '+12345678901',
        region: 'US',
        fallbackToEmail: true
      },
      description: 'SMS notifications and verification codes'
    },
    {
      id: 'int_006',
      name: 'Veriff Identity Verification',
      provider: 'Veriff',
      type: 'identity',
      status: 'active',
      apiKey: 'veriff_live_12345abcdef',
      secretKey: 'veriff_secret_12345abcdef',
      webhookUrl: 'https://api.idcertify.com/webhooks/veriff',
      createdAt: '2023-10-01T13:45:00Z',
      updatedAt: '2024-01-18T14:20:00Z',
      lastSynced: '2024-01-18T14:20:00Z',
      usageCount: 2345,
      usageLimit: 5000,
      owner: 'Verification Team',
      environment: 'production',
      config: {
        verificationFlow: 'standard',
        requiredDocuments: ['passport', 'national_id', 'drivers_license'],
        callbackUrl: 'https://api.idcertify.com/callbacks/veriff'
      },
      description: 'Third-party identity verification service'
    },
    {
      id: 'int_007',
      name: 'Mixpanel Analytics (Dev)',
      provider: 'Mixpanel',
      type: 'analytics',
      status: 'active',
      apiKey: 'mixpanel_dev_12345',
      secretKey: 'mixpanel_secret_dev_12345',
      createdAt: '2023-11-20T16:00:00Z',
      updatedAt: '2024-01-05T11:30:00Z',
      lastSynced: '2024-01-05T11:30:00Z',
      usageCount: 1234,
      usageLimit: 10000,
      owner: 'Development Team',
      environment: 'development',
      config: {
        projectId: 'dev_project_123',
        trackPageViews: true,
        trackClicks: true
      },
      description: 'User behavior analytics for development environment'
    }
  ]

  // Mock integration logs
  const integrationLogs: IntegrationLog[] = [
    {
      id: 'log_001',
      integrationId: 'int_001',
      timestamp: '2024-01-20T15:30:00Z',
      event: 'API Key Rotation',
      status: 'success',
      details: 'API key rotated successfully',
      ipAddress: '192.168.1.1',
      userId: 'admin_001'
    },
    {
      id: 'log_002',
      integrationId: 'int_001',
      timestamp: '2024-01-20T14:45:00Z',
      event: 'Webhook Received',
      status: 'success',
      details: 'Payment confirmation webhook received and processed',
      ipAddress: '54.239.26.128'
    },
    {
      id: 'log_003',
      integrationId: 'int_003',
      timestamp: '2024-01-20T12:15:00Z',
      event: 'Email Sent',
      status: 'success',
      details: 'Welcome email sent to john.doe@example.com',
      userId: 'system'
    },
    {
      id: 'log_004',
      integrationId: 'int_006',
      timestamp: '2024-01-20T10:30:00Z',
      event: 'Verification Request',
      status: 'error',
      details: 'Failed to initiate verification: Invalid parameters',
      ipAddress: '192.168.1.5',
      userId: 'user_123'
    },
    {
      id: 'log_005',
      integrationId: 'int_002',
      timestamp: '2024-01-20T09:15:00Z',
      event: 'File Upload',
      status: 'success',
      details: 'Document uploaded to S3 bucket: idcertify-documents/user_123/passport.pdf',
      userId: 'user_123'
    },
    {
      id: 'log_006',
      integrationId: 'int_005',
      timestamp: '2024-01-19T16:45:00Z',
      event: 'SMS Sent',
      status: 'warning',
      details: 'SMS sent but delivery confirmation not received',
      userId: 'user_456'
    },
    {
      id: 'log_007',
      integrationId: 'int_004',
      timestamp: '2024-01-19T14:20:00Z',
      event: 'Configuration Update',
      status: 'info',
      details: 'Updated tracking settings: anonymizeIp set to true',
      ipAddress: '192.168.1.10',
      userId: 'admin_002'
    }
  ]

  // Filter integrations
  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = searchQuery === '' || 
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = selectedType === 'all' || integration.type === selectedType
    const matchesStatus = selectedStatus === 'all' || integration.status === selectedStatus
    const matchesEnvironment = selectedEnvironment === 'all' || integration.environment === selectedEnvironment
    
    return matchesSearch && matchesType && matchesStatus && matchesEnvironment
  })

  // Filter logs
  const filteredLogs = integrationLogs.filter(log => {
    if (selectedIntegration) {
      return log.integrationId === selectedIntegration.id
    }
    return true
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'inactive':
        return <XCircle className="w-5 h-5 text-gray-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'failed':
        return <AlertTriangle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-5 h-5 text-green-500" />
      case 'identity':
        return <Shield className="w-5 h-5 text-blue-500" />
      case 'communication':
        return <MessageSquare className="w-5 h-5 text-purple-500" />
      case 'storage':
        return <Database className="w-5 h-5 text-orange-500" />
      case 'analytics':
        return <BarChart3 className="w-5 h-5 text-indigo-500" />
      default:
        return <Puzzle className="w-5 h-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'payment':
        return 'bg-green-100 text-green-800'
      case 'identity':
        return 'bg-blue-100 text-blue-800'
      case 'communication':
        return 'bg-purple-100 text-purple-800'
      case 'storage':
        return 'bg-orange-100 text-orange-800'
      case 'analytics':
        return 'bg-indigo-100 text-indigo-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getLogStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />
      default:
        return <Info className="w-5 h-5 text-gray-400" />
    }
  }

  const getLogStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-100 text-green-800'
      case 'error':
        return 'bg-red-100 text-red-800'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800'
      case 'info':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleAddIntegration = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowAddIntegrationModal(false)
    } catch (error) {
      console.error('Error adding integration:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditIntegration = async () => {
    if (!selectedIntegration) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowEditIntegrationModal(false)
      setSelectedIntegration(null)
    } catch (error) {
      console.error('Error updating integration:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteIntegration = async () => {
    if (!selectedIntegration) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowDeleteModal(false)
      setSelectedIntegration(null)
    } catch (error) {
      console.error('Error deleting integration:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleTestIntegration = async (integrationId: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log(`Testing integration ${integrationId}`)
      // Show success message
    } catch (error) {
      console.error('Error testing integration:', error)
      // Show error message
    } finally {
      setLoading(false)
    }
  }

  const maskApiKey = (key: string) => {
    if (!key) return ''
    if (key.length <= 8) return key
    return key.substring(0, 4) + '...' + key.substring(key.length - 4)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Third-Party Integration Management</h1>
          <p className="text-gray-600 mt-1">Manage all external service integrations, API keys, and connection settings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </button>
          <button 
            onClick={() => setShowAddIntegrationModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Integration
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Integrations',
            value: integrations.length,
            icon: Puzzle,
            color: 'bg-blue-500',
            description: 'Connected services'
          },
          {
            title: 'Active Integrations',
            value: integrations.filter(i => i.status === 'active').length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Currently operational'
          },
          {
            title: 'API Calls (24h)',
            value: '24,567',
            icon: Zap,
            color: 'bg-purple-500',
            description: 'External service calls'
          },
          {
            title: 'Error Rate',
            value: '0.08%',
            icon: AlertTriangle,
            color: 'bg-orange-500',
            description: 'Failed API calls'
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
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'integrations', label: 'Integrations', icon: Puzzle },
            { id: 'logs', label: 'Activity Logs', icon: FileText },
            { id: 'settings', label: 'Settings', icon: Settings }
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
          {/* Integration Status Overview */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Integration Status Overview</h3>
            
            <div className="space-y-4">
              {integrations.map((integration) => (
                <div key={integration.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-gray-100">
                      {getTypeIcon(integration.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{integration.name}</h4>
                      <p className="text-sm text-gray-500">{integration.provider}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(integration.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                        {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedIntegration(integration)
                        setShowIntegrationDetailModal(true)
                      }}
                      className="text-primary-600 hover:text-primary-900"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>
            
            <div className="space-y-4">
              {integrationLogs.slice(0, 5).map((log) => {
                const integration = integrations.find(i => i.id === log.integrationId)
                return (
                  <div key={log.id} className="p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getLogStatusIcon(log.status)}
                        <span className="text-sm font-medium text-gray-900">{log.event}</span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 mb-1">{log.details}</p>
                    <p className="text-xs text-gray-500">{integration?.name || 'Unknown integration'}</p>
                  </div>
                )
              })}
              
              <button 
                onClick={() => setActiveTab('logs')}
                className="w-full text-primary-600 text-sm font-medium hover:text-primary-700 mt-2"
              >
                View All Logs →
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search integrations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Types</option>
                  <option value="payment">Payment</option>
                  <option value="identity">Identity</option>
                  <option value="communication">Communication</option>
                  <option value="storage">Storage</option>
                  <option value="analytics">Analytics</option>
                  <option value="other">Other</option>
                </select>
                
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
                
                <select 
                  value={selectedEnvironment}
                  onChange={(e) => setSelectedEnvironment(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Environments</option>
                  <option value="production">Production</option>
                  <option value="staging">Staging</option>
                  <option value="development">Development</option>
                </select>
                
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Integrations Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Integration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Environment
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Usage
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredIntegrations.map((integration) => (
                    <tr key={integration.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="p-2 rounded-lg bg-gray-100 mr-3">
                            {getTypeIcon(integration.type)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{integration.name}</div>
                            <div className="text-xs text-gray-500">{integration.provider}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(integration.type)}`}>
                          {integration.type.charAt(0).toUpperCase() + integration.type.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                        {integration.environment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(integration.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(integration.status)}`}>
                            {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-3 w-24">
                            <div 
                              className="h-2 rounded-full bg-primary-600"
                              style={{ width: `${Math.min((integration.usageCount / integration.usageLimit) * 100, 100)}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">
                            {integration.usageLimit ? `${Math.round((integration.usageCount / integration.usageLimit) * 100)}%` : 'N/A'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(integration.updatedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedIntegration(integration)
                              setShowIntegrationDetailModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedIntegration(integration)
                              setShowEditIntegrationModal(true)
                            }}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedIntegration(integration)
                              setShowDeleteModal(true)
                            }}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
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
            
            {filteredIntegrations.length === 0 && (
              <div className="text-center py-12">
                <Puzzle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No integrations found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Integrations</option>
                  {integrations.map(integration => (
                    <option key={integration.id} value={integration.id}>{integration.name}</option>
                  ))}
                </select>
                
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Events</option>
                  <option>API Key Rotation</option>
                  <option>Webhook Received</option>
                  <option>Configuration Update</option>
                  <option>Authentication</option>
                  <option>Data Sync</option>
                </select>
                
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Status</option>
                  <option>Success</option>
                  <option>Error</option>
                  <option>Warning</option>
                  <option>Info</option>
                </select>
                
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date Range
                </button>
              </div>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Timestamp
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Integration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User/IP
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredLogs.map((log) => {
                    const integration = integrations.find(i => i.id === log.integrationId)
                    return (
                      <tr key={log.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{integration?.name || 'Unknown'}</div>
                          <div className="text-xs text-gray-500">{integration?.provider || 'Unknown'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {log.event}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getLogStatusIcon(log.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLogStatusColor(log.status)}`}>
                              {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {log.details}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {log.userId ? log.userId : log.ipAddress}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* Global Integration Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Global Integration Settings</h3>
            
            <div className="space-y-6">
              {/* Security Settings */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Security Settings</h4>
                <div className="space-y-4">
                  {[
                    { name: 'API Key Rotation Period (days)', value: 90, type: 'number' },
                    { name: 'Enforce SSL for All Integrations', value: true, type: 'toggle' },
                    { name: 'IP Whitelisting', value: true, type: 'toggle' },
                    { name: 'Webhook Signature Verification', value: true, type: 'toggle' }
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
                          defaultValue={setting.value as string | number}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Monitoring Settings */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Monitoring Settings</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Health Check Interval (minutes)', value: 15, type: 'number' },
                    { name: 'Alert on Integration Failure', value: true, type: 'toggle' },
                    { name: 'Log All API Calls', value: true, type: 'toggle' },
                    { name: 'Retention Period (days)', value: 90, type: 'number' }
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
                          defaultValue={setting.value as string | number}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Default Integration Settings */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-4">Default Integration Settings</h4>
                <div className="space-y-4">
                  {[
                    { name: 'Default Environment', value: 'production', type: 'select', options: ['production', 'staging', 'development'] },
                    { name: 'Auto-Enable New Integrations', value: false, type: 'toggle' },
                    { name: 'Require Admin Approval', value: true, type: 'toggle' }
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
                      ) : setting.type === 'select' ? (
                        <select 
                          defaultValue={setting.value as string}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        >
                          {setting.options?.map(option => (
                            <option key={option} value={option}>{option.charAt(0).toUpperCase() + option.slice(1)}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={setting.type}
                          defaultValue={setting.value as string | number}
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

          {/* Webhook Endpoints */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Endpoints</h3>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Endpoint
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  name: 'Payment Notifications',
                  url: 'https://api.idcertify.com/webhooks/payments',
                  events: ['payment.success', 'payment.failed'],
                  status: 'active'
                },
                {
                  name: 'Identity Verification Updates',
                  url: 'https://api.idcertify.com/webhooks/identity',
                  events: ['identity.verified', 'identity.failed'],
                  status: 'active'
                },
                {
                  name: 'Storage Events',
                  url: 'https://api.idcertify.com/webhooks/storage',
                  events: ['storage.upload.success', 'storage.upload.failed'],
                  status: 'inactive'
                }
              ].map((webhook, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <Webhook className="w-5 h-5 text-gray-600" />
                      <h4 className="font-medium text-gray-900">{webhook.name}</h4>
                    </div>
                    <div className="flex items-center space-x-2">
                      {webhook.status === 'active' ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-gray-500" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        webhook.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {webhook.status.charAt(0).toUpperCase() + webhook.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 font-mono mb-3">{webhook.url}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {webhook.events.map((event, eventIndex) => (
                      <span key={eventIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {event}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                      Test
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Integration Detail Modal */}
      {showIntegrationDetailModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Integration Details</h2>
                <button 
                  onClick={() => setShowIntegrationDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Integration Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-lg bg-gray-100">
                    {getTypeIcon(selectedIntegration.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedIntegration.name}</h3>
                    <p className="text-gray-600">{selectedIntegration.provider}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(selectedIntegration.type)}`}>
                        {selectedIntegration.type.charAt(0).toUpperCase() + selectedIntegration.type.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedIntegration.status)}`}>
                        {selectedIntegration.status.charAt(0).toUpperCase() + selectedIntegration.status.slice(1)}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 capitalize">
                        {selectedIntegration.environment}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Created</p>
                    <p className="font-medium text-gray-900">{new Date(selectedIntegration.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">{new Date(selectedIntegration.updatedAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Synced</p>
                    <p className="font-medium text-gray-900">
                      {selectedIntegration.lastSynced ? new Date(selectedIntegration.lastSynced).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              {/* API Keys */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">API Keys</h3>
                  <button 
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
                  >
                    {showApiKeys ? (
                      <>
                        <EyeOff className="w-4 h-4 mr-2" />
                        Hide Keys
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 mr-2" />
                        Show Keys
                      </>
                    )}
                  </button>
                </div>
                
                <div className="space-y-4">
                  {selectedIntegration.apiKey && (
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">API Key</p>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-600 hover:text-gray-800">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            Rotate
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                        {showApiKeys ? selectedIntegration.apiKey : maskApiKey(selectedIntegration.apiKey)}
                      </p>
                    </div>
                  )}
                  
                  {selectedIntegration.secretKey && (
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-gray-900">Secret Key</p>
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-600 hover:text-gray-800">
                            <Copy className="w-4 h-4" />
                          </button>
                          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                            Rotate
                          </button>
                        </div>
                      </div>
                      <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                        {showApiKeys ? selectedIntegration.secretKey : maskApiKey(selectedIntegration.secretKey)}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Webhook Configuration */}
              {selectedIntegration.webhookUrl && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Webhook Configuration</h3>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">Webhook URL</p>
                      <div className="flex items-center space-x-2">
                        <button className="text-gray-600 hover:text-gray-800">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                          Test
                        </button>
                      </div>
                    </div>
                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">
                      {selectedIntegration.webhookUrl}
                    </p>
                  </div>
                </div>
              )}

              {/* Configuration */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Configuration</h3>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
                    {JSON.stringify(selectedIntegration.config, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Recent Logs */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-gray-900">Recent Activity</h3>
                  <button 
                    onClick={() => {
                      setActiveTab('logs')
                      setShowIntegrationDetailModal(false)
                    }}
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                  >
                    View All Logs →
                  </button>
                </div>
                
                <div className="space-y-3">
                  {integrationLogs
                    .filter(log => log.integrationId === selectedIntegration.id)
                    .slice(0, 3)
                    .map((log) => (
                      <div key={log.id} className="p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            {getLogStatusIcon(log.status)}
                            <span className="text-sm font-medium text-gray-900">{log.event}</span>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(log.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{log.details}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowIntegrationDetailModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleTestIntegration(selectedIntegration.id)}
                  disabled={loading}
                  className="border border-primary-600 text-primary-600 px-4 py-2 rounded-lg font-medium hover:bg-primary-50 transition-colors flex items-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                  ) : (
                    <RefreshCw className="w-4 h-4 mr-2" />
                  )}
                  Test Connection
                </button>
                <button 
                  onClick={() => {
                    setShowIntegrationDetailModal(false)
                    setShowEditIntegrationModal(true)
                  }}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Integration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Integration Modal */}
      {showAddIntegrationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Integration</h2>
                <button 
                  onClick={() => setShowAddIntegrationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Integration Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Stripe Payment Gateway"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Stripe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Select Type</option>
                      <option value="payment">Payment</option>
                      <option value="identity">Identity</option>
                      <option value="communication">Communication</option>
                      <option value="storage">Storage</option>
                      <option value="analytics">Analytics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Environment *
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Describe the purpose and functionality of this integration"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* API Credentials */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">API Credentials</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter API key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secret Key
                    </label>
                    <input
                      type="password"
                      placeholder="Enter secret key"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Webhook Configuration */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Webhook Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      placeholder="e.g., https://api.idcertify.com/webhooks/stripe"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook Secret
                    </label>
                    <input
                      type="password"
                      placeholder="Enter webhook secret"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Configuration */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Additional Configuration</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Configuration JSON
                  </label>
                  <textarea
                    rows={5}
                    placeholder='{"key": "value", "nested": {"key": "value"}}'
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter configuration as valid JSON. This will vary based on the integration type.
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddIntegrationModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddIntegration}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add Integration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Integration Modal */}
      {showEditIntegrationModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Integration</h2>
                <button 
                  onClick={() => {
                    setShowEditIntegrationModal(false)
                    setSelectedIntegration(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="font-medium text-gray-900 mb-4">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Integration Name *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedIntegration.name}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Provider *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedIntegration.provider}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select 
                      defaultValue={selectedIntegration.type}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="payment">Payment</option>
                      <option value="identity">Identity</option>
                      <option value="communication">Communication</option>
                      <option value="storage">Storage</option>
                      <option value="analytics">Analytics</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status *
                    </label>
                    <select 
                      defaultValue={selectedIntegration.status}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="pending">Pending</option>
                      <option value="failed">Failed</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Environment *
                    </label>
                    <select 
                      defaultValue={selectedIntegration.environment}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="production">Production</option>
                      <option value="staging">Staging</option>
                      <option value="development">Development</option>
                    </select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      defaultValue={selectedIntegration.description}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* API Credentials */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">API Credentials</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      API Key *
                    </label>
                    <input
                      type="text"
                      defaultValue={selectedIntegration.apiKey}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Secret Key
                    </label>
                    <input
                      type="password"
                      defaultValue={selectedIntegration.secretKey}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Webhook Configuration */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Webhook Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Webhook URL
                    </label>
                    <input
                      type="url"
                      defaultValue={selectedIntegration.webhookUrl}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Configuration */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium text-gray-900 mb-4">Additional Configuration</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Configuration JSON
                  </label>
                  <textarea
                    rows={5}
                    defaultValue={JSON.stringify(selectedIntegration.config, null, 2)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => {
                    setShowEditIntegrationModal(false)
                    setSelectedIntegration(null)
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditIntegration}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedIntegration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Confirm Deletion</h2>
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium text-red-800">Warning: This action cannot be undone</p>
                  <p className="text-sm text-red-700 mt-1">
                    Deleting this integration will remove all associated configurations, API keys, and access. Any services relying on this integration will cease to function.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700">
                Are you sure you want to delete the integration <span className="font-medium">{selectedIntegration.name}</span>?
              </p>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteIntegration}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  Delete Integration
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Information Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <Info className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">About Third-Party Integrations</h3>
            <p className="text-blue-700 mb-4">
              This dashboard allows you to manage all external service integrations used by the IDCertify platform.
              Properly configured integrations are essential for features like payments, identity verification, communications, and data storage.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Key className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">API Key Security</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Regularly rotate API keys and keep them secure
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Webhook className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Webhook Reliability</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Monitor webhook deliveries and implement retries
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <FileCode className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Documentation</h4>
                </div>
                <p className="text-sm text-gray-600">
                  <a href="#" className="text-blue-600 hover:text-blue-700">View integration guides</a> for each service
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminIntegrationManagement