import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle,
  Users,
  Shield,
  Building,
  GraduationCap,
  MapPin,
  UserCheck,
  Search,
  Filter,
  RefreshCw,
  ExternalLink,
  FileText,
  Trash2,
  Edit,
  Plus,
  X,
  Info,
  Zap,
  Globe,
  Key,
  HelpCircle,
  ChevronRight,
  ArrowUpRight,
  User,
  Mail,
  Phone,
  Calendar,
  MoreHorizontal,
  Target,
  TrendingUp,
  Database,
  LinkIcon,
  History
} from 'lucide-react'
import { useDropzone } from 'react-dropzone'

interface HistoricalUploadJob {
  id: string
  fileName: string
  uploadedBy: string
  uploadedOn: string
  recordCount: number
  dataType: string
  dateRange: string
  status: 'completed' | 'in_progress' | 'failed' | 'pending'
  successCount: number
  errorCount: number
  progress: number
}

const BulkHistoricalUpload = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'history'>('upload')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedDataType, setSelectedDataType] = useState('employment')
  const [dateRange, setDateRange] = useState({ start: '', end: '' })
  const [showFieldMapping, setShowFieldMapping] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock data for upload history
  const uploadHistory: HistoricalUploadJob[] = [
    {
      id: '1',
      fileName: 'Historical_Employment_2020_2022.xlsx',
      uploadedBy: 'Sarah Johnson',
      uploadedOn: '2024-01-15',
      recordCount: 250,
      dataType: 'Employment History',
      dateRange: 'Jan 2020 - Dec 2022',
      status: 'completed',
      successCount: 245,
      errorCount: 5,
      progress: 100
    },
    {
      id: '2',
      fileName: 'Legacy_Education_Records.csv',
      uploadedBy: 'Michael Chen',
      uploadedOn: '2024-01-12',
      recordCount: 180,
      dataType: 'Education Records',
      dateRange: 'Sep 2018 - Jul 2022',
      status: 'completed',
      successCount: 178,
      errorCount: 2,
      progress: 100
    },
    {
      id: '3',
      fileName: 'Address_Verification_Archive.xlsx',
      uploadedBy: 'David Wilson',
      uploadedOn: '2024-01-10',
      recordCount: 320,
      dataType: 'Address Verification',
      dateRange: 'Jan 2019 - Dec 2023',
      status: 'in_progress',
      successCount: 215,
      errorCount: 18,
      progress: 73
    },
    {
      id: '4',
      fileName: 'Historical_ID_Verifications.csv',
      uploadedBy: 'Amanda Foster',
      uploadedOn: '2024-01-08',
      recordCount: 420,
      dataType: 'Identity Verification',
      dateRange: 'Jan 2018 - Dec 2023',
      status: 'failed',
      successCount: 0,
      errorCount: 420,
      progress: 0
    }
  ]

  const dataTypeOptions = [
    {
      id: 'employment',
      label: 'Employment History',
      description: 'Historical employment records and verification data',
      icon: Building,
      color: 'bg-green-500'
    },
    {
      id: 'education',
      label: 'Education Records',
      description: 'Academic qualifications and verification history',
      icon: GraduationCap,
      color: 'bg-purple-500'
    },
    {
      id: 'identity',
      label: 'Identity Verification',
      description: 'Historical identity verification records',
      icon: Shield,
      color: 'bg-blue-500'
    },
    {
      id: 'address',
      label: 'Address Verification',
      description: 'Historical address verification data',
      icon: MapPin,
      color: 'bg-orange-500'
    },
    {
      id: 'reference',
      label: 'Reference Checks',
      description: 'Historical reference verification data',
      icon: UserCheck,
      color: 'bg-pink-500'
    }
  ]

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (file) {
      setUploadedFile(file)
      // Simulate field mapping requirement for Excel/CSV files
      if (file.name.endsWith('.xlsx') || file.name.endsWith('.csv')) {
        setShowFieldMapping(true)
      }
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/json': ['.json']
    },
    multiple: false
  })

  const handleUpload = async () => {
    if (!uploadedFile) return
    
    setLoading(true)
    
    // Simulate upload process
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setLoading(false)
    setActiveTab('history')
    setUploadedFile(null)
    setShowFieldMapping(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
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
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Historical Data Upload</h1>
          <p className="text-gray-600 mt-1">
            Import and process historical verification data from legacy systems or previous providers
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <HelpCircle className="w-4 h-4 mr-2" />
            Help Guide
          </button>
          <Link to="/organisation/api" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Key className="w-4 h-4 mr-2" />
            API Access
          </Link>
        </div>
      </div>

      {/* Upload Instructions Panel */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <History className="w-6 h-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Historical Data Import</h3>
            <p className="text-blue-800 mb-4">
              Import verification data from your previous systems or providers to maintain a complete verification history.
              This data will be integrated into your IDCertify account and contribute to trust scores.
            </p>
            
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-blue-700 font-medium">Supported formats:</span>
              <div className="flex items-center space-x-2">
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">.csv</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">.xlsx</span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">.json</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Template
              </button>
              <button className="border border-blue-300 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                View Data Format Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'upload', label: 'New Upload', icon: Upload },
            { id: 'history', label: 'Upload History', icon: History, count: uploadHistory.length }
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
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upload Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Upload */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Historical Data</h3>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
                  isDragActive 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                  <FileSpreadsheet className="w-12 h-12 text-gray-400 mb-4" />
                  {uploadedFile ? (
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-900 mb-1">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setUploadedFile(null)
                          setShowFieldMapping(false)
                        }}
                        className="mt-2 text-red-600 hover:text-red-700 text-sm flex items-center mx-auto"
                      >
                        <Trash2 className="w-4 h-4 mr-1" />
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {isDragActive ? 'Drop your file here' : 'Drag & drop your historical data file here'}
                      </p>
                      <p className="text-gray-500 mb-4">or</p>
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                        Browse Files
                      </button>
                      <p className="text-xs text-gray-500 mt-3">
                        Supports CSV, Excel (.xlsx), and JSON files up to 50MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Data Type Selection */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historical Data Type</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {dataTypeOptions.map((option) => (
                  <label key={option.id} className={`flex items-start p-4 border-2 rounded-lg hover:bg-gray-50 cursor-pointer ${
                    selectedDataType === option.id ? 'border-primary-500 bg-primary-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="dataType"
                      checked={selectedDataType === option.id}
                      onChange={() => setSelectedDataType(option.id)}
                      className="mt-1 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <option.icon className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">{option.label}</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Date Range</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Field Mapping */}
            {showFieldMapping && uploadedFile && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Mapping</h3>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Map your historical data columns to our system fields. We've auto-detected some mappings.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: 'Full Name', required: true, detected: 'Name' },
                      { field: 'Email', required: true, detected: 'Email Address' },
                      { field: 'Verification Date', required: true, detected: 'Date' },
                      { field: 'Verification Status', required: true, detected: 'Status' },
                      { field: 'Verification Source', required: false, detected: 'Source' },
                      { field: 'Verification Details', required: false, detected: 'Details' }
                    ].map((mapping, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className="flex-1">
                          <label className="block text-sm font-medium text-gray-700">
                            {mapping.field} {mapping.required && <span className="text-red-500">*</span>}
                          </label>
                          <select className="mt-1 w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                            <option value="">Select column...</option>
                            <option value={mapping.detected} selected>{mapping.detected}</option>
                            <option value="Column A">Column A</option>
                            <option value="Column B">Column B</option>
                            <option value="Column C">Column C</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Preview */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                    <h4 className="font-medium text-gray-900">Preview (First 3 rows)</h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Source</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">John Doe</td>
                          <td className="px-4 py-2 text-sm text-gray-900">john.doe@example.com</td>
                          <td className="px-4 py-2 text-sm text-gray-900">2022-05-15</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Verified</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Previous System</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Jane Smith</td>
                          <td className="px-4 py-2 text-sm text-gray-900">jane.smith@example.com</td>
                          <td className="px-4 py-2 text-sm text-gray-900">2022-06-20</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Verified</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Previous System</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Michael Johnson</td>
                          <td className="px-4 py-2 text-sm text-gray-900">michael.j@example.com</td>
                          <td className="px-4 py-2 text-sm text-gray-900">2022-07-10</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Failed</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Previous System</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Summary Panel */}
          <div className="space-y-6">
            {/* Upload Summary */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Upload Summary</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">File:</span>
                  <span className="font-medium text-gray-900">
                    {uploadedFile ? uploadedFile.name : 'No file selected'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated Records:</span>
                  <span className="font-medium text-gray-900">
                    {uploadedFile ? '~250' : '0'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Data Type:</span>
                  <span className="font-medium text-gray-900">
                    {dataTypeOptions.find(opt => opt.id === selectedDataType)?.label || 'Not selected'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date Range:</span>
                  <span className="font-medium text-gray-900">
                    {dateRange.start && dateRange.end 
                      ? `${new Date(dateRange.start).toLocaleDateString()} - ${new Date(dateRange.end).toLocaleDateString()}`
                      : 'Not specified'}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t">
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mt-0.5" />
                    <p className="text-xs text-yellow-800">
                      Historical data will be marked as imported from a previous system and will contribute to trust scores with appropriate weighting.
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={handleUpload}
                  disabled={!uploadedFile || loading}
                  className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <Upload className="w-5 h-5 mr-2" />
                      {showFieldMapping ? 'Confirm Mapping and Proceed' : 'Upload Historical Data'}
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <FileSpreadsheet className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Download Sample CSV</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <FileText className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm">View Data Format Guide</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm">Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search historical uploads..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Data Types</option>
                  <option>Employment History</option>
                  <option>Education Records</option>
                  <option>Identity Verification</option>
                  <option>Address Verification</option>
                </select>
                
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Failed</option>
                </select>
                
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>
          </div>

          {/* Upload History Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      File Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date Range
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Results
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {uploadHistory.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <FileSpreadsheet className="w-8 h-8 text-blue-500 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{job.fileName}</div>
                            <div className="text-sm text-gray-500">{job.recordCount} records</div>
                            <div className="text-xs text-gray-400">{job.uploadedOn}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.dataType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {job.dateRange}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(job.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                            {job.status.replace('_', ' ').charAt(0).toUpperCase() + job.status.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className={`h-2 rounded-full ${
                                job.status === 'completed' ? 'bg-green-500' :
                                job.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'
                              }`}
                              style={{ width: `${job.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{job.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2 text-sm">
                          <span className="text-green-600">{job.successCount} success</span>
                          <span className="text-gray-400">/</span>
                          <span className="text-red-600">{job.errorCount} errors</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button className="text-primary-600 hover:text-primary-900 flex items-center">
                            <Eye className="w-4 h-4 mr-1" />
                            View Details
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

      {/* Information Panel */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 border border-indigo-200">
        <div className="flex items-start space-x-4">
          <Info className="w-6 h-6 text-indigo-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">About Historical Data</h3>
            <p className="text-gray-700 mb-4">
              Historical data is treated differently from new verifications. The system applies appropriate weighting
              based on the age and source of the data. This ensures that your trust scores accurately reflect both
              historical and current verification information.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-indigo-100">
                <div className="flex items-center space-x-2 mb-2">
                  <History className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-medium text-gray-900">Data Aging</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Older verifications have reduced impact on current trust scores
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-medium text-gray-900">Source Weighting</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Data from trusted sources receives higher weighting
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 border border-indigo-100">
                <div className="flex items-center space-x-2 mb-2">
                  <Target className="w-5 h-5 text-indigo-600" />
                  <h4 className="font-medium text-gray-900">Trust Impact</h4>
                </div>
                <p className="text-sm text-gray-600">
                  Historical data contributes to comprehensive trust profiles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BulkHistoricalUpload