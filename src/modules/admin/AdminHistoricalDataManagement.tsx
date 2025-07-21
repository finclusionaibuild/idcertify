import React, { useState } from 'react'
import {
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
  MapPin
} from 'lucide-react'
import { mockHistoricalRecords, mockUsers, getUserDisplayName } from '../shared/lib/mockData'

interface HistoricalRecord {
  id: string
  user_id?: string
  organisation_id?: string
  data_type: 'employment_verification' | 'education_record' | 'identity_verification' | 'address_verification' | 'reference_check'
  verification_date: string
  status: 'verified' | 'failed' | 'pending'
  source_system: string
  details: any
  imported_at: string
  imported_by?: string
  notes?: string
}

const AdminHistoricalDataManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDataType, setSelectedDataType] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState<HistoricalRecord | null>(null)
  const [loading, setLoading] = useState(false)

  const dataTypes = [
    'employment_verification',
    'education_record',
    'identity_verification',
    'address_verification',
    'reference_check',
  ]
  const statuses = ['verified', 'failed', 'pending']

  const filteredRecords = mockHistoricalRecords.filter(record => {
    const matchesSearch = searchQuery === '' ||
      (record.user_id && getUserDisplayName(mockUsers.find(u => u.id === record.user_id) || {} as any).toLowerCase().includes(searchQuery.toLowerCase())) ||
      (record.organisation_id && getUserDisplayName(mockUsers.find(u => u.id === record.organisation_id) || {} as any).toLowerCase().includes(searchQuery.toLowerCase())) ||
      record.data_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.source_system.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesDataType = selectedDataType === 'all' || record.data_type === selectedDataType
    const matchesStatus = selectedStatus === 'all' || record.status === selectedStatus

    return matchesSearch && matchesDataType && matchesStatus
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDataTypeIcon = (dataType: string) => {
    switch (dataType) {
      case 'employment_verification':
        return <Building className="w-5 h-5 text-blue-500" />
      case 'education_record':
        return <User className="w-5 h-5 text-purple-500" />
      case 'identity_verification':
        return <Shield className="w-5 h-5 text-green-500" />
      case 'address_verification':
        return <MapPin className="w-5 h-5 text-orange-500" />
      case 'reference_check':
        return <User className="w-5 h-5 text-pink-500" />
      default:
        return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getAssociatedEntity = (record: HistoricalRecord) => {
    if (record.user_id) {
      const user = mockUsers.find(u => u.id === record.user_id)
      return user ? getUserDisplayName(user) : 'N/A'
    }
    if (record.organisation_id) {
      const org = mockUsers.find(u => u.id === record.organisation_id)
      return org ? getUserDisplayName(org) : 'N/A'
    }
    return 'N/A'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historical Data Management</h1>
          <p className="text-gray-600 mt-1">View and manage historical verification records imported into the system</p>
        </div>

        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search records..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <select
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Data Types</option>
              {dataTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
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

            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Historical Records Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Associated Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Source System
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Imported On
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
                        {record.user_id ? <User className="w-5 h-5 text-white" /> : <Building className="w-5 h-5 text-white" />}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{getAssociatedEntity(record)}</div>
                        <div className="text-xs text-gray-500">
                          {record.user_id ? 'Individual' : 'Organisation'}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getDataTypeIcon(record.data_type)}
                      <span className="ml-2 text-sm text-gray-900">
                        {record.data_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.verification_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.source_system}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.imported_at).toLocaleDateString()}
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
                      <button className="text-red-600 hover:text-red-900">
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

        {filteredRecords.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No historical records found</h3>
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
                <h2 className="text-xl font-bold text-gray-900">Historical Record Details</h2>
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
                  {getDataTypeIcon(selectedRecord.data_type)}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedRecord.data_type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <p className="text-gray-600">Associated with: {getAssociatedEntity(selectedRecord)}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status.charAt(0).toUpperCase() + selectedRecord.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Source: {selectedRecord.source_system}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Verification Date</p>
                    <p className="font-medium text-gray-900">{new Date(selectedRecord.verification_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Imported On</p>
                    <p className="font-medium text-gray-900">{new Date(selectedRecord.imported_at).toLocaleDateString()}</p>
                  </div>
                  {selectedRecord.imported_by && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Imported By</p>
                      <p className="font-medium text-gray-900">{selectedRecord.imported_by}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Details</h3>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <pre className="text-sm text-gray-800 overflow-x-auto">
                    {JSON.stringify(selectedRecord.details, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Notes */}
              {selectedRecord.notes && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Notes</h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-gray-700">{selectedRecord.notes}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Raw Data
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Record
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminHistoricalDataManagement