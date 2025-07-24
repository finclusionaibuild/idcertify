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
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import SettingsIcon from '@mui/icons-material/Settings';
import DescriptionIcon from '@mui/icons-material/Description';
import { mockUsers } from "@shared/lib/mockData";


const ProfileManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'fields' | 'templates' | 'settings'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedUserType, setSelectedUserType] = useState('all')
  const [showEditFieldModal, setShowEditFieldModal] = useState(false)
  const [showAddFieldModal, setShowAddFieldModal] = useState(false)
  const [selectedField, setSelectedField] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock profile fields
  const profileFields = [
    {
      id: '1',
      name: 'First Name',
      type: 'text',
      required: true,
      userType: 'all',
      visibility: 'public',
      order: 1,
      validation: 'none',
      description: 'User\'s first name'
    },
    {
      id: '2',
      name: 'Last Name',
      type: 'text',
      required: true,
      userType: 'all',
      visibility: 'public',
      order: 2,
      validation: 'none',
      description: 'User\'s last name'
    },
    {
      id: '3',
      name: 'Email',
      type: 'email',
      required: true,
      userType: 'all',
      visibility: 'private',
      order: 3,
      validation: 'email',
      description: 'User\'s email address'
    },
    {
      id: '4',
      name: 'Phone Number',
      type: 'tel',
      required: false,
      userType: 'all',
      visibility: 'private',
      order: 4,
      validation: 'phone',
      description: 'User\'s phone number'
    },
    {
      id: '5',
      name: 'Date of Birth',
      type: 'date',
      required: true,
      userType: 'individual',
      visibility: 'private',
      order: 5,
      validation: 'date',
      description: 'User\'s date of birth'
    },
    {
      id: '6',
      name: 'Address',
      type: 'textarea',
      required: false,
      userType: 'all',
      visibility: 'private',
      order: 6,
      validation: 'none',
      description: 'User\'s physical address'
    },
    {
      id: '7',
      name: 'Company Name',
      type: 'text',
      required: true,
      userType: 'organisation',
      visibility: 'public',
      order: 7,
      validation: 'none',
      description: 'Organisation name'
    },
    {
      id: '8',
      name: 'Industry',
      type: 'select',
      required: true,
      userType: 'organisation',
      visibility: 'public',
      order: 8,
      validation: 'none',
      description: 'Organisation industry',
      options: ['Technology', 'Finance', 'Healthcare', 'Education', 'Retail', 'Manufacturing', 'Other']
    }
  ]

  // Mock profile templates
  const profileTemplates = [
    {
      id: '1',
      name: 'Standard Individual',
      description: 'Default template for individual users',
      userType: 'individual',
      fields: ['First Name', 'Last Name', 'Email', 'Phone Number', 'Date of Birth', 'Address'],
      isDefault: true
    },
    {
      id: '2',
      name: 'Standard Organisation',
      description: 'Default template for organisation users',
      userType: 'organisation',
      fields: ['Company Name', 'Email', 'Phone Number', 'Industry', 'Address'],
      isDefault: true
    },
    {
      id: '3',
      name: 'Minimal Individual',
      description: 'Minimal information for individual users',
      userType: 'individual',
      fields: ['First Name', 'Last Name', 'Email'],
      isDefault: false
    },
    {
      id: '4',
      name: 'Minimal Organisation',
      description: 'Minimal information for organisation users',
      userType: 'organisation',
      fields: ['Company Name', 'Email', 'Industry'],
      isDefault: false
    }
  ]

  // Filter profile fields based on search query and user type
  const filteredFields = profileFields.filter(field => {
    const matchesSearch = searchQuery === '' || 
      field.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      field.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesUserType = selectedUserType === 'all' || field.userType === 'all' || field.userType === selectedUserType
    
    return matchesSearch && matchesUserType
  })

  // Filter profile templates based on search query
  const filteredTemplates = profileTemplates.filter(template => 
    searchQuery === '' || 
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleEditField = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowEditFieldModal(false)
      setSelectedField(null)
    }, 1000)
  }

  const handleAddField = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowAddFieldModal(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600 mt-1">Manage user profile fields, templates, and settings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Configuration
          </button>
          {activeTab === 'fields' && (
            <button 
              onClick={() => setShowAddFieldModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Field
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('fields')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'fields'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Profile Fields</span>
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'templates'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Profile Templates</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'settings'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Profile Settings</span>
          </button>
        </nav>
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Profile Completion Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Completion Statistics</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Individual Users</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Complete Profiles</span>
                    <span className="font-medium text-gray-900">68%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '68%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Based on {mockUsers.filter(u => u.role === 'individual').length} users</p>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Organisation Users</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Complete Profiles</span>
                    <span className="font-medium text-gray-900">82%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '82%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Based on {mockUsers.filter(u => u.role === 'organisation').length} organisations</p>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Admin Users</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Complete Profiles</span>
                    <span className="font-medium text-gray-900">95%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                  <p className="text-xs text-gray-500">Based on {mockUsers.filter(u => u.role === 'admin').length} admins</p>
                </div>
              </div>
            </div>
          </div>

          {/* Field Usage Stats */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Field Usage Statistics</h3>
            
            <div className="space-y-4">
              {profileFields.map((field) => (
                <div key={field.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-sm font-medium text-gray-700">{field.name}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                      <div 
                        className="h-2 rounded-full bg-primary-500"
                        style={{ width: `${Math.floor(Math.random() * 60) + 40}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{Math.floor(Math.random() * 60) + 40}%</p>
                    <p className="text-xs text-gray-500">Completion rate</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Profile Fields */}
      {activeTab === 'fields' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search fields..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedUserType}
                  onChange={(e) => setSelectedUserType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All User Types</option>
                  <option value="individual">Individual</option>
                  <option value="organisation">Organisation</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Fields Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Field Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Required
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visibility
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredFields.map((field) => (
                    <tr key={field.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm font-medium text-gray-900">{field.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {field.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {field.required ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-500" />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {field.userType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {field.visibility}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {field.order}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedField(field)
                              setShowEditFieldModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
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

      {/* Profile Templates */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Template
              </button>
            </div>
          </div>

          {/* Templates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredTemplates.map((template) => (
              <div key={template.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{template.name}</h3>
                  {template.isDefault && (
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{template.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">User Type</p>
                  <p className="text-sm text-gray-900 capitalize">{template.userType}</p>
                </div>
                
                <div className="mb-6">
                  <p className="text-sm font-medium text-gray-700 mb-2">Fields</p>
                  <div className="flex flex-wrap gap-2">
                    {template.fields.map((field, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-2">
                  <button className="text-primary-600 hover:text-primary-900">
                    <Edit className="w-4 h-4" />
                  </button>
                  {!template.isDefault && (
                    <button className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Profile Settings */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
          
          <div className="space-y-6">
            {/* General Settings */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">General Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Profile Completeness Check</p>
                    <p className="text-sm text-gray-600">Require users to complete their profiles</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Profile Verification</p>
                    <p className="text-sm text-gray-600">Require verification of profile information</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Profile Picture</p>
                    <p className="text-sm text-gray-600">Allow users to upload profile pictures</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Privacy Settings */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Privacy Settings</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Public Profiles</p>
                    <p className="text-sm text-gray-600">Allow users to have public profiles</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Profile Visibility Control</p>
                    <p className="text-sm text-gray-600">Allow users to control field visibility</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Data Sharing</p>
                    <p className="text-sm text-gray-600">Allow data sharing with third parties</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={false} />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Verification Settings */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Verification Settings</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Profile Completion (%)
                  </label>
                  <input
                    type="number"
                    defaultValue={60}
                    min={0}
                    max={100}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Update Frequency (days)
                  </label>
                  <input
                    type="number"
                    defaultValue={90}
                    min={30}
                    max={365}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Required Verification Fields
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" multiple size={3}>
                    {profileFields.map(field => (
                      <option key={field.id} value={field.id}>{field.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Verification Method
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option>Document Upload</option>
                    <option>Third-Party Verification</option>
                    <option>Manual Review</option>
                    <option>Hybrid Approach</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Save Button */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Reset to Defaults
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Field Modal */}
      {showEditFieldModal && selectedField && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Profile Field</h2>
                <button 
                  onClick={() => {
                    setShowEditFieldModal(false)
                    setSelectedField(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedField.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field Type *
                  </label>
                  <select 
                    defaultValue={selectedField.type}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="date">Date</option>
                    <option value="textarea">Text Area</option>
                    <option value="select">Select</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="file">File</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Type *
                  </label>
                  <select 
                    defaultValue={selectedField.userType}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="all">All Users</option>
                    <option value="individual">Individual</option>
                    <option value="organisation">Organisation</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility *
                  </label>
                  <select 
                    defaultValue={selectedField.visibility}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    defaultValue={selectedField.order}
                    min={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validation
                  </label>
                  <select 
                    defaultValue={selectedField.validation}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="none">None</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="date">Date</option>
                    <option value="url">URL</option>
                    <option value="number">Number</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedField.description}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="required-field"
                  defaultChecked={selectedField.required}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="required-field" className="text-sm text-gray-700">
                  This field is required
                </label>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => {
                    setShowEditFieldModal(false)
                    setSelectedField(null)
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditField}
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

      {/* Add Field Modal */}
      {showAddFieldModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Profile Field</h2>
                <button 
                  onClick={() => setShowAddFieldModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Job Title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Field Type *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="tel">Phone</option>
                    <option value="date">Date</option>
                    <option value="textarea">Text Area</option>
                    <option value="select">Select</option>
                    <option value="checkbox">Checkbox</option>
                    <option value="radio">Radio</option>
                    <option value="file">File</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    User Type *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="all">All Users</option>
                    <option value="individual">Individual</option>
                    <option value="organisation">Organisation</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Visibility *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="restricted">Restricted</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Order
                  </label>
                  <input
                    type="number"
                    defaultValue={profileFields.length + 1}
                    min={1}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validation
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="none">None</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="date">Date</option>
                    <option value="url">URL</option>
                    <option value="number">Number</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter field description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="new-required-field"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="new-required-field" className="text-sm text-gray-700">
                  This field is required
                </label>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddFieldModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddField}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add Field
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileManagement