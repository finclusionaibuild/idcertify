import React from 'react';
import { 
  Users, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  Shield, 
  UserCheck,
  Building2,
  BarChart3,
  MessageSquare,
  Settings,
  Eye,
  HeartHandshake,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  // Mock data - in real app, this would come from API
  const adminStats = {
    pendingVerifications: 47,
    completedToday: 123,
    documentsProcessed: 1847,
    supportTickets: 12,
    trustScoreAverage: 8.7,
    complianceRate: 94.2
  };

  const recentActivities = [
    { type: 'verification', message: 'KYC verification completed for John Doe', time: '15 minutes ago' },
    { type: 'document', message: 'New document uploaded by ABC Corp', time: '32 minutes ago' },
    { type: 'support', message: 'Support ticket #1247 resolved', time: '1 hour ago' },
    { type: 'compliance', message: 'Compliance check passed for XYZ Ltd', time: '2 hours ago' }
  ];

  const pendingTasks = [
    { id: 1, task: 'Review KYC documents for TechCorp Inc.', priority: 'high', dueTime: '2 hours' },
    { id: 2, task: 'Process background check for Jane Smith', priority: 'medium', dueTime: '4 hours' },
    { id: 3, task: 'Verify attestation documents', priority: 'low', dueTime: '1 day' },
    { id: 4, task: 'Update compliance status for 5 organizations', priority: 'medium', dueTime: '6 hours' }
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color = 'primary', link }: any) => (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100 hover:shadow-medium transition-shadow">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className={`text-2xl font-bold text-${color}-600 mt-1`}>{value}</p>
            {trend && (
              <p className="text-sm text-success-600 mt-1 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                {trend}
              </p>
            )}
          </div>
          <div className={`p-3 bg-${color}-50 rounded-lg`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
        </div>
      </div>
    </Link>
  );

  const QuickActionCard = ({ title, description, icon: Icon, link, color = 'primary' }: any) => (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-soft p-4 border border-gray-100 hover:shadow-medium transition-shadow">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-${color}-50 rounded-lg`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
          <div>
            <h3 className="font-medium text-gray-900 text-sm">{title}</h3>
            <p className="text-xs text-gray-600 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  const TaskItem = ({ task, priority, dueTime }: any) => {
    const getPriorityColor = (priority: string) => {
      switch (priority) {
        case 'high': return 'error';
        case 'medium': return 'warning';
        case 'low': return 'success';
        default: return 'gray';
      }
    };

    return (
      <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{task}</p>
          <div className="flex items-center space-x-3 mt-1">
            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-${getPriorityColor(priority)}-100 text-${getPriorityColor(priority)}-800`}>
              {priority} priority
            </span>
            <span className="text-xs text-gray-500 flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              Due in {dueTime}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage verification processes and operational tasks</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-primary-50 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
            <span className="text-sm font-medium text-primary-700">Active Session</span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Pending Verifications"
          value={adminStats.pendingVerifications}
          icon={Clock}
          color="warning"
          link="/admin/verification-management"
        />
        <StatCard
          title="Completed Today"
          value={adminStats.completedToday}
          icon={CheckCircle}
          trend="+15% vs yesterday"
          color="success"
          link="/admin/verification-management"
        />
        <StatCard
          title="Documents Processed"
          value={adminStats.documentsProcessed.toLocaleString()}
          icon={FileText}
          trend="+8% this week"
          color="primary"
          link="/admin/document-management"
        />
        <StatCard
          title="Support Tickets"
          value={adminStats.supportTickets}
          icon={MessageSquare}
          color="secondary"
          link="/admin/ticketing-system"
        />
        <StatCard
          title="Avg Trust Score"
          value={adminStats.trustScoreAverage}
          icon={TrendingUp}
          trend="+0.3 this month"
          color="success"
          link="/shared/trust-score"
        />
        <StatCard
          title="Compliance Rate"
          value={`${adminStats.complianceRate}%`}
          icon={Shield}
          trend="+2.1% this month"
          color="primary"
          link="/admin/kyc-kyb-management"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pending Tasks */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-warning-600" />
                Pending Tasks
              </h2>
              <Link to="/admin/tasks" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              {pendingTasks.map((task) => (
                <TaskItem key={task.id} {...task} />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div>
          <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary-600" />
              Recent Activities
            </h2>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'verification' ? 'bg-success-500' :
                    activity.type === 'document' ? 'bg-primary-500' :
                    activity.type === 'support' ? 'bg-secondary-500' :
                    'bg-warning-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.message}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link to="/admin/activity-log" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All Activities →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        
        {/* Verification & Compliance */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Verification & Compliance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="KYC/KYB Management"
              description="Process identity verifications"
              icon={UserCheck}
              link="/admin/kyc-kyb-management"
              color="primary"
            />
            <QuickActionCard
              title="Background Checks"
              description="Manage background verifications"
              icon={Eye}
              link="/shared/background-check"
              color="secondary"
            />
            <QuickActionCard
              title="Document Vault"
              description="Secure document management"
              icon={FileText}
              link="/shared/document-vault"
              color="accent"
            />
            <QuickActionCard
              title="Trust Score"
              description="Monitor trust metrics"
              icon={TrendingUp}
              link="/shared/trust-score"
              color="success"
            />
          </div>
        </div>

        {/* User & Organization Management */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">User & Organization Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="User Management"
              description="Manage platform users"
              icon={Users}
              link="/admin/user-management"
              color="primary"
            />
            <QuickActionCard
              title="Organization Management"
              description="Oversee organizations"
              icon={Building2}
              link="/admin/organisation-management"
              color="secondary"
            />
            <QuickActionCard
              title="Staff Management"
              description="Manage team members"
              icon={Briefcase}
              link="/user/staff-management"
              color="accent"
            />
            <QuickActionCard
              title="Profile Management"
              description="User profile oversight"
              icon={Settings}
              link="/admin/profile-management"
              color="warning"
            />
          </div>
        </div>

        {/* Support & System */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Support & System</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            <QuickActionCard
              title="Support Tickets"
              description="Handle customer support"
              icon={MessageSquare}
              link="/admin/ticketing-system"
              color="success"
            />
            <QuickActionCard
              title="Attestations"
              description="Manage digital attestations"
              icon={HeartHandshake}
              link="/shared/attestation"
              color="primary"
            />
            <QuickActionCard
              title="Analytics"
              description="View reports and insights"
              icon={BarChart3}
              link="/admin/analytics"
              color="secondary"
            />
            <QuickActionCard
              title="System Health"
              description="Monitor system status"
              icon={Shield}
              link="/admin/system-health"
              color="error"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;