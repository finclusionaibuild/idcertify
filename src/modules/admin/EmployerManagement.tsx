import React, { useState } from 'react';
import { Building2, Users, Shield, Search, Filter, Plus, Eye, Edit, Trash2, Star } from 'lucide-react';

interface Employer {
  id: string;
  name: string;
  type: 'Individual' | 'Corporate';
  tier: 'Basic' | 'Premium' | 'Enterprise';
  kycStatus: 'Pending' | 'Verified' | 'Rejected';
  employeeCount: number;
  trustScore: number;
  joinDate: string;
  status: 'Active' | 'Suspended' | 'Inactive';
}

const mockEmployers: Employer[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    type: 'Corporate',
    tier: 'Enterprise',
    kycStatus: 'Verified',
    employeeCount: 250,
    trustScore: 95,
    joinDate: '2024-01-15',
    status: 'Active'
  },
  {
    id: '2',
    name: 'John Smith Consulting',
    type: 'Individual',
    tier: 'Premium',
    kycStatus: 'Verified',
    employeeCount: 5,
    trustScore: 88,
    joinDate: '2024-02-20',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Global Industries Ltd',
    type: 'Corporate',
    tier: 'Basic',
    kycStatus: 'Pending',
    employeeCount: 120,
    trustScore: 72,
    joinDate: '2024-03-10',
    status: 'Inactive'
  }
];

export default function EmployerManagement() {
  const [employers, setEmployers] = useState<Employer[]>(mockEmployers);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'All' | 'Individual' | 'Corporate'>('All');
  const [filterTier, setFilterTier] = useState<'All' | 'Basic' | 'Premium' | 'Enterprise'>('All');

  const filteredEmployers = employers.filter(employer => {
    const matchesSearch = employer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || employer.type === filterType;
    const matchesTier = filterTier === 'All' || employer.tier === filterTier;
    return matchesSearch && matchesType && matchesTier;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-success-600 bg-success-50';
      case 'Suspended': return 'text-warning-600 bg-warning-50';
      case 'Inactive': return 'text-error-600 bg-error-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getKycStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'text-success-600 bg-success-50';
      case 'Pending': return 'text-warning-600 bg-warning-50';
      case 'Rejected': return 'text-error-600 bg-error-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Enterprise': return 'text-primary-600 bg-primary-50';
      case 'Premium': return 'text-accent-600 bg-accent-50';
      case 'Basic': return 'text-secondary-600 bg-secondary-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employer Management</h1>
          <p className="text-gray-600 mt-1">Manage individual and corporate employers with tier-based KYC verification</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Employer
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Building2 className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Employers</p>
              <p className="text-2xl font-bold text-gray-900">{employers.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <Shield className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Verified KYC</p>
              <p className="text-2xl font-bold text-gray-900">
                {employers.filter(e => e.kycStatus === 'Verified').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent-50 rounded-lg">
              <Users className="w-6 h-6 text-accent-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Corporate</p>
              <p className="text-2xl font-bold text-gray-900">
                {employers.filter(e => e.type === 'Corporate').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-50 rounded-lg">
              <Star className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Trust Score</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(employers.reduce((acc, e) => acc + e.trustScore, 0) / employers.length)}
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
                placeholder="Search employers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Types</option>
              <option value="Individual">Individual</option>
              <option value="Corporate">Corporate</option>
            </select>
            <select
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Tiers</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employers Table */}
      <div className="bg-white rounded-lg shadow-soft border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type & Tier
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  KYC Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trust Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredEmployers.map((employer) => (
                <tr key={employer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employer.name}</div>
                      <div className="text-sm text-gray-500">Joined {employer.joinDate}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-900">{employer.type}</span>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTierColor(employer.tier)}`}>
                        {employer.tier}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getKycStatusColor(employer.kycStatus)}`}>
                      {employer.kycStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employer.employeeCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${employer.trustScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{employer.trustScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employer.status)}`}>
                      {employer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button className="text-primary-600 hover:text-primary-900">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-accent-600 hover:text-accent-900">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="text-error-600 hover:text-error-900">
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
  );
}