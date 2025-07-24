import React, { useState } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  User,
  Shield,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Building,
  GraduationCap,
  MapPin,
  UserCheck,
  Award,
  ExternalLink,
  HelpCircle,
  Info,
  X,
  TrendingUp,
  Star,
  MessageSquare,
  Settings,
  RefreshCw,
  Trash2,
  Edit,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  PieChart,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
  Tooltip
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import WarningIcon from '@mui/icons-material/Warning';
import PeopleIcon from '@mui/icons-material/People';
import DescriptionIcon from '@mui/icons-material/Description';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ShieldIcon from '@mui/icons-material/Shield';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import WarningIcon from '@mui/icons-material/Warning';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const AdminVerificationManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'pending' | 'inProgress' | 'completed' | 'flagged'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedRiskLevel, setSelectedRiskLevel] = useState('all')
  const [selectedVerification, setSelectedVerification] = useState<VerificationRequest | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days')

  // Mock verification stats
  const verificationStats: VerificationStats = {
    total: 1247,
    pending: 156,
    inProgress: 89,
    approved: 892,
    rejected: 78,
    expired: 32,
    averageCompletionTime: '1.8 days',
    successRate: 87.5
  }

  // Mock verification requests
  const verificationRequests: VerificationRequest[] = [
    {
      id: '1',
      requestId: 'VER-001234',
      requesterName: 'TechCorp Solutions',
      requesterType: 'organization',
      targetName: 'John Doe',
      verificationType: 'Identity Verification',
      status: 'pending',
      priority: 'high',
      dateRequested: '2024-01-20',
      dateUpdated: '2024-01-20',
      riskLevel: 'low'
    },
    {
      id: '2',
      requestId: 'VER-001235',
      requesterName: 'ABC Bank',
      requesterType: 'organization',
      targetName: 'Jane Smith',
      verificationType: 'Address Verification',
      status: 'in_progress',
      priority: 'normal',
      dateRequested: '2024-01-19',
      dateUpdated: '2024-01-20',
      assignedTo: 'Sarah Johnson',
      riskLevel: 'medium'
    },
    {
      id: '3',
      requestId: 'VER-001236',
      requesterName: 'Michael Johnson',
      requesterType: 'individual',
      targetName: 'University of Lagos',
      verificationType: 'Education Verification',
      status: 'approved',
      priority: 'normal',
      dateRequested: '2024-01-18',
      dateUpdated: '2024-01-19',
      assignedTo: 'David Wilson',
      notes: 'Degree certificate verified with university records',
      riskLevel: 'low'
    },
    {
      id: '4',
      requestId: 'VER-001237',
      requesterName: 'XYZ Corporation',
      requesterType: 'organization',
      targetName: 'Robert Brown',
      verificationType: 'Employment Verification',
      status: 'rejected',
      priority: 'high',
      dateRequested: '2024-01-17',
      dateUpdated: '2024-01-18',
      assignedTo: 'Amanda Foster',
      notes: 'Unable to verify employment history due to inconsistent information',
      riskLevel: 'high'
    },
    {
      id: '5',
      requestId: 'VER-001238',
      requesterName: 'Sarah Wilson',
      requesterType: 'individual',
      targetName: 'National ID Authority',
      verificationType: 'Identity Verification',
      status: 'expired',
      priority: 'low',
      dateRequested: '2024-01-15',
      dateUpdated: '2024-01-15',
      riskLevel: 'medium'
    }
  ]

  // Mock staff members for assignment
  const staffMembers = [
    { id: '1', name: 'Sarah Johnson', role: 'Verification Specialist', department: 'Identity Verification' },
    { id: '2', name: 'David Wilson', role: 'Senior Verifier', department: 'Document Verification' },
    { id: '3', name: 'Amanda Foster', role: 'Verification Manager', department: 'Employment Verification' },
    { id: '4', name: 'Michael Chen', role: 'Verification Specialist', department: 'Education Verification' },
    { id: '5', name: 'James Brown', role: 'Verification Specialist', department: 'Address Verification' }
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
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
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
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'normal':
        return 'bg-blue-100 text-blue-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
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

  const getVerificationTypeIcon = (type: string) => {
    if (type.toLowerCase().includes('identity')) {
      return <Shield className="w-5 h-5 text-blue-500" />
    } else if (type.toLowerCase().includes('address')) {
      return <MapPin className="w-5 h-5 text-orange-500" />
    } else if (type.toLowerCase().includes('education')) {
      return <GraduationCap className="w-5 h-5 text-purple-500" />
    } else if (type.toLowerCase().includes('employment')) {
      return <Building className="w-5 h-5 text-green-500" />
    } else if (type.toLowerCase().includes('reference') || type.toLowerCase().includes('guarantor')) {
      return <UserCheck className="w-5 h-5 text-pink-500" />
    } else {
      return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredRequests = verificationRequests.filter(request => {
    const matchesSearch = searchQuery === '' || 
      request.requesterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.targetName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requestId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || request.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || request.priority === selectedPriority
    const matchesRiskLevel = selectedRiskLevel === 'all' || request.riskLevel === selectedRiskLevel
    
    return matchesSearch && matchesStatus && matchesPriority && matchesRiskLevel
  })

  const handleAssignVerification = (staffId: string) => {
    console.log(`Assigning verification ${selectedVerification?.id} to staff ${staffId}`)
    setShowAssignModal(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Verification Oversight</h1>
          <p className="text-gray-600 mt-1">Monitor and manage all verification requests across the platform</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Configure Rules
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Verifications',
            value: verificationStats.total.toLocaleString(),
            icon: FileText,
            color: 'bg-blue-500',
            description: 'All time'
          },
          {
            title: 'Pending Review',
            value: verificationStats.pending,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting action'
          },
          {
            title: 'Success Rate',
            value: `${verificationStats.successRate}%`,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Approval rate'
          },
          {
            title: 'Avg. Completion Time',
            value: verificationStats.averageCompletionTime,
            icon: TrendingUp,
            color: 'bg-purple-500',
            description: 'Processing time'
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
            { id: 'pending', label: 'Pending', icon: Clock, count: verificationStats.pending },
            { id: 'inProgress', label: 'In Progress', icon: RefreshCw, count: verificationStats.inProgress },
            { id: 'completed', label: 'Completed', icon: CheckCircle },
            { id: 'flagged', label: 'Flagged', icon: AlertTriangle, count: 15 }
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
          {/* Verification Trends */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Verification Trends</h3>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
            </div>
            
            {/* Simple Chart Visualization */}
            <div className="h-64 flex items-end justify-between space-x-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                <div key={day} className="flex flex-col items-center flex-1">
                  <div className="flex flex-col items-center space-y-1 mb-2 w-full">
                    <div 
                      className="w-full bg-green-500 rounded-t"
                      style={{ height: `${Math.random() * 60 + 20}px` }}
                      title="Approved"
                    ></div>
                    <div 
                      className="w-full bg-yellow-500 rounded-t"
                      style={{ height: `${Math.random() * 40 + 10}px` }}
                      title="Pending"
                    ></div>
                    <div 
                      className="w-full bg-red-500 rounded-t"
                      style={{ height: `${Math.random() * 20 + 5}px` }}
                      title="Rejected"
                    ></div>
                  </div>
                  <span className="text-xs text-gray-500">{day}</span>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Approved</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Pending</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Rejected</span>
              </div>
            </div>
          </div>

          {/* Verification Types */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Verification Types</h3>
            
            <div className="space-y-4">
              {[
                { type: 'Identity', count: 456, percentage: 36.6, color: 'bg-blue-500' },
                { type: 'Address', count: 324, percentage: 26.0, color: 'bg-orange-500' },
                { type: 'Employment', count: 245, percentage: 19.6, color: 'bg-green-500' },
                { type: 'Education', count: 156, percentage: 12.5, color: 'bg-purple-500' },
                { type: 'Reference', count: 66, percentage: 5.3, color: 'bg-pink-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className={`w-4 h-4 rounded ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{item.type}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{item.count}</p>
                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab !== 'overview' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, ID, or organization..."
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
                  <option value="expired">Expired</option>
                </select>
                
                <select 
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
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
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Verification Requests Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Request ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Requester / Target
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Verification Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Risk Level
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Requested
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {request.requestId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center">
                            {request.requesterType === 'organization' ? (
                              <Building className="w-4 h-4 text-gray-600 mr-2" />
                            ) : (
                              <User className="w-4 h-4 text-gray-600 mr-2" />
                            )}
                            <span className="text-sm font-medium text-gray-900">{request.requesterName}</span>
                          </div>
                          <div className="flex items-center mt-1">
                            <ArrowDownRight className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm text-gray-500">{request.targetName}</span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {getVerificationTypeIcon(request.verificationType)}
                          <span className="ml-2 text-sm text-gray-900">{request.verificationType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(request.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1).replace('_', ' ')}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                          {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(request.riskLevel)}`}>
                          {request.riskLevel.charAt(0).toUpperCase() + request.riskLevel.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(request.dateRequested).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedVerification(request)
                              setShowDetailModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-900 flex items-center"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            View
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

      {/* Verification Detail Modal */}
      {showDetailModal && selectedVerification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Verification Request Details</h2>
                <button 
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Request Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {getVerificationTypeIcon(selectedVerification.verificationType)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{selectedVerification.verificationType}</h3>
                      <p className="text-gray-600">{selectedVerification.requestId}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedVerification.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedVerification.status)}`}>
                      {selectedVerification.status.charAt(0).toUpperCase() + selectedVerification.status.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Requester</p>
                    <div className="flex items-center">
                      {selectedVerification.requesterType === 'organization' ? (
                        <Building className="w-4 h-4 text-gray-600 mr-2" />
                      ) : (
                        <User className="w-4 h-4 text-gray-600 mr-2" />
                      )}
                      <p className="font-medium text-gray-900">{selectedVerification.requesterName}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Target</p>
                    <p className="font-medium text-gray-900">{selectedVerification.targetName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Date Requested</p>
                    <p className="font-medium text-gray-900">{new Date(selectedVerification.dateRequested).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">{new Date(selectedVerification.dateUpdated).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedVerification.priority)}`}>
                      {selectedVerification.priority.charAt(0).toUpperCase() + selectedVerification.priority.slice(1)} Priority
                    </span>
                  </div>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskLevelColor(selectedVerification.riskLevel)}`}>
                      {selectedVerification.riskLevel.charAt(0).toUpperCase() + selectedVerification.riskLevel.slice(1)} Risk
                    </span>
                  </div>
                </div>
              </div>

              {/* Assignment Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Assignment</h3>
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    {selectedVerification.assignedTo ? (
                      <div>
                        <p className="font-medium text-gray-900">Assigned to: {selectedVerification.assignedTo}</p>
                        <p className="text-sm text-gray-500">Assigned on {new Date(selectedVerification.dateUpdated).toLocaleDateString()}</p>
                      </div>
                    ) : (
                      <p className="text-gray-600">Not assigned to any staff member</p>
                    )}
                  </div>
                  <button 
                    onClick={() => {
                      setShowAssignModal(true)
                    }}
                    className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    {selectedVerification.assignedTo ? 'Reassign' : 'Assign'}
                  </button>
                </div>
              </div>

              {/* Notes Section */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Notes</h3>
                {selectedVerification.notes ? (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-gray-700">{selectedVerification.notes}</p>
                  </div>
                ) : (
                  <div className="p-4 border border-gray-200 border-dashed rounded-lg text-center">
                    <p className="text-gray-500">No notes available</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Details
                </button>
                {selectedVerification.status === 'pending' && (
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Take Action
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Staff Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Assign Verification</h2>
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-1">Verification Request</p>
                <p className="font-medium text-gray-900">{selectedVerification?.requestId} - {selectedVerification?.verificationType}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Staff Member
                </label>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {staffMembers.map((staff) => (
                    <label key={staff.id} className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="staffMember"
                        value={staff.id}
                        className="mt-1 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="ml-3">
                        <p className="font-medium text-gray-900">{staff.name}</p>
                        <p className="text-sm text-gray-500">{staff.role} • {staff.department}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAssignModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => handleAssignVerification(staffMembers[0].id)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Assign
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Status Panel */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Verification API', status: 'operational', icon: Zap, color: 'bg-green-500' },
            { name: 'Document Processing', status: 'operational', icon: FileText, color: 'bg-green-500' },
            { name: 'Identity Verification', status: 'operational', icon: Shield, color: 'bg-green-500' },
            { name: 'Database Services', status: 'operational', icon: Database, color: 'bg-green-500' },
            { name: 'Background Checks', status: 'degraded', icon: Users, color: 'bg-yellow-500' },
            { name: 'Notification System', status: 'operational', icon: Bell, color: 'bg-green-500' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${service.status === 'operational' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <service.icon className={`w-5 h-5 ${service.status === 'operational' ? 'text-green-600' : 'text-yellow-600'}`} />
                </div>
                <span className="font-medium text-gray-900">{service.name}</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                service.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminVerificationManagement