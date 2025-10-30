import React, { useState } from 'react'
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  Download, 
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
  MessageSquare, 
  RefreshCw, 
  Shield,
  Calendar,
  ArrowRight,
  Settings,
  Save,
  X
} from 'lucide-react'

interface Dispute {
  id: string
  title: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  category: 'verification' | 'payment' | 'technical' | 'compliance' | 'other'
  parties: {
    initiator: {
      id: string
      name: string
      type: 'individual' | 'organisation'
    }
    respondent: {
      id: string
      name: string
      type: 'individual' | 'organisation'
    }
  }
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  assignedTo?: string
  resolution?: string
}

const AdminDisputeManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showDisputeModal, setShowDisputeModal] = useState(false)
  const [selectedDispute, setSelectedDispute] = useState<Dispute | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock dispute data
  const disputes: Dispute[] = [
    {
      id: 'DSP-001',
      title: 'Verification Result Dispute',
      description: 'User disputes the result of their identity verification, claiming the documents are valid.',
      status: 'open',
      priority: 'high',
      category: 'verification',
      parties: {
        initiator: { id: 'USR-001', name: 'John Doe', type: 'individual' },
        respondent: { id: 'ORG-001', name: 'TechCorp Solutions', type: 'organisation' }
      },
      createdAt: '2024-01-20T10:00:00Z',
      updatedAt: '2024-01-20T10:00:00Z'
    },
    {
      id: 'DSP-002',
      title: 'Payment Discrepancy',
      description: 'Organisation claims they were overcharged for verification services.',
      status: 'in_progress',
      priority: 'medium',
      category: 'payment',
      parties: {
        initiator: { id: 'ORG-002', name: 'Global Finance Ltd', type: 'organisation' },
        respondent: { id: 'SYS-001', name: 'IDCertify System', type: 'organisation' }
      },
      createdAt: '2024-01-19T14:30:00Z',
      updatedAt: '2024-01-20T09:15:00Z',
      assignedTo: 'Sarah Johnson'
    },
    {
      id: 'DSP-003',
      title: 'Technical Issue with Document Upload',
      description: 'User reports that document upload is failing consistently.',
      status: 'resolved',
      priority: 'medium',
      category: 'technical',
      parties: {
        initiator: { id: 'USR-003', name: 'Jane Smith', type: 'individual' },
        respondent: { id: 'SYS-001', name: 'IDCertify System', type: 'organisation' }
      },
      createdAt: '2024-01-18T11:20:00Z',
      updatedAt: '2024-01-19T16:45:00Z',
      resolvedAt: '2024-01-19T16:45:00Z',
      resolution: 'Fixed server-side issue with document upload service.'
    },
    {
      id: 'DSP-004',
      title: 'Compliance Concern',
      description: 'Organisation disputes compliance requirements for KYB verification.',
      status: 'closed',
      priority: 'high',
      category: 'compliance',
      parties: {
        initiator: { id: 'ORG-003', name: 'XYZ Corporation', type: 'organisation' },
        respondent: { id: 'SYS-001', name: 'IDCertify System', type: 'organisation' }
      },
      createdAt: '2024-01-17T09:00:00Z',
      updatedAt: '2024-01-18T14:30:00Z',
      resolvedAt: '2024-01-18T14:30:00Z',
      resolution: 'Provided documentation on regulatory requirements and adjusted verification process.'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'closed':
        return <XCircle className="w-5 h-5 text-gray-500" />
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'verification':
        return <Shield className="w-5 h-5 text-blue-500" />
      case 'payment':
        return <FileText className="w-5 h-5 text-green-500" />
      case 'technical':
        return <Settings className="w-5 h-5 text-purple-500" />
      case 'compliance':
        return <CheckCircle className="w-5 h-5 text-orange-500" />
      default:
        return <MessageSquare className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredDisputes = disputes.filter(dispute => {
    const matchesSearch = searchQuery === '' || 
      dispute.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.parties.initiator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dispute.parties.respondent.name.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || dispute.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || dispute.priority === selectedPriority
    const matchesCategory = selectedCategory === 'all' || dispute.category === selectedCategory
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const handleResolveDispute = async (disputeId: string, resolution: string) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would update the dispute in the database
      console.log(`Resolving dispute ${disputeId} with resolution: ${resolution}`)
      
      setShowDisputeModal(false)
      setSelectedDispute(null)
    } catch (error) {
      console.error('Error resolving dispute:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dispute Management</h1>
          <p className="text-gray-600 mt-1">Manage and resolve disputes between users and organisations</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Open Disputes',
            value: disputes.filter(d => d.status === 'open').length,
            icon: AlertTriangle,
            color: 'bg-yellow-500',
            description: 'Awaiting review'
          },
          {
            title: 'In Progress',
            value: disputes.filter(d => d.status === 'in_progress').length,
            icon: Clock,
            color: 'bg-blue-500',
            description: 'Currently being handled'
          },
          {
            title: 'Resolved',
            value: disputes.filter(d => d.status === 'resolved').length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Successfully resolved'
          },
          {
            title: 'Avg. Resolution Time',
            value: '2.5 days',
            icon: Calendar,
            color: 'bg-purple-500',
            description: 'Average time to resolve'
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

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search disputes..."
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
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
            
            <select 
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Priority</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="verification">Verification</option>
              <option value="payment">Payment</option>
              <option value="technical">Technical</option>
              <option value="compliance">Compliance</option>
              <option value="other">Other</option>
            </select>
            
            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Disputes Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dispute ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Parties
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDisputes.map((dispute) => (
                <tr key={dispute.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {dispute.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {dispute.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        {dispute.parties.initiator.type === 'individual' ? (
                          <User className="w-4 h-4 text-gray-600 mr-1" />
                        ) : (
                          <Building className="w-4 h-4 text-gray-600 mr-1" />
                        )}
                        <span className="text-sm text-gray-900">{dispute.parties.initiator.name}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <ArrowRight className="w-3 h-3 text-gray-400 mr-1" />
                        {dispute.parties.respondent.type === 'individual' ? (
                          <User className="w-4 h-4 text-gray-600 mr-1" />
                        ) : (
                          <Building className="w-4 h-4 text-gray-600 mr-1" />
                        )}
                        <span className="text-sm text-gray-900">{dispute.parties.respondent.name}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(dispute.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(dispute.status)}`}>
                        {dispute.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(dispute.priority)}`}>
                      {dispute.priority.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(dispute.category)}
                      <span className="text-sm text-gray-900 capitalize">{dispute.category}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(dispute.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedDispute(dispute)
                          setShowDisputeModal(true)
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
        
        {filteredDisputes.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No disputes found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Dispute Detail Modal */}
      {showDisputeModal && selectedDispute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Dispute Details</h2>
                <button 
                  onClick={() => setShowDisputeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Dispute Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedDispute.title}</h3>
                    <p className="text-gray-600">{selectedDispute.id}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedDispute.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDispute.status)}`}>
                      {selectedDispute.status.replace('_', ' ').toUpperCase()}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{selectedDispute.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Initiator</p>
                    <div className="flex items-center">
                      {selectedDispute.parties.initiator.type === 'individual' ? (
                        <User className="w-4 h-4 text-gray-600 mr-2" />
                      ) : (
                        <Building className="w-4 h-4 text-gray-600 mr-2" />
                      )}
                      <p className="font-medium text-gray-900">{selectedDispute.parties.initiator.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Respondent</p>
                    <div className="flex items-center">
                      {selectedDispute.parties.respondent.type === 'individual' ? (
                        <User className="w-4 h-4 text-gray-600 mr-2" />
                      ) : (
                        <Building className="w-4 h-4 text-gray-600 mr-2" />
                      )}
                      <p className="font-medium text-gray-900">{selectedDispute.parties.respondent.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Created</p>
                    <p className="font-medium text-gray-900">{new Date(selectedDispute.createdAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">{new Date(selectedDispute.updatedAt).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Priority</p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedDispute.priority)}`}>
                      {selectedDispute.priority.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(selectedDispute.category)}
                      <span className="text-sm font-medium text-gray-900 capitalize">{selectedDispute.category}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resolution Section */}
              {selectedDispute.status === 'resolved' || selectedDispute.status === 'closed' ? (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Resolution</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800">{selectedDispute.resolution}</p>
                    {selectedDispute.resolvedAt && (
                      <p className="text-sm text-green-600 mt-2">
                        Resolved on: {new Date(selectedDispute.resolvedAt).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Resolve Dispute</h3>
                  <textarea
                    rows={4}
                    placeholder="Enter resolution details..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowDisputeModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {(selectedDispute.status === 'open' || selectedDispute.status === 'in_progress') && (
                  <button 
                    onClick={() => handleResolveDispute(selectedDispute.id, 'Dispute resolved by admin.')}
                    disabled={loading}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    Resolve Dispute
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDisputeManagement