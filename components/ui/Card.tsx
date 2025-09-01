import { forwardRef } from 'react'
import { Card as MUICard, CardHeader as MUICardHeader, CardContent as MUICardContent, Typography, Box } from '@mui/material'
import type { CardProps as MUICardProps } from '@mui/material/Card'
import type { TypographyProps } from '@mui/material/Typography'

interface CardProps extends Omit<MUICardProps, 'variant'> {
  variant?: 'default' | 'interactive' | 'glass' | 'gradient'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  asChild?: boolean
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', children, asChild, sx, ...props }, ref) => {
    
    const getVariantStyles = () => {
      switch (variant) {
        case 'default':
          return {
            background: 'rgba(255, 255, 255, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(12px)',
          }
        case 'interactive':
          return {
            background: 'rgba(255, 255, 255, 0.6)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(12px)',
            cursor: 'pointer',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              background: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.4)',
              transform: 'translateY(-8px)',
              boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1), 0 10px 10px rgba(0, 0, 0, 0.04)',
            },
          }
        case 'glass':
          return {
            background: 'rgba(255, 255, 255, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          }
        case 'gradient':
          return {
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.7) 0%, rgba(243, 244, 246, 0.5) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            backdropFilter: 'blur(12px)',
          }
        default:
          return {}
      }
    }

    const getPaddingStyles = () => {
      switch (padding) {
        case 'none':
          return { p: 0 }
        case 'sm':
          return { p: 2 }
        case 'md':
          return { p: 3 }
        case 'lg':
          return { p: 4 }
        case 'xl':
          return { p: 6 }
        default:
          return { p: 3 }
      }
    }

    if (asChild) {
      return (
        <Box sx={{ ...getVariantStyles(), ...getPaddingStyles(), ...sx }}>
          {children}
        </Box>
      )
    }

    return (
      <MUICard
        ref={ref}
        sx={{
          borderRadius: 2,
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          ...getVariantStyles(),
          ...getPaddingStyles(),
          ...sx,
        }}
        {...props}
      >
        {children}
      </MUICard>
    )
  }
)

Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ children, sx, ...props }, ref) => (
    <MUICardHeader
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 0,
        ...sx,
      }}
      title={children}
      {...props}
    />
  )
)
CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ variant = 'h3', sx, ...props }, ref) => (
    <Typography
      ref={ref}
      variant={variant}
      component={variant}
      sx={{
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
        '&:hover': {
          color: 'primary.main',
        },
        ...sx,
      }}
      {...props}
    />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, TypographyProps>(
  ({ sx, ...props }, ref) => (
    <Typography
      ref={ref}
      variant="body2"
      color="text.secondary"
      sx={{
        lineHeight: 1.6,
        ...sx,
      }}
      {...props}
    />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ sx, ...props }, ref) => (
    <MUICardContent
      ref={ref}
      sx={{
        pt: 3,
        p: 0,
        '&:last-child': {
          pb: 0,
        },
        ...sx,
      }}
      {...props}
    />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ sx, ...props }, ref) => (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        alignItems: 'center',
        pt: 3,
        borderTop: '1px solid',
        borderColor: 'grey.100',
        ...sx,
      }}
      {...props}
    />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }