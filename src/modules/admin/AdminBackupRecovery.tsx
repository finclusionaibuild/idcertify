import React, { useState } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import StorageIcon from '@mui/icons-material/Storage';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import { 
  RefreshCw, 
  Shield, 
  XCircle,
  Calendar,
  Settings,
  Play,
  Pause,
  RotateCcw,
  HardDrive,
  Cloud,
  Server,
  Archive,
  FileText,
  Eye,
  Trash2
} from 'lucide-react';

interface BackupJob {
  id: string;
  name: string;
  type: 'full' | 'incremental' | 'differential';
  source: 'database' | 'files' | 'system' | 'all';
  destination: 'local' | 'cloud' | 'remote';
  schedule: string;
  status: 'running' | 'completed' | 'failed' | 'scheduled' | 'paused';
  lastRun: string;
  nextRun: string;
  size: number;
  duration: number;
  retention: number;
  isEnabled: boolean;
  progress?: number;
}

interface BackupRecord {
  id: string;
  jobId: string;
  jobName: string;
  type: 'full' | 'incremental' | 'differential';
  status: 'completed' | 'failed' | 'corrupted';
  startTime: string;
  endTime: string;
  size: number;
  location: string;
  checksum: string;
  canRestore: boolean;
}

interface RestorePoint {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  size: number;
  type: 'manual' | 'automatic';
  status: 'available' | 'expired' | 'corrupted';
  components: string[];
}

