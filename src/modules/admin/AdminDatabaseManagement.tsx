import React, { useState } from 'react'
import { 
  Database, 
  Server, 
  HardDrive, 
  RefreshCw, 
  Download, 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MoreHorizontal, 
  CheckCircle, 
  XCircle, 
  Clock, 
  AlertTriangle, 
  Shield, 
  Lock, 
  Key, 
  Settings, 
  FileText, 
  Save, 
  X, 
  ArrowUpRight, 
  ArrowDownRight, 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  Users, 
  Bell
} from 'lucide-react'

interface DatabaseTable {
  id: string
  name: string
  schema: string
  rowCount: number
  sizeInMB: number
  lastUpdated: string
  status: 'healthy' | 'warning' | 'critical'
  backupStatus: 'completed' | 'in_progress' | 'failed' | 'scheduled'
  lastBackup?: string
}

interface BackupJob {
  id: string
  type: 'full' | 'incremental'
  status: 'completed' | 'in_progress' | 'failed' | 'scheduled'
  startTime: string
  endTime?: string
  sizeInMB?: number
  tables: string[]
  destination: string
}

const AdminDatabaseManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'tables' | 'backups' | 'maintenance'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSchema, setSelectedSchema] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [showTableModal, setShowTableModal] = useState(false)
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(null)
  const [showBackupModal, setShowBackupModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // Mock database stats
  const databaseStats = {
    totalTables: 42,
    totalSize: 1256, // MB
    totalRows: 3450000,
    avgQueryTime: 45, // ms
    cpuUsage: 32, // %
    memoryUsage: 45, // %
    diskUsage: 68, // %
    connectionCount: 24
  }

  // Mock database tables
  const databaseTables: DatabaseTable[] = [
    {
      id: '1',
      name: 'users',
      schema: 'public',
      rowCount: 1250000,
      sizeInMB: 450,
      lastUpdated: '2024-01-20T14:30:00Z',
      status: 'healthy',
      backupStatus: 'completed',
      lastBackup: '2024-01-20T02:00:00Z'
    },
    {
      id: '2',
      name: 'verifications',
      schema: 'public',
      rowCount: 850000,
      sizeInMB: 320,
      lastUpdated: '2024-01-20T15:45:00Z',
      status: 'healthy',
      backupStatus: 'completed',
      lastBackup: '2024-01-20T02:00:00Z'
    },
    {
      id: '3',
      name: 'documents',
      schema: 'public',
      rowCount: 650000,
      sizeInMB: 280,
      lastUpdated: '2024-01-20T12:15:00Z',
      status: 'warning',
      backupStatus: 'completed',
      lastBackup: '2024-01-20T02:00:00Z'
    },
    {
      id: '4',
      name: 'transactions',
      schema: 'public',
      rowCount: 420000,
      sizeInMB: 180,
      lastUpdated: '2024-01-20T16:30:00Z',
      status: 'healthy',
      backupStatus: 'completed',
      lastBackup: '2024-01-20T02:00:00Z'
    },
    {
      id: '5',
      name: 'audit_logs',
      schema: 'logs',
      rowCount: 280000,
      sizeInMB: 120,
      lastUpdated: '2024-01-20T17:10:00Z',
      status: 'critical',
      backupStatus: 'failed',
      lastBackup: '2024-01-19T02:00:00Z'
    }
  ]

  // Mock backup jobs
  const backupJobs: BackupJob[] = [
    {
      id: '1',
      type: 'full',
      status: 'completed',
      startTime: '2024-01-20T02:00:00Z',
      endTime: '2024-01-20T02:45:00Z',
      sizeInMB: 1200,
      tables: ['All tables'],
      destination: 'S3 Bucket: idcertify-backups'
    },
    {
      id: '2',
      type: 'incremental',
      status: 'completed',
      startTime: '2024-01-19T02:00:00Z',
      endTime: '2024-01-19T02:30:00Z',
      sizeInMB: 350,
      tables: ['All tables'],
      destination: 'S3 Bucket: idcertify-backups'
    },
    {
      id: '3',
      type: 'full',
      status: 'failed',
      startTime: '2024-01-18T02:00:00Z',
      endTime: '2024-01-18T02:15:00Z',
      tables: ['All tables'],
      destination: 'S3 Bucket: idcertify-backups'
    },
    {
      id: '4',
      type: 'incremental',
      status: 'scheduled',
      startTime: '2024-01-21T02:00:00Z',
      tables: ['All tables'],
      destination: 'S3 Bucket: idcertify-backups'
    }
  ]

  // Schemas
  const schemas = ['public', 'logs', 'auth', 'storage']

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'scheduled':
        return <Clock className="w-5 h-5 text-gray-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy':
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'warning':
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800'
      case 'critical':
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredTables = databaseTables.filter(table => {
    const matchesSearch = searchQuery === '' || 
      table.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSchema = selectedSchema === 'all' || table.schema === selectedSchema
    const matchesStatus = selectedStatus === 'all' || table.status === selectedStatus
    
    return matchesSearch && matchesSchema && matchesStatus
  })

  const handleBackupNow = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real app, this would trigger a backup job
      console.log('Starting backup job')
      
      setShowBackupModal(false)
    } catch (error) {
      console.error('Error starting backup:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Database Management</h1>
          <p className="text-gray-600 mt-1">Monitor, maintain, and optimize database performance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Schema
          </button>
          <button 
            onClick={() => setShowBackupModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Database className="w-4 h-4 mr-2" />
            Backup Now
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Database Size',
            value: `${databaseStats.totalSize} MB`,
            icon: Database,
            color: 'bg-blue-500',
            description: 'Total storage used'
          },
          {
            title: 'Total Tables',
            value: databaseStats.totalTables,
            icon: Server,
            color: 'bg-green-500',
            description: 'Across all schemas'
          },
          {
            title: 'Total Records',
            value: databaseStats.totalRows.toLocaleString(),
            icon: FileText,
            color: 'bg-purple-500',
            description: 'All database records'
          },
          {
            title: 'Avg Query Time',
            value: `${databaseStats.avgQueryTime} ms`,
            icon: Clock,
            color: 'bg-orange-500',
            description: 'Average response time'
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
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'tables', label: 'Tables', icon: Server },
            { id: 'backups', label: 'Backups & Recovery', icon: HardDrive },
            { id: 'maintenance', label: 'Maintenance', icon: Settings }
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
          {/* Database Health */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Database Health</h3>
            
            <div className="space-y-6">
              {/* Resource Usage */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Resource Usage</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">CPU Usage</span>
                      <span className="font-medium">{databaseStats.cpuUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          databaseStats.cpuUsage > 80 ? 'bg-red-500' :
                          databaseStats.cpuUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${databaseStats.cpuUsage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Memory Usage</span>
                      <span className="font-medium">{databaseStats.memoryUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          databaseStats.memoryUsage > 80 ? 'bg-red-500' :
                          databaseStats.memoryUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${databaseStats.memoryUsage}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-gray-600">Disk Usage</span>
                      <span className="font-medium">{databaseStats.diskUsage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          databaseStats.diskUsage > 80 ? 'bg-red-500' :
                          databaseStats.diskUsage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${databaseStats.diskUsage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Connection Stats */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Connection Stats</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Active Connections</p>
                    <p className="text-2xl font-bold text-gray-900">{databaseStats.connectionCount}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Max Connections</p>
                    <p className="text-2xl font-bold text-gray-900">100</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Connection Pool</p>
                    <p className="text-2xl font-bold text-gray-900">Healthy</p>
                  </div>
                </div>
              </div>
              
              {/* Recent Alerts */}
              <div className="pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-3">Recent Alerts</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-red-900">High disk usage on audit_logs table</p>
                        <p className="text-xs text-red-700 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-yellow-900">Slow query detected on documents table</p>
                        <p className="text-xs text-yellow-700 mt-1">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Backup Status */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Backup Status</h3>
              <button 
                onClick={() => setShowBackupModal(true)}
                className="text-primary-600 hover:text-primary-700 text-sm font-medium"
              >
                Backup Now →
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-green-900">Last Successful Backup</h4>
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <p className="text-sm text-green-800 mb-1">Full Backup</p>
                <p className="text-xs text-green-700">
                  {new Date(backupJobs[0].startTime).toLocaleString()} • {backupJobs[0].sizeInMB} MB
                </p>
              </div>
              
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-blue-900">Next Scheduled Backup</h4>
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <p className="text-sm text-blue-800 mb-1">Full Backup</p>
                <p className="text-xs text-blue-700">
                  {new Date(backupJobs[3].startTime).toLocaleString()}
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Backup Schedule</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Full Backup</span>
                    <span className="text-gray-900">Daily at 2:00 AM</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Incremental Backup</span>
                    <span className="text-gray-900">Every 6 hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Retention Period</span>
                    <span className="text-gray-900">30 days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tables' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tables..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <select 
                  value={selectedSchema}
                  onChange={(e) => setSelectedSchema(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Schemas</option>
                  {schemas.map(schema => (
                    <option key={schema} value={schema}>{schema}</option>
                  ))}
                </select>
                
                <select 
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="healthy">Healthy</option>
                  <option value="warning">Warning</option>
                  <option value="critical">Critical</option>
                </select>
                
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </button>
              </div>
            </div>
          </div>

          {/* Tables List */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Table Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schema
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Row Count
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Backup Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTables.map((table) => (
                    <tr key={table.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Server className="w-5 h-5 text-gray-500 mr-3" />
                          <span className="text-sm font-medium text-gray-900">{table.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {table.schema}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {table.rowCount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {table.sizeInMB} MB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(table.status)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(table.status)}`}>
                            {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(table.lastUpdated).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(table.backupStatus)}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(table.backupStatus)}`}>
                            {table.backupStatus.replace('_', ' ').charAt(0).toUpperCase() + table.backupStatus.replace('_', ' ').slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button 
                            onClick={() => {
                              setSelectedTable(table)
                              setShowTableModal(true)
                            }}
                            className="text-primary-600 hover:text-primary-900"
                          >
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
        </div>
      )}

      {activeTab === 'backups' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Backup & Recovery</h3>
            <button 
              onClick={() => setShowBackupModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Database className="w-4 h-4 mr-2" />
              Create Backup
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Backup Configuration */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Backup Configuration</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Backup Schedule</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Full Backup</span>
                      <span className="text-gray-900">Daily at 2:00 AM</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Incremental Backup</span>
                      <span className="text-gray-900">Every 6 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Retention Period</span>
                      <span className="text-gray-900">30 days</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 border border-gray-200 rounded-lg">
                  <p className="font-medium text-gray-900 mb-2">Backup Storage</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Primary Location</span>
                      <span className="text-gray-900">S3 Bucket</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Secondary Location</span>
                      <span className="text-gray-900">Azure Blob Storage</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Encryption</span>
                      <span className="text-gray-900">AES-256</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Backup Jobs */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Recent Backup Jobs</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Backup Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Start Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        End Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {backupJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <HardDrive className="w-5 h-5 text-gray-500 mr-3" />
                            <span className="text-sm font-medium text-gray-900 capitalize">{job.type} Backup</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(job.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {new Date(job.startTime).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.endTime ? new Date(job.endTime).toLocaleString() : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {job.sizeInMB ? `${job.sizeInMB} MB` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {job.destination}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end space-x-2">
                            <button className="text-primary-600 hover:text-primary-900">
                              View Details
                            </button>
                            {job.status === 'completed' && (
                              <button className="text-blue-600 hover:text-blue-900">
                                Restore
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Database Maintenance</h3>
          
          <div className="space-y-6">
            {/* Maintenance Tasks */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4">Maintenance Tasks</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: 'Vacuum Database',
                    description: 'Reclaim storage and update statistics',
                    lastRun: '2024-01-19',
                    status: 'completed',
                    icon: RefreshCw
                  },
                  {
                    name: 'Reindex Tables',
                    description: 'Rebuild indexes to improve query performance',
                    lastRun: '2024-01-18',
                    status: 'completed',
                    icon: Database
                  },
                  {
                    name: 'Analyze Tables',
                    description: 'Update query planner statistics',
                    lastRun: '2024-01-20',
                    status: 'completed',
                    icon: BarChart3
                  },
                  {
                    name: 'Check Database Integrity',
                    description: 'Verify database consistency',
                    lastRun: '2024-01-15',
                    status: 'completed',
                    icon: Shield
                  }
                ].map((task, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <task.icon className="w-5 h-5 text-gray-600" />
                      <p className="font-medium text-gray-900">{task.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Last run: {task.lastRun}</span>
                      <button className="bg-primary-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-primary-700 transition-colors">
                        Run Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Scheduled Maintenance */}
            <div className="pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-4">Scheduled Maintenance</h4>
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Automatic Vacuum</p>
                      <p className="text-sm text-gray-600">Automatically reclaim storage</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Weekly Reindexing</p>
                      <p className="text-sm text-gray-600">Rebuild indexes every Sunday at 2:00 AM</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Daily Statistics Update</p>
                      <p className="text-sm text-gray-600">Update query planner statistics daily</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">Monthly Integrity Check</p>
                      <p className="text-sm text-gray-600">Verify database consistency monthly</p>
                    </div>
                    <div className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Table Detail Modal */}
      {showTableModal && selectedTable && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Table Details: {selectedTable.name}</h2>
                <button 
                  onClick={() => setShowTableModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Table Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <Server className="w-8 h-8 text-gray-600" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{selectedTable.name}</h3>
                    <p className="text-gray-600">Schema: {selectedTable.schema}</p>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedTable.status)}`}>
                        {selectedTable.status.charAt(0).toUpperCase() + selectedTable.status.slice(1)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {selectedTable.rowCount.toLocaleString()} rows • {selectedTable.sizeInMB} MB
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Updated</p>
                    <p className="font-medium text-gray-900">{new Date(selectedTable.lastUpdated).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Last Backup</p>
                    <p className="font-medium text-gray-900">
                      {selectedTable.lastBackup ? new Date(selectedTable.lastBackup).toLocaleString() : 'Never'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Backup Status</p>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedTable.backupStatus)}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedTable.backupStatus)}`}>
                        {selectedTable.backupStatus.charAt(0).toUpperCase() + selectedTable.backupStatus.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Table Structure */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Table Structure</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Column Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data Type
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nullable
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Default Value
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Constraints
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* Mock columns based on table name */}
                      {selectedTable.name === 'users' ? (
                        <>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">id</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">uuid</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">gen_random_uuid()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PRIMARY KEY</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">email</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">text</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NULL</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">UNIQUE</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">created_at</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">timestamp with time zone</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">now()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                          </tr>
                        </>
                      ) : selectedTable.name === 'verifications' ? (
                        <>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">id</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">uuid</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">gen_random_uuid()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PRIMARY KEY</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">user_id</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">uuid</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NULL</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">FOREIGN KEY</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">status</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">text</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">'pending'</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                          </tr>
                        </>
                      ) : (
                        <>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">id</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">uuid</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">gen_random_uuid()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">PRIMARY KEY</td>
                          </tr>
                          <tr className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">created_at</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">timestamp with time zone</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">NO</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">now()</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export Schema
                </button>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Table
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Create Database Backup</h2>
                <button 
                  onClick={() => setShowBackupModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Type
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="full">Full Backup</option>
                  <option value="incremental">Incremental Backup</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Backup Destination
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="s3">S3 Bucket: idcertify-backups</option>
                  <option value="azure">Azure Blob Storage</option>
                  <option value="local">Local Storage</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Include Tables
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option value="all">All Tables</option>
                  <option value="selected">Selected Tables</option>
                </select>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Backup Information</p>
                    <p className="text-sm text-blue-700 mt-1">
                      Full backups may take several minutes to complete depending on database size.
                      The system will remain operational during the backup process.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowBackupModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleBackupNow}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Database className="w-4 h-4 mr-2" />
                  )}
                  Start Backup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDatabaseManagement