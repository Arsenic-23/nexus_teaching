'use client';

import dynamic from 'next/dynamic';
import { HTMLAttributes, useEffect, useState } from 'react';

// Dynamically import Lottie to prevent SSR hydration errors
const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface LottieAnimationProps extends HTMLAttributes<HTMLDivElement> {
  animationPath: string;
  loop?: boolean;
  autoplay?: boolean;
}

export function LottieAnimation({
  animationPath,
  loop = true,
  autoplay = true,
  className,
  ...props
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<any>(null);

  useEffect(() => {
    fetch(animationPath)
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error('Failed to load Lottie animation:', err));
  }, [animationPath]);

  if (!animationData) {
    return <div className={className} {...props} />;
  }

  return (
    <div className={className} {...props}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}
