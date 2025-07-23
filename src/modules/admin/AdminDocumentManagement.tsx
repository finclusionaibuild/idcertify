import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter, 
  FolderPlus,
  Archive,
  Share2,
  Lock,
  Unlock,
  Calendar,
  User,
  Tag,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileImage,
  FilePdf,
  FileSpreadsheet
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'spreadsheet' | 'text' | 'other';
  category: 'kyc' | 'legal' | 'policy' | 'template' | 'report' | 'other';
  size: number;
  uploadedBy: string;
  uploadedAt: string;
  lastModified: string;
  status: 'active' | 'archived' | 'pending' | 'rejected';
  isPublic: boolean;
  isEncrypted: boolean;
  downloadCount: number;
  tags: string[];
  description?: string;
  version: string;
  expiresAt?: string;
}

interface DocumentFolder {
  id: string;
  name: string;
  parentId?: string;
  documentCount: number;
  createdAt: string;
  isPublic: boolean;
}

const AdminDocumentManagement: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-001',
      name: 'KYC Verification Guidelines.pdf',
      type: 'pdf',
      category: 'policy',
      size: 2048576,
      uploadedBy: 'admin@idcertify.com',
      uploadedAt: '2024-01-15T10:30:00Z',
      lastModified: '2024-01-15T10:30:00Z',
      status: 'active',
      isPublic: true,
      isEncrypted: false,
      downloadCount: 245,
      tags: ['kyc', 'guidelines', 'verification'],
      description: 'Comprehensive guidelines for KYC verification process',
      version: '2.1',
      expiresAt: '2024-12-31T23:59:59Z'
    },
    {
      id: 'doc-002',
      name: 'Privacy Policy Template.docx',
      type: 'text',
      category: 'template',
      size: 512000,
      uploadedBy: 'legal@idcertify.com',
      uploadedAt: '2024-01-14T15:20:00Z',
      lastModified: '2024-01-14T15:20:00Z',
      status: 'active',
      isPublic: false,
      isEncrypted: true,
      downloadCount: 89,
      tags: ['privacy', 'template', 'legal'],
      description: 'Standard privacy policy template for client implementations',
      version: '1.3'
    }
  ]);

  const [folders, setFolders] = useState<DocumentFolder[]>([
    {
      id: 'folder-001',
      name: 'KYC Documents',
      documentCount: 45,
      createdAt: '2024-01-01T00:00:00Z',
      isPublic: true
    },
    {
      id: 'folder-002',
      name: 'Legal Templates',
      documentCount: 23,
      createdAt: '2024-01-01T00:00:00Z',
      isPublic: false
    },
    {
      id: 'folder-003',
      name: 'System Reports',
      documentCount: 156,
      createdAt: '2024-01-01T00:00:00Z',
      isPublic: false
    }
  ]);

  const [activeTab, setActiveTab] = useState<'documents' | 'folders' | 'analytics' | 'settings'>('documents');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FilePdf className="w-5 h-5 text-red-600" />;
      case 'image': return <FileImage className="w-5 h-5 text-blue-600" />;
      case 'spreadsheet': return <FileSpreadsheet className="w-5 h-5 text-green-600" />;
      default: return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'archived': return <Archive className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'kyc': return 'bg-blue-100 text-blue-800';
      case 'legal': return 'bg-purple-100 text-purple-800';
      case 'policy': return 'bg-orange-100 text-orange-800';
      case 'template': return 'bg-green-100 text-green-800';
      case 'report': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesCategory = filterCategory === 'all' || doc.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         doc.description?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Document Management System</h1>
          <p className="text-gray-600 mt-2">Manage documents, templates, and file repositories</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Upload Document
          </button>
          <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 flex items-center gap-2">
            <FolderPlus className="w-4 h-4" />
            New Folder
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'documents', label: 'Documents', icon: FileText },
            { id: 'folders', label: 'Folders', icon: FolderPlus },
            { id: 'analytics', label: 'Analytics', icon: Calendar },
            { id: 'settings', label: 'Settings', icon: Edit }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Documents Tab */}
      {activeTab === 'documents' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold text-gray-900">{documents.length}</p>
                </div>
                <FileText className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatFileSize(documents.reduce((sum, doc) => sum + doc.size, 0))}
                  </p>
                </div>
                <Archive className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Downloads</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.reduce((sum, doc) => sum + doc.downloadCount, 0)}
                  </p>
                </div>
                <Download className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Encrypted</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {documents.filter(doc => doc.isEncrypted).length}
                  </p>
                </div>
                <Lock className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-soft border">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-64"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Categories</option>
                  <option value="kyc">KYC</option>
                  <option value="legal">Legal</option>
                  <option value="policy">Policy</option>
                  <option value="template">Template</option>
                  <option value="report">Report</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Documents Table */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Security</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Downloads</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modified</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDocuments.map((document) => (
                    <tr key={document.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          {getFileIcon(document.type)}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{document.name}</div>
                            <div className="text-sm text-gray-500">v{document.version}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(document.category)}`}>
                          {document.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatFileSize(document.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(document.status)}`}>
                          {getStatusIcon(document.status)}
                          {document.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {document.isEncrypted ? (
                            <Lock className="w-4 h-4 text-yellow-600" title="Encrypted" />
                          ) : (
                            <Unlock className="w-4 h-4 text-gray-400" title="Not encrypted" />
                          )}
                          {document.isPublic ? (
                            <Share2 className="w-4 h-4 text-green-600" title="Public" />
                          ) : (
                            <User className="w-4 h-4 text-gray-400" title="Private" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {document.downloadCount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(document.lastModified).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedDocument(document)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
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

      {/* Folders Tab */}
      {activeTab === 'folders' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Document Folders</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {folders.map((folder) => (
                  <div key={folder.id} className="border rounded-lg p-6 hover:shadow-medium transition-shadow">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <FolderPlus className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{folder.name}</h4>
                          <p className="text-sm text-gray-600">{folder.documentCount} documents</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {folder.isPublic ? (
                          <Share2 className="w-4 h-4 text-green-600" title="Public folder" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" title="Private folder" />
                        )}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mb-4">
                      Created: {new Date(folder.createdAt).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        <Eye className="w-4 h-4 inline mr-1" />
                        Open
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        <Edit className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        <Trash2 className="w-4 h-4 inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Document Types</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">PDF Documents</span>
                  <span className="font-bold text-2xl text-red-600">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Images</span>
                  <span className="font-bold text-2xl text-blue-600">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Text Documents</span>
                  <span className="font-bold text-2xl text-green-600">25%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Most Downloaded</span>
                  <span className="font-bold text-gray-900">KYC Guidelines</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average File Size</span>
                  <span className="font-bold text-gray-900">1.2 MB</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Uploads</span>
                  <span className="font-bold text-green-600">+23%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Document Management Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Storage Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Maximum file size</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-2">
                      <option>10 MB</option>
                      <option>50 MB</option>
                      <option>100 MB</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Auto-archive after</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-2">
                      <option>6 months</option>
                      <option>1 year</option>
                      <option>2 years</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Security Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">Encrypt sensitive documents by default</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">Require approval for public documents</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-700">Enable document versioning</span>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Document Detail Modal */}
      {selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-hard max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  {getFileIcon(selectedDocument.type)}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedDocument.name}</h2>
                    <p className="text-gray-600">Version {selectedDocument.version}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedDocument(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-3">Document Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Category:</strong> <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(selectedDocument.category)}`}>{selectedDocument.category}</span></div>
                    <div><strong>Size:</strong> {formatFileSize(selectedDocument.size)}</div>
                    <div><strong>Type:</strong> {selectedDocument.type.toUpperCase()}</div>
                    <div><strong>Downloads:</strong> {selectedDocument.downloadCount}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Security & Access</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Status:</strong> <span className={`px-2 py-1 rounded text-xs ${getStatusColor(selectedDocument.status)}`}>{selectedDocument.status}</span></div>
                    <div><strong>Public:</strong> {selectedDocument.isPublic ? 'Yes' : 'No'}</div>
                    <div><strong>Encrypted:</strong> {selectedDocument.isEncrypted ? 'Yes' : 'No'}</div>
                    <div><strong>Expires:</strong> {selectedDocument.expiresAt ? new Date(selectedDocument.expiresAt).toLocaleDateString() : 'Never'}</div>
                  </div>
                </div>
              </div>

              {selectedDocument.description && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedDocument.description}</p>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedDocument.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full flex items-center gap-1">
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Upload Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Uploaded by:</strong> {selectedDocument.uploadedBy}</div>
                    <div><strong>Upload date:</strong> {new Date(selectedDocument.uploadedAt).toLocaleString()}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Last Modified</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Modified:</strong> {new Date(selectedDocument.lastModified).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Edit Details
                </button>
                <button className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </button>
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDocumentManagement;