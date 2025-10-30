import React, { useState } from 'react';
import { 
  Palette, 
  Upload, 
  Eye, 
  Save, 
  RefreshCw, 
  Monitor, 
  Smartphone, 
  Tablet,
  Settings,
  Image,
  Type,
  Layout,
  Globe,
  Mail,
  Phone
} from 'lucide-react';

interface BrandingConfig {
  id: string;
  clientName: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  logo: string;
  favicon: string;
  companyName: string;
  tagline: string;
  contactEmail: string;
  contactPhone: string;
  website: string;
  customCSS: string;
  footerText: string;
  loginPageBackground: string;
  dashboardTheme: 'light' | 'dark' | 'auto';
  customDomain: string;
  isActive: boolean;
}

const AdminWhiteLabelCustomization: React.FC = () => {
  const [configs, setConfigs] = useState<BrandingConfig[]>([
    {
      id: '1',
      clientName: 'TechCorp Solutions',
      primaryColor: '#2563eb',
      secondaryColor: '#64748b',
      accentColor: '#f59e0b',
      logo: '/api/placeholder/200/60',
      favicon: '/api/placeholder/32/32',
      companyName: 'TechCorp Identity Solutions',
      tagline: 'Secure Identity Verification Made Simple',
      contactEmail: 'support@techcorp.com',
      contactPhone: '+1-555-0123',
      website: 'https://techcorp.com',
      customCSS: '/* Custom styles */\n.header { border-radius: 8px; }',
      footerText: '© 2024 TechCorp Solutions. All rights reserved.',
      loginPageBackground: '/api/placeholder/1920/1080',
      dashboardTheme: 'light',
      customDomain: 'verify.techcorp.com',
      isActive: true
    }
  ]);

  const [selectedConfig, setSelectedConfig] = useState<BrandingConfig | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'branding' | 'colors' | 'content' | 'advanced'>('branding');

  const handleConfigUpdate = (field: keyof BrandingConfig, value: any) => {
    if (selectedConfig) {
      const updatedConfig = { ...selectedConfig, [field]: value };
      setSelectedConfig(updatedConfig);
      setConfigs(configs.map(config => 
        config.id === selectedConfig.id ? updatedConfig : config
      ));
    }
  };

  const handleSaveConfig = () => {
    // Save configuration logic
    console.log('Saving configuration:', selectedConfig);
  };

  const handlePreviewConfig = () => {
    // Preview configuration logic
    console.log('Previewing configuration:', selectedConfig);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">White Label Customization</h1>
          <p className="text-gray-600 mt-2">Customize platform branding for different clients</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handlePreviewConfig}
            className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 flex items-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Preview
          </button>
          <button
            onClick={handleSaveConfig}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Configuration List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-4 border-b">
              <h3 className="font-semibold text-gray-900">Client Configurations</h3>
            </div>
            <div className="p-4 space-y-2">
              {configs.map((config) => (
                <div
                  key={config.id}
                  onClick={() => setSelectedConfig(config)}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    selectedConfig?.id === config.id
                      ? 'bg-primary-50 border-primary-200 border'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: config.primaryColor }}
                    />
                    <div>
                      <p className="font-medium text-sm">{config.clientName}</p>
                      <p className="text-xs text-gray-500">{config.customDomain}</p>
                    </div>
                  </div>
                  {config.isActive && (
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full ml-auto"></span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Configuration Editor */}
        <div className="lg:col-span-3">
          {selectedConfig ? (
            <div className="bg-white rounded-lg shadow-soft border">
              {/* Tabs */}
              <div className="border-b">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'branding', label: 'Branding', icon: Palette },
                    { id: 'colors', label: 'Colors', icon: Settings },
                    { id: 'content', label: 'Content', icon: Type },
                    { id: 'advanced', label: 'Advanced', icon: Layout }
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

              <div className="p-6">
                {/* Branding Tab */}
                {activeTab === 'branding' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Company Name
                        </label>
                        <input
                          type="text"
                          value={selectedConfig.companyName}
                          onChange={(e) => handleConfigUpdate('companyName', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tagline
                        </label>
                        <input
                          type="text"
                          value={selectedConfig.tagline}
                          onChange={(e) => handleConfigUpdate('tagline', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Logo Upload
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload logo</p>
                          <p className="text-xs text-gray-500">PNG, JPG up to 2MB</p>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Favicon Upload
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <Image className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600">Click to upload favicon</p>
                          <p className="text-xs text-gray-500">ICO, PNG 32x32px</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Colors Tab */}
                {activeTab === 'colors' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Primary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={selectedConfig.primaryColor}
                            onChange={(e) => handleConfigUpdate('primaryColor', e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            value={selectedConfig.primaryColor}
                            onChange={(e) => handleConfigUpdate('primaryColor', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Secondary Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={selectedConfig.secondaryColor}
                            onChange={(e) => handleConfigUpdate('secondaryColor', e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            value={selectedConfig.secondaryColor}
                            onChange={(e) => handleConfigUpdate('secondaryColor', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Accent Color
                        </label>
                        <div className="flex items-center gap-3">
                          <input
                            type="color"
                            value={selectedConfig.accentColor}
                            onChange={(e) => handleConfigUpdate('accentColor', e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            value={selectedConfig.accentColor}
                            onChange={(e) => handleConfigUpdate('accentColor', e.target.value)}
                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dashboard Theme
                      </label>
                      <select
                        value={selectedConfig.dashboardTheme}
                        onChange={(e) => handleConfigUpdate('dashboardTheme', e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2"
                      >
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">Auto</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Mail className="w-4 h-4 inline mr-1" />
                          Contact Email
                        </label>
                        <input
                          type="email"
                          value={selectedConfig.contactEmail}
                          onChange={(e) => handleConfigUpdate('contactEmail', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          <Phone className="w-4 h-4 inline mr-1" />
                          Contact Phone
                        </label>
                        <input
                          type="tel"
                          value={selectedConfig.contactPhone}
                          onChange={(e) => handleConfigUpdate('contactPhone', e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Globe className="w-4 h-4 inline mr-1" />
                        Website URL
                      </label>
                      <input
                        type="url"
                        value={selectedConfig.website}
                        onChange={(e) => handleConfigUpdate('website', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Footer Text
                      </label>
                      <textarea
                        value={selectedConfig.footerText}
                        onChange={(e) => handleConfigUpdate('footerText', e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      />
                    </div>
                  </div>
                )}

                {/* Advanced Tab */}
                {activeTab === 'advanced' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom Domain
                      </label>
                      <input
                        type="text"
                        value={selectedConfig.customDomain}
                        onChange={(e) => handleConfigUpdate('customDomain', e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2"
                        placeholder="verify.yourcompany.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Custom CSS
                      </label>
                      <textarea
                        value={selectedConfig.customCSS}
                        onChange={(e) => handleConfigUpdate('customCSS', e.target.value)}
                        rows={10}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 font-mono text-sm"
                        placeholder="/* Add your custom CSS here */"
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isActive"
                        checked={selectedConfig.isActive}
                        onChange={(e) => handleConfigUpdate('isActive', e.target.checked)}
                        className="rounded border-gray-300"
                      />
                      <label htmlFor="isActive" className="text-sm font-medium text-gray-700">
                        Configuration Active
                      </label>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-soft border p-12 text-center">
              <Palette className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Configuration</h3>
              <p className="text-gray-600">Choose a client configuration from the list to start customizing</p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      {selectedConfig && (
        <div className="bg-white rounded-lg shadow-soft border">
          <div className="p-4 border-b flex justify-between items-center">
            <h3 className="font-semibold text-gray-900">Live Preview</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPreviewMode('desktop')}
                className={`p-2 rounded ${previewMode === 'desktop' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('tablet')}
                className={`p-2 rounded ${previewMode === 'tablet' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewMode('mobile')}
                className={`p-2 rounded ${previewMode === 'mobile' ? 'bg-primary-100 text-primary-600' : 'text-gray-400'}`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="p-6 bg-gray-50">
            <div 
              className={`mx-auto bg-white rounded-lg shadow-medium overflow-hidden ${
                previewMode === 'desktop' ? 'max-w-6xl' : 
                previewMode === 'tablet' ? 'max-w-2xl' : 'max-w-sm'
              }`}
              style={{ 
                '--primary-color': selectedConfig.primaryColor,
                '--secondary-color': selectedConfig.secondaryColor,
                '--accent-color': selectedConfig.accentColor
              } as React.CSSProperties}
            >
              {/* Preview Header */}
              <div 
                className="p-4 text-white"
                style={{ backgroundColor: selectedConfig.primaryColor }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded"></div>
                    <span className="font-semibold">{selectedConfig.companyName}</span>
                  </div>
                  <nav className="hidden md:flex space-x-6 text-sm">
                    <a href="#" className="hover:opacity-80">Dashboard</a>
                    <a href="#" className="hover:opacity-80">Verify</a>
                    <a href="#" className="hover:opacity-80">Support</a>
                  </nav>
                </div>
              </div>
              
              {/* Preview Content */}
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2" style={{ color: selectedConfig.primaryColor }}>
                  {selectedConfig.tagline}
                </h1>
                <p className="text-gray-600 mb-4">
                  Welcome to your customized identity verification platform.
                </p>
                <button 
                  className="px-4 py-2 rounded-lg text-white font-medium"
                  style={{ backgroundColor: selectedConfig.accentColor }}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminWhiteLabelCustomization;