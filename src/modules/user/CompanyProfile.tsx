import React, { useState } from 'react'
import { 
  Building, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Calendar,
  Edit,
  Save,
  X,
  Upload,
  Camera,
  Shield,
  Award,
  Users,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  Settings,
  Eye,
  Download,
  Plus,
  Trash2,
  Star,
  Target,
  BarChart3,
  TrendingUp,
  Zap,
  Lock,
  Key,
  Bell,
  HelpCircle
} from 'lucide-react'
import { useAuth } from "@shared/contexts/AuthContext";

interface CompanyInfo {
  companyName: string
  registrationNumber: string
  taxId: string
  industry: string
  companySize: string
  foundedYear: string
  website: string
  description: string
  headquarters: {
    address: string
    city: string
    state: string
    country: string
    postalCode: string
  }
  contact: {
    primaryEmail: string
    primaryPhone: string
    supportEmail: string
    supportPhone: string
  }
  verification: {
    status: 'verified' | 'pending' | 'rejected'
    verifiedDate?: string
    documents: string[]
  }
  compliance: {
    kycCompliant: boolean
    amlCompliant: boolean
    gdprCompliant: boolean
    lastAudit: string
  }
}

const CompanyProfile = () => {
  const { profile, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'verification' | 'compliance' | 'settings'>('overview')

  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>({
    companyName: profile?.company_name || 'TechCorp Solutions',
    registrationNumber: 'RC123456789',
    taxId: 'TIN987654321',
    industry: profile?.industry || 'Technology',
    companySize: '51-200 employees',
    foundedYear: '2018',
    website: 'https://techcorp.com',
    description: 'Leading technology solutions provider specializing in digital transformation and enterprise software development.',
    headquarters: {
      address: '123 Business District',
      city: 'Lagos',
      state: 'Lagos State',
      country: 'Nigeria',
      postalCode: '100001'
    },
    contact: {
      primaryEmail: profile?.email || 'contact@techcorp.com',
      primaryPhone: '+234-801-234-5678',
      supportEmail: 'support@techcorp.com',
      supportPhone: '+234-801-234-5679'
    },
    verification: {
      status: 'verified',
      verifiedDate: '2024-01-15',
      documents: ['Certificate of Incorporation', 'Tax Clearance Certificate', 'CAC Form']
    },
    compliance: {
      kycCompliant: true,
      amlCompliant: true,
      gdprCompliant: true,
      lastAudit: '2024-01-10'
    }
  })

  const handleSave = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update profile context
      await updateProfile({
        company_name: companyInfo.companyName,
        industry: companyInfo.industry,
        website: companyInfo.website
      })
      
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const getVerificationBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getVerificationIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-600 mt-1">Manage your organization's profile and verification settings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </button>
              <button 
                onClick={handleSave}
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
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* Company Header Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 bg-primary-600 rounded-2xl flex items-center justify-center">
              <Building className="w-12 h-12 text-white" />
            </div>
            <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
              <Camera className="w-4 h-4 text-gray-600" />
            </button>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{companyInfo.companyName}</h2>
              <div className="flex items-center space-x-2">
                {getVerificationIcon(companyInfo.verification.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getVerificationBadge(companyInfo.verification.status)}`}>
                  {companyInfo.verification.status.charAt(0).toUpperCase() + companyInfo.verification.status.slice(1)}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4" />
                <span>{companyInfo.industry}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>{companyInfo.companySize}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Founded {companyInfo.foundedYear}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4" />
                <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                  {companyInfo.website}
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500 mb-1">Trust Score</div>
            <div className="text-2xl font-bold text-primary-600">{profile?.trust_score || 92}</div>
            <div className="text-xs text-gray-500">{profile?.sure_rating || 'Excellent'}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Building },
            { id: 'verification', label: 'Verification', icon: Shield },
            { id: 'compliance', label: 'Compliance', icon: Award },
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

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Company Information */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Company Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyInfo.companyName}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, companyName: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.companyName}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                  <p className="text-gray-900">{companyInfo.registrationNumber}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tax ID</label>
                  <p className="text-gray-900">{companyInfo.taxId}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Industry</label>
                  {isEditing ? (
                    <select
                      value={companyInfo.industry}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, industry: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Financial Services">Financial Services</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Education">Education</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="Retail">Retail</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{companyInfo.industry}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                  {isEditing ? (
                    <select
                      value={companyInfo.companySize}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, companySize: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="1-10 employees">1-10 employees</option>
                      <option value="11-50 employees">11-50 employees</option>
                      <option value="51-200 employees">51-200 employees</option>
                      <option value="201-500 employees">201-500 employees</option>
                      <option value="501-1000 employees">501-1000 employees</option>
                      <option value="1000+ employees">1000+ employees</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{companyInfo.companySize}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  {isEditing ? (
                    <input
                      type="url"
                      value={companyInfo.website}
                      onChange={(e) => setCompanyInfo(prev => ({ ...prev, website: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <a href={companyInfo.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-700">
                      {companyInfo.website}
                    </a>
                  )}
                </div>
              </div>
              
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Description</label>
                {isEditing ? (
                  <textarea
                    value={companyInfo.description}
                    onChange={(e) => setCompanyInfo(prev => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                ) : (
                  <p className="text-gray-900">{companyInfo.description}</p>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={companyInfo.contact.primaryEmail}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, primaryEmail: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.contact.primaryEmail}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Primary Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={companyInfo.contact.primaryPhone}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, primaryPhone: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.contact.primaryPhone}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={companyInfo.contact.supportEmail}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, supportEmail: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.contact.supportEmail}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Support Phone</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={companyInfo.contact.supportPhone}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        contact: { ...prev.contact, supportPhone: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.contact.supportPhone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Headquarters Address</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyInfo.headquarters.address}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        headquarters: { ...prev.headquarters, address: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.headquarters.address}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyInfo.headquarters.city}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        headquarters: { ...prev.headquarters, city: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.headquarters.city}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyInfo.headquarters.state}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        headquarters: { ...prev.headquarters, state: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.headquarters.state}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  {isEditing ? (
                    <select
                      value={companyInfo.headquarters.country}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        headquarters: { ...prev.headquarters, country: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-900">{companyInfo.headquarters.country}</p>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={companyInfo.headquarters.postalCode}
                      onChange={(e) => setCompanyInfo(prev => ({ 
                        ...prev, 
                        headquarters: { ...prev.headquarters, postalCode: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : (
                    <p className="text-gray-900">{companyInfo.headquarters.postalCode}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Verifications Completed</span>
                  <span className="font-bold text-gray-900">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Staff</span>
                  <span className="font-bold text-gray-900">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Calls This Month</span>
                  <span className="font-bold text-gray-900">2,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="font-bold text-green-600">94.2%</span>
                </div>
              </div>
            </div>

            {/* Verification Status */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Verification Status</h3>
              
              <div className="space-y-3">
                {companyInfo.verification.documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{doc}</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center space-x-2 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>Verified on {new Date(companyInfo.verification.verifiedDate!).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Download className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Download Company Certificate</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <FileText className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm">Generate Verification Report</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm">View Public Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'verification' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Verification Documents</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {companyInfo.verification.documents.map((doc, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <FileText className="w-8 h-8 text-blue-600" />
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <h4 className="font-medium text-gray-900 mb-2">{doc}</h4>
                <p className="text-sm text-gray-600 mb-3">Verified on {new Date(companyInfo.verification.verifiedDate!).toLocaleDateString()}</p>
                <div className="flex items-center space-x-2">
                  <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-700 text-sm font-medium">
                    Download
                  </button>
                </div>
              </div>
            ))}
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:border-primary-400 transition-colors cursor-pointer">
              <Plus className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600 text-center">Upload Additional Document</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Compliance Status</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="font-semibold text-green-900 mb-2">KYC Compliant</h4>
                <p className="text-sm text-green-700">All requirements met</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                <Shield className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="font-semibold text-green-900 mb-2">AML Compliant</h4>
                <p className="text-sm text-green-700">Screening up to date</p>
              </div>
              
              <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                <Lock className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <h4 className="font-semibold text-green-900 mb-2">GDPR Compliant</h4>
                <p className="text-sm text-green-700">Data protection certified</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Audit History</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Annual Compliance Audit</p>
                  <p className="text-sm text-gray-600">Last audit: {new Date(companyInfo.compliance.lastAudit).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm font-medium text-green-600">Passed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Settings</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Public Profile</p>
                  <p className="text-sm text-gray-600">Allow others to view your company profile</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive updates about verification requests</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">API Access Logs</p>
                  <p className="text-sm text-gray-600">Log all API requests for audit purposes</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
            <h3 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-900">Deactivate Account</p>
                  <p className="text-sm text-red-700">Temporarily disable your organization account</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Deactivate
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-red-900">Delete Account</p>
                  <p className="text-sm text-red-700">Permanently delete your organization and all data</p>
                </div>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CompanyProfile