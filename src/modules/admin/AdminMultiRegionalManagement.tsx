  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Box,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Switch,
  FormControlLabel,
  Alert,
  Tabs,
  Tab,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip
} from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import SecurityIcon from '@mui/icons-material/Security';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import DownloadIcon from '@mui/icons-material/Download';
import UploadIcon from '@mui/icons-material/Upload';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Region {
  id: string;
  name: string;
  code: string;
  country: string;
  timezone: string;
  currency: string;
  language: string;
  dbEndpoint: string;
  dbStatus: 'active' | 'maintenance' | 'offline';
  userCount: number;
  adminCount: number;
  lastSync: string;
  dataResidency: boolean;
  complianceStandards: string[];
  isActive: boolean;
}

interface UserRegionAccess {
  userId: string;
  userName: string;
  email: string;
  role: string;
  accessibleRegions: string[];
  maxRegions: number;
  lastAccess: string;
}

const AdminMultiRegionalManagement: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([
    {
      id: 'us-east',
      name: 'US East',
      code: 'USE',
      country: 'United States',
      timezone: 'America/New_York',
      currency: 'USD',
      language: 'en-US',
      dbEndpoint: 'us-east.idcertify.com',
      dbStatus: 'active',
      userCount: 15420,
      adminCount: 12,
      lastSync: '2024-01-15T10:30:00Z',
      dataResidency: true,
      complianceStandards: ['SOC2', 'GDPR', 'CCPA'],
      isActive: true
    },
    {
      id: 'eu-west',
      name: 'EU West',
      code: 'EUW',
      country: 'Ireland',
      timezone: 'Europe/Dublin',
      currency: 'EUR',
      language: 'en-GB',
      dbEndpoint: 'eu-west.idcertify.com',
      dbStatus: 'active',
      userCount: 8750,
      adminCount: 8,
      lastSync: '2024-01-15T10:28:00Z',
      dataResidency: true,
      complianceStandards: ['GDPR', 'ISO27001'],
      isActive: true
    },
    {
      id: 'asia-pacific',
      name: 'Asia Pacific',
      code: 'APAC',
      country: 'Singapore',
      timezone: 'Asia/Singapore',
      currency: 'SGD',
      language: 'en-SG',
      dbEndpoint: 'apac.idcertify.com',
      dbStatus: 'maintenance',
      userCount: 12300,
      adminCount: 6,
      lastSync: '2024-01-15T09:45:00Z',
      dataResidency: true,
      complianceStandards: ['PDPA', 'ISO27001'],
      isActive: true
    }
  ]);

  const [userAccess, setUserAccess] = useState<UserRegionAccess[]>([
    {
      userId: 'admin-001',
      userName: 'John Smith',
      email: 'john.smith@idcertify.com',
      role: 'Super Admin',
      accessibleRegions: ['us-east', 'eu-west', 'asia-pacific'],
      maxRegions: 5,
      lastAccess: '2024-01-15T10:30:00Z'
    },
    {
      userId: 'admin-002',
      userName: 'Sarah Johnson',
      email: 'sarah.johnson@idcertify.com',
      role: 'Regional Admin',
      accessibleRegions: ['us-east', 'eu-west'],
      maxRegions: 3,
      lastAccess: '2024-01-15T09:15:00Z'
    }
  ]);

  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'regions' | 'access' | 'compliance'>('overview');
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'maintenance': return <Clock className="w-4 h-4" />;
      case 'offline': return <AlertTriangle className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Multi-Regional Management</h1>
          <p className="text-gray-600 mt-2">Manage regional databases and user access across different regions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowRegionModal(true)}
            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Region
          </button>
          <button
            onClick={() => setShowAccessModal(true)}
            className="bg-secondary-600 text-white px-4 py-2 rounded-lg hover:bg-secondary-700 flex items-center gap-2"
          >
            <Key className="w-4 h-4" />
            Manage Access
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Globe },
            { id: 'regions', label: 'Regions', icon: MapPin },
            { id: 'access', label: 'User Access', icon: Users },
            { id: 'compliance', label: 'Compliance', icon: Shield }
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

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Regions</p>
                  <p className="text-2xl font-bold text-gray-900">{regions.length}</p>
                </div>
                <Globe className="w-8 h-8 text-primary-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Databases</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {regions.filter(r => r.dbStatus === 'active').length}
                  </p>
                </div>
                <Database className="w-8 h-8 text-green-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {regions.reduce((sum, r) => sum + r.userCount, 0).toLocaleString()}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft border">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Regional Admins</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {regions.reduce((sum, r) => sum + r.adminCount, 0)}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          {/* Regional Status */}
          <div className="bg-white rounded-lg shadow-soft border">
            <div className="p-6 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Regional Status Overview</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {regions.map((region) => (
                  <div key={region.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <h4 className="font-medium text-gray-900">{region.name}</h4>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(region.dbStatus)}`}>
                        {getStatusIcon(region.dbStatus)}
                        {region.dbStatus}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Users:</span>
                        <span className="font-medium">{region.userCount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Admins:</span>
                        <span className="font-medium">{region.adminCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Last Sync:</span>
                        <span className="font-medium">{new Date(region.lastSync).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Regions Tab */}
      {activeTab === 'regions' && (
        <div className="bg-white rounded-lg shadow-soft border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Regional Configurations</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Region</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Database</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Users</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Compliance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {regions.map((region) => (
                  <tr key={region.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{region.name}</div>
                          <div className="text-sm text-gray-500">{region.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Database className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-900">{region.dbEndpoint}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(region.dbStatus)}`}>
                        {getStatusIcon(region.dbStatus)}
                        {region.dbStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {region.userCount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {region.complianceStandards.map((standard) => (
                          <span key={standard} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                            {standard}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedRegion(region)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User Access Tab */}
      {activeTab === 'access' && (
        <div className="bg-white rounded-lg shadow-soft border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-900">User Regional Access Management</h3>
            <p className="text-sm text-gray-600 mt-1">Users can be granted access to up to 5 regions</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Accessible Regions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Access</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {userAccess.map((user) => (
                  <tr key={user.userId} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                          <Users className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.userName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-wrap gap-1">
                        {user.accessibleRegions.map((regionId) => {
                          const region = regions.find(r => r.id === regionId);
                          return (
                            <span key={regionId} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                              {region?.code || regionId}
                            </span>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.accessibleRegions.length} / {user.maxRegions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.lastAccess).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Compliance Tab */}
      {activeTab === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {regions.map((region) => (
              <div key={region.id} className="bg-white rounded-lg shadow-soft border">
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">{region.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${region.dataResidency ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {region.dataResidency ? 'Compliant' : 'Non-Compliant'}
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Data Residency</h4>
                    <p className="text-sm text-gray-600">
                      {region.dataResidency ? 'Data is stored within regional boundaries' : 'Data may be stored outside region'}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Compliance Standards</h4>
                    <div className="flex flex-wrap gap-2">
                      {region.complianceStandards.map((standard) => (
                        <span key={standard} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {standard}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Regional Settings</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Timezone:</span>
                        <span className="ml-2 font-medium">{region.timezone}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Currency:</span>
                        <span className="ml-2 font-medium">{region.currency}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Language:</span>
                        <span className="ml-2 font-medium">{region.language}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMultiRegionalManagement;