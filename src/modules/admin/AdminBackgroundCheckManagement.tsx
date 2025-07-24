import React, { useState } from 'react'
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import DescriptionIcon from '@mui/icons-material/Description';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import { RefreshCw, MoreHorizontal, Calendar } from 'lucide-react'

const AdminBackgroundCheckManagement = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  // Mock data for background checks
  const backgroundChecks = [
    {
      id: 'BC001',
      userId: 'USR001',
      userName: 'John Smith',
      userEmail: 'john.smith@email.com',
      type: 'Criminal Background',
      status: 'completed',
      result: 'clear',
      requestedBy: 'TechCorp Ltd',
      requestDate: '2024-01-15',
      completedDate: '2024-01-17',
      cost: '$25.00',
      provider: 'BackgroundCheck Pro'
    },
    {
      id: 'BC002',
      userId: 'USR002',
      userName: 'Sarah Johnson',
      userEmail: 'sarah.j@email.com',
      type: 'Employment Verification',
      status: 'in_progress',
      result: null,
      requestedBy: 'FinanceHub Inc',
      requestDate: '2024-01-16',
      completedDate: null,
      cost: '$15.00',
      provider: 'VerifyNow'
    },
    {
      id: 'BC003',
      userId: 'USR003',
      userName: 'Michael Brown',
      userEmail: 'mike.brown@email.com',
      type: 'Education Verification',
      status: 'failed',
      result: 'discrepancy_found',
      requestedBy: 'EduTech Solutions',
      requestDate: '2024-01-14',
      completedDate: '2024-01-16',
      cost: '$20.00',
      provider: 'EduVerify'
    },
    {
      id: 'BC004',
      userId: 'USR004',
      userName: 'Emily Davis',
      userEmail: 'emily.davis@email.com',
      type: 'Credit Check',
      status: 'pending',
      result: null,
      requestedBy: 'LoanCorp',
      requestDate: '2024-01-17',
      completedDate: null,
      cost: '$30.00',
      provider: 'CreditCheck Plus'
    }
  ]

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      in_progress: { color: 'bg-blue-100 text-blue-800', icon: AccessTimeIcon },
      failed: { color: 'bg-red-100 text-red-800', icon: CancelIcon },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: AccessTimeIcon }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.replace('_', ' ').toUpperCase()}
      </span>
    )
  }

  const getResultBadge = (result: string | null) => {
    if (!result) return <span className="text-gray-400">-</span>
    
    const resultConfig = {
      clear: { color: 'bg-green-100 text-green-800', icon: CheckCircleIcon },
      discrepancy_found: { color: 'bg-red-100 text-red-800', icon: WarningIcon },
      pending_review: { color: 'bg-yellow-100 text-yellow-800', icon: AccessTimeIcon }
    }
    
    const config = resultConfig[result as keyof typeof resultConfig]
    if (!config) return <span className="text-gray-600">{result}</span>
    
    const Icon = config.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <Icon className="w-3 h-3 mr-1" />
        {result.replace('_', ' ').toUpperCase()}
      </span>
    )
  }

  const filteredChecks = backgroundChecks.filter(check => {
    const matchesSearch = check.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         check.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || check.status === statusFilter
    const matchesType = typeFilter === 'all' || check.type === typeFilter
    
    return matchesSearch && matchesStatus && matchesType
  })

  const stats = {
    total: backgroundChecks.length,
    completed: backgroundChecks.filter(c => c.status === 'completed').length,
    inProgress: backgroundChecks.filter(c => c.status === 'in_progress').length,
    failed: backgroundChecks.filter(c => c.status === 'failed').length
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Background Check Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all background check requests and results</p>
        </div>
        <div className="flex space-x-3">
          <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 flex items-center">
            <DownloadIcon className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <DescriptionIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Checks</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <AccessTimeIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded-lg">
              <CancelIcon className="w-6 h-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Failed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.failed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by name, email, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="in_progress">In Progress</option>
              <option value="failed">Failed</option>
              <option value="pending">Pending</option>
            </select>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="Criminal Background">Criminal Background</option>
              <option value="Employment Verification">Employment Verification</option>
              <option value="Education Verification">Education Verification</option>
              <option value="Credit Check">Credit Check</option>
            </select>
          </div>
        </div>
      </div>

      {/* Background Checks Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Requested By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cost
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredChecks.map((check) => (
                <tr key={check.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{check.id}</div>
                      <div className="text-sm text-gray-500">
                        Requested: {new Date(check.requestDate).toLocaleDateString()}
                      </div>
                      {check.completedDate && (
                        <div className="text-sm text-gray-500">
                          Completed: {new Date(check.completedDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{check.userName}</div>
                      <div className="text-sm text-gray-500">{check.userEmail}</div>
                      <div className="text-sm text-gray-500">ID: {check.userId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{check.type}</div>
                    <div className="text-sm text-gray-500">{check.provider}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(check.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getResultBadge(check.result)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{check.requestedBy}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{check.cost}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <VisibilityIcon className="w-4 h-4" />
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
      </div>

      {filteredChecks.length === 0 && (
        <div className="text-center py-12">
          <SearchIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No background checks found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}
    </div>
  )
}

export default AdminBackgroundCheckManagement