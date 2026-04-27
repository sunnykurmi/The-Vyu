import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { CurvedScreenEffectImpl } from './CurvedScreenEffectImpl';
import { CurvedScrollEffectImpl } from './CurvedScrollEffectImpl';

export default function ScrollDistortion({ targetIntensity, currentIntensity }) {
  const effect = useMemo(() => new CurvedScrollEffectImpl({ intensity: 0 }), []);

  useFrame(() => {
    // Smoothly interpolate currentIntensity toward targetIntensity
    const lerpSpeed = 0.1;
    currentIntensity.current += (targetIntensity.current - currentIntensity.current) * lerpSpeed;

    // Clamp to [0, 0.4]
    currentIntensity.current = Math.max(0, Math.min(0.3, currentIntensity.current));

    // Apply to effect
    effect.intensity = currentIntensity.current;
  });

  return <primitive object={effect} />;
}
