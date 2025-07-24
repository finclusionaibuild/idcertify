import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
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
  Link as LinkIcon,
  Shield,
  Building,
  GraduationCap,
  MapPin,
  UserCheck,
  Eye,
  Trash2,
  Search,
  Filter,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Edit,
  ExternalLink,
  X,
  FileText
} from '@mui/icons-material'
import WarningIcon from '@mui/icons-material/Warning';
import { useDropzone } from 'react-dropzone'

interface UploadJob {
  id: string
  fileName: string
  uploadedBy: string
  uploadedOn: string
  recordCount: number
  verificationTypes: string[]
  status: 'completed' | 'in_progress' | 'failed' | 'pending'
  successCount: number
  errorCount: number
  progress: number
}

interface UploadRecord {
  id: string
  fullName: string
  email: string
  nin?: string
  position?: string
  status: 'success' | 'error' | 'pending'
  errorReason?: string
  verificationResults?: any
}

const BulkUpload = () => {
  const [activeTab, setActiveTab] = useState<'upload' | 'history' | 'results'>('upload')
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [selectedVerificationTypes, setSelectedVerificationTypes] = useState({
    identity: true,
    employment: true,
    education: false,
    address: true,
    aml: true,
    pep: true,
    guarantor: false
  })
  const [autoTrigger, setAutoTrigger] = useState(true)
  const [showFieldMapping, setShowFieldMapping] = useState(false)
  const [showResultsModal, setShowResultsModal] = useState(false)
  const [selectedJob, setSelectedJob] = useState<UploadJob | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock data for upload history
  const uploadHistory: UploadJob[] = [
    {
      id: '1',
      fileName: 'Q1_2024_New_Hires.xlsx',
      uploadedBy: 'Sarah Johnson',
      uploadedOn: '2024-01-20',
      recordCount: 150,
      verificationTypes: ['Identity', 'Employment', 'Address'],
      status: 'in_progress',
      successCount: 89,
      errorCount: 12,
      progress: 67
    },
    {
      id: '2',
      fileName: 'Executive_Team_Verification.csv',
      uploadedBy: 'Michael Chen',
      uploadedOn: '2024-01-19',
      recordCount: 25,
      verificationTypes: ['Identity', 'Employment', 'AML', 'PEP'],
      status: 'completed',
      successCount: 24,
      errorCount: 1,
      progress: 100
    },
    {
      id: '3',
      fileName: 'Contractor_Onboarding.xlsx',
      uploadedBy: 'David Wilson',
      uploadedOn: '2024-01-18',
      recordCount: 75,
      verificationTypes: ['Identity', 'Address'],
      status: 'failed',
      successCount: 0,
      errorCount: 75,
      progress: 0
    },
    {
      id: '4',
      fileName: 'Remote_Workers_Verification.csv',
      uploadedBy: 'Amanda Foster',
      uploadedOn: '2024-01-17',
      recordCount: 200,
      verificationTypes: ['Identity', 'Employment', 'Education'],
      status: 'completed',
      successCount: 187,
      errorCount: 13,
      progress: 100
    }
  ]

  // Mock sample records for results view
  const sampleRecords: UploadRecord[] = [
    {
      id: '1',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      nin: 'NIN12345678901',
      position: 'Software Engineer',
      status: 'success'
    },
    {
      id: '2',
      fullName: 'Jane Smith',
      email: 'jane.smith@company.com',
      position: 'Product Manager',
      status: 'error',
      errorReason: 'Missing NIN'
    },
    {
      id: '3',
      fullName: 'Michael Johnson',
      email: 'michael.j@email.com',
      nin: 'NIN98765432109',
      position: 'Designer',
      status: 'pending'
    }
  ]

  const verificationTypeOptions = [
    {
      id: 'identity',
      label: 'Identity Verification',
      description: 'Verify government-issued ID documents',
      icon: Shield,
      cost: '₦500'
    },
    {
      id: 'employment',
      label: 'Employment History',
      description: 'Verify current and previous employment',
      icon: Building,
      cost: '₦750'
    },
    {
      id: 'education',
      label: 'Education Credentials',
      description: 'Verify academic qualifications',
      icon: GraduationCap,
      cost: '₦600'
    },
    {
      id: 'address',
      label: 'Address Verification',
      description: 'Verify residential address',
      icon: MapPin,
      cost: '₦400'
    },
    {
      id: 'aml',
      label: 'AML Screening',
      description: 'Anti-Money Laundering database check',
      icon: Shield,
      cost: '₦300'
    },
    {
      id: 'pep',
      label: 'PEP Check',
      description: 'Politically Exposed Person screening',
      icon: Globe,
      cost: '₦300'
    },
    {
      id: 'guarantor',
      label: 'Guarantor Verification',
      description: 'Verify guarantor information',
      icon: UserCheck,
      cost: '₦800'
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

  const getRecordStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const calculateTotalCost = () => {
    const selectedTypes = Object.entries(selectedVerificationTypes)
      .filter(([_, selected]) => selected)
      .map(([type, _]) => type)
    
    const totalCost = selectedTypes.reduce((sum, type) => {
      const option = verificationTypeOptions.find(opt => opt.id === type)
      if (option) {
        const cost = parseInt(option.cost.replace('₦', '').replace(',', ''))
        return sum + cost
      }
      return sum
    }, 0)
    
    return totalCost
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Bulk Upload – Staff & Candidate Data</h1>
          <p className="text-gray-600 mt-1">
            Upload external data for background checks, onboarding, and multi-verification of employees or job candidates.
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
          <Info className="w-6 h-6 text-blue-600 mt-1" />
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">Getting Started</h3>
            <p className="text-blue-800 mb-4">
              Prepare a spreadsheet or JSON file with your employees' or candidates' data from your HR tool, 
              applicant tracker, or recruitment form.
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
                Download Sample Template
              </button>
              <button className="border border-blue-300 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                View Field Mapping Guide
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
            { id: 'history', label: 'Upload History', icon: Database, count: uploadHistory.length },
            { id: 'results', label: 'View Results', icon: Target }
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
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload File</h3>
              
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
                        {isDragActive ? 'Drop your file here' : 'Drag & drop your file here'}
                      </p>
                      <p className="text-gray-500 mb-4">or</p>
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                        Browse Files
                      </button>
                      <p className="text-xs text-gray-500 mt-3">
                        Supports CSV, Excel (.xlsx), and JSON files up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Verification Types Selection */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Verification Types</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {verificationTypeOptions.map((option) => (
                  <label key={option.id} className="flex items-start p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedVerificationTypes[option.id as keyof typeof selectedVerificationTypes]}
                      onChange={(e) => setSelectedVerificationTypes(prev => ({
                        ...prev,
                        [option.id]: e.target.checked
                      }))}
                      className="mt-1 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <option.icon className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900">{option.label}</span>
                        <span className="text-xs text-primary-600 font-medium">{option.cost}</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="border-t pt-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={autoTrigger}
                    onChange={(e) => setAutoTrigger(e.target.checked)}
                    className="text-primary-600 focus:ring-primary-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Automatically trigger background checks upon upload
                  </span>
                </label>
              </div>
            </div>

            {/* Field Mapping */}
            {showFieldMapping && uploadedFile && (
              <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Field Mapping</h3>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-4">
                    Map your file columns to our system fields. We've auto-detected some mappings.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: 'Full Name', required: true, detected: 'Name' },
                      { field: 'Email', required: true, detected: 'Email Address' },
                      { field: 'NIN', required: false, detected: 'National ID' },
                      { field: 'Phone', required: false, detected: 'Phone Number' },
                      { field: 'Position', required: false, detected: 'Job Title' },
                      { field: 'Start Date', required: false, detected: 'Hire Date' }
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
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">NIN</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">John Doe</td>
                          <td className="px-4 py-2 text-sm text-gray-900">john.doe@company.com</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Software Engineer</td>
                          <td className="px-4 py-2 text-sm text-gray-900">12345678901</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Jane Smith</td>
                          <td className="px-4 py-2 text-sm text-gray-900">jane.smith@company.com</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Product Manager</td>
                          <td className="px-4 py-2 text-sm text-gray-900">98765432109</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-900">Michael Johnson</td>
                          <td className="px-4 py-2 text-sm text-gray-900">michael.j@company.com</td>
                          <td className="px-4 py-2 text-sm text-gray-900">Designer</td>
                          <td className="px-4 py-2 text-sm text-gray-900">11223344556</td>
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
                  <span className="text-gray-600">Records:</span>
                  <span className="font-medium text-gray-900">
                    {uploadedFile ? '~150' : '0'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Verification Types:</span>
                  <span className="font-medium text-gray-900">
                    {Object.values(selectedVerificationTypes).filter(Boolean).length}
                  </span>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-gray-600">Est. Cost per Record:</span>
                  <span className="font-bold text-primary-600">
                    ₦{calculateTotalCost().toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Est. Cost:</span>
                  <span className="font-bold text-gray-900">
                    ₦{(calculateTotalCost() * (uploadedFile ? 150 : 0)).toLocaleString()}
                  </span>
                </div>
              </div>
              
              <button
                onClick={handleUpload}
                disabled={!uploadedFile || loading}
                className="w-full mt-6 bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    {showFieldMapping ? 'Confirm Mapping and Proceed' : 'Upload and Continue'}
                  </>
                )}
              </button>
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
                  <span className="text-sm">Download Sample Excel</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm">View Documentation</span>
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
                    placeholder="Search upload jobs..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Status</option>
                  <option>Completed</option>
                  <option>In Progress</option>
                  <option>Failed</option>
                </select>
                
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
                
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
                      Uploaded By
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
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-sm text-gray-900">{job.uploadedBy}</span>
                        </div>
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
                          <button 
                            onClick={() => {
                              setSelectedJob(job)
                              setShowResultsModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-900 flex items-center"
                          >
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

      {activeTab === 'results' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Upload Results Viewer</h3>
            <p className="text-gray-600 mt-1">View detailed results for individual records</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {sampleRecords.map((record) => (
              <div key={record.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{record.fullName}</p>
                      <p className="text-sm text-gray-500">{record.email}</p>
                      {record.position && (
                        <p className="text-xs text-gray-400">{record.position}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getRecordStatusIcon(record.status)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        record.status === 'success' ? 'bg-green-100 text-green-800' :
                        record.status === 'error' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                      </span>
                    </div>
                    
                    {record.errorReason && (
                      <span className="text-sm text-red-600">{record.errorReason}</span>
                    )}
                    
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry Failed Records
                </button>
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Before Resubmitting
                </button>
              </div>
              
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Download Results
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Integration CTA */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <LinkIcon className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Want to sync uploads from your HR or onboarding system?</h3>
              <p className="text-gray-600 text-sm">Automate bulk uploads with direct integration to your existing tools</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Link to="/organisation/api" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center">
              <Key className="w-4 h-4 mr-2" />
              Get API Access
            </Link>
            <Link to="/organisation/api" className="border border-green-300 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-50 transition-colors flex items-center">
              <ExternalLink className="w-4 h-4 mr-2" />
              Connect HR Platform
            </Link>
          </div>
        </div>
      </div>

      {/* Results Modal */}
      {showResultsModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Upload Job Details</h2>
                <button 
                  onClick={() => setShowResultsModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Job Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4">
                  <FileSpreadsheet className="w-12 h-12 text-blue-500" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedJob.fileName}</h3>
                    <p className="text-gray-600">Uploaded by {selectedJob.uploadedBy} on {selectedJob.uploadedOn}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedJob.status)}`}>
                        {selectedJob.status.replace('_', ' ').charAt(0).toUpperCase() + selectedJob.status.replace('_', ' ').slice(1)}
                      </span>
                      <span className="text-sm text-gray-600">
                        {selectedJob.recordCount} records
                      </span>
                      <span className="text-sm text-gray-600">
                        Progress: {selectedJob.progress}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Results Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-2xl font-bold text-green-900">{selectedJob.successCount}</p>
                      <p className="text-sm text-green-700">Successful</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <XCircle className="w-8 h-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold text-red-900">{selectedJob.errorCount}</p>
                      <p className="text-sm text-red-700">Failed</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-2xl font-bold text-blue-900">
                        {Math.round((selectedJob.successCount / selectedJob.recordCount) * 100)}%
                      </p>
                      <p className="text-sm text-blue-700">Success Rate</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Verification Types */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Verification Types Performed</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.verificationTypes.map((type, index) => (
                    <span key={index} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Download Full Report
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                  View Detailed Results
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BulkUpload