import React, { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Filter,
  Search,
  Eye,
  Flag,
  Trash2,
  BarChart3,
  Award,
  AlertTriangle
} from 'lucide-react';

interface Rating {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceType: 'verification' | 'support' | 'platform' | 'feature';
  rating: number;
  review?: string;
  isVerified: boolean;
  isPublic: boolean;
  isFlagged: boolean;
  createdAt: string;
  updatedAt: string;
  adminResponse?: string;
  helpfulVotes: number;
  reportCount: number;
}

interface RatingStats {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: { [key: number]: number };
  monthlyTrend: { month: string; rating: number; count: number }[];
}

const AdminRatingsManagement: React.FC = () => {
  const [ratings, setRatings] = useState<Rating[]>([
    {
      id: 'rating-001',
      userId: 'user-123',
      userName: 'John Smith',
      userEmail: 'john@example.com',
      serviceType: 'verification',
      rating: 5,
      review: 'Excellent verification process. Quick and secure!',
      isVerified: true,
      isPublic: true,
      isFlagged: false,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T10:30:00Z',
      helpfulVotes: 12,
      reportCount: 0
    },
    {
      id: 'rating-002',
      userId: 'user-456',
      userName: 'Sarah Johnson',
      userEmail: 'sarah@example.com',
      serviceType: 'support',
      rating: 4,
      review: 'Good customer support, but response time could be improved.',
      isVerified: true,
      isPublic: true,
      isFlagged: false,
      createdAt: '2024-01-14T15:20:00Z',
      updatedAt: '2024-01-14T15:20:00Z',
      helpfulVotes: 8,
      reportCount: 0
    },
    {
      id: 'rating-003',
      userId: 'user-789',
      userName: 'Mike Wilson',
      userEmail: 'mike@example.com',
      serviceType: 'platform',
      rating: 2,
      review: 'Platform is confusing and hard to navigate. Needs improvement.',
      isVerified: true,
      isPublic: true,
      isFlagged: true,
      createdAt: '2024-01-13T09:45:00Z',
      updatedAt: '2024-01-13T09:45:00Z',
      adminResponse: 'Thank you for your feedback. We are working on improving the user interface.',
      helpfulVotes: 3,
      reportCount: 2
    }
  ]);

  const [stats] = useState<RatingStats>({
    averageRating: 4.2,
    totalRatings: 1247,
    ratingDistribution: {
      5: 520,
      4: 380,
      3: 200,
      2: 97,
      1: 50
    },
    monthlyTrend: [
      { month: 'Jan', rating: 4.1, count: 156 },
      { month: 'Feb', rating: 4.3, count: 189 },
      { month: 'Mar', rating: 4.2, count: 203 }
    ]
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'ratings' | 'analytics' | 'moderation'>('overview');
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);
  const [filterService, setFilterService] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFlaggedOnly, setShowFlaggedOnly] = useState(false);

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getServiceTypeColor = (type: string) => {
    switch (type) {
      case 'verification': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-green-100 text-green-800';
      case 'platform': return 'bg-purple-100 text-purple-800';
      case 'feature': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'sm') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-6 h-6';
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredRatings = ratings.filter(rating => {
    const matchesService = filterService === 'all' || rating.serviceType === filterService;
    const matchesRating = filterRating === 'all' || rating.rating.toString() === filterRating;
    const matchesSearch = rating.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rating.review?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rating.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFlagged = !showFlaggedOnly || rating.isFlagged;
    return matchesService && matchesRating && matchesSearch && matchesFlagged;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ratings Management System</h1>
          <p className="text-gray-600 mt-2">Monitor and manage user ratings and reviews</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">{stats.averageRating}</span>
            {renderStars(Math.round(stats.averageRating), 'md')}
            <span className="text-sm text-gray-600">({stats.totalRatings} reviews)</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'ratings', label: 'All Ratings', icon: Star },
            { id: 'analytics', label: 'Analytics', icon: TrendingUp },
            { id: 'moderation', label: 'Moderation', icon: Flag }
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
                  <p className="text-sm font-medium text-gray-600">Average Rating</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.averageRating}</p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalRatings.toLocaleString()}</p>
                </div>
                <MessageSquare className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Flagged Reviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {ratings.filter(r => r.isFlagged).length}
                  </p>
                </div>
                <Flag className="w-8 h-8 text-red-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Response Rate</p>
                  <p className="text-2xl font-bold text-gray-900">78%</p>
                </div>
                <Award className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Rating Distribution */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Rating Distribution</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-4">
                    <div className="flex items-center gap-2 w-16">
                      <span className="text-sm font-medium">{rating}</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{
                          width: `${(stats.ratingDistribution[rating] / stats.totalRatings) * 100}%`
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">
                      {stats.ratingDistribution[rating]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Recent Reviews</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {ratings.slice(0, 3).map((rating) => (
                  <div key={rating.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{rating.userName}</p>
                          <div className="flex items-center gap-2">
                            {renderStars(rating.rating)}
                            <span className="text-sm text-gray-600">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getServiceTypeColor(rating.serviceType)}`}>
                        {rating.serviceType}
                      </span>
                    </div>
                    {rating.review && (
                      <p className="text-gray-700 mb-3">{rating.review}</p>
                    )}
                    {rating.adminResponse && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3">
                        <p className="text-sm text-blue-800">
                          <strong>Admin Response:</strong> {rating.adminResponse}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* All Ratings Tab */}
      {activeTab === 'ratings' && (
        <div className="space-y-6">
          {/* Filters */}
          <div className="bg-white p-4 rounded-lg shadow-soft border">
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 w-64"
                />
              </div>
              
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={filterService}
                  onChange={(e) => setFilterService(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="all">All Services</option>
                  <option value="verification">Verification</option>
                  <option value="support">Support</option>
                  <option value="platform">Platform</option>
                  <option value="feature">Feature</option>
                </select>
              </div>

              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showFlaggedOnly}
                  onChange={(e) => setShowFlaggedOnly(e.target.checked)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm text-gray-700">Flagged only</span>
              </label>
            </div>
          </div>

          {/* Ratings List */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Review</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRatings.map((rating) => (
                    <tr key={rating.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{rating.userName}</div>
                          <div className="text-sm text-gray-500">{rating.userEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getServiceTypeColor(rating.serviceType)}`}>
                          {rating.serviceType}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {renderStars(rating.rating)}
                          <span className={`font-medium ${getRatingColor(rating.rating)}`}>
                            {rating.rating}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <p className="text-sm text-gray-900 truncate">
                            {rating.review || 'No review provided'}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {rating.isFlagged && (
                            <span className="flex items-center gap-1 text-red-600">
                              <Flag className="w-4 h-4" />
                              <span className="text-xs">Flagged</span>
                            </span>
                          )}
                          {rating.isVerified && (
                            <span className="flex items-center gap-1 text-green-600">
                              <Award className="w-4 h-4" />
                              <span className="text-xs">Verified</span>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedRating(rating)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-yellow-600 hover:text-yellow-900">
                            <Flag className="w-4 h-4" />
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
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Performance</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Verification Service</span>
                  <div className="flex items-center gap-2">
                    {renderStars(4.5)}
                    <span className="font-bold text-green-600">4.5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Customer Support</span>
                  <div className="flex items-center gap-2">
                    {renderStars(4.2)}
                    <span className="font-bold text-yellow-600">4.2</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Platform Usability</span>
                  <div className="flex items-center gap-2">
                    {renderStars(3.8)}
                    <span className="font-bold text-orange-600">3.8</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Trends</h3>
              <div className="space-y-4">
                {stats.monthlyTrend.map((month) => (
                  <div key={month.month} className="flex justify-between items-center">
                    <span className="text-gray-600">{month.month} 2024</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">({month.count} reviews)</span>
                      <span className="font-bold">{month.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Moderation Tab */}
      {activeTab === 'moderation' && (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Flagged Reviews</h3>
              <p className="text-sm text-gray-600 mt-1">Reviews that require moderation attention</p>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {ratings.filter(r => r.isFlagged).map((rating) => (
                  <div key={rating.id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="font-medium text-gray-900">{rating.userName}</p>
                          <div className="flex items-center gap-2">
                            {renderStars(rating.rating)}
                            <span className="text-sm text-gray-600">
                              {new Date(rating.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-red-600">
                          {rating.reportCount} reports
                        </span>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">
                          Review
                        </button>
                      </div>
                    </div>
                    {rating.review && (
                      <p className="text-gray-700 mb-3 pl-8">{rating.review}</p>
                    )}
                    {rating.adminResponse && (
                      <div className="bg-blue-50 border-l-4 border-blue-400 p-3 ml-8">
                        <p className="text-sm text-blue-800">
                          <strong>Admin Response:</strong> {rating.adminResponse}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Rating Detail Modal */}
      {selectedRating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-hard max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Review Details</h2>
                  <p className="text-gray-600">Review ID: {selectedRating.id}</p>
                </div>
                <button
                  onClick={() => setSelectedRating(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">User Information</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Name:</strong> {selectedRating.userName}</div>
                    <div><strong>Email:</strong> {selectedRating.userEmail}</div>
                    <div><strong>Verified:</strong> {selectedRating.isVerified ? 'Yes' : 'No'}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Review Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Service:</strong> {selectedRating.serviceType}</div>
                    <div><strong>Rating:</strong> {renderStars(selectedRating.rating)} ({selectedRating.rating}/5)</div>
                    <div><strong>Date:</strong> {new Date(selectedRating.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {selectedRating.review && (
                <div>
                  <h3 className="font-semibold mb-2">Review Text</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedRating.review}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Engagement</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span>{selectedRating.helpfulVotes} helpful votes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Flag className="w-4 h-4 text-red-600" />
                      <span>{selectedRating.reportCount} reports</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Status</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Public:</strong> {selectedRating.isPublic ? 'Yes' : 'No'}</div>
                    <div><strong>Flagged:</strong> {selectedRating.isFlagged ? 'Yes' : 'No'}</div>
                  </div>
                </div>
              </div>

              {selectedRating.adminResponse && (
                <div>
                  <h3 className="font-semibold mb-2">Admin Response</h3>
                  <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    {selectedRating.adminResponse}
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Flag Review
                </button>
                <button className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                  Add Response
                </button>
                <button className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
                  Remove Review
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminRatingsManagement;