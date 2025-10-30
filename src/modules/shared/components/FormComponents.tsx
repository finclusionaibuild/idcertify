import React from 'react'
import { Search, ChevronDown } from 'lucide-react'

// Reusable search input with consistent spacing
export const SearchInput: React.FC<{
  placeholder?: string
  value: string
  onChange: (value: string) => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
}> = ({ placeholder = 'Search...', value, onChange, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'pl-8 pr-3 py-1.5 text-sm',
    md: 'pl-10 pr-4 py-2 text-sm',
    lg: 'pl-12 pr-5 py-3 text-base'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const iconPositions = {
    sm: 'left-2',
    md: 'left-3',
    lg: 'left-4'
  }

  return (
    <div className={`relative ${className}`}>
      <Search className={`absolute ${iconPositions[size]} top-1/2 transform -translate-y-1/2 ${iconSizes[size]} text-gray-400`} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${sizeClasses[size]} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors`}
      />
    </div>
  )
}

// Reusable select dropdown with consistent spacing
export const SelectDropdown: React.FC<{
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  placeholder?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}> = ({ value, onChange, options, placeholder, className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'pl-3 pr-8 py-1.5 text-sm',
    md: 'pl-4 pr-10 py-2 text-sm',
    lg: 'pl-5 pr-12 py-3 text-base'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const iconPositions = {
    sm: 'right-2',
    md: 'right-3',
    lg: 'right-4'
  }

  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none w-full ${sizeClasses[size]} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className={`absolute inset-y-0 ${iconPositions[size]} flex items-center pointer-events-none`}>
        <ChevronDown className={`${iconSizes[size]} text-gray-400`} />
      </div>
    </div>
  )
}

// Reusable input field with optional left icon
export const InputField: React.FC<{
  type?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  leftIcon?: React.ComponentType<{ className?: string }>
  rightIcon?: React.ComponentType<{ className?: string }>
  className?: string
  size?: 'sm' | 'md' | 'lg'
}> = ({ 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  leftIcon: LeftIcon, 
  rightIcon: RightIcon,
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'pl-8 pr-8 py-1.5 text-sm',
    md: 'pl-10 pr-10 py-2 text-sm',
    lg: 'pl-12 pr-12 py-3 text-base'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  const iconPositions = {
    sm: { left: 'left-2', right: 'right-2' },
    md: { left: 'left-3', right: 'right-3' },
    lg: { left: 'left-4', right: 'right-4' }
  }

  // Adjust padding based on icons
  let paddingClasses = sizeClasses[size]
  if (LeftIcon && !RightIcon) {
    paddingClasses = paddingClasses.replace('pr-8', 'pr-3').replace('pr-10', 'pr-4').replace('pr-12', 'pr-5')
  } else if (!LeftIcon && RightIcon) {
    paddingClasses = paddingClasses.replace('pl-8', 'pl-3').replace('pl-10', 'pl-4').replace('pl-12', 'pl-5')
  } else if (!LeftIcon && !RightIcon) {
    paddingClasses = paddingClasses.replace('pl-8', 'pl-3').replace('pl-10', 'pl-4').replace('pl-12', 'pl-5')
    paddingClasses = paddingClasses.replace('pr-8', 'pr-3').replace('pr-10', 'pr-4').replace('pr-12', 'pr-5')
  }

  return (
    <div className={`relative ${className}`}>
      {LeftIcon && (
        <div className={`absolute inset-y-0 ${iconPositions[size].left} flex items-center pointer-events-none`}>
          <LeftIcon className={`${iconSizes[size]} text-gray-400`} />
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full ${paddingClasses} border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors`}
      />
      {RightIcon && (
        <div className={`absolute inset-y-0 ${iconPositions[size].right} flex items-center pointer-events-none`}>
          <RightIcon className={`${iconSizes[size]} text-gray-400`} />
        </div>
      )}
    </div>
  )
}

// Reusable button with consistent styling
export const Button: React.FC<{
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
}> = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  className = '',
  type = 'button'
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    warning: 'bg-yellow-600 text-white hover:bg-yellow-700 focus:ring-yellow-500'
  }

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  }

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : ''

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
    >
      {children}
    </button>
  )
}
