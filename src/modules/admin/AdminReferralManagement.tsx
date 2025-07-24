import React, { useState } from 'react';
import { 
  PeopleIcon,
  CardGiftcardIcon,
  TrendingUpIcon,
  AttachMoneyIcon,
  ShareIcon,
  EmojiEventsIcon,
  CalendarTodayIcon,
  FilterListIcon,
  SearchIcon,
  AddIcon,
  EditIcon,
  DeleteIcon,
  VisibilityIcon,
  ContentCopyIcon,
  LaunchIcon
} from '@mui/icons-material';

interface ReferralProgram {
  id: string;
  name: string;
  description: string;
  type: 'percentage' | 'fixed' | 'tiered';
  reward: number;
  currency: string;
  isActive: boolean;
  startDate: string;
  endDate?: string;
  maxRewards?: number;
  minReferrals?: number;
  targetAudience: 'all' | 'individual' | 'organization';
  conditions: string[];
}

interface ReferralData {
  id: string;
  referrerId: string;
  referrerName: string;
  referrerEmail: string;
  refereeId: string;
  refereeName: string;
  refereeEmail: string;
  programId: string;
  status: 'pending' | 'completed' | 'paid' | 'cancelled';
  rewardAmount: number;
  currency: string;
  createdAt: string;
  completedAt?: string;
  paidAt?: string;
}

const AdminReferralManagement: React.FC = () => {
  const [programs, setPrograms] = useState<ReferralProgram[]>([
    {
      id: 'prog-001',
      name: 'Individual User Referral',
      description: 'Earn $50 for each successful individual user referral',
      type: 'fixed',
      reward: 50,
      currency: 'USD',
      isActive: true,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      maxRewards: 1000,
      minReferrals: 1,
      targetAudience: 'individual',
      conditions: ['Referee must complete KYC verification', 'Referee must remain active for 30 days']
    },
    {
      id: 'prog-002',
      name: 'Enterprise Referral Program',
      description: '10% commission on first year subscription',
      type: 'percentage',
      reward: 10,
      currency: 'USD',
      isActive: true,
      startDate: '2024-01-01',
      targetAudience: 'organization',
      conditions: ['Organization must sign annual contract', 'Minimum $10,000 contract value']
    }
  ]);

  const [referrals, setReferrals] = useState<ReferralData[]>([
    {
      id: 'ref-001',
      referrerId: 'user-123',
      referrerName: 'John Smith',
      referrerEmail: 'john@example.com',
      refereeId: 'user-456',
      refereeName: 'Jane Doe',
      refereeEmail: 'jane@example.com',
      programId: 'prog-001',
      status: 'completed',
      rewardAmount: 50,
      currency: 'USD',
      createdAt: '2024-01-10T10:00:00Z',
      completedAt: '2024-01-15T14:30:00Z',
      paidAt: '2024-01-16T09:00:00Z'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'overview' | 'programs' | 'referrals' | 'analytics'>('overview');
  const [selectedProgram, setSelectedProgram] = useState<ReferralProgram | null>(null);
  const [showProgramModal, setShowProgramModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'paid': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTotalRewards = () => {
    return referrals
      .filter(r => r.status === 'paid')
      .reduce((sum, r) => sum + r.rewardAmount, 0);
  };

  const getPendingRewards = () => {
    return referrals
      .filter(r => r.status === 'completed')
      .reduce((sum, r) => sum + r.rewardAmount, 0);
  };

  const filteredReferrals = referrals.filter(referral => {
    const matchesStatus = filterStatus === 'all' || referral.status === filterStatus;
    const matchesSearch = referral.referrerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.refereeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         referral.referrerEmail.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Referral Management System</h1>
          <p className="text-gray-600 mt-2">Manage referral programs and track referral performance</p>
        </div>
        <button
          onClick={() => setShowProgramModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Program
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'programs', label: 'Programs', icon: Gift },
            { id: 'referrals', label: 'Referrals', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: Award }
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
                <Gift className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{referrals.length}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rewards Paid</p>
                  <p className="text-2xl font-bold text-gray-900">${getTotalRewards().toLocaleString()}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending Rewards</p>
                  <p className="text-2xl font-bold text-gray-900">${getPendingRewards().toLocaleString()}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Referral Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {referrals.slice(0, 5).map((referral) => (
                  <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <Share2 className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {referral.referrerName} referred {referral.refereeName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {new Date(referral.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                        {referral.status}
                      </span>
                      <p className="text-sm font-medium text-gray-900 mt-1">
                        ${referral.rewardAmount}
                      </p>
                    </div>
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
            <h3 className="text-lg font-semibold text-gray-900">Referral Programs</h3>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {programs.map((program) => (
                <div key={program.id} className="border rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">{program.name}</h4>
                      <p className="text-sm text-gray-600">{program.description}</p>
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
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Reward:</span>
                      <span className="font-medium">
                        {program.type === 'percentage' ? `${program.reward}%` : `$${program.reward}`}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Target:</span>
                      <span className="font-medium capitalize">{program.targetAudience}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Duration:</span>
                      <span className="font-medium">
                        {new Date(program.startDate).toLocaleDateString()} - 
                        {program.endDate ? new Date(program.endDate).toLocaleDateString() : 'Ongoing'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <button className="text-blue-600 hover:text-blue-800 text-sm">
                        <Edit className="w-4 h-4 inline mr-1" />
                        Edit
                      </button>
                      <button className="text-green-600 hover:text-green-800 text-sm">
                        <Copy className="w-4 h-4 inline mr-1" />
                        Copy Link
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 text-sm">
                        <ExternalLink className="w-4 h-4 inline mr-1" />
                        Preview
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Referrals Tab */}
      {activeTab === 'referrals' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-soft border">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search referrals..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-64"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="paid">Paid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Referrals Table */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referrer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Referee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reward</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredReferrals.map((referral) => (
                    <tr key={referral.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{referral.referrerName}</div>
                          <div className="text-sm text-gray-500">{referral.referrerEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{referral.refereeName}</div>
                          <div className="text-sm text-gray-500">{referral.refereeEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {programs.find(p => p.id === referral.programId)?.name || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(referral.status)}`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        ${referral.rewardAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(referral.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-green-600 hover:text-green-900">
                            <DollarSign className="w-4 h-4" />
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

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Referral Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-bold text-2xl text-green-600">85%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Reward</span>
                  <span className="font-bold text-2xl text-blue-600">$75</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Top Referrer</span>
                  <span className="font-bold text-gray-900">John Smith</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">This Month</span>
                  <span className="font-bold text-2xl text-primary-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Last Month</span>
                  <span className="font-bold text-gray-600">18</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Growth</span>
                  <span className="font-bold text-green-600">+33%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReferralManagement;