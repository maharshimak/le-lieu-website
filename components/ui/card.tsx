import * as React from 'react';
import { cn } from '@/lib/utils';

export function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('glass rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-amber/50', className)} {...props} />;
}
