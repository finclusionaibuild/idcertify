import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Upload,
  ExternalLink,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  Building,
  GraduationCap,
  MapPin,
  UserCheck,
  Award,
  CreditCard,
  Send,
  RefreshCw,
  Bell,
  Info,
  X,
  AlertCircle,
  Target,
  Zap,
  Globe,
  Phone,
  Mail
} from 'lucide-react'

interface VerificationRequest {
  id: string
  requestId: string
  fullName: string
  email: string
  phone?: string
  verificationTypes: string[]
  status: 'pending' | 'in_progress' | 'verified' | 'failed' | 'cancelled'
  requestedDate: string
  completedDate?: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
  notes?: string
  progress: number
}

const VerificationCenter = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'requests' | 'new'>('overview')
  const [selectedVerificationType, setSelectedVerificationType] = useState('identity')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<VerificationRequest | null>(null)
  const [newRequestData, setNewRequestData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nin: '',
    selectedTypes: {
      identity: true,
      employment: false,
      education: false,
      address: false,
      guarantor: false,
      document: false,
      certificate: false,
      collateral: false
    },
    priority: 'normal' as 'low' | 'normal' | 'high' | 'urgent',
    notes: ''
  })

  // Mock data for verification requests
  const verificationRequests: VerificationRequest[] = [
    {
      id: '1',
      requestId: 'VER-001234',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+234-801-234-5678',
      verificationTypes: ['Identity', 'Employment'],
      status: 'verified',
      requestedDate: '2024-01-20',
      completedDate: '2024-01-22',
      priority: 'normal',
      progress: 100
    },
    {
      id: '2',
      requestId: 'VER-001235',
      fullName: 'Jane Smith',
      email: 'jane.smith@company.com',
      phone: '+234-801-234-5679',
      verificationTypes: ['Identity', 'Education', 'Address'],
      status: 'in_progress',
      requestedDate: '2024-01-21',
      priority: 'high',
      progress: 65
    },
    {
      id: '3',
      requestId: 'VER-001236',
      fullName: 'Michael Johnson',
      email: 'michael.j@email.com',
      verificationTypes: ['Identity', 'Employment', 'Guarantor'],
      status: 'pending',
      requestedDate: '2024-01-22',
      priority: 'urgent',
      progress: 0
    },
    {
      id: '4',
      requestId: 'VER-001237',
      fullName: 'Sarah Wilson',
      email: 'sarah.wilson@corp.com',
      phone: '+234-801-234-5680',
      verificationTypes: ['Document', 'Certificate'],
      status: 'failed',
      requestedDate: '2024-01-18',
      priority: 'normal',
      progress: 0,
      notes: 'Document quality insufficient'
    },
    {
      id: '5',
      requestId: 'VER-001238',
      fullName: 'David Brown',
      email: 'david.brown@example.com',
      verificationTypes: ['Identity', 'Address'],
      status: 'in_progress',
      requestedDate: '2024-01-19',
      priority: 'low',
      progress: 30
    }
  ]

  // Verification type options
  const verificationTypes = [
    {
      id: 'identity',
      title: 'Identity Verification',
      description: 'Verify government-issued ID documents and biometric data',
      icon: Shield,
      color: 'bg-blue-500',
      estimatedTime: '2-4 hours',
      cost: '₦500'
    },
    {
      id: 'employment',
      title: 'Employment History',
      description: 'Verify current and previous employment records',
      icon: Building,
      color: 'bg-green-500',
      estimatedTime: '1-2 days',
      cost: '₦750'
    },
    {
      id: 'education',
      title: 'Education Credentials',
      description: 'Verify academic qualifications and certificates',
      icon: GraduationCap,
      color: 'bg-purple-500',
      estimatedTime: '2-3 days',
      cost: '₦600'
    },
    {
      id: 'address',
      title: 'Address Verification',
      description: 'Verify residential or business address',
      icon: MapPin,
      color: 'bg-orange-500',
      estimatedTime: '1-2 days',
      cost: '₦400'
    },
    {
      id: 'guarantor',
      title: 'Guarantor Verification',
      description: 'Verify guarantor information and references',
      icon: UserCheck,
      color: 'bg-pink-500',
      estimatedTime: '2-4 days',
      cost: '₦800'
    },
    {
      id: 'document',
      title: 'Document Authenticity',
      description: 'Verify authenticity of uploaded documents',
      icon: FileText,
      color: 'bg-indigo-500',
      estimatedTime: '1-3 hours',
      cost: '₦300'
    },
    {
      id: 'certificate',
      title: 'Certificate/License Verification',
      description: 'Verify professional certificates and licenses',
      icon: Award,
      color: 'bg-yellow-500',
      estimatedTime: '1-2 days',
      cost: '₦650'
    },
    {
      id: 'collateral',
      title: 'Collateral Document Check',
      description: 'Verify supporting documents and references',
      icon: CreditCard,
      color: 'bg-gray-500',
      estimatedTime: '1-2 days',
      cost: '₦450'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'normal':
        return 'bg-blue-100 text-blue-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRequests = verificationRequests.filter(request => {
    const matchesSearch = searchQuery === '' || 
      request.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleNewRequest = () => {
    // Simulate creating new verification request
    console.log('Creating new verification request:', newRequestData)
    setShowNewRequestModal(false)
    setActiveTab('requests')
    // Reset form
    setNewRequestData({
      fullName: '',
      email: '',
      phone: '',
      nin: '',
      selectedTypes: {
        identity: true,
        employment: false,
        education: false,
        address: false,
        guarantor: false,
        document: false,
        certificate: false,
        collateral: false
      },
      priority: 'normal',
      notes: ''
    })
  }

  const selectedVerificationTypeData = verificationTypes.find(type => type.id === selectedVerificationType)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Center</h1>
          <p className="text-gray-600 mt-1">Verify identities, documents, histories, and credentials</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/organisation/bulk-upload" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Link>
          <button 
            onClick={() => setShowNewRequestModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Verification
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Requests',
            value: verificationRequests.length,
            icon: FileText,
            color: 'bg-blue-500',
            description: 'All verification requests'
          },
          {
            title: 'In Progress',
            value: verificationRequests.filter(r => r.status === 'in_progress').length,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Currently processing'
          },
          {
            title: 'Completed',
            value: verificationRequests.filter(r => r.status === 'verified').length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Successfully verified'
          },
          {
            title: 'Pending Action',
            value: verificationRequests.filter(r => r.status === 'pending').length,
            icon: AlertCircle,
            color: 'bg-orange-500',
            description: 'Awaiting response'
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
            { id: 'overview', label: 'Overview', icon: Target },
            { id: 'requests', label: 'All Requests', icon: FileText, count: verificationRequests.length },
            { id: 'new', label: 'Start New Verification', icon: Plus }
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
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Verification Options Grid */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Verification Types</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {verificationTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedVerificationType(type.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all hover:shadow-md ${
                      selectedVerificationType === type.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`${type.color} rounded-lg p-2`}>
                        <type.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{type.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{type.description}</p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>{type.estimatedTime}</span>
                          <span className="font-medium text-primary-600">{type.cost}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Selected Verification Details */}
          <div className="space-y-6">
            {selectedVerificationTypeData && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`${selectedVerificationTypeData.color} rounded-lg p-3`}>
                    <selectedVerificationTypeData.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{selectedVerificationTypeData.title}</h3>
                    <p className="text-sm text-gray-600">Quick verification setup</p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Estimated Time:</span>
                    <span className="font-medium">{selectedVerificationTypeData.estimatedTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cost per verification:</span>
                    <span className="font-medium text-primary-600">{selectedVerificationTypeData.cost}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    setNewRequestData(prev => ({
                      ...prev,
                      selectedTypes: {
                        ...Object.fromEntries(Object.keys(prev.selectedTypes).map(key => [key, false])),
                        [selectedVerificationType]: true
                      }
                    }))
                    setShowNewRequestModal(true)
                  }}
                  className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Start This Verification
                </button>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button 
                  onClick={() => setShowNewRequestModal(true)}
                  className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Plus className="w-5 h-5 text-primary-600 mr-3" />
                  <span className="text-sm">Start New Verification</span>
                </button>
                <Link to="/organisation/bulk-upload" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Upload className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Bulk Upload CSV</span>
                </Link>
                <Link to="/organisation/api" className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm">API Documentation</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-6">
          {/* Search & Filter Panel */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, email, or request ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="verified">Verified</option>
                  <option value="failed">Failed</option>
                </select>
                
                <select 
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
                
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Verification Requests Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification Types
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requested Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{request.fullName}</div>
                            <div className="text-sm text-gray-500">{request.email}</div>
                            <div className="text-xs text-gray-400">{request.requestId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {request.verificationTypes.slice(0, 2).map((type, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                              {type}
                            </span>
                          ))}
                          {request.verificationTypes.length > 2 && (
                            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              +{request.verificationTypes.length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className={`h-2 rounded-full ${
                                request.status === 'verified' ? 'bg-green-500' :
                                request.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${request.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{request.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(request.requestedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => setSelectedRequest(request)}
                            className="text-primary-600 hover:text-primary-900 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
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

      {activeTab === 'new' && (
        <div className="max-w-4xl">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Start New Verification Request</h3>
            
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newRequestData.fullName}
                      onChange={(e) => setNewRequestData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newRequestData.email}
                      onChange={(e) => setNewRequestData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newRequestData.phone}
                      onChange={(e) => setNewRequestData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      National ID Number
                    </label>
                    <input
                      type="text"
                      value={newRequestData.nin}
                      onChange={(e) => setNewRequestData(prev => ({ ...prev, nin: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter NIN or other ID"
                    />
                  </div>
                </div>
              </div>

              {/* Verification Types Selection */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Select Verification Types</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {verificationTypes.map((type) => (
                    <label key={type.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newRequestData.selectedTypes[type.id as keyof typeof newRequestData.selectedTypes]}
                        onChange={(e) => setNewRequestData(prev => ({
                          ...prev,
                          selectedTypes: {
                            ...prev.selectedTypes,
                            [type.id]: e.target.checked
                          }
                        }))}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <type.icon className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">{type.title}</span>
                          <span className="text-xs text-primary-600 font-medium">{type.cost}</span>
                        </div>
                        <p className="text-sm text-gray-600">{type.description}</p>
                        <p className="text-xs text-gray-500 mt-1">Est. time: {type.estimatedTime}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Priority and Notes */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={newRequestData.priority}
                    onChange={(e) => setNewRequestData(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes/Instructions (Optional)
                  </label>
                  <textarea
                    value={newRequestData.notes}
                    onChange={(e) => setNewRequestData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Add any special instructions..."
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setActiveTab('overview')}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleNewRequest}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Verification Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Real-time Status & Alerts */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <Bell className="w-6 h-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Real-time Updates</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-sm text-gray-700">3 new verifications completed</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View Results →
                </button>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-sm text-gray-700">2 urgent requests pending action</span>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Review Now →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration CTA */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <Zap className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Want to automate verifications via API?</h3>
              <p className="text-gray-600 text-sm">Integrate our verification API to streamline your workflow</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/organisation/api" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors">
              Generate API Key
            </Link>
            <Link to="/organisation/api" className="border border-green-300 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              View API Documentation
            </Link>
          </div>
        </div>
      </div>

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">New Verification Request</h2>
                <button 
                  onClick={() => setShowNewRequestModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Same form content as the 'new' tab */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Personal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newRequestData.fullName}
                      onChange={(e) => setNewRequestData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newRequestData.email}
                      onChange={(e) => setNewRequestData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newRequestData.phone}
                      onChange={(e) => setNewRequestData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      National ID Number
                    </label>
                    <input
                      type="text"
                      value={newRequestData.nin}
                      onChange={(e) => setNewRequestData(prev => ({ ...prev, nin: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter NIN or other ID"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Select Verification Types</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {verificationTypes.map((type) => (
                    <label key={type.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newRequestData.selectedTypes[type.id as keyof typeof newRequestData.selectedTypes]}
                        onChange={(e) => setNewRequestData(prev => ({
                          ...prev,
                          selectedTypes: {
                            ...prev.selectedTypes,
                            [type.id]: e.target.checked
                          }
                        }))}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <type.icon className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">{type.title}</span>
                          <span className="text-xs text-primary-600 font-medium">{type.cost}</span>
                        </div>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Priority Level
                  </label>
                  <select
                    value={newRequestData.priority}
                    onChange={(e) => setNewRequestData(prev => ({ ...prev, priority: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="low">Low</option>
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes/Instructions (Optional)
                  </label>
                  <textarea
                    value={newRequestData.notes}
                    onChange={(e) => setNewRequestData(prev => ({ ...prev, notes: e.target.value }))}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Add any special instructions..."
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowNewRequestModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleNewRequest}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Submit Verification Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Request Details Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Verification Request Details</h2>
                <button 
                  onClick={() => setSelectedRequest(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Request Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedRequest.fullName}</h3>
                    <p className="text-gray-600">{selectedRequest.email}</p>
                    <p className="text-gray-600">{selectedRequest.requestId}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRequest.status)}`}>
                        {selectedRequest.status.replace('_', ' ').charAt(0).toUpperCase() + selectedRequest.status.replace('_', ' ').slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedRequest.priority)}`}>
                        {selectedRequest.priority.charAt(0).toUpperCase() + selectedRequest.priority.slice(1)} Priority
                      </span>
                      <span className="text-sm text-gray-600">
                        Progress: {selectedRequest.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Types Status */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Verification Status</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedRequest.verificationTypes.map((type, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{type}</h5>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(selectedRequest.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRequest.status)}`}>
                            {selectedRequest.status.charAt(0).toUpperCase() + selectedRequest.status.slice(1)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600">
                        Requested: {new Date(selectedRequest.requestedDate).toLocaleDateString()}
                      </p>
                      {selectedRequest.completedDate && (
                        <p className="text-sm text-gray-600">
                          Completed: {new Date(selectedRequest.completedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {selectedRequest.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Notes</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedRequest.notes}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Result
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Re-request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationCenter