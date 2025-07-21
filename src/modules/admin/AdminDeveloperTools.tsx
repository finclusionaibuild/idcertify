import React, { useState } from 'react';
import { Code, Database, Key, Settings, Terminal, GitBranch, Play, Pause, RotateCcw } from 'lucide-react';

const AdminDeveloperTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState('sandbox');
  const [sandboxStatus, setSandboxStatus] = useState('stopped');

  const tabs = [
    { id: 'sandbox', label: 'Sandbox Environment', icon: Terminal },
    { id: 'api-testing', label: 'API Testing', icon: Code },
    { id: 'webhooks', label: 'Webhook Testing', icon: GitBranch },
    { id: 'tools', label: 'Development Tools', icon: Settings }
  ];

  const sandboxEnvironments = [
    { id: 'dev', name: 'Development', status: 'running', url: 'https://dev-sandbox.idcertify.com' },
    { id: 'staging', name: 'Staging', status: 'stopped', url: 'https://staging-sandbox.idcertify.com' },
    { id: 'testing', name: 'Testing', status: 'running', url: 'https://test-sandbox.idcertify.com' }
  ];

  const apiEndpoints = [
    { method: 'POST', endpoint: '/api/v1/verify', description: 'Identity Verification' },
    { method: 'GET', endpoint: '/api/v1/status/{id}', description: 'Check Verification Status' },
    { method: 'POST', endpoint: '/api/v1/kyc', description: 'KYC Verification' },
    { method: 'POST', endpoint: '/api/v1/document', description: 'Document Upload' }
  ];

  const webhookEvents = [
    { event: 'verification.completed', description: 'Verification process completed' },
    { event: 'verification.failed', description: 'Verification process failed' },
    { event: 'document.uploaded', description: 'Document successfully uploaded' },
    { event: 'kyc.approved', description: 'KYC verification approved' }
  ];

  const renderSandboxTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Sandbox Environments</h3>
        <div className="space-y-4">
          {sandboxEnvironments.map((env) => (
            <div key={env.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <h4 className="font-medium">{env.name}</h4>
                <p className="text-sm text-gray-600">{env.url}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  env.status === 'running' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {env.status}
                </span>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                  {env.status === 'running' ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button className="p-2 text-gray-600 hover:bg-gray-50 rounded">
                  <RotateCcw size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Sandbox Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Test Data Volume
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>Minimal (100 records)</option>
              <option>Standard (1,000 records)</option>
              <option>Large (10,000 records)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              API Rate Limit
            </label>
            <select className="w-full border border-gray-300 rounded-md px-3 py-2">
              <option>100 requests/minute</option>
              <option>500 requests/minute</option>
              <option>1000 requests/minute</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApiTestingTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">API Endpoints</h3>
        <div className="space-y-3">
          {apiEndpoints.map((api, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  api.method === 'POST' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {api.method}
                </span>
                <code className="text-sm font-mono">{api.endpoint}</code>
                <span className="text-sm text-gray-600">{api.description}</span>
              </div>
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                Test
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">API Testing Console</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request URL
            </label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="https://api.idcertify.com/v1/verify"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Request Body (JSON)
            </label>
            <textarea 
              className="w-full border border-gray-300 rounded-md px-3 py-2 h-32"
              placeholder='{"document_type": "passport", "document_image": "base64_string"}'
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Send Request
          </button>
        </div>
      </div>
    </div>
  );

  const renderWebhooksTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Webhook Events</h3>
        <div className="space-y-3">
          {webhookEvents.map((webhook, index) => (
            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <code className="text-sm font-mono text-blue-600">{webhook.event}</code>
                <p className="text-sm text-gray-600 mt-1">{webhook.description}</p>
              </div>
              <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                Test Event
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Webhook Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Webhook URL
            </label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="https://your-app.com/webhooks/idcertify"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret Key
            </label>
            <input 
              type="password" 
              className="w-full border border-gray-300 rounded-md px-3 py-2"
              placeholder="webhook_secret_key"
            />
          </div>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );

  const renderToolsTab = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Development Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Key className="w-5 h-5 text-blue-600" />
              <h4 className="font-medium">API Key Generator</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Generate test API keys for development</p>
            <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
              Generate Key
            </button>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Database className="w-5 h-5 text-green-600" />
              <h4 className="font-medium">Test Data Generator</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Generate sample data for testing</p>
            <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
              Generate Data
            </button>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Code className="w-5 h-5 text-purple-600" />
              <h4 className="font-medium">SDK Generator</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">Generate SDKs for different languages</p>
            <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
              Generate SDK
            </button>
          </div>

          <div className="p-4 border rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="w-5 h-5 text-orange-600" />
              <h4 className="font-medium">Log Viewer</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">View real-time API logs</p>
            <button className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700">
              Open Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sandbox':
        return renderSandboxTab();
      case 'api-testing':
        return renderApiTestingTab();
      case 'webhooks':
        return renderWebhooksTab();
      case 'tools':
        return renderToolsTab();
      default:
        return renderSandboxTab();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Developer Tools & Sandbox</h1>
        <p className="text-gray-600">Manage development environments and testing tools</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Terminal className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Sandboxes</p>
              <p className="text-2xl font-bold text-gray-900">2</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Code className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">API Calls Today</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <GitBranch className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Webhooks Sent</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Settings className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Test Keys</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDeveloperTools;