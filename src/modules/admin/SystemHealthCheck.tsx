import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Grid,
  Box,
  Chip,
  LinearProgress,
  Alert,
  Button,
  IconButton,
  Tooltip
} from '@mui/material';
import ActivityIcon from '@mui/icons-material/Timeline';
import ServerIcon from '@mui/icons-material/Storage';
import DatabaseIcon from '@mui/icons-material/Storage';
import WifiIcon from '@mui/icons-material/Wifi';
import AlertTriangleIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ClockIcon from '@mui/icons-material/AccessTime';
import UsersIcon from '@mui/icons-material/People';
import HardDriveIcon from '@mui/icons-material/Storage';
import CpuIcon from '@mui/icons-material/Memory';
import MemoryStickIcon from '@mui/icons-material/Memory';
import NetworkIcon from '@mui/icons-material/NetworkCheck';
import ShieldIcon from '@mui/icons-material/Security';
import ZapIcon from '@mui/icons-material/FlashOn';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ActivityIcon from '@mui/icons-material/Timeline';
import ServerIcon from '@mui/icons-material/Storage';
import DatabaseIcon from '@mui/icons-material/Storage';
import CpuIcon from '@mui/icons-material/Memory';
import HardDriveIcon from '@mui/icons-material/Storage';
import WifiIcon from '@mui/icons-material/Wifi';
import ShieldIcon from '@mui/icons-material/Security';
import AlertTriangleIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import XCircleIcon from '@mui/icons-material/Cancel';
import ClockIcon from '@mui/icons-material/Schedule';
import ZapIcon from '@mui/icons-material/FlashOn';
import UsersIcon from '@mui/icons-material/People';
import GlobeIcon from '@mui/icons-material/Public';
import LockIcon from '@mui/icons-material/Lock';
import UnlockIcon from '@mui/icons-material/LockOpen';
import SettingsIcon from '@mui/icons-material/Settings';
import RefreshCwIcon from '@mui/icons-material/Refresh';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import BarChart3Icon from '@mui/icons-material/BarChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import BellIcon from '@mui/icons-material/Notifications';
  Search, 
  Info, 
  Settings,
  Bell
} from 'lucide-react'

