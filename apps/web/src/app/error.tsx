'use client';

import { useEffect } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-page px-4 text-center">
      {/* Error icon */}
      <div className="w-20 h-20 rounded-2xl bg-destructive/10 border border-destructive/20 flex items-center justify-center mb-6">
        <AlertTriangle className="w-10 h-10 text-destructive" />
      </div>

      <h1 className="text-3xl font-display font-bold mb-2">Something went wrong</h1>
      <p className="text-muted-foreground mb-2 max-w-md">
        We encountered an unexpected error. Don&apos;t worry — your progress is saved.
      </p>
      {error.digest && (
        <p className="text-xs text-muted-foreground mb-6 font-mono">
          Error ID: {error.digest}
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Button onClick={reset} variant="glow" className="gap-2">
          <RotateCcw className="w-4 h-4" />
          Try Again
        </Button>
        <Link href="/student/dashboard">
          <Button variant="outline" className="gap-2">
            <Home className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
