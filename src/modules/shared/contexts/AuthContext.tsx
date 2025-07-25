import React, { createContext, useContext, useEffect, useState } from 'react'
import { UserProfile, mockUsers } from '../lib/mockData'

interface AuthContextType {
  user: { id: string; email: string } | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, _password: string, role: string, additionalData?: any) => Promise<any>
  signIn: (email: string, _password?: string) => Promise<any>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
  checkPermission: (permission: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('idcertify_user')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      loadProfile(userData.id)
    } else {
      setLoading(false)
    }
  }, [])

  const loadProfile = (userId: string) => {
    try {
      const userProfile = mockUsers.find(u => u.id === userId)
      if (userProfile) {
        setProfile(userProfile)
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, _password: string, role: string, additionalData: any = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email)
    if (existingUser) {
      throw new Error('User already exists')
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      role: role as any,
      ...additionalData,
      profile_complete: false,
      trust_score: 0,
      sure_rating: 'Unverified',
      kyc_status: 'pending' as any,
      is_active: true,
      email_verified: false,
      phone_verified: false,
      two_factor_enabled: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      onboarding_completed: false
    }

    // Add to mock data
    mockUsers.push(newUser)

    // Set user session
    const userData = { id: newUser.id, email: newUser.email }
    setUser(userData)
    setProfile(newUser)
    localStorage.setItem('idcertify_user', JSON.stringify(userData))

    return { user: userData }
  }

  const signIn = async (email: string, _password?: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Find user by email
    const userProfile = mockUsers.find(u => u.email === email)
    if (!userProfile) {
      throw new Error('Invalid email or password')
    }

    // Set user session
    const userData = { id: userProfile.id, email: userProfile.email }
    setUser(userData)
    setProfile(userProfile)
    localStorage.setItem('idcertify_user', JSON.stringify(userData))

    return { user: userData }
  }

  const signOut = async () => {
    setUser(null)
    setProfile(null)
    localStorage.removeItem('idcertify_user')
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) throw new Error('No user logged in')

    // Update profile in mock data
    const updatedProfile = { ...profile, ...updates, updated_at: new Date().toISOString() }
    const userIndex = mockUsers.findIndex(u => u.id === user.id)
    if (userIndex !== -1) {
      mockUsers[userIndex] = updatedProfile
    }

    setProfile(updatedProfile)
  }

  const checkPermission = (permission: string): boolean => {
    if (!profile) return false
    
    // Super Admin has all permissions
    if (profile.role === 'admin' && profile.email === 'superadmin@idcertify.com') {
      return true
    }
    
    // For now, just check role-based permissions
    // In a real app, this would check against a permissions array in the user profile
    if (permission === 'admin.access') {
      return profile.role === 'admin'
    }
    
    if (permission === 'organisation.access') {
      return profile.role === 'organisation'
    }
    
    if (permission === 'individual.access') {
      return profile.role === 'individual'
    }
    
    return false
  }

  const value = {
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    checkPermission,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}