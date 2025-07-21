import { useState } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Plus,
  Save,
  Settings,
  Layers,
  Trash2,
  Clock, 
  Users, 
  Search,
  Edit,
  ChevronDown,
  List,
  X,
  Eye,
  Download, 
  MoreHorizontal, 
  ChevronUp,
  User,
  FileText,
  Filter,
  GitBranch,
  GitMerge,
  BarChart3,
} from 'lucide-react'

interface ApprovalWorkflow {
  id: string
  name: string
  description: string
  type: 'sequential' | 'parallel' | 'hybrid'
  status: 'active' | 'inactive' | 'draft'
  steps: ApprovalStep[]
  createdAt: string
  updatedAt: string
  createdBy: string
  applicableModules: string[]
}

interface ApprovalStep {
  id: string
  name: string
  description: string
  approverType: 'role' | 'user' | 'group'
  approvers: string[]
  requiredApprovals: number
  timeoutHours: number
  order: number
  actions: {
    onApprove?: string[]
    onReject?: string[]
    onTimeout?: string[]
  }
}

interface ApprovalRequest {
  id: string
  workflowId: string
  workflowName: string
  requestType: string
  requestedBy: string
  requestedDate: string
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'expired'
  currentStep: number
  totalSteps: number
  approvers: {
    name: string
    status: 'pending' | 'approved' | 'rejected'
    date?: string
  }[]
  dueDate: string
  priority: 'low' | 'normal' | 'high' | 'urgent'
}

const AdminApprovalWorkflow = () => {
  const [activeTab, setActiveTab] = useState<'workflows' | 'requests' | 'analytics' | 'settings'>('workflows')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedWorkflow, setSelectedWorkflow] = useState<ApprovalWorkflow | null>(null)
  const [loading, setLoading] = useState(false)
  const [expandedWorkflow, setExpandedWorkflow] = useState<string | null>(null)

  // Mock approval workflows
  const approvalWorkflows: ApprovalWorkflow[] = [
    {
      id: '1',
      name: 'KYC Verification Approval',
      description: 'Workflow for approving KYC verification requests',
      type: 'sequential',
      status: 'active',
      steps: [
        {
          id: '1-1',
          name: 'Initial Review',
          description: 'First-level review by verification specialist',
          approverType: 'role',
          approvers: ['verification_specialist'],
          requiredApprovals: 1,
          timeoutHours: 24,
          order: 1,
          actions: {
            onApprove: ['notify_next_approver', 'update_status'],
            onReject: ['notify_requester', 'update_status'],
            onTimeout: ['escalate_to_manager', 'notify_admin']
          }
        },
        {
          id: '1-2',
          name: 'Compliance Check',
          description: 'Review by compliance officer',
          approverType: 'role',
          approvers: ['compliance_officer'],
          requiredApprovals: 1,
          timeoutHours: 48,
          order: 2,
          actions: {
            onApprove: ['notify_requester', 'update_status', 'update_trust_score'],
            onReject: ['notify_requester', 'update_status'],
            onTimeout: ['escalate_to_manager', 'notify_admin']
          }
        }
      ],
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-20T14:30:00Z',
      createdBy: 'Admin User',
      applicableModules: ['kyc', 'identity_verification']
    },
    {
      id: '2',
      name: 'Organization Onboarding',
      description: 'Approval workflow for new organization registration',
      type: 'parallel',
      status: 'active',
      steps: [
        {
          id: '2-1',
          name: 'Document Verification',
          description: 'Verify organization registration documents',
          approverType: 'role',
          approvers: ['document_specialist'],
          requiredApprovals: 1,
          timeoutHours: 72,
          order: 1,
          actions: {
            onApprove: ['update_status'],
            onReject: ['notify_requester', 'update_status'],
            onTimeout: ['notify_admin']
          }
        },
        {
          id: '2-2',
          name: 'Background Check',
          description: 'Verify organization background and history',
          approverType: 'role',
          approvers: ['background_specialist'],
          requiredApprovals: 1,
          timeoutHours: 72,
          order: 1,
          actions: {
            onApprove: ['update_status'],
            onReject: ['notify_requester', 'update_status'],
            onTimeout: ['notify_admin']
          }
        },
        {
          id: '2-3',
          name: 'Final Approval',
          description: 'Final approval by senior manager',
          approverType: 'role',
          approvers: ['senior_manager'],
          requiredApprovals: 1,
          timeoutHours: 24,
          order: 2,
          actions: {
            onApprove: ['notify_requester', 'update_status', 'create_organization_account'],
            onReject: ['notify_requester', 'update_status'],
            onTimeout: ['escalate_to_director', 'notify_admin']
          }
        }
      ],
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-18T11:45:00Z',
      createdBy: 'Admin User',
      applicableModules: ['organization_management', 'onboarding']
    },
    {
      id: '3',
      name: 'API Key Issuance',
      description: 'Approval workflow for issuing new API keys',
      type: 'hybrid',
      status: 'inactive',
      steps: [
        {
          id: '3-1',
          name: 'Technical Review',
          description: 'Review by technical team',
          approverType: 'role',
          approvers: ['api_specialist'],
          requiredApprovals: 1,
          timeoutHours: 24,
          order: 1,
          actions: {
            onApprove: ['notify_next_approver', 'update_status'],
            onReject: ['notify_requester', 'update_status'],
            onTimeout: ['notify_admin']
          }
        },
        {
          id: '3-2',
          name: 'Security Review',
          description: 'Review by security team',
          approverType: 'role',
          approvers: ['security_specialist'],
          requiredApprovals: 1,
          timeoutHours: 24,
          order: 2,
          actions: {
            onApprove: ['generate_api_key', 'notify_requester', 'update_status'],
            onReject: ['notify_requester', 'update_status'],
            onTimeout: ['notify_admin']
          }
        }
      ],
      createdAt: '2024-01-05T14:20:00Z',
      updatedAt: '2024-01-15T16:30:00Z',
      createdBy: 'Admin User',
      applicableModules: ['api_management', 'security']
    }
  ]

  // Mock approval requests
  const approvalRequests: ApprovalRequest[] = [
    {
      id: '1',
      workflowId: '1',
      workflowName: 'KYC Verification Approval',
      requestType: 'Identity Verification',
      requestedBy: 'John Doe',
      requestedDate: '2024-01-20T09:30:00Z',
      status: 'in_progress',
      currentStep: 1,
      totalSteps: 2,
      approvers: [
        {
          name: 'Sarah Johnson',
          status: 'approved',
          date: '2024-01-20T14:30:00Z'
        },
        {
          name: 'Michael Chen',
          status: 'pending'
        }
      ],
      dueDate: '2024-01-22T14:30:00Z',
      priority: 'normal'
    },
    {
      id: '2',
      workflowId: '2',
      workflowName: 'Organization Onboarding',
      requestType: 'New Organization',
      requestedBy: 'TechCorp Solutions',
      requestedDate: '2024-01-19T11:15:00Z',
      status: 'in_progress',
      currentStep: 1,
      totalSteps: 2,
      approvers: [
        {
          name: 'David Wilson',
          status: 'approved',
          date: '2024-01-20T10:45:00Z'
        },
        {
          name: 'Amanda Foster',
          status: 'pending'
        },
        {
          name: 'James Brown',
          status: 'pending'
        }
      ],
      dueDate: '2024-01-23T11:15:00Z',
      priority: 'high'
    },
    {
      id: '3',
      workflowId: '1',
      workflowName: 'KYC Verification Approval',
      requestType: 'Identity Verification',
      requestedBy: 'Jane Smith',
      requestedDate: '2024-01-18T15:45:00Z',
      status: 'approved',
      currentStep: 2,
      totalSteps: 2,
      approvers: [
        {
          name: 'Sarah Johnson',
          status: 'approved',
          date: '2024-01-19T09:30:00Z'
        },
        {
          name: 'Michael Chen',
          status: 'approved',
          date: '2024-01-20T11:15:00Z'
        }
      ],
      dueDate: '2024-01-21T15:45:00Z',
      priority: 'normal'
    },
    {
      id: '4',
      workflowId: '3',
      workflowName: 'API Key Issuance',
      requestType: 'New API Key',
      requestedBy: 'Global Finance Ltd',
      requestedDate: '2024-01-17T13:20:00Z',
      status: 'rejected',
      currentStep: 1,
      totalSteps: 2,
      approvers: [
        {
          name: 'Robert Davis',
          status: 'rejected',
          date: '2024-01-18T16:40:00Z'
        }
      ],
      dueDate: '2024-01-19T13:20:00Z',
      priority: 'urgent'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'inactive':
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'draft':
      case 'pending':
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'approved':
        return 'bg-green-100 text-green-800'
      case 'inactive':
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'draft':
      case 'pending':
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getWorkflowTypeIcon = (type: string) => {
    switch (type) {
      case 'sequential':
        return <GitBranch className="w-5 h-5 text-blue-500" />
      case 'parallel':
        return <Layers className="w-5 h-5 text-green-500" />
      case 'hybrid':
        return <GitMerge className="w-5 h-5 text-purple-500" />
      default:
        return <List className="w-5 h-5 text-gray-500" />
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

  const filteredWorkflows = approvalWorkflows.filter(workflow => {
    const matchesSearch = searchQuery === '' || 
      workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      workflow.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || workflow.status === selectedStatus
    const matchesType = selectedType === 'all' || workflow.type === selectedType
    
    return matchesSearch && matchesStatus && matchesType
  })

  const handleCreateWorkflow = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowCreateModal(false)
    } catch (error) {
      console.error('Error creating workflow:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleEditWorkflow = async () => {
    if (!selectedWorkflow) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowEditModal(false)
      setSelectedWorkflow(null)
    } catch (error) {
      console.error('Error updating workflow:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteWorkflow = async () => {
    if (!selectedWorkflow) return
    
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setShowDeleteModal(false)
      setSelectedWorkflow(null)
    } catch (error) {
      console.error('Error deleting workflow:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleWorkflowExpansion = (workflowId: string) => {
    if (expandedWorkflow === workflowId) {
      setExpandedWorkflow(null)
    } else {
      setExpandedWorkflow(workflowId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Approval Workflow Management</h1>
          <p className="text-gray-600 mt-1">Configure and manage approval workflows across the platform</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowCreateModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Workflow
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Workflows',
            value: approvalWorkflows.filter(w => w.status === 'active').length,
            icon: GitBranch,
            color: 'bg-blue-500',
            description: 'Currently active'
          },
          {
            title: 'Pending Approvals',
            value: approvalRequests.filter(r => r.status === 'pending' || r.status === 'in_progress').length,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting action'
          },
          {
            title: 'Approved Requests',
            value: approvalRequests.filter(r => r.status === 'approved').length,
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'Successfully approved'
          },
          {
            title: 'Rejected Requests',
            value: approvalRequests.filter(r => r.status === 'rejected').length,
            icon: XCircle,
            color: 'bg-red-500',
            description: 'Rejected requests'
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
            { id: 'workflows', label: 'Workflows', icon: GitBranch },
            { id: 'requests', label: 'Approval Requests', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Settings', icon: Settings }
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
            </button>
          ))}
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
                placeholder={activeTab === 'workflows' ? "Search workflows..." : "Search approval requests..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            {activeTab === 'workflows' && (
              <>
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="draft">Draft</option>
                </select>
                
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Types</option>
                  <option value="sequential">Sequential</option>
                  <option value="parallel">Parallel</option>
                  <option value="hybrid">Hybrid</option>
                </select>
              </>
            )}
            
            {activeTab === 'requests' && (
              <>
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
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="normal">Normal</option>
                  <option value="low">Low</option>
                </select>
              </>
            )}
            
            <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Workflows List */}
      {activeTab === 'workflows' && (
        <div className="space-y-4">
          {filteredWorkflows.map((workflow) => (
            <div key={workflow.id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div 
                className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleWorkflowExpansion(workflow.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getWorkflowTypeIcon(workflow.type)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{workflow.name}</h3>
                      <p className="text-sm text-gray-600">{workflow.description}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(workflow.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(workflow.status)}`}>
                        {workflow.status.charAt(0).toUpperCase() + workflow.status.slice(1)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedWorkflow(workflow)
                          setShowEditModal(true)
                        }}
                        className="p-2 text-gray-600 hover:text-gray-800 rounded hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedWorkflow(workflow)
                          setShowDeleteModal(true)
                        }}
                        className="p-2 text-gray-600 hover:text-gray-800 rounded hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {expandedWorkflow === workflow.id ? (
                        <ChevronUp className="w-5 h-5 text-gray-400" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>Created: {new Date(workflow.createdAt).toLocaleDateString()}</span>
                  <span>Updated: {new Date(workflow.updatedAt).toLocaleDateString()}</span>
                  <span>Steps: {workflow.steps.length}</span>
                </div>
              </div>
              
              {expandedWorkflow === workflow.id && (
                <div className="px-6 pb-6 border-t border-gray-200 pt-4">
                  <h4 className="font-medium text-gray-900 mb-4">Approval Steps</h4>
                  
                  <div className="space-y-4">
                    {workflow.steps.map((step, _) => (
                      <div key={step.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {step.order}
                            </div>
                            <h5 className="font-medium text-gray-900">{step.name}</h5>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-600 hover:text-gray-800 rounded hover:bg-gray-100">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-600 hover:text-gray-800 rounded hover:bg-gray-100">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500 mb-1">Approver Type</p>
                            <p className="font-medium text-gray-900 capitalize">{step.approverType}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Required Approvals</p>
                            <p className="font-medium text-gray-900">{step.requiredApprovals}</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Timeout</p>
                            <p className="font-medium text-gray-900">{step.timeoutHours} hours</p>
                          </div>
                          <div>
                            <p className="text-gray-500 mb-1">Approvers</p>
                            <p className="font-medium text-gray-900">{step.approvers.join(', ')}</p>
                          </div>
                        </div>
                        
                        {(step.actions.onApprove?.length || step.actions.onReject?.length || step.actions.onTimeout?.length) && (
                          <div className="mt-3 pt-3 border-t border-gray-200">
                            <p className="text-sm font-medium text-gray-700 mb-2">Actions</p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                              {step.actions.onApprove?.length && (
                                <div className="bg-green-50 p-2 rounded">
                                  <p className="font-medium text-green-800 mb-1">On Approve</p>
                                  <ul className="list-disc list-inside text-green-700">
                                    {step.actions.onApprove.map((action, i) => (
                                      <li key={i}>{action.replace(/_/g, ' ')}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {step.actions.onReject?.length && (
                                <div className="bg-red-50 p-2 rounded">
                                  <p className="font-medium text-red-800 mb-1">On Reject</p>
                                  <ul className="list-disc list-inside text-red-700">
                                    {step.actions.onReject.map((action, i) => (
                                      <li key={i}>{action.replace(/_/g, ' ')}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              
                              {step.actions.onTimeout?.length && (
                                <div className="bg-yellow-50 p-2 rounded">
                                  <p className="font-medium text-yellow-800 mb-1">On Timeout</p>
                                  <ul className="list-disc list-inside text-yellow-700">
                                    {step.actions.onTimeout.map((action, i) => (
                                      <li key={i}>{action.replace(/_/g, ' ')}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <button className="w-full border border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary-400 transition-colors">
                      <Plus className="w-5 h-5 text-gray-400 mx-auto mb-1" />
                      <span className="text-sm text-gray-600">Add Approval Step</span>
                    </button>
                  </div>
                  
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Applicable Modules</h4>
                    <div className="flex flex-wrap gap-2">
                      {workflow.applicableModules.map((module, index) => (
                        <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {module.replace(/_/g, ' ')}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Approval Requests */}
      {activeTab === 'requests' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Request Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Workflow
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {approvalRequests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{request.requestType}</div>
                          <div className="text-sm text-gray-500">By: {request.requestedBy}</div>
                          <div className="text-xs text-gray-400">{new Date(request.requestedDate).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {request.workflowName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status.replace('_', ' ').charAt(0).toUpperCase() + request.status.replace('_', ' ').slice(1)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${
                              request.status === 'approved' ? 'bg-green-500' :
                              request.status === 'rejected' ? 'bg-red-500' :
                              'bg-blue-500'
                            }`}
                            style={{ width: `${(request.currentStep / request.totalSteps) * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{request.currentStep}/{request.totalSteps}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(request.priority)}`}>
                        {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(request.dueDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="text-primary-600 hover:text-primary-900">
                          <Eye className="w-4 h-4" />
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
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Approval Time Analysis */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Average Approval Time</h3>
            
            <div className="space-y-4">
              {[
                { workflow: 'KYC Verification Approval', time: '1.8 days', count: 156 },
                { workflow: 'Organization Onboarding', time: '3.2 days', count: 89 },
                { workflow: 'API Key Issuance', time: '1.5 days', count: 42 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{item.workflow}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{item.time}</p>
                    <p className="text-xs text-gray-500">{item.count} requests</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approval Rate */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Approval Rate</h3>
            
            <div className="space-y-4">
              {[
                { workflow: 'KYC Verification Approval', rate: '92%', approved: 143, total: 156 },
                { workflow: 'Organization Onboarding', rate: '85%', approved: 76, total: 89 },
                { workflow: 'API Key Issuance', rate: '78%', approved: 33, total: 42 }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">{item.workflow}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{item.rate}</p>
                    <p className="text-xs text-gray-500">{item.approved}/{item.total} approved</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottlenecks */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Approval Bottlenecks</h3>
            
            <div className="space-y-4">
              {[
                { step: 'Compliance Check', workflow: 'KYC Verification Approval', avgTime: '2.3 days', threshold: '1 day' },
                { step: 'Background Check', workflow: 'Organization Onboarding', avgTime: '4.1 days', threshold: '3 days' },
                { step: 'Security Review', workflow: 'API Key Issuance', avgTime: '1.8 days', threshold: '1 day' }
              ].map((item, index) => (
                <div key={index} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{item.step}</h5>
                    <span className="text-xs text-yellow-800 bg-yellow-100 px-2 py-1 rounded-full">Bottleneck</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Workflow: {item.workflow}</p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Average time:</span>
                    <span className="font-medium text-red-600">{item.avgTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Threshold:</span>
                    <span className="font-medium text-gray-900">{item.threshold}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Approver Performance */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Approver Performance</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Sarah Johnson', role: 'Verification Specialist', avgTime: '0.8 days', count: 87 },
                { name: 'Michael Chen', role: 'Compliance Officer', avgTime: '1.2 days', count: 65 },
                { name: 'David Wilson', role: 'Document Specialist', avgTime: '0.9 days', count: 42 },
                { name: 'Amanda Foster', role: 'Senior Manager', avgTime: '1.5 days', count: 38 }
              ].map((approver, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{approver.name}</p>
                      <p className="text-xs text-gray-500">{approver.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{approver.avgTime}</p>
                    <p className="text-xs text-gray-500">{approver.count} approvals</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Settings */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
            
            <div className="space-y-4">
              {[
                { name: 'Default Timeout (hours)', value: 24, type: 'number' },
                { name: 'Auto-escalate on Timeout', value: true, type: 'toggle' },
                { name: 'Notify Requesters on Status Change', value: true, type: 'toggle' },
                { name: 'Notify Approvers on New Requests', value: true, type: 'toggle' },
                { name: 'Allow Self-approval for Admins', value: false, type: 'toggle' }
              ].map((setting, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{setting.name}</p>
                  </div>
                  {setting.type === 'toggle' ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked={setting.value as boolean} />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </label>
                  ) : (
                    <input
                      type={setting.type}
                      defaultValue={setting.value as string | number}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Reset to Defaults
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>

          {/* Notification Templates */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Notification Templates</h3>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Template
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'New Approval Request', type: 'email', lastUpdated: '2024-01-15' },
                { name: 'Approval Reminder', type: 'email', lastUpdated: '2024-01-10' },
                { name: 'Request Approved', type: 'email', lastUpdated: '2024-01-12' },
                { name: 'Request Rejected', type: 'email', lastUpdated: '2024-01-12' }
              ].map((template, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{template.name}</p>
                    <p className="text-sm text-gray-500">Type: {template.type} • Last updated: {template.lastUpdated}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="text-primary-600 hover:text-primary-900">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="text-blue-600 hover:text-blue-900">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Create Workflow Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New Workflow</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workflow Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter workflow name"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter workflow description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workflow Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'sequential', label: 'Sequential', icon: GitBranch, description: 'Approvals happen in order' },
                      { id: 'parallel', label: 'Parallel', icon: Layers, description: 'Approvals happen simultaneously' },
                      { id: 'hybrid', label: 'Hybrid', icon: GitMerge, description: 'Mix of sequential and parallel steps' }
                    ].map((type) => (
                      <label key={type.id} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-start">
                          <input
                            type="radio"
                            name="workflowType"
                            value={type.id}
                            className="mt-1 text-primary-600 focus:ring-primary-500"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <type.icon className="w-4 h-4 text-gray-600 mr-2" />
                              <span className="font-medium text-gray-900">{type.label}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Applicable Modules
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {[
                      'kyc', 'identity_verification', 'organization_management', 'onboarding',
                      'api_management', 'security', 'document_verification', 'user_management'
                    ].map((module) => (
                      <label key={module} className="flex items-center">
                        <input
                          type="checkbox"
                          className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {module.replace(/_/g, ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateWorkflow}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Create Workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Workflow Modal */}
      {showEditModal && selectedWorkflow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Edit Workflow</h2>
                <button 
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedWorkflow(null)
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workflow Name *
                  </label>
                  <input
                    type="text"
                    defaultValue={selectedWorkflow.name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    defaultValue={selectedWorkflow.description}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Workflow Type *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { id: 'sequential', label: 'Sequential', icon: GitBranch, description: 'Approvals happen in order' },
                      { id: 'parallel', label: 'Parallel', icon: Layers, description: 'Approvals happen simultaneously' },
                      { id: 'hybrid', label: 'Hybrid', icon: GitMerge, description: 'Mix of sequential and parallel steps' }
                    ].map((type) => (
                      <label key={type.id} className="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50">
                        <div className="flex items-start">
                          <input
                            type="radio"
                            name="workflowType"
                            value={type.id}
                            defaultChecked={selectedWorkflow.type === type.id}
                            className="mt-1 text-primary-600 focus:ring-primary-500"
                          />
                          <div className="ml-3">
                            <div className="flex items-center">
                              <type.icon className="w-4 h-4 text-gray-600 mr-2" />
                              <span className="font-medium text-gray-900">{type.label}</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{type.description}</p>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select 
                    defaultValue={selectedWorkflow.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => {
                    setShowEditModal(false)
                    setSelectedWorkflow(null)
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleEditWorkflow}
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
      {showDeleteModal && selectedWorkflow && (
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
                    Deleting this workflow will remove all associated configurations and may impact existing approval processes.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700">
                Are you sure you want to delete the workflow <span className="font-medium">{selectedWorkflow.name}</span>?
              </p>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowDeleteModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleDeleteWorkflow}
                  disabled={loading}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Trash2 className="w-4 h-4 mr-2" />
                  )}
                  Delete Workflow
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminApprovalWorkflow