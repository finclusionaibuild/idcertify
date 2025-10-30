import React, { useState } from 'react'
import { HelpCircle, BookOpen, MessageCircle, Video, FileText, ExternalLink, Search, Mail, Phone, Clock, Star, Users, Shield, CreditCard, Settings, Code } from 'lucide-react'

const HelpCenter: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const helpCategories = [
    { id: 'all', name: 'All Topics', icon: HelpCircle, count: 0 },
    { id: 'getting-started', name: 'Getting Started', icon: BookOpen, count: 5 },
    { id: 'kyc-verification', name: 'KYC Verification', icon: Shield, count: 8 },
    { id: 'payments', name: 'Payments & Billing', icon: CreditCard, count: 6 },
    { id: 'account', name: 'Account & Settings', icon: Settings, count: 4 },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: HelpCircle, count: 7 }
  ]

  const helpArticles = [
    {
      id: '1',
      title: 'Getting Started with IDCertify',
      description: 'Learn the basics of using IDCertify for identity verification',
      category: 'getting-started',
      icon: BookOpen,
      readTime: '5 min read',
      difficulty: 'Beginner',
      featured: true
    },
    {
      id: '2',
      title: 'Complete KYC Verification Process',
      description: 'Step-by-step guide to complete your identity verification',
      category: 'kyc-verification',
      icon: Shield,
      readTime: '8 min read',
      difficulty: 'Intermediate',
      featured: true
    },
    {
      id: '3',
      title: 'Understanding Verification Tiers',
      description: 'Learn about different verification levels and requirements',
      category: 'kyc-verification',
      icon: Shield,
      readTime: '6 min read',
      difficulty: 'Beginner',
      featured: false
    },
    {
      id: '4',
      title: 'Payment Methods and Billing',
      description: 'How to add payment methods and manage your billing',
      category: 'payments',
      icon: CreditCard,
      readTime: '4 min read',
      difficulty: 'Beginner',
      featured: false
    },
    {
      id: '5',
      title: 'Account Security Best Practices',
      description: 'Keep your account secure with these best practices',
      category: 'account',
      icon: Settings,
      readTime: '7 min read',
      difficulty: 'Intermediate',
      featured: true
    },
    {
      id: '6',
      title: 'Troubleshooting Common Issues',
      description: 'Solutions for common problems you might encounter',
      category: 'troubleshooting',
      icon: HelpCircle,
      readTime: '10 min read',
      difficulty: 'Intermediate',
      featured: false
    },
    {
      id: '7',
      title: 'Document Upload Guidelines',
      description: 'Learn what documents are accepted and how to upload them',
      category: 'kyc-verification',
      icon: FileText,
      readTime: '5 min read',
      difficulty: 'Beginner',
      featured: false
    },
    {
      id: '8',
      title: 'API Integration Guide',
      description: 'Technical documentation for developers integrating IDCertify',
      category: 'getting-started',
      icon: Code,
      readTime: '15 min read',
      difficulty: 'Advanced',
      featured: false
    }
  ]

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-700'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-700'
      case 'Advanced':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const handleArticleClick = (article: any) => {
    // In a real app, this would navigate to the article page
    console.log('Navigate to article:', article.title)
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="text-center mb-8">
          <HelpCircle className="w-16 h-16 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Help Center</h1>
          <p className="text-gray-600 text-lg">Find answers to your questions and learn how to use IDCertify</p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
            <input
              type="text"
              placeholder="Search for help articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">{helpArticles.length}</p>
            <p className="text-sm text-gray-600">Help Articles</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">24/7</p>
            <p className="text-sm text-gray-600">Support Available</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">&lt;2h</p>
            <p className="text-sm text-gray-600">Response Time</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
            <Star className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">98%</p>
            <p className="text-sm text-gray-600">Satisfaction Rate</p>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {helpCategories.map((category) => {
            const IconComponent = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 hover:bg-gray-50'
                }`}
              >
                <IconComponent className="w-6 h-6 mx-auto mb-2" />
                <p className="text-sm font-medium">{category.name}</p>
                {category.count > 0 && (
                  <p className="text-xs text-gray-500 mt-1">{category.count} articles</p>
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Featured Articles */}
      {selectedCategory === 'all' && searchQuery === '' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helpArticles.filter(article => article.featured).map((article) => {
              const IconComponent = article.icon
              return (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <IconComponent className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{article.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{article.readTime}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* All Articles */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {selectedCategory === 'all' ? 'All Articles' : `${helpCategories.find(c => c.id === selectedCategory)?.name} Articles`}
          </h2>
          <span className="text-sm text-gray-500">{filteredArticles.length} articles found</span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-500">Try adjusting your search or category filter</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.map((article) => {
              const IconComponent = article.icon
              return (
                <div
                  key={article.id}
                  onClick={() => handleArticleClick(article)}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer"
                >
                  <div className="flex items-start space-x-4">
                    <IconComponent className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900 mb-2">{article.title}</h3>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-gray-600 mb-3">{article.description}</p>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(article.difficulty)}`}>
                          {article.difficulty}
                        </span>
                        {article.featured && (
                          <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-700">
                            Featured
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <div className="text-center">
          <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Still need help?</h2>
          <p className="text-gray-600 mb-6">Our support team is here to help you 24/7</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Mail className="w-4 h-4" />
              <span>Email Support</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Phone className="w-4 h-4" />
              <span>Call Support</span>
            </button>
            <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>Live Chat</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpCenter
