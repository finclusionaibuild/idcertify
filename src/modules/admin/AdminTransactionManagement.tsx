import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Trash2, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Building, 
  Calendar, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  CreditCard, 
  Wallet, 
  DollarSign, 
  X, 
  ChevronLeft, 
  ChevronRight,
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  FileText,
  Info
} from 'lucide-react'
import { mockTransactions, mockUsers, getUserDisplayName } from '../lib/mockData'

interface Transaction {
  id: string
  user_id: string
  type: 'credit' | 'debit' | 'refund' | 'fee' | 'subscription'
  amount: number
  currency: string
  description: string
  reference?: string
  verification_request_id?: string
  related_user_id?: string
  payment_method?: string
  payment_provider?: string
  external_transaction_id?: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
  created_at: string
  processed_at?: string
}

interface TransactionFilters {
  type: string
  status: string
  dateRange: string
  minAmount: string
  maxAmount: string
  userRole: string
}

const AdminTransactionManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<TransactionFilters>({
    type: 'all',
    status: 'all',
    dateRange: 'all',
    minAmount: '',
    maxAmount: '',
    userRole: 'all'
  })
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
  const [showTransactionModal, setShowTransactionModal] = useState(false)
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Calculate transaction statistics
  const totalTransactions = mockTransactions.length
  const totalVolume = mockTransactions.reduce((sum, t) => {
    if (t.status === 'completed') {
      return sum + t.amount
    }
    return sum
  }, 0)
  const successRate = Math.round((mockTransactions.filter(t => t.status === 'completed').length / totalTransactions) * 100)
  const averageAmount = Math.round(totalVolume / mockTransactions.filter(t => t.status === 'completed').length)

  // Filter transactions
  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = searchQuery === '' || 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (transaction.reference && transaction.reference.toLowerCase().includes(searchQuery.toLowerCase())) ||
      getUserDisplayName(mockUsers.find(u => u.id === transaction.user_id) || {} as any).toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesType = filters.type === 'all' || transaction.type === filters.type
    const matchesStatus = filters.status === 'all' || transaction.status === filters.status
    
    // User role filtering
    let matchesUserRole = true
    if (filters.userRole !== 'all') {
      const user = mockUsers.find(u => u.id === transaction.user_id)
      matchesUserRole = user ? user.role === filters.userRole : false
    }
    
    // Date range filtering
    let matchesDateRange = true
    if (filters.dateRange !== 'all') {
      const transactionDate = new Date(transaction.created_at)
      const now = new Date()
      
      if (filters.dateRange === 'today') {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        matchesDateRange = transactionDate >= today
      } else if (filters.dateRange === 'yesterday') {
        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        yesterday.setHours(0, 0, 0, 0)
        
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        
        matchesDateRange = transactionDate >= yesterday && transactionDate < today
      } else if (filters.dateRange === 'last7days') {
        const last7Days = new Date()
        last7Days.setDate(last7Days.getDate() - 7)
        matchesDateRange = transactionDate >= last7Days
      } else if (filters.dateRange === 'last30days') {
        const last30Days = new Date()
        last30Days.setDate(last30Days.getDate() - 30)
        matchesDateRange = transactionDate >= last30Days
      }
    }
    
    // Amount range filtering
    let matchesAmount = true
    if (filters.minAmount && !isNaN(parseFloat(filters.minAmount))) {
      matchesAmount = transaction.amount >= parseFloat(filters.minAmount)
    }
    if (filters.maxAmount && !isNaN(parseFloat(filters.maxAmount))) {
      matchesAmount = matchesAmount && transaction.amount <= parseFloat(filters.maxAmount)
    }
    
    return matchesSearch && matchesType && matchesStatus && matchesUserRole && matchesDateRange && matchesAmount
  })

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'date':
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
        break
      case 'amount':
        aValue = a.amount
        bValue = b.amount
        break
      case 'status':
        aValue = a.status
        bValue = b.status
        break
      case 'type':
        aValue = a.type
        bValue = b.type
        break
      default:
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  // Pagination
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage)
  const paginatedTransactions = sortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleFilterChange = (name: keyof TransactionFilters, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
    setCurrentPage(1) // Reset to first page when filters change
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-gray-500" />
      case 'refunded':
        return <ArrowDownRight className="w-5 h-5 text-blue-500" />
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
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      case 'refunded':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'credit':
        return <ArrowDownRight className="w-5 h-5 text-green-500" />
      case 'debit':
        return <ArrowUpRight className="w-5 h-5 text-red-500" />
      case 'refund':
        return <ArrowDownRight className="w-5 h-5 text-blue-500" />
      case 'fee':
        return <DollarSign className="w-5 h-5 text-orange-500" />
      case 'subscription':
        return <CreditCard className="w-5 h-5 text-purple-500" />
      default:
        return <Wallet className="w-5 h-5 text-gray-500" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'credit':
        return 'bg-green-100 text-green-800'
      case 'debit':
        return 'bg-red-100 text-red-800'
      case 'refund':
        return 'bg-blue-100 text-blue-800'
      case 'fee':
        return 'bg-orange-100 text-orange-800'
      case 'subscription':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatCurrency = (amount: number, currency: string) => {
    const currencySymbol = currency === 'NGN' ? '₦' : currency === 'USD' ? '$' : currency
    return `${currencySymbol}${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Transaction Management</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all financial transactions across the platform</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Transactions
          </button>
          <button 
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            {showAdvancedFilters ? 'Hide Filters' : 'Advanced Filters'}
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Transactions',
            value: totalTransactions.toLocaleString(),
            icon: Wallet,
            color: 'bg-blue-500',
            description: 'All transactions'
          },
          {
            title: 'Total Volume',
            value: formatCurrency(totalVolume, 'NGN'),
            icon: BarChart3,
            color: 'bg-green-500',
            description: 'Completed transactions'
          },
          {
            title: 'Success Rate',
            value: `${successRate}%`,
            icon: CheckCircle,
            color: 'bg-purple-500',
            description: 'Completion rate'
          },
          {
            title: 'Average Amount',
            value: formatCurrency(averageAmount, 'NGN'),
            icon: TrendingUp,
            color: 'bg-orange-500',
            description: 'Per transaction'
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

      {/* Search and Basic Filters */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Types</option>
              <option value="credit">Credit</option>
              <option value="debit">Debit</option>
              <option value="refund">Refund</option>
              <option value="fee">Fee</option>
              <option value="subscription">Subscription</option>
            </select>
            
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
            
            <select 
              value={filters.userRole}
              onChange={(e) => handleFilterChange('userRole', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All User Roles</option>
              <option value="individual">Individual</option>
              <option value="organisation">Organisation</option>
              <option value="admin">Admin</option>
            </select>
            
            <select 
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
            </select>
            
            <button 
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
            >
              <Filter className="w-4 h-4 mr-2" />
              {showAdvancedFilters ? 'Hide' : 'More'}
            </button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        {showAdvancedFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                  <input
                    type="number"
                    value={filters.minAmount}
                    onChange={(e) => handleFilterChange('minAmount', e.target.value)}
                    placeholder="Min amount"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">₦</span>
                  <input
                    type="number"
                    value={filters.maxAmount}
                    onChange={(e) => handleFilterChange('maxAmount', e.target.value)}
                    placeholder="Max amount"
                    className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-end">
                <button 
                  onClick={() => {
                    setFilters({
                      type: 'all',
                      status: 'all',
                      dateRange: 'all',
                      userRole: 'all',
                      minAmount: '',
                      maxAmount: ''
                    })
                    setSearchQuery('')
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('date')}
                >
                  <div className="flex items-center">
                    <span>Date</span>
                    {sortBy === 'date' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('type')}
                >
                  <div className="flex items-center">
                    <span>Type</span>
                    {sortBy === 'type' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('amount')}
                >
                  <div className="flex items-center">
                    <span>Amount</span>
                    {sortBy === 'amount' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center">
                    <span>Status</span>
                    {sortBy === 'status' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedTransactions.map((transaction) => {
                const user = mockUsers.find(u => u.id === transaction.user_id)
                return (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(transaction.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                          {user?.role === 'organisation' ? (
                            <Building className="w-4 h-4 text-white" />
                          ) : (
                            <User className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user ? getUserDisplayName(user) : 'Unknown User'}
                          </div>
                          <div className="text-xs text-gray-500 capitalize">
                            {user?.role || 'Unknown'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {transaction.description}
                      {transaction.reference && (
                        <div className="text-xs text-gray-500">
                          Ref: {transaction.reference}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(transaction.type)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(transaction.type)}`}>
                          {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={transaction.type === 'credit' || transaction.type === 'refund' ? 'text-green-600' : 'text-gray-900'}>
                        {formatCurrency(transaction.amount, transaction.currency)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(transaction.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedTransaction(transaction)
                            setShowTransactionModal(true)
                          }}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        
        {paginatedTransactions.length === 0 && (
          <div className="text-center py-12">
            <Wallet className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length} transactions
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-700">
                Page {currentPage} of {totalPages}
              </span>
              <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Detail Modal */}
      {showTransactionModal && selectedTransaction && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
                <button 
                  onClick={() => setShowTransactionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Transaction Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getTypeIcon(selectedTransaction.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 capitalize">{selectedTransaction.type} Transaction</h3>
                      <p className="text-gray-600">{selectedTransaction.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedTransaction.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTransaction.status)}`}>
                      {selectedTransaction.status.charAt(0).toUpperCase() + selectedTransaction.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">Amount</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatCurrency(selectedTransaction.amount, selectedTransaction.currency)}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date</p>
                    <p className="font-medium text-gray-900">{new Date(selectedTransaction.created_at).toLocaleString()}</p>
                  </div>
                  {selectedTransaction.processed_at && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Processed Date</p>
                      <p className="font-medium text-gray-900">{new Date(selectedTransaction.processed_at).toLocaleString()}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Description</p>
                    <p className="font-medium text-gray-900">{selectedTransaction.description}</p>
                  </div>
                  {selectedTransaction.reference && (
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Reference</p>
                      <p className="font-medium text-gray-900">{selectedTransaction.reference}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* User Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">User Information</h3>
                <div className="p-4 border border-gray-200 rounded-lg">
                  {(() => {
                    const user = mockUsers.find(u => u.id === selectedTransaction.user_id)
                    if (!user) return <p className="text-gray-500">User information not available</p>
                    
                    return (
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                          {user.role === 'organisation' ? (
                            <Building className="w-6 h-6 text-white" />
                          ) : (
                            <User className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{getUserDisplayName(user)}</p>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                        </div>
                      </div>
                    )
                  })()}
                </div>
              </div>

              {/* Payment Details */}
              {(selectedTransaction.payment_method || selectedTransaction.payment_provider || selectedTransaction.external_transaction_id) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Payment Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTransaction.payment_method && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Payment Method</p>
                        <p className="font-medium text-gray-900">{selectedTransaction.payment_method}</p>
                      </div>
                    )}
                    {selectedTransaction.payment_provider && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Payment Provider</p>
                        <p className="font-medium text-gray-900">{selectedTransaction.payment_provider}</p>
                      </div>
                    )}
                    {selectedTransaction.external_transaction_id && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">External Transaction ID</p>
                        <p className="font-medium text-gray-900">{selectedTransaction.external_transaction_id}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Related Information */}
              {(selectedTransaction.verification_request_id || selectedTransaction.related_user_id) && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-4">Related Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedTransaction.verification_request_id && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Verification Request</p>
                        <p className="font-medium text-gray-900">{selectedTransaction.verification_request_id}</p>
                      </div>
                    )}
                    {selectedTransaction.related_user_id && (
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-sm text-gray-500 mb-1">Related User</p>
                        {(() => {
                          const relatedUser = mockUsers.find(u => u.id === selectedTransaction.related_user_id)
                          return (
                            <p className="font-medium text-gray-900">
                              {relatedUser ? getUserDisplayName(relatedUser) : selectedTransaction.related_user_id}
                            </p>
                          )
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowTransactionModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Details
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
            <h3 className="text-lg font-semibold text-blue-900 mb-2">About Transaction Management</h3>
            <p className="text-blue-700 mb-4">
              This dashboard provides a comprehensive view of all financial transactions across the platform.
              You can monitor payment flows, identify issues, and ensure financial integrity of the system.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Audit Trail</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Complete record of all financial activities
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Fraud Detection</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Identify suspicious transaction patterns
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Reconciliation</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Match internal records with payment providers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminTransactionManagement