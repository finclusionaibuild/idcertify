import React, { useState } from 'react'
import { 
  MessageSquare, 
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
  Zap,
  Shield
} from 'lucide-react'

interface ChatMessage {
  id: string
  sender: {
    id: string
    name: string
    type: 'user' | 'admin' | 'system'
  }
  recipient: {
    id: string
    name: string
    type: 'user' | 'admin' | 'system'
  }
  content: string
  timestamp: string
  status: 'sent' | 'delivered' | 'read' | 'failed'
  attachments?: string[]
}

interface ChatSession {
  id: string
  participants: {
    id: string
    name: string
    type: 'individual' | 'organisation' | 'admin'
  }[]
  lastMessage: string
  lastMessageTime: string
  status: 'active' | 'closed' | 'archived'
  unreadCount: number
  category: 'support' | 'verification' | 'dispute' | 'general'
}

const AdminChatManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'sessions' | 'settings'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [showChatModal, setShowChatModal] = useState(false)
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock chat sessions data
  const chatSessions: ChatSession[] = [
    {
      id: 'CHAT-001',
      participants: [
        { id: 'USR-001', name: 'John Doe', type: 'individual' },
        { id: 'ADM-001', name: 'Support Agent', type: 'admin' }
      ],
      lastMessage: 'Thank you for your help with the verification process.',
      lastMessageTime: '2024-01-20T14:30:00Z',
      status: 'active',
      unreadCount: 0,
      category: 'verification'
    },
    {
      id: 'CHAT-002',
      participants: [
        { id: 'ORG-001', name: 'TechCorp Solutions', type: 'organisation' },
        { id: 'ADM-002', name: 'Technical Support', type: 'admin' }
      ],
      lastMessage: 'We are experiencing issues with the API integration.',
      lastMessageTime: '2024-01-20T10:15:00Z',
      status: 'active',
      unreadCount: 2,
      category: 'support'
    },
    {
      id: 'CHAT-003',
      participants: [
        { id: 'USR-002', name: 'Jane Smith', type: 'individual' },
        { id: 'ADM-001', name: 'Support Agent', type: 'admin' }
      ],
      lastMessage: 'Your dispute has been resolved successfully.',
      lastMessageTime: '2024-01-19T16:45:00Z',
      status: 'closed',
      unreadCount: 0,
      category: 'dispute'
    },
    {
      id: 'CHAT-004',
      participants: [
        { id: 'ORG-002', name: 'Global Finance Ltd', type: 'organisation' },
        { id: 'ADM-003', name: 'Account Manager', type: 'admin' }
      ],
      lastMessage: 'We have updated your subscription plan as requested.',
      lastMessageTime: '2024-01-18T11:20:00Z',
      status: 'archived',
      unreadCount: 0,
      category: 'general'
    }
  ]

  // Mock chat messages for a selected session
  const chatMessages: ChatMessage[] = [
    {
      id: 'MSG-001',
      sender: { id: 'USR-001', name: 'John Doe', type: 'user' },
      recipient: { id: 'ADM-001', name: 'Support Agent', type: 'admin' },
      content: 'Hello, I need help with my verification process.',
      timestamp: '2024-01-20T14:15:00Z',
      status: 'read'
    },
    {
      id: 'MSG-002',
      sender: { id: 'ADM-001', name: 'Support Agent', type: 'admin' },
      recipient: { id: 'USR-001', name: 'John Doe', type: 'user' },
      content: 'Hi John, I\'d be happy to help. What specific issue are you having with the verification?',
      timestamp: '2024-01-20T14:18:00Z',
      status: 'read'
    },
    {
      id: 'MSG-003',
      sender: { id: 'USR-001', name: 'John Doe', type: 'user' },
      recipient: { id: 'ADM-001', name: 'Support Agent', type: 'admin' },
      content: 'I uploaded my ID but it\'s been pending for over 24 hours now.',
      timestamp: '2024-01-20T14:20:00Z',
      status: 'read'
    },
    {
      id: 'MSG-004',
      sender: { id: 'ADM-001', name: 'Support Agent', type: 'admin' },
      recipient: { id: 'USR-001', name: 'John Doe', type: 'user' },
      content: 'Let me check that for you. I can see your document in our system. It looks like there was a delay in processing. I\'ve expedited the review and it should be completed within the next hour.',
      timestamp: '2024-01-20T14:25:00Z',
      status: 'read'
    },
    {
      id: 'MSG-005',
      sender: { id: 'USR-001', name: 'John Doe', type: 'user' },
      recipient: { id: 'ADM-001', name: 'Support Agent', type: 'admin' },
      content: 'Thank you for your help with the verification process.',
      timestamp: '2024-01-20T14:30:00Z',
      status: 'read'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'closed':
        return <XCircle className="w-5 h-5 text-gray-500" />
      case 'archived':
        return <Clock className="w-5 h-5 text-blue-500" />
      default:
        return <MessageSquare className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      case 'archived':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'support':
        return 'bg-blue-100 text-blue-800'
      case 'verification':
        return 'bg-green-100 text-green-800'
      case 'dispute':
        return 'bg-red-100 text-red-800'
      case 'general':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getParticipantIcon = (type: string) => {
    switch (type) {
      case 'individual':
        return <User className="w-5 h-5 text-blue-500" />
      case 'organisation':
        return <Building className="w-5 h-5 text-green-500" />
      case 'admin':
        return <Shield className="w-5 h-5 text-purple-500" />
      default:
        return <User className="w-5 h-5 text-gray-500" />
    }
  }

  const filteredSessions = chatSessions.filter(session => {
    const matchesSearch = searchQuery === '' || 
      session.participants.some(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      session.id.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || session.status === selectedStatus
    const matchesCategory = selectedCategory === 'all' || session.category === selectedCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chat Management</h1>
          <p className="text-gray-600 mt-1">Manage support conversations and user communications</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Logs
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Configure Chat
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Chats',
            value: chatSessions.filter(s => s.status === 'active').length,
            icon: MessageSquare,
            color: 'bg-green-500',
            description: 'Ongoing conversations'
          },
          {
            title: 'Unread Messages',
            value: chatSessions.reduce((sum, session) => sum + session.unreadCount, 0),
            icon: Mail,
            color: 'bg-blue-500',
            description: 'Awaiting response'
          },
          {
            title: 'Avg. Response Time',
            value: '15 min',
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'First response'
          },
          {
            title: 'Satisfaction Rate',
            value: '92%',
            icon: CheckCircle,
            color: 'bg-purple-500',
            description: 'Based on feedback'
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
            onClick={() => setActiveTab('sessions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'sessions'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat Sessions</span>
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

      {/* Search and Filter */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search chat sessions..."
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
                <option value="closed">Closed</option>
                <option value="archived">Archived</option>
              </select>
              
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Categories</option>
                <option value="support">Support</option>
                <option value="verification">Verification</option>
                <option value="dispute">Dispute</option>
                <option value="general">General</option>
              </select>
              
              <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Sessions Table */}
      {activeTab === 'sessions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Session ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Participants
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSessions.map((session) => (
                  <tr key={session.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {session.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        {session.participants.map((participant, index) => (
                          <div key={index} className="flex items-center">
                            {getParticipantIcon(participant.type)}
                            <span className="ml-2 text-sm text-gray-900">{participant.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate text-sm text-gray-900">
                      {session.lastMessage}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(session.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                          {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(session.category)}`}>
                        {session.category.charAt(0).toUpperCase() + session.category.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(session.lastMessageTime).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => {
                            setSelectedSession(session)
                            setShowChatModal(true)
                          }}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <MessageSquare className="w-4 h-4" />
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
          
          {filteredSessions.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chat sessions found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      )}

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chat Activity */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Chat Activity</h3>
            
            <div className="h-64">
              {/* Simple Bar Chart */}
              <div className="h-full flex items-end justify-between space-x-2">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                  <div key={day} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col items-center">
                      <div 
                        className="w-full bg-blue-500 rounded-t"
                        style={{ height: `${Math.random() * 60 + 20}px` }}
                        title="New Chats"
                      ></div>
                      <div 
                        className="w-full bg-green-500 rounded-t mt-1"
                        style={{ height: `${Math.random() * 40 + 10}px` }}
                        title="Resolved Chats"
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2">{day}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">New Chats</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600">Resolved Chats</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Response Time</span>
                  <span className="font-bold text-gray-900">15 minutes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chat Resolution Rate</span>
                  <span className="font-bold text-gray-900">92%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Chats per Agent (Avg)</span>
                  <span className="font-bold text-gray-900">8.5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">First Response SLA</span>
                  <span className="font-bold text-green-600">98% met</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Categories</h3>
              <div className="space-y-3">
                {[
                  { category: 'Verification Help', percentage: 35, color: 'bg-blue-500' },
                  { category: 'Technical Issues', percentage: 25, color: 'bg-green-500' },
                  { category: 'Billing Questions', percentage: 20, color: 'bg-purple-500' },
                  { category: 'General Inquiries', percentage: 20, color: 'bg-orange-500' }
                ].map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.category}</span>
                      <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Chat System Settings</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chat Session Timeout (minutes)
                </label>
                <input
                  type="number"
                  defaultValue={30}
                  min={5}
                  max={120}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum File Upload Size (MB)
                </label>
                <input
                  type="number"
                  defaultValue={10}
                  min={1}
                  max={50}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Chat History Retention (days)
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
                  Default Chat Assignment
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="round_robin">Round Robin</option>
                  <option value="least_busy">Least Busy Agent</option>
                  <option value="skill_based">Skill Based</option>
                  <option value="manual">Manual Assignment</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Enable Chat System</p>
                  <p className="text-sm text-gray-600">Allow users to initiate chat conversations</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Chat Notifications</p>
                  <p className="text-sm text-gray-600">Send email notifications for new messages</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">File Attachments</p>
                  <p className="text-sm text-gray-600">Allow file attachments in chat</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Auto-close Inactive Chats</p>
                  <p className="text-sm text-gray-600">Automatically close inactive chat sessions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Reset to Defaults
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Detail Modal */}
      {showChatModal && selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Chat Session: {selectedSession.id}</h2>
                <button 
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Session Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedSession.status)}`}>
                      {selectedSession.status.charAt(0).toUpperCase() + selectedSession.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(selectedSession.category)}`}>
                      {selectedSession.category.charAt(0).toUpperCase() + selectedSession.category.slice(1)}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    Started: {new Date(selectedSession.lastMessageTime).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSession.participants.map((participant, index) => (
                    <div key={index} className="flex items-center bg-white px-3 py-1 rounded-full border border-gray-200">
                      {getParticipantIcon(participant.type)}
                      <span className="ml-2 text-sm text-gray-900">{participant.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Messages */}
              <div className="bg-gray-50 rounded-lg p-4 h-96 overflow-y-auto">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${
                        message.sender.type === 'admin' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div 
                        className={`max-w-[70%] rounded-lg p-4 ${
                          message.sender.type === 'admin' 
                            ? 'bg-primary-600 text-white' 
                            : 'bg-white border border-gray-200 text-gray-900'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-medium ${
                            message.sender.type === 'admin' ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            {message.sender.name}
                          </span>
                          <span className={`text-xs ${
                            message.sender.type === 'admin' ? 'text-primary-100' : 'text-gray-500'
                          }`}>
                            {new Date(message.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className={`text-sm ${
                          message.sender.type === 'admin' ? 'text-white' : 'text-gray-800'
                        }`}>
                          {message.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reply Box */}
              <div className="flex items-end space-x-3">
                <textarea
                  rows={3}
                  placeholder="Type your message here..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
                <button className="bg-primary-600 text-white p-3 rounded-lg hover:bg-primary-700 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowChatModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                {selectedSession.status === 'active' && (
                  <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Resolve Chat
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminChatManagement