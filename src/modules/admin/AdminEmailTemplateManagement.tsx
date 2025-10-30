import React, { useState } from 'react';
import { Mail, Plus, Edit, Trash2, Eye, Send, Save, X } from 'lucide-react';

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: 'verification' | 'notification' | 'marketing' | 'system';
  status: 'active' | 'draft' | 'archived';
  lastModified: string;
  usageCount: number;
}

const AdminEmailTemplateManagement: React.FC = () => {
  const [templates, setTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to TrustID',
      content: 'Welcome to our platform...',
      type: 'notification',
      status: 'active',
      lastModified: '2024-01-15',
      usageCount: 1250
    },
    {
      id: '2',
      name: 'Verification Complete',
      subject: 'Your verification is complete',
      content: 'Your identity verification has been completed...',
      type: 'verification',
      status: 'active',
      lastModified: '2024-01-14',
      usageCount: 890
    },
    {
      id: '3',
      name: 'Password Reset',
      subject: 'Reset your password',
      content: 'Click the link below to reset your password...',
      type: 'system',
      status: 'active',
      lastModified: '2024-01-13',
      usageCount: 456
    }
  ]);

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || template.type === filterType;
    const matchesStatus = filterStatus === 'all' || template.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleCreateTemplate = () => {
    const newTemplate: EmailTemplate = {
      id: Date.now().toString(),
      name: 'New Template',
      subject: '',
      content: '',
      type: 'notification',
      status: 'draft',
      lastModified: new Date().toISOString().split('T')[0],
      usageCount: 0
    };
    setTemplates([...templates, newTemplate]);
    setSelectedTemplate(newTemplate);
    setIsEditing(true);
  };

  const handleSaveTemplate = (template: EmailTemplate) => {
    setTemplates(templates.map(t => 
      t.id === template.id 
        ? { ...template, lastModified: new Date().toISOString().split('T')[0] }
        : t
    ));
    setIsEditing(false);
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    if (selectedTemplate?.id === id) {
      setSelectedTemplate(null);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'verification': return 'bg-blue-100 text-blue-800';
      case 'notification': return 'bg-green-100 text-green-800';
      case 'marketing': return 'bg-purple-100 text-purple-800';
      case 'system': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Email Template Management</h1>
          <p className="text-gray-600">Create and manage email templates for automated communications</p>
        </div>
        <button
          onClick={handleCreateTemplate}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Template
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Template List */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Search templates..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                
                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="verification">Verification</option>
                    <option value="notification">Notification</option>
                    <option value="marketing">Marketing</option>
                    <option value="system">System</option>
                  </select>
                  
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedTemplate?.id === template.id ? 'bg-primary-50 border-primary-200' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 truncate">{template.name}</h3>
                    <div className="flex gap-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(template.type)}`}>
                        {template.type}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(template.status)}`}>
                        {template.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 truncate mb-2">{template.subject}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Used {template.usageCount} times</span>
                    <span>{template.lastModified}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Template Editor/Preview */}
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-400" />
                    <h2 className="text-lg font-semibold text-gray-900">
                      {isEditing ? 'Edit Template' : selectedTemplate.name}
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    {!isEditing && (
                      <>
                        <button
                          onClick={() => setShowPreview(!showPreview)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1"
                        >
                          <Eye className="w-4 h-4" />
                          {showPreview ? 'Edit' : 'Preview'}
                        </button>
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-3 py-1 text-sm bg-primary-600 text-white rounded hover:bg-primary-700 flex items-center gap-1"
                        >
                          <Edit className="w-4 h-4" />
                          Edit
                        </button>
                      </>
                    )}
                    {isEditing && (
                      <>
                        <button
                          onClick={() => {
                            setIsEditing(false);
                            setShowPreview(false);
                          }}
                          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-1"
                        >
                          <X className="w-4 h-4" />
                          Cancel
                        </button>
                        <button
                          onClick={() => handleSaveTemplate(selectedTemplate)}
                          className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 flex items-center gap-1"
                        >
                          <Save className="w-4 h-4" />
                          Save
                        </button>
                      </>
                    )}
                    <button
                      onClick={() => handleDeleteTemplate(selectedTemplate.id)}
                      className="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                {isEditing ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Template Name
                      </label>
                      <input
                        type="text"
                        value={selectedTemplate.name}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          name: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <select
                          value={selectedTemplate.type}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            type: e.target.value as EmailTemplate['type']
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="verification">Verification</option>
                          <option value="notification">Notification</option>
                          <option value="marketing">Marketing</option>
                          <option value="system">System</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Status
                        </label>
                        <select
                          value={selectedTemplate.status}
                          onChange={(e) => setSelectedTemplate({
                            ...selectedTemplate,
                            status: e.target.value as EmailTemplate['status']
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        >
                          <option value="active">Active</option>
                          <option value="draft">Draft</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject Line
                      </label>
                      <input
                        type="text"
                        value={selectedTemplate.subject}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          subject: e.target.value
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Content
                      </label>
                      <textarea
                        value={selectedTemplate.content}
                        onChange={(e) => setSelectedTemplate({
                          ...selectedTemplate,
                          content: e.target.value
                        })}
                        rows={12}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter your email content here..."
                      />
                    </div>
                  </div>
                ) : showPreview ? (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="border-b border-gray-200 pb-4 mb-4">
                      <div className="text-sm text-gray-600 mb-2">Subject:</div>
                      <div className="font-medium">{selectedTemplate.subject}</div>
                    </div>
                    <div className="prose max-w-none">
                      <div className="whitespace-pre-wrap">{selectedTemplate.content}</div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Template Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="font-medium">{selectedTemplate.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(selectedTemplate.type)}`}>
                              {selectedTemplate.type}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedTemplate.status)}`}>
                              {selectedTemplate.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Usage Count:</span>
                            <span className="font-medium">{selectedTemplate.usageCount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Last Modified:</span>
                            <span className="font-medium">{selectedTemplate.lastModified}</span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Actions</h3>
                        <div className="space-y-2">
                          <button className="w-full px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Test Email
                          </button>
                          <button className="w-full px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50 flex items-center gap-2">
                            <Eye className="w-4 h-4" />
                            View Usage Analytics
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Subject Line</h3>
                      <div className="p-3 bg-gray-50 rounded border">
                        {selectedTemplate.subject}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">Content Preview</h3>
                      <div className="p-4 bg-gray-50 rounded border max-h-64 overflow-y-auto">
                        <div className="whitespace-pre-wrap text-sm">
                          {selectedTemplate.content}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Template Selected</h3>
              <p className="text-gray-600">Select a template from the list to view or edit it</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEmailTemplateManagement;