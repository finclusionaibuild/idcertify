import React, { useState } from 'react'
import { 
  CreditCard, 
  Download, 
  Plus, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Calendar,
  Building,
  User,
  Shield,
  Users,
  FileText,
  BarChart3,
  Key,
  ExternalLink,
  RefreshCw,
  Zap,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  Info,
  X,
  Save,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Star,
  Award,
  Target,
  TrendingUp,
  Settings
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

interface SubscriptionPlan {
  id: string
  name: string
  price: number
  billingCycle: 'monthly' | 'yearly'
  features: string[]
  isPopular?: boolean
  isCurrent?: boolean
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'failed'
  downloadUrl: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'bank'
  name: string
  details: string
  expiryDate?: string
  isDefault: boolean
}

const Billing = () => {
  const { profile } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'plans' | 'invoices' | 'payment'>('overview')
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false)
  const [showChangePlanModal, setShowChangePlanModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')
  const [loading, setLoading] = useState(false)

  // Mock subscription data
  const [subscriptionData, setSubscriptionData] = useState({
    currentPlan: 'business',
    status: 'active',
    nextBillingDate: '2024-02-20',
    billingCycle: 'monthly' as 'monthly' | 'yearly',
    autoRenew: true,
    currentPeriodStart: '2024-01-20',
    currentPeriodEnd: '2024-02-20',
    usageStats: {
      verifications: {
        used: 156,
        limit: 500,
        percentage: 31.2
      },
      apiCalls: {
        used: 2847,
        limit: 10000,
        percentage: 28.47
      },
      storage: {
        used: 2.4,
        limit: 10,
        percentage: 24
      },
      staff: {
        used: 5,
        limit: 10,
        percentage: 50
      }
    }
  })

  // Mock subscription plans
  const subscriptionPlans: SubscriptionPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: billingCycle === 'monthly' ? 5000 : 50000,
      billingCycle,
      features: [
        '100 verifications/month',
        '5,000 API calls/month',
        '2 GB document storage',
        '3 staff accounts',
        'Email support'
      ]
    },
    {
      id: 'business',
      name: 'Business',
      price: billingCycle === 'monthly' ? 25000 : 250000,
      billingCycle,
      features: [
        '500 verifications/month',
        '10,000 API calls/month',
        '10 GB document storage',
        '10 staff accounts',
        'Priority support',
        'Advanced analytics',
        'Custom integrations'
      ],
      isPopular: true,
      isCurrent: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: billingCycle === 'monthly' ? 100000 : 1000000,
      billingCycle,
      features: [
        'Unlimited verifications',
        'Unlimited API calls',
        '50 GB document storage',
        'Unlimited staff accounts',
        'Dedicated support',
        'Advanced analytics',
        'Custom integrations',
        'SLA guarantees',
        'Custom branding'
      ]
    }
  ]

  // Mock invoices
  const invoices: Invoice[] = [
    {
      id: 'INV-001',
      date: '2024-01-20',
      amount: 25000,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-002',
      date: '2023-12-20',
      amount: 25000,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-003',
      date: '2023-11-20',
      amount: 25000,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-004',
      date: '2023-10-20',
      amount: 25000,
      status: 'paid',
      downloadUrl: '#'
    },
    {
      id: 'INV-005',
      date: '2023-09-20',
      amount: 25000,
      status: 'paid',
      downloadUrl: '#'
    }
  ]

  // Mock payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'card',
      name: 'Visa ending in 4242',
      details: '**** **** **** 4242',
      expiryDate: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'bank',
      name: 'GTBank Account',
      details: 'Account ending in 5678',
      isDefault: false
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'paid':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleChangePlan = async () => {
    if (!selectedPlan) return
    
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Update subscription data
      setSubscriptionData(prev => ({
        ...prev,
        currentPlan: selectedPlan
      }))
      
      setShowChangePlanModal(false)
      setSelectedPlan(null)
    } catch (error) {
      console.error('Error changing plan:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddPaymentMethod = async () => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      setShowAddPaymentModal(false)
    } catch (error) {
      console.error('Error adding payment method:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleAutoRenew = async () => {
    setLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update subscription data
      setSubscriptionData(prev => ({
        ...prev,
        autoRenew: !prev.autoRenew
      }))
    } catch (error) {
      console.error('Error toggling auto-renew:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Billing & Subscription</h1>
          <p className="text-gray-600 mt-1">Manage your subscription, payment methods, and billing history</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Download Invoices
          </button>
          <button 
            onClick={() => {
              setSelectedPlan(subscriptionData.currentPlan)
              setShowChangePlanModal(true)
            }}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Zap className="w-4 h-4 mr-2" />
            Upgrade Plan
          </button>
        </div>
      </div>

      {/* Subscription Summary */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center space-x-3 mb-2">
              <h2 className="text-lg font-semibold text-gray-900">Current Subscription</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(subscriptionData.status)}`}>
                {subscriptionData.status.charAt(0).toUpperCase() + subscriptionData.status.slice(1)}
              </span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Plan: <span className="font-medium text-gray-900">Business</span></span>
              <span>Billing: <span className="font-medium text-gray-900">Monthly</span></span>
              <span>Next payment: <span className="font-medium text-gray-900">{new Date(subscriptionData.nextBillingDate).toLocaleDateString()}</span></span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-600">Monthly fee</p>
              <p className="text-2xl font-bold text-gray-900">₦25,000</p>
            </div>
            
            <div className="flex items-center">
              <span className="mr-3 text-sm text-gray-600">Auto-renew</span>
              <button
                onClick={handleToggleAutoRenew}
                disabled={loading}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 ${
                  subscriptionData.autoRenew ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    subscriptionData.autoRenew ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'plans', label: 'Subscription Plans', icon: Target },
            { id: 'invoices', label: 'Invoices & History', icon: FileText },
            { id: 'payment', label: 'Payment Methods', icon: CreditCard }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Usage Stats */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Usage Statistics</h3>
              
              <div className="space-y-6">
                {Object.entries(subscriptionData.usageStats).map(([key, stat]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 capitalize">{key}</p>
                      <p className="text-sm text-gray-600">
                        {key === 'storage' 
                          ? `${stat.used} GB of ${stat.limit} GB` 
                          : `${stat.used.toLocaleString()} of ${stat.limit.toLocaleString()}`}
                      </p>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          stat.percentage > 90 ? 'bg-red-500' :
                          stat.percentage > 75 ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}
                        style={{ width: `${stat.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 text-right">{stat.percentage}% used</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Invoices */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Invoices</h3>
                <button 
                  onClick={() => setActiveTab('invoices')}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View All →
                </button>
              </div>
              
              <div className="space-y-4">
                {invoices.slice(0, 3).map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{invoice.id}</p>
                      <p className="text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="font-medium text-gray-900">{formatCurrency(invoice.amount)}</p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                      <button className="text-primary-600 hover:text-primary-700">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Plan */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Current Plan</h3>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Active
                </span>
              </div>
              
              <div className="mb-4">
                <h4 className="text-xl font-bold text-gray-900">Business</h4>
                <p className="text-primary-600 font-bold">₦25,000/month</p>
              </div>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">500 verifications/month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">10,000 API calls/month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">10 GB document storage</span>
                </div>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedPlan(subscriptionData.currentPlan)
                  setShowChangePlanModal(true)
                }}
                className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
              >
                Change Plan
              </button>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Payment Method</h3>
                <button 
                  onClick={() => setActiveTab('payment')}
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Manage →
                </button>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <CreditCard className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-900">Visa ending in 4242</p>
                  <p className="text-xs text-gray-500">Expires 12/25</p>
                </div>
                <span className="ml-auto bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Default
                </span>
              </div>
            </div>

            {/* Billing Contact */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Billing Contact</h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">Finance Department</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">finance@techcorp.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Building className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-900">TechCorp Solutions</span>
                </div>
              </div>
              
              <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
                Edit Contact Info
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'plans' && (
        <div className="space-y-6">
          {/* Billing Cycle Selector */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg inline-flex">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Yearly (Save 17%)
              </button>
            </div>
          </div>

          {/* Plans Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <div 
                key={plan.id} 
                className={`bg-white rounded-2xl shadow-sm p-6 border-2 transition-all ${
                  plan.isCurrent
                    ? 'border-primary-500 ring-2 ring-primary-200'
                    : plan.isPopular
                    ? 'border-blue-200 hover:border-blue-300'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.isPopular && (
                  <div className="bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-2">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-gray-900">{formatCurrency(plan.price)}</span>
                  <span className="text-gray-600">/{plan.billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {plan.isCurrent ? (
                  <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg font-medium cursor-default">
                    Current Plan
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      setSelectedPlan(plan.id)
                      setShowChangePlanModal(true)
                    }}
                    className="w-full bg-primary-600 text-white py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors"
                  >
                    {plan.id === 'enterprise' ? 'Contact Sales' : 'Select Plan'}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Feature Comparison */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Feature Comparison</h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Feature
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Starter
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider bg-blue-50">
                      Business
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { feature: 'Verifications per month', starter: '100', business: '500', enterprise: 'Unlimited' },
                    { feature: 'API calls per month', starter: '5,000', business: '10,000', enterprise: 'Unlimited' },
                    { feature: 'Document storage', starter: '2 GB', business: '10 GB', enterprise: '50 GB' },
                    { feature: 'Staff accounts', starter: '3', business: '10', enterprise: 'Unlimited' },
                    { feature: 'Support', starter: 'Email', business: 'Priority', enterprise: 'Dedicated' },
                    { feature: 'Advanced analytics', starter: '✖', business: '✓', enterprise: '✓' },
                    { feature: 'Custom integrations', starter: '✖', business: '✓', enterprise: '✓' },
                    { feature: 'SLA guarantees', starter: '✖', business: '✖', enterprise: '✓' },
                    { feature: 'Custom branding', starter: '✖', business: '✖', enterprise: '✓' }
                  ].map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {row.feature}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {row.starter}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-center font-medium bg-blue-50">
                        {row.business}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                        {row.enterprise}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enterprise CTA */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Need a custom solution?</h3>
                  <p className="text-gray-600 text-sm">Contact our sales team for a tailored enterprise plan</p>
                </div>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'invoices' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Invoices & Billing History</h3>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Time</option>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export All
                </button>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
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
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {invoice.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(invoice.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatCurrency(invoice.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(invoice.status)}`}>
                        {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button className="text-primary-600 hover:text-primary-900">
                          View
                        </button>
                        <a 
                          href={invoice.downloadUrl} 
                          className="text-primary-600 hover:text-primary-900 flex items-center"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {invoices.length} of {invoices.length} invoices
              </p>
              <div className="flex items-center space-x-2">
                <button className="border border-gray-300 rounded-lg p-2 text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="border border-gray-300 rounded-lg p-2 text-gray-600 hover:bg-gray-50">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'payment' && (
        <div className="space-y-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
              <button 
                onClick={() => setShowAddPaymentModal(true)}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </button>
            </div>
            
            <div className="space-y-4">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      {method.type === 'card' ? (
                        <CreditCard className="w-5 h-5 text-gray-600" />
                      ) : (
                        <Building className="w-5 h-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{method.name}</p>
                      {method.expiryDate && (
                        <p className="text-xs text-gray-500">Expires {method.expiryDate}</p>
                      )}
                    </div>
                    {method.isDefault && (
                      <span className="ml-3 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    {!method.isDefault && (
                      <button className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                        Set as Default
                      </button>
                    )}
                    <button className="text-gray-600 hover:text-gray-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Address */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Billing Address</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
            </div>
            
            <div className="space-y-2 text-gray-700">
              <p>TechCorp Solutions</p>
              <p>123 Business District</p>
              <p>Lagos, Lagos State 100001</p>
              <p>Nigeria</p>
            </div>
          </div>

          {/* Billing Contact */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Billing Contact</h3>
              <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </button>
            </div>
            
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-gray-900">Finance Department</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-gray-600" />
                <span className="text-gray-900">finance@techcorp.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Building className="w-4 h-4 text-gray-600" />
                <span className="text-gray-900">TechCorp Solutions</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Plan Modal */}
      {showChangePlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Change Subscription Plan</h2>
                <button 
                  onClick={() => setShowChangePlanModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                {subscriptionPlans.map((plan) => (
                  <label
                    key={plan.id}
                    className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedPlan === plan.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={selectedPlan === plan.id}
                      onChange={() => setSelectedPlan(plan.id)}
                      className="mt-1 text-primary-600 focus:ring-primary-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{plan.name}</p>
                          <p className="text-primary-600 font-bold">{formatCurrency(plan.price)}/{plan.billingCycle === 'monthly' ? 'month' : 'year'}</p>
                        </div>
                        {plan.isCurrent && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Current Plan
                          </span>
                        )}
                      </div>
                      <ul className="mt-2 space-y-1">
                        {plan.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            {feature}
                          </li>
                        ))}
                        {plan.features.length > 3 && (
                          <li className="text-sm text-gray-600">
                            +{plan.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  </label>
                ))}
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-yellow-900">Changing plans?</p>
                    <p className="text-sm text-yellow-700 mt-1">
                      Your new plan will take effect immediately. You'll be charged the prorated amount for the remainder of your billing cycle.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowChangePlanModal(false)}
                  className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleChangePlan}
                  disabled={!selectedPlan || (selectedPlan === subscriptionData.currentPlan) || loading}
                  className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Zap className="w-4 h-4 mr-2" />
                  )}
                  Confirm Change
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Add Payment Method</h2>
                <button 
                  onClick={() => setShowAddPaymentModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Card Number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex items-center">
                  <input
                    id="default-payment"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="default-payment" className="ml-2 block text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
              
              <div className="flex items-center justify-end space-x-3 pt-4 border-t">
                <button 
                  onClick={() => setShowAddPaymentModal(false)}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleAddPaymentMethod}
                  disabled={loading}
                  className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  ) : (
                    <Plus className="w-4 h-4 mr-2" />
                  )}
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Billing