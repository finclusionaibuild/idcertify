import React, { createContext, useContext, useState, useCallback } from 'react'
import { Bell, CheckCircle, AlertTriangle, Info, Clock, X } from 'lucide-react'

export type NotificationType = 'success' | 'error' | 'warning' | 'info' | 'system'

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
  actionText?: string
}

interface NotificationContextType {
  notifications: Notification[]
  unreadCount: number
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  removeNotification: (id: string) => void
  clearAllNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotifications = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider')
  }
  return context
}

interface NotificationProviderProps {
  children: React.ReactNode
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'KYC Verification Complete',
      message: 'Your identity verification has been completed successfully.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false
    },
    {
      id: '2',
      type: 'info',
      title: 'System Maintenance',
      message: 'Scheduled maintenance will occur tonight at 2:00 AM.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      read: false
    },
    {
      id: '3',
      type: 'warning',
      title: 'Session Expiring Soon',
      message: 'Your session will expire in 5 minutes. Please save your work.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      read: true
    },
    {
      id: '4',
      type: 'success',
      title: 'Payment Processed',
      message: 'Your payment of $500 has been processed successfully.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: true
    },
    {
      id: '5',
      type: 'error',
      title: 'Upload Failed',
      message: 'Failed to upload document. Please try again.',
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      read: false
    }
  ])

  const unreadCount = notifications.filter(n => !n.read).length

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotification: Notification = {
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
      ...notification
    }
    setNotifications(prev => [newNotification, ...prev])
  }, [])

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }, [])

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }, [])

  const clearAllNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      addNotification,
      markAsRead,
      markAllAsRead,
      removeNotification,
      clearAllNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  )
}
