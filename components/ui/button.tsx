import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'focus-ring inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]',
  {
    variants: {
      variant: {
        default: 'bg-amber text-black hover:scale-[1.02] hover:shadow-glow hover:brightness-110',
        ghost: 'text-foreground hover:scale-[1.02] hover:bg-white/10'
      },
      size: {
        default: 'h-11 px-6',
        lg: 'h-14 px-8 text-base'
      }
    },
    defaultVariants: { variant: 'default', size: 'default' }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return <button suppressHydrationWarning className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}
