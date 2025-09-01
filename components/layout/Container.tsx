import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = 'xl', padding = 'md', children, ...props }, ref) => {
    const baseClasses = "mx-auto w-full"
    
    const sizes = {
      sm: "max-w-3xl",
      md: "max-w-5xl", 
      lg: "max-w-6xl",
      xl: "max-w-7xl",
      full: "max-w-none w-full"
    }
    
    const paddings = {
      none: "",
      sm: "px-4 lg:px-6",
      md: "px-6 lg:px-8",
      lg: "px-8 lg:px-12"
    }

    return (
      <div
        className={cn(baseClasses, sizes[size], paddings[padding], className)}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Container.displayName = 'Container'

export { Container }