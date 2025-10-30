import React from 'react'
import { CheckCircle, XCircle, Clock, AlertTriangle, Info, RefreshCw, Pause } from 'lucide-react'

// Common status badge component
export const StatusBadge: React.FC<{
  status: string
  variant?: 'default' | 'compact'
  showIcon?: boolean
}> = ({ status, variant = 'default', showIcon = true }) => {
  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'success':
      case 'available':
      case 'verified':
      case 'active':
      case 'enabled':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: <CheckCircle className="w-4 h-4 text-green-500" />
        }
      case 'running':
      case 'processing':
      case 'restoring':
      case 'pending':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          icon: <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
        }
      case 'scheduled':
      case 'waiting':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: <Clock className="w-4 h-4 text-yellow-500" />
        }
      case 'failed':
      case 'error':
      case 'corrupted':
      case 'disabled':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: <XCircle className="w-4 h-4 text-red-500" />
        }
      case 'paused':
      case 'stopped':
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: <Pause className="w-4 h-4 text-gray-500" />
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: <Info className="w-4 h-4 text-gray-500" />
        }
    }
  }

  const config = getStatusConfig(status)
  const size = variant === 'compact' ? 'px-2 py-0.5 text-xs' : 'px-2 py-1 text-xs'

  return (
    <span className={`inline-flex items-center gap-1.5 ${size} font-medium rounded-full ${config.bg} ${config.text}`}>
      {showIcon && config.icon}
      <span className="capitalize">{status}</span>
    </span>
  )
}

// Common type badge component
export const TypeBadge: React.FC<{
  type: string
  variant?: 'default' | 'compact'
}> = ({ type, variant = 'default' }) => {
  const getTypeConfig = (type: string) => {
    switch (type.toLowerCase()) {
      case 'full':
        return {
          bg: 'bg-purple-100',
          text: 'text-purple-800'
        }
      case 'incremental':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800'
        }
      case 'differential':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800'
        }
      case 'daily':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800'
        }
      case 'weekly':
        return {
          bg: 'bg-indigo-100',
          text: 'text-indigo-800'
        }
      case 'monthly':
        return {
          bg: 'bg-pink-100',
          text: 'text-pink-800'
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800'
        }
    }
  }

  const config = getTypeConfig(type)
  const size = variant === 'compact' ? 'px-2 py-0.5 text-xs' : 'px-2 py-1 text-xs'

  return (
    <span className={`${size} font-medium rounded-full ${config.bg} ${config.text} capitalize`}>
      {type}
    </span>
  )
}

// Common action button component
export const ActionButton: React.FC<{
  icon: React.ComponentType<{ className?: string }>
  onClick: () => void
  label: string
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  size?: 'sm' | 'md'
}> = ({ icon: Icon, onClick, label, variant = 'secondary', size = 'md' }) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'text-primary-600 hover:text-primary-900 hover:bg-primary-50'
      case 'danger':
        return 'text-red-600 hover:text-red-900 hover:bg-red-50'
      case 'success':
        return 'text-green-600 hover:text-green-900 hover:bg-green-50'
      case 'warning':
        return 'text-yellow-600 hover:text-yellow-900 hover:bg-yellow-50'
      default:
        return 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
    }
  }

  const sizeClasses = size === 'sm' ? 'p-1' : 'p-1.5'

  return (
    <button
      onClick={onClick}
      className={`${sizeClasses} rounded transition-colors ${getVariantClasses()}`}
      title={label}
    >
      <Icon className="w-4 h-4" />
    </button>
  )
}

// Common table cell wrapper
export const TableCell: React.FC<{
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}> = ({ children, className = '', align = 'left' }) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <td className={`px-6 py-4 text-sm ${alignClasses[align]} ${className}`}>
      {children}
    </td>
  )
}

// Common table header cell wrapper
export const TableHeader: React.FC<{
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  sortable?: boolean
  onSort?: () => void
  sortDirection?: 'asc' | 'desc' | null
}> = ({ children, className = '', align = 'left', sortable = false, onSort, sortDirection }) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }

  return (
    <th
      className={`px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider ${
        alignClasses[align]
      } ${
        sortable ? 'cursor-pointer hover:bg-gray-100 transition-colors' : ''
      } ${className}`}
      onClick={sortable ? onSort : undefined}
    >
      {children}
    </th>
  )
}

// Common empty state component
export const EmptyState: React.FC<{
  icon?: React.ComponentType<{ className?: string }>
  title: string
  description?: string
  action?: React.ReactNode
}> = ({ icon: Icon, title, description, action }) => {
  return (
    <div className="text-center py-12">
      {Icon && (
        <div className="w-12 h-12 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <Icon className="w-6 h-6 text-gray-400" />
        </div>
      )}
      <h3 className="text-sm font-medium text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  )
}

// Common loading skeleton for table rows
export const TableSkeleton: React.FC<{
  rows?: number
  columns?: number
}> = ({ rows = 5, columns = 6 }) => {
  return (
    <tbody className="bg-white divide-y divide-gray-100">
      {[...Array(rows)].map((_, rowIndex) => (
        <tr key={rowIndex} className="animate-pulse">
          {[...Array(columns)].map((_, colIndex) => (
            <td key={colIndex} className="px-6 py-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  )
}
