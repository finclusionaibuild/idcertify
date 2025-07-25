import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "./contexts/AuthContext";
import { Shield, User, Building, Settings, ArrowRight, Eye } from 'lucide-react'
import { mockUsers } from "./lib/mockData";

const DemoLogin = () => {
  const [loading, setLoading] = useState<string | null>(null)
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleDemoLogin = async (email: string, userType: string) => {
    setLoading(userType)
    
    try {
      await signIn(email, 'demo-password')
      navigate('/dashboard')
    } catch (error) {
      console.error('Demo login error:', error)
    } finally {
      setLoading(null)
    }
  }

  const demoAccounts = [
    {
      id: 'individual',
      title: 'Individual User',
      subtitle: 'Personal Identity Management',
      email: 'john.doe@example.com',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-200',
      hoverColor: 'hover:border-blue-300',
      features: [
        'Upload and manage personal documents',
        'Respond to verification requests',
        'Track trust score and ratings',
        'Manage wallet and transactions'
      ],
      profile: mockUsers.find(u => u.email === 'john.doe@example.com')
    },
    {
      id: 'organisation',
      title: 'Organisation',
      subtitle: 'Business Verification Management',
      email: 'contact@techcorp.com',
      icon: Building,
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-200',
      hoverColor: 'hover:border-green-300',
      features: [
        'Create verification requests',
        'Manage staff and team members',
        'Access API keys and integrations',
        'View verification analytics'
      ],
      profile: mockUsers.find(u => u.email === 'contact@techcorp.com')
    },
    {
      id: 'admin',
      title: 'System Administrator',
      subtitle: 'Platform Management & Oversight',
      email: 'admin@idcertify.com',
      icon: Settings,
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-200',
      hoverColor: 'hover:border-purple-300',
      features: [
      // Store role in localStorage for dashboard routing
      localStorage.setItem('userRole', roleId);
        'Manage all users and organisations',
        'Review verification requests',
        'Configure system settings',
        'View platform analytics'
      ],
      profile: mockUsers.find(u => u.email === 'admin@idcertify.com')
    },
    {
      id: 'superadmin',
      title: 'Super Administrator',
      subtitle: 'Complete Platform Control',
      email: 'superadmin@idcertify.com',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      borderColor: 'border-red-200',
      hoverColor: 'hover:border-red-300',
      features: [
        'Full system administration access',
        'Manage all verification processes',
        'Configure global security settings',
        'Access advanced analytics and reports'
      ],
      profile: mockUsers.find(u => u.email === 'superadmin@idcertify.com')
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Shield className="w-8 h-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">IDCertify</span>
              <span className="ml-2 px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                DEMO
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Eye className="w-4 h-4" />
              <span>Demo Environment</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to IDCertify Demo
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Experience our digital identity verification platform from different user perspectives. 
            Click any demo account below to instantly access the dashboard.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
            <Shield className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-blue-800 font-medium">No registration required - One-click demo access</span>
          </div>
        </div>

        {/* Demo Accounts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {demoAccounts.map((account) => (
            <div
              key={account.id}
              className={`bg-white rounded-xl shadow-lg border-2 ${account.borderColor} ${account.hoverColor} transition-all duration-300 hover:shadow-xl hover:scale-105`}
            >
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${account.color} p-6 rounded-t-xl`}>
                <div className="flex items-center justify-between text-white">
                  <div>
                    <account.icon className="w-8 h-8 mb-2" />
                    <h3 className="text-xl font-bold">{account.title}</h3>
                    <p className="text-blue-100 text-sm">{account.subtitle}</p>
                  </div>
                  {account.profile && (
                    <div className="text-right">
                      <div className="text-2xl font-bold">{account.profile.trust_score}</div>
                      <div className="text-xs text-blue-100">Trust Score</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                {/* Profile Info */}
                {account.profile && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {account.profile.role === 'organisation' 
                            ? account.profile.company_name 
                            : `${account.profile.first_name} ${account.profile.last_name}`
                          }
                        </p>
                        <p className="text-sm text-gray-500">{account.profile.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        account.profile.kyc_status === 'verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {account.profile.kyc_status === 'verified' ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  </div>
                )}

                {/* Features List */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">What you can explore:</h4>
                  <ul className="space-y-2">
                    {account.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Login Button */}
                <button
                  onClick={() => handleDemoLogin(account.email, account.id)}
                  disabled={loading === account.id}
                  className={`w-full bg-gradient-to-r ${account.color} text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center`}
                >
                  {loading === account.id ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <span>Access {account.title} Demo</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Features Overview */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Platform Features Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Shield,
                title: 'Identity Verification',
                description: 'Secure document verification with biometric validation'
              },
              {
                icon: User,
                title: 'Trust Scoring',
                description: 'Dynamic trust scores based on verification history'
              },
              {
                icon: Building,
                title: 'Organization Management',
                description: 'Complete workflow management for businesses'
              },
              {
                icon: Settings,
                title: 'Admin Controls',
                description: 'Comprehensive platform administration tools'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-medium text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 animate-pulse"></div>
            <span className="text-yellow-800 text-sm">
              This is a demo environment with mock data. All actions are simulated and no real data is processed.
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DemoLogin