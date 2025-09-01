import { forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'ghost'
  inputSize?: 'sm' | 'md' | 'lg'
  icon?: React.ReactNode
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', inputSize = 'md', icon, type, ...props }, ref) => {
    const baseClasses = "w-full border transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
    
    const variants = {
      default: "backdrop-blur-xl bg-white/60 border border-white/30 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 focus:bg-white/80 placeholder:text-gray-400 shadow-sm",
      ghost: "backdrop-blur-xl bg-white/40 border border-white/20 rounded-2xl hover:bg-white/60 focus:bg-white/80 focus:border-white/40 shadow-sm"
    }
    
    const sizes = {
      sm: "px-3 py-2 text-sm",
      md: "px-4 py-3 text-sm",
      lg: "px-5 py-4 text-base"
    }

    const iconPadding = icon ? {
      sm: "pl-9",
      md: "pl-11", 
      lg: "pl-12"
    }[inputSize] : ""

    return (
      <div className="relative">
        {icon && (
          <div className={cn(
            "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400",
            inputSize === 'sm' && "left-2.5",
            inputSize === 'lg' && "left-4"
          )}>
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(baseClasses, variants[variant], sizes[inputSize], iconPadding, className)}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }