import React, { useState } from 'react';
import { Building, Users, MapPin, Phone, Mail, Globe, Search, Filter, Plus, Eye, Edit, Trash2 } from 'lucide-react';

interface Company {
  id: string;
  name: string;
  industry: string;
  size: 'Startup' | 'Small' | 'Medium' | 'Large' | 'Enterprise';
  location: string;
  website: string;
  email: string;
  phone: string;
  employeeCount: number;
  status: 'Active' | 'Inactive' | 'Suspended';
  registrationDate: string;
  lastActivity: string;
  complianceScore: number;
}

const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'TechCorp Solutions',
    industry: 'Technology',
    size: 'Large',
    location: 'San Francisco, CA',
    website: 'https://techcorp.com',
    email: 'contact@techcorp.com',
    phone: '+1 (555) 123-4567',
    employeeCount: 250,
    status: 'Active',
    registrationDate: '2024-01-15',
    lastActivity: '2024-12-15',
    complianceScore: 95
  },
  {
    id: '2',
    name: 'Global Industries Ltd',
    industry: 'Manufacturing',
    size: 'Enterprise',
    location: 'New York, NY',
    website: 'https://globalind.com',
    email: 'info@globalind.com',
    phone: '+1 (555) 987-6543',
    employeeCount: 1200,
    status: 'Active',
    registrationDate: '2024-02-20',
    lastActivity: '2024-12-14',
    complianceScore: 88
  },
  {
    id: '3',
    name: 'StartupX Inc',
    industry: 'Fintech',
    size: 'Startup',
    location: 'Austin, TX',
    website: 'https://startupx.io',
    email: 'hello@startupx.io',
    phone: '+1 (555) 456-7890',
    employeeCount: 15,
    status: 'Inactive',
    registrationDate: '2024-03-10',
    lastActivity: '2024-11-20',
    complianceScore: 72
  }
];

export default function CompanyManagement() {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Inactive' | 'Suspended'>('All');
  const [filterSize, setFilterSize] = useState<'All' | 'Startup' | 'Small' | 'Medium' | 'Large' | 'Enterprise'>('All');

  const filteredCompanies = companies.filter(company => {
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.industry.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || company.status === filterStatus;
    const matchesSize = filterSize === 'All' || company.size === filterSize;
    return matchesSearch && matchesStatus && matchesSize;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-success-600 bg-success-50';
      case 'Inactive': return 'text-gray-600 bg-gray-50';
      case 'Suspended': return 'text-error-600 bg-error-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getSizeColor = (size: string) => {
    switch (size) {
      case 'Startup': return 'text-accent-600 bg-accent-50';
      case 'Small': return 'text-secondary-600 bg-secondary-50';
      case 'Medium': return 'text-primary-600 bg-primary-50';
      case 'Large': return 'text-warning-600 bg-warning-50';
      case 'Enterprise': return 'text-error-600 bg-error-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Management</h1>
          <p className="text-gray-600 mt-1">Manage and monitor all registered companies and organizations</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Company
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Building className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Companies</p>
              <p className="text-2xl font-bold text-gray-900">{companies.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <Building className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {companies.filter(c => c.status === 'Active').length}
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
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">
                {companies.reduce((acc, c) => acc + c.employeeCount, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-50 rounded-lg">
              <Building className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Avg Compliance</p>
              <p className="text-2xl font-bold text-gray-900">
                {Math.round(companies.reduce((acc, c) => acc + c.complianceScore, 0) / companies.length)}%
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
                placeholder="Search companies..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
            </select>
            <select
              value={filterSize}
              onChange={(e) => setFilterSize(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Sizes</option>
              <option value="Startup">Startup</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
        </div>
      </div>

      {/* Companies Table */}
      <div className="bg-white rounded-lg shadow-soft border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Industry & Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Compliance
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
              {filteredCompanies.map((company) => (
                <tr key={company.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{company.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {company.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{company.industry}</div>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getSizeColor(company.size)}`}>
                      {company.size}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {company.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {company.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {company.employeeCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${company.complianceScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{company.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(company.status)}`}>
                      {company.status}
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