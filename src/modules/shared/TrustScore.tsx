import React, { useState } from 'react'
import ShieldIcon from '@mui/icons-material/Security';
import AwardIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import UsersIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AlertTriangleIcon from '@mui/icons-material/Warning';
import StarIcon from '@mui/icons-material/Star';
import ArrowRightIcon from '@mui/icons-material/ArrowForward';
import ZapIcon from '@mui/icons-material/Flash';
import { 
  TrendingUp, 
  Shield, 
  FileText, 
  User, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertCircle,
  Star,
  Target,
  BarChart3,
  Calendar,
  Info,
  ChevronRight,
  Plus,
  Eye,
  Download,
  RefreshCw,
  Minus,
  X,
  ArrowRight,
  Building,
  GraduationCap,
  MapPin,
  UserCheck,
  Phone,
  Mail,
  CreditCard,
  Zap
} from 'lucide-react'
import { useAuth } from "@shared/contexts/AuthContext";
import { getTrustScoreBadge } from "./lib/mockData";

const TrustScore = () => {
  const { profile } = useAuth()
  const [selectedTimeframe, setSelectedTimeframe] = useState('6 months')
  const [showImprovementModal, setShowImprovementModal] = useState(false)
  const [selectedImprovement, setSelectedImprovement] = useState<string | null>(null)

  const trustScore = profile?.trust_score || 85
  const trustScoreBadge = getTrustScoreBadge(trustScore)

  // Mock data for trust score factors
  const trustFactors = [
    {
      category: 'Identity Verification',
      score: 95,
      weight: 30,
      status: 'verified',
      icon: Shield,
      description: 'Government-issued ID documents verified',
      lastUpdated: '2 days ago',
      items: [
        { name: 'National ID', status: 'verified', score: 98 },
        { name: 'Passport', status: 'verified', score: 92 },
        { name: 'Driver License', status: 'pending', score: 0 }
      ]
    },
    {
      category: 'Address Verification',
      score: 78,
      weight: 20,
      status: 'partial',
      icon: FileText,
      description: 'Residential address confirmation',
      lastUpdated: '1 week ago',
      items: [
        { name: 'Utility Bill', status: 'verified', score: 85 },
        { name: 'Bank Statement', status: 'pending', score: 0 },
        { name: 'Lease Agreement', status: 'rejected', score: 0 }
      ]
    },
    {
      category: 'Employment History',
      score: 82,
      weight: 25,
      status: 'verified',
      icon: User,
      description: 'Professional background verification',
      lastUpdated: '3 days ago',
      items: [
        { name: 'Current Employer', status: 'verified', score: 90 },
        { name: 'Previous Employer', status: 'verified', score: 74 },
        { name: 'Professional License', status: 'pending', score: 0 }
      ]
    },
    {
      category: 'Education Credentials',
      score: 88,
      weight: 15,
      status: 'verified',
      icon: Award,
      description: 'Academic qualifications verification',
      lastUpdated: '5 days ago',
      items: [
        { name: 'University Degree', status: 'verified', score: 92 },
        { name: 'Professional Certificate', status: 'verified', score: 84 },
        { name: 'Secondary School', status: 'verified', score: 88 }
      ]
    },
    {
      category: 'Social Attestations',
      score: 65,
      weight: 10,
      status: 'partial',
      icon: Star,
      description: 'Community and peer verifications',
      lastUpdated: '1 month ago',
      items: [
        { name: 'Character References', status: 'verified', score: 70 },
        { name: 'Professional References', status: 'pending', score: 0 },
        { name: 'Community Endorsements', status: 'partial', score: 60 }
      ]
    }
  ]

  // Mock historical data
  const historicalData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 68 },
    { month: 'Mar', score: 72 },
    { month: 'Apr', score: 75 },
    { month: 'May', score: 78 },
    { month: 'Jun', score: 82 },
    { month: 'Jul', score: 85 }
  ]

  // Improvement recommendations
  const improvementRecommendations = [
    {
      id: 'address',
      title: 'Complete Address Verification',
      description: 'Upload a recent bank statement or lease agreement to verify your address',
      impact: '+8 points',
      difficulty: 'Easy',
      time: '5 minutes',
      category: 'Address Verification',
      steps: [
        'Go to your Biobank',
        'Upload a recent bank statement (last 3 months)',
        'Or upload a signed lease agreement',
        'Wait for verification (usually 24-48 hours)'
      ],
      documents: ['Bank Statement', 'Lease Agreement', 'Utility Bill'],
      currentScore: 78,
      potentialScore: 86
    },
    {
      id: 'references',
      title: 'Add Professional References',
      description: 'Get attestations from colleagues or supervisors to boost your credibility',
      impact: '+5 points',
      difficulty: 'Medium',
      time: '15 minutes',
      category: 'Social Attestations',
      steps: [
        'Go to Attestation section',
        'Request professional references from 2-3 colleagues',
        'Provide their contact information',
        'Follow up to ensure they complete the attestation'
      ],
      documents: [],
      currentScore: 65,
      potentialScore: 70
    },
    {
      id: 'license',
      title: 'Verify Driver License',
      description: 'Add your driver license to strengthen your identity verification',
      impact: '+3 points',
      difficulty: 'Easy',
      time: '3 minutes',
      category: 'Identity Verification',
      steps: [
        'Go to your Biobank',
        'Upload clear photos of your driver license (front and back)',
        'Ensure all text is clearly visible',
        'Submit for verification'
      ],
      documents: ['Driver License'],
      currentScore: 95,
      potentialScore: 98
    },
    {
      id: 'endorsements',
      title: 'Get Community Endorsements',
      description: 'Request endorsements from community members or organizations',
      impact: '+4 points',
      difficulty: 'Medium',
      time: '30 minutes',
      category: 'Social Attestations',
      steps: [
        'Identify community leaders or organization heads',
        'Request endorsements through the platform',
        'Provide context about your community involvement',
        'Follow up on pending requests'
      ],
      documents: [],
      currentScore: 65,
      potentialScore: 69
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />
      case 'partial':
        return <AlertCircle className="w-5 h-5 text-orange-500" />
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-500" />
      default:
        return <Clock className="w-5 h-5 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'partial':
        return 'bg-orange-100 text-orange-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'bg-green-100 text-green-800'
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'Hard':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleStartImprovement = (recommendationId: string) => {
    const recommendation = improvementRecommendations.find(r => r.id === recommendationId)
    if (!recommendation) return

    // Navigate based on the recommendation type
    switch (recommendationId) {
      case 'address':
      case 'license':
        // Navigate to Biobank
        window.location.href = '/biobank'
        break
      case 'references':
      case 'endorsements':
        // Navigate to Attestation
        window.location.href = '/attestation'
        break
      default:
        break
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trust Score</h1>
          <p className="text-gray-600 mt-1">Monitor and improve your identity verification score</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </button>
          <button 
            onClick={() => setShowImprovementModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Improve Score
          </button>
        </div>
      </div>

      {/* Trust Score Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Score Card */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm p-8 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Current Trust Score</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <select 
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option>6 months</option>
                <option>1 year</option>
                <option>All time</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-8 mb-8">
            {/* Circular Progress */}
            <div className="relative">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
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
                  strokeDasharray={`${trustScore}, 100`}
                  strokeLinecap="round"
                  fill="transparent"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-3xl font-bold text-gray-900">{trustScore}</span>
                  <p className="text-sm text-gray-500">out of 100</p>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${trustScoreBadge.color}`}>
                  {trustScoreBadge.label}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-600">+12 points this month</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">15 points to next level</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-purple-500" />
                  <span className="text-sm text-gray-600">Top 25% of users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Historical Chart */}
          <div className="border-t pt-6">
            <h4 className="font-medium text-gray-900 mb-4">Score History</h4>
            <div className="h-32 flex items-end justify-between space-x-2">
              {historicalData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-primary-500 rounded-t transition-all duration-500 hover:bg-primary-600"
                    style={{ height: `${(data.score / 100) * 100}px` }}
                    title={`${data.month}: ${data.score}`}
                  ></div>
                  <span className="text-xs text-gray-500 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Score Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Score Breakdown</h3>
          
          <div className="space-y-4">
            {trustFactors.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <factor.icon className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{factor.category}</p>
                    <p className="text-xs text-gray-500">{factor.weight}% weight</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{factor.score}</p>
                  {getStatusIcon(factor.status)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Weighted Average</span>
              <span className="font-bold text-gray-900">{trustScore}/100</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Factors Detail */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Trust Score Factors</h3>
          <p className="text-gray-600 mt-1">Detailed breakdown of verification categories</p>
        </div>
        
        <div className="divide-y divide-gray-200">
          {trustFactors.map((factor, index) => (
            <div key={index} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <factor.icon className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{factor.category}</h4>
                    <p className="text-sm text-gray-600 mt-1">{factor.description}</p>
                    <p className="text-xs text-gray-500 mt-2">Last updated: {factor.lastUpdated}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl font-bold text-gray-900">{factor.score}</span>
                    <span className="text-sm text-gray-500">/ 100</span>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(factor.status)}`}>
                    {factor.status.charAt(0).toUpperCase() + factor.status.slice(1)}
                  </span>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${factor.score}%` }}
                  ></div>
                </div>
              </div>
              
              {/* Sub-items */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {factor.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Score</span>
                      <span className="text-sm font-bold text-gray-900">{item.score}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Improvement Recommendations */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Improve Your Trust Score</h3>
            <p className="text-gray-600 mb-4">Complete these actions to increase your trust score and unlock more opportunities.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {improvementRecommendations.map((recommendation, index) => (
                <div key={index} className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">{recommendation.title}</h4>
                    <span className="text-sm font-bold text-green-600">{recommendation.impact}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recommendation.difficulty)}`}>
                      {recommendation.difficulty}
                    </span>
                    <span>{recommendation.time}</span>
                  </div>
                  <button
                    onClick={() => setSelectedImprovement(recommendation.id)}
                    className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                  >
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Improvement Modal */}
      {showImprovementModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Improve Your Trust Score</h2>
                <button 
                  onClick={() => setShowImprovementModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {improvementRecommendations.map((recommendation) => (
                  <div key={recommendation.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{recommendation.title}</h3>
                        <p className="text-sm text-gray-600 mb-3">{recommendation.description}</p>
                        
                        <div className="flex items-center space-x-4 mb-4">
                          <span className="text-lg font-bold text-green-600">{recommendation.impact}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recommendation.difficulty)}`}>
                            {recommendation.difficulty}
                          </span>
                          <span className="text-sm text-gray-500">{recommendation.time}</span>
                        </div>
                        
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2">Score Impact:</p>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{recommendation.currentScore}</span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-bold text-green-600">{recommendation.potentialScore}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Steps to Complete:</h4>
                      <ol className="list-decimal list-inside space-y-1">
                        {recommendation.steps.map((step, index) => (
                          <li key={index} className="text-sm text-gray-600">{step}</li>
                        ))}
                      </ol>
                    </div>
                    
                    {recommendation.documents.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-gray-900 mb-2">Required Documents:</h4>
                        <div className="flex flex-wrap gap-2">
                          {recommendation.documents.map((doc, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                              {doc}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <button
                      onClick={() => handleStartImprovement(recommendation.id)}
                      className="w-full bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Start Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Individual Improvement Detail Modal */}
      {selectedImprovement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {(() => {
              const recommendation = improvementRecommendations.find(r => r.id === selectedImprovement)
              if (!recommendation) return null
              
              return (
                <>
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-bold text-gray-900">{recommendation.title}</h2>
                      <button 
                        onClick={() => setSelectedImprovement(null)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6 space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="font-medium text-green-900">Potential Impact</p>
                          <p className="text-sm text-green-700">
                            Increase your trust score by {recommendation.impact} ({recommendation.currentScore} → {recommendation.potentialScore})
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">What you need to do:</h3>
                      <p className="text-gray-600 mb-4">{recommendation.description}</p>
                      
                      <div className="space-y-3">
                        {recommendation.steps.map((step, index) => (
                          <div key={index} className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                              {index + 1}
                            </div>
                            <p className="text-sm text-gray-700">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {recommendation.documents.length > 0 && (
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Required Documents:</h3>
                        <div className="grid grid-cols-1 gap-2">
                          {recommendation.documents.map((doc, index) => (
                            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                              <FileText className="w-5 h-5 text-gray-600" />
                              <span className="text-sm text-gray-700">{doc}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center space-x-3 pt-4 border-t">
                      <button 
                        onClick={() => setSelectedImprovement(null)}
                        className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                      >
                        Close
                      </button>
                      <button
                        onClick={() => handleStartImprovement(recommendation.id)}
                        className="flex-1 bg-primary-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Start Now
                      </button>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}
    </div>
  )
}

export default TrustScore