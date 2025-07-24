import React, { useState } from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle, Search, Filter, Eye, Download, RefreshCw } from 'lucide-react';

interface AMLCheck {
  id: string;
  entityName: string;
  entityType: 'Individual' | 'Organization';
  checkType: 'Sanctions' | 'PEP' | 'Adverse Media' | 'Watchlist';
  status: 'Clear' | 'Match' | 'Potential Match' | 'Processing';
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  lastChecked: string;
  matchDetails?: string;
  source: string;
  confidence: number;
}

const mockAMLChecks: AMLCheck[] = [
  {
    id: '1',
    entityName: 'John Smith',
    entityType: 'Individual',
    checkType: 'Sanctions',
    status: 'Clear',
    riskLevel: 'Low',
    lastChecked: '2024-12-15T10:30:00Z',
    source: 'OFAC',
    confidence: 95
  },
  {
    id: '2',
    entityName: 'Global Industries Ltd',
    entityType: 'Organization',
    checkType: 'Watchlist',
    status: 'Potential Match',
    riskLevel: 'Medium',
    lastChecked: '2024-12-15T09:15:00Z',
    matchDetails: 'Similar name found in EU sanctions list',
    source: 'EU Sanctions',
    confidence: 78
  },
  {
    id: '3',
    entityName: 'Alice Johnson',
    entityType: 'Individual',
    checkType: 'PEP',
    status: 'Match',
    riskLevel: 'High',
    lastChecked: '2024-12-14T16:45:00Z',
    matchDetails: 'Former government official',
    source: 'PEP Database',
    confidence: 92
  }
];

export default function SureAMLManagement() {
  const [amlChecks, setAmlChecks] = useState<AMLCheck[]>(mockAMLChecks);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Clear' | 'Match' | 'Potential Match' | 'Processing'>('All');
  const [filterRisk, setFilterRisk] = useState<'All' | 'Low' | 'Medium' | 'High' | 'Critical'>('All');

  const filteredChecks = amlChecks.filter(check => {
    const matchesSearch = check.entityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || check.status === filterStatus;
    const matchesRisk = filterRisk === 'All' || check.riskLevel === filterRisk;
    return matchesSearch && matchesStatus && matchesRisk;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Clear': return 'text-success-600 bg-success-50';
      case 'Match': return 'text-error-600 bg-error-50';
      case 'Potential Match': return 'text-warning-600 bg-warning-50';
      case 'Processing': return 'text-primary-600 bg-primary-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-success-600 bg-success-50';
      case 'Medium': return 'text-warning-600 bg-warning-50';
      case 'High': return 'text-error-600 bg-error-50';
      case 'Critical': return 'text-error-700 bg-error-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Clear': return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'Match': return <XCircle className="w-4 h-4 text-error-600" />;
      case 'Potential Match': return <AlertTriangle className="w-4 h-4 text-warning-600" />;
      case 'Processing': return <RefreshCw className="w-4 h-4 text-primary-600 animate-spin" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SureAML Management System</h1>
          <p className="text-gray-600 mt-1">Anti-Money Laundering compliance and monitoring system</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Bulk Check
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Clear Checks</p>
              <p className="text-2xl font-bold text-gray-900">
                {amlChecks.filter(c => c.status === 'Clear').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Potential Matches</p>
              <p className="text-2xl font-bold text-gray-900">
                {amlChecks.filter(c => c.status === 'Potential Match').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error-50 rounded-lg">
              <XCircle className="w-6 h-6 text-error-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Matches Found</p>
              <p className="text-2xl font-bold text-gray-900">
                {amlChecks.filter(c => c.status === 'Match').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error-50 rounded-lg">
              <Shield className="w-6 h-6 text-error-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">High Risk</p>
              <p className="text-2xl font-bold text-gray-900">
                {amlChecks.filter(c => c.riskLevel === 'High' || c.riskLevel === 'Critical').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-soft border">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search entities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Status</option>
              <option value="Clear">Clear</option>
              <option value="Potential Match">Potential Match</option>
              <option value="Match">Match</option>
              <option value="Processing">Processing</option>
            </select>
            <select
              value={filterRisk}
              onChange={(e) => setFilterRisk(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Risk Levels</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      {/* AML Checks Table */}
      <div className="bg-white rounded-lg shadow-soft border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Confidence
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Checked
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredChecks.map((check) => (
                <tr key={check.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{check.entityName}</div>
                      <div className="text-sm text-gray-500">{check.entityType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{check.checkType}</div>
                    <div className="text-sm text-gray-500">{check.source}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(check.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(check.status)}`}>
                        {check.status}
                      </span>
                    </div>
                    {check.matchDetails && (
                      <div className="text-xs text-gray-500 mt-1">{check.matchDetails}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskColor(check.riskLevel)}`}>
                      {check.riskLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${check.confidence}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{check.confidence}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(check.lastChecked).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-secondary-600 hover:text-secondary-900">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button className="text-accent-600 hover:text-accent-900">
                        <Download className="w-4 h-4" />
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
  );
}