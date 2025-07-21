import React, { useState } from 'react'
import { 
  Globe, 
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
  MapPin,
  Building,
  BarChart3,
  TrendingUp,
  Flag
} from 'lucide-react'

interface Region {
  id: string
  name: string
  code: string
  country: string
  status: 'active' | 'inactive'
  adminCount: number
  userCount: number
  organisationCount: number
  verificationCount: number
  createdAt: string
  lastUpdated: string
}

interface RegionalAdmin {
  id: string
  name: string
  email: string
  region: string
  role: string
  status: 'active' | 'inactive'
  lastLogin: string
}

const RegionalManagement = () => {
  const [activeTab, setActiveTab] = useState<'regions' | 'admins' | 'metrics'>('regions')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showAddRegionModal, setShowAddRegionModal] = useState(false)
  const [showEditRegionModal, setShowEditRegionModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock regions data
  const regions: Region[] = [
    {
      id: '1',
      name: 'West Africa',
      code: 'WA',
      country: 'Nigeria, Ghana, Ivory Coast',
      status: 'active',
      adminCount: 3,
      userCount: 4250,
      organisationCount: 156,
      verificationCount: 12450,
      createdAt: '2023-06-15',
      lastUpdated: '2024-01-20'
    },
    {
      id: '2',
      name: 'East Africa',
      code: 'EA',
      country: 'Kenya, Tanzania, Uganda',
      status: 'active',
      adminCount: 2,
      userCount: 3180,
      organisationCount: 124,
      verificationCount: 9870,
      createdAt: '2023-07-10',
      lastUpdated: '2024-01-18'
    },
    {
      id: '3',
      name: 'Southern Africa',
      code: 'SA',
      country: 'South Africa, Botswana, Zimbabwe',
      status: 'active',
      adminCount: 2,
      userCount: 2950,
      organisationCount: 118,
      verificationCount: 8640,
      createdAt: '2023-08-05',
      lastUpdated: '2024-01-15'
    },
    {
      id: '4',
      name: 'North Africa',
      code: 'NA',
      country: 'Egypt, Morocco, Tunisia',
      status: 'inactive',
      adminCount: 1,
      userCount: 1850,
      organisationCount: 87,
      verificationCount: 5320,
      createdAt: '2023-09-20',
      lastUpdated: '2023-12-10'
    }
  ]

  // Mock regional admins data
  const regionalAdmins: RegionalAdmin[] = [
    {
      id: '1',
      name: 'Oluwaseun Adebayo',
      email: 'oluwaseun.a@idcertify.com',
      region: 'West Africa',
      role: 'Regional Manager',
      status: 'active',
      lastLogin: '2024-01-20'
    },
    {
      id: '2',
      name: 'Amina Kimani',
      email: 'amina.k@idcertify.com',
      region: 'East Africa',
      role: 'Regional Manager',
      status: 'active',
      lastLogin: '2024-01-19'
    },
    {
      id: '3',
      name: 'Thabo Nkosi',
      email: 'thabo.n@idcertify.com',
      region: 'Southern Africa',
      role: 'Regional Manager',
      status: 'active',
      lastLogin: '2024-01-18'
    },
    {
      id: '4',
      name: 'Mohammed Hassan',
      email: 'mohammed.h@idcertify.com',
      region: 'North Africa',
      role: 'Regional Manager',
      status: 'inactive',
      lastLogin: '2023-12-05'
    },
    {
      id: '5',
      name: 'Chioma Okonkwo',
      email: 'chioma.o@idcertify.com',
      region: 'West Africa',
      role: 'Verification Specialist',
      status: 'active',
      lastLogin: '2024-01-20'
    },
    {
      id: '6',
      name: 'Daniel Mwangi',
      email: 'daniel.m@idcertify.com',
      region: 'East Africa',
      role: 'Verification Specialist',
      status: 'active',
      lastLogin: '2024-01-17'
    }
  ]

  const getStatusBadge = (status: string) => {
    return status === 'active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800'
  }

  const getStatusIcon = (status: string) => {
    return status === 'active'
      ? <CheckCircle className="w-5 h-5 text-green-500" />
      : <XCircle className="w-5 h-5 text-red-500" />
  }

  const filteredRegions = regions.filter(region => {
    const matchesSearch = searchQuery === '' || 
      region.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      region.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || region.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const filteredAdmins = regionalAdmins.filter(admin => {
    const matchesSearch = searchQuery === '' || 
      admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      admin.region.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || admin.status === selectedStatus
    
    return matchesSearch && matchesStatus
  })

  const handleAddRegion = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowAddRegionModal(false)
    } catch (error) {
      console.error('Error adding region:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditRegion = async () => {
    if (!selectedRegion) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowEditRegionModal(false)
      setSelectedRegion(null)
    } catch (error) {
      console.error('Error updating region:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteRegion = async () => {
    if (!selectedRegion) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowDeleteModal(false)
      setSelectedRegion(null)
    } catch (error) {
      console.error('Error deleting region:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Regional Management</h1>
          <p className="text-gray-600 mt-1">Manage regional operations, administrators, and performance metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          <button 
            onClick={() => setShowAddRegionModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Region
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Regions',
            value: regions.length,
            icon: Globe,
            color: 'bg-blue-500',
            description: 'Active and inactive regions'
          },
          {
            title: 'Regional Admins',
            value: regionalAdmins.length,
            icon: Users,
            color: 'bg-green-500',
            description: 'Assigned administrators'
          },
          {
            title: 'Total Users',
            value: regions.reduce((sum, region) => sum + region.userCount, 0).toLocaleString(),
            icon: User,
            color: 'bg-purple-500',
            description: 'Across all regions'
          },
          {
            title: 'Verifications',
            value: regions.reduce((sum, region) => sum + region.verificationCount, 0).toLocaleString(),
            icon: Shield,
            color: 'bg-orange-500',
            description: 'Total processed'
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
          <button
            onClick={() => setActiveTab('regions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'regions'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Regions</span>
          </button>
          <button
            onClick={() => setActiveTab('admins')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'admins'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Regional Admins</span>
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'metrics'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Regional Metrics</span>
          </button>
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
                placeholder={activeTab === 'regions' ? "Search regions..." : "Search administrators..."}
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            
            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Regions Table */}
      {activeTab === 'regions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Countries
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Admins
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Users
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Organisations
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
                {filteredRegions.map((region) => (
                  <tr key={region.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                          <Globe className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{region.name}</div>
                          <div className="text-xs text-gray-500">Code: {region.code}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {region.country}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(region.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(region.status)}`}>
                          {region.status.charAt(0).toUpperCase() + region.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {region.adminCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {region.userCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {region.organisationCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(region.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedRegion(region)
                            setShowEditRegionModal(true)
                          }}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => {
                            setSelectedRegion(region)
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
          
          {filteredRegions.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No regions found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Regional Admins Table */}
      {activeTab === 'admins' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Administrator
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Region
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAdmins.map((admin) => (
                  <tr key={admin.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{admin.name}</div>
                          <div className="text-sm text-gray-500">{admin.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {admin.region}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {admin.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(admin.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(admin.status)}`}>
                          {admin.status.charAt(0).toUpperCase() + admin.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(admin.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
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
          
          {filteredAdmins.length === 0 && (
            <div className="text-center py-12">
              <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No administrators found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Regional Metrics */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Performance Comparison */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance Comparison</h3>
            
            <div className="space-y-6">
              {/* Verification Volume */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Verification Volume</h4>
                <div className="space-y-4">
                  {regions.map((region) => (
                    <div key={region.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <Flag className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{region.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                          <div 
                            className="h-2 rounded-full bg-primary-600"
                            style={{ width: `${(region.verificationCount / 15000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{region.verificationCount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* User Growth */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">User Growth</h4>
                <div className="space-y-4">
                  {regions.map((region) => (
                    <div key={region.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <User className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{region.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${(region.userCount / 5000) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{region.userCount.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Organisation Growth */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Organisation Growth</h4>
                <div className="space-y-4">
                  {regions.map((region) => (
                    <div key={region.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <Building className="w-5 h-5 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{region.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${(region.organisationCount / 200) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{region.organisationCount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Regional KPIs */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional KPIs</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {regions.map((region) => (
                <div key={region.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{region.name}</h4>
                        <p className="text-sm text-gray-500">{region.country}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(region.status)}`}>
                      {region.status.charAt(0).toUpperCase() + region.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Verification Success Rate</p>
                      <p className="text-lg font-bold text-gray-900">
                        {Math.round(85 + Math.random() * 10)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Avg. Processing Time</p>
                      <p className="text-lg font-bold text-gray-900">
                        {(1 + Math.random() * 2).toFixed(1)} days
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">User Retention</p>
                      <p className="text-lg font-bold text-gray-900">
                        {Math.round(70 + Math.random() * 20)}%
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Avg. Trust Score</p>
                      <p className="text-lg font-bold text-gray-900">
                        {Math.round(70 + Math.random() * 15)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Add Region Modal */}
      {showAddRegionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Region</h2>
                <button 
                  onClick={() => setShowAddRegionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Central Africa"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region Code *
                </label>
                <input
                  type="text"
                  placeholder="e.g., CA"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Countries *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Cameroon, Chad, Central African Republic"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddRegionModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddRegion}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add Region
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Region Modal */}
      {showEditRegionModal && selectedRegion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Region</h2>
                <button 
                  onClick={() => {
                    setShowEditRegionModal(false)
                    setSelectedRegion(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region Name *
                </label>
                <input
                  type="text"
                  defaultValue={selectedRegion.name}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region Code *
                </label>
                <input
                  type="text"
                  defaultValue={selectedRegion.code}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Countries *
                </label>
                <input
                  type="text"
                  defaultValue={selectedRegion.country}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select 
                  defaultValue={selectedRegion.status}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => {
                    setShowEditRegionModal(false)
                    setSelectedRegion(null)
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditRegion}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedRegion && (
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
                    Deleting this region will remove all regional settings and associations. User and organisation data will remain intact but will no longer be associated with this region.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700">
                Are you sure you want to delete the region <span className="font-medium">{selectedRegion.name}</span>?
              </p>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteRegion}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  Delete Region
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RegionalManagement