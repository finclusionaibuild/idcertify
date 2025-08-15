import React, { useState, useRef, useEffect } from 'react'
import { HelpCircle, BookOpen, MessageCircle, Video, FileText, ExternalLink, Search, X, ArrowRight } from 'lucide-react'
import { useNavigate, Link } from 'react-router-dom'

interface HelpDropdownProps {
  isOpen: boolean
  onClose: () => void
}

const HelpDropdown: React.FC<HelpDropdownProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Removed click-outside detection to prevent conflicts

  const helpItems = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'Learn the basics of using IDCertify',
      icon: BookOpen,
      category: 'guide',
      url: '/help/getting-started'
    },
    {
      id: 'kyc-process',
      title: 'KYC Verification Process',
      description: 'Complete guide to identity verification',
      icon: FileText,
      category: 'guide',
      url: '/help/kyc-process'
    },
    {
      id: 'video-tutorials',
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      icon: Video,
      category: 'tutorial',
      url: '/help/videos'
    },
    {
      id: 'contact-support',
      title: 'Contact Support',
      description: 'Get help from our support team',
      icon: MessageCircle,
      category: 'support',
      url: '/help/contact'
    },
    {
      id: 'faq',
      title: 'Frequently Asked Questions',
      description: 'Common questions and answers',
      icon: HelpCircle,
      category: 'guide',
      url: '/help/faq'
    },
    {
      id: 'documentation',
      title: 'API Documentation',
      description: 'Technical documentation for developers',
      icon: FileText,
      category: 'technical',
      url: '/help/api-docs'
    }
  ]

  const filteredItems = helpItems.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleItemClick = (item: any) => {
    // In a real app, this would navigate to the help page
    console.log('Navigate to:', item.url)
    // Don't close the dropdown when clicking on help items
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black bg-opacity-25" onClick={onClose} />
      <div 
        ref={dropdownRef}
        className="absolute top-16 right-4 w-96 bg-white rounded-lg shadow-xl border border-gray-200 max-h-96 flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Help & Support</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search help topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>

        {/* Help Items */}
        <div className="flex-1 overflow-y-auto max-h-64">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No results found</p>
              <p className="text-sm">Try searching for something else</p>
            </div>
          ) : (
            <div className="p-2">
              {filteredItems.map((item) => {
                const IconComponent = item.icon
                return (
                  <div
                    key={item.id}
                    onClick={() => handleItemClick(item)}
                    className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <IconComponent className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <h4 className="text-sm font-medium text-gray-900">
                          {item.title}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.description}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          item.category === 'guide' ? 'bg-blue-100 text-blue-700' :
                          item.category === 'tutorial' ? 'bg-green-100 text-green-700' :
                          item.category === 'support' ? 'bg-purple-100 text-purple-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer - Always visible */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {filteredItems.length} help topic{filteredItems.length !== 1 ? 's' : ''} found
            </span>
            <Link
              to="/help"
              onClick={() => {
                console.log('Navigating to help center...')
                onClose()
              }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center space-x-1 transition-colors"
            >
              <span>Help Center</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpDropdown
