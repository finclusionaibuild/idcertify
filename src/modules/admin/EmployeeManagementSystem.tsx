import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Eye, Edit, Trash2, UserCheck, AlertCircle } from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  employerId: string;
  employerName: string;
  position: string;
  department: string;
  verificationStatus: 'Verified' | 'Pending' | 'Rejected';
  trustScore: number;
  joinDate: string;
  status: 'Active' | 'Suspended' | 'Inactive';
  lastActivity: string;
}

const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice.johnson@techcorp.com',
    employerId: '1',
    employerName: 'TechCorp Solutions',
    position: 'Senior Developer',
    department: 'Engineering',
    verificationStatus: 'Verified',
    trustScore: 92,
    joinDate: '2024-01-20',
    status: 'Active',
    lastActivity: '2024-12-15'
  },
  {
    id: '2',
    name: 'Bob Smith',
    email: 'bob.smith@techcorp.com',
    employerId: '1',
    employerName: 'TechCorp Solutions',
    position: 'Product Manager',
    department: 'Product',
    verificationStatus: 'Pending',
    trustScore: 78,
    joinDate: '2024-02-15',
    status: 'Active',
    lastActivity: '2024-12-14'
  },
  {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@johnsmith.com',
    employerId: '2',
    employerName: 'John Smith Consulting',
    position: 'Consultant',
    department: 'Consulting',
    verificationStatus: 'Verified',
    trustScore: 85,
    joinDate: '2024-03-01',
    status: 'Active',
    lastActivity: '2024-12-13'
  }
];

export default function EmployeeManagementSystem() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Active' | 'Suspended' | 'Inactive'>('All');
  const [filterVerification, setFilterVerification] = useState<'All' | 'Verified' | 'Pending' | 'Rejected'>('All');

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.employerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || employee.status === filterStatus;
    const matchesVerification = filterVerification === 'All' || employee.verificationStatus === filterVerification;
    return matchesSearch && matchesStatus && matchesVerification;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-success-600 bg-success-50';
      case 'Suspended': return 'text-warning-600 bg-warning-50';
      case 'Inactive': return 'text-error-600 bg-error-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getVerificationStatusColor = (status: string) => {
    switch (status) {
      case 'Verified': return 'text-success-600 bg-success-50';
      case 'Pending': return 'text-warning-600 bg-warning-50';
      case 'Rejected': return 'text-error-600 bg-error-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management System</h1>
          <p className="text-gray-600 mt-1">Manage all employees across different employers and organizations</p>
        </div>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Users className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employees.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <UserCheck className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.filter(e => e.verificationStatus === 'Verified').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending Verification</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.filter(e => e.verificationStatus === 'Pending').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-50 rounded-lg">
              <Users className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {employees.filter(e => e.status === 'Active').length}
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
                placeholder="Search employees..."
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
              <option value="Suspended">Suspended</option>
              <option value="Inactive">Inactive</option>
            </select>
            <select
              value={filterVerification}
              onChange={(e) => setFilterVerification(e.target.value as any)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="All">All Verification</option>
              <option value="Verified">Verified</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <div className="bg-white rounded-lg shadow-soft border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Employer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
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
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                      <div className="text-sm text-gray-500">{employee.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{employee.employerName}</div>
                    <div className="text-sm text-gray-500">{employee.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {employee.position}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getVerificationStatusColor(employee.verificationStatus)}`}>
                      {employee.verificationStatus}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${employee.trustScore}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{employee.trustScore}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(employee.status)}`}>
                      {employee.status}
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