import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, 
  Filter, 
  Plus, 
  Download, 
  Eye, 
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Upload,
  ExternalLink,
  Calendar,
  MoreHorizontal,
  ChevronRight,
  Building,
  GraduationCap,
  MapPin,
  UserCheck,
  Globe,
  Flag,
  TrendingUp,
  BarChart3,
  RefreshCw,
  Bell,
  Info,
  X
} from 'lucide-react'

interface BackgroundCheck {
  id: string
  personName: string
  email: string
  checkTypes: string[]
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  riskLevel: 'low' | 'medium' | 'high'
  submittedDate: string
  completedDate?: string
  overallScore: number
  flaggedItems: number
}

interface CheckResult {
  type: string
  status: 'verified' | 'failed' | 'pending' | 'not_found'
  score: number
  details: string
  lastUpdated: string
}

const BackgroundCheck = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'reports' | 'flagged'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all')
  const [selectedCheckType, setSelectedCheckType] = useState('all')
  const [showNewCheckModal, setShowNewCheckModal] = useState(false)
  const [selectedReport, setSelectedReport] = useState<BackgroundCheck | null>(null)
  const [newCheckData, setNewCheckData] = useState({
    fullName: '',
    email: '',
    phone: '',
    nin: '',
    dateOfBirth: '',
    selectedChecks: {
      identity: true,
      employment: true,
      education: false,
      guarantor: false,
      address: true,
      aml: true,
      pep: true,
      sanctions: true
    }
  })

  // Mock data for background checks
  const backgroundChecks: BackgroundCheck[] = [
    {
      id: '1',
      personName: 'John Doe',
      email: 'john.doe@example.com',
      checkTypes: ['Identity', 'Employment', 'AML', 'PEP'],
      status: 'completed',
      riskLevel: 'low',
      submittedDate: '2024-01-20',
      completedDate: '2024-01-22',
      overallScore: 92,
      flaggedItems: 0
    },
    {
      id: '2',
      personName: 'Jane Smith',
      email: 'jane.smith@company.com',
      checkTypes: ['Identity', 'Education', 'Address', 'Sanctions'],
      status: 'in_progress',
      riskLevel: 'medium',
      submittedDate: '2024-01-21',
      overallScore: 78,
      flaggedItems: 1
    },
    {
      id: '3',
      personName: 'Michael Johnson',
      email: 'michael.j@email.com',
      checkTypes: ['Identity', 'Employment', 'AML', 'PEP', 'Sanctions'],
      status: 'completed',
      riskLevel: 'high',
      submittedDate: '2024-01-19',
      completedDate: '2024-01-21',
      overallScore: 45,
      flaggedItems: 3
    },
    {
      id: '4',
      personName: 'Sarah Wilson',
      email: 'sarah.wilson@corp.com',
      checkTypes: ['Identity', 'Employment', 'Education'],
      status: 'failed',
      riskLevel: 'medium',
      submittedDate: '2024-01-18',
      overallScore: 0,
      flaggedItems: 0
    },
    {
      id: '5',
      personName: 'David Brown',
      email: 'david.brown@example.com',
      checkTypes: ['Identity', 'Address', 'Guarantor'],
      status: 'pending',
      riskLevel: 'low',
      submittedDate: '2024-01-22',
      overallScore: 0,
      flaggedItems: 0
    }
  ]

  // Mock detailed check results
  const checkResults: CheckResult[] = [
    {
      type: 'Identity Verification',
      status: 'verified',
      score: 98,
      details: 'National ID verified against NIMC database',
      lastUpdated: '2024-01-22T10:30:00Z'
    },
    {
      type: 'Employment History',
      status: 'verified',
      score: 85,
      details: 'Current employment confirmed with TechCorp Solutions',
      lastUpdated: '2024-01-22T11:15:00Z'
    },
    {
      type: 'AML Screening',
      status: 'verified',
      score: 95,
      details: 'No matches found in AML databases',
      lastUpdated: '2024-01-22T12:00:00Z'
    },
    {
      type: 'PEP Check',
      status: 'verified',
      score: 90,
      details: 'No PEP matches found',
      lastUpdated: '2024-01-22T12:30:00Z'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />
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
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
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

  const getRiskLevelIcon = (level: string) => {
    switch (level) {
      case 'low':
        return '🟢'
      case 'medium':
        return '🟡'
      case 'high':
        return '🔴'
      default:
        return '⚪'
    }
  }

  const filteredChecks = backgroundChecks.filter(check => {
    const matchesSearch = searchQuery === '' || 
      check.personName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      check.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || check.status === selectedStatus
    const matchesRiskLevel = selectedRiskLevel === 'all' || check.riskLevel === selectedRiskLevel
    const matchesCheckType = selectedCheckType === 'all' || 
      check.checkTypes.some(type => type.toLowerCase().includes(selectedCheckType.toLowerCase()))
    
    return matchesSearch && matchesStatus && matchesRiskLevel && matchesCheckType
  })

  const handleNewCheck = () => {
    // Simulate creating new background check
    console.log('Creating new background check:', newCheckData)
    setShowNewCheckModal(false)
    // Reset form
    setNewCheckData({
      fullName: '',
      email: '',
      phone: '',
      nin: '',
      dateOfBirth: '',
      selectedChecks: {
        identity: true,
        employment: true,
        education: false,
        guarantor: false,
        address: true,
        aml: true,
        pep: true,
        sanctions: true
      }
    })
  }

  const checkTypeOptions = [
    { id: 'identity', label: 'Identity Verification', icon: Shield, description: 'Verify government-issued ID documents' },
    { id: 'employment', label: 'Employment History', icon: Building, description: 'Verify current and previous employment' },
    { id: 'education', label: 'Education History', icon: GraduationCap, description: 'Verify academic qualifications' },
    { id: 'guarantor', label: 'Guarantor Verification', icon: UserCheck, description: 'Verify guarantor information' },
    { id: 'address', label: 'Address Verification', icon: MapPin, description: 'Verify residential address' },
    { id: 'aml', label: 'AML Screening', icon: Shield, description: 'Anti-Money Laundering database check' },
    { id: 'pep', label: 'PEP Check', icon: Flag, description: 'Politically Exposed Person screening' },
    { id: 'sanctions', label: 'Sanctions/Blacklist', icon: Globe, description: 'International sanctions database check' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Background Checks</h1>
          <p className="text-gray-600 mt-1">Perform in-depth checks on identity, history, and risk indicators</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link to="/organisation/bulk-upload" className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Link>
          <button 
            onClick={() => setShowNewCheckModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Background Check
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Checks',
            value: backgroundChecks.length,
            icon: FileText,
            color: 'bg-blue-500',
            description: 'All background checks'
          },
          {
            title: 'In Progress',
            value: backgroundChecks.filter(c => c.status === 'in_progress').length,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Currently processing'
          },
          {
            title: 'High Risk',
            value: backgroundChecks.filter(c => c.riskLevel === 'high').length,
            icon: AlertTriangle,
            color: 'bg-red-500',
            description: 'Require attention'
          },
          {
            title: 'Flagged Items',
            value: backgroundChecks.reduce((sum, c) => sum + c.flaggedItems, 0),
            icon: Flag,
            color: 'bg-orange-500',
            description: 'Items needing review'
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
            { id: 'overview', label: 'All Checks', count: backgroundChecks.length },
            { id: 'reports', label: 'Completed Reports', count: backgroundChecks.filter(c => c.status === 'completed').length },
            { id: 'flagged', label: 'Flagged', count: backgroundChecks.filter(c => c.flaggedItems > 0).length }
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
              <span className="ml-2 bg-gray-100 text-gray-600 text-xs rounded-full px-2 py-1">
                {tab.count}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Search & Filter Panel */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or reference ID..."
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
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
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
            
            <select 
              value={selectedCheckType}
              onChange={(e) => setSelectedCheckType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Check Types</option>
              <option value="identity">Identity</option>
              <option value="employment">Employment</option>
              <option value="education">Education</option>
              <option value="aml">AML</option>
              <option value="pep">PEP</option>
              <option value="sanctions">Sanctions</option>
            </select>
            
            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Background Check Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Person
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Types
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Submitted Date
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
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{check.personName}</div>
                        <div className="text-sm text-gray-500">{check.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {check.checkTypes.slice(0, 2).map((type, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {type}
                        </span>
                      ))}
                      {check.checkTypes.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                          +{check.checkTypes.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(check.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(check.status)}`}>
                        {check.status.replace('_', ' ').charAt(0).toUpperCase() + check.status.replace('_', ' ').slice(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(check.riskLevel)}`}>
                      {getRiskLevelIcon(check.riskLevel)} {check.riskLevel.charAt(0).toUpperCase() + check.riskLevel.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {check.status === 'completed' ? (
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          check.overallScore >= 80 ? 'bg-green-500 text-white' :
                          check.overallScore >= 60 ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {check.overallScore}
                        </div>
                        {check.flaggedItems > 0 && (
                          <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                            {check.flaggedItems} flagged
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400 text-sm">Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(check.submittedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setSelectedReport(check)}
                        className="text-primary-600 hover:text-primary-900 flex items-center"
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View Report
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

      {/* Notifications & Alerts Panel */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <Bell className="w-6 h-6 text-yellow-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-yellow-900 mb-2">Alerts & Notifications</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-sm text-gray-700">3 reports flagged as high risk</span>
                <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                  View Flagged Reports →
                </button>
              </div>
              <div className="flex items-center justify-between bg-white rounded-lg p-3">
                <span className="text-sm text-gray-700">5 checks failed due to missing data</span>
                <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                  Review Failed Checks →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <ExternalLink className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Want to automate background checks?</h3>
              <p className="text-blue-700 text-sm">Integrate our API to streamline your verification workflow</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/organisation/api" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Generate API Key
            </Link>
            <Link to="/organisation/api" className="border border-blue-300 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              View API Docs
            </Link>
          </div>
        </div>
      </div>

      {/* New Background Check Modal */}
      {showNewCheckModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">New Background Check</h2>
                <button 
                  onClick={() => setShowNewCheckModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={newCheckData.fullName}
                      onChange={(e) => setNewCheckData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={newCheckData.email}
                      onChange={(e) => setNewCheckData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={newCheckData.phone}
                      onChange={(e) => setNewCheckData(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      National ID Number
                    </label>
                    <input
                      type="text"
                      value={newCheckData.nin}
                      onChange={(e) => setNewCheckData(prev => ({ ...prev, nin: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Enter NIN or other ID"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={newCheckData.dateOfBirth}
                      onChange={(e) => setNewCheckData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Check Types Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Background Checks</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {checkTypeOptions.map((option) => (
                    <label key={option.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newCheckData.selectedChecks[option.id as keyof typeof newCheckData.selectedChecks]}
                        onChange={(e) => setNewCheckData(prev => ({
                          ...prev,
                          selectedChecks: {
                            ...prev.selectedChecks,
                            [option.id]: e.target.checked
                          }
                        }))}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <div className="flex items-center space-x-2 mb-1">
                          <option.icon className="w-4 h-4 text-gray-600" />
                          <span className="font-medium text-gray-900">{option.label}</span>
                        </div>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowNewCheckModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleNewCheck}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Submit Background Check
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Report Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Background Check Report</h2>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Person Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedReport.personName}</h3>
                    <p className="text-gray-600">{selectedReport.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedReport.status)}`}>
                        {selectedReport.status.replace('_', ' ').charAt(0).toUpperCase() + selectedReport.status.replace('_', ' ').slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(selectedReport.riskLevel)}`}>
                        {getRiskLevelIcon(selectedReport.riskLevel)} {selectedReport.riskLevel.charAt(0).toUpperCase() + selectedReport.riskLevel.slice(1)} Risk
                      </span>
                      {selectedReport.status === 'completed' && (
                        <span className="text-lg font-bold text-gray-900">
                          Overall Score: {selectedReport.overallScore}/100
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Results */}
              {selectedReport.status === 'completed' && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Verification Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {checkResults.map((result, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{result.type}</h5>
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(result.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                              {result.status.charAt(0).toUpperCase() + result.status.slice(1)}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{result.details}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">
                            Updated: {new Date(result.lastUpdated).toLocaleDateString()}
                          </span>
                          <span className="text-sm font-bold text-gray-900">
                            Score: {result.score}/100
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Share Securely
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackgroundCheck