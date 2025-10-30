import React, { useState } from 'react'
import { 
  Key, 
  Plus, 
  Copy, 
  Eye, 
  EyeOff, 
  Trash2, 
  Edit,
  RefreshCw,
  Calendar,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity,
  BarChart3,
  Settings,
  Code,
  ExternalLink,
  Download,
  Upload,
  Search,
  Filter,
  MoreHorizontal,
  X,
  Save,
  Globe,
  Lock,
  Unlock,
  Info,
  HelpCircle,
  Zap,
  Target,
  TrendingUp,
  Database,
  Server,
  Monitor,
  Bell
} from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  environment: 'production' | 'development' | 'staging'
  status: 'active' | 'inactive' | 'expired' | 'revoked'
  createdAt: string
  lastUsed?: string
  expiresAt?: string
  usage: {
    totalCalls: number
    monthlyLimit: number
    lastCall?: string
  }
  ipWhitelist: string[]
  description?: string
}

interface ApiUsage {
  date: string
  calls: number
  errors: number
  latency: number
}

const ApiKeys = () => {
  const [activeTab, setActiveTab] = useState<'keys' | 'usage' | 'docs' | 'webhooks'>('keys')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedEnvironment, setSelectedEnvironment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedApiKey, setSelectedApiKey] = useState<ApiKey | null>(null)
  const [showKeys, setShowKeys] = useState<{ [key: string]: boolean }>({})
  const [loading, setLoading] = useState(false)

  const [newApiKey, setNewApiKey] = useState({
    name: '',
    environment: 'development' as 'production' | 'development' | 'staging',
    permissions: [] as string[],
    expiresAt: '',
    ipWhitelist: '',
    description: ''
  })

  // Mock API keys data
  const apiKeys: ApiKey[] = [
    {
      id: '1',
      name: 'Production API Key',
      key: 'idc_live_sk_1234567890abcdef1234567890abcdef',
      permissions: ['read', 'write', 'verify', 'upload'],
      environment: 'production',
      status: 'active',
      createdAt: '2024-01-15T10:00:00Z',
      lastUsed: '2024-01-20T14:30:00Z',
      expiresAt: '2024-12-31T23:59:59Z',
      usage: {
        totalCalls: 15420,
        monthlyLimit: 50000,
        lastCall: '2024-01-20T14:30:00Z'
      },
      ipWhitelist: ['192.168.1.100', '10.0.0.50'],
      description: 'Main production API key for verification services'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'idc_test_sk_abcdef1234567890abcdef1234567890',
      permissions: ['read', 'write', 'verify'],
      environment: 'development',
      status: 'active',
      createdAt: '2024-01-10T09:00:00Z',
      lastUsed: '2024-01-19T16:45:00Z',
      usage: {
        totalCalls: 2847,
        monthlyLimit: 10000,
        lastCall: '2024-01-19T16:45:00Z'
      },
      ipWhitelist: [],
      description: 'Development and testing API key'
    },
    {
      id: '3',
      name: 'Webhook API Key',
      key: 'idc_live_wh_fedcba0987654321fedcba0987654321',
      permissions: ['webhook'],
      environment: 'production',
      status: 'active',
      createdAt: '2024-01-08T11:20:00Z',
      lastUsed: '2024-01-20T12:15:00Z',
      usage: {
        totalCalls: 892,
        monthlyLimit: 5000,
        lastCall: '2024-01-20T12:15:00Z'
      },
      ipWhitelist: ['webhook.company.com'],
      description: 'Dedicated webhook endpoint API key'
    },
    {
      id: '4',
      name: 'Legacy API Key',
      key: 'idc_live_sk_legacy123456789legacy123456789',
      permissions: ['read'],
      environment: 'production',
      status: 'inactive',
      createdAt: '2023-06-01T00:00:00Z',
      lastUsed: '2023-12-15T10:30:00Z',
      expiresAt: '2024-06-01T00:00:00Z',
      usage: {
        totalCalls: 45230,
        monthlyLimit: 25000,
        lastCall: '2023-12-15T10:30:00Z'
      },
      ipWhitelist: [],
      description: 'Legacy API key - scheduled for deprecation'
    }
  ]

  // Mock usage data
  const usageData: ApiUsage[] = [
    { date: '2024-01-15', calls: 1250, errors: 12, latency: 145 },
    { date: '2024-01-16', calls: 1380, errors: 8, latency: 132 },
    { date: '2024-01-17', calls: 1420, errors: 15, latency: 158 },
    { date: '2024-01-18', calls: 1180, errors: 6, latency: 128 },
    { date: '2024-01-19', calls: 1650, errors: 22, latency: 167 },
    { date: '2024-01-20', calls: 1890, errors: 18, latency: 142 }
  ]

  const permissions = [
    { id: 'read', label: 'Read', description: 'View verification data and reports' },
    { id: 'write', label: 'Write', description: 'Create and update verification requests' },
    { id: 'verify', label: 'Verify', description: 'Perform identity and document verification' },
    { id: 'upload', label: 'Upload', description: 'Upload documents and files' },
    { id: 'webhook', label: 'Webhook', description: 'Receive webhook notifications' },
    { id: 'admin', label: 'Admin', description: 'Administrative operations' }
  ]

  const environments = ['production', 'development', 'staging']
  const statuses = ['active', 'inactive', 'expired', 'revoked']

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'inactive':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      case 'revoked':
        return <X className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-orange-100 text-orange-800'
      case 'revoked':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getEnvironmentColor = (environment: string) => {
    switch (environment) {
      case 'production':
        return 'bg-red-100 text-red-800'
      case 'development':
        return 'bg-blue-100 text-blue-800'
      case 'staging':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const toggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({ ...prev, [keyId]: !prev[keyId] }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const maskApiKey = (key: string) => {
    if (key.length <= 8) return key
    return key.substring(0, 8) + '...' + key.substring(key.length - 8)
  }

  const filteredApiKeys = apiKeys.filter(key => {
    const matchesSearch = searchQuery === '' || 
      key.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      key.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesEnvironment = selectedEnvironment === 'all' || key.environment === selectedEnvironment
    const matchesStatus = selectedStatus === 'all' || key.status === selectedStatus
    
    return matchesSearch && matchesEnvironment && matchesStatus
  })

  const handleCreateApiKey = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Creating API key:', newApiKey)
      setShowCreateModal(false)
      setNewApiKey({
        name: '',
        environment: 'development',
        permissions: [],
        expiresAt: '',
        ipWhitelist: '',
        description: ''
      })
    } catch (error) {
      console.error('Error creating API key:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditApiKey = async () => {
    if (!selectedApiKey) return
    
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updating API key:', selectedApiKey)
      setShowEditModal(false)
      setSelectedApiKey(null)
    } catch (error) {
      console.error('Error updating API key:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">API Keys</h1>
          <p className="text-gray-600 mt-1">Manage API keys and integration settings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <ExternalLink className="w-4 h-4 mr-2" />
            API Documentation
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create API Key
          </button>
        </div>
      </div>

      {/* API Usage Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total API Calls',
            value: apiKeys.reduce((sum, key) => sum + key.usage.totalCalls, 0).toLocaleString(),
            icon: Activity,
            color: 'bg-blue-500',
            description: 'This month'
          },
          {
            title: 'Active Keys',
            value: apiKeys.filter(key => key.status === 'active').length,
            icon: Key,
            color: 'bg-green-500',
            description: 'Currently active'
          },
          {
            title: 'Rate Limit Usage',
            value: '68%',
            icon: Target,
            color: 'bg-yellow-500',
            description: 'Of monthly limit'
          },
          {
            title: 'Avg Response Time',
            value: '142ms',
            icon: Zap,
            color: 'bg-purple-500',
            description: 'Last 24 hours'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'keys', label: 'API Keys', icon: Key, count: apiKeys.length },
            { id: 'usage', label: 'Usage Analytics', icon: BarChart3 },
            { id: 'docs', label: 'Documentation', icon: Code },
            { id: 'webhooks', label: 'Webhooks', icon: Globe, count: 2 }
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
              {tab.count && (
                <span className="bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'keys' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search API keys..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedEnvironment}
                  onChange={(e) => setSelectedEnvironment(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Environments</option>
                  {environments.map(env => (
                    <option key={env} value={env}>
                      {env.charAt(0).toUpperCase() + env.slice(1)}
                    </option>
                  ))}
                </select>
                
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* API Keys List */}
          <div className="space-y-4">
            {filteredApiKeys.map((apiKey) => (
              <div key={apiKey.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{apiKey.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getEnvironmentColor(apiKey.environment)}`}>
                        {apiKey.environment.charAt(0).toUpperCase() + apiKey.environment.slice(1)}
                      </span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(apiKey.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(apiKey.status)}`}>
                          {apiKey.status.charAt(0).toUpperCase() + apiKey.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    
                    {apiKey.description && (
                      <p className="text-gray-600 text-sm mb-3">{apiKey.description}</p>
                    )}
                    
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <span>Created: {new Date(apiKey.createdAt).toLocaleDateString()}</span>
                      {apiKey.lastUsed && (
                        <span>Last used: {new Date(apiKey.lastUsed).toLocaleDateString()}</span>
                      )}
                      {apiKey.expiresAt && (
                        <span>Expires: {new Date(apiKey.expiresAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedApiKey(apiKey)
                        setShowEditModal(true)
                      }}
                      className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-800 border border-red-300 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* API Key Display */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Key className="w-5 h-5 text-gray-600" />
                      <code className="text-sm font-mono text-gray-900">
                        {showKeys[apiKey.id] ? apiKey.key : maskApiKey(apiKey.key)}
                      </code>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        {showKeys[apiKey.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(apiKey.key)}
                        className="p-2 text-gray-600 hover:text-gray-800"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Permissions and Usage */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Permissions</h4>
                    <div className="flex flex-wrap gap-2">
                      {apiKey.permissions.map((permission, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Usage This Month</h4>
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-600">API Calls</span>
                          <span className="font-medium">{apiKey.usage.totalCalls.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((apiKey.usage.totalCalls / apiKey.usage.monthlyLimit) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Limit: {apiKey.usage.monthlyLimit.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* IP Whitelist */}
                {apiKey.ipWhitelist.length > 0 && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium text-gray-900 mb-2">IP Whitelist</h4>
                    <div className="flex flex-wrap gap-2">
                      {apiKey.ipWhitelist.map((ip, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded font-mono">
                          {ip}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'usage' && (
        <div className="space-y-6">
          {/* Usage Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">API Usage Trends</h3>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between space-x-2">
              {usageData.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-primary-500 rounded-t transition-all duration-500 hover:bg-primary-600"
                    style={{ height: `${(data.calls / 2000) * 200}px` }}
                    title={`${data.date}: ${data.calls} calls`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">
                    {new Date(data.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Response Times</h4>
              <div className="space-y-3">
                {usageData.slice(-3).map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{new Date(data.date).toLocaleDateString()}</span>
                    <span className="text-sm font-medium text-gray-900">{data.latency}ms</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Error Rates</h4>
              <div className="space-y-3">
                {usageData.slice(-3).map((data, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{new Date(data.date).toLocaleDateString()}</span>
                    <span className="text-sm font-medium text-gray-900">
                      {((data.errors / data.calls) * 100).toFixed(2)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Top Endpoints</h4>
              <div className="space-y-3">
                {[
                  { endpoint: '/api/v1/verify', calls: 4520 },
                  { endpoint: '/api/v1/upload', calls: 2340 },
                  { endpoint: '/api/v1/status', calls: 1890 }
                ].map((endpoint, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 font-mono">{endpoint.endpoint}</span>
                    <span className="text-sm font-medium text-gray-900">{endpoint.calls.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'docs' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">API Documentation</h3>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Info className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Getting Started</p>
                  <p className="text-sm text-blue-700 mt-1">
                    Our API allows you to integrate identity verification services directly into your application.
                  </p>
                  <a 
                    href="#" 
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium mt-2 inline-block"
                  >
                    View Full Documentation →
                  </a>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="w-6 h-6 text-primary-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Verification API</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Verify identities, documents, and credentials through our secure API endpoints.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">POST /api/v1/verify</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">GET /api/v1/verification/:id</span>
                  </div>
                </div>
                <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Documentation →
                </button>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Upload className="w-6 h-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-gray-900">Document API</h4>
                </div>
                <p className="text-gray-600 mb-4">
                  Upload, manage, and verify documents through our secure document handling API.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">POST /api/v1/documents</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Code className="w-4 h-4 text-gray-600" />
                    <span className="text-sm text-gray-700">GET /api/v1/documents/:id</span>
                  </div>
                </div>
                <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View Documentation →
                </button>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-900 mb-4">Code Examples</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">JavaScript/Node.js</h5>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                    {`const axios = require('axios');

const verifyIdentity = async (data) => {
  const response = await axios.post(
    'https://api.idcertify.com/v1/verify',
    data,
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    }
  );
  
  return response.data;
};`}
                  </pre>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">Python</h5>
                    <button className="text-gray-600 hover:text-gray-800">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <pre className="bg-gray-800 text-gray-100 p-4 rounded-lg text-sm font-mono overflow-x-auto">
                    {`import requests

def verify_identity(data):
    headers = {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    }
    
    response = requests.post(
        'https://api.idcertify.com/v1/verify',
        json=data,
        headers=headers
    )
    
    return response.json()`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'webhooks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Webhook Endpoints</h3>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Webhook
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  name: 'Verification Webhook',
                  url: 'https://webhook.company.com/verification',
                  events: ['verification.completed', 'verification.failed'],
                  status: 'active',
                  lastTriggered: '2024-01-20T14:30:00Z',
                  successRate: 98.5
                },
                {
                  name: 'Document Webhook',
                  url: 'https://webhook.company.com/documents',
                  events: ['document.uploaded', 'document.verified'],
                  status: 'active',
                  lastTriggered: '2024-01-19T16:45:00Z',
                  successRate: 100
                }
              ].map((webhook, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">{webhook.name}</h4>
                      <p className="text-sm text-gray-600 font-mono mb-3">{webhook.url}</p>
                      <div className="flex flex-wrap gap-2">
                        {webhook.events.map((event, eventIndex) => (
                          <span key={eventIndex} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                            {event}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(webhook.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(webhook.status)}`}>
                          {webhook.status.charAt(0).toUpperCase() + webhook.status.slice(1)}
                        </span>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">
                      Last triggered: {new Date(webhook.lastTriggered).toLocaleString()}
                    </span>
                    <span className="font-medium text-green-600">
                      {webhook.successRate}% success rate
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-3 mt-4 pt-4 border-t">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
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
          
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <div className="flex items-start space-x-4">
              <Info className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">About Webhooks</h3>
                <p className="text-blue-800 mb-4">
                  Webhooks allow your application to receive real-time notifications when events occur in your IDCertify account.
                  Configure webhook endpoints to receive notifications for verification completions, document uploads, and more.
                </p>
                
                <div className="flex items-center space-x-4">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Webhook Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create API Key Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New API Key</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key Name *</label>
                <input
                  type="text"
                  value={newApiKey.name}
                  onChange={(e) => setNewApiKey(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., Production API Key"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Environment *</label>
                <select
                  value={newApiKey.environment}
                  onChange={(e) => setNewApiKey(prev => ({ ...prev, environment: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {environments.map(env => (
                    <option key={env} value={env}>
                      {env.charAt(0).toUpperCase() + env.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Permissions *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissions.map(permission => (
                    <label key={permission.id} className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={newApiKey.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewApiKey(prev => ({
                              ...prev,
                              permissions: [...prev.permissions, permission.id]
                            }))
                          } else {
                            setNewApiKey(prev => ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission.id)
                            }))
                          }
                        }}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{permission.label}</div>
                        <div className="text-sm text-gray-600">{permission.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                <input
                  type="date"
                  value={newApiKey.expiresAt}
                  onChange={(e) => setNewApiKey(prev => ({ ...prev, expiresAt: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">Leave blank for no expiration</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist</label>
                <input
                  type="text"
                  value={newApiKey.ipWhitelist}
                  onChange={(e) => setNewApiKey(prev => ({ ...prev, ipWhitelist: e.target.value }))}
                  placeholder="e.g., 192.168.1.1, 10.0.0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated list of IPs. Leave blank to allow all IPs.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newApiKey.description}
                  onChange={(e) => setNewApiKey(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Optional description for this API key"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateApiKey}
                  disabled={loading || !newApiKey.name || newApiKey.permissions.length === 0}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Key className="w-4 h-4 mr-2" />
                  )}
                  Create API Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit API Key Modal */}
      {showEditModal && selectedApiKey && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit API Key</h2>
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Key Name *</label>
                <input
                  type="text"
                  value={selectedApiKey.name}
                  onChange={(e) => setSelectedApiKey(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={selectedApiKey.status}
                  onChange={(e) => setSelectedApiKey(prev => prev ? ({ ...prev, status: e.target.value as any }) : null)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {statuses.map(status => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {permissions.map(permission => (
                    <label key={permission.id} className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={selectedApiKey.permissions.includes(permission.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedApiKey(prev => prev ? ({
                              ...prev,
                              permissions: [...prev.permissions, permission.id]
                            }) : null)
                          } else {
                            setSelectedApiKey(prev => prev ? ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission.id)
                            }) : null)
                          }
                        }}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{permission.label}</div>
                        <div className="text-sm text-gray-600">{permission.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">IP Whitelist</label>
                <input
                  type="text"
                  value={selectedApiKey.ipWhitelist.join(', ')}
                  onChange={(e) => setSelectedApiKey(prev => prev ? ({
                    ...prev,
                    ipWhitelist: e.target.value.split(',').map(ip => ip.trim()).filter(Boolean)
                  }) : null)}
                  placeholder="e.g., 192.168.1.1, 10.0.0.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <p className="text-xs text-gray-500 mt-1">Comma-separated list of IPs. Leave blank to allow all IPs.</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={selectedApiKey.description || ''}
                  onChange={(e) => setSelectedApiKey(prev => prev ? ({ ...prev, description: e.target.value }) : null)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowEditModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditApiKey}
                  disabled={loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
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

export default ApiKeys