const AdminBackupRecovery: React.FC = () => {
  const [backupJobs, setBackupJobs] = useState<BackupJob[]>([
    {
      id: 'job-001',
      name: 'Daily Database Backup',
      type: 'full',
      source: 'database',
      destination: 'cloud',
      schedule: '0 2 * * *',
      status: 'completed',
      lastRun: '2024-01-15T02:00:00Z',
      nextRun: '2024-01-16T02:00:00Z',
      size: 2147483648,
      duration: 1800,
      retention: 30,
      isEnabled: true
    },
    {
      id: 'job-002',
      name: 'Hourly Incremental Backup',
      type: 'incremental',
      source: 'files',
      destination: 'local',
      schedule: '0 * * * *',
      status: 'running',
      lastRun: '2024-01-15T14:00:00Z',
      nextRun: '2024-01-15T15:00:00Z',
      size: 524288000,
      duration: 300,
      retention: 7,
      isEnabled: true,
      progress: 65
    }
  ]);

  const [backupRecords, setBackupRecords] = useState<BackupRecord[]>([
    {
      id: 'backup-001',
      jobId: 'job-001',
      jobName: 'Daily Database Backup',
      type: 'full',
      status: 'completed',
      startTime: '2024-01-15T02:00:00Z',
      endTime: '2024-01-15T02:30:00Z',
      size: 2147483648,
      location: 's3://backups/db-backup-20240115.sql.gz',
      checksum: 'sha256:abc123...',
      canRestore: true
    }
  ]);

  const [restorePoints, setRestorePoints] = useState<RestorePoint[]>([
    {
      id: 'restore-001',
      name: 'Pre-Migration Snapshot',
      description: 'System snapshot before major database migration',
      createdAt: '2024-01-14T18:00:00Z',
      size: 5368709120,
      type: 'manual',
      status: 'available',
      components: ['Database', 'User Files', 'Configuration']
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'backups' | 'restore' | 'settings'>('overview');
  const [selectedJob, setSelectedJob] = useState<BackupJob | null>(null);
  const [showRestoreModal, setShowRestoreModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'running': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'paused': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-4 h-4" />;
      case 'running': return <RefreshCw className="w-4 h-4 animate-spin" />;
      case 'failed': return <XCircle className="w-4 h-4" />;
      case 'scheduled': return <AccessTimeIcon className="w-4 h-4" />;
      case 'paused': return <Pause className="w-4 h-4" />;
      default: return <AccessTimeIcon className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'full': return 'bg-blue-100 text-blue-800';
      case 'incremental': return 'bg-green-100 text-green-800';
      case 'differential': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'database': return <StorageIcon className="w-4 h-4" />;
      case 'files': return <FileText className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'all': return <Server className="w-4 h-4" />;
      default: return <Archive className="w-4 h-4" />;
    }
  };

  const getDestinationIcon = (destination: string) => {
    switch (destination) {
      case 'local': return <HardDrive className="w-4 h-4" />;
      case 'cloud': return <Cloud className="w-4 h-4" />;
      case 'remote': return <Server className="w-4 h-4" />;
      default: return <Archive className="w-4 h-4" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Backup & Recovery Management</h1>
          <p className="text-gray-600 mt-2">Manage system backups, recovery points, and data protection</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 flex items-center gap-2">
            <RotateCcw className="w-4 h-4" />
            Create Restore Point
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2">
            <Play className="w-4 h-4" />
            Run Backup Now
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Shield },
            { id: 'jobs', label: 'Backup Jobs', icon: Calendar },
            { id: 'backups', label: 'Backup History', icon: Archive },
            { id: 'restore', label: 'Restore Points', icon: RotateCcw },
            { id: 'settings', label: 'Settings', icon: Settings }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {backupJobs.filter(job => job.isEnabled).length}
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Backups</p>
                  <p className="text-2xl font-bold text-gray-900">{backupRecords.length}</p>
                </div>
                <Archive className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatFileSize(backupRecords.reduce((sum, backup) => sum + backup.size, 0))}
                  </p>
                </div>
                <HardDrive className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-gray-900">98.5%</p>
                </div>
                <CheckCircleIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Recent Backup Activity</h4>
                  <div className="space-y-3">
                    {backupJobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          {getSourceIcon(job.source)}
                          <div>
                            <p className="font-medium text-gray-900">{job.name}</p>
                            <p className="text-sm text-gray-600">
                              Last run: {new Date(job.lastRun).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(job.status)}`}>
                          {getStatusIcon(job.status)}
                          {job.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Storage Distribution</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Database Backups</span>
                      <span className="font-bold text-2xl text-blue-600">65%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">File Backups</span>
                      <span className="font-bold text-2xl text-green-600">25%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">System Backups</span>
                      <span className="font-bold text-2xl text-yellow-600">10%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
            </div>
            <div className="p-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <WarningIcon className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">Storage Space Warning</p>
                    <p className="text-sm text-yellow-700">Backup storage is 85% full. Consider cleaning old backups.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800">All Systems Operational</p>
                    <p className="text-sm text-green-700">All backup jobs completed successfully in the last 24 hours.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Backup Jobs Tab */}
      {activeTab === 'jobs' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Backup Jobs</h3>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Create New Job
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Job</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Run</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Run</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backupJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{job.name}</div>
                          <div className="text-sm text-gray-500">
                            {job.isEnabled ? 'Enabled' : 'Disabled'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(job.type)}`}>
                          {job.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getSourceIcon(job.source)}
                          <span className="text-sm text-gray-900 capitalize">{job.source}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getDestinationIcon(job.destination)}
                          <span className="text-sm text-gray-900 capitalize">{job.destination}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(job.status)}`}>
                            {getStatusIcon(job.status)}
                            {job.status}
                          </span>
                          {job.progress && (
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{ width: `${job.progress}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.lastRun).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(job.nextRun).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedJob(job)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <Play className="w-4 h-4" />
                          </button>
                          <button className="text-gray-600 hover:text-gray-900">
                            <Settings className="w-4 h-4" />
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

      {/* Backup History Tab */}
      {activeTab === 'backups' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Backup History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Backup</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {backupRecords.map((backup) => (
                    <tr key={backup.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{backup.jobName}</div>
                          <div className="text-sm text-gray-500">{backup.id}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(backup.type)}`}>
                          {backup.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(backup.status)}`}>
                          {getStatusIcon(backup.status)}
                          {backup.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatFileSize(backup.size)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDuration(Math.floor((new Date(backup.endTime).getTime() - new Date(backup.startTime).getTime()) / 1000))}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(backup.startTime).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <DownloadIcon className="w-4 h-4" />
                          </button>
                          {backup.canRestore && (
                            <button
                              onClick={() => setShowRestoreModal(true)}
                              className="text-purple-600 hover:text-purple-900"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                          )}
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

      {/* Restore Points Tab */}
      {activeTab === 'restore' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">System Restore Points</h3>
                <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700">
                  Create Restore Point
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {restorePoints.map((point) => (
                  <div key={point.id} className="border rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <RotateCcw className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{point.name}</h4>
                          <p className="text-sm text-gray-600">{point.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          point.status === 'available' ? 'bg-green-100 text-green-800' :
                          point.status === 'expired' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {point.status}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          point.type === 'manual' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {point.type}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-600">Created:</span>
                        <p className="font-medium">{new Date(point.createdAt).toLocaleString()}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Size:</span>
                        <p className="font-medium">{formatFileSize(point.size)}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Components:</span>
                        <p className="font-medium">{point.components.length} items</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-600">Components:</span>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {point.components.map((component) => (
                          <span key={component} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {component}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        <Eye className="w-4 h-4 inline mr-1" />
                        View Details
                      </button>
                      {point.status === 'available' && (
                        <button
                          onClick={() => setShowRestoreModal(true)}
                          className="text-green-600 hover:text-green-800 text-sm"
                        >
                          <RotateCcw className="w-4 h-4 inline mr-1" />
                          Restore
                        </button>
                      )}
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

      {/* Settings Tab */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Backup & Recovery Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3">General Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Default retention period</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-2">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>1 year</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Compression level</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-2">
                      <option>Low (Fast)</option>
                      <option>Medium (Balanced)</option>
                      <option>High (Small size)</option>
                    </select>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Encryption</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-2">
                      <option>AES-256</option>
                      <option>AES-128</option>
                      <option>None</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Notification Settings</h4>
                <div className="space-y-3">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">Email notifications for backup failures</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">Daily backup status reports</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-700">Storage space warnings</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Storage Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Local storage path</span>
                    <input
                      type="text"
                      value="/var/backups"
                      className="border border-gray-300 rounded-lg px-3 py-2 w-64"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cloud storage provider</span>
                    <select className="border border-gray-300 rounded-lg px-3 py-2">
                      <option>Amazon S3</option>
                      <option>Google Cloud Storage</option>
                      <option>Azure Blob Storage</option>
                    </select>
                  </div>
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

      {/* Restore Modal */}
      {showRestoreModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-hard max-w-2xl w-full mx-4">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">System Restore</h2>
                  <p className="text-gray-600">Restore system from backup or restore point</p>
                </div>
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-2">
                  <WarningIcon className="w-5 h-5 text-yellow-600" />
                  <p className="font-medium text-yellow-800">Warning</p>
                </div>
                <p className="text-sm text-yellow-700 mt-1">
                  This operation will restore your system to a previous state. All changes made after the restore point will be lost.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Restore Point
                </label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                  <option>Pre-Migration Snapshot (2024-01-14)</option>
                  <option>Daily Database Backup (2024-01-15)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Components to Restore
                </label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">Database</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span className="text-gray-700">User Files</span>
                  </label>
                  <label className="flex items-center gap-3">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-gray-700">System Configuration</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => setShowRestoreModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 flex items-center gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Start Restore
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBackupRecovery;