import React, { useState } from 'react';
import { Activity, Database, AlertTriangle, TrendingUp, Eye, RefreshCw, Download, Server } from 'lucide-react';

interface DataMetric {
  id: string;
  name: string;
  category: 'Performance' | 'Security' | 'Compliance' | 'Usage';
  value: number;
  unit: string;
  threshold: number;
  status: 'Normal' | 'Warning' | 'Critical';
  trend: 'up' | 'down' | 'stable';
  lastUpdated: string;
}

const mockDataMetrics: DataMetric[] = [
  {
    id: '1',
    name: 'Database Response Time',
    category: 'Performance',
    value: 45,
    unit: 'ms',
    threshold: 100,
    status: 'Normal',
    trend: 'stable',
    lastUpdated: '2024-12-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Failed Login Attempts',
    category: 'Security',
    value: 25,
    unit: 'attempts/hour',
    threshold: 20,
    status: 'Warning',
    trend: 'up',
    lastUpdated: '2024-12-15T10:25:00Z'
  },
  {
    id: '3',
    name: 'Data Processing Volume',
    category: 'Usage',
    value: 1250,
    unit: 'GB/day',
    threshold: 2000,
    status: 'Normal',
    trend: 'up',
    lastUpdated: '2024-12-15T10:20:00Z'
  },
  {
    id: '4',
    name: 'Compliance Violations',
    category: 'Compliance',
    value: 3,
    unit: 'violations',
    threshold: 0,
    status: 'Critical',
    trend: 'up',
    lastUpdated: '2024-12-15T10:15:00Z'
  }
];

export default function DataMonitoringManagement() {
  const [dataMetrics, setDataMetrics] = useState<DataMetric[]>(mockDataMetrics);
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Performance' | 'Security' | 'Compliance' | 'Usage'>('All');

  const filteredMetrics = dataMetrics.filter(metric => 
    selectedCategory === 'All' || metric.category === selectedCategory
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Normal': return 'text-success-600 bg-success-50';
      case 'Warning': return 'text-warning-600 bg-warning-50';
      case 'Critical': return 'text-error-600 bg-error-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-success-600" />;
      case 'down': return <TrendingUp className="w-4 h-4 text-error-600 rotate-180" />;
      case 'stable': return <div className="w-4 h-0.5 bg-gray-400"></div>;
      default: return null;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Performance': return <Activity className="w-5 h-5" />;
      case 'Security': return <AlertTriangle className="w-5 h-5" />;
      case 'Compliance': return <Database className="w-5 h-5" />;
      case 'Usage': return <Server className="w-5 h-5" />;
      default: return <Activity className="w-5 h-5" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Data Monitoring Management System</h1>
          <p className="text-gray-600 mt-1">Real-time monitoring and analytics for system performance and compliance</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh Data
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
              <Activity className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Normal Status</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataMetrics.filter(m => m.status === 'Normal').length}
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
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataMetrics.filter(m => m.status === 'Warning').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-error-50 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-error-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Critical Issues</p>
              <p className="text-2xl font-bold text-gray-900">
                {dataMetrics.filter(m => m.status === 'Critical').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <Database className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Metrics</p>
              <p className="text-2xl font-bold text-gray-900">{dataMetrics.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white p-6 rounded-lg shadow-soft border">
        <div className="flex flex-wrap gap-2">
          {['All', 'Performance', 'Security', 'Compliance', 'Usage'].map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMetrics.map((metric) => (
          <div key={metric.id} className="bg-white p-6 rounded-lg shadow-soft border">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  metric.category === 'Performance' ? 'bg-primary-50' :
                  metric.category === 'Security' ? 'bg-warning-50' :
                  metric.category === 'Compliance' ? 'bg-secondary-50' :
                  'bg-accent-50'
                }`}>
                  <div className={
                    metric.category === 'Performance' ? 'text-primary-600' :
                    metric.category === 'Security' ? 'text-warning-600' :
                    metric.category === 'Compliance' ? 'text-secondary-600' :
                    'text-accent-600'
                  }>
                    {getCategoryIcon(metric.category)}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900">{metric.name}</h3>
                  <p className="text-xs text-gray-500">{metric.category}</p>
                </div>
              </div>
              <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {metric.value.toLocaleString()}
                </span>
                <div className="flex items-center gap-1">
                  {getTrendIcon(metric.trend)}
                  <span className="text-xs text-gray-500">{metric.unit}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Threshold: {metric.threshold.toLocaleString()} {metric.unit}</span>
                  <span>{Math.round((metric.value / metric.threshold) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === 'Normal' ? 'bg-success-600' :
                      metric.status === 'Warning' ? 'bg-warning-600' :
                      'bg-error-600'
                    }`}
                    style={{ width: `${Math.min((metric.value / metric.threshold) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Last updated: {new Date(metric.lastUpdated).toLocaleTimeString()}</span>
                <div className="flex gap-2">
                  <button className="text-primary-600 hover:text-primary-900">
                    <Eye className="w-3 h-3" />
                  </button>
                  <button className="text-secondary-600 hover:text-secondary-900">
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Chart Placeholder */}
      <div className="bg-white p-6 rounded-lg shadow-soft border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Real-time Performance Dashboard</h3>
          <div className="flex gap-2">
            <button className="text-primary-600 hover:text-primary-900 text-sm">
              Last 1h
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              Last 24h
            </button>
            <button className="text-gray-500 hover:text-gray-700 text-sm">
              Last 7d
            </button>
          </div>
        </div>
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <Activity className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Real-time monitoring charts will be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  );
}