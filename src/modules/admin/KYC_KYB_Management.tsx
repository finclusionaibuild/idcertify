import React, { useState } from 'react'
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Shield,
  Building,
  User,
  FileText,
  Upload,
  MoreHorizontal,
  RefreshCw,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  X,
  Save
} from 'lucide-react'

interface KYCRecord {
  id: string
  name: string
  email: string
  type: 'individual' | 'organization'
  status: 'pending' | 'in_progress' | 'approved' | 'rejected'
  submittedDate: string
  updatedDate: string
  documents: string[]
  riskLevel: 'low' | 'medium' | 'high'
  notes?: string
}

const KYC_KYB_Management = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'individuals' | 'organizations' | 'pending' | 'rejected'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<KYCRecord | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock KYC/KYB data
  const kycRecords: KYCRecord[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      type: 'individual',
      status: 'approved',
      submittedDate: '2024-01-15',
      updatedDate: '2024-01-18',
      documents: ['National ID', 'Proof of Address', 'Selfie'],
      riskLevel: 'low'
    },
    {
      id: '2',
      name: 'TechCorp Solutions',
      email: 'contact@techcorp.com',
      type: 'organization',
      status: 'approved',
      submittedDate: '2024-01-10',
      updatedDate: '2024-01-14',
      documents: ['Certificate of Incorporation', 'Tax ID', 'Director IDs', 'Business Address Proof'],
      riskLevel: 'low'
    },
    {
      id: '3',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      type: 'individual',
      status: 'pending',
      submittedDate: '2024-01-20',
      updatedDate: '2024-01-20',
      documents: ['National ID', 'Proof of Address'],
      riskLevel: 'medium'
    },
    {
      id: '4',
      name: 'Global Finance Ltd',
      email: 'info@globalfinance.com',
      type: 'organization',
      status: 'in_progress',
      submittedDate: '2024-01-18',
      updatedDate: '2024-01-19',
      documents: ['Certificate of Incorporation', 'Tax ID', 'Director IDs'],
      riskLevel: 'medium',
      notes: 'Awaiting additional documentation for beneficial owners'
    },
    {
      id: '5',
      name: 'Michael Johnson',
      email: 'michael.j@example.com',
      type: 'individual',
      status: 'rejected',
      submittedDate: '2024-01-12',
      updatedDate: '2024-01-16',
      documents: ['National ID (Expired)', 'Proof of Address'],
      riskLevel: 'high',
      notes: 'ID document expired. Address verification failed.'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-100 text-green-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'high':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRecords = kycRecords.filter(record => {
    const matchesSearch = searchQuery === '' || 
      record.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTab = 
      activeTab === 'all' || 
      (activeTab === 'individuals' && record.type === 'individual') ||
      (activeTab === 'organizations' && record.type === 'organization') ||
      (activeTab === 'pending' && (record.status === 'pending' || record.status === 'in_progress')) ||
      (activeTab === 'rejected' && record.status === 'rejected')
    
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus
    const matchesRiskLevel = selectedRiskLevel === 'all' || record.riskLevel === selectedRiskLevel
    
    return matchesSearch && matchesTab && matchesStatus && matchesRiskLevel
  })

  const handleUpdateStatus = async (newStatus: 'approved' | 'rejected') => {
    if (!selectedRecord) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would update the record in the database
      console.log(`Updating record ${selectedRecord.id} status to ${newStatus}`)
      
      setShowDetailModal(false)
      setSelectedRecord(null)
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">KYC/KYB Management</h1>
          <p className="text-gray-600 mt-1">Manage and review Know Your Customer (KYC) and Know Your Business (KYB) verifications</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Manual Verification
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Verifications',
            value: kycRecords.length,
            icon: Shield,
            color: 'bg-blue-500',
            description: 'All KYC/KYB records'
          },
          {
            title: 'Pending Review',
            value: kycRecords.filter(r => r.status === 'pending' || r.status === 'in_progress').length,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting verification'
          },
          {
            title: 'Approved',
            value: kycRecords.filter(r => r.status === 'approved').length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Successfully verified'
          },
          {
            title: 'Rejected',
            value: kycRecords.filter(r => r.status === 'rejected').length,
            icon: XCircle,
            color: 'bg-red-500',
            description: 'Failed verification'
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
            { id: 'all', label: 'All Verifications' },
            { id: 'individuals', label: 'Individuals', count: kycRecords.filter(r => r.type === 'individual').length },
            { id: 'organizations', label: 'Organizations', count: kycRecords.filter(r => r.type === 'organization').length },
            { id: 'pending', label: 'Pending Review', count: kycRecords.filter(r => r.status === 'pending' || r.status === 'in_progress').length },
            { id: 'rejected', label: 'Rejected', count: kycRecords.filter(r => r.status === 'rejected').length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count && (
                <span className="ml-2 bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email..."
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
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select 
              value={selectedRiskLevel}
              onChange={(e) => setSelectedRiskLevel(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Risk Levels</option>
              <option value="low">Low Risk</option>
              <option value="medium">Medium Risk</option>
              <option value="high">High Risk</option>
            </select>
            
            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* KYC/KYB Records Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name/Organization
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Documents
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                        {record.type === 'individual' ? (
                          <User className="w-5 h-5 text-white" />
                        ) : (
                          <Building className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{record.name}</div>
                        <div className="text-sm text-gray-500">{record.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 capitalize">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.replace('_', ' ').charAt(0).toUpperCase() + record.status.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(record.riskLevel)}`}>
                      {record.riskLevel.charAt(0).toUpperCase() + record.riskLevel.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.updatedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {record.documents.length}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedRecord(record)
                          setShowDetailModal(true)
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
        
        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No records found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">KYC/KYB Details</h2>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Record Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center">
                    {selectedRecord.type === 'individual' ? (
                      <User className="w-8 h-8 text-white" />
                    ) : (
                      <Building className="w-8 h-8 text-white" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedRecord.name}</h3>
                    <p className="text-gray-600">{selectedRecord.email}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full capitalize">
                        {selectedRecord.type}
                      </span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(selectedRecord.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                          {selectedRecord.status.replace('_', ' ').charAt(0).toUpperCase() + selectedRecord.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(selectedRecord.riskLevel)}`}>
                        {selectedRecord.riskLevel.charAt(0).toUpperCase() + selectedRecord.riskLevel.slice(1)} Risk
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Submitted Date</p>
                    <p className="font-medium text-gray-900">{new Date(selectedRecord.submittedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">{new Date(selectedRecord.updatedDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Documents</p>
                    <p className="font-medium text-gray-900">{selectedRecord.documents.length} documents</p>
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Submitted Documents</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedRecord.documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <FileText className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-900">{doc}</span>
                      </div>
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedRecord.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Notes</h4>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedRecord.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                {selectedRecord.status === 'pending' || selectedRecord.status === 'in_progress' ? (
                  <>
                    <button 
                      onClick={() => handleUpdateStatus('rejected')}
                      disabled={loading}
                      className="border border-red-300 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-red-700 mr-2"></div>
                      ) : (
                        <XCircle className="w-4 h-4 mr-2" />
                      )}
                      Reject
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus('approved')}
                      disabled={loading}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      Approve
                    </button>
                  </>
                ) : (
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Download Report
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

export default KYC_KYB_Management