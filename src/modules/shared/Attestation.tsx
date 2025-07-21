import React, { useState } from 'react'
import { 
  UserCheck, 
  Users, 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle,
  Eye,
  MessageSquare,
  Star,
  Award,
  Shield,
  ChevronRight,
  MoreHorizontal,
  User,
  Building,
  Mail,
  Phone,
  MapPin,
  Download,
  Send
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Attestation = () => {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'network'>('received')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFilter, setSelectedFilter] = useState('all')

  // Mock attestation data
  const attestationRequests = [
    {
      id: '1',
      type: 'received',
      requester: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@techcorp.com',
        company: 'TechCorp Solutions',
        avatar: '/api/placeholder/40/40',
        trustScore: 92
      },
      attestationType: 'Character Reference',
      category: 'Professional',
      status: 'pending',
      message: 'Hi John, I would like to request a character reference for my job application at Microsoft. We worked together at ABC Corp for 2 years.',
      requestedDate: '2024-01-20',
      dueDate: '2024-01-27',
      priority: 'normal',
      documents: ['Resume.pdf', 'Cover_Letter.pdf']
    },
    {
      id: '2',
      type: 'received',
      requester: {
        name: 'Michael Chen',
        email: 'michael.chen@university.edu',
        company: 'University of Lagos',
        avatar: '/api/placeholder/40/40',
        trustScore: 88
      },
      attestationType: 'Academic Reference',
      category: 'Education',
      status: 'pending',
      message: 'Could you provide an academic reference for my graduate school application? You were my supervisor during the final year project.',
      requestedDate: '2024-01-19',
      dueDate: '2024-01-26',
      priority: 'high',
      documents: ['Transcript.pdf']
    },
    {
      id: '3',
      type: 'sent',
      recipient: {
        name: 'David Wilson',
        email: 'david.wilson@company.com',
        company: 'Wilson & Associates',
        avatar: '/api/placeholder/40/40',
        trustScore: 85
      },
      attestationType: 'Employment Verification',
      category: 'Professional',
      status: 'completed',
      message: 'Please confirm my employment duration and role at your company for my mortgage application.',
      requestedDate: '2024-01-15',
      completedDate: '2024-01-18',
      priority: 'normal',
      response: 'Confirmed employment from Jan 2020 to Dec 2023 as Senior Software Engineer.'
    },
    {
      id: '4',
      type: 'sent',
      recipient: {
        name: 'Dr. Amanda Foster',
        email: 'amanda.foster@hospital.com',
        company: 'City General Hospital',
        avatar: '/api/placeholder/40/40',
        trustScore: 96
      },
      attestationType: 'Character Reference',
      category: 'Personal',
      status: 'declined',
      message: 'Would you be able to provide a character reference for my volunteer application?',
      requestedDate: '2024-01-10',
      declinedDate: '2024-01-12',
      priority: 'low',
      declineReason: 'Insufficient interaction time to provide meaningful reference.'
    }
  ]

  // Mock network data
  const attestationNetwork = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@techcorp.com',
      company: 'TechCorp Solutions',
      relationship: 'Former Colleague',
      trustScore: 92,
      mutualConnections: 5,
      attestationsGiven: 12,
      attestationsReceived: 8,
      lastInteraction: '2 days ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '2',
      name: 'Dr. Michael Chen',
      email: 'michael.chen@university.edu',
      company: 'University of Lagos',
      relationship: 'Former Professor',
      trustScore: 88,
      mutualConnections: 3,
      attestationsGiven: 25,
      attestationsReceived: 15,
      lastInteraction: '1 week ago',
      avatar: '/api/placeholder/40/40'
    },
    {
      id: '3',
      name: 'David Wilson',
      email: 'david.wilson@company.com',
      company: 'Wilson & Associates',
      relationship: 'Former Manager',
      trustScore: 85,
      mutualConnections: 8,
      attestationsGiven: 18,
      attestationsReceived: 22,
      lastInteraction: '3 days ago',
      avatar: '/api/placeholder/40/40'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'declined':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'expired':
        return <AlertCircle className="w-5 h-5 text-gray-500" />
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
      case 'declined':
        return 'bg-red-100 text-red-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800'
      case 'normal':
        return 'bg-blue-100 text-blue-800'
      case 'low':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredRequests = attestationRequests.filter(request => {
    const matchesTab = request.type === activeTab || (activeTab === 'network' && false)
    const matchesSearch = searchQuery === '' || 
      (request.type === 'received' ? request.requester.name : request.recipient?.name)
        ?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = selectedFilter === 'all' || request.status === selectedFilter
    
    return matchesTab && matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attestation</h1>
          <p className="text-gray-600 mt-1">Manage character references and professional attestations</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Request Attestation
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Pending Requests',
            value: '2',
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting response'
          },
          {
            title: 'Completed',
            value: '15',
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Successfully completed'
          },
          {
            title: 'Network Size',
            value: '28',
            icon: Users,
            color: 'bg-blue-500',
            description: 'Trusted connections'
          },
          {
            title: 'Trust Rating',
            value: '4.8',
            icon: Star,
            color: 'bg-purple-500',
            description: 'Average rating received'
          }
        ].map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} rounded-lg p-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('received')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'received'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Received Requests
            <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs rounded-full w-5 h-5 flex items-center justify-center">
              2
            </span>
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sent'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Sent Requests
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'network'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Attestation Network
          </button>
        </nav>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search attestations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
            />
          </div>
          
          <select 
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="declined">Declined</option>
          </select>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'network' ? (
        /* Attestation Network */
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Your Attestation Network</h3>
            <p className="text-gray-600 mt-1">People who can provide attestations for you</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {attestationNetwork.map((person) => (
              <div key={person.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-gray-900">{person.name}</h4>
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          Trust Score: {person.trustScore}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{person.relationship}</p>
                      <p className="text-sm text-gray-500 mb-2">{person.company}</p>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{person.mutualConnections} mutual connections</span>
                        <span>{person.attestationsGiven} attestations given</span>
                        <span>Last interaction: {person.lastInteraction}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                      <MessageSquare className="w-4 h-4 mr-1 inline" />
                      Message
                    </button>
                    <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors">
                      <Send className="w-4 h-4 mr-1 inline" />
                      Request
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Attestation Requests */
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <div key={request.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">
                        {request.type === 'received' ? request.requester.name : request.recipient?.name}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)} Priority
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      {request.type === 'received' ? request.requester.company : request.recipient?.company}
                    </p>
                    <p className="text-sm text-gray-500 mb-3">
                      {request.attestationType} • {request.category}
                    </p>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="text-sm text-gray-700">{request.message}</p>
                    </div>
                    
                    {request.response && (
                      <div className="bg-green-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-green-800 font-medium">Response:</p>
                        <p className="text-sm text-green-700">{request.response}</p>
                      </div>
                    )}
                    
                    {request.declineReason && (
                      <div className="bg-red-50 rounded-lg p-3 mb-3">
                        <p className="text-sm text-red-800 font-medium">Decline Reason:</p>
                        <p className="text-sm text-red-700">{request.declineReason}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Requested: {request.requestedDate}</span>
                      {request.dueDate && <span>Due: {request.dueDate}</span>}
                      {request.completedDate && <span>Completed: {request.completedDate}</span>}
                      {request.documents && <span>{request.documents.length} documents attached</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {getStatusIcon(request.status)}
                  {request.status === 'pending' && request.type === 'received' && (
                    <div className="flex items-center space-x-2">
                      <button className="border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm hover:bg-gray-50 transition-colors">
                        Decline
                      </button>
                      <button className="bg-primary-600 text-white px-3 py-1 rounded text-sm hover:bg-primary-700 transition-colors">
                        Respond
                      </button>
                    </div>
                  )}
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredRequests.length === 0 && (
            <div className="text-center py-12">
              <UserCheck className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No attestation requests</h3>
              <p className="text-gray-600">
                {activeTab === 'received' 
                  ? "You don't have any pending attestation requests."
                  : "You haven't sent any attestation requests yet."
                }
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default Attestation