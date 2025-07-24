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
import GiftIcon from '@mui/icons-material/CardGiftcard';
import StarIcon from '@mui/icons-material/Star';
import TrophyIcon from '@mui/icons-material/EmojiEvents';
import UsersIcon from '@mui/icons-material/People';
import CalendarIcon from '@mui/icons-material/CalendarToday';
import DollarSignIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AwardIcon from '@mui/icons-material/WorkspacePremium';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import FlashOnIcon from '@mui/icons-material/FlashOn';

interface RewardProgram {
  id: string;
  name: string;
  description: string;
  type: 'points' | 'badges' | 'cashback' | 'discount' | 'premium';
  value: number;
  currency?: string;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  eligibilityCriteria: string[];
  targetAudience: 'all' | 'individual' | 'organization' | 'premium';
  maxRedemptions?: number;
  currentRedemptions: number;
}

interface UserReward {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  programId: string;
  rewardType: string;
  rewardValue: number;
  status: 'earned' | 'redeemed' | 'expired' | 'pending';
  earnedAt: string;
  redeemedAt?: string;
  expiresAt?: string;
}

interface RewardTier {
  id: string;
  name: string;
  pointsRequired: number;
  benefits: string[];
  color: string;
  icon: string;
}

const AdminRewardManagement: React.FC = () => {
  const [programs, setPrograms] = useState<RewardProgram[]>([
    {
      id: 'prog-001',
      name: 'Verification Milestone Rewards',
      description: 'Earn points for completing verification milestones',
      type: 'points',
      value: 100,
      isActive: true,
      startDate: '2024-01-01',
      eligibilityCriteria: ['Complete KYC verification', 'Upload 3+ documents'],
      targetAudience: 'individual',
      maxRedemptions: 1000,
      currentRedemptions: 245
    },
    {
      id: 'prog-002',
      name: 'Premium Upgrade Cashback',
      description: '10% cashback on first premium subscription',
      type: 'cashback',
      value: 10,
      currency: 'USD',
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      eligibilityCriteria: ['First-time premium subscriber', 'Annual subscription only'],
      targetAudience: 'all',
      maxRedemptions: 500,
      currentRedemptions: 89
    }
  ]);

  const [userRewards, setUserRewards] = useState<UserReward[]>([
    {
      id: 'reward-001',
      userId: 'user-123',
      userName: 'John Smith',
      userEmail: 'john@example.com',
      programId: 'prog-001',
      rewardType: 'points',
      rewardValue: 100,
      status: 'earned',
      earnedAt: '2024-01-15T10:30:00Z',
      expiresAt: '2024-07-15T10:30:00Z'
    }
  ]);

  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>([
    {
      id: 'tier-bronze',
      name: 'Bronze',
      pointsRequired: 0,
      benefits: ['Basic verification', 'Email support'],
      color: '#CD7F32',
      icon: 'award'
    },
    {
      id: 'tier-silver',
      name: 'Silver',
      pointsRequired: 500,
      benefits: ['Priority verification', 'Phone support', '5% discount'],
      color: '#C0C0C0',
      icon: 'star'
    },
    {
      id: 'tier-gold',
      name: 'Gold',
      pointsRequired: 1500,
      benefits: ['Express verification', 'Dedicated support', '15% discount', 'Premium features'],
      color: '#FFD700',
      icon: 'trophy'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'rewards' | 'tiers' | 'analytics'>('overview');
  const [selectedProgram, setSelectedProgram] = useState<RewardProgram | null>(null);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'earned': return 'bg-green-100 text-green-800';
      case 'redeemed': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRewardTypeIcon = (type: string) => {
    switch (type) {
      case 'points': return <StarIcon className="w-4 h-4" />;
      case 'badges': return <AwardIcon className="w-4 h-4" />;
      case 'cashback': return <GiftIcon className="w-4 h-4" />;
      case 'discount': return <DollarSignIcon className="w-4 h-4" />;
      case 'premium': return <FlashOnIcon className="w-4 h-4" />;
      default: return <GiftIcon className="w-4 h-4" />;
    }
  };

  const getTotalPointsDistributed = () => {
    return userRewards
      .filter(r => r.rewardType === 'points')
      .reduce((sum, r) => sum + r.rewardValue, 0);
  };

  const getActiveUsers = () => {
    return new Set(userRewards.map(r => r.userId)).size;
  };

  const filteredRewards = userRewards.filter(reward => {
    const matchesStatus = filterStatus === 'all' || reward.status === filterStatus;
    const matchesSearch = reward.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reward Management System</h1>
          <p className="text-gray-600 mt-2">Manage reward programs, points, and user incentives</p>
        </div>
        <button
          onClick={() => setShowProgramModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <AddIcon className="w-4 h-4" />
          Create Program
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUpIcon },
            { id: 'programs', label: 'Programs', icon: GiftIcon },
            { id: 'rewards', label: 'User Rewards', icon: AwardIcon },
            { id: 'tiers', label: 'Reward Tiers', icon: TrophyIcon },
            { id: 'analytics', label: 'Analytics', icon: DollarSignIcon }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Programs</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {programs.filter(p => p.isActive).length}
                  </p>
                </div>
                <GiftIcon className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Points Distributed</p>
                  <p className="text-2xl font-bold text-gray-900">{getTotalPointsDistributed().toLocaleString()}</p>
                </div>
                <StarIcon className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-gray-900">{getActiveUsers()}</p>
                </div>
                <UsersIcon className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Redemption Rate</p>
                  <p className="text-2xl font-bold text-gray-900">73%</p>
                </div>
                <TrophyIcon className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reward Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {userRewards.slice(0, 5).map((reward) => (
                  <div key={reward.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        {getRewardTypeIcon(reward.rewardType)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {reward.userName} earned {reward.rewardValue} {reward.rewardType}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(reward.earnedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reward.status)}`}>
                      {reward.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Programs Tab */}
      {activeTab === 'programs' && (
        <div className="bg-white rounded-lg shadow-soft border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Reward Programs</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {programs.map((program) => (
                <div key={program.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        {getRewardTypeIcon(program.type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{program.name}</h4>
                        <p className="text-sm text-gray-600">{program.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        program.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {program.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <button
                        onClick={() => setSelectedProgram(program)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <VisibilityIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Reward Value:</span>
                      <span className="font-medium">
                        {program.value} {program.currency || program.type}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Target:</span>
                      <span className="font-medium capitalize">{program.targetAudience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Redemptions:</span>
                      <span className="font-medium">
                        {program.currentRedemptions} / {program.maxRedemptions || '∞'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        <EditIcon className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        <SettingsIcon className="w-4 h-4 inline mr-1" />
                        Configure
                      </button>
                      <button className="text-red-600 hover:text-red-800 text-sm">
                        <DeleteIcon className="w-4 h-4 inline mr-1" />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* User Rewards Tab */}
      {activeTab === 'rewards' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-soft border">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <SearchIcon className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-64"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <FilterListIcon className="w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="earned">Earned</option>
                  <option value="redeemed">Redeemed</option>
                  <option value="expired">Expired</option>
                  <option value="pending">Pending</option>
                </select>
              </div>
            </div>
          </div>

          {/* Rewards Table */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Earned Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expires</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRewards.map((reward) => (
                    <tr key={reward.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{reward.userName}</div>
                          <div className="text-sm text-gray-500">{reward.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {getRewardTypeIcon(reward.rewardType)}
                          <span className="text-sm text-gray-900 capitalize">{reward.rewardType}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {reward.rewardValue}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(reward.status)}`}>
                          {reward.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(reward.earnedAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {reward.expiresAt ? new Date(reward.expiresAt).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <VisibilityIcon className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <GiftIcon className="w-4 h-4" />
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
      )}

      {/* Reward Tiers Tab */}
      {activeTab === 'tiers' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Reward Tiers</h3>
              <p className="text-sm text-gray-600 mt-1">Configure user tiers based on points and activity</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {rewardTiers.map((tier) => (
                  <div key={tier.id} className="border rounded-lg p-6 text-center">
                    <div 
                      className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                      style={{ backgroundColor: `${tier.color}20` }}
                    >
                      <TrophyIcon className="w-8 h-8" style={{ color: tier.color }} />
                    </div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      {tier.pointsRequired === 0 ? 'Starting tier' : `${tier.pointsRequired} points required`}
                    </p>
                    <div className="space-y-2">
                      {tier.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-gray-700">
                          <StarIcon className="w-4 h-4 text-yellow-500" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        <EditIcon className="w-4 h-4 inline mr-1" />
                        Edit Tier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reward Distribution</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Points Rewards</span>
                  <span className="font-bold text-2xl text-yellow-600">65%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Cashback Rewards</span>
                  <span className="font-bold text-2xl text-green-600">25%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Premium Upgrades</span>
                  <span className="font-bold text-2xl text-blue-600">10%</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">User Engagement</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Active Participants</span>
                  <span className="font-bold text-2xl text-primary-600">1,247</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Monthly Growth</span>
                  <span className="font-bold text-green-600">+18%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Avg. Points per User</span>
                  <span className="font-bold text-gray-900">342</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRewardManagement;