import React, { useEffect, useState } from 'react'
import { useAuth } from '../shared/contexts/AuthContext'
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import SecurityIcon from '@mui/icons-material/Security';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsIcon from '@mui/icons-material/Settings';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import {
  Clock,
  Wallet,
  XCircle,
  Eye,
  Upload,
  MessageCircle,
  AlertCircle,
  User,
  FileText,
  Shield,
  Award,
  Building,
  ChevronRight,
  Users
} from 'lucide-react'
import { getTrustScoreBadge, mockDocuments, mockVerificationRequests, mockTransactions } from '../shared/lib/mockData'

const IndividualDashboard = () => {
  const { profile } = useAuth()
  const [stats, setStats] = useState({
    documents: 0,
    verifications: 0,
    pendingRequests: 0,
    walletBalance: 0,
    profileCompletion: 63
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  }, [profile])

  const loadDashboardData = async () => {
    if (!profile) return

    try {
      await new Promise(resolve => setTimeout(resolve, 500))

      const userDocuments = mockDocuments.filter(d => d.user_id === profile.id)
      const userVerifications = mockVerificationRequests.filter(r => r.target_user_id === profile.id)
      const userTransactions = mockTransactions.filter(t => t.user_id === profile.id)
      
      const walletBalance = userTransactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + (t.type === 'credit' ? t.amount : -t.amount), 0)

      setStats({
        documents: userDocuments.length,
        verifications: userVerifications.length,
        pendingRequests: userVerifications.filter(r => r.status === 'pending').length,
        walletBalance: walletBalance,
        profileCompletion: 63
      })
    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  const getUserName = () => {
    return profile?.first_name || 'User'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  const trustScoreBadge = getTrustScoreBadge(profile?.trust_score || 0)

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl shadow-lg p-6 text-white">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl font-bold mb-2">
              {getGreeting()}, {getUserName()}!
            </h1>
            <p className="text-primary-100 mb-4">
              Your profile is <span className="font-semibold">{stats.profileCompletion}%</span> complete.
            </p>
            
            {/* Progress Bar */}
            <div className="w-full lg:w-80 bg-primary-800 bg-opacity-50 rounded-full h-3 mb-4">
              <div 
                className="bg-white h-3 rounded-full transition-all duration-500"
                style={{ width: `${stats.profileCompletion}%` }}
              ></div>
            </div>
          </div>
          
          <button className="bg-white text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <User className="w-5 h-5 mr-2" />
            Complete Profile
          </button>
        </div>
      </div>

      {/* Trust Score Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between">
          <div className="mb-4 lg:mb-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Trust Score</h3>
            <div className="flex items-center space-x-4">
              <div className="relative">
                {/* Circular Progress */}
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-primary-600"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${profile?.trust_score || 0}, 100`}
                    strokeLinecap="round"
                    fill="transparent"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-gray-900">{profile?.trust_score || 0}</span>
                </div>
              </div>
              
              <div>
                <p className="text-2xl font-bold text-gray-900">{profile?.trust_score || 0}/100</p>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${trustScoreBadge.color}`}>
                  {trustScoreBadge.label}
                </span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">ID Verified</span>
            </div>
            <div className="flex items-center space-x-3">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="text-sm text-gray-700">Address Pending</span>
            </div>
            <div className="flex items-center space-x-3">
              <CheckCircleIcon className="w-5 h-5 text-green-500" />
              <span className="text-sm text-gray-700">1 Guarantor Verified</span>
            </div>
            
            <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center mt-4">
              <TrendingUpIcon className="w-4 h-4 mr-2" />
              Improve Trust Score
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Documents',
            value: stats.documents,
            icon: FileText,
            color: 'bg-blue-500',
            description: 'Uploaded documents',
            action: 'Upload New'
          },
          {
            title: 'Verifications',
            value: stats.verifications,
            icon: Shield,
            color: 'bg-green-500',
            description: 'Verification requests',
            action: 'View All'
          },
          {
            title: 'Pending Requests',
            value: stats.pendingRequests,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Awaiting response',
            action: 'Review'
          },
          {
            title: 'Wallet Balance',
            value: `₦${stats.walletBalance.toLocaleString()}`,
            icon: Wallet,
            color: 'bg-purple-500',
            description: 'Available balance',
            action: 'Top Up'
          }
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                {card.action} →
              </button>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{card.value}</p>
              <p className="text-xs text-gray-500">{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Verification Activity Feed */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Verification Activity</h3>
              <button className="text-primary-600 text-sm font-medium hover:text-primary-700">
                View All →
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                {
                  icon: CheckCircleIcon,
                  color: 'text-green-500',
                  title: 'ABC Bank verified your NIN',
                  status: 'Approved',
                  time: '2 hours ago',
                  statusColor: 'bg-green-100 text-green-800'
                },
                {
                  icon: XCircle,
                  color: 'text-red-500',
                  title: 'You declined a verification request from XYZ Ltd',
                  status: 'Declined',
                  time: '5 hours ago',
                  statusColor: 'bg-red-100 text-red-800'
                },
                {
                  icon: Clock,
                  color: 'text-yellow-500',
                  title: 'TechCorp Solutions requested employment verification',
                  status: 'Pending',
                  time: '1 day ago',
                  statusColor: 'bg-yellow-100 text-yellow-800'
                },
                {
                  icon: CheckCircleIcon,
                  color: 'text-green-500',
                  title: 'University of Lagos verified your degree certificate',
                  status: 'Approved',
                  time: '3 days ago',
                  statusColor: 'bg-green-100 text-green-800'
                }
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-shrink-0">
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${activity.statusColor}`}>
                        {activity.status}
                      </span>
                      <span className="text-xs text-gray-500">{activity.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Biobank Summary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Biobank Summary</h3>
              <button className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center">
                <Eye className="w-4 h-4 mr-2" />
                View My Biobank
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  category: 'Identity Docs',
                  count: 2,
                  status: 'Verified',
                  icon: Shield,
                  color: 'text-green-600',
                  bgColor: 'bg-green-100'
                },
                {
                  category: 'Certificates',
                  count: 1,
                  status: 'Pending',
                  icon: Award,
                  color: 'text-yellow-600',
                  bgColor: 'bg-yellow-100'
                },
                {
                  category: 'Address',
                  count: 0,
                  status: 'Not Verified',
                  icon: Building,
                  color: 'text-red-600',
                  bgColor: 'bg-red-100'
                }
              ].map((item, index) => (
                <div key={index} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`p-2 rounded-lg ${item.bgColor}`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.category}</p>
                      <p className="text-xs text-gray-500">{item.count} documents</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'Verified' ? 'bg-green-100 text-green-800' :
                    item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Pending Actions */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Actions</h3>
              <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">3</span>
            </div>
            
            <div className="space-y-3">
              {[
                {
                  title: 'Approve verification from TechCorp',
                  icon: Building,
                  urgent: true
                },
                {
                  title: 'Upload missing certificate',
                  icon: Upload,
                  urgent: false
                },
                {
                  title: 'Respond to attestation request',
                  icon: MessageCircle,
                  urgent: false
                }
              ].map((action, index) => (
                <div key={index} className={`p-3 border rounded-lg hover:bg-gray-50 transition-colors ${
                  action.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'
                }`}>
                  <div className="flex items-center space-x-3">
                    <action.icon className={`w-4 h-4 ${action.urgent ? 'text-red-600' : 'text-gray-600'}`} />
                    <span className="text-sm text-gray-900 flex-1">{action.title}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors">
              Go to Actions
            </button>
          </div>

          {/* Document Expiry Alerts */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
            <div className="flex items-center space-x-3 mb-4">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <h3 className="text-lg font-semibold text-yellow-800">Document Expiry Alert</h3>
            </div>
            
            <div className="space-y-3">
              <div className="bg-white rounded-lg p-3">
                <p className="text-sm font-medium text-gray-900">Your Passport expires in 12 days</p>
                <p className="text-xs text-gray-500 mb-2">Expires: March 15, 2024</p>
                <button className="bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-yellow-700 transition-colors">
                  Update Now
                </button>
              </div>
            </div>
          </div>

          {/* Attestation Requests */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Attestation Requests</h3>
            
            <div className="text-center mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600">You have <span className="font-semibold">2 pending requests</span> to attest identity</p>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
              Review Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default IndividualDashboard