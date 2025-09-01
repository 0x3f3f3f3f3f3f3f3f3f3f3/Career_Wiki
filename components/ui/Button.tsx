import { forwardRef, cloneElement, isValidElement } from 'react'
import { Button as MUIButton, CircularProgress } from '@mui/material'
import type { ButtonProps as MUIButtonProps } from '@mui/material/Button'

interface ButtonProps extends Omit<MUIButtonProps, 'variant' | 'size'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', children, loading, disabled, asChild, sx, ...props }, ref) => {
    
    const variantMapping = {
      primary: 'contained' as const,
      secondary: 'contained' as const,
      ghost: 'outlined' as const,
      danger: 'contained' as const,
    }

    const sizeMapping = {
      sm: 'small' as const,
      md: 'medium' as const,
      lg: 'large' as const,
    }

    const getVariantStyles = () => {
      switch (variant) {
        case 'primary':
          return {
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 1) 0%, rgba(147, 51, 234, 1) 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 10px 15px rgba(59, 130, 246, 0.2), 0 4px 6px rgba(147, 51, 234, 0.1)',
            },
          }
        case 'secondary':
          return {
            background: 'rgba(255, 255, 255, 0.8)',
            color: '#374151',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(12px)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.9)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              transform: 'translateY(-1px)',
            },
          }
        case 'ghost':
          return {
            background: 'rgba(255, 255, 255, 0.6)',
            color: '#374151',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.8)',
              border: '2px solid rgba(255, 255, 255, 0.7)',
              color: '#1f2937',
              transform: 'translateY(-1px)',
            },
          }
        case 'danger':
          return {
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.9) 0%, rgba(220, 38, 38, 0.9) 100%)',
            color: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(8px)',
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 1) 0%, rgba(220, 38, 38, 1) 100%)',
              transform: 'translateY(-1px)',
              boxShadow: '0 10px 15px rgba(239, 68, 68, 0.2), 0 4px 6px rgba(220, 38, 38, 0.1)',
            },
          }
        default:
          return {}
      }
    }

    if (asChild) {
      if (isValidElement(children)) {
        return cloneElement(children, {
          sx: { ...getVariantStyles(), ...sx }
        })
      }
      return <span>{children}</span>
    }

    return (
      <MUIButton
        ref={ref}
        variant={variantMapping[variant]}
        size={sizeMapping[size]}
        disabled={disabled || loading}
        sx={{
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
          transition: 'all 0.2s ease-in-out',
          '&:active': {
            transform: 'translateY(0)',
          },
          ...getVariantStyles(),
          ...sx,
        }}
        startIcon={loading ? <CircularProgress size={16} color="inherit" /> : undefined}
        {...props}
      >
        {children}
      </MUIButton>
    )
  }
)

Button.displayName = 'Button'

export { Button }