import React, { useState } from 'react'
import { 
  Building, 
  Search, 
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
  Shield, 
  Lock, 
  Unlock, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Star, 
  ArrowUpRight, 
  X, 
  Save, 
  RefreshCw,
  AlertTriangle,
  FileText,
  Users,
  UserCheck,
  Award,
  Settings,
  Globe,
  MapPin,
  Briefcase,
  FileSpreadsheet,
  BarChart3
} from 'lucide-react'
import { mockUsers } from '../lib/mockData'

interface OrganisationFilters {
  status: string
  industry: string
  trustScore: string
  kycStatus: string
}

const AdminOrganisationManagement = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState<OrganisationFilters>({
    status: 'all',
    industry: 'all',
    trustScore: 'all',
    kycStatus: 'all'
  })
  const [selectedOrg, setSelectedOrg] = useState<any | null>(null)
  const [showOrgModal, setShowOrgModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Filter organisations from mockUsers
  const organisations = mockUsers.filter(user => user.role === 'organisation')

  // Filter and sort organisations
  const filteredOrgs = organisations.filter(org => {
    const matchesSearch = searchQuery === '' || 
      (org.company_name && org.company_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      org.email.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = filters.status === 'all' || (filters.status === 'active' ? org.is_active : !org.is_active)
    
    const matchesIndustry = filters.industry === 'all' || 
      (org.industry && org.industry.toLowerCase() === filters.industry.toLowerCase())
    
    const matchesTrustScore = filters.trustScore === 'all' || 
      (filters.trustScore === 'high' && org.trust_score >= 80) ||
      (filters.trustScore === 'medium' && org.trust_score >= 50 && org.trust_score < 80) ||
      (filters.trustScore === 'low' && org.trust_score < 50)
    
    const matchesKycStatus = filters.kycStatus === 'all' || org.kyc_status === filters.kycStatus
    
    return matchesSearch && matchesStatus && matchesIndustry && matchesTrustScore && matchesKycStatus
  }).sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'name':
        aValue = a.company_name?.toLowerCase() || ''
        bValue = b.company_name?.toLowerCase() || ''
        break
      case 'email':
        aValue = a.email.toLowerCase()
        bValue = b.email.toLowerCase()
        break
      case 'industry':
        aValue = a.industry?.toLowerCase() || ''
        bValue = b.industry?.toLowerCase() || ''
        break
      case 'trustScore':
        aValue = a.trust_score
        bValue = b.trust_score
        break
      case 'created':
        aValue = new Date(a.created_at)
        bValue = new Date(b.created_at)
        break
      default:
        aValue = a.id
        bValue = b.id
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const handleFilterChange = (name: keyof OrganisationFilters, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }))
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const handleSaveOrg = async () => {
    if (!selectedOrg) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would update the organisation in the database
      console.log('Saving organisation:', selectedOrg)
      
      setShowOrgModal(false)
      setSelectedOrg(null)
    } catch (error) {
      console.error('Error saving organisation:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteOrg = async () => {
    if (!selectedOrg) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, this would delete the organisation from the database
      console.log('Deleting organisation:', selectedOrg.id)
      
      setShowDeleteModal(false)
      setSelectedOrg(null)
    } catch (error) {
      console.error('Error deleting organisation:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: boolean) => {
    return status
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
  }

  const getKycStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getTrustScoreBadge = (score: number) => {
    if (score >= 80) return 'bg-green-500 text-white'
    if (score >= 50) return 'bg-yellow-500 text-white'
    return 'bg-red-500 text-white'
  }

  // Get unique industries for filter
  const industries = Array.from(new Set(organisations.map(org => org.industry).filter(Boolean)))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organisation Management</h1>
          <p className="text-gray-600 mt-1">Manage all organisation accounts and their verification status</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Organisation
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Organisations',
            value: organisations.length,
            icon: Building,
            color: 'bg-blue-500',
            description: 'All registered organisations'
          },
          {
            title: 'Active Organisations',
            value: organisations.filter(org => org.is_active).length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Currently active'
          },
          {
            title: 'Pending Verification',
            value: organisations.filter(org => org.kyc_status === 'pending' || org.kyc_status === 'in_progress').length,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting verification'
          },
          {
            title: 'Avg. Trust Score',
            value: Math.round(organisations.reduce((sum, org) => sum + org.trust_score, 0) / organisations.length),
            icon: Star,
            color: 'bg-purple-500',
            description: 'Average score'
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
                placeholder="Search organisations by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <select 
              value={filters.industry}
              onChange={(e) => handleFilterChange('industry', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Industries</option>
              {industries.map((industry, index) => (
                <option key={index} value={industry}>{industry}</option>
              ))}
            </select>
            
            <select 
              value={filters.trustScore}
              onChange={(e) => handleFilterChange('trustScore', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Trust Scores</option>
              <option value="high">High (80+)</option>
              <option value="medium">Medium (50-79)</option>
              <option value="low">Low (0-49)</option>
            </select>
            
            <select 
              value={filters.kycStatus}
              onChange={(e) => handleFilterChange('kycStatus', e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All KYC Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Organisations Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    <span>Organisation</span>
                    {sortBy === 'name' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('industry')}
                >
                  <div className="flex items-center">
                    <span>Industry</span>
                    {sortBy === 'industry' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    <span>Contact</span>
                    {sortBy === 'email' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KYC Status
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('trustScore')}
                >
                  <div className="flex items-center">
                    <span>Trust Score</span>
                    {sortBy === 'trustScore' && (
                      <span className="ml-1">
                        {sortOrder === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
                <th 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('created')}
                >
                  <div className="flex items-center">
                    <span>Created</span>
                    {sortBy === 'created' && (
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
              {filteredOrgs.map((org) => (
                <tr key={org.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <Building className="w-5 h-5 text-white" />
                      </div>
                      <div className="text-sm font-medium text-gray-900">
                        {org.company_name || 'Unnamed Organisation'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {org.industry || 'Not specified'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div>
                      <p>{org.email}</p>
                      {org.phone && <p className="text-xs">{org.phone}</p>}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {org.is_active ? (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-500" />
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(org.is_active)}`}>
                        {org.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKycStatusBadge(org.kyc_status)}`}>
                      {org.kyc_status.replace('_', ' ').charAt(0).toUpperCase() + org.kyc_status.replace('_', ' ').slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${getTrustScoreBadge(org.trust_score)}`}>
                      {org.trust_score}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(org.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => {
                          setSelectedOrg(org)
                          setShowOrgModal(true)
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedOrg(org)
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
        
        {filteredOrgs.length === 0 && (
          <div className="text-center py-12">
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No organisations found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>

      {/* Organisation Detail Modal */}
      {showOrgModal && selectedOrg && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Organisation Details</h2>
                <button 
                  onClick={() => setShowOrgModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Organisation Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <Building className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">
                      {selectedOrg.company_name || 'Unnamed Organisation'}
                    </h3>
                    <p className="text-gray-600">{selectedOrg.email}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(selectedOrg.is_active)}`}>
                        {selectedOrg.is_active ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-sm text-gray-500">
                        Industry: {selectedOrg.industry || 'Not specified'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 mb-1">Trust Score</div>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold ml-auto ${getTrustScoreBadge(selectedOrg.trust_score)}`}>
                      {selectedOrg.trust_score}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Phone</p>
                    <p className="font-medium text-gray-900">{selectedOrg.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Created</p>
                    <p className="font-medium text-gray-900">{new Date(selectedOrg.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Login</p>
                    <p className="font-medium text-gray-900">
                      {selectedOrg.last_login_at ? new Date(selectedOrg.last_login_at).toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification Status */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Verification Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">KYC Status</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKycStatusBadge(selectedOrg.kyc_status)}`}>
                        {selectedOrg.kyc_status.replace('_', ' ').charAt(0).toUpperCase() + selectedOrg.kyc_status.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Review Documents
                      </button>
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Update Status
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-gray-900">Account Status</p>
                      <button className={`px-3 py-1 rounded-lg text-sm font-medium ${
                        selectedOrg.is_active ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedOrg.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedOrg.is_active 
                        ? 'Organisation can currently log in and use the platform' 
                        : 'Organisation is currently prevented from logging in'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Verification Documents */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Verification Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { type: 'Certificate of Incorporation', status: 'verified', icon: FileText, date: '2024-01-15' },
                    { type: 'Tax Clearance Certificate', status: 'verified', icon: FileSpreadsheet, date: '2024-01-16' },
                    { type: 'Business Registration', status: 'pending', icon: Building, date: 'N/A' },
                    { type: 'Proof of Address', status: 'verified', icon: MapPin, date: '2024-01-15' }
                  ].map((doc, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <doc.icon className="w-5 h-5 text-gray-600" />
                        <p className="font-medium text-gray-900">{doc.type}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getKycStatusBadge(doc.status)}`}>
                          {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {doc.date !== 'N/A' ? `Verified: ${doc.date}` : 'Not verified'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Usage Statistics */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Platform Usage</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      <p className="font-medium text-gray-900">Verifications</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">156</p>
                    <p className="text-xs text-gray-500">Total verifications requested</p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Users className="w-5 h-5 text-green-600" />
                      <p className="font-medium text-gray-900">Staff</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">5</p>
                    <p className="text-xs text-gray-500">Active staff members</p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <BarChart3 className="w-5 h-5 text-purple-600" />
                      <p className="font-medium text-gray-900">API Usage</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">2,847</p>
                    <p className="text-xs text-gray-500">API calls this month</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => {
                    setShowOrgModal(false)
                    setSelectedOrg(null)
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => {
                    setShowOrgModal(false)
                    setShowDeleteModal(true)
                  }}
                  className="border border-red-300 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete Organisation
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Organisation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedOrg && (
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
                    You are about to permanently delete this organisation and all associated data.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700">
                Are you sure you want to delete the organisation <span className="font-medium">{selectedOrg.company_name || selectedOrg.email}</span>?
              </p>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteOrg}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  Delete Organisation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminOrganisationManagement