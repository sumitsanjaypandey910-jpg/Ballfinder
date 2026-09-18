import React from 'react';
import { BallSkin } from '../types.ts';

interface BallElementProps {
  skin: BallSkin;
  size?: number;
  isRevealed?: boolean;
}

export const BallElement: React.FC<BallElementProps> = ({
  skin,
  size = 64,
  isRevealed = true
}) => {
  return (
    <div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
    >
      {/* Floor cast shadow */}
      <div
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-3 rounded-full bg-black/40 blur-[2px] transition-all"
        style={{
          transform: isRevealed ? 'translateX(-50%) scale(1)' : 'translateX(-50%) scale(0.8)'
        }}
      />

      {/* 3D Striped Sphere SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-md transition-transform"
        style={{
          transform: isRevealed ? 'translateY(0)' : 'translateY(4px)'
        }}
      >
        <defs>
          <radialGradient id={`sphereShade-${skin.id}`} cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="25%" stopColor={skin.primaryColor} stopOpacity="0.9" />
            <stop offset="85%" stopColor="#0f172a" stopOpacity="0.8" />
          </radialGradient>

          <clipPath id={`sphereClip-${skin.id}`}>
            <circle cx="50" cy="50" r="46" />
          </clipPath>
        </defs>

        {/* Sphere Base */}
        <circle cx="50" cy="50" r="46" fill={skin.primaryColor} />

        {/* Stripes / Pattern Clipped to Sphere */}
        <g clipPath={`url(#sphereClip-${skin.id})`}>
          {skin.pattern === 'striped' && (
            <>
              {/* Curved stripes matching the screenshot */}
              <path
                d="M 0 32 Q 50 44 100 32 L 100 42 Q 50 54 0 42 Z"
                fill={skin.secondaryColor}
              />
              <path
                d="M 0 48 Q 50 60 100 48 L 100 58 Q 50 70 0 58 Z"
                fill="#ffffff"
              />
              <path
                d="M 0 64 Q 50 76 100 64 L 100 74 Q 50 86 0 74 Z"
                fill={skin.secondaryColor}
              />
              <path
                d="M 0 80 Q 50 92 100 80 L 100 88 Q 50 100 0 88 Z"
                fill="#ffffff"
              />
            </>
          )}

          {skin.pattern === 'stars' && (
            <>
              <circle cx="50" cy="50" r="18" fill={skin.secondaryColor} />
              <polygon points="50,25 55,40 70,40 58,50 62,65 50,55 38,65 42,50 30,40 45,40" fill="#ffffff" />
            </>
          )}

          {skin.pattern === 'dots' && (
            <>
              <circle cx="35" cy="40" r="8" fill={skin.secondaryColor} />
              <circle cx="65" cy="40" r="8" fill={skin.secondaryColor} />
              <circle cx="50" cy="65" r="8" fill={skin.secondaryColor} />
            </>
          )}

          {skin.pattern === 'swirl' && (
            <path
              d="M 20 20 Q 50 80 80 20 Q 50 50 20 80"
              stroke={skin.secondaryColor}
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
          )}

          {/* 3D Lighting and Shadow Overlay */}
          <circle cx="50" cy="50" r="46" fill={`url(#sphereShade-${skin.id})`} />
        </g>

        {/* Specular Highlight */}
        <ellipse
          cx="38"
          cy="32"
          rx="14"
          ry="8"
          transform="rotate(-30 38 32)"
          fill="#ffffff"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
