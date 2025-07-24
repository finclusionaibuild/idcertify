import React, { useState } from 'react';
import { 
  AddIcon,
  SearchIcon,
  FilterListIcon,
  MessageIcon,
  AccessTimeIcon,
  CheckCircleIcon,
  WarningIcon,
  PersonIcon,
  CalendarTodayIcon,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
  Tooltip
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import LabelIcon from '@mui/icons-material/Label';
import ChatIcon from '@mui/icons-material/Chat';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

interface TicketData {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  category: 'technical' | 'billing' | 'account' | 'feature-request' | 'bug';
  assignedTo: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  messages: Array<{
    id: string;
    author: string;
    message: string;
    timestamp: string;
    isInternal: boolean;
  }>;
}

const AdminTicketingSystem: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([
    {
      id: 'TKT-001',
      title: 'Unable to verify documents',
      description: 'User experiencing issues with document upload and verification process',
      status: 'open',
      priority: 'high',
      category: 'technical',
      assignedTo: 'John Smith',
      createdBy: 'user@example.com',
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:20:00Z',
      messages: [
        {
          id: 'msg-1',
          author: 'user@example.com',
          message: 'I cannot upload my passport for verification. The system keeps showing an error.',
          timestamp: '2024-01-15T10:30:00Z',
          isInternal: false
        }
      ]
    }
  ]);

  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      case 'closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = filterStatus === 'all' || ticket.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || ticket.priority === filterPriority;
    const matchesSearch = ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesPriority && matchesSearch;
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ticketing System Management</h1>
          <p className="text-gray-600 mt-2">Manage customer support tickets and inquiries</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Create Ticket
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow-soft border">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 w-64"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="all">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2"
          >
            <option value="all">All Priority</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      {/* Tickets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredTickets.map((ticket) => (
          <div key={ticket.id} className="bg-white rounded-lg shadow-soft border p-6 hover:shadow-medium transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{ticket.title}</h3>
                <p className="text-sm text-gray-600 font-mono">{ticket.id}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedTicket(ticket)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-gray-600 hover:text-gray-800">
                  <Edit className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-700 text-sm mb-4 line-clamp-2">{ticket.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                {ticket.status.replace('-', ' ')}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                {ticket.priority}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>Assigned to: {ticket.assignedTo}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                <span>{ticket.messages.length} messages</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-hard max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.title}</h2>
                  <p className="text-gray-600 font-mono">{selectedTicket.id}</p>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="font-semibold mb-2">Ticket Details</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Status:</strong> <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedTicket.status)}`}>{selectedTicket.status}</span></div>
                    <div><strong>Priority:</strong> <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedTicket.priority)}`}>{selectedTicket.priority}</span></div>
                    <div><strong>Category:</strong> {selectedTicket.category}</div>
                    <div><strong>Assigned to:</strong> {selectedTicket.assignedTo}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Timeline</h3>
                  <div className="space-y-2 text-sm">
                    <div><strong>Created:</strong> {new Date(selectedTicket.createdAt).toLocaleString()}</div>
                    <div><strong>Updated:</strong> {new Date(selectedTicket.updatedAt).toLocaleString()}</div>
                    <div><strong>Created by:</strong> {selectedTicket.createdBy}</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Messages</h3>
                <div className="space-y-4">
                  {selectedTicket.messages.map((message) => (
                    <div key={message.id} className={`p-4 rounded-lg ${message.isInternal ? 'bg-yellow-50 border-l-4 border-yellow-400' : 'bg-gray-50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium">{message.author}</span>
                        <span className="text-sm text-gray-500">{new Date(message.timestamp).toLocaleString()}</span>
                      </div>
                      <p className="text-gray-700">{message.message}</p>
                      {message.isInternal && (
                        <span className="text-xs text-yellow-600 font-medium">Internal Note</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTicketingSystem;