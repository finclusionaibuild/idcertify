export type UserRole = 'individual' | 'organisation' | 'admin'

export interface UserProfile {
  id: string
  email: string
  role: UserRole
  permissions?: string[]
  first_name?: string
  last_name?: string
  phone?: string
  date_of_birth?: string
  gender?: string
  nationality?: string
  address?: any
  company_name?: string
  company_type?: string
  registration_number?: string
  tax_id?: string
  website?: string
  industry?: string
  company_size?: string
  profile_picture_url?: string
  profile_complete: boolean
  trust_score: number
  sure_rating: string
  kyc_status: 'pending' | 'in_progress' | 'verified' | 'rejected'
  is_active: boolean
  email_verified: boolean
  phone_verified: boolean
  two_factor_enabled: boolean
  created_at: string
  updated_at: string
  last_login_at?: string
  onboarding_completed: boolean
}

export interface Document {
  id: string
  user_id: string
  document_type: string
  document_category: 'identity' | 'education' | 'employment' | 'license' | 'address' | 'financial'
  file_name: string
  file_path: string
  file_size?: number
  mime_type?: string
  verification_status: 'pending' | 'processing' | 'verified' | 'rejected' | 'expired'
  verified_at?: string
  verified_by?: string
  rejection_reason?: string
  document_number?: string
  issuing_authority?: string
  issue_date?: string
  expiry_date?: string
  is_biometric_verified: boolean
  confidence_score: number
  access_level: 'private' | 'shared' | 'public'
  created_at: string
  updated_at: string
}

export interface VerificationRequest {
  id: string
  requester_id: string
  target_user_id: string
  request_type: string
  verification_category: 'identity' | 'education' | 'employment' | 'address' | 'reference' | 'document'
  title: string
  description?: string
  required_documents?: any
  custom_fields?: any
  status: 'pending' | 'in_progress' | 'approved' | 'rejected' | 'expired'
  priority: 'low' | 'normal' | 'high' | 'urgent'
  response_message?: string
  response_documents?: any
  responded_at?: string
  expires_at?: string
  created_at: string
  updated_at: string
}

export interface Transaction {
  id: string
  user_id: string
  type: 'credit' | 'debit' | 'refund' | 'fee' | 'subscription'
  amount: number
  currency: string
  description: string
  reference?: string
  verification_request_id?: string
  related_user_id?: string
  payment_method?: string
  payment_provider?: string
  external_transaction_id?: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled' | 'refunded'
  created_at: string
  processed_at?: string
}

export interface Notification {
  id: string
  user_id: string
  type: 'verification' | 'document' | 'trust_score' | 'wallet' | 'system' | 'security'
  title: string
  message: string
  data?: any
  priority: 'low' | 'normal' | 'high' | 'urgent'
  is_read: boolean
  read_at?: string
  created_at: string
}

export interface HistoricalRecord {
  id: string
  user_id?: string // For individual users
  organisation_id?: string // For organisation-related historical data
  data_type: 'employment_verification' | 'education_record' | 'identity_verification' | 'address_verification' | 'reference_check'
  verification_date: string // Date of the original historical verification
  status: 'verified' | 'failed' | 'pending' // Status from the historical system
  source_system: string // e.g., 'Legacy HR System', 'Previous KYC Provider'
  details: any // Flexible object for specific data points
  imported_at: string // Timestamp of when it was imported into IDCertify
  imported_by?: string // User who imported it (e.g., admin email)
  notes?: string
}

// Mock data storage
export const mockUsers: UserProfile[] = [
  {
    id: '1',
    email: 'john.doe@example.com',
    role: 'individual',
    first_name: 'John',
    last_name: 'Doe',
    phone: '+234-801-234-5678',
    date_of_birth: '1990-05-15',
    gender: 'male',
    nationality: 'Nigerian',
    profile_complete: true,
    trust_score: 85,
    sure_rating: 'Very Good',
    kyc_status: 'verified',
    is_active: true,
    email_verified: true,
    phone_verified: true,
    two_factor_enabled: false,
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T15:30:00Z',
    last_login_at: '2024-01-20T15:30:00Z',
    onboarding_completed: false
  },
  {
    id: '2',
    email: 'admin@idcertify.com',
    role: 'admin',
    permissions: ['users.manage', 'organisations.manage', 'verifications.manage', 'settings.view'],
    first_name: 'Admin',
    last_name: 'User',
    phone: '+234-801-000-0000',
    profile_complete: true,
    trust_score: 100,
    sure_rating: 'Excellent',
    kyc_status: 'verified',
    is_active: true,
    email_verified: true,
    phone_verified: true,
    two_factor_enabled: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-20T15:30:00Z',
    last_login_at: '2024-01-20T15:30:00Z',
    onboarding_completed: true
  },
  {
    id: '3',
    email: 'contact@techcorp.com',
    role: 'organisation',
    company_name: 'TechCorp Solutions',
    industry: 'technology',
    phone: '+234-801-555-0123',
    profile_complete: true,
    trust_score: 92,
    sure_rating: 'Excellent',
    kyc_status: 'verified',
    is_active: true,
    email_verified: true,
    phone_verified: true,
    two_factor_enabled: true,
    created_at: '2024-01-10T08:00:00Z',
    updated_at: '2024-01-20T15:30:00Z',
    last_login_at: '2024-01-20T15:30:00Z',
    onboarding_completed: true
  },
  {
    id: '4',
    email: 'superadmin@idcertify.com',
    role: 'admin',
    permissions: ['admin.super'],
    first_name: 'Super',
    last_name: 'Admin',
    phone: '+234-801-111-1111',
    profile_complete: true,
    trust_score: 100,
    sure_rating: 'Excellent',
    kyc_status: 'verified',
    is_active: true,
    email_verified: true,
    phone_verified: true,
    two_factor_enabled: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-20T15:30:00Z',
    last_login_at: '2024-01-20T15:30:00Z',
    onboarding_completed: true
  }
]

export const mockDocuments: Document[] = [
  {
    id: 'doc1',
    user_id: '1',
    document_type: 'National ID',
    document_category: 'identity',
    file_name: 'national_id.pdf',
    file_path: '/documents/national_id.pdf',
    file_size: 2048000,
    mime_type: 'application/pdf',
    verification_status: 'verified',
    verified_at: '2024-01-16T10:00:00Z',
    document_number: 'NIN12345678901',
    issuing_authority: 'NIMC',
    issue_date: '2020-01-15',
    expiry_date: '2030-01-15',
    is_biometric_verified: true,
    confidence_score: 95,
    access_level: 'private',
    created_at: '2024-01-15T12:00:00Z',
    updated_at: '2024-01-16T10:00:00Z'
  },
  {
    id: 'doc2',
    user_id: '1',
    document_type: 'Passport',
    document_category: 'identity',
    file_name: 'passport.pdf',
    file_path: '/documents/passport.pdf',
    file_size: 1536000,
    mime_type: 'application/pdf',
    verification_status: 'verified',
    verified_at: '2024-01-17T14:00:00Z',
    document_number: 'A12345678',
    issuing_authority: 'Nigeria Immigration Service',
    issue_date: '2019-03-01',
    expiry_date: '2024-03-15',
    is_biometric_verified: true,
    confidence_score: 98,
    access_level: 'private',
    created_at: '2024-01-16T09:00:00Z',
    updated_at: '2024-01-17T14:00:00Z'
  },
  {
    id: 'doc3',
    user_id: '1',
    document_type: 'University Degree',
    document_category: 'education',
    file_name: 'degree_certificate.pdf',
    file_path: '/documents/degree_certificate.pdf',
    file_size: 3072000,
    mime_type: 'application/pdf',
    verification_status: 'pending',
    document_number: 'UL/2015/CS/001234',
    issuing_authority: 'University of Lagos',
    issue_date: '2015-07-15',
    is_biometric_verified: false,
    confidence_score: 0,
    access_level: 'private',
    created_at: '2024-01-18T11:00:00Z',
    updated_at: '2024-01-18T11:00:00Z'
  }
]

export const mockVerificationRequests: VerificationRequest[] = [
  {
    id: 'req1',
    requester_id: '3',
    target_user_id: '1',
    request_type: 'Employment Verification',
    verification_category: 'employment',
    title: 'Software Developer Position Verification',
    description: 'Please verify your employment history for the software developer position.',
    status: 'pending',
    priority: 'normal',
    created_at: '2024-01-20T09:00:00Z',
    updated_at: '2024-01-20T09:00:00Z'
  },
  {
    id: 'req2',
    requester_id: '3',
    target_user_id: '1',
    request_type: 'Identity Verification',
    verification_category: 'identity',
    title: 'KYC Identity Verification',
    description: 'Please provide identity verification for account setup.',
    status: 'approved',
    priority: 'high',
    responded_at: '2024-01-19T16:30:00Z',
    created_at: '2024-01-19T10:00:00Z',
    updated_at: '2024-01-19T16:30:00Z'
  },
  {
    id: 'req3',
    requester_id: '2',
    target_user_id: '1',
    request_type: 'Address Verification',
    verification_category: 'address',
    title: 'Residential Address Verification',
    description: 'Please verify your current residential address.',
    status: 'in_progress',
    priority: 'normal',
    created_at: '2024-01-18T14:00:00Z',
    updated_at: '2024-01-19T09:00:00Z'
  }
]

export const mockTransactions: Transaction[] = [
  {
    id: 'txn1',
    user_id: '1',
    type: 'credit',
    amount: 5000,
    currency: 'NGN',
    description: 'Wallet top-up',
    status: 'completed',
    created_at: '2024-01-18T14:00:00Z',
    processed_at: '2024-01-18T14:01:00Z'
  },
  {
    id: 'txn2',
    user_id: '1',
    type: 'debit',
    amount: 500,
    currency: 'NGN',
    description: 'ID verification fee',
    verification_request_id: 'req2',
    status: 'completed',
    created_at: '2024-01-19T16:30:00Z',
    processed_at: '2024-01-19T16:31:00Z'
  },
  {
    id: 'txn3',
    user_id: '1',
    type: 'credit',
    amount: 1000,
    currency: 'NGN',
    description: 'Referral bonus',
    status: 'completed',
    created_at: '2024-01-17T10:00:00Z',
    processed_at: '2024-01-17T10:01:00Z'
  }
]

export const mockNotifications: Notification[] = [
  {
    id: 'notif1',
    user_id: '1',
    type: 'verification',
    title: 'New Verification Request',
    message: 'TechCorp Solutions has requested employment verification.',
    priority: 'normal',
    is_read: false,
    created_at: '2024-01-20T09:00:00Z'
  },
  {
    id: 'notif2',
    user_id: '1',
    type: 'trust_score',
    title: 'Trust Score Updated',
    message: 'Your trust score has been updated to 85 after successful verification.',
    priority: 'normal',
    is_read: false,
    created_at: '2024-01-19T16:35:00Z'
  },
  {
    id: 'notif3',
    user_id: '1',
    type: 'wallet',
    title: 'Wallet Credited',
    message: 'Your wallet has been credited with ₦1,000 referral bonus.',
    priority: 'low',
    is_read: true,
    read_at: '2024-01-17T12:00:00Z',
    created_at: '2024-01-17T10:01:00Z'
  },
  {
    id: 'notif4',
    user_id: '1',
    type: 'document',
    title: 'Document Expiry Alert',
    message: 'Your passport will expire in 12 days. Please update your document.',
    priority: 'high',
    is_read: false,
    created_at: '2024-01-20T08:00:00Z'
  }
]

export const mockHistoricalRecords: HistoricalRecord[] = [
  {
    id: 'hist_001',
    user_id: '1', // John Doe
    data_type: 'employment_verification',
    verification_date: '2022-03-10',
    status: 'verified',
    source_system: 'Legacy HR System',
    details: {
      employer: 'Old Company Inc.',
      position: 'Software Developer',
      duration: '2018-2022',
      verified_by: 'HR Department'
    },
    imported_at: '2024-01-15T10:00:00Z',
    imported_by: 'admin@idcertify.com'
  },
  {
    id: 'hist_002',
    user_id: '1', // John Doe
    data_type: 'education_record',
    verification_date: '2017-07-20',
    status: 'verified',
    source_system: 'Previous KYC Provider',
    details: {
      institution: 'University of Lagos',
      degree: 'B.Sc. Computer Science',
      graduation_date: '2017-07-15'
    },
    imported_at: '2024-01-15T10:00:00Z',
    imported_by: 'admin@idcertify.com'
  },
  {
    id: 'hist_003',
    organisation_id: '3', // TechCorp Solutions
    data_type: 'identity_verification',
    verification_date: '2023-05-01',
    status: 'failed',
    source_system: 'Internal Audit Tool',
    details: {
      person_name: 'Employee A',
      reason: 'Document mismatch',
      attempt_count: 3
    },
    imported_at: '2024-01-16T14:30:00Z',
    imported_by: 'admin@idcertify.com',
    notes: 'Requires manual review and re-submission.'
  },
  {
    id: 'hist_004',
    user_id: '1', // John Doe
    data_type: 'address_verification',
    verification_date: '2023-11-01',
    status: 'pending',
    source_system: 'Manual Upload',
    details: { address: '123 Main St, City, Country', document: 'Utility Bill' },
    imported_at: '2024-01-17T09:00:00Z'
  }
]

// Helper functions
export const getUserDisplayName = (profile: UserProfile) => {
  if (profile.role === 'organisation') {
    return profile.company_name || 'Organization'
  }
  return `${profile.first_name || ''} ${profile.last_name || ''}`.trim() || profile.email
}

export const getTrustScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-600'
  if (score >= 60) return 'text-yellow-600'
  if (score >= 40) return 'text-orange-600'
  return 'text-red-600'
}

export const getTrustScoreBadge = (score: number) => {
  if (score >= 90) return { label: 'Excellent', color: 'bg-green-100 text-green-800' }
  if (score >= 80) return { label: 'Very Good', color: 'bg-green-100 text-green-700' }
  if (score >= 70) return { label: 'Good', color: 'bg-yellow-100 text-yellow-800' }
  if (score >= 60) return { label: 'Fair', color: 'bg-yellow-100 text-yellow-700' }
  if (score >= 40) return { label: 'Poor', color: 'bg-orange-100 text-orange-800' }
  return { label: 'Very Poor', color: 'bg-red-100 text-red-800' }
}