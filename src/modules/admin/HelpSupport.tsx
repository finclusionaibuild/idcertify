import React, { useState } from 'react';
import { HelpCircle, MessageSquare, FileText, Video, Search, Filter, Plus, Eye, Clock, CheckCircle } from 'lucide-react';

interface SupportTicket {
  id: string;
  title: string;
  description: string;
  category: 'Technical' | 'Account' | 'Billing' | 'General';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  submittedBy: string;
  assignedTo: string;
  createdAt: string;
  updatedAt: string;
}

interface KnowledgeBaseArticle {
  id: string;
  title: string;
  category: string;
  views: number;
  lastUpdated: string;
  status: 'Published' | 'Draft';
}

const mockTickets: SupportTicket[] = [
  {
    id: '1',
    title: 'Unable to verify documents',
    description: 'User experiencing issues with document verification process',
    category: 'Technical',
    priority: 'High',
    status: 'In Progress',
    submittedBy: 'john.doe@example.com',
    assignedTo: 'Support Agent 1',
    createdAt: '2024-12-14T10:30:00Z',
    updatedAt: '2024-12-15T09:15:00Z'
  },
  {
    id: '2',
    title: 'Billing inquiry about subscription',
    description: 'Question about enterprise subscription pricing',
    category: 'Billing',
    priority: 'Medium',
    status: 'Open',
    submittedBy: 'jane.smith@company.com',
    assignedTo: 'Billing Team',
    createdAt: '2024-12-15T08:45:00Z',
    updatedAt: '2024-12-15T08:45:00Z'
  }
];

const mockKBArticles: KnowledgeBaseArticle[] = [
  {
    id: '1',
    title: 'How to verify your identity documents',
    category: 'Getting Started',
    views: 1250,
    lastUpdated: '2024-12-10',
    status: 'Published'
  },
  {
    id: '2',
    title: 'Understanding Trust Scores',
    category: 'Features',
    views: 890,
    lastUpdated: '2024-12-08',
    status: 'Published'
  }
];

export default function HelpSupport() {
  const [activeTab, setActiveTab] = useState<'tickets' | 'knowledge' | 'analytics'>('tickets');
  const [tickets, setTickets] = useState<SupportTicket[]>(mockTickets);
  const [kbArticles, setKbArticles] = useState<KnowledgeBaseArticle[]>(mockKBArticles);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'All' | 'Open' | 'In Progress' | 'Resolved' | 'Closed'>('All');

  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || ticket.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open': return 'text-primary-600 bg-primary-50';
      case 'In Progress': return 'text-warning-600 bg-warning-50';
      case 'Resolved': return 'text-success-600 bg-success-50';
      case 'Closed': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Low': return 'text-success-600 bg-success-50';
      case 'Medium': return 'text-warning-600 bg-warning-50';
      case 'High': return 'text-error-600 bg-error-50';
      case 'Critical': return 'text-error-700 bg-error-100';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
          <p className="text-gray-600 mt-1">Manage support tickets, knowledge base, and user assistance</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 transition-colors flex items-center gap-2">
            <FileText className="w-4 h-4" />
            New Article
          </button>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Ticket
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <MessageSquare className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Open Tickets</p>
              <p className="text-2xl font-bold text-gray-900">
                {tickets.filter(t => t.status === 'Open').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-warning-50 rounded-lg">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">
                {tickets.filter(t => t.status === 'In Progress').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-success-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Resolved Today</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-soft border">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-secondary-50 rounded-lg">
              <FileText className="w-6 h-6 text-secondary-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">KB Articles</p>
              <p className="text-2xl font-bold text-gray-900">{kbArticles.length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-soft border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'tickets', label: 'Support Tickets', icon: MessageSquare },
              { id: 'knowledge', label: 'Knowledge Base', icon: FileText },
              { id: 'analytics', label: 'Analytics', icon: HelpCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'tickets' && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tickets..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="All">All Status</option>
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Tickets Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priority
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigned To
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredTickets.map((ticket) => (
                      <tr key={ticket.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                            <div className="text-sm text-gray-500">{ticket.submittedBy}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(ticket.status)}`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {ticket.assignedTo}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(ticket.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900">
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'knowledge' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {kbArticles.map((article) => (
                  <div key={article.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-medium text-gray-900">{article.title}</h3>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        article.status === 'Published' ? 'text-success-600 bg-success-50' : 'text-warning-600 bg-warning-50'
                      }`}>
                        {article.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{article.category}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span>{article.views} views</span>
                      <span>Updated {new Date(article.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Ticket Resolution Time</h3>
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">Chart placeholder</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Support Categories</h3>
                  <div className="h-48 flex items-center justify-center">
                    <p className="text-gray-500">Chart placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}