import React, { useState } from 'react'
import FeatureGate from '../shared/components/FeatureGate'
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  Share2,
  Lock,
  Unlock,
  Star,
  Calendar,
  User,
  Building,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Plus,
  FolderPlus,
  Folder,
  File,
  Image,
  FileSpreadsheet,
  Archive,
  Settings,
  MoreHorizontal,
  Edit,
  Copy,
  Move,
  Tag,
  History,
  Info,
  ExternalLink,
  Paperclip,
  X,
  Save,
  RefreshCw,
  Grid,
  List,
  SortAsc,
  SortDesc
} from 'lucide-react'

interface Document {
  id: string
  name: string
  type: 'pdf' | 'image' | 'spreadsheet' | 'document' | 'archive'
  size: number
  uploadDate: string
  lastModified: string
  uploadedBy: string
  category: 'identity' | 'employment' | 'education' | 'compliance' | 'contracts' | 'certificates' | 'other'
  status: 'verified' | 'pending' | 'rejected' | 'draft'
  accessLevel: 'private' | 'team' | 'organization' | 'public'
  tags: string[]
  folder: string
  isStarred: boolean
  isEncrypted: boolean
  verificationScore?: number
  expiryDate?: string
  description?: string
  version: number
  sharedWith: string[]
}

interface Folder {
  id: string
  name: string
  parentId?: string
  documentCount: number
  createdDate: string
  color: string
}

const DocumentVault = () => {
  const [activeTab, setActiveTab] = useState<'documents' | 'folders' | 'shared' | 'recent'>('documents')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedFolder, setSelectedFolder] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showCreateFolderModal, setShowCreateFolderModal] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(false)

  const [newFolderData, setNewFolderData] = useState({
    name: '',
    parentId: '',
    color: '#3B82F6'
  })

  // Mock documents data
  const documents: Document[] = [
    {
      id: '1',
      name: 'Company Registration Certificate.pdf',
      type: 'pdf',
      size: 2048000,
      uploadDate: '2024-01-15T10:00:00Z',
      lastModified: '2024-01-15T10:00:00Z',
      uploadedBy: 'Sarah Johnson',
      category: 'compliance',
      status: 'verified',
      accessLevel: 'organization',
      tags: ['legal', 'registration', 'official'],
      folder: 'Legal Documents',
      isStarred: true,
      isEncrypted: true,
      verificationScore: 98,
      description: 'Official company registration certificate from CAC',
      version: 1,
      sharedWith: ['legal@techcorp.com', 'admin@techcorp.com']
    },
    {
      id: '2',
      name: 'Employee Handbook 2024.pdf',
      type: 'pdf',
      size: 5120000,
      uploadDate: '2024-01-10T14:30:00Z',
      lastModified: '2024-01-18T09:15:00Z',
      uploadedBy: 'Michael Chen',
      category: 'employment',
      status: 'verified',
      accessLevel: 'team',
      tags: ['hr', 'policies', 'handbook'],
      folder: 'HR Documents',
      isStarred: false,
      isEncrypted: false,
      description: 'Updated employee handbook with new policies',
      version: 3,
      sharedWith: ['hr@techcorp.com']
    },
    {
      id: '3',
      name: 'Tax Clearance Certificate.pdf',
      type: 'pdf',
      size: 1536000,
      uploadDate: '2024-01-08T11:20:00Z',
      lastModified: '2024-01-08T11:20:00Z',
      uploadedBy: 'David Wilson',
      category: 'compliance',
      status: 'verified',
      accessLevel: 'private',
      tags: ['tax', 'compliance', 'government'],
      folder: 'Financial Documents',
      isStarred: true,
      isEncrypted: true,
      verificationScore: 95,
      expiryDate: '2024-12-31',
      description: 'Annual tax clearance certificate',
      version: 1,
      sharedWith: []
    },
    {
      id: '4',
      name: 'Staff Training Records.xlsx',
      type: 'spreadsheet',
      size: 3072000,
      uploadDate: '2024-01-05T16:45:00Z',
      lastModified: '2024-01-20T14:30:00Z',
      uploadedBy: 'Amanda Foster',
      category: 'employment',
      status: 'pending',
      accessLevel: 'team',
      tags: ['training', 'records', 'hr'],
      folder: 'HR Documents',
      isStarred: false,
      isEncrypted: false,
      description: 'Comprehensive staff training completion records',
      version: 2,
      sharedWith: ['hr@techcorp.com', 'training@techcorp.com']
    },
    {
      id: '5',
      name: 'ISO Certification.pdf',
      type: 'pdf',
      size: 2560000,
      uploadDate: '2024-01-03T09:30:00Z',
      lastModified: '2024-01-03T09:30:00Z',
      uploadedBy: 'James Brown',
      category: 'certificates',
      status: 'verified',
      accessLevel: 'public',
      tags: ['iso', 'certification', 'quality'],
      folder: 'Certifications',
      isStarred: true,
      isEncrypted: false,
      verificationScore: 100,
      expiryDate: '2027-01-03',
      description: 'ISO 9001:2015 Quality Management System Certificate',
      version: 1,
      sharedWith: ['public']
    }
  ]

  // Mock folders data
  const folders: Folder[] = [
    {
      id: '1',
      name: 'Legal Documents',
      documentCount: 8,
      createdDate: '2024-01-01T00:00:00Z',
      color: '#EF4444'
    },
    {
      id: '2',
      name: 'HR Documents',
      documentCount: 15,
      createdDate: '2024-01-01T00:00:00Z',
      color: '#3B82F6'
    },
    {
      id: '3',
      name: 'Financial Documents',
      documentCount: 12,
      createdDate: '2024-01-01T00:00:00Z',
      color: '#10B981'
    },
    {
      id: '4',
      name: 'Certifications',
      documentCount: 6,
      createdDate: '2024-01-01T00:00:00Z',
      color: '#F59E0B'
    },
    {
      id: '5',
      name: 'Contracts',
      documentCount: 20,
      createdDate: '2024-01-01T00:00:00Z',
      color: '#8B5CF6'
    }
  ]

  const categories = ['identity', 'employment', 'education', 'compliance', 'contracts', 'certificates', 'other']
  const statuses = ['verified', 'pending', 'rejected', 'draft']
  const accessLevels = ['private', 'team', 'organization', 'public']

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-8 h-8 text-red-500" />
      case 'image':
        return <Image className="w-8 h-8 text-blue-500" />
      case 'spreadsheet':
        return <FileSpreadsheet className="w-8 h-8 text-green-500" />
      case 'archive':
        return <Archive className="w-8 h-8 text-purple-500" />
      default:
        return <File className="w-8 h-8 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'draft':
        return <Edit className="w-5 h-5 text-gray-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'draft':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'private':
        return 'bg-red-100 text-red-800'
      case 'team':
        return 'bg-blue-100 text-blue-800'
      case 'organization':
        return 'bg-green-100 text-green-800'
      case 'public':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = searchQuery === '' || 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || doc.category === selectedCategory
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus
    const matchesFolder = selectedFolder === 'all' || doc.folder === selectedFolder
    
    return matchesSearch && matchesCategory && matchesStatus && matchesFolder
  })

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    let aValue: any, bValue: any
    
    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
        break
      case 'date':
        aValue = new Date(a.uploadDate)
        bValue = new Date(b.uploadDate)
        break
      case 'size':
        aValue = a.size
        bValue = b.size
        break
      case 'type':
        aValue = a.type
        bValue = b.type
        break
      default:
        aValue = a.name.toLowerCase()
        bValue = b.name.toLowerCase()
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  const handleCreateFolder = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Creating folder:', newFolderData)
      setShowCreateFolderModal(false)
      setNewFolderData({ name: '', parentId: '', color: '#3B82F6' })
    } catch (error) {
      console.error('Error creating folder:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div data-tour="documents">
          <h1 className="text-2xl font-bold text-gray-900">Document Vault</h1>
          <p className="text-gray-600 mt-1">Securely store and manage verification documents</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setShowCreateFolderModal(true)}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center"
          >
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </button>
          <FeatureGate feature="document-upload">
            <button 
              onClick={() => setShowUploadModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Documents
            </button>
          </FeatureGate>
        </div>
      </div>

      {/* Storage Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Storage Overview</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
            Manage Storage →
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">2.4 GB</div>
            <div className="text-sm text-gray-600">Used</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">7.6 GB</div>
            <div className="text-sm text-gray-600">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{documents.length}</div>
            <div className="text-sm text-gray-600">Total Files</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{folders.length}</div>
            <div className="text-sm text-gray-600">Folders</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Storage Usage</span>
            <span className="font-medium">24% of 10 GB</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '24%' }}></div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'documents', label: 'All Documents', icon: FileText, count: documents.length },
            { id: 'folders', label: 'Folders', icon: Folder, count: folders.length },
            { id: 'shared', label: 'Shared with Me', icon: Share2, count: 8 },
            { id: 'recent', label: 'Recent', icon: Clock }
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

      {/* Search and Filter Bar */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            
            <select 
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            
            <select 
              value={selectedFolder}
              onChange={(e) => setSelectedFolder(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Folders</option>
              {folders.map(folder => (
                <option key={folder.id} value={folder.name}>{folder.name}</option>
              ))}
            </select>
            
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'text-gray-600 hover:text-gray-800'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Sort Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Sort by:</span>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="name">Name</option>
                <option value="date">Date</option>
                <option value="size">Size</option>
                <option value="type">Type</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1 text-gray-600 hover:text-gray-800"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
            
            <div className="text-sm text-gray-600">
              {sortedDocuments.length} documents
            </div>
          </div>

          {/* Documents Grid/List */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedDocuments.map((doc) => (
                <div key={doc.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between mb-4">
                    {getFileIcon(doc.type)}
                    <div className="flex items-center space-x-2">
                      {doc.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      {doc.isEncrypted && <Lock className="w-4 h-4 text-gray-600" />}
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <h4 className="font-medium text-gray-900 mb-2 truncate" title={doc.name}>
                    {doc.name}
                  </h4>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Size</span>
                      <span className="text-gray-900">{formatFileSize(doc.size)}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Modified</span>
                      <span className="text-gray-900">{new Date(doc.lastModified).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                      {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAccessLevelColor(doc.accessLevel)}`}>
                      {doc.accessLevel.charAt(0).toUpperCase() + doc.accessLevel.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <button 
                      onClick={() => {
                        setSelectedDocument(doc)
                        setShowDocumentModal(true)
                      }}
                      className="flex-1 bg-primary-600 text-white py-2 px-3 rounded text-sm hover:bg-primary-700 transition-colors"
                    >
                      View
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <input type="checkbox" className="rounded border-gray-300" />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Modified
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedDocuments.map((doc) => (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input type="checkbox" className="rounded border-gray-300" />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getFileIcon(doc.type)}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                              <div className="text-sm text-gray-500">{doc.folder}</div>
                            </div>
                            <div className="ml-2 flex items-center space-x-1">
                              {doc.isStarred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                              {doc.isEncrypted && <Lock className="w-4 h-4 text-gray-600" />}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-900 capitalize">{doc.category}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(doc.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                              {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatFileSize(doc.size)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(doc.lastModified).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => {
                                setSelectedDocument(doc)
                                setShowDocumentModal(true)
                              }}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-gray-900">
                              <Share2 className="w-4 h-4" />
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
        </div>
      )}

      {activeTab === 'folders' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {folders.map((folder) => (
            <div key={folder.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <Folder className="w-12 h-12" style={{ color: folder.color }} />
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-2">{folder.name}</h4>
              
              <div className="text-sm text-gray-600 mb-4">
                {folder.documentCount} documents
              </div>
              
              <div className="text-xs text-gray-500">
                Created {new Date(folder.createdDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <FeatureGate feature="document-upload" fallback={
              <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Document Upload Locked</h3>
                <p className="text-gray-600">Complete KYC Tier 1 verification to upload documents</p>
              </div>
            }>
              <div className="p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</p>
                  <p className="text-gray-600 mb-4">Support for PDF, images, spreadsheets, and documents up to 10MB</p>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Choose Files
                  </button>
                </div>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Folder</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      <option value="">Select Folder</option>
                      {folders.map(folder => (
                        <option key={folder.id} value={folder.id}>{folder.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Access Level</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                      {accessLevels.map(level => (
                        <option key={level} value={level}>
                          {level.charAt(0).toUpperCase() + level.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-gray-700">Encrypt document</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                      <span className="ml-2 text-sm text-gray-700">Auto-verify</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex items-center justify-end space-x-3 mt-6 pt-4 border-t">
                  <button 
                    onClick={() => setShowUploadModal(false)}
                    className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                    Upload Documents
                  </button>
                </div>
              </div>
            </FeatureGate>
          </div>
        </div>
      )}

      {/* Create Folder Modal */}
      {showCreateFolderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New Folder</h2>
                <button 
                  onClick={() => setShowCreateFolderModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Folder Name</label>
                <input
                  type="text"
                  value={newFolderData.name}
                  onChange={(e) => setNewFolderData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter folder name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Parent Folder</label>
                <select
                  value={newFolderData.parentId}
                  onChange={(e) => setNewFolderData(prev => ({ ...prev, parentId: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Root Directory</option>
                  {folders.map(folder => (
                    <option key={folder.id} value={folder.id}>{folder.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="flex items-center space-x-2">
                  {['#EF4444', '#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'].map(color => (
                    <button
                      key={color}
                      onClick={() => setNewFolderData(prev => ({ ...prev, color }))}
                      className={`w-8 h-8 rounded-full border-2 ${
                        newFolderData.color === color ? 'border-gray-800' : 'border-gray-300'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowCreateFolderModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreateFolder}
                  disabled={loading || !newFolderData.name}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <FolderPlus className="w-4 h-4 mr-2" />
                  )}
                  Create Folder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Details Modal */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Document Details</h2>
                <button 
                  onClick={() => setShowDocumentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Document Header */}
              <div className="flex items-start space-x-4">
                {getFileIcon(selectedDocument.type)}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedDocument.name}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{formatFileSize(selectedDocument.size)}</span>
                    <span>•</span>
                    <span>Version {selectedDocument.version}</span>
                    <span>•</span>
                    <span>Uploaded by {selectedDocument.uploadedBy}</span>
                  </div>
                  {selectedDocument.description && (
                    <p className="text-gray-700 mt-2">{selectedDocument.description}</p>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  {selectedDocument.isStarred && <Star className="w-5 h-5 text-yellow-500 fill-current" />}
                  {selectedDocument.isEncrypted && <Lock className="w-5 h-5 text-gray-600" />}
                </div>
              </div>

              {/* Document Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedDocument.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDocument.status)}`}>
                        {selectedDocument.status.charAt(0).toUpperCase() + selectedDocument.status.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <p className="text-gray-900 capitalize">{selectedDocument.category}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Folder</label>
                    <p className="text-gray-900">{selectedDocument.folder}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Access Level</label>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getAccessLevelColor(selectedDocument.accessLevel)}`}>
                      {selectedDocument.accessLevel.charAt(0).toUpperCase() + selectedDocument.accessLevel.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Date</label>
                    <p className="text-gray-900">{new Date(selectedDocument.uploadDate).toLocaleString()}</p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Modified</label>
                    <p className="text-gray-900">{new Date(selectedDocument.lastModified).toLocaleString()}</p>
                  </div>
                  
                  {selectedDocument.verificationScore && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Verification Score</label>
                      <div className="flex items-center space-x-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                          selectedDocument.verificationScore >= 90 ? 'bg-green-500 text-white' :
                          selectedDocument.verificationScore >= 70 ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {selectedDocument.verificationScore}
                        </div>
                        <span className="text-gray-900">{selectedDocument.verificationScore}/100</span>
                      </div>
                    </div>
                  )}
                  
                  {selectedDocument.expiryDate && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <p className="text-gray-900">{new Date(selectedDocument.expiryDate).toLocaleDateString()}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tags */}
              {selectedDocument.tags.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedDocument.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Shared With */}
              {selectedDocument.sharedWith.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Shared With</label>
                  <div className="space-y-2">
                    {selectedDocument.sharedWith.map((email, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-gray-900">{email}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DocumentVault