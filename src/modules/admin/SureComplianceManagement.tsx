import React, { useState } from 'react';
import { Shield, FileText, AlertCircle, CheckCircle, Clock, Search, Filter, Eye, Download } from 'lucide-react';

interface ComplianceRecord {
  id: string;
  entityName: string;
  entityType: 'Individual' | 'Organization';
  complianceType: 'KYC' | 'AML' | 'GDPR' | 'SOX' | 'PCI-DSS' | 'HIPAA';
  status: 'Compliant' | 'Non-Compliant' | 'Pending Review' | 'Expired';
  lastReview: string;
  nextReview: string;
  riskScore: number;
  violations: number;
  documents: number;
}

const mockComplianceRecords: ComplianceRecord[] = [
  {
    id: '1',
    entityName: 'TechCorp Solutions',
    entityType: 'Organization',
    complianceType: 'SOX',
    status: 'Compliant',
    lastReview: '2024-11-15',
    nextReview: '2025-11-15',
    riskScore: 15,
    violations: 0,
    documents: 25
  },
  {
    id: '2',
    entityName: 'Global Industries Ltd',
    entityType: 'Organization',
    complianceType: 'GDPR',
    status: 'Pending Review',
    lastReview: '2024-10-20',
    nextReview: '2025-01-20',
    riskScore: 45,
    violations: 2,
    documents: 18
  },
  {
    id: '3',
    entityName: 'John Smith',
    entityType: 'Individual',
    complianceType: 'KYC',
    status: 'Non-Compliant',
    lastReview: '2024-09-10',
    nextReview: '2024-12-10',
    riskScore: 78,
    violations: 3,
    documents: 8
  }
];

export default function SureComplianceManagement() {
  const [complianceRecords, setComplianceRecords] = useState<ComplianceRecord[]>(mockComplianceRecords);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Compliant' | 'Non-Compliant' | 'Pending Review' | 'Expired'>('All');
  const [filterType, setFilterType] = useState<'All' | 'KYC' | 'AML' | 'GDPR' | 'SOX' | 'PCI-DSS' | 'HIPAA'>('All');

  const filteredRecords = complianceRecords.filter(record => {
    const matchesSearch = record.entityName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || record.status === filterStatus;
    const matchesType = filterType === 'All' || record.complianceType === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'text-success-600 bg-success-50';
      case 'Non-Compliant': return 'text-error-600 bg-error-50';
      case 'Pending Review': return 'text-warning-600 bg-warning-50';
      case 'Expired': return 'text-error-700 bg-error-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getRiskColor = (score: number) => {
    if (score <= 25) return 'text-success-600 bg-success-50';
    if (score <= 50) return 'text-warning-600 bg-warning-50';
    if (score <= 75) return 'text-error-600 bg-error-50';
    return 'text-error-700 bg-error-100';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircle className="w-4 h-4 text-success-600" />;
      case 'Non-Compliant': return <AlertCircle className="w-4 h-4 text-error-600" />;
      case 'Pending Review': return <Clock className="w-4 h-4 text-warning-600" />;
      case 'Expired': return <AlertCircle className="w-4 h-4 text-error-700" />;
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">SureCompliance Management System</h1>
          <p className="text-gray-600 mt-1">Comprehensive compliance monitoring and management platform</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
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
              <p className="text-sm text-gray-600">Compliant</p>
              <p className="text-2xl font-bold text-gray-900">
                {complianceRecords.filter(r => r.status === 'Compliant').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-error-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Non-Compliant</p>
              <p className="text-2xl font-bold text-gray-900">
                {complianceRecords.filter(r => r.status === 'Non-Compliant').length}
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
              <p className="text-sm text-gray-600">Pending Review</p>
              <p className="text-2xl font-bold text-gray-900">
                {complianceRecords.filter(r => r.status === 'Pending Review').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Shield className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Risk Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(complianceRecords.reduce((acc, r) => acc + r.riskScore, 0) / complianceRecords.length)}
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
              <option value="Compliant">Compliant</option>
              <option value="Non-Compliant">Non-Compliant</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Expired">Expired</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="KYC">KYC</option>
              <option value="AML">AML</option>
              <option value="GDPR">GDPR</option>
              <option value="SOX">SOX</option>
              <option value="PCI-DSS">PCI-DSS</option>
              <option value="HIPAA">HIPAA</option>
            </select>
          </div>
        </div>
      </div>

      {/* Compliance Records Table */}
      <div className="bg-white rounded-lg shadow-soft border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Violations
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Next Review
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRecords.map((record) => (
                <tr key={record.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{record.entityName}</div>
                      <div className="text-sm text-gray-500">{record.entityType}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{record.complianceType}</div>
                    <div className="text-sm text-gray-500">{record.documents} documents</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${record.riskScore <= 25 ? 'bg-success-600' : 
                            record.riskScore <= 50 ? 'bg-warning-600' : 
                            record.riskScore <= 75 ? 'bg-error-600' : 'bg-error-700'}`}
                          style={{ width: `${record.riskScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{record.riskScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      record.violations === 0 ? 'text-success-600 bg-success-50' : 'text-error-600 bg-error-50'
                    }`}>
                      {record.violations}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(record.nextReview).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-secondary-600 hover:text-secondary-900">
                        <FileText className="w-4 h-4" />
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