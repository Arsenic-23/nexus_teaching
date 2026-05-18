import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  label?: string;
}

const sizeMap = {
  sm: 'w-4 h-4 border-2',
  md: 'w-8 h-8 border-2',
  lg: 'w-12 h-12 border-[3px]',
  xl: 'w-16 h-16 border-4',
};

export function LoadingSpinner({ size = 'md', className, label }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'rounded-full border-border border-t-primary animate-spin',
          sizeMap[size],
        )}
        role="status"
        aria-label={label || 'Loading...'}
      />
      {label && <p className="text-sm text-muted-foreground animate-pulse">{label}</p>}
    </div>
  );
}

export function FullPageLoader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-border border-t-primary animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-gradient-xp" />
          </div>
        </div>
        <p className="text-sm text-muted-foreground font-medium">{label}</p>
      </div>
    </div>
  );
}
