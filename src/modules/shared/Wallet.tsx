import React, { useState, useEffect } from 'react'
import { 
  Wallet as WalletIcon, 
  CreditCard, 
  Plus, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft,
  History,
  Shield,
  Lock,
  Settings,
  HelpCircle,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  PieChart,
  Calendar,
  Filter,
  Search,
  Eye,
  EyeOff,
  Smartphone,
  Building,
  User,
  RefreshCw,
  Bell,
  Star,
  Target,
  Zap
} from 'lucide-react'
import { useAuth } from './contexts/AuthContext'

interface Transaction {
  id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  category: 'verification' | 'topup' | 'withdrawal' | 'refund' | 'fee'
  status: 'completed' | 'pending' | 'failed'
  date: string
  reference?: string
}

interface PaymentMethod {
  id: string
  type: 'card' | 'bank' | 'surebanker'
  name: string
  details: string
  isDefault: boolean
}

const Wallet = () => {
  const { profile } = useAuth()
  const [surebankStatus, setSurebankStatus] = useState<'none' | 'linking' | 'linked'>('none')
  const [showBalance, setShowBalance] = useState(true)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'topup' | 'settings'>('overview')
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days')
  const [topupAmount, setTopupAmount] = useState('')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [surebankEmail, setSurebankEmail] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock wallet data
  const [walletData, setWalletData] = useState({
    balance: 5500,
    currency: '₦',
    lastSynced: '2 minutes ago',
    monthlySpent: 2340,
    monthlyLimit: 10000,
    pendingTransactions: 1
  })

  // Mock transactions
  const transactions: Transaction[] = [
    {
      id: '1',
      type: 'debit',
      amount: 500,
      description: 'ID Verification - TechCorp Solutions',
      category: 'verification',
      status: 'completed',
      date: '2024-01-20T14:30:00Z',
      reference: 'VER-001234'
    },
    {
      id: '2',
      type: 'credit',
      amount: 2000,
      description: 'Wallet Top-up via Surebanker',
      category: 'topup',
      status: 'completed',
      date: '2024-01-19T10:15:00Z',
      reference: 'TOP-001235'
    },
    {
      id: '3',
      type: 'debit',
      amount: 300,
      description: 'Document Upload Fee',
      category: 'fee',
      status: 'completed',
      date: '2024-01-18T16:45:00Z',
      reference: 'FEE-001236'
    },
    {
      id: '4',
      type: 'debit',
      amount: 750,
      description: 'Address Verification - ABC Bank',
      category: 'verification',
      status: 'pending',
      date: '2024-01-20T09:20:00Z',
      reference: 'VER-001237'
    },
    {
      id: '5',
      type: 'credit',
      amount: 1000,
      description: 'Refund - Cancelled Verification',
      category: 'refund',
      status: 'completed',
      date: '2024-01-17T11:30:00Z',
      reference: 'REF-001238'
    }
  ]

  // Mock payment methods
  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'surebanker',
      name: 'Surebanker Account',
      details: 'john.doe@example.com',
      isDefault: true
    },
    {
      id: '2',
      type: 'card',
      name: 'Visa Card',
      details: '**** **** **** 1234',
      isDefault: false
    },
    {
      id: '3',
      type: 'bank',
      name: 'GTBank',
      details: 'Account ending in 5678',
      isDefault: false
    }
  ]

  // Usage breakdown data
  const usageBreakdown = [
    { category: 'Identity Verifications', amount: 1500, percentage: 64, color: 'bg-blue-500' },
    { category: 'Document Uploads', amount: 600, percentage: 26, color: 'bg-green-500' },
    { category: 'Attestation Requests', amount: 240, percentage: 10, color: 'bg-purple-500' }
  ]

  const handleSurebankLink = async () => {
    setLoading(true)
    setSurebankStatus('linking')
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSurebankStatus('linked')
    setLoading(false)
  }

  const handleTopup = async () => {
    if (!topupAmount || !selectedPaymentMethod) return
    
    setLoading(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Update wallet balance
    setWalletData(prev => ({
      ...prev,
      balance: prev.balance + parseInt(topupAmount)
    }))
    
    setTopupAmount('')
    setLoading(false)
    setActiveTab('overview')
  }

  const getTransactionIcon = (type: string, category: string) => {
    if (type === 'credit') {
      return <ArrowDownLeft className="w-5 h-5 text-green-500" />
    }
    
    switch (category) {
      case 'verification':
        return <Shield className="w-5 h-5 text-blue-500" />
      case 'fee':
        return <Settings className="w-5 h-5 text-gray-500" />
      default:
        return <ArrowUpRight className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Surebanker Account Gate
  if (surebankStatus === 'none') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <WalletIcon className="w-10 h-10 text-white" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-2">IDCertify Wallet</h1>
            <p className="text-gray-600 mb-6">Powered by Surebanker</p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-3">
                <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-900">Secure Payment Processing</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Your wallet is powered by Surebanker's secure payment infrastructure
                  </p>
                </div>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              To use your IDCertify Wallet, please create or link your Surebanker account.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={() => setSurebankStatus('linking')}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Surebanker Account
              </button>
              
              <button
                onClick={() => setSurebankStatus('linking')}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Link Existing Account
              </button>
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <div className="flex items-center">
                  <Lock className="w-3 h-3 mr-1" />
                  <span>Bank-level Security</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  <span>PCI Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Surebanker Linking Process
  if (surebankStatus === 'linking') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Link Surebanker Account</h2>
              <p className="text-gray-600 mt-1">Connect your existing Surebanker account to continue</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Surebanker Email/ID
                </label>
                <input
                  type="email"
                  value={surebankEmail}
                  onChange={(e) => setSurebankEmail(e.target.value)}
                  placeholder="Enter your Surebanker email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                  <p className="text-xs text-yellow-800">
                    You'll be redirected to Surebanker to authorize the connection securely.
                  </p>
                </div>
              </div>
              
              <button
                onClick={handleSurebankLink}
                disabled={!surebankEmail || loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <ExternalLink className="w-5 h-5 mr-2" />
                    Link Account
                  </>
                )}
              </button>
              
              <button
                onClick={() => setSurebankStatus('none')}
                className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Main Wallet Dashboard
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wallet</h1>
          <p className="text-gray-600 mt-1">Manage your balance, transactions, and verification payments via Surebanker</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
          <button 
            onClick={() => setActiveTab('topup')}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Top Up
          </button>
        </div>
      </div>

      {/* Surebanker Connection Status */}
      <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-900">Connected to Surebanker</p>
              <p className="text-xs text-green-700">{profile?.email} • Last synced: {walletData.lastSynced}</p>
            </div>
          </div>
          <button className="text-green-600 hover:text-green-700 text-sm font-medium flex items-center">
            <RefreshCw className="w-4 h-4 mr-1" />
            Sync
          </button>
        </div>
      </div>

      {/* Balance Summary */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <WalletIcon className="w-8 h-8" />
            <div>
              <h3 className="text-lg font-semibold">Wallet Balance</h3>
              <p className="text-green-100 text-sm">Available for transactions</p>
            </div>
          </div>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            {showBalance ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="mb-6">
          <p className="text-3xl font-bold mb-2">
            {showBalance ? `${walletData.currency}${walletData.balance.toLocaleString()}` : '••••••'}
          </p>
          <div className="flex items-center space-x-4 text-sm text-green-100">
            <span>Monthly spent: {walletData.currency}{walletData.monthlySpent.toLocaleString()}</span>
            <span>•</span>
            <span>Limit: {walletData.currency}{walletData.monthlyLimit.toLocaleString()}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setActiveTab('topup')}
            className="bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center"
          >
            <ArrowDownLeft className="w-4 h-4 mr-2" />
            Top Up
          </button>
          <button className="border border-white border-opacity-30 text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors flex items-center">
            <ArrowUpRight className="w-4 h-4 mr-2" />
            Withdraw
          </button>
          <button 
            onClick={() => setActiveTab('transactions')}
            className="border border-white border-opacity-30 text-white px-4 py-2 rounded-lg font-medium hover:bg-white hover:bg-opacity-10 transition-colors flex items-center"
          >
            <History className="w-4 h-4 mr-2" />
            History
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'transactions', label: 'Transactions', icon: History },
            { id: 'topup', label: 'Top Up', icon: Plus },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-600'
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
          {/* Usage Breakdown */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Usage Breakdown</h3>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="1year">Last year</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {usageBreakdown.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-700">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{walletData.currency}{item.amount.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Total Spent</span>
                <span className="font-bold text-gray-900">{walletData.currency}{walletData.monthlySpent.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="space-y-6">
            {/* Pending Transactions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-5 h-5 text-yellow-500" />
                <h3 className="font-semibold text-gray-900">Pending</h3>
              </div>
              <p className="text-2xl font-bold text-gray-900 mb-1">{walletData.pendingTransactions}</p>
              <p className="text-sm text-gray-600">Transaction pending</p>
            </div>

            {/* Monthly Limit */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-gray-900">Monthly Limit</h3>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span className="text-gray-600">Used</span>
                  <span className="font-medium">{Math.round((walletData.monthlySpent / walletData.monthlyLimit) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(walletData.monthlySpent / walletData.monthlyLimit) * 100}%` }}
                  ></div>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                {walletData.currency}{(walletData.monthlyLimit - walletData.monthlySpent).toLocaleString()} remaining
              </p>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Zap className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm">Auto Top-up Setup</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Payment Notifications</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-5 h-5 text-purple-600 mr-3" />
                  <span className="text-sm">Manage in Surebanker</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-64"
                  />
                </div>
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {getTransactionIcon(transaction.type, transaction.category)}
                    <div>
                      <p className="font-medium text-gray-900">{transaction.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <p className="text-sm text-gray-500">
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                        {transaction.reference && (
                          <>
                            <span className="text-gray-300">•</span>
                            <p className="text-xs text-gray-500">{transaction.reference}</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <p className={`font-medium ${
                      transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'credit' ? '+' : '-'}{walletData.currency}{transaction.amount.toLocaleString()}
                    </p>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(transaction.status)}`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'topup' && (
        <div className="max-w-2xl">
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Up Wallet</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    {walletData.currency}
                  </span>
                  <input
                    type="number"
                    value={topupAmount}
                    onChange={(e) => setTopupAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 text-lg"
                  />
                </div>
                
                <div className="flex items-center space-x-2 mt-3">
                  {[1000, 2000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setTopupAmount(amount.toString())}
                      className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors"
                    >
                      {walletData.currency}{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Payment Method
                </label>
                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <label key={method.id} className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method.id}
                        checked={selectedPaymentMethod === method.id}
                        onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                        className="text-green-600 focus:ring-green-500"
                      />
                      <div className="ml-3 flex items-center space-x-3">
                        {method.type === 'surebanker' && <Building className="w-5 h-5 text-green-600" />}
                        {method.type === 'card' && <CreditCard className="w-5 h-5 text-blue-600" />}
                        {method.type === 'bank' && <Building className="w-5 h-5 text-gray-600" />}
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-500">{method.details}</p>
                        </div>
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleTopup}
                disabled={!topupAmount || !selectedPaymentMethod || loading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <Plus className="w-5 h-5 mr-2" />
                    Confirm Top-Up
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Security Settings */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Security & Preferences</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Payment PIN</p>
                  <p className="text-sm text-gray-500">Secure your transactions with a PIN</p>
                </div>
                <button className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors">
                  Setup
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                  <p className="text-sm text-gray-500">Add extra security to your wallet</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Daily Spending Limit</p>
                  <p className="text-sm text-gray-500">Current limit: {walletData.currency}5,000</p>
                </div>
                <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                  Modify
                </button>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Support</h3>
            
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">Having trouble with payments?</p>
                    <p className="text-xs text-blue-700 mt-1">
                      Get help with transactions, top-ups, or account issues
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <ExternalLink className="w-5 h-5 text-green-600 mr-3" />
                  <span className="text-sm">Contact Surebanker Support</span>
                </button>
                <button className="w-full flex items-center p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                  <HelpCircle className="w-5 h-5 text-blue-600 mr-3" />
                  <span className="text-sm">Open Help Center</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Wallet