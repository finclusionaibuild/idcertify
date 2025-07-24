import React, { useState } from 'react';
import { AlertTriangle, Clock, CheckCircle, XCircle, Activity, Calendar, Filter, Eye, Plus } from 'lucide-react';

interface DowntimeIncident {
  id: string;
  title: string;
  description: string;
  service: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved';
  startTime: string;
  endTime?: string;
  duration?: number;
  affectedUsers: number;
  rootCause?: string;
  resolution?: string;
}

const mockIncidents: DowntimeIncident[] = [
  {
    id: '1',
    title: 'Database Connection Issues',
    description: 'Users experiencing slow response times due to database connectivity issues',
    service: 'Database',
    severity: 'High',
    status: 'Resolved',
    startTime: '2024-12-15T08:30:00Z',
    endTime: '2024-12-15T10:15:00Z',
    duration: 105,
    affectedUsers: 1250,
    rootCause: 'Database server overload',
    resolution: 'Scaled database resources and optimized queries'
  },
  {
    id: '2',
    title: 'Authentication Service Outage',
    description: 'Complete authentication service unavailable',
    service: 'Authentication',
    severity: 'Critical',
    status: 'Monitoring',
    startTime: '2024-12-15T14:20:00Z',
    endTime: '2024-12-15T14:45:00Z',
    duration: 25,
    affectedUsers: 3500,
    rootCause: 'Third-party service failure',
    resolution: 'Switched to backup authentication provider'
  },
  {
    id: '3',
    title: 'Document Upload Delays',
    description: 'Document processing taking longer than usual',
    service: 'Document Processing',
    severity: 'Medium',
    status: 'Investigating',
    startTime: '2024-12-15T16:00:00Z',
    affectedUsers: 450
  }
];

export default function DownTimeTracker() {
  const [incidents, setIncidents] = useState<DowntimeIncident[]>(mockIncidents);
  const [filterSeverity, setFilterSeverity] = useState<'All' | 'Low' | 'Medium' | 'High' | 'Critical'>('All');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Investigating' | 'Identified' | 'Monitoring' | 'Resolved'>('All');

  const filteredIncidents = incidents.filter(incident => {
    const matchesSeverity = filterSeverity === 'All' || incident.severity === filterSeverity;
    const matchesStatus = filterStatus === 'All' || incident.status === filterStatus;
    return matchesSeverity && matchesStatus;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low': return 'text-success-600 bg-success-50';
      case 'Medium': return 'text-warning-600 bg-warning-50';
      case 'High': return 'text-error-600 bg-error-50';
      case 'Critical': return 'text-error-700 bg-error-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Investigating': return 'text-warning-600 bg-warning-50';
      case 'Identified': return 'text-primary-600 bg-primary-50';
      case 'Monitoring': return 'text-secondary-600 bg-secondary-50';
      case 'Resolved': return 'text-success-600 bg-success-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Investigating': return <AlertTriangle className="w-4 h-4 text-warning-600" />;
      case 'Identified': return <Clock className="w-4 h-4 text-primary-600" />;
      case 'Monitoring': return <Activity className="w-4 h-4 text-secondary-600" />;
      case 'Resolved': return <CheckCircle className="w-4 h-4 text-success-600" />;
      default: return null;
    }
  };

  const calculateUptime = () => {
    const totalHours = 24 * 30; // 30 days
    const downtimeHours = incidents
      .filter(i => i.duration)
      .reduce((acc, i) => acc + (i.duration! / 60), 0);
    return ((totalHours - downtimeHours) / totalHours * 100).toFixed(2);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Downtime Tracker System</h1>
          <p className="text-gray-600 mt-1">Monitor system availability and track incident resolution</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Report Incident
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <Activity className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">System Uptime</p>
              <p className="text-2xl font-bold text-gray-900">{calculateUptime()}%</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-error-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active Incidents</p>
              <p className="text-2xl font-bold text-gray-900">
                {incidents.filter(i => i.status !== 'Resolved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-50 rounded-lg">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Resolution Time</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatDuration(
                  incidents
                    .filter(i => i.duration)
                    .reduce((acc, i) => acc + i.duration!, 0) / 
                  incidents.filter(i => i.duration).length || 0
                )}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{incidents.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-white p-6 rounded-lg shadow-soft border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Current System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { service: 'Authentication', status: 'Operational', color: 'success' },
            { service: 'Database', status: 'Operational', color: 'success' },
            { service: 'Document Processing', status: 'Degraded Performance', color: 'warning' },
            { service: 'API Gateway', status: 'Operational', color: 'success' },
            { service: 'File Storage', status: 'Operational', color: 'success' },
            { service: 'Notification Service', status: 'Operational', color: 'success' }
          ].map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-900">{service.service}</span>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  service.color === 'success' ? 'bg-success-600' : 
                  service.color === 'warning' ? 'bg-warning-600' : 'bg-error-600'
                }`}></div>
                <span className={`text-xs font-medium ${
                  service.color === 'success' ? 'text-success-600' : 
                  service.color === 'warning' ? 'text-warning-600' : 'text-error-600'
                }`}>
                  {service.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-soft border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4">
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Severities</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Investigating">Investigating</option>
              <option value="Identified">Identified</option>
              <option value="Monitoring">Monitoring</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incidents Table */}
      <div className="bg-white rounded-lg shadow-soft border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Incident
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Affected Users
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredIncidents.map((incident) => (
                <tr key={incident.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{incident.title}</div>
                      <div className="text-sm text-gray-500">{incident.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {incident.service}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSeverityColor(incident.severity)}`}>
                      {incident.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(incident.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(incident.status)}`}>
                        {incident.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {incident.duration ? formatDuration(incident.duration) : 'Ongoing'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {incident.affectedUsers.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}