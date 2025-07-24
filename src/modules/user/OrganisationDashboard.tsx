  CardHeader,
  Typography,
  Grid,
  Box,
  Chip,
  Button,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  LinearProgress,
  Divider,
  Tooltip,
  Badge,
  Alert,
  Tab,
  Tabs,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Alert,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import Building2Icon from '@mui/icons-material/Business';
import UsersIcon from '@mui/icons-material/People';
import ShieldIcon from '@mui/icons-material/Security';
import FileTextIcon from '@mui/icons-material/Description';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AlertCircleIcon from '@mui/icons-material/Error';
import React, { useState, useEffect } from 'react'
import {
  People as PeopleIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  AccessTime as AccessTimeIcon,
  Warning as WarningIcon,
  TrendingUp as TrendingUpIcon,
  BarChart as BarChartIcon,
  Add as AddIcon,
  Search as SearchIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import {
  Plus,
  Eye,
  Settings,
  Key,
  Calendar,
  Filter,
  RefreshCw,
  Building,
  User,
  Target,
  Activity,
  Zap,
  Bell,
  ExternalLink,
  ChevronRight,
  MoreHorizontal,
  Star,
  Award,
  MapPin,
  GraduationCap,
  Briefcase,
  UserCheck,
  XCircle,
  ArrowUp,
  ArrowDown,
  PieChart,
  TrendingDown,
  Database,
  Globe,
  Lock,
  MessageSquare,
  HelpCircle,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  Clock,
  Upload,
  CheckCircle,
  AlertTriangle,
  BarChart3,
  Users,
  TrendingUp,
  Search,
  Download
} from 'lucide-react';
import UploadIcon from '@mui/icons-material/Upload';
import ClockIcon from '@mui/icons-material/AccessTime';
import PlusIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterIcon from '@mui/icons-material/FilterList';
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import BellIcon from '@mui/icons-material/Notifications';
import EyeIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Trash2Icon from '@mui/icons-material/Delete';
import MoreVerticalIcon from '@mui/icons-material/MoreVert';
import UserPlusIcon from '@mui/icons-material/PersonAdd';
import FileCheckIcon from '@mui/icons-material/AssignmentTurnedIn';
import AwardIcon from '@mui/icons-material/EmojiEvents';
import TargetIcon from '@mui/icons-material/GpsFixed';
import BarChart3Icon from '@mui/icons-material/BarChart';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import MailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import MapPinIcon from '@mui/icons-material/LocationOn';
import GlobeIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import ZapIcon from '@mui/icons-material/FlashOn';
import ActivityIcon from '@mui/icons-material/Timeline';
import DollarSignIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PieChartIcon from '@mui/icons-material/PieChart';
import LineChartIcon from '@mui/icons-material/ShowChart';
import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';
import RefreshCwIcon from '@mui/icons-material/Refresh';
import FileUpIcon from '@mui/icons-material/CloudUpload';
import DatabaseIcon from '@mui/icons-material/Storage';
import ServerIcon from '@mui/icons-material/Dns';
import CloudIcon from '@mui/icons-material/Cloud';
import LockIcon from '@mui/icons-material/Lock';
import UnlockIcon from '@mui/icons-material/LockOpen';
import KeyIcon from '@mui/icons-material/VpnKey';
import UserCheckIcon from '@mui/icons-material/PersonOutline';
import UserXIcon from '@mui/icons-material/PersonOff';
import AlertTriangleIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import HelpCircleIcon from '@mui/icons-material/Help';
import ExternalLinkIcon from '@mui/icons-material/OpenInNew';
import CopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import TagIcon from '@mui/icons-material/Label';
import FolderIcon from '@mui/icons-material/Folder';
import ArchiveIcon from '@mui/icons-material/Archive';
import TrashIcon from '@mui/icons-material/Delete';
import RotateCcwIcon from '@mui/icons-material/Undo';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import BarChartIcon from '@mui/icons-material/BarChart';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PublicIcon from '@mui/icons-material/Public';
import StarIcon from '@mui/icons-material/Star';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WorkIcon from '@mui/icons-material/Work';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import VerifiedIcon from '@mui/icons-material/Verified';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
import LaunchIcon from '@mui/icons-material/Launch';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FlagIcon from '@mui/icons-material/Flag';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import LayersIcon from '@mui/icons-material/Layers';
import GridViewIcon from '@mui/icons-material/GridView';
import ListIcon from '@mui/icons-material/List';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useAuth } from '../shared/contexts/AuthContext'
import { Link } from 'react-router-dom'

interface VerificationJob {
  id: string
  name: string
  type: 'bulk' | 'individual'
  uploadDate: string
  status: 'completed' | 'in_progress' | 'failed' | 'pending'
  totalRecords: number
  successCount: number
  failureCount: number
  progress: number
  estimatedCompletion?: string
}

interface TrustScoreAlert {
  id: string
  userId: string
  userName: string
  currentScore: number
  previousScore: number
  trend: 'declining' | 'low'
  reason: string
  date: string
}

const OrganisationDashboard = () => {
  const { profile } = useAuth()
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('30days')
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'team' | 'analytics'>('overview')

  // Mock data
  const [dashboardStats, setDashboardStats] = useState({
    activeVerifications: 156,
    pendingActions: 23,
    verifiedIndividuals: 1247,
    trustScoreWatchlist: 8,
    monthlyVerifications: 342,
    successRate: 94.2,
    averageTrustScore: 78.5,
    apiCalls: 2847
  })

  const verificationJobs: VerificationJob[] = [
    {
      id: '1',
      name: 'Q1 2024 New Hires Batch',
      type: 'bulk',
      uploadDate: '2024-01-20',
      status: 'in_progress',
      totalRecords: 150,
      successCount: 89,
      failureCount: 12,
      progress: 67,
      estimatedCompletion: '2 hours'
    },
    {
      id: '2',
      name: 'Executive Team Verification',
      type: 'bulk',
      uploadDate: '2024-01-19',
      status: 'completed',
      totalRecords: 25,
      successCount: 24,
      failureCount: 1,
      progress: 100
    },
    {
      id: '3',
      name: 'Contractor Onboarding',
      type: 'bulk',
      uploadDate: '2024-01-18',
      status: 'failed',
      totalRecords: 75,
      successCount: 0,
      failureCount: 75,
      progress: 0
    },
    {
      id: '4',
      name: 'Remote Workers Verification',
      type: 'bulk',
      uploadDate: '2024-01-17',
      status: 'completed',
      totalRecords: 200,
      successCount: 187,
      failureCount: 13,
      progress: 100
    }
  ]

  const recentActivity = [
    {
      id: '1',
      user: 'Sarah Johnson',
      action: 'approved 15 identity verifications',
      timestamp: '5 minutes ago',
      type: 'approval' as const,
      details: 'Batch: New Hires Q1 2024'
    },
    {
      id: '2',
      user: 'Michael Chen',
      action: 'uploaded bulk verification file',
      timestamp: '2 hours ago',
      type: 'upload' as const,
      details: '150 records - Executive Team'
    },
    {
      id: '3',
      user: 'David Wilson',
      action: 'completed individual verification',
      timestamp: '4 hours ago',
      type: 'verification' as const,
      details: 'John Doe - Employment History'
    },
    {
      id: '4',
      user: 'System',
      action: 'generated API key',
      timestamp: '1 day ago',
      type: 'system' as const,
      details: 'Production environment'
    },
    {
      id: '5',
      user: 'Amanda Foster',
      action: 'rejected verification request',
      timestamp: '1 day ago',
      type: 'verification' as const,
      details: 'Jane Smith - Insufficient documentation'
    }
  ]

  const trustScoreAlerts: TrustScoreAlert[] = [
    {
      id: '1',
      userId: 'user_001',
      userName: 'John Doe',
      currentScore: 45,
      previousScore: 67,
      trend: 'declining',
      reason: 'Document expiry',
      date: '2024-01-20'
    },
    {
      id: '2',
      userId: 'user_002',
      userName: 'Jane Smith',
      currentScore: 38,
      previousScore: 42,
      trend: 'low',
      reason: 'Failed verification',
      date: '2024-01-19'
    },
    {
      id: '3',
      userId: 'user_003',
      userName: 'Robert Johnson',
      currentScore: 52,
      previousScore: 78,
      trend: 'declining',
      reason: 'Address verification failed',
      date: '2024-01-18'
    }
  ]

  const verificationTypes = [
    { type: 'Identity Verification', count: 89, icon: Shield, color: 'bg-blue-500' },
    { type: 'Employment History', count: 67, icon: Briefcase, color: 'bg-green-500' },
    { type: 'Address Verification', count: 45, icon: MapPin, color: 'bg-purple-500' },
    { type: 'Education Verification', count: 34, icon: GraduationCap, color: 'bg-orange-500' },
    { type: 'Character References', count: 23, icon: UserCheck, color: 'bg-pink-500' }
  ]

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'in_progress':
        return <Clock className="w-5 h-5 text-blue-500" />
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'verification':
        return <Shield className="w-4 h-4 text-blue-500" />
      case 'upload':
        return <Upload className="w-4 h-4 text-green-500" />
      case 'approval':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'system':
        return <Settings className="w-4 h-4 text-gray-500" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Organisation Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Monitor verification activity, manage requests, and track trust signals across your organisation
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search verifications, users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-80"
            />
          </div>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Bell className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Verifications',
            value: dashboardStats.activeVerifications,
            icon: Search,
            color: 'bg-blue-500',
            description: 'Ongoing verifications',
            action: 'View All',
            trend: '+12%',
            trendUp: true
          },
          {
            title: 'Pending Actions',
            value: dashboardStats.pendingActions,
            icon: Clock,
            color: 'bg-yellow-500',
            description: 'Require attention',
            action: 'Review',
            trend: '-5%',
            trendUp: false
          },
          {
            title: 'Verified Individuals',
            value: dashboardStats.verifiedIndividuals.toLocaleString(),
            icon: Shield,
            color: 'bg-green-500',
            description: 'Successfully verified',
            action: 'View All',
            trend: '+8%',
            trendUp: true
          },
          {
            title: 'Trust Score Watchlist',
            value: dashboardStats.trustScoreWatchlist,
            icon: AlertTriangle,
            color: 'bg-red-500',
            description: 'Low/declining scores',
            action: 'Review',
            trend: '+3',
            trendUp: false
          }
        ].map((card, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} rounded-lg p-3`}>
                <card.icon className="w-6 h-6 text-white" />
              </div>
              <Link to={
                card.title === 'Active Verifications' ? '/organisation/verifications' :
                card.title === 'Pending Actions' ? '/organisation/verifications' :
                card.title === 'Verified Individuals' ? '/organisation/verifications' :
                '/organisation/trust-score'
              } className="text-primary-600 text-sm font-medium hover:text-primary-700 flex items-center">
                {card.action}
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
            
            <div className="mb-3">
              <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
              <p className="text-2xl font-bold text-gray-900">{card.value}</p>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-500">{card.description}</p>
              <div className={`flex items-center text-xs font-medium ${
                card.trendUp ? 'text-green-600' : 'text-red-600'
              }`}>
                {card.trendUp ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                {card.trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'jobs', label: 'Verification Jobs', icon: Database },
            { id: 'team', label: 'Team Activity', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp }
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
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Verification Activity */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Recent Verification Activity</h3>
                <Link to="/organisation/verifications" className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  View All →
                </Link>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    type: 'NIN verified',
                    user: 'Jane Doe',
                    status: 'approved',
                    time: '2 minutes ago',
                    verifier: 'Sarah Johnson'
                  },
                  {
                    type: 'Employment history',
                    user: 'John Smith',
                    status: 'rejected',
                    time: '15 minutes ago',
                    verifier: 'Michael Chen'
                  },
                  {
                    type: 'Address verification',
                    user: 'Mary Wilson',
                    status: 'pending',
                    time: '1 hour ago',
                    verifier: 'Pending review'
                  },
                  {
                    type: 'Education credentials',
                    user: 'David Brown',
                    status: 'approved',
                    time: '3 hours ago',
                    verifier: 'Amanda Foster'
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-2 h-2 rounded-full ${
                        activity.status === 'approved' ? 'bg-green-500' :
                        activity.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {activity.type} for <span className="text-primary-600">{activity.user}</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.verifier} • {activity.time}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      activity.status === 'approved' ? 'bg-green-100 text-green-800' :
                      activity.status === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Verification Request Shortcuts */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'Start New Identity Verification',
                    description: 'Verify individual identity documents',
                    icon: Shield,
                    color: 'bg-blue-500',
                    link: '/organisation/verifications'
                  },
                  {
                    title: 'Verify Employment History',
                    description: 'Check professional background',
                    icon: Briefcase,
                    color: 'bg-green-500',
                    link: '/organisation/verifications'
                  },
                  {
                    title: 'Verify Address',
                    description: 'Confirm residential address',
                    icon: MapPin,
                    color: 'bg-purple-500',
                    link: '/organisation/verifications'
                  },
                  {
                    title: 'Upload Bulk File',
                    description: 'Process multiple verifications',
                    icon: Upload,
                    color: 'bg-orange-500',
                    link: '/organisation/bulk-upload'
                  }
                ].map((action, index) => (
                  <Link to={action.link} key={index} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left group">
                    <div className="flex items-start space-x-3">
                      <div className={`${action.color} rounded-lg p-2 group-hover:scale-105 transition-transform`}>
                        <action.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
                        <p className="text-sm text-gray-600">{action.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Trust Score Monitor */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Trust Score Monitor</h3>
                <Link to="/organisation/trust-score" className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  View Analytics →
                </Link>
              </div>
              
              <div className="text-center mb-6">
                <p className="text-3xl font-bold text-gray-900 mb-1">{dashboardStats.averageTrustScore}</p>
                <p className="text-sm text-gray-600">Average Trust Score</p>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm text-green-600">+2.3 this month</span>
                </div>
              </div>

              {trustScoreAlerts.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900 text-sm">Recent Alerts</h4>
                  {trustScoreAlerts.slice(0, 3).map((alert) => (
                    <div key={alert.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-red-900">{alert.userName}</span>
                        <span className="text-xs text-red-600">{alert.currentScore}</span>
                      </div>
                      <p className="text-xs text-red-700">{alert.reason}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* API Access */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">API Access</h3>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-green-600">Active</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">API Calls Today</span>
                  <span className="text-sm font-medium text-gray-900">{dashboardStats.apiCalls.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rate Limit</span>
                  <span className="text-sm font-medium text-gray-900">10,000/day</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(dashboardStats.apiCalls / 10000) * 100}%` }}
                  ></div>
                </div>
                
                <Link to="/organisation/api" className="w-full bg-primary-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center justify-center">
                  <Key className="w-4 h-4 mr-2" />
                  Manage API Keys
                </Link>
              </div>
            </div>

            {/* Document Vault Quick Access */}
            <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Document Vault</h3>
                <Link to="/organisation/documents" className="text-primary-600 text-sm font-medium hover:text-primary-700">
                  Go to Vault →
                </Link>
              </div>
              
              <div className="space-y-3">
                {verificationTypes.slice(0, 3).map((type, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <type.icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">{type.type}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{type.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'jobs' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Bulk Verification Job Tracker</h3>
              <div className="flex items-center space-x-3">
                <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <Link to="/organisation/bulk-upload" className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
                  <Upload className="w-4 h-4 mr-2" />
                  New Bulk Upload
                </Link>
              </div>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Upload Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Success/Failure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {verificationJobs.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getStatusIcon(job.status)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{job.name}</div>
                          <div className="text-sm text-gray-500">{job.totalRecords} records</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(job.uploadDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(job.status)}`}>
                        {job.status.replace('_', ' ').charAt(0).toUpperCase() + job.status.replace('_', ' ').slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                          <div 
                            className={`h-2 rounded-full ${
                              job.status === 'completed' ? 'bg-green-500' :
                              job.status === 'failed' ? 'bg-red-500' : 'bg-blue-500'
                            }`}
                            style={{ width: `${job.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{job.progress}%</span>
                      </div>
                      {job.estimatedCompletion && (
                        <div className="text-xs text-gray-500 mt-1">
                          ETA: {job.estimatedCompletion}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600">{job.successCount}</span>
                        <span className="text-red-600">{job.failureCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-primary-600 hover:text-primary-900 mr-3">
                        View Details
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Team Activity (Audit Trail)</h3>
              <div className="flex items-center space-x-3">
                <select className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                  <option>All Roles</option>
                  <option>Admin</option>
                  <option>Verifier</option>
                  <option>Viewer</option>
                </select>
                <button className="border border-gray-300 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    {activity.details && (
                      <p className="text-sm text-gray-500 mt-1">{activity.details}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-2">{activity.timestamp}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.type === 'approval' ? 'bg-green-100 text-green-800' :
                      activity.type === 'upload' ? 'bg-blue-100 text-blue-800' :
                      activity.type === 'verification' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Verification Types Chart */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Verification Types</h3>
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
              </select>
            </div>
            
            <div className="space-y-4">
              {verificationTypes.map((type, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${type.color}`}></div>
                    <span className="text-sm text-gray-700">{type.type}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{type.count}</p>
                    <p className="text-xs text-gray-500">{Math.round((type.count / 258) * 100)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Success Rate Metrics */}
          <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
import {
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
  Card,

  CardContent,
export default OrganisationDashboard