const SystemHealthCheck = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('24hours')
  const [refreshing, setRefreshing] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Health Check</h1>
          <p className="text-gray-600 mt-1">Monitor system performance, resources, and health metrics</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <select 
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="1hour">Last Hour</option>
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
          
          <button 
            onClick={handleRefresh}
            disabled={refreshing}
            className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center disabled:opacity-50"
          >
            {refreshing ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-700 mr-2"></div>
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </button>
          
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'System Status',
            value: 'Healthy',
            icon: CheckCircle,
            color: 'bg-green-500',
            description: 'All systems operational'
          },
          {
            title: 'Uptime',
            value: '99.98%',
            icon: Clock,
            color: 'bg-blue-500',
            description: 'Last 30 days'
          },
          {
            title: 'Response Time',
            value: '142ms',
            icon: Activity,
            color: 'bg-purple-500',
            description: 'Average API response'
          },
          {
            title: 'Error Rate',
            value: '0.03%',
            icon: AlertTriangle,
            color: 'bg-yellow-500',
            description: 'Last 24 hours'
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

      {/* Resource Usage */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Resource Usage</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CPU Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">CPU Usage</span>
              </div>
              <span className="text-sm font-bold text-gray-900">32%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '32%' }}></div>
            </div>
            <p className="text-xs text-gray-500">8 cores, 3.5 GHz</p>
          </div>
          
          {/* Memory Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Memory Usage</span>
              </div>
              <span className="text-sm font-bold text-gray-900">64%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '64%' }}></div>
            </div>
            <p className="text-xs text-gray-500">16 GB total, 10.24 GB used</p>
          </div>
          
          {/* Disk Usage */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <HardDrive className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-900">Disk Usage</span>
              </div>
              <span className="text-sm font-bold text-gray-900">47%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-purple-600 h-2.5 rounded-full" style={{ width: '47%' }}></div>
            </div>
            <p className="text-xs text-gray-500">500 GB total, 235 GB used</p>
          </div>
        </div>
      </div>

      {/* Service Health */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Health</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'API Services', status: 'operational', uptime: '99.99%', responseTime: '125ms', icon: Globe },
            { name: 'Database Cluster', status: 'operational', uptime: '99.98%', responseTime: '45ms', icon: Database },
            { name: 'Authentication Service', status: 'operational', uptime: '99.95%', responseTime: '89ms', icon: Server },
            { name: 'Storage Service', status: 'degraded', uptime: '99.87%', responseTime: '210ms', icon: HardDrive },
            { name: 'Verification Engine', status: 'operational', uptime: '99.92%', responseTime: '156ms', icon: CheckCircle },
            { name: 'Notification Service', status: 'operational', uptime: '99.97%', responseTime: '78ms', icon: Bell }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  service.status === 'operational' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <service.icon className={`w-5 h-5 ${
                    service.status === 'operational' ? 'text-green-600' : 'text-yellow-600'
                  }`} />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{service.name}</p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <span>Uptime: {service.uptime}</span>
                    <span>•</span>
                    <span>Response: {service.responseTime}</span>
                  </div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                service.status === 'operational' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {service.status.charAt(0).toUpperCase() + service.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
          <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* API Calls */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">API Calls</h4>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>+12.5%</span>
              </div>
            </div>
            <div className="h-40 flex items-end justify-between space-x-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-blue-500 rounded-t w-full"
                  style={{ height: `${Math.floor(Math.random() * 70) + 10}%` }}
                ></div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">Hourly API calls</div>
          </div>
          
          {/* Response Time */}
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium text-gray-900">Response Time</h4>
              <div className="flex items-center text-green-600 text-sm">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span>-8.3%</span>
              </div>
            </div>
            <div className="h-40 flex items-end justify-between space-x-1">
              {Array.from({ length: 24 }).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-green-500 rounded-t w-full"
                  style={{ height: `${Math.floor(Math.random() * 50) + 20}%` }}
                ></div>
              ))}
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">Hourly average response time (ms)</div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Alerts</h3>
        
        <div className="space-y-4">
          {[
            { 
              title: 'Storage Service Degraded Performance', 
              description: 'Storage service is experiencing higher than normal latency',
              time: '35 minutes ago',
              severity: 'warning',
              status: 'active'
            },
            { 
              title: 'Database Backup Completed', 
              description: 'Scheduled database backup completed successfully',
              time: '2 hours ago',
              severity: 'info',
              status: 'resolved'
            },
            { 
              title: 'High CPU Usage Detected', 
              description: 'CPU usage exceeded 80% threshold for 15 minutes',
              time: '5 hours ago',
              severity: 'warning',
              status: 'resolved'
            },
            { 
              title: 'API Rate Limit Exceeded', 
              description: 'Client exceeded API rate limit (client_id: api_client_123)',
              time: '1 day ago',
              severity: 'error',
              status: 'resolved'
            }
          ].map((alert, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
              <div className={`p-2 rounded-full flex-shrink-0 ${
                alert.severity === 'error' ? 'bg-red-100' :
                alert.severity === 'warning' ? 'bg-yellow-100' :
                'bg-blue-100'
              }`}>
                <AlertTriangle className={`w-5 h-5 ${
                  alert.severity === 'error' ? 'text-red-600' :
                  alert.severity === 'warning' ? 'text-yellow-600' :
                  'text-blue-600'
                }`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{alert.title}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    alert.status === 'active' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {alert.status.charAt(0).toUpperCase() + alert.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{alert.description}</p>
                <p className="text-xs text-gray-500 mt-2">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SystemHealthCheck