import React, { useState } from 'react'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Edit,
  Trash2,
  Eye,
  Mail,
  Phone,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Building,
  Award,
  Settings,
  MoreHorizontal,
  UserPlus,
  UserMinus,
  Send,
  FileText,
  Key,
  Lock,
  Unlock,
  RefreshCw,
  Bell,
  Star,
  Target,
  BarChart3,
  TrendingUp,
  X,
  Save,
  Camera,
  MapPin,
  Globe,
  Briefcase,
  GraduationCap
} from 'lucide-react'

interface StaffMember {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  position: string
  department: string
  employeeId: string
  startDate: string
  status: 'active' | 'inactive' | 'pending' | 'suspended'
  role: 'admin' | 'manager' | 'staff' | 'viewer'
  verificationStatus: 'verified' | 'pending' | 'failed' | 'not_started'
  trustScore: number
  lastLogin: string
  permissions: string[]
  avatar?: string
}

const StaffManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'roles' | 'invitations'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedRole, setSelectedRole] = useState('all')
  const [showAddStaffModal, setShowAddStaffModal] = useState(false)
  const [showEditStaffModal, setShowEditStaffModal] = useState(false)
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null)
  const [loading, setLoading] = useState(false)

  const [newStaffData, setNewStaffData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    department: '',
    role: 'staff' as 'admin' | 'manager' | 'staff' | 'viewer',
    startDate: '',
    permissions: [] as string[]
  })

  // Mock staff data
  const staffMembers: StaffMember[] = [
    {
      id: '1',
      firstName: 'Sarah',
      lastName: 'Johnson',
      email: 'sarah.johnson@techcorp.com',
      phone: '+234-801-234-5678',
      position: 'HR Manager',
      department: 'Human Resources',
      employeeId: 'TC001',
      startDate: '2023-01-15',
      status: 'active',
      role: 'manager',
      verificationStatus: 'verified',
      trustScore: 92,
      lastLogin: '2024-01-20T14:30:00Z',
      permissions: ['manage_staff', 'view_reports', 'bulk_upload']
    },
    {
      id: '2',
      firstName: 'Michael',
      lastName: 'Chen',
      email: 'michael.chen@techcorp.com',
      phone: '+234-801-234-5679',
      position: 'Software Engineer',
      department: 'Engineering',
      employeeId: 'TC002',
      startDate: '2023-03-20',
      status: 'active',
      role: 'staff',
      verificationStatus: 'verified',
      trustScore: 88,
      lastLogin: '2024-01-20T09:15:00Z',
      permissions: ['view_own_data']
    },
    {
      id: '3',
      firstName: 'David',
      lastName: 'Wilson',
      email: 'david.wilson@techcorp.com',
      phone: '+234-801-234-5680',
      position: 'Product Manager',
      department: 'Product',
      employeeId: 'TC003',
      startDate: '2023-06-10',
      status: 'active',
      role: 'manager',
      verificationStatus: 'pending',
      trustScore: 75,
      lastLogin: '2024-01-19T16:45:00Z',
      permissions: ['manage_products', 'view_reports']
    },
    {
      id: '4',
      firstName: 'Amanda',
      lastName: 'Foster',
      email: 'amanda.foster@techcorp.com',
      phone: '+234-801-234-5681',
      position: 'Marketing Specialist',
      department: 'Marketing',
      employeeId: 'TC004',
      startDate: '2023-09-05',
      status: 'inactive',
      role: 'staff',
      verificationStatus: 'failed',
      trustScore: 45,
      lastLogin: '2024-01-15T11:20:00Z',
      permissions: ['view_own_data']
    },
    {
      id: '5',
      firstName: 'James',
      lastName: 'Brown',
      email: 'james.brown@techcorp.com',
      phone: '+234-801-234-5682',
      position: 'Finance Director',
      department: 'Finance',
      employeeId: 'TC005',
      startDate: '2022-11-01',
      status: 'active',
      role: 'admin',
      verificationStatus: 'verified',
      trustScore: 96,
      lastLogin: '2024-01-20T13:10:00Z',
      permissions: ['full_access', 'manage_billing', 'manage_staff', 'view_reports']
    }
  ]

  const departments = ['Human Resources', 'Engineering', 'Product', 'Marketing', 'Finance', 'Sales', 'Operations']
  const roles = ['admin', 'manager', 'staff', 'viewer']
  const permissions = [
    'full_access',
    'manage_staff',
    'manage_billing',
    'view_reports',
    'bulk_upload',
    'manage_products',
    'view_own_data'
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'inactive':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'suspended':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'suspended':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'not_started':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'manager':
        return 'bg-blue-100 text-blue-800'
      case 'staff':
        return 'bg-gray-100 text-gray-800'
      case 'viewer':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredStaff = staffMembers.filter(staff => {
    const matchesSearch = searchQuery === '' || 
      staff.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDepartment = selectedDepartment === 'all' || staff.department === selectedDepartment
    const matchesStatus = selectedStatus === 'all' || staff.status === selectedStatus
    const matchesRole = selectedRole === 'all' || staff.role === selectedRole
    
    return matchesSearch && matchesDepartment && matchesStatus && matchesRole
  })

  const handleAddStaff = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Adding new staff member:', newStaffData)
      setShowAddStaffModal(false)
      setNewStaffData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        role: 'staff',
        startDate: '',
        permissions: []
      })
    } catch (error) {
      console.error('Error adding staff:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditStaff = async () => {
    if (!selectedStaff) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      console.log('Updating staff member:', selectedStaff)
      setShowEditStaffModal(false)
      setSelectedStaff(null)
    } catch (error) {
      console.error('Error updating staff:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">Manage team members and their roles within your organization</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Import Staff
          </button>
          <button 
            onClick={() => setShowAddStaffModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Staff Member
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Staff',
            value: staffMembers.length,
            icon: Users,
            color: 'bg-blue-500',
            description: 'All team members'
          },
          {
            title: 'Active Members',
            value: staffMembers.filter(s => s.status === 'active').length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Currently active'
          },
          {
            title: 'Pending Verification',
            value: staffMembers.filter(s => s.verificationStatus === 'pending').length,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting verification'
          },
          {
            title: 'Avg Trust Score',
            value: Math.round(staffMembers.reduce((sum, s) => sum + s.trustScore, 0) / staffMembers.length),
            icon: Shield,
            color: 'bg-purple-500',
            description: 'Team average'
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
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'staff', label: 'Staff Directory', icon: Users, count: staffMembers.length },
            { id: 'roles', label: 'Roles & Permissions', icon: Shield },
            { id: 'invitations', label: 'Pending Invitations', icon: Mail, count: 3 }
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
          {/* Department Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Department Breakdown</h3>
            
            <div className="space-y-4">
              {departments.map((dept, index) => {
                const deptCount = staffMembers.filter(s => s.department === dept).length
                const percentage = (deptCount / staffMembers.length) * 100
                
                return (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Building className="w-5 h-5 text-gray-600" />
                      <span className="text-sm text-gray-700">{dept}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{deptCount}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            
            <div className="space-y-4">
              {[
                {
                  action: 'Sarah Johnson updated profile',
                  time: '2 hours ago',
                  icon: Edit,
                  color: 'text-blue-500'
                },
                {
                  action: 'Michael Chen completed verification',
                  time: '5 hours ago',
                  icon: CheckCircle,
                  color: 'text-green-500'
                },
                {
                  action: 'New staff member invited',
                  time: '1 day ago',
                  icon: UserPlus,
                  color: 'text-purple-500'
                },
                {
                  action: 'David Wilson role updated',
                  time: '2 days ago',
                  icon: Shield,
                  color: 'text-orange-500'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <activity.icon className={`w-5 h-5 ${activity.color} mt-0.5`} />
                  <div>
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'staff' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search staff members..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                  <option value="suspended">Suspended</option>
                </select>
                
                <select 
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                  ))}
                </select>
                
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Staff Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Staff Member
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position & Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Trust Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Login
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredStaff.map((staff) => (
                    <tr key={staff.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {staff.firstName} {staff.lastName}
                            </div>
                            <div className="text-sm text-gray-500">{staff.email}</div>
                            <div className="text-xs text-gray-400">{staff.employeeId}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{staff.position}</div>
                        <div className="text-sm text-gray-500">{staff.department}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(staff.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(staff.status)}`}>
                            {staff.status.charAt(0).toUpperCase() + staff.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(staff.role)}`}>
                          {staff.role.charAt(0).toUpperCase() + staff.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getVerificationStatusColor(staff.verificationStatus)}`}>
                          {staff.verificationStatus.replace('_', ' ').charAt(0).toUpperCase() + staff.verificationStatus.replace('_', ' ').slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
                          staff.trustScore >= 80 ? 'bg-green-500 text-white' :
                          staff.trustScore >= 60 ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {staff.trustScore}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(staff.lastLogin).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedStaff(staff)
                              setShowEditStaffModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-900 flex items-center"
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Edit
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

      {activeTab === 'roles' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Role Definitions</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  role: 'Admin',
                  description: 'Full access to all features and settings',
                  permissions: ['Full Access', 'Manage Staff', 'Manage Billing', 'View Reports'],
                  count: staffMembers.filter(s => s.role === 'admin').length,
                  color: 'bg-purple-100 text-purple-800'
                },
                {
                  role: 'Manager',
                  description: 'Manage team members and view reports',
                  permissions: ['Manage Staff', 'View Reports', 'Bulk Upload'],
                  count: staffMembers.filter(s => s.role === 'manager').length,
                  color: 'bg-blue-100 text-blue-800'
                },
                {
                  role: 'Staff',
                  description: 'Standard access for team members',
                  permissions: ['View Own Data'],
                  count: staffMembers.filter(s => s.role === 'staff').length,
                  color: 'bg-gray-100 text-gray-800'
                },
                {
                  role: 'Viewer',
                  description: 'Read-only access to assigned data',
                  permissions: ['View Assigned Data'],
                  count: staffMembers.filter(s => s.role === 'viewer').length,
                  color: 'bg-green-100 text-green-800'
                }
              ].map((roleInfo, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-semibold text-gray-900">{roleInfo.role}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${roleInfo.color}`}>
                      {roleInfo.count} members
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{roleInfo.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-700">Permissions:</p>
                    <div className="flex flex-wrap gap-2">
                      {roleInfo.permissions.map((permission, permIndex) => (
                        <span key={permIndex} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                          {permission}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'invitations' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Pending Invitations</h3>
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
              <Send className="w-4 h-4 mr-2" />
              Send Invitation
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              {
                email: 'john.smith@example.com',
                role: 'Software Engineer',
                department: 'Engineering',
                sentDate: '2024-01-18',
                status: 'pending'
              },
              {
                email: 'lisa.wong@example.com',
                role: 'UX Designer',
                department: 'Product',
                sentDate: '2024-01-17',
                status: 'pending'
              },
              {
                email: 'robert.davis@example.com',
                role: 'Sales Manager',
                department: 'Sales',
                sentDate: '2024-01-16',
                status: 'expired'
              }
            ].map((invitation, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <Mail className="w-8 h-8 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900">{invitation.email}</p>
                    <p className="text-sm text-gray-600">{invitation.role} • {invitation.department}</p>
                    <p className="text-xs text-gray-500">Sent on {new Date(invitation.sentDate).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    invitation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {invitation.status.charAt(0).toUpperCase() + invitation.status.slice(1)}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      Resend
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Staff Modal */}
      {showAddStaffModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Staff Member</h2>
                <button 
                  onClick={() => setShowAddStaffModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={newStaffData.firstName}
                    onChange={(e) => setNewStaffData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={newStaffData.lastName}
                    onChange={(e) => setNewStaffData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={newStaffData.email}
                    onChange={(e) => setNewStaffData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={newStaffData.phone}
                    onChange={(e) => setNewStaffData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    value={newStaffData.position}
                    onChange={(e) => setNewStaffData(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={newStaffData.department}
                    onChange={(e) => setNewStaffData(prev => ({ ...prev, department: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <select
                    value={newStaffData.role}
                    onChange={(e) => setNewStaffData(prev => ({ ...prev, role: e.target.value as any }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={newStaffData.startDate}
                    onChange={(e) => setNewStaffData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                  {permissions.map(permission => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newStaffData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setNewStaffData(prev => ({
                              ...prev,
                              permissions: [...prev.permissions, permission]
                            }))
                          } else {
                            setNewStaffData(prev => ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission)
                            }))
                          }
                        }}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddStaffModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddStaff}
                  disabled={loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add Staff Member
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Staff Modal */}
      {showEditStaffModal && selectedStaff && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Staff Member</h2>
                <button 
                  onClick={() => setShowEditStaffModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input
                    type="text"
                    value={selectedStaff.firstName}
                    onChange={(e) => setSelectedStaff(prev => prev ? ({ ...prev, firstName: e.target.value }) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input
                    type="text"
                    value={selectedStaff.lastName}
                    onChange={(e) => setSelectedStaff(prev => prev ? ({ ...prev, lastName: e.target.value }) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                  <input
                    type="text"
                    value={selectedStaff.position}
                    onChange={(e) => setSelectedStaff(prev => prev ? ({ ...prev, position: e.target.value }) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={selectedStaff.department}
                    onChange={(e) => setSelectedStaff(prev => prev ? ({ ...prev, department: e.target.value }) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role *</label>
                  <select
                    value={selectedStaff.role}
                    onChange={(e) => setSelectedStaff(prev => prev ? ({ ...prev, role: e.target.value as any }) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>{role.charAt(0).toUpperCase() + role.slice(1)}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={selectedStaff.status}
                    onChange={(e) => setSelectedStaff(prev => prev ? ({ ...prev, status: e.target.value as any }) : null)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Permissions</label>
                <div className="grid grid-cols-2 gap-3">
                  {permissions.map(permission => (
                    <label key={permission} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedStaff.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedStaff(prev => prev ? ({
                              ...prev,
                              permissions: [...prev.permissions, permission]
                            }) : null)
                          } else {
                            setSelectedStaff(prev => prev ? ({
                              ...prev,
                              permissions: prev.permissions.filter(p => p !== permission)
                            }) : null)
                          }
                        }}
                        className="text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {permission.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowEditStaffModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditStaff}
                  disabled={loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
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
    </div>
  )
}

export default StaffManagement