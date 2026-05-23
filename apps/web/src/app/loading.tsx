import { LottieAnimation } from '@/components/ui/lottie-animation';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-page gap-4">
      {/* Animated Lottie loader */}
      <div className="w-48 h-48 opacity-90 drop-shadow-xl">
        <LottieAnimation animationPath="/lottie/Sandy Loading.json" loop={true} />
      </div>

      <div className="text-center space-y-2 -mt-4">
        <p className="text-2xl font-display font-black tracking-tight text-foreground">Nexus</p>
        <p className="text-sm font-medium text-muted-foreground animate-pulse tracking-wide uppercase">Preparing your dashboard...</p>
      </div>
    </div>
  );
}
