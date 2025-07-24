import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Box,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import UsersIcon from '@mui/icons-material/People';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import DollarSignIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AlertCircleIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MailIcon from '@mui/icons-material/Mail';

interface Subscription {
  id: string
  name: string
  description: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  features: string[]
  isActive: boolean
  userCount: number
  revenue: number
}

interface FeeStructure {
  id: string
  name: string
  description: string
  feeType: 'percentage' | 'fixed'
  amount: number
  applicableTo: string[]
  isActive: boolean
}

const SubscriptionManagement = () => {
  const [activeTab, setActiveTab] = useState<'subscriptions' | 'fees' | 'analytics'>('subscriptions')
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddSubscriptionModal, setShowAddSubscriptionModal] = useState(false)
  const [showAddFeeModal, setShowAddFeeModal] = useState(false)
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null)
  const [selectedFee, setSelectedFee] = useState<FeeStructure | null>(null)
  const [loading, setLoading] = useState(false)

  // Mock subscription plans
  const subscriptionPlans: Subscription[] = [
    {
      id: '1',
      name: 'Basic',
      description: 'Essential features for small businesses',
      price: 5000,
      billingCycle: 'monthly',
      features: [
        '100 verifications/month',
        '5,000 API calls/month',
        '2 GB document storage',
        '3 staff accounts',
        'Email support'
      ],
      isActive: true,
      userCount: 245,
      revenue: 1225000
    },
    {
      id: '2',
      name: 'Professional',
      description: 'Advanced features for growing businesses',
      price: 15000,
      billingCycle: 'monthly',
      features: [
        '500 verifications/month',
        '20,000 API calls/month',
        '10 GB document storage',
        '10 staff accounts',
        'Priority support',
        'Advanced analytics'
      ],
      isActive: true,
      userCount: 156,
      revenue: 2340000
    },
    {
      id: '3',
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      price: 50000,
      billingCycle: 'monthly',
      features: [
        'Unlimited verifications',
        'Unlimited API calls',
        '50 GB document storage',
        'Unlimited staff accounts',
        'Dedicated support',
        'Custom integrations',
        'SLA guarantees'
      ],
      isActive: true,
      userCount: 32,
      revenue: 1600000
    },
    {
      id: '4',
      name: 'Legacy Basic',
      description: 'Previous version of Basic plan',
      price: 3500,
      billingCycle: 'monthly',
      features: [
        '50 verifications/month',
        '2,000 API calls/month',
        '1 GB document storage',
        '2 staff accounts',
        'Email support'
      ],
      isActive: false,
      userCount: 12,
      revenue: 42000
    }
  ]

  // Mock fee structures
  const feeStructures: FeeStructure[] = [
    {
      id: '1',
      name: 'Standard Transaction Fee',
      description: 'Fee applied to all standard transactions',
      feeType: 'percentage',
      amount: 2.5,
      applicableTo: ['All Plans'],
      isActive: true
    },
    {
      id: '2',
      name: 'Premium Verification Fee',
      description: 'Additional fee for premium verification services',
      feeType: 'fixed',
      amount: 500,
      applicableTo: ['Basic', 'Professional'],
      isActive: true
    },
    {
      id: '3',
      name: 'International Processing Fee',
      description: 'Fee for processing international verifications',
      feeType: 'percentage',
      amount: 1.5,
      applicableTo: ['All Plans'],
      isActive: true
    },
    {
      id: '4',
      name: 'Express Processing Fee',
      description: 'Fee for expedited verification processing',
      feeType: 'fixed',
      amount: 1000,
      applicableTo: ['Basic', 'Professional', 'Enterprise'],
      isActive: true
    }
  ]

  // Filter subscriptions based on search query
  const filteredSubscriptions = subscriptionPlans.filter(sub => 
    sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    sub.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Filter fees based on search query
  const filteredFees = feeStructures.filter(fee => 
    fee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    fee.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`
  }

  const handleAddSubscription = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowAddSubscriptionModal(false)
    }, 1000)
  }

  const handleAddFee = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      setShowAddFeeModal(false)
    }, 1000)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Subscription & Fee Management</h1>
          <p className="text-gray-600 mt-1">Manage subscription plans, pricing, and fee structures</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </button>
          {activeTab === 'subscriptions' && (
            <button 
              onClick={() => setShowAddSubscriptionModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Subscription
            </button>
          )}
          {activeTab === 'fees' && (
            <button 
              onClick={() => setShowAddFeeModal(true)}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Fee
            </button>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            title: 'Total Subscribers',
            value: subscriptionPlans.reduce((sum, plan) => sum + plan.userCount, 0),
            icon: Users,
            color: 'bg-blue-500',
            description: 'Across all plans'
          },
          {
            title: 'Monthly Revenue',
            value: formatCurrency(subscriptionPlans.reduce((sum, plan) => sum + plan.revenue, 0)),
            icon: DollarSign,
            color: 'bg-green-500',
            description: 'From subscriptions'
          },
          {
            title: 'Active Plans',
            value: subscriptionPlans.filter(plan => plan.isActive).length,
            icon: CheckCircle,
            color: 'bg-purple-500',
            description: 'Available plans'
          },
          {
            title: 'Fee Structures',
            value: feeStructures.length,
            icon: Settings,
            color: 'bg-orange-500',
            description: 'Active fee types'
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
            onClick={() => setActiveTab('subscriptions')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'subscriptions'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Subscription Plans</span>
          </button>
          <button
            onClick={() => setActiveTab('fees')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'fees'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Fee Structures</span>
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'analytics'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Revenue Analytics</span>
          </button>
        </nav>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder={`Search ${activeTab === 'subscriptions' ? 'subscription plans' : 'fee structures'}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          
          <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>
      </div>

      {/* Subscription Plans */}
      {activeTab === 'subscriptions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Billing Cycle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribers
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Monthly Revenue
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubscriptions.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{plan.name}</div>
                          <div className="text-sm text-gray-500">{plan.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(plan.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {plan.billingCycle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        plan.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {plan.userCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(plan.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => setSelectedSubscription(plan)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
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
      )}

      {/* Fee Structures */}
      {activeTab === 'fees' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fee Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Applicable To
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFees.map((fee) => (
                  <tr key={fee.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-yellow-100 rounded-full flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-yellow-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{fee.name}</div>
                          <div className="text-sm text-gray-500">{fee.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 capitalize">
                      {fee.feeType}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {fee.feeType === 'percentage' ? `${fee.amount}%` : formatCurrency(fee.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {fee.applicableTo.map((plan, index) => (
                          <span key={index} className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {plan}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        fee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {fee.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => setSelectedFee(fee)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
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
      )}

      {/* Revenue Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Revenue Overview */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Revenue Overview</h3>
              <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>Year to Date</option>
              </select>
            </div>
            
            <div className="h-64 flex items-end justify-between space-x-2">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                <div key={month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-primary-500 rounded-t transition-all duration-500 hover:bg-primary-600"
                    style={{ height: `${Math.floor(Math.random() * 60) + 20}%` }}
                    title={`${month}`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{month}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Total Revenue</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(5207000)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Average Monthly</p>
                <p className="text-xl font-bold text-gray-900">{formatCurrency(867833)}</p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Growth Rate</p>
                <div className="flex items-center text-green-600">
                  <ArrowUp className="w-4 h-4 mr-1" />
                  <p className="text-xl font-bold">+12.8%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Distribution */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Subscription Plan Distribution</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Subscribers by Plan */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Subscribers by Plan</h4>
                <div className="space-y-4">
                  {subscriptionPlans.filter(plan => plan.isActive).map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                        <span className="text-sm font-medium text-gray-700">{plan.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                          <div 
                            className="h-2 rounded-full bg-primary-500"
                            style={{ width: `${(plan.userCount / subscriptionPlans.reduce((sum, p) => sum + p.userCount, 0)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{plan.userCount}</p>
                        <p className="text-xs text-gray-500">
                          {Math.round((plan.userCount / subscriptionPlans.reduce((sum, p) => sum + p.userCount, 0)) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Revenue by Plan */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">Revenue by Plan</h4>
                <div className="space-y-4">
                  {subscriptionPlans.filter(plan => plan.isActive).map((plan) => (
                    <div key={plan.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        <span className="text-sm font-medium text-gray-700">{plan.name}</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2 mx-4">
                          <div 
                            className="h-2 rounded-full bg-green-500"
                            style={{ width: `${(plan.revenue / subscriptionPlans.reduce((sum, p) => sum + p.revenue, 0)) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-gray-900">{formatCurrency(plan.revenue)}</p>
                        <p className="text-xs text-gray-500">
                          {Math.round((plan.revenue / subscriptionPlans.reduce((sum, p) => sum + p.revenue, 0)) * 100)}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Subscription Modal */}
      {showAddSubscriptionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Subscription Plan</h2>
                <button 
                  onClick={() => setShowAddSubscriptionModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Premium Plan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₦) *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 10000"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Billing Cycle *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter plan description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Features (one per line)
                </label>
                <textarea
                  rows={5}
                  placeholder="e.g., 100 verifications/month"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddSubscriptionModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddSubscription}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add Subscription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Fee Modal */}
      {showAddFeeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add New Fee Structure</h2>
                <button 
                  onClick={() => setShowAddFeeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fee Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Processing Fee"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fee Type *
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount *
                  </label>
                  <input
                    type="number"
                    placeholder="e.g., 2.5 or 500"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter fee description"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Applicable To
                </label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">All Plans</span>
                  </label>
                  {subscriptionPlans.filter(plan => plan.isActive).map((plan) => (
                    <label key={plan.id} className="flex items-center">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{plan.name}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddFeeModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddFee}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add Fee
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SubscriptionManagement