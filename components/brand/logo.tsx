import { cn } from '@/lib/utils';

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 font-semibold tracking-wide transition', className)}>
      <span className="grid h-7 w-7 place-items-center rounded-full border border-amber/60 bg-amber/10 text-xs text-amber transition group-hover:scale-105 group-hover:shadow-glow">LL</span>
      <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-amber/80 after:transition-all group-hover:after:w-full">Le Lieu</span>
    </span>
  );
}
