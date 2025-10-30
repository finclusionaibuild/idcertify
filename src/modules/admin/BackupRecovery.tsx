import React, { useState } from 'react'
import { useToastMessages } from '../shared/hooks/useToastMessages'
import { DataTable, Column } from '../shared/components/DataTable'
import { StatusBadge, TypeBadge } from '../shared/components/TableUtils'
import { 
  HardDrive, 
  Download, 
  Upload, 
  RefreshCw, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Play, 
  Pause, 
  Settings, 
  FileText, 
  Database, 
  Server, 
  Shield, 
  Lock, 
  Unlock, 
  Calendar, 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Save, 
  Trash2, 
  Eye, 
  EyeOff, 
  Plus, 
  Edit, 
  X, 
  ChevronDown, 
  ChevronRight,
  Info,
  HelpCircle,
  Zap,
  Archive,
  RotateCcw,
  ShieldCheck,
  Activity,
  Target,
  Award
} from 'lucide-react'

interface BackupJob {
  id: string
  name: string
  type: 'full' | 'incremental' | 'differential'
  status: 'running' | 'completed' | 'failed' | 'scheduled' | 'paused'
  size: string
  location: string
  createdAt: string
  completedAt?: string
  nextRun?: string
  retention: string
  compression: boolean
  encryption: boolean
}

interface RecoveryPoint {
  id: string
  name: string
  backupJobId: string
  status: 'available' | 'corrupted' | 'restoring' | 'restored'
  size: string
  createdAt: string
  verifiedAt?: string
  integrity: 'verified' | 'failed' | 'pending'
}

interface BackupSchedule {
  id: string
  name: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'custom'
  time: string
  days?: string[]
  enabled: boolean
  lastRun?: string
  nextRun?: string
}

const BackupRecovery = () => {
  const { showBackupSuccess, showRecoverySuccess } = useToastMessages()
  const [activeTab, setActiveTab] = useState<'overview' | 'backups' | 'recovery' | 'schedules' | 'settings'>('overview')
  const [showCreateBackupModal, setShowCreateBackupModal] = useState(false)
  const [showRecoveryModal, setShowRecoveryModal] = useState(false)
  const [showScheduleModal, setShowScheduleModal] = useState(false)
  const [selectedBackup, setSelectedBackup] = useState<BackupJob | null>(null)
  const [selectedRecoveryPoint, setSelectedRecoveryPoint] = useState<RecoveryPoint | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock backup jobs data
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([
    {
      id: '1',
      name: 'Full System Backup',
      type: 'full',
      status: 'completed',
      size: '2.4 GB',
      location: 'AWS S3 - us-east-1',
      createdAt: '2024-01-20 02:00:00',
      completedAt: '2024-01-20 02:45:00',
      nextRun: '2024-01-21 02:00:00',
      retention: '30 days',
      compression: true,
      encryption: true
    },
    {
      id: '2',
      name: 'Database Backup',
      type: 'incremental',
      status: 'running',
      size: '856 MB',
      location: 'Local Storage - /backups/db',
      createdAt: '2024-01-20 14:30:00',
      retention: '7 days',
      compression: true,
      encryption: false
    },
    {
      id: '3',
      name: 'User Data Backup',
      type: 'differential',
      status: 'scheduled',
      size: '1.2 GB',
      location: 'Google Cloud Storage',
      createdAt: '2024-01-19 22:00:00',
      completedAt: '2024-01-19 22:30:00',
      nextRun: '2024-01-20 22:00:00',
      retention: '90 days',
      compression: true,
      encryption: true
    },
    {
      id: '4',
      name: 'Configuration Backup',
      type: 'full',
      status: 'failed',
      size: '45 MB',
      location: 'Local Storage - /backups/config',
      createdAt: '2024-01-20 12:00:00',
      retention: '365 days',
      compression: false,
      encryption: true
    }
  ])

  // Mock recovery points data
  const [recoveryPoints, setRecoveryPoints] = useState<RecoveryPoint[]>([
    {
      id: '1',
      name: 'Full System - 2024-01-20 02:45',
      backupJobId: '1',
      status: 'available',
      size: '2.4 GB',
      createdAt: '2024-01-20 02:45:00',
      verifiedAt: '2024-01-20 03:00:00',
      integrity: 'verified'
    },
    {
      id: '2',
      name: 'Database - 2024-01-19 14:30',
      backupJobId: '2',
      status: 'available',
      size: '856 MB',
      createdAt: '2024-01-19 14:30:00',
      verifiedAt: '2024-01-19 14:45:00',
      integrity: 'verified'
    },
    {
      id: '3',
      name: 'User Data - 2024-01-18 22:00',
      backupJobId: '3',
      status: 'corrupted',
      size: '1.2 GB',
      createdAt: '2024-01-18 22:00:00',
      integrity: 'failed'
    }
  ])

  // Mock backup schedules data
  const [backupSchedules, setBackupSchedules] = useState<BackupSchedule[]>([
    {
      id: '1',
      name: 'Daily Full Backup',
      frequency: 'daily',
      time: '02:00',
      enabled: true,
      lastRun: '2024-01-20 02:00:00',
      nextRun: '2024-01-21 02:00:00'
    },
    {
      id: '2',
      name: 'Weekly Database Backup',
      frequency: 'weekly',
      time: '14:30',
      days: ['Monday', 'Wednesday', 'Friday'],
      enabled: true,
      lastRun: '2024-01-19 14:30:00',
      nextRun: '2024-01-22 14:30:00'
    },
    {
      id: '3',
      name: 'Monthly Archive',
      frequency: 'monthly',
      time: '22:00',
      enabled: false,
      lastRun: '2023-12-31 22:00:00',
      nextRun: '2024-01-31 22:00:00'
    }
  ])

  // Utility functions using the new components
  const getStatusDisplay = (status: string) => {
    return <StatusBadge status={status} />
  }

  const getTypeDisplay = (type: string) => {
    return <TypeBadge type={type} />
  }

  const handleCreateBackup = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setShowCreateBackupModal(false)
      showBackupSuccess()
    } catch (error) {
      console.error('Failed to create backup:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleRecovery = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 3000))
      setShowRecoveryModal(false)
      showRecoverySuccess()
    } catch (error) {
      console.error('Failed to start recovery:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Backup & Recovery</h1>
              <p className="text-gray-600 mt-2">Manage system backups, recovery points, and automated backup schedules</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowCreateBackupModal(true)}
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Create Backup</span>
              </button>
              <button
                onClick={() => setShowScheduleModal(true)}
                className="bg-white hover:bg-gray-50 text-primary-600 border border-primary-600 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Schedule</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: BarChart3 },
                { id: 'backups', name: 'Backups', icon: HardDrive },
                { id: 'recovery', name: 'Recovery', icon: RotateCcw },
                { id: 'schedules', name: 'Schedules', icon: Clock },
                { id: 'settings', name: 'Settings', icon: Settings }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm">Total Backups</p>
                        <p className="text-3xl font-bold">{backupJobs.length}</p>
                      </div>
                      <HardDrive className="w-8 h-8 text-blue-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm">Successful</p>
                        <p className="text-3xl font-bold">{backupJobs.filter(b => b.status === 'completed').length}</p>
                      </div>
                      <CheckCircle className="w-8 h-8 text-green-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-orange-100 text-sm">Recovery Points</p>
                        <p className="text-3xl font-bold">{recoveryPoints.length}</p>
                      </div>
                      <RotateCcw className="w-8 h-8 text-orange-200" />
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm">Active Schedules</p>
                        <p className="text-3xl font-bold">{backupSchedules.filter(s => s.enabled).length}</p>
                      </div>
                      <Clock className="w-8 h-8 text-purple-200" />
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    {backupJobs.slice(0, 5).map((backup) => (
                      <div key={backup.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getStatusDisplay(backup.status)}
                          <div>
                            <p className="font-medium text-gray-900">{backup.name}</p>
                            <p className="text-sm text-gray-500">{backup.createdAt}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusDisplay(backup.status)}
                          <span className="text-sm text-gray-500">{backup.size}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backups' && (
              <div className="space-y-6">
                <DataTable
                  data={backupJobs}
                  columns={[
                    {
                      key: 'name',
                      header: 'Name',
                      render: (backup) => (
                        <div className="flex items-center">
                          <HardDrive className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{backup.name}</div>
                            <div className="text-sm text-gray-500">ID: {backup.id}</div>
                          </div>
                        </div>
                      ),
                      sortable: true
                    },
                                         {
                       key: 'type',
                       header: 'Type',
                       render: (backup) => getTypeDisplay(backup.type),
                       sortable: true
                     },
                                         {
                       key: 'status',
                       header: 'Status',
                       render: (backup) => getStatusDisplay(backup.status),
                       sortable: true
                     },
                    {
                      key: 'size',
                      header: 'Size',
                      render: (backup) => <span className="text-sm text-gray-900">{backup.size}</span>,
                      sortable: true
                    },
                    {
                      key: 'location',
                      header: 'Location',
                      render: (backup) => <span className="text-sm text-gray-500">{backup.location}</span>,
                      sortable: true
                    },
                    {
                      key: 'createdAt',
                      header: 'Created',
                      render: (backup) => <span className="text-sm text-gray-500">{backup.createdAt}</span>,
                      sortable: true
                    }
                  ]}
                  title="Backup Jobs"
                  searchable={true}
                  actions={{
                    view: true,
                    edit: true,
                    delete: true
                  }}
                  onAction={(action, backup) => {
                    console.log(`${action} backup:`, backup)
                  }}
                />
              </div>
            )}

            {activeTab === 'recovery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Recovery Points</h3>
                  <button
                    onClick={() => setShowRecoveryModal(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Start Recovery</span>
                  </button>
                </div>
                <DataTable
                  data={recoveryPoints}
                  columns={[
                    {
                      key: 'name',
                      header: 'Name',
                      render: (point) => (
                        <div className="flex items-center">
                          <Archive className="w-5 h-5 text-gray-400 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{point.name}</div>
                            <div className="text-sm text-gray-500">Backup: {point.backupJobId}</div>
                          </div>
                        </div>
                      ),
                      sortable: true
                    },
                                         {
                       key: 'status',
                       header: 'Status',
                       render: (point) => getStatusDisplay(point.status),
                       sortable: true
                     },
                     {
                       key: 'integrity',
                       header: 'Integrity',
                       render: (point) => getStatusDisplay(point.integrity),
                       sortable: true
                     },
                    {
                      key: 'size',
                      header: 'Size',
                      render: (point) => <span className="text-sm text-gray-900">{point.size}</span>,
                      sortable: true
                    },
                    {
                      key: 'createdAt',
                      header: 'Created',
                      render: (point) => <span className="text-sm text-gray-500">{point.createdAt}</span>,
                      sortable: true
                    }
                  ]}
                  searchable={true}
                  actions={{
                    view: true,
                    delete: true,
                    custom: [
                      {
                        label: 'Start Recovery',
                        icon: RotateCcw,
                        onClick: (point) => {
                          setSelectedRecoveryPoint(point)
                          setShowRecoveryModal(true)
                        },
                        className: 'text-primary-600 hover:text-primary-900'
                      }
                    ]
                  }}
                  onAction={(action, point) => {
                    if (action === 'view') {
                      console.log('View recovery point:', point)
                    } else if (action === 'delete') {
                      console.log('Delete recovery point:', point)
                    }
                  }}
                />
              </div>
            )}

            {activeTab === 'schedules' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Backup Schedules</h3>
                  <button
                    onClick={() => setShowScheduleModal(true)}
                    className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>New Schedule</span>
                  </button>
                </div>
                <DataTable
                  data={backupSchedules}
                  columns={[
                    {
                      key: 'name',
                      header: 'Name',
                      render: (schedule) => (
                        <div className="flex items-center">
                          <Clock className="w-5 h-5 text-gray-400 mr-3" />
                          <div className="text-sm font-medium text-gray-900">{schedule.name}</div>
                        </div>
                      ),
                      sortable: true
                    },
                    {
                      key: 'frequency',
                      header: 'Frequency',
                      render: (schedule) => (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {schedule.frequency}
                        </span>
                      ),
                      sortable: true
                    },
                    {
                      key: 'time',
                      header: 'Time',
                      render: (schedule) => <span className="text-sm text-gray-900">{schedule.time}</span>,
                      sortable: true
                    },
                    {
                      key: 'enabled',
                      header: 'Status',
                      render: (schedule) => (
                        <div className="flex items-center">
                          {schedule.enabled ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${schedule.enabled ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {schedule.enabled ? 'Enabled' : 'Disabled'}
                          </span>
                        </div>
                      ),
                      sortable: true
                    },
                    {
                      key: 'lastRun',
                      header: 'Last Run',
                      render: (schedule) => <span className="text-sm text-gray-500">{schedule.lastRun || 'Never'}</span>,
                      sortable: true
                    },
                    {
                      key: 'nextRun',
                      header: 'Next Run',
                      render: (schedule) => <span className="text-sm text-gray-500">{schedule.nextRun || 'N/A'}</span>,
                      sortable: true
                    }
                  ]}
                  searchable={true}
                  actions={{
                    edit: true,
                    delete: true,
                    custom: [
                      {
                        label: 'Start',
                        icon: Play,
                        onClick: (schedule) => {
                          console.log('Start schedule:', schedule)
                        },
                        className: 'text-gray-600 hover:text-gray-900'
                      }
                    ]
                  }}
                  onAction={(action, schedule) => {
                    if (action === 'edit') {
                      console.log('Edit schedule:', schedule)
                    } else if (action === 'delete') {
                      console.log('Delete schedule:', schedule)
                    }
                  }}
                />
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Backup Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Default Backup Location</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option>AWS S3</option>
                        <option>Google Cloud Storage</option>
                        <option>Azure Blob Storage</option>
                        <option>Local Storage</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Compression Level</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option>None</option>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Encryption</label>
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Enable encryption for all backups</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Retention Policy</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                        <option>7 days</option>
                        <option>30 days</option>
                        <option>90 days</option>
                        <option>365 days</option>
                        <option>Custom</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recovery Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Verification</label>
                      <div className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" defaultChecked />
                        <span className="ml-2 text-sm text-gray-700">Automatically verify backup integrity</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Recovery Timeout</label>
                      <input type="number" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500" defaultValue={30} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Backup Modal */}
      {showCreateBackupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create New Backup</h2>
                <button 
                  onClick={() => setShowCreateBackupModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Backup Name</label>
                <input
                  type="text"
                  placeholder="Enter backup name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Backup Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>Full</option>
                  <option>Incremental</option>
                  <option>Differential</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>AWS S3</option>
                  <option>Google Cloud Storage</option>
                  <option>Local Storage</option>
                </select>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateBackupModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBackup}
                disabled={loading}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Backup'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recovery Modal */}
      {showRecoveryModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Start Recovery</h2>
                <button 
                  onClick={() => setShowRecoveryModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
                  <p className="text-sm text-yellow-800">
                    Warning: Recovery will overwrite current data. Make sure you have a backup of any important changes.
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recovery Point</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  {recoveryPoints.filter(p => p.status === 'available').map(point => (
                    <option key={point.id} value={point.id}>{point.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Recovery Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>Full System Recovery</option>
                  <option>Database Only</option>
                  <option>Configuration Only</option>
                </select>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                onClick={() => setShowRecoveryModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRecovery}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {loading ? 'Starting Recovery...' : 'Start Recovery'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BackupRecovery
