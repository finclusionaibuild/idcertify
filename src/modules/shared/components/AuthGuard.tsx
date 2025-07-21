import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { UserRole } from '../lib/mockData'

interface AuthGuardProps {
  children: React.ReactNode
  roles?: UserRole[]
  requireOnboarding?: boolean
  permissions?: string[]
}

const AuthGuard = ({ children, roles, requireOnboarding = false, permissions = [] }: AuthGuardProps) => {
  const { user, profile, loading, checkPermission } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user || !profile) {
    return <Navigate to="/auth" replace />
  }

  if (roles && !roles.includes(profile.role)) {
    return <Navigate to="/unauthorized" replace />
  }

  // Check permissions if specified
  if (permissions.length > 0 && !permissions.some(permission => checkPermission(permission))) {
    return <Navigate to="/unauthorized" replace />
  }

  // Redirect to onboarding if required and not completed
  if (requireOnboarding && profile && !profile.onboarding_completed) {
    return <Navigate to="/onboarding" replace />
  }

  return <>{children}</>
}

export default AuthGuard