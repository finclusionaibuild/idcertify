import React, { useState } from 'react'
import {
  Palette as PaletteIcon,
  Save as SaveIcon,
  Upload as UploadIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Settings as SettingsIcon,
  Image as ImageIcon,
  TextFields as TextFieldsIcon,
  ViewQuilt as ViewQuiltIcon,
  Smartphone as SmartphoneIcon,
  Monitor as MonitorIcon,
  Tablet as TabletIcon,
  Public as PublicIcon,
  Code as CodeIcon,
  Brush as BrushIcon,
  Layers as LayersIcon,
  Flash as FlashIcon,
  Star as StarIcon,
  Favorite as FavoriteIcon,
  Bookmark as BookmarkIcon,
  Share as ShareIcon,
import PaletteIcon from '@mui/icons-material/Palette';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ViewQuiltIcon from '@mui/icons-material/ViewQuilt';
import PublicIcon from '@mui/icons-material/Public';
import BrushIcon from '@mui/icons-material/Brush';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import UndoIcon from '@mui/icons-material/Undo';
import SaveIcon from '@mui/icons-material/Save';
import UploadIcon from '@mui/icons-material/Upload';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';

const AdminWhiteLabellingCustomization = () => {
  const [activeTab, setActiveTab] = useState<'branding' | 'layout' | 'notifications' | 'domains' | 'advanced'>('branding')
  const [loading, setLoading] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Mock branding settings
  const [brandingSettings, setBrandingSettings] = useState({
    primaryColor: '#B01116',
    secondaryColor: '#14b8a6',
    accentColor: '#fb923c',
    logoUrl: 'https://example.com/your-logo.png',
    faviconUrl: 'https://example.com/your-favicon.ico',
    platformName: 'IDCertify',
    supportEmail: 'support@idcertify.com',
    supportPhone: '+234-801-234-5678'
  })

  // Mock layout settings
  const [layoutSettings, setLayoutSettings] = useState({
    dashboardLayout: 'default', // 'default' | 'compact' | 'custom'
    sidebarPosition: 'left', // 'left' | 'right'
    headerVisibility: true,
    footerVisibility: true,
    customCss: '/* Add your custom CSS here */\nbody { font-family: "Inter", sans-serif; }',
    customJs: '/* Add your custom JavaScript here */\nconsole.log("Platform loaded!");'
  })

  // Mock notification settings (simplified, linked to AdminNotificationManagement)
  const [notificationSettings, setNotificationSettings] = useState({
    emailSenderName: 'IDCertify Notifications',
    emailSenderEmail: 'no-reply@idcertify.com',
    smsSenderId: 'IDCertify',
    inAppNotificationSound: true,
    pushNotificationSound: true
  })

  // Mock domain settings
  const [domainSettings, setDomainSettings] = useState({
    customDomainEnabled: false,
    customDomain: 'app.yourcompany.com',
    sslEnabled: true,
    dnsRecords: [
      { type: 'CNAME', host: 'app.yourcompany.com', value: 'idcertify.com' },
      { type: 'TXT', host: '_acme-challenge.app.yourcompany.com', value: 'your_ssl_challenge_token' }
    ]
  })

  const handleSaveBranding = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccessMessage('Branding settings saved successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving branding settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveLayout = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccessMessage('Layout settings saved successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving layout settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveNotifications = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccessMessage('Notification settings saved successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving notification settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSaveDomains = async () => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccessMessage('Domain settings saved successfully!')
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error saving domain settings:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">White-Labelling & Platform Customization</h1>
          <p className="text-gray-600 mt-1">Customize the look, feel, and behavior of your IDCertify platform instance</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Preview Changes
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center">
            <SaveIcon className="w-4 h-4 mr-2" />
            Save All Customizations
          </button>
        </div>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
          <p className="text-green-800">{successMessage}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('branding')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'branding'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <PaletteIcon className="w-4 h-4" />
            <span>Branding</span>
          </button>
          <button
            onClick={() => setActiveTab('layout')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'layout'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Layout</span>
          </button>
          <button
            onClick={() => setActiveTab('notifications')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'notifications'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Notifications</span>
          </button>
          <button
            onClick={() => setActiveTab('domains')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'domains'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Domains</span>
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
              activeTab === 'advanced'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Advanced</span>
          </button>
        </nav>
      </div>

      {/* Branding Tab */}
      {activeTab === 'branding' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Brand Identity</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Platform Name
              </label>
              <input
                type="text"
                value={brandingSettings.platformName}
                onChange={(e) => setBrandingSettings(prev => ({ ...prev, platformName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Primary Color
              </label>
              <input
                type="color"
                value={brandingSettings.primaryColor}
                onChange={(e) => setBrandingSettings(prev => ({ ...prev, primaryColor: e.target.value }))}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Secondary Color
              </label>
              <input
                type="color"
                value={brandingSettings.secondaryColor}
                onChange={(e) => setBrandingSettings(prev => ({ ...prev, secondaryColor: e.target.value }))}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Accent Color
              </label>
              <input
                type="color"
                value={brandingSettings.accentColor}
                onChange={(e) => setBrandingSettings(prev => ({ ...prev, accentColor: e.target.value }))}
                className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo URL
              </label>
              <input
                type="url"
                value={brandingSettings.logoUrl}
                onChange={(e) => setBrandingSettings(prev => ({ ...prev, logoUrl: e.target.value }))}
                placeholder="https://example.com/your-logo.png"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Favicon URL
              </label>
              <input
                type="url"
                value={brandingSettings.faviconUrl}
                onChange={(e) => setBrandingSettings(prev => ({ ...prev, faviconUrl: e.target.value }))}
                placeholder="https://example.com/your-favicon.ico"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Email
              </label>
              <input
                type="email"
                value={brandingSettings.supportEmail}
                onChange={(e) => setBrandingSettings(prev => ({ ...prev, supportEmail: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Support Phone
              </label>
              <input
                type="tel"
                value={brandingSettings.supportPhone}
                onChange={(e) => setBrandingSettings(prev => ({ ...prev, supportPhone: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t mt-6">
            <button 
              onClick={handleSaveBranding}
              disabled={loading}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <SaveIcon className="w-4 h-4 mr-2" />
              )}
              Save Branding
            </button>
          </div>
        </div>
      )}

      {/* Layout Tab */}
      {activeTab === 'layout' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Layout</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dashboard Layout
              </label>
              <select
                value={layoutSettings.dashboardLayout}
                onChange={(e) => setLayoutSettings(prev => ({ ...prev, dashboardLayout: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="default">Default</option>
                <option value="compact">Compact</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sidebar Position
              </label>
              <select
                value={layoutSettings.sidebarPosition}
                onChange={(e) => setLayoutSettings(prev => ({ ...prev, sidebarPosition: e.target.value as any }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom CSS
              </label>
              <textarea
                rows={8}
                value={layoutSettings.customCss}
                onChange={(e) => setLayoutSettings(prev => ({ ...prev, customCss: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              ></textarea>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom JavaScript
              </label>
              <textarea
                rows={8}
                value={layoutSettings.customJs}
                onChange={(e) => setLayoutSettings(prev => ({ ...prev, customJs: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              ></textarea>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Header Visibility</p>
                <p className="text-sm text-gray-600">Show or hide the main header bar</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={layoutSettings.headerVisibility}
                  onChange={(e) => setLayoutSettings(prev => ({ ...prev, headerVisibility: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Footer Visibility</p>
                <p className="text-sm text-gray-600">Show or hide the main footer bar</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={layoutSettings.footerVisibility}
                  onChange={(e) => setLayoutSettings(prev => ({ ...prev, footerVisibility: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t mt-6">
            <button 
              onClick={handleSaveLayout}
              disabled={loading}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <SaveIcon className="w-4 h-4 mr-2" />
              )}
              Save Layout
            </button>
          </div>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Notification Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Sender Name
              </label>
              <input
                type="text"
                value={notificationSettings.emailSenderName}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailSenderName: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Sender Email
              </label>
              <input
                type="email"
                value={notificationSettings.emailSenderEmail}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, emailSenderEmail: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMS Sender ID
              </label>
              <input
                type="text"
                value={notificationSettings.smsSenderId}
                onChange={(e) => setNotificationSettings(prev => ({ ...prev, smsSenderId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div className="md:col-span-2 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">In-App Notification Sound</p>
                <p className="text-sm text-gray-600">Play a sound for new in-app notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notificationSettings.inAppNotificationSound}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, inAppNotificationSound: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Push Notification Sound</p>
                <p className="text-sm text-gray-600">Play a sound for new push notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={notificationSettings.pushNotificationSound}
                  onChange={(e) => setNotificationSettings(prev => ({ ...prev, pushNotificationSound: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t mt-6">
            <button 
              onClick={handleSaveNotifications}
              disabled={loading}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <SaveIcon className="w-4 h-4 mr-2" />
              )}
              Save Notifications
            </button>
          </div>
        </div>
      )}

      {/* Domains Tab */}
      {activeTab === 'domains' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Custom Domain Configuration</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Enable Custom Domain</p>
                <p className="text-sm text-gray-600">Use your own domain name for the platform (e.g., app.yourcompany.com)</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={domainSettings.customDomainEnabled}
                  onChange={(e) => setDomainSettings(prev => ({ ...prev, customDomainEnabled: e.target.checked }))}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
            
            {domainSettings.customDomainEnabled && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Custom Domain
                  </label>
                  <input
                    type="text"
                    value={domainSettings.customDomain}
                    onChange={(e) => setDomainSettings(prev => ({ ...prev, customDomain: e.target.value }))}
                    placeholder="e.g., app.yourcompany.com"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Enable SSL (HTTPS)</p>
                    <p className="text-sm text-gray-600">Secure your custom domain with an SSL certificate</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={domainSettings.sslEnabled}
                      onChange={(e) => setDomainSettings(prev => ({ ...prev, sslEnabled: e.target.checked }))}
                      className="sr-only peer" 
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">DNS Records to Configure</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Add the following DNS records to your domain provider's settings:
                  </p>
                  <div className="space-y-3">
                    {domainSettings.dnsRecords.map((record, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 border border-gray-300 rounded-lg">
                        <div className="flex-1">
                          <p className="text-xs text-gray-500">{record.type} Record</p>
                          <p className="font-mono text-sm text-gray-900">Host: {record.host}</p>
                          <p className="font-mono text-sm text-gray-900">Value: {record.value}</p>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Copy
                        </button>
                      </div>
                    ))}
                  </div>
                  <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                    Verify DNS Configuration
                  </button>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center justify-end space-x-3 pt-4 border-t mt-6">
            <button 
              onClick={handleSaveDomains}
              disabled={loading}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              ) : (
                <SaveIcon className="w-4 h-4 mr-2" />
              )}
              Save Domains
            </button>
          </div>
        </div>
      )}

      {/* Advanced Tab */}
      {activeTab === 'advanced' && (
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Advanced Customization</h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Header HTML
              </label>
              <textarea
                rows={8}
                placeholder="<!-- Add custom HTML for the header -->"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              ></textarea>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Custom Footer HTML
              </label>
              <textarea
                rows={8}
                placeholder="<!-- Add custom HTML for the footer -->"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              ></textarea>
            </div>
            
            <div className="flex items-center justify-end space-x-3 pt-4 border-t">
              <button 
                onClick={() => { /* Save advanced settings */ }}
                disabled={loading}
                className="bg-primary-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center disabled:opacity-50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                ) : (
                  <SaveIcon className="w-4 h-4 mr-2" />
                )}
                Save Advanced Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminWhiteLabellingCustomization