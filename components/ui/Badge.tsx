import { forwardRef } from 'react'
import { Chip } from '@mui/material'
import type { ChipProps } from '@mui/material/Chip'

interface BadgeProps extends Omit<ChipProps, 'variant' | 'size'> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'error' | 'gradient'
  size?: 'sm' | 'md' | 'lg'
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ variant = 'secondary', size = 'md', sx, ...props }, ref) => {
    
    const getVariantStyles = () => {
      switch (variant) {
        case 'default':
          return {
            background: 'rgba(156, 163, 175, 0.15)',
            color: 'text.primary',
            border: '1px solid rgba(156, 163, 175, 0.3)',
          }
        case 'secondary':
          return {
            background: 'rgba(59, 130, 246, 0.15)',
            color: 'primary.main',
            border: '1px solid rgba(59, 130, 246, 0.3)',
          }
        case 'success':
          return {
            background: 'rgba(34, 197, 94, 0.15)',
            color: 'success.main',
            border: '1px solid rgba(34, 197, 94, 0.3)',
          }
        case 'warning':
          return {
            background: 'rgba(245, 158, 11, 0.15)',
            color: 'warning.main',
            border: '1px solid rgba(245, 158, 11, 0.3)',
          }
        case 'error':
          return {
            background: 'rgba(239, 68, 68, 0.15)',
            color: 'error.main',
            border: '1px solid rgba(239, 68, 68, 0.3)',
          }
        case 'gradient':
          return {
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.8) 0%, rgba(147, 51, 234, 0.8) 100%)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }
        default:
          return {}
      }
    }

    const getSizeStyles = () => {
      switch (size) {
        case 'sm':
          return { 
            height: 24, 
            fontSize: '0.75rem',
            px: 1.5,
          }
        case 'md':
          return { 
            height: 32, 
            fontSize: '0.875rem',
            px: 2,
          }
        case 'lg':
          return { 
            height: 40, 
            fontSize: '1rem',
            px: 2.5,
          }
        default:
          return {}
      }
    }

    return (
      <Chip
        ref={ref}
        variant="outlined"
        sx={{
          borderRadius: 4,
          fontWeight: 600,
          backdropFilter: 'blur(4px)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
          ...getVariantStyles(),
          ...getSizeStyles(),
          ...sx,
        }}
        {...props}
      />
    )
  }
)

Badge.displayName = 'Badge'

export { Badge }