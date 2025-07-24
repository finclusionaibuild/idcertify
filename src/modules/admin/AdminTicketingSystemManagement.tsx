import React, { useState } from 'react'
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { 
  MessageSquare, 
import UsersIcon from '@mui/icons-material/People';
import MessageSquareIcon from '@mui/icons-material/Chat';
import ClockIcon from '@mui/icons-material/Schedule';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AlertTriangleIcon from '@mui/icons-material/Warning';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ZapIcon from '@mui/icons-material/FlashOn';
  XCircle, 
  Clock, 
  User, 
  Building, 
  FileText, 
  X, 
  Send, 
  Save,
  Settings,
  Mail,
  Users,
  Tag,
  Calendar,
  RefreshCw,
  AlertTriangle,
  Info,
  ArrowUp,
  ArrowDown,
  BarChart3,
  TrendingUp,
  PieChart,
  Target,
  Zap
} from 'lucide-react'

interface Ticket {
  id: string
  subject: string
  description: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed' | 'reopened'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  category: 'technical' | 'billing' | 'account' | 'feature_request' | 'other'
  requester: {
    id: string
    name: string
    email: string
    type: 'individual' | 'organization'
  }
  assignedTo?: {
    id: string
    name: string
  }
  createdAt: string
  updatedAt: string
  resolvedAt?: string
  attachments: string[]
  comments: {
    id: string
    user: string
    comment: string
    timestamp: string
  }[]
}

interface StaffMember {
  id: string
  name: string
  email: string
  role: string
}

const AdminTicketingSystemManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets' | 'settings'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedPriority, setSelectedPriority] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAssignee, setSelectedAssignee] = useState('all')
  const [showTicketModal, setShowTicketModal] = useState(false)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock tickets data
  const tickets: Ticket[] = [
    {
      id: 'TKT-001',
      subject: 'Verification API integration issue',
      description: 'Our system is failing to connect to the verification API endpoint. Receiving 500 errors.',
      status: 'open',
      priority: 'high',
      category: 'technical',
      requester: { id: 'org_001', name: 'TechCorp Solutions', email: 'support@techcorp.com', type: 'organization' },
      assignedTo: { id: 'staff_001', name: 'Sarah Johnson' },
      createdAt: '2024-01-20T10:00:00Z',
      updatedAt: '2024-01-20T11:30:00Z',
      attachments: ['error_log.txt'],
      comments: [
        { id: 'c1', user: 'Sarah Johnson', comment: 'Investigating the issue. Looks like an authentication problem.', timestamp: '2024-01-20T11:35:00Z' }
      ]
    },
    {
      id: 'TKT-002',
      subject: 'Billing discrepancy for January',
      description: 'Our January bill seems higher than expected. We need a breakdown of charges.',
      status: 'in_progress',
      priority: 'normal',
      category: 'billing',
      requester: { id: 'org_002', name: 'Global Finance Ltd', email: 'billing@globalfinance.com', type: 'organization' },
      assignedTo: { id: 'staff_002', name: 'Michael Chen' },
      createdAt: '2024-01-19T14:30:00Z',
      updatedAt: '2024-01-20T09:00:00Z',
      attachments: [],
      comments: []
    },
    {
      id: 'TKT-003',
      subject: 'Account locked out',
      description: 'I cannot log into my individual account. It says "account locked".',
      status: 'open',
      priority: 'urgent',
      category: 'account',
      requester: { id: 'user_001', name: 'John Doe', email: 'john.doe@example.com', type: 'individual' },
      createdAt: '2024-01-20T15:00:00Z',
      updatedAt: '2024-01-20T15:00:00Z',
      attachments: [],
      comments: []
    },
    {
      id: 'TKT-004',
      subject: 'Feature Request: Bulk document download',
      description: 'It would be great to have an option to download multiple documents at once from the vault.',
      status: 'closed',
      priority: 'low',
      category: 'feature_request',
      requester: { id: 'org_001', name: 'TechCorp Solutions', email: 'support@techcorp.com', type: 'organization' },
      createdAt: '2024-01-15T09:00:00Z',
      updatedAt: '2024-01-18T16:00:00Z',
      resolvedAt: '2024-01-18T16:00:00Z',
      attachments: [],
      comments: [
        { id: 'c2', user: 'Admin', comment: 'Feature request reviewed and added to backlog.', timestamp: '2024-01-16T10:00:00Z' }
      ]
    },
    {
      id: 'TKT-005',
      subject: 'Report an issue with verification result',
      description: 'The verification result for Jane Smith is incorrect. Her employment history is wrong.',
      status: 'resolved',
      priority: 'high',
      category: 'technical',
      requester: { id: 'org_003', name: 'XYZ Corp', email: 'hr@xyzcorp.com', type: 'organization' },
      assignedTo: { id: 'staff_001', name: 'Sarah Johnson' },
      createdAt: '2024-01-17T11:00:00Z',
      updatedAt: '2024-01-18T14:00:00Z',
      resolvedAt: '2024-01-18T14:00:00Z',
      attachments: [],
      comments: [
        { id: 'c3', user: 'Sarah Johnson', comment: 'Corrected the employment history based on provided documents. Issue resolved.', timestamp: '2024-01-18T14:00:00Z' }
      ]
    }
  ]

  // Mock staff members for assignment
  const staffMembers: StaffMember[] = [
    { id: 'staff_001', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'Support Agent' },
    { id: 'staff_002', name: 'Michael Chen', email: 'michael.c@example.com', role: 'Billing Specialist' },
    { id: 'staff_003', name: 'David Wilson', email: 'david.w@example.com', role: 'Technical Lead' }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'in_progress':
        return <RefreshCw className="w-5 h-5 text-blue-500" />
      case 'resolved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'closed':
        return <XCircle className="w-5 h-5 text-gray-500" />
      case 'reopened':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      case 'reopened':
        return 'bg-orange-100 text-orange-800'
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

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <Settings className="w-5 h-5 text-gray-600" />
      case 'billing':
        return <Mail className="w-5 h-5 text-green-600" />
      case 'account':
        return <User className="w-5 h-5 text-blue-600" />
      case 'feature_request':
        return <Zap className="w-5 h-5 text-purple-600" />
      default:
        return <MessageSquare className="w-5 h-5 text-gray-600" />
    }
  }

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchQuery === '' || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.requester.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.assignedTo && ticket.assignedTo.name.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesStatus = selectedStatus === 'all' || ticket.status === selectedStatus
    const matchesPriority = selectedPriority === 'all' || ticket.priority === selectedPriority
    const matchesCategory = selectedCategory === 'all' || ticket.category === selectedCategory
    const matchesAssignee = selectedAssignee === 'all' || (ticket.assignedTo && ticket.assignedTo.id === selectedAssignee)
    
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory && matchesAssignee
  })

  const handleUpdateTicketStatus = (ticketId: string, newStatus: string) => {
    // Simulate API call to update ticket status
    console.log(`Updating ticket ${ticketId} to status: ${newStatus}`)
    // In a real app, you'd update the state or refetch data
  }

  const handleAssignTicket = (ticketId: string, assigneeId: string) => {
    // Simulate API call to assign ticket
    console.log(`Assigning ticket ${ticketId} to staff: ${assigneeId}`)
    // In a real app, you'd update the state or refetch data
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ticketing System Management</h1>
          <p className="text-gray-600 mt-1">Manage support tickets, track issues, and assign tasks to agents</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Tickets
          </button>
          <button 
            onClick={() => { /* Logic to open new ticket modal */ }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create New Ticket
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Open Tickets',
            value: tickets.filter(t => t.status === 'open').length,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting assignment'
          },
          {
            title: 'In Progress',
            value: tickets.filter(t => t.status === 'in_progress').length,
            icon: RefreshCw,
            color: 'bg-blue-500',
            description: 'Currently being worked on'
          },
          {
            title: 'Resolved Today',
            value: tickets.filter(t => t.status === 'resolved' && new Date(t.resolvedAt || '').toDateString() === new Date().toDateString()).length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Tickets resolved today'
          },
          {
            title: 'High Priority',
            value: tickets.filter(t => t.priority === 'high' || t.priority === 'urgent').length,
            icon: AlertTriangle,
            color: 'bg-red-500',
            description: 'Urgent issues'
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
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'tickets'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>All Tickets</span>
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
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Ticket Status Distribution */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Ticket Status Distribution</h3>
            
            <div className="space-y-4">
              {['open', 'in_progress', 'resolved', 'closed', 'reopened'].map((status) => {
                const count = tickets.filter(t => t.status === status).length
                const percentage = (count / tickets.length) * 100
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      {getStatusIcon(status)}
                      <span className="text-sm font-medium text-gray-700 capitalize">{status.replace('_', ' ')}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                        <div 
                          className={`h-2 rounded-full ${getStatusColor(status)}`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-gray-900">{count}</p>
                      <p className="text-xs text-gray-500">{percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Resolution Time</span>
                  <span className="font-bold text-gray-900">1.5 days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Customer Satisfaction (CSAT)</span>
                  <span className="font-bold text-gray-900">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Tickets per Agent (Avg)</span>
                  <span className="font-bold text-gray-900">1.6</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Plus className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Create New Ticket</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Users className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm">Manage Agents</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <TrendingUp className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm">View Performance Reports</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Tickets Tab */}
      {activeTab === 'tickets' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ticket ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Requester
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Assigned To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {ticket.id}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-900">
                      {ticket.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(ticket.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                          {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1).replace('_', ' ')}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(ticket.category)}
                        <span className="text-sm text-gray-900 capitalize">{ticket.category.replace('_', ' ')}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {ticket.requester.type === 'individual' ? (
                          <User className="w-5 h-5 text-gray-600 mr-2" />
                        ) : (
                          <Building className="w-5 h-5 text-gray-600 mr-2" />
                        )}
                        <span className="text-sm text-gray-900">{ticket.requester.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {ticket.assignedTo ? ticket.assignedTo.name : 'Unassigned'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(ticket.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedTicket(ticket)
                            setShowTicketModal(true)
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
          
          {filteredTickets.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Auto-assign Tickets</p>
                  <p className="text-sm text-gray-600">Automatically assign new tickets to available agents</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Customer Notifications</p>
                  <p className="text-sm text-gray-600">Send email notifications to customers on ticket updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Ticket Reopening</p>
                  <p className="text-sm text-gray-600">Allow customers to reopen closed tickets</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Agent Management */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Agent Management</h3>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Agent
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Agent Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Active Tickets
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {staffMembers.map((agent) => (
                    <tr key={agent.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {agent.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {agent.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {tickets.filter(t => t.assignedTo?.id === agent.id && (t.status === 'open' || t.status === 'in_progress')).length}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-2">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {showTicketModal && selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Ticket Details: {selectedTicket.id}</h2>
                <button 
                  onClick={() => setShowTicketModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Ticket Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedTicket.subject}</h3>
                    <p className="text-gray-600">Requested by: {selectedTicket.requester.name} ({selectedTicket.requester.email})</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedTicket.status)}
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1).replace('_', ' ')}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-4">{selectedTicket.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Priority</p>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority.charAt(0).toUpperCase() + selectedTicket.priority.slice(1)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Category</p>
                    <span className="text-sm font-medium text-gray-900 capitalize">{selectedTicket.category.replace('_', ' ')}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Assigned To</p>
                    <span className="text-sm font-medium text-gray-900">{selectedTicket.assignedTo?.name || 'Unassigned'}</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Created At</p>
                    <span className="text-sm font-medium text-gray-900">{new Date(selectedTicket.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Comments/Activity Log */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Comments & Activity</h3>
                <div className="space-y-4 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-4">
                  {selectedTicket.comments.length > 0 ? (
                    selectedTicket.comments.map((comment) => (
                      <div key={comment.id} className="bg-white p-3 rounded-lg shadow-sm">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{comment.user}</span>
                          <span className="text-xs text-gray-500">{new Date(comment.timestamp).toLocaleString()}</span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No comments yet.</p>
                  )}
                </div>
                <div className="mt-4">
                  <textarea 
                    rows={3}
                    placeholder="Add a comment..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                  <button className="mt-2 bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700">
                    Add Comment
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowTicketModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button 
                  onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'resolved')}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Resolve Ticket
                </button>
                <button 
                  onClick={() => handleUpdateTicketStatus(selectedTicket.id, 'closed')}
                  className="bg-gray-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Close Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminTicketingSystemManagement