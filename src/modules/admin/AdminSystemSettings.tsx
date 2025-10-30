import React, { useState } from 'react'
import { 
  Settings, 
  Shield, 
  Lock, 
  Key, 
  Database, 
  Server, 
  Globe, 
  Users, 
  Bell, 
  FileText, 
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  X,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload,
  Eye,
  EyeOff,
  ArrowRight,
  Zap,
  BarChart3,
  Calendar,
  Clock,
  Target,
  Award,
  Star,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface SystemSetting {
  id: string
  name: string
  value: string | number | boolean
  type: 'text' | 'number' | 'boolean' | 'select'
  category: 'security' | 'verification' | 'notification' | 'api' | 'general' | 'trustScore'
  description: string
  options?: string[]
}

interface TrustScoreRule {
  id: string
  name: string
  description: string
  points: number
  type: 'positive' | 'negative'
  category: string
  isActive: boolean
}

const AdminSystemSettings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'verification' | 'trustScore' | 'api' | 'logs'>('general')
  const [loading, setLoading] = useState(false)
  const [showAddRuleModal, setShowAddRuleModal] = useState(false)
  const [editingSettingId, setEditingSettingId] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState('')

  // Mock system settings
  const [systemSettings, setSystemSettings] = useState<SystemSetting[]>([
    {
      id: '1',
      name: 'Platform Name',
      value: 'IDCertify',
      type: 'text',
      category: 'general',
      description: 'The name of the platform displayed to users'
    },
    {
      id: '2',
      name: 'Support Email',
      value: 'support@idcertify.com',
      type: 'text',
      category: 'general',
      description: 'Email address for support inquiries'
    },
    {
      id: '3',
      name: 'Maintenance Mode',
      value: false,
      type: 'boolean',
      category: 'general',
      description: 'Enable maintenance mode to prevent user access during updates'
    },
    {
      id: '4',
      name: 'Session Timeout (minutes)',
      value: 30,
      type: 'number',
      category: 'security',
      description: 'Time in minutes before an inactive session expires'
    },
    {
      id: '5',
      name: 'Maximum Login Attempts',
      value: 5,
      type: 'number',
      category: 'security',
      description: 'Number of failed login attempts before account lockout'
    },
    {
      id: '6',
      name: 'Require 2FA for Admins',
      value: true,
      type: 'boolean',
      category: 'security',
      description: 'Require two-factor authentication for all admin accounts'
    },
    {
      id: '7',
      name: 'Password Expiry (days)',
      value: 90,
      type: 'number',
      category: 'security',
      description: 'Number of days before passwords expire and must be changed'
    },
    {
      id: '8',
      name: 'Verification Expiry (days)',
      value: 365,
      type: 'number',
      category: 'verification',
      description: 'Number of days before verifications expire and must be renewed'
    },
    {
      id: '9',
      name: 'Auto-approve Low-risk Verifications',
      value: false,
      type: 'boolean',
      category: 'verification',
      description: 'Automatically approve verifications with low risk scores'
    },
    {
      id: '10',
      name: 'Minimum Document Quality Score',
      value: 70,
      type: 'number',
      category: 'verification',
      description: 'Minimum quality score required for document uploads (0-100)'
    },
    {
      id: '11',
      name: 'API Rate Limit (requests/minute)',
      value: 100,
      type: 'number',
      category: 'api',
      description: 'Maximum number of API requests allowed per minute per key'
    },
    {
      id: '12',
      name: 'API Key Expiry (days)',
      value: 365,
      type: 'number',
      category: 'api',
      description: 'Number of days before API keys expire and must be renewed'
    },
    {
      id: '13',
      name: 'Email Notifications',
      value: true,
      type: 'boolean',
      category: 'notification',
      description: 'Enable email notifications for system events'
    },
    {
      id: '14',
      name: 'SMS Notifications',
      value: true,
      type: 'boolean',
      category: 'notification',
      description: 'Enable SMS notifications for critical events'
    },
    {
      id: '15',
      name: 'Trust Score Algorithm Version',
      value: 'v2.1',
      type: 'select',
      category: 'trustScore',
      description: 'The version of the trust score calculation algorithm to use',
      options: ['v1.0', 'v2.0', 'v2.1', 'v3.0-beta']
    },
    {
      id: '16',
      name: 'Minimum Trust Score for Verification',
      value: 50,
      type: 'number',
      category: 'trustScore',
      description: 'Minimum trust score required to pass verification'
    }
  ])

  // Mock trust score rules
  const [trustScoreRules, setTrustScoreRules] = useState<TrustScoreRule[]>([
    {
      id: '1',
      name: 'Government ID Verification',
      description: 'Successfully verify a government-issued ID document',
      points: 25,
      type: 'positive',
      category: 'Identity',
      isActive: true
    },
    {
      id: '2',
      name: 'Address Verification',
      description: 'Successfully verify residential address',
      points: 15,
      type: 'positive',
      category: 'Address',
      isActive: true
    },
    {
      id: '3',
      name: 'Employment Verification',
      description: 'Successfully verify current employment',
      points: 20,
      type: 'positive',
      category: 'Employment',
      isActive: true
    },
    {
      id: '4',
      name: 'Education Verification',
      description: 'Successfully verify educational credentials',
      points: 15,
      type: 'positive',
      category: 'Education',
      isActive: true
    },
    {
      id: '5',
      name: 'Reference Verification',
      description: 'Successfully verify personal or professional references',
      points: 10,
      type: 'positive',
      category: 'Reference',
      isActive: true
    },
    {
      id: '6',
      name: 'Failed Verification Attempt',
      description: 'Failed verification attempt for any document',
      points: -15,
      type: 'negative',
      category: 'Verification',
      isActive: true
    },
    {
      id: '7',
      name: 'Document Expiry',
      description: 'Having an expired document in the system',
      points: -10,
      type: 'negative',
      category: 'Document',
      isActive: true
    },
    {
      id: '8',
      name: 'Suspicious Activity',
      description: 'System detected suspicious activity on the account',
      points: -25,
      type: 'negative',
      category: 'Security',
      isActive: true
    }
  ])

  // Filter settings based on active tab
  const filteredSettings = systemSettings.filter(setting => {
    if (activeTab === 'general') return setting.category === 'general' || setting.category === 'notification'
    if (activeTab === 'security') return setting.category === 'security'
    if (activeTab === 'verification') return setting.category === 'verification'
    if (activeTab === 'trustScore') return setting.category === 'trustScore'
    if (activeTab === 'api') return setting.category === 'api'
    return false
  })

  const handleSettingChange = (id: string, value: string | number | boolean) => {
    setSystemSettings(prev => 
      prev.map(setting => 
        setting.id === id ? { ...setting, value } : setting
      )
    )
  }

  const handleSaveSettings = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccessMessage('Settings saved successfully')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleRuleStatus = (ruleId: string) => {
    setTrustScoreRules(prev => 
      prev.map(rule => 
        rule.id === ruleId ? { ...rule, isActive: !rule.isActive } : rule
      )
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform-wide settings and trust score algorithms</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Config
          </button>
          <button 
            onClick={handleSaveSettings}
            disabled={loading}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
          >
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save All Changes
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'general', label: 'General', icon: Settings },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'verification', label: 'Verification', icon: CheckCircle },
            { id: 'trustScore', label: 'Trust Score', icon: Star },
            { id: 'api', label: 'API & Integration', icon: Key },
            { id: 'logs', label: 'System Logs', icon: FileText }
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
      {activeTab !== 'trustScore' && activeTab !== 'logs' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            {activeTab === 'general' ? 'General Settings' : 
             activeTab === 'security' ? 'Security Settings' : 
             activeTab === 'verification' ? 'Verification Settings' : 
             'API & Integration Settings'}
          </h2>
          
          <div className="space-y-6">
            {filteredSettings.map((setting) => (
              <div key={setting.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="mb-3 md:mb-0 md:mr-4 md:flex-1">
                  <div className="flex items-center">
                    <h3 className="font-medium text-gray-900">{setting.name}</h3>
                    <div className="ml-2 group relative">
                      <HelpCircle className="w-4 h-4 text-gray-400" />
                      <div className="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 hidden group-hover:block z-10">
                        {setting.description}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{setting.description}</p>
                </div>
                
                <div className="md:w-1/3">
                  {setting.type === 'boolean' ? (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={setting.value as boolean}
                        onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {(setting.value as boolean) ? 'Enabled' : 'Disabled'}
                      </span>
                    </label>
                  ) : setting.type === 'number' ? (
                    <input
                      type="number"
                      value={setting.value as number}
                      onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  ) : setting.type === 'select' && setting.options ? (
                    <select
                      value={setting.value as string}
                      onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    >
                      {setting.options.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={setting.value as string}
                      onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'trustScore' && (
        <div className="space-y-6">
          {/* Trust Score Algorithm Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Trust Score Algorithm</h2>
              <div className="flex items-center space-x-3">
                <select
                  value={systemSettings.find(s => s.name === 'Trust Score Algorithm Version')?.value as string}
                  onChange={(e) => handleSettingChange('15', e.target.value)}
                  className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="v1.0">Version 1.0</option>
                  <option value="v2.0">Version 2.0</option>
                  <option value="v2.1">Version 2.1</option>
                  <option value="v3.0-beta">Version 3.0 (Beta)</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {filteredSettings.map((setting) => (
                <div key={setting.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="mb-3 md:mb-0 md:mr-4 md:flex-1">
                    <div className="flex items-center">
                      <h3 className="font-medium text-gray-900">{setting.name}</h3>
                      <div className="ml-2 group relative">
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                        <div className="absolute left-0 bottom-full mb-2 w-64 bg-gray-900 text-white text-xs rounded p-2 hidden group-hover:block z-10">
                          {setting.description}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{setting.description}</p>
                  </div>
                  
                  <div className="md:w-1/3">
                    {setting.type === 'boolean' ? (
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          checked={setting.value as boolean}
                          onChange={(e) => handleSettingChange(setting.id, e.target.checked)}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                        <span className="ml-3 text-sm font-medium text-gray-900">
                          {(setting.value as boolean) ? 'Enabled' : 'Disabled'}
                        </span>
                      </label>
                    ) : setting.type === 'number' ? (
                      <input
                        type="number"
                        value={setting.value as number}
                        onChange={(e) => handleSettingChange(setting.id, parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : setting.type === 'select' && setting.options ? (
                      <select
                        value={setting.value as string}
                        onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        {setting.options.map((option) => (
                          <option key={option} value={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={setting.value as string}
                        onChange={(e) => handleSettingChange(setting.id, e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Score Rules */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">Trust Score Rules</h2>
              <button 
                onClick={() => setShowAddRuleModal(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add New Rule
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="mb-4">
                <h3 className="font-medium text-gray-900 mb-3">Positive Scoring Rules</h3>
                {trustScoreRules.filter(rule => rule.type === 'positive').map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-bold text-sm">+{rule.points}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{rule.name}</p>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button 
                        onClick={() => handleToggleRuleStatus(rule.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        {rule.isActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Negative Scoring Rules</h3>
                {trustScoreRules.filter(rule => rule.type === 'negative').map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 font-bold text-sm">{rule.points}</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{rule.name}</p>
                        <p className="text-sm text-gray-600">{rule.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {rule.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button 
                        onClick={() => handleToggleRuleStatus(rule.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        {rule.isActive ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Score Simulation */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Trust Score Simulation</h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                Test how different verification combinations affect trust scores before applying changes to the live system.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Simulation Parameters</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Algorithm Version
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option>v2.1 (Current)</option>
                        <option>v3.0-beta (Testing)</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-gray-700">Verification Factors</p>
                      
                      {[
                        { id: 'sim_identity', label: 'Identity Verification', defaultChecked: true },
                        { id: 'sim_address', label: 'Address Verification', defaultChecked: true },
                        { id: 'sim_employment', label: 'Employment Verification', defaultChecked: false },
                        { id: 'sim_education', label: 'Education Verification', defaultChecked: false },
                        { id: 'sim_reference', label: 'Reference Verification', defaultChecked: false }
                      ].map((factor) => (
                        <div key={factor.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={factor.id}
                            defaultChecked={factor.defaultChecked}
                            className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                          />
                          <label htmlFor={factor.id} className="ml-2 text-sm text-gray-700">
                            {factor.label}
                          </label>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Risk Level
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors mt-3">
                      Run Simulation
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Simulation Results</h3>
                  
                  <div className="text-center py-6">
                    <div className="relative mx-auto w-32 h-32 mb-4">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-gray-200"
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="transparent"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="text-primary-600"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeDasharray="85, 100"
                          strokeLinecap="round"
                          fill="transparent"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-3xl font-bold text-gray-900">85</span>
                      </div>
                    </div>
                    
                    <p className="text-lg font-semibold text-gray-900">Simulated Trust Score</p>
                    <p className="text-sm text-gray-600 mt-1">Based on selected parameters</p>
                    
                    <div className="mt-4 pt-4 border-t border-gray-200 text-left">
                      <p className="text-sm font-medium text-gray-900 mb-2">Score Breakdown:</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Identity Verification</span>
                          <span className="font-medium text-green-600">+25</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Address Verification</span>
                          <span className="font-medium text-green-600">+15</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Base Score</span>
                          <span className="font-medium text-gray-900">45</span>
                        </div>
                        <div className="flex items-center justify-between font-medium">
                          <span className="text-gray-900">Total Score</span>
                          <span className="text-gray-900">85</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'logs' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">System Logs</h2>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Log Types</option>
                  <option>Error</option>
                  <option>Warning</option>
                  <option>Info</option>
                  <option>Debug</option>
                </select>
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Timestamp
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { timestamp: '2024-01-20 15:30:45', level: 'ERROR', source: 'API', message: 'Rate limit exceeded for API key API-123456', user: 'TechCorp Solutions', ip: '192.168.1.1' },
                  { timestamp: '2024-01-20 14:22:10', level: 'WARNING', source: 'Auth', message: 'Failed login attempt', user: 'john.doe@example.com', ip: '192.168.1.2' },
                  { timestamp: '2024-01-20 13:15:22', level: 'INFO', source: 'Verification', message: 'Verification request approved', user: 'admin@idcertify.com', ip: '192.168.1.3' },
                  { timestamp: '2024-01-20 12:05:18', level: 'INFO', source: 'User', message: 'New user registered', user: 'jane.smith@company.com', ip: '192.168.1.4' },
                  { timestamp: '2024-01-20 11:30:05', level: 'ERROR', source: 'Database', message: 'Connection timeout', user: 'System', ip: '192.168.1.5' },
                  { timestamp: '2024-01-20 10:45:30', level: 'WARNING', source: 'Security', message: 'Suspicious login attempt blocked', user: 'Unknown', ip: '192.168.1.6' },
                  { timestamp: '2024-01-20 09:20:15', level: 'INFO', source: 'Admin', message: 'System settings updated', user: 'admin@idcertify.com', ip: '192.168.1.7' },
                  { timestamp: '2024-01-20 08:10:40', level: 'DEBUG', source: 'API', message: 'API request processed successfully', user: 'TechCorp Solutions', ip: '192.168.1.8' }
                ].map((log, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.timestamp}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        log.level === 'ERROR' ? 'bg-red-100 text-red-800' :
                        log.level === 'WARNING' ? 'bg-yellow-100 text-yellow-800' :
                        log.level === 'INFO' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {log.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {log.source}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {log.message}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {log.ip}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing 8 of 1,247 logs
              </p>
              <div className="flex items-center space-x-2">
                <button className="border border-gray-300 rounded-lg p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 rounded-lg p-2 text-gray-600 hover:bg-gray-50">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Trust Score Rule Modal */}
      {showAddRuleModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add Trust Score Rule</h2>
                <button 
                  onClick={() => setShowAddRuleModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rule Name
                </label>
                <input
                  type="text"
                  placeholder="Enter rule name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  placeholder="Enter rule description"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>Identity</option>
                  <option>Address</option>
                  <option>Employment</option>
                  <option>Education</option>
                  <option>Reference</option>
                  <option>Security</option>
                  <option>Document</option>
                  <option>Verification</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rule Type
                </label>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ruleType"
                      value="positive"
                      defaultChecked
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Positive (adds points)</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ruleType"
                      value="negative"
                      className="text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Negative (subtracts points)</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Points
                </label>
                <input
                  type="number"
                  placeholder="Enter points value"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddRuleModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddRuleModal(false)}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                >
                  Add Rule
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* System Health Panel */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">System Health</h3>
          <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Status
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'API Services', status: 'operational', uptime: '99.98%', icon: Globe, color: 'bg-green-500' },
            { name: 'Database', status: 'operational', uptime: '99.99%', icon: Database, color: 'bg-green-500' },
            { name: 'Storage Services', status: 'operational', uptime: '100%', icon: Server, color: 'bg-green-500' },
            { name: 'Authentication', status: 'operational', uptime: '99.95%', icon: Lock, color: 'bg-green-500' },
            { name: 'Verification Engine', status: 'degraded', uptime: '98.75%', icon: Shield, color: 'bg-yellow-500' },
            { name: 'Notification System', status: 'operational', uptime: '99.90%', icon: Bell, color: 'bg-green-500' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${service.status === 'operational' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                  <service.icon className={`w-5 h-5 ${service.status === 'operational' ? 'text-green-600' : 'text-yellow-600'}`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <p className="text-xs text-gray-500">Uptime: {service.uptime}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                service.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminSystemSettings