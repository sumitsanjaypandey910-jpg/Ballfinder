import React from 'react';

export const AudienceSilhouettes: React.FC = () => {
  return (
    <div className="relative w-full h-24 sm:h-28 bg-gradient-to-t from-black via-slate-950/95 to-slate-900/80 border-t-2 border-amber-900/40 select-none overflow-hidden" id="theater-audience-row">
      <svg
        viewBox="0 0 1000 140"
        preserveAspectRatio="none"
        className="w-full h-full fill-slate-950/90 text-slate-950"
      >
        <defs>
          <linearGradient id="audienceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e1b4b" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#09090b" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#020617" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Audience Heads & Profiles (matching screenshot layout) */}
        <g fill="url(#audienceGrad)">
          {/* Person 1 (Left - Man with glasses/short hair) */}
          <path d="M -20 140 L -20 80 Q 5 60 25 35 Q 45 10 70 25 Q 90 40 85 75 Q 80 110 110 140 Z" />
          
          {/* Person 2 (Woman with ponytail/bun) */}
          <path d="M 100 140 Q 120 100 135 60 Q 150 15 180 20 Q 210 25 215 65 Q 220 105 245 140 Z" />
          {/* Ponytail extension */}
          <path d="M 130 50 Q 110 20 140 10 Q 160 15 155 35 Z" />

          {/* Person 3 (Boy with bob hair) */}
          <path d="M 235 140 Q 255 105 270 70 Q 285 30 320 30 Q 355 30 370 70 Q 385 105 405 140 Z" />

          {/* Person 4 (Cool hair swoop) */}
          <path d="M 395 140 Q 415 100 435 65 Q 450 35 480 30 Q 515 25 540 60 Q 560 100 580 140 Z" />
          {/* Hair swoop crest */}
          <path d="M 460 30 Q 480 -5 520 10 Q 500 25 480 30 Z" />

          {/* Person 5 (Gentleman with bowler hat) */}
          <path d="M 570 140 Q 590 100 610 65 Q 630 40 670 40 Q 710 40 730 65 Q 750 100 770 140 Z" />
          {/* Hat brim & crown */}
          <ellipse cx="670" cy="55" rx="55" ry="8" />
          <path d="M 635 55 Q 635 15 670 15 Q 705 15 705 55 Z" />

          {/* Person 6 (Child with headband) */}
          <path d="M 760 140 Q 780 100 805 60 Q 825 25 860 25 Q 895 25 915 60 Q 935 100 955 140 Z" />

          {/* Person 7 (Right edge profile) */}
          <path d="M 945 140 Q 960 100 975 60 Q 990 30 1020 30 L 1020 140 Z" />
        </g>
      </svg>
    </div>
  );
};
