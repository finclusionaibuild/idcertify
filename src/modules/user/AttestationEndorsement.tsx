import React, { useState } from 'react'
import { 
  UserCheck, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  Star,
  Award,
  Shield,
  ChevronRight,
  MoreHorizontal,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Download,
  Send,
  FileText,
  ExternalLink,
  HelpCircle,
  Info,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface AttestationRequest {
  id: string;
  type: 'sent' | 'received';
  requester?: {
    name: string;
    email: string;
    company: string;
    avatar: string;
    trustScore: number;
  };
  recipient?: {
    name: string;
    email: string;
    company: string;
    avatar: string;
    trustScore: number;
  };
  attestationType: string;
  category: string;
  status: 'pending' | 'completed' | 'declined' | 'expired';
  message: string;
  requestedDate: string;
  dueDate?: string;
  completedDate?: string;
  declinedDate?: string;
  priority: 'low' | 'normal' | 'high';
  documents?: string[];
  response?: string;
  declineReason?: string;
}

const AttestationEndorsement = () => {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState<'sent' | 'received' | 'templates' | 'network'>('sent')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')
  const [showNewRequestModal, setShowNewRequestModal] = useState(false)
  const [selectedRequest, setSelectedRequest] = useState<AttestationRequest | null>(null)

  // Mock attestation data
  const attestationRequests: AttestationRequest[] = [
    {
      id: '1',
      type: 'sent',
      recipient: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        company: 'ABC Corporation',
        avatar: '/api/placeholder/40/40',
        trustScore: 85
      },
      attestationType: 'Employment Verification',
      category: 'Professional',
      status: 'completed',
      message: 'Please confirm employment details for John Doe who worked at your company from January 2020 to December 2022 as a Software Engineer.',
      requestedDate: '2024-01-15',
      completedDate: '2024-01-18',
      priority: 'normal',
      response: 'Confirmed employment from Jan 2020 to Dec 2022 as Senior Software Engineer with excellent performance record.'
    },
    {
      id: '2',
      type: 'sent',
      recipient: {
        name: 'Jane Smith',
        email: 'jane.smith@university.edu',
        company: 'University of Lagos',
        avatar: '/api/placeholder/40/40',
        trustScore: 92
      },
      attestationType: 'Education Verification',
      category: 'Academic',
      status: 'pending',
      message: 'Please verify that Jane Smith graduated with a Bachelor of Science in Computer Science in 2018.',
      requestedDate: '2024-01-19',
      dueDate: '2024-01-26',
      priority: 'high',
      documents: ['Transcript.pdf']
    },
    {
      id: '3',
      type: 'received',
      requester: {
        name: 'Michael Johnson',
        email: 'michael.johnson@company.com',
        company: 'XYZ Ltd',
        avatar: '/api/placeholder/40/40',
        trustScore: 78
      },
      attestationType: 'Character Reference',
      category: 'Professional',
      status: 'pending',
      message: 'I am applying for a position at XYZ Ltd and would appreciate if you could provide a character reference based on our professional relationship.',
      requestedDate: '2024-01-20',
      dueDate: '2024-01-27',
      priority: 'normal'
    },
    {
      id: '4',
      type: 'received',
      requester: {
        name: 'Sarah Wilson',
        email: 'sarah.wilson@example.com',
        company: 'Global Finance',
        avatar: '/api/placeholder/40/40',
        trustScore: 88
      },
      attestationType: 'Employment Verification',
      category: 'Professional',
      status: 'declined',
      message: 'Please confirm that Sarah Wilson worked at your organization from 2019 to 2021 as a Financial Analyst.',
      requestedDate: '2024-01-16',
      declinedDate: '2024-01-17',
      priority: 'normal',
      declineReason: 'Unable to verify employment history due to insufficient records.'
    }
  ]

  // Mock network data
  const attestationNetwork = [
    {
      id: '1',
      name: 'ABC Corporation',
      type: 'Organization',
      industry: 'Technology',
      relationship: 'Business Partner',
      trustScore: 92,
      attestationsGiven: 45,
      attestationsReceived: 32,
      lastInteraction: '3 days ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'University of Lagos',
      type: 'Educational Institution',
      industry: 'Education',
      relationship: 'Academic Partner',
      trustScore: 95,
      attestationsGiven: 120,
      attestationsReceived: 15,
      lastInteraction: '1 week ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'Global Finance Ltd',
      type: 'Organization',
      industry: 'Financial Services',
      relationship: 'Client',
      trustScore: 88,
      attestationsGiven: 28,
      attestationsReceived: 42,
      lastInteraction: '2 days ago',
      avatar: '/api/placeholder/40/40'
    }
  ]

  // Mock templates
  const attestationTemplates = [
    {
      id: '1',
      name: 'Standard Employment Verification',
      category: 'Employment',
      usageCount: 156,
      lastUsed: '2 days ago'
    },
    {
      id: '2',
      name: 'Education Credential Verification',
      category: 'Education',
      usageCount: 89,
      lastUsed: '1 week ago'
    },
    {
      id: '3',
      name: 'Professional Reference',
      category: 'Reference',
      usageCount: 67,
      lastUsed: '3 days ago'
    },
    {
      id: '4',
      name: 'Character Reference',
      category: 'Reference',
      usageCount: 42,
      lastUsed: '5 days ago'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'declined':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-gray-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'declined':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'normal':
        return 'bg-blue-100 text-blue-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRequests = attestationRequests.filter(request => {
    const matchesTab = request.type === activeTab || (activeTab === 'templates' && false) || (activeTab === 'network' && false)
    const matchesSearch = searchQuery === '' || 
      (request.type === 'received' ? request.requester?.name : request.recipient?.name)
        ?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter
    
    return matchesTab && matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attestation & Endorsement</h1>
          <p className="text-gray-600 mt-1">Request and provide professional attestations and endorsements</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowNewRequestModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Attestation Request
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Pending Requests',
            value: attestationRequests.filter(r => r.status === 'pending' && r.type === 'received').length,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting your response'
          },
          {
            title: 'Sent Requests',
            value: attestationRequests.filter(r => r.type === 'sent').length,
            icon: Send,
            color: 'bg-blue-500',
            description: 'Total sent'
          },
          {
            title: 'Completed',
            value: attestationRequests.filter(r => r.status === 'completed').length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Successfully completed'
          },
          {
            title: 'Network Size',
            value: attestationNetwork.length,
            icon: Users,
            color: 'bg-purple-500',
            description: 'Trusted connections'
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
          <button
            onClick={() => setActiveTab('sent')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sent'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sent Requests
          </button>
          <button
            onClick={() => setActiveTab('received')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
              activeTab === 'received'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Received Requests
            {attestationRequests.filter(r => r.status === 'pending' && r.type === 'received').length > 0 && (
              <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {attestationRequests.filter(r => r.status === 'pending' && r.type === 'received').length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'network'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Attestation Network
          </button>
        </nav>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search attestations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
            />
          </div>
          
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'templates' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Attestation Templates</h3>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {attestationTemplates.map((template) => (
              <div key={template.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                    {template.category}
                  </span>
                </div>
                
                <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>Used {template.usageCount} times</span>
                  <span>Last used: {template.lastUsed}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button className="flex-1 bg-primary-600 text-white py-2 px-3 rounded text-sm hover:bg-primary-700 transition-colors">
                    Use Template
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'network' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Your Attestation Network</h3>
            <p className="text-gray-600 mt-1">Organizations and institutions in your trusted network</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {attestationNetwork.map((entity) => (
              <div key={entity.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{entity.name}</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Trust Score: {entity.trustScore}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{entity.type} • {entity.industry}</p>
                      <p className="text-sm text-gray-500 mb-2">{entity.relationship}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{entity.attestationsGiven} attestations given</span>
                        <span>{entity.attestationsReceived} attestations received</span>
                        <span>Last interaction: {entity.lastInteraction}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                      <MessageSquare className="w-4 h-4 mr-1 inline" />
                      Message
                    </button>
                    <button 
                      onClick={() => setShowNewRequestModal(true)}
                      className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors"
                    >
                      <Send className="w-4 h-4 mr-1 inline" />
                      Request
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {(activeTab === 'sent' || activeTab === 'received') && (
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    {request.type === 'received' ? (
                      <ArrowDownRight className="w-6 h-6 text-white" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {request.type === 'received' ? request.requester?.name : request.recipient?.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {request.type === 'received' ? request.requester?.company : request.recipient?.company}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {request.attestationType} • {request.category}
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">{request.message}</p>
                    </div>
                    
                    {request.response && (
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-green-800 font-medium">Response:</p>
                        <p className="text-sm text-green-700">{request.response}</p>
                      </div>
                    )}
                    
                    {request.declineReason && (
                      <div className="bg-red-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-red-800 font-medium">Decline Reason:</p>
                        <p className="text-sm text-red-700">{request.declineReason}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Requested: {request.requestedDate}</span>
                      {request.dueDate && <span>Due: {request.dueDate}</span>}
                      {request.completedDate && <span>Completed: {request.completedDate}</span>}
                      {request.documents && <span>{request.documents.length} documents attached</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(request.status)}
                  {request.status === 'pending' && request.type === 'received' && (
                    <div className="flex items-center space-x-2">
                      <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                        Decline
                      </button>
                      <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors">
                        Respond
                      </button>
                    </div>
                  )}
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredRequests.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl shadow-sm border border-gray-200">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No attestation requests</h3>
              <p className="text-gray-600">
                {activeTab === 'received' 
                  ? "You don't have any pending attestation requests."
                  : "You haven't sent any attestation requests yet."
                }
              </p>
              {activeTab === 'sent' && (
                <button 
                  onClick={() => setShowNewRequestModal(true)}
                  className="mt-4 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Send New Request
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* New Request Modal */}
      {showNewRequestModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">New Attestation Request</h2>
                <button 
                  onClick={() => setShowNewRequestModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Email *
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attestation Type *
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="">Select attestation type</option>
                  <option value="employment">Employment Verification</option>
                  <option value="education">Education Verification</option>
                  <option value="character">Character Reference</option>
                  <option value="professional">Professional Reference</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe what you're requesting and provide any necessary context..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="low">Low</option>
                  <option value="normal" selected>Normal</option>
                  <option value="high">High</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Attach Documents (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Drag & drop files here or click to browse</p>
                  <button className="mt-2 text-primary-600 hover:text-primary-700 text-sm font-medium">
                    Select Files
                  </button>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowNewRequestModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <Send className="w-4 h-4 mr-2" />
                  Send Request
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Help & Information */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <Info className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-2">About Attestations & Endorsements</h3>
            <p className="text-blue-700 mb-4">
              Attestations and endorsements help build trust by having third parties verify information about individuals or organizations.
              They can be used for employment verification, education credentials, professional references, and more.
            </p>
            
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                <HelpCircle className="w-4 h-4 mr-2" />
                Learn More
              </button>
              <button className="border border-blue-300 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                View Best Practices
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttestationEndorsement