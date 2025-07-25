import React from 'react';
import { 
  Users, 
  Building2, 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Database, 
  Globe, 
  DollarSign,
  MessageSquare,
  BarChart3,
  Settings,
  Clock,
  FileText,
  UserCheck,
  Lock,
  Briefcase,
  HeartHandshake,
  Microscope,
  Eye,
  Gavel,
  CreditCard,
  Headphones,
  Server,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SuperAdminDashboard = () => {
  // Mock data - in real app, this would come from API
  const platformStats = {
    totalUsers: 125847,
    totalOrganizations: 3421,
    systemUptime: 99.97,
    criticalAlerts: 3,
    pendingVerifications: 1247,
    monthlyRevenue: 2847392
  };

  const systemHealth = {
    database: 'healthy',
    api: 'healthy',
    storage: 'warning',
    network: 'healthy'
  };

  const recentActivities = [
    { type: 'security', message: 'New security policy applied', time: '2 hours ago' },
    { type: 'system', message: 'Database backup completed', time: '4 hours ago' },
    { type: 'user', message: '1,247 new user registrations', time: '6 hours ago' },
    { type: 'compliance', message: 'AML scan completed for 500 profiles', time: '8 hours ago' }
  ];

  const StatCard = ({ title, value, icon: Icon, trend, color = 'primary' }: any) => (
    <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100">
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
  );

  const QuickActionCard = ({ title, description, icon: Icon, link, color = 'primary' }: any) => (
    <Link to={link} className="block">
      <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100 hover:shadow-medium transition-shadow">
        <div className="flex items-start space-x-4">
          <div className={`p-3 bg-${color}-50 rounded-lg`}>
            <Icon className={`w-6 h-6 text-${color}-600`} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{title}</h3>
            <p className="text-sm text-gray-600 mt-1">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );

  const SystemHealthIndicator = ({ service, status }: any) => {
    const getStatusColor = (status: string) => {
      switch (status) {
        case 'healthy': return 'success';
        case 'warning': return 'warning';
        case 'error': return 'error';
        default: return 'gray';
      }
    };

    return (
      <div className="flex items-center justify-between py-2">
        <span className="text-sm font-medium text-gray-700 capitalize">{service}</span>
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full bg-${getStatusColor(status)}-500`}></div>
          <span className={`text-sm font-medium text-${getStatusColor(status)}-600 capitalize`}>
            {status}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Super Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Complete platform oversight and management</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 bg-success-50 px-3 py-2 rounded-lg">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-success-700">System Online</span>
          </div>
        </div>
      </div>

      {/* Platform Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        <StatCard
          title="Total Users"
          value={platformStats.totalUsers.toLocaleString()}
          icon={Users}
          trend="+12.5% this month"
          color="primary"
        />
        <StatCard
          title="Organizations"
          value={platformStats.totalOrganizations.toLocaleString()}
          icon={Building2}
          trend="+8.3% this month"
          color="secondary"
        />
        <StatCard
          title="System Uptime"
          value={`${platformStats.systemUptime}%`}
          icon={Activity}
          trend="99.9% target"
          color="success"
        />
        <StatCard
          title="Critical Alerts"
          value={platformStats.criticalAlerts}
          icon={AlertTriangle}
          color="error"
        />
        <StatCard
          title="Pending Verifications"
          value={platformStats.pendingVerifications.toLocaleString()}
          icon={UserCheck}
          color="warning"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${(platformStats.monthlyRevenue / 1000000).toFixed(1)}M`}
          icon={DollarSign}
          trend="+15.2% vs last month"
          color="success"
        />
      </div>

      {/* System Health & Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Server className="w-5 h-5 mr-2 text-primary-600" />
            System Health Status
          </h2>
          <div className="space-y-2">
            {Object.entries(systemHealth).map(([service, status]) => (
              <SystemHealthIndicator key={service} service={service} status={status} />
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <Link to="/admin/system-health" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View Detailed Health Report →
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-soft p-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-primary-600" />
            Recent Platform Activities
          </h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.type === 'security' ? 'bg-error-500' :
                  activity.type === 'system' ? 'bg-primary-500' :
                  activity.type === 'user' ? 'bg-success-500' :
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
            <Link to="/admin/system-logs" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All Activities →
            </Link>
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="space-y-6">
        {/* User & Organization Management */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="w-6 h-6 mr-2 text-primary-600" />
            User & Organization Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <QuickActionCard
              title="User Management"
              description="Manage all platform users and permissions"
              icon={Users}
              link="/admin/user-management"
              color="primary"
            />
            <QuickActionCard
              title="Organization Management"
              description="Oversee all registered organizations"
              icon={Building2}
              link="/admin/organisation-management"
              color="secondary"
            />
            <QuickActionCard
              title="Employer Management"
              description="Manage individual & corporate employers"
              icon={Briefcase}
              link="/admin/employer-management"
              color="accent"
            />
            <QuickActionCard
              title="Employee System"
              description="Comprehensive employee management"
              icon={UserCheck}
              link="/admin/employee-management"
              color="success"
            />
          </div>
        </div>

        {/* Compliance & Security */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Shield className="w-6 h-6 mr-2 text-error-600" />
            Compliance & Security Management
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <QuickActionCard
              title="KYC/KYB Management"
              description="Know Your Customer/Business processes"
              icon={UserCheck}
              link="/admin/kyc-kyb-management"
              color="primary"
            />
            <QuickActionCard
              title="SureAML Management"
              description="Anti-Money Laundering compliance"
              icon={Shield}
              link="/admin/sure-aml-management"
              color="error"
            />
            <QuickActionCard
              title="SureCompliance"
              description="Multi-standard compliance tracking"
              icon={Gavel}
              link="/admin/sure-compliance-management"
              color="warning"
            />
            <QuickActionCard
              title="Background Checks"
              description="Comprehensive background verification"
              icon={Eye}
              link="/admin/background-check-management"
              color="secondary"
            />
            <QuickActionCard
              title="Security Center"
              description="Platform security management"
              icon={Lock}
              link="/admin/security-center"
              color="error"
            />
            <QuickActionCard
              title="Trust Score System"
              description="Trust score algorithms and management"
              icon={TrendingUp}
              link="/admin/trust-score-management"
              color="success"
            />
            <QuickActionCard
              title="Document Vault"
              description="Secure document storage management"
              icon={FileText}
              link="/admin/document-vault-management"
              color="primary"
            />
            <QuickActionCard
              title="Attestation System"
              description="Digital attestation management"
              icon={HeartHandshake}
              link="/admin/attestation-management"
              color="accent"
            />
          </div>
        </div>

        {/* System Operations */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-2 text-secondary-600" />
            System Operations & Infrastructure
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <QuickActionCard
              title="System Health"
              description="Monitor system performance and health"
              icon={Activity}
              link="/admin/system-health"
              color="success"
            />
            <QuickActionCard
              title="Downtime Tracker"
              description="Track and manage system downtime"
              icon={Clock}
              link="/admin/downtime-tracker"
              color="error"
            />
            <QuickActionCard
              title="Data Monitoring"
              description="Real-time data monitoring and alerts"
              icon={BarChart3}
              link="/admin/data-monitoring-management"
              color="primary"
            />
            <QuickActionCard
              title="Database Management"
              description="Database administration and optimization"
              icon={Database}
              link="/admin/database-management"
              color="secondary"
            />
            <QuickActionCard
              title="Backup & Recovery"
              description="System backup and disaster recovery"
              icon={Shield}
              link="/admin/backup-recovery"
              color="warning"
            />
            <QuickActionCard
              title="Developer Tools"
              description="API management and developer resources"
              icon={Zap}
              link="/admin/developer-tools"
              color="accent"
            />
            <QuickActionCard
              title="Integration Management"
              description="Third-party integrations and APIs"
              icon={Globe}
              link="/admin/integration-management"
              color="primary"
            />
            <QuickActionCard
              title="System Settings"
              description="Global system configuration"
              icon={Settings}
              link="/admin/system-settings"
              color="secondary"
            />
          </div>
        </div>

        {/* Specialized Systems */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Microscope className="w-6 h-6 mr-2 text-accent-600" />
            Specialized Management Systems
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <QuickActionCard
              title="Biobank Management"
              description="Biometric data and storage management"
              icon={Microscope}
              link="/admin/biobank-management"
              color="accent"
            />
            <QuickActionCard
              title="Company Management"
              description="Corporate entity management"
              icon={Building2}
              link="/admin/company-management"
              color="primary"
            />
            <QuickActionCard
              title="Verification Management"
              description="Identity verification workflows"
              icon={CheckCircle}
              link="/admin/verification-management"
              color="success"
            />
            <QuickActionCard
              title="Transaction Management"
              description="Financial transaction oversight"
              icon={CreditCard}
              link="/admin/transaction-management"
              color="warning"
            />
          </div>
        </div>

        {/* Support & Analytics */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Headphones className="w-6 h-6 mr-2 text-success-600" />
            Support & Analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <QuickActionCard
              title="Help & Support"
              description="Customer support and ticket management"
              icon={Headphones}
              link="/admin/help-support"
              color="success"
            />
            <QuickActionCard
              title="Analytics & Reports"
              description="Platform analytics and reporting"
              icon={BarChart3}
              link="/admin/analytics"
              color="primary"
            />
            <QuickActionCard
              title="Chat Management"
              description="Live chat and communication tools"
              icon={MessageSquare}
              link="/admin/chat-management"
              color="secondary"
            />
            <QuickActionCard
              title="Ticketing System"
              description="Advanced ticketing and workflow"
              icon={FileText}
              link="/admin/ticketing-system"
              color="accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;