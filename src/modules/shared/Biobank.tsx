import React, { useState, useCallback } from 'react'
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
  SortDesc,
  Database,
  Key
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { useAuth } from '../contexts/AuthContext'

interface Document {
  id: string
  name: string
  type: 'pdf' | 'image' | 'spreadsheet' | 'document' | 'archive'
  size: number
  uploadDate: string
  lastModified: string
  category: 'identity' | 'education' | 'employment' | 'address' | 'financial' | 'health' | 'other'
  status: 'verified' | 'pending' | 'rejected' | 'expired'
  accessLevel: 'private' | 'shared' | 'public'
  tags: string[]
  isStarred: boolean
  isEncrypted: boolean
  verificationScore?: number
  expiryDate?: string
  description?: string
}

interface Category {
  id: string
  name: string
  icon: any
  color: string
  count: number
}

const Biobank = () => {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState<'all' | 'identity' | 'education' | 'employment' | 'address' | 'financial' | 'health'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [sortBy, setSortBy] = useState('date')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc')
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [showDocumentModal, setShowDocumentModal] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock documents data
  const documents: Document[] = [
    {
      id: '1',
      name: 'National ID Card.pdf',
      type: 'pdf',
      size: 2048000,
      uploadDate: '2024-01-15T10:00:00Z',
      lastModified: '2024-01-15T10:00:00Z',
      category: 'identity',
      status: 'verified',
      accessLevel: 'private',
      tags: ['government', 'identity', 'official'],
      isStarred: true,
      isEncrypted: true,
      verificationScore: 98,
      expiryDate: '2030-01-15',
      description: 'National ID card issued by NIMC'
    },
    {
      id: '2',
      name: 'Passport.pdf',
      type: 'pdf',
      size: 3072000,
      uploadDate: '2024-01-10T14:30:00Z',
      lastModified: '2024-01-10T14:30:00Z',
      category: 'identity',
      status: 'verified',
      accessLevel: 'private',
      tags: ['government', 'identity', 'travel'],
      isStarred: true,
      isEncrypted: true,
      verificationScore: 95,
      expiryDate: '2028-06-20',
      description: 'International passport'
    },
    {
      id: '3',
      name: 'University Degree.pdf',
      type: 'pdf',
      size: 1536000,
      uploadDate: '2024-01-08T11:20:00Z',
      lastModified: '2024-01-08T11:20:00Z',
      category: 'education',
      status: 'pending',
      accessLevel: 'private',
      tags: ['education', 'degree', 'university'],
      isStarred: false,
      isEncrypted: false,
      description: 'Bachelor of Science in Computer Science'
    },
    {
      id: '4',
      name: 'Employment Certificate.pdf',
      type: 'pdf',
      size: 1024000,
      uploadDate: '2024-01-05T16:45:00Z',
      lastModified: '2024-01-05T16:45:00Z',
      category: 'employment',
      status: 'verified',
      accessLevel: 'shared',
      tags: ['employment', 'certificate', 'work'],
      isStarred: false,
      isEncrypted: false,
      verificationScore: 90,
      description: 'Employment certificate from previous employer'
    },
    {
      id: '5',
      name: 'Utility Bill.pdf',
      type: 'pdf',
      size: 768000,
      uploadDate: '2024-01-03T09:30:00Z',
      lastModified: '2024-01-03T09:30:00Z',
      category: 'address',
      status: 'verified',
      accessLevel: 'private',
      tags: ['address', 'utility', 'proof'],
      isStarred: false,
      isEncrypted: false,
      verificationScore: 85,
      expiryDate: '2024-04-03',
      description: 'Electricity bill for address verification'
    },
    {
      id: '6',
      name: 'Bank Statement.pdf',
      type: 'pdf',
      size: 1280000,
      uploadDate: '2024-01-02T13:15:00Z',
      lastModified: '2024-01-02T13:15:00Z',
      category: 'financial',
      status: 'verified',
      accessLevel: 'private',
      tags: ['financial', 'bank', 'statement'],
      isStarred: false,
      isEncrypted: true,
      verificationScore: 92,
      expiryDate: '2024-02-02',
      description: 'Bank statement for the last 3 months'
    },
    {
      id: '7',
      name: 'Medical Certificate.pdf',
      type: 'pdf',
      size: 896000,
      uploadDate: '2023-12-28T10:45:00Z',
      lastModified: '2023-12-28T10:45:00Z',
      category: 'health',
      status: 'expired',
      accessLevel: 'private',
      tags: ['health', 'medical', 'certificate'],
      isStarred: false,
      isEncrypted: true,
      verificationScore: 80,
      expiryDate: '2024-01-15',
      description: 'Medical fitness certificate'
    }
  ]

  // Categories
  const categories: Category[] = [
    { id: 'all', name: 'All Documents', icon: FileText, color: 'bg-gray-500', count: documents.length },
    { id: 'identity', name: 'Identity', icon: Shield, color: 'bg-blue-500', count: documents.filter(d => d.category === 'identity').length },
    { id: 'education', name: 'Education', icon: FileText, color: 'bg-purple-500', count: documents.filter(d => d.category === 'education').length },
    { id: 'employment', name: 'Employment', icon: Building, color: 'bg-green-500', count: documents.filter(d => d.category === 'employment').length },
    { id: 'address', name: 'Address', icon: FileText, color: 'bg-orange-500', count: documents.filter(d => d.category === 'address').length },
    { id: 'financial', name: 'Financial', icon: FileText, color: 'bg-yellow-500', count: documents.filter(d => d.category === 'financial').length },
    { id: 'health', name: 'Health', icon: FileText, color: 'bg-red-500', count: documents.filter(d => d.category === 'health').length }
  ]

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log('Accepted files:', acceptedFiles)
    setShowUploadModal(true)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    }
  })

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
      case 'expired':
        return <AlertTriangle className="w-5 h-5 text-gray-500" />
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
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'private':
        return 'bg-red-100 text-red-800'
      case 'shared':
        return 'bg-blue-100 text-blue-800'
      case 'public':
        return 'bg-green-100 text-green-800'
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
    const matchesCategory = activeTab === 'all' || doc.category === activeTab
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus
    
    return matchesSearch && matchesCategory && matchesStatus
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
      case 'status':
        aValue = a.status
        bValue = b.status
        break
      default:
        aValue = new Date(a.uploadDate)
        bValue = new Date(b.uploadDate)
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Biobank</h1>
          <p className="text-gray-600 mt-1">Securely store and manage your personal identity documents</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setShowUploadModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </button>
        </div>
      </div>

      {/* Storage Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Document Overview</h3>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-green-600">All systems operational</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{documents.length}</div>
            <div className="text-sm text-gray-600">Total Documents</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {documents.filter(d => d.status === 'verified').length}
            </div>
            <div className="text-sm text-gray-600">Verified</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {documents.filter(d => d.status === 'pending').length}
            </div>
            <div className="text-sm text-gray-600">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {documents.filter(d => d.status === 'expired').length}
            </div>
            <div className="text-sm text-gray-600">Expired</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-gray-600">Storage Usage</span>
            <span className="font-medium">
              {formatFileSize(documents.reduce((sum, doc) => sum + doc.size, 0))} of 1 GB
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary-600 h-2 rounded-full" 
              style={{ width: `${(documents.reduce((sum, doc) => sum + doc.size, 0) / (1024 * 1024 * 1024)) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Document Categories */}
      <div className="bg-white rounded-2xl shadow-sm p-4 border border-gray-200">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id as any)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4 mr-2" />
              {category.name}
              <span className="ml-2 bg-white bg-opacity-20 text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {category.count}
              </span>
            </button>
          ))}
        </div>
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
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
              <option value="expired">Expired</option>
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

      {/* Sort Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-600">Sort by:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="date">Date</option>
            <option value="name">Name</option>
            <option value="size">Size</option>
            <option value="status">Status</option>
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
                  <span className="text-gray-600">Uploaded</span>
                  <span className="text-gray-900">{new Date(doc.uploadDate).toLocaleDateString()}</span>
                </div>
                {doc.expiryDate && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Expires</span>
                    <span className={`text-gray-900 ${
                      new Date(doc.expiryDate) < new Date() ? 'text-red-600' : ''
                    }`}>
                      {new Date(doc.expiryDate).toLocaleDateString()}
                    </span>
                  </div>
                )}
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

          {/* Add Document Card */}
          <div 
            onClick={() => setShowUploadModal(true)}
            className="bg-gray-50 rounded-2xl border-2 border-dashed border-gray-300 p-6 hover:border-primary-400 hover:bg-gray-100 transition-colors cursor-pointer flex flex-col items-center justify-center text-center"
          >
            <Plus className="w-12 h-12 text-gray-400 mb-4" />
            <h4 className="font-medium text-gray-900 mb-2">Add New Document</h4>
            <p className="text-sm text-gray-600">
              Upload a new document to your biobank
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Document
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
                    Uploaded
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Expires
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
                      <div className="flex items-center">
                        {getFileIcon(doc.type)}
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{doc.name}</div>
                          <div className="text-xs text-gray-500">{doc.description}</div>
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
                      {new Date(doc.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {doc.expiryDate ? new Date(doc.expiryDate).toLocaleDateString() : '-'}
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

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
                <button 
                  onClick={() => setShowUploadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-400 transition-colors">
                <input {...getInputProps()} />
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-900 mb-2">Drop files here or click to browse</p>
                <p className="text-gray-600 mb-4">Support for PDF, images, and documents up to 10MB</p>
                <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  Choose Files
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="">Select Document Type</option>
                    <option value="national_id">National ID</option>
                    <option value="passport">Passport</option>
                    <option value="drivers_license">Driver's License</option>
                    <option value="birth_certificate">Birth Certificate</option>
                    <option value="education_certificate">Education Certificate</option>
                    <option value="employment_certificate">Employment Certificate</option>
                    <option value="utility_bill">Utility Bill</option>
                    <option value="bank_statement">Bank Statement</option>
                    <option value="medical_certificate">Medical Certificate</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="identity">Identity</option>
                    <option value="education">Education</option>
                    <option value="employment">Employment</option>
                    <option value="address">Address</option>
                    <option value="financial">Financial</option>
                    <option value="health">Health</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Add a description for this document"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (if applicable)</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                    <span className="ml-2 text-sm text-gray-700">Encrypt document</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-primary-600 focus:ring-primary-500" />
                    <span className="ml-2 text-sm text-gray-700">Request verification</span>
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
                  Upload Document
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
                    <span>Uploaded on {new Date(selectedDocument.uploadDate).toLocaleDateString()}</span>
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
                      <p className={`text-gray-900 ${
                        new Date(selectedDocument.expiryDate) < new Date() ? 'text-red-600 font-medium' : ''
                      }`}>
                        {new Date(selectedDocument.expiryDate).toLocaleDateString()}
                        {new Date(selectedDocument.expiryDate) < new Date() && ' (Expired)'}
                      </p>
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

              {/* Document Preview Placeholder */}
              <div className="border border-gray-200 rounded-lg p-8 bg-gray-50 flex flex-col items-center justify-center">
                <FileText className="w-16 h-16 text-gray-400 mb-4" />
                <p className="text-gray-600 mb-4">Document preview not available</p>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
                  Download to View
                </button>
              </div>

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

      {/* Information Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <Info className="w-6 h-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">About Your Biobank</h3>
            <p className="text-blue-700 mb-4">
              Your Biobank securely stores your personal identity documents and verification history.
              These documents can be used for verification requests from organizations, improving your trust score,
              and simplifying future verification processes.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Lock className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Secure Storage</h4>
                </div>
                <p className="text-sm text-gray-600">
                  End-to-end encryption for sensitive documents
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Controlled Access</h4>
                </div>
                <p className="text-sm text-gray-600">
                  You control who can access your documents
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-blue-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Database className="w-5 h-5 text-blue-600" />
                  <h4 className="font-medium text-gray-900">Verification History</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Complete record of all document verifications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Biobank