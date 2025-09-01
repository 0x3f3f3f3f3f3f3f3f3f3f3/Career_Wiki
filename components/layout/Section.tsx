import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'gradient' | 'dark' | 'glass'
  spacing?: 'sm' | 'md' | 'lg' | 'xl'
}

const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, variant = 'default', spacing = 'lg', children, ...props }, ref) => {
    const baseClasses = "relative"
    
    const variants = {
      default: "bg-white",
      gradient: "bg-gradient-to-br from-blue-50 via-white to-purple-50", 
      dark: "bg-gradient-to-r from-gray-900 to-gray-800 text-white",
      glass: "backdrop-blur-xl bg-white/60"
    }
    
    const spacings = {
      sm: "py-12",
      md: "py-16", 
      lg: "py-20",
      xl: "py-28"
    }

    return (
      <section
        className={cn(baseClasses, variants[variant], spacings[spacing], className)}
        ref={ref}
        {...props}
      >
        {children}
      </section>
    )
  }
)

Section.displayName = 'Section'

export { Section }