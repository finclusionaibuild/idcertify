import React, { useState } from 'react'
import { 
  Wallet, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Download, 
  Filter, 
  Search, 
  RefreshCw, 
  BarChart3, 
  DollarSign, 
  CreditCard, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  User,
  Building,
  Calendar,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Plus,
  Settings
} from 'lucide-react'

const AdminWalletManagement = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'settings'>('overview')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days')

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Wallet Management</h1>
          <p className="text-gray-600 mt-1">Manage user wallets, transactions, and payment settings</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <Settings className="w-4 h-4 mr-2" />
            Configure Settings
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Balance',
            value: '₦15,420,500',
            icon: Wallet,
            color: 'bg-blue-500',
            description: 'All user wallets'
          },
          {
            title: 'Active Wallets',
            value: '1,247',
            icon: Users,
            color: 'bg-green-500',
            description: 'With transactions'
          },
          {
            title: 'Monthly Volume',
            value: '₦3,245,800',
            icon: BarChart3,
            color: 'bg-purple-500',
            description: 'Last 30 days'
          },
          {
            title: 'Pending Transactions',
            value: '24',
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting processing'
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
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Overview</span>
          </button>
          <button
            onClick={() => setActiveTab('transactions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'transactions'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Transactions</span>
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'settings'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Wallet Overview</h3>
          
          <div className="space-y-6">
            <p className="text-gray-600">
              This is the wallet management dashboard. Here you can monitor and manage all user wallets, 
              transactions, and payment settings across the platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Recent Activity</h4>
                <div className="space-y-3">
                  {[
                    { type: 'credit', user: 'John Doe', amount: '₦5,000', time: '2 hours ago' },
                    { type: 'debit', user: 'TechCorp Solutions', amount: '₦12,500', time: '5 hours ago' },
                    { type: 'credit', user: 'Jane Smith', amount: '₦8,750', time: '1 day ago' }
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        {activity.type === 'credit' ? (
                          <ArrowDownRight className="w-5 h-5 text-green-500 mr-3" />
                        ) : (
                          <ArrowUpRight className="w-5 h-5 text-red-500 mr-3" />
                        )}
                        <div>
                          <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`font-medium ${
                        activity.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {activity.type === 'credit' ? '+' : '-'}{activity.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Wallet Distribution</h4>
                <div className="space-y-3">
                  {[
                    { type: 'Individual', count: 876, percentage: 70.2, color: 'bg-blue-500' },
                    { type: 'Organization', count: 371, percentage: 29.8, color: 'bg-green-500' }
                  ].map((segment, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{segment.type}</span>
                        <span className="text-sm font-medium text-gray-900">{segment.count} wallets</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`${segment.color} h-2 rounded-full`}
                          style={{ width: `${segment.percentage}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 text-right">{segment.percentage}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
                />
              </div>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="all">All time</option>
              </select>
              <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Transaction ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 'TXN-001234', user: 'John Doe', type: 'credit', amount: '₦5,000', status: 'completed', date: '2024-01-20' },
                  { id: 'TXN-001235', user: 'TechCorp Solutions', type: 'debit', amount: '₦12,500', status: 'completed', date: '2024-01-20' },
                  { id: 'TXN-001236', user: 'Jane Smith', type: 'credit', amount: '₦8,750', status: 'pending', date: '2024-01-19' },
                  { id: 'TXN-001237', user: 'Global Finance Ltd', type: 'debit', amount: '₦20,000', status: 'failed', date: '2024-01-19' },
                  { id: 'TXN-001238', user: 'Michael Johnson', type: 'credit', amount: '₦15,000', status: 'completed', date: '2024-01-18' }
                ].map((transaction, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {transaction.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{transaction.user}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'credit' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}>
                        {transaction.type === 'credit' ? '+' : '-'}{transaction.amount}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Wallet Settings</h3>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Default Transaction Fee (%)
                </label>
                <input
                  type="number"
                  defaultValue={2.5}
                  min={0}
                  max={100}
                  step={0.1}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Minimum Withdrawal Amount
                </label>
                <input
                  type="number"
                  defaultValue={1000}
                  min={0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Daily Withdrawal
                </label>
                <input
                  type="number"
                  defaultValue={100000}
                  min={0}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Transaction Timeout (minutes)
                </label>
                <input
                  type="number"
                  defaultValue={30}
                  min={1}
                  max={1440}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Enable Wallet System</p>
                  <p className="text-sm text-gray-600">Allow users to use the wallet feature</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Auto-approve Withdrawals</p>
                  <p className="text-sm text-gray-600">Automatically approve withdrawal requests under threshold</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked={false} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Enable Transaction Notifications</p>
                  <p className="text-sm text-gray-600">Send notifications for wallet transactions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Reset to Defaults
              </button>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminWalletManagement