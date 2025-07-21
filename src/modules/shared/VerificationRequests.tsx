import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  User,
  Shield,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Upload,
  ArrowUpRight,
  Building,
  GraduationCap,
  MapPin,
  UserCheck,
  Award,
  ExternalLink,
  HelpCircle,
  Info,
  X,
  TrendingUp,
  Star,
  MessageSquare
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { mockVerificationRequests, mockDocuments } from '../lib/mockData'
import { Link, useNavigate } from 'react-router-dom'

interface VerificationRequest {
  id: string
  requester_id: string
  target_user_id: string
  request_type: string
  verification_category: 'identity' | 'education' | 'employment' | 'address' | 'reference' | 'document'
  title: string
  description?: string
  required_documents?: any
  custom_fields?: any
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'expired'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  response_message?: string
  response_documents?: any
  responded_at?: string
  expires_at?: string
  created_at: string
  updated_at: string
}

interface VerificationDocument {
  id: string
  type: string
  status: string
  date: string
  source: string
  details?: string
  score?: number
}

const VerificationRequests = () => {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState<'all' | 'identity' | 'education' | 'employment' | 'address' | 'certificate' | 'guarantor'>('all')
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showNewVerificationModal, setShowNewVerificationModal] = useState(false)
  const [pendingRequests, setPendingRequests] = useState<VerificationRequest[]>([])
  const [verificationHistory, setVerificationHistory] = useState<VerificationDocument[]>([])
  const [stats, setStats] = useState({
    totalVerified: 0,
    pendingRequests: 0,
    declined: 0,
    trustScore: profile?.trust_score || 0
  })

  useEffect(() => {
    if (profile) {
      // Filter verification requests for the current user
      const userRequests = mockVerificationRequests.filter(
        req => req.target_user_id === profile.id
      )
      
      // Set pending requests
      const pending = userRequests.filter(req => req.status === 'pending')
      setPendingRequests(pending)
      
      // Create mock verification history from documents and requests
      const documents = mockDocuments.filter(doc => doc.user_id === profile.id)
      const history: VerificationDocument[] = [
        ...documents.map(doc => ({
          id: doc.id,
          type: doc.document_type,
          status: doc.verification_status,
          date: doc.verified_at || doc.created_at,
          source: doc.issuing_authority || 'Self Upload',
          details: doc.document_number,
          score: doc.confidence_score
        })),
        ...userRequests
          .filter(req => req.status !== 'pending')
          .map(req => ({
            id: req.id,
            type: req.request_type,
            status: req.status,
            date: req.responded_at || req.updated_at,
            source: `Request from Organization`,
            details: req.title
          }))
      ]
      
      setVerificationHistory(history)
      
      // Set stats
      setStats({
        totalVerified: documents.filter(doc => doc.verification_status === 'verified').length,
        pendingRequests: pending.length,
        declined: userRequests.filter(req => req.status === 'rejected').length,
        trustScore: profile.trust_score || 0
      })
    }
  }, [profile])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'in_progress':
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
      case 'failed':
      case 'expired':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
      case 'in_progress':
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'rejected':
      case 'failed':
      case 'expired':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />
    }
  }

  const getPriorityBadge = (priority: string) => {
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'identity':
        return <Shield className="w-5 h-5 text-blue-500" />
      case 'education':
        return <GraduationCap className="w-5 h-5 text-purple-500" />
      case 'employment':
        return <Building className="w-5 h-5 text-green-500" />
      case 'address':
        return <MapPin className="w-5 h-5 text-orange-500" />
      case 'reference':
      case 'guarantor':
        return <UserCheck className="w-5 h-5 text-pink-500" />
      case 'document':
      case 'certificate':
        return <Award className="w-5 h-5 text-yellow-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredHistory = activeTab === 'all' 
    ? verificationHistory 
    : verificationHistory.filter(item => {
        const category = item.type.toLowerCase()
        if (activeTab === 'identity' && (category.includes('id') || category.includes('passport') || category.includes('license'))) {
          return true
        }
        if (activeTab === 'education' && (category.includes('education') || category.includes('degree') || category.includes('certificate'))) {
          return true
        }
        if (activeTab === 'employment' && (category.includes('employment') || category.includes('job') || category.includes('work'))) {
          return true
        }
        if (activeTab === 'address' && category.includes('address')) {
          return true
        }
        if (activeTab === 'certificate' && (category.includes('certificate') || category.includes('license'))) {
          return true
        }
        if (activeTab === 'guarantor' && (category.includes('guarantor') || category.includes('reference'))) {
          return true
        }
        return false
      })

  const handleApproveRequest = (requestId: string) => {
    // In a real app, this would call an API to approve the request
    console.log('Approving request:', requestId)
    
    // Update the UI by removing the request from pending
    setPendingRequests(prev => prev.filter(req => req.id !== requestId))
    
    // Update stats
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      totalVerified: prev.totalVerified + 1
    }))
  }

  const handleDeclineRequest = (requestId: string) => {
    // In a real app, this would call an API to decline the request
    console.log('Declining request:', requestId)
    
    // Update the UI by removing the request from pending
    setPendingRequests(prev => prev.filter(req => req.id !== requestId))
    
    // Update stats
    setStats(prev => ({
      ...prev,
      pendingRequests: prev.pendingRequests - 1,
      declined: prev.declined + 1
    }))
  }

  const handleStartNewVerification = () => {
    // Navigate to biobank page where user can upload documents
    navigate('/biobank')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Verifications</h1>
          <p className="text-gray-600 mt-1">Track all verification requests, statuses, and history in one place.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={handleStartNewVerification}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Start New Verification
          </button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Verified Items',
            value: stats.totalVerified,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Total verifications completed'
          },
          {
            title: 'Pending Requests',
            value: stats.pendingRequests,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Waiting for your response'
          },
          {
            title: 'Declined/Failed',
            value: stats.declined,
            icon: XCircle,
            color: 'bg-red-500',
            description: 'Verifications declined or failed'
          },
          {
            title: 'Trust Score',
            value: `${stats.trustScore}/100`,
            icon: Star,
            color: 'bg-blue-500',
            description: 'Your current trust rating'
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

      {/* Active Verification Requests Section */}
      {pendingRequests.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Active Verification Requests</h2>
          <p className="text-gray-600 mb-6">These organizations are requesting to verify your information. Review and respond to each request.</p>
          
          <div className="space-y-4">
            {pendingRequests.map((request) => (
              <div key={request.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <Building className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{request.title}</h3>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(request.priority)}`}>
                          {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                        </span>
                        <span className="text-sm text-gray-500">
                          Requested on {new Date(request.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => handleDeclineRequest(request.id)}
                      className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                      Decline
                    </button>
                    <button 
                      onClick={() => handleApproveRequest(request.id)}
                      className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                    >
                      Approve
                    </button>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <p className="text-gray-700">{request.description || 'Please verify your information for our records.'}</p>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="flex items-center space-x-2 mb-3 md:mb-0">
                    {getCategoryIcon(request.verification_category)}
                    <span className="text-sm font-medium text-gray-700 capitalize">{request.verification_category} Verification</span>
                  </div>
                  
                  {request.required_documents && (
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Required Document
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Verification Type Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Verifications', icon: FileText },
            { id: 'identity', label: 'Identity', icon: Shield },
            { id: 'education', label: 'Education', icon: GraduationCap },
            { id: 'employment', label: 'Employment', icon: Building },
            { id: 'address', label: 'Address', icon: MapPin },
            { id: 'certificate', label: 'Certificate/License', icon: Award },
            { id: 'guarantor', label: 'Guarantor/Reference', icon: UserCheck }
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveTab(filter.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === filter.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <filter.icon className="w-4 h-4 mr-2" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Verification History Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Verification History</h2>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search verifications..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                />
              </div>
              <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getCategoryIcon(item.type.toLowerCase())}
                      <span className="ml-2 text-sm font-medium text-gray-900">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.source.includes('Organization') ? 'Organization' : 'Self'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(item.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.source}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => {
                        setSelectedVerification({
                          id: item.id,
                          requester_id: '',
                          target_user_id: profile?.id || '',
                          request_type: item.type,
                          verification_category: 'identity',
                          title: item.type,
                          status: item.status as any,
                          priority: 'normal',
                          created_at: item.date,
                          updated_at: item.date
                        })
                        setShowDetailModal(true)
                      }}
                      className="text-primary-600 hover:text-primary-900 flex items-center ml-auto"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No verifications found</h3>
            <p className="text-gray-600">
              {activeTab === 'all' 
                ? "You don't have any verification history yet."
                : `You don't have any ${activeTab} verifications yet.`
              }
            </p>
          </div>
        )}
      </div>

      {/* Self-Initiated Verification Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Verify a new identity or document yourself</h2>
            <p className="text-gray-600">
              Start a new verification process to add to your digital identity profile and improve your trust score.
            </p>
          </div>
          <button 
            onClick={handleStartNewVerification}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Start New Verification
          </button>
        </div>
      </div>

      {/* Help & Security Notes */}
      <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-gray-100 rounded-lg">
            <Shield className="w-6 h-6 text-gray-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Your data is private and only shared with your consent</h3>
            <p className="text-gray-600 mb-4">
              We take your privacy seriously. Your personal information and documents are only shared with organizations when you explicitly approve a verification request.
            </p>
            <div className="flex items-center space-x-4">
              <Link to="/trust-score" className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Learn how trust scores are calculated
              </Link>
              <a 
                href="https://support.bolt.new/docs/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center"
              >
                <HelpCircle className="w-4 h-4 mr-2" />
                View Help Center
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Verification Detail Modal */}
      {showDetailModal && selectedVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Verification Details</h2>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Verification Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  {getCategoryIcon(selectedVerification.verification_category)}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedVerification.request_type}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(selectedVerification.status)}`}>
                        {selectedVerification.status.charAt(0).toUpperCase() + selectedVerification.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(selectedVerification.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                
                {selectedVerification.description && (
                  <div className="mb-4">
                    <p className="text-gray-700">{selectedVerification.description}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Verification Type</p>
                    <p className="font-medium text-gray-900">{selectedVerification.request_type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Status</p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedVerification.status)}
                      <span className="font-medium text-gray-900 capitalize">{selectedVerification.status}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Requested Date</p>
                    <p className="font-medium text-gray-900">{new Date(selectedVerification.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">{new Date(selectedVerification.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Associated Documents</h3>
                <div className="space-y-3">
                  {mockDocuments
                    .filter(doc => doc.user_id === profile?.id && doc.document_type.includes(selectedVerification.request_type))
                    .map((doc) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-gray-600" />
                          <div>
                            <p className="font-medium text-gray-900">{doc.document_type}</p>
                            <p className="text-xs text-gray-500">{doc.file_name}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(doc.verification_status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(doc.verification_status)}`}>
                            {doc.verification_status.charAt(0).toUpperCase() + doc.verification_status.slice(1)}
                          </span>
                        </div>
                      </div>
                    ))}
                  
                  {mockDocuments.filter(doc => doc.user_id === profile?.id && doc.document_type.includes(selectedVerification.request_type)).length === 0 && (
                    <div className="text-center py-6 bg-gray-50 rounded-lg">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">No documents associated with this verification</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Report
                </button>
                {selectedVerification.status === 'rejected' || selectedVerification.status === 'failed' ? (
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Request Retest
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default VerificationRequests