import React from 'react';

interface MagicCupProps {
  id: number;
  slotIndex: number;
  totalCups: number;
  isLifted: boolean;
  isClickable: boolean;
  onClick: () => void;
  offsetY?: number; // for shuffle arc
  scale?: number;
  zIndex?: number;
  transitionDurationMs?: number;
}

export const MagicCup: React.FC<MagicCupProps> = ({
  id,
  slotIndex,
  totalCups,
  isLifted,
  isClickable,
  onClick,
  offsetY = 0,
  scale = 1,
  zIndex = 10,
  transitionDurationMs = 500
}) => {
  // Width of cups based on count
  const cupWidth = totalCups <= 3 ? 120 : totalCups === 4 ? 100 : 86;
  const cupHeight = totalCups <= 3 ? 145 : totalCups === 4 ? 125 : 108;

  // Lift offset in px
  const liftY = isLifted ? -135 : 0;
  const totalY = liftY + offsetY;

  return (
    <div
      id={`magic-cup-${id}`}
      onClick={isClickable ? onClick : undefined}
      className={`absolute bottom-0 flex flex-col items-center select-none transition-all ${
        isClickable
          ? 'cursor-pointer group cup-hover-bounce'
          : 'pointer-events-none'
      }`}
      style={{
        width: cupWidth,
        left: `${((slotIndex + 0.5) / totalCups) * 100}%`,
        transform: `translateX(-50%) translateY(${totalY}px) scale(${scale})`,
        zIndex,
        transition: `left ${transitionDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${transitionDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        willChange: 'left, transform'
      }}
    >
      {/* Clickable Invitation Badge when guessing in English */}
      {isClickable && (
        <div className="absolute -top-10 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-extrabold text-[11px] tracking-wide shadow-md animate-bounce opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-transform">
          Pick me!
        </div>
      )}

      {/* SVG Cylinder Cup with Purple Star Pattern (Matches Screenshot) */}
      <div
        className="relative w-full transition-transform duration-200 group-active:scale-95"
        style={{ height: cupHeight }}
      >
        <svg
          viewBox="0 0 100 120"
          className="w-full h-full drop-shadow-xl overflow-visible transition-all duration-200 group-hover:drop-shadow-[0_12px_20px_rgba(168,85,247,0.4)]"
        >
          <defs>
            {/* Cup Body Gradient */}
            <linearGradient id={`cupBody-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4c1d95" /> {/* Dark violet */}
              <stop offset="35%" stopColor="#6d28d9" /> {/* Rich purple */}
              <stop offset="70%" stopColor="#7c3aed" /> {/* Brighter highlight */}
              <stop offset="100%" stopColor="#4c1d95" /> {/* Shadow right */}
            </linearGradient>

            {/* Top Rim Gradient */}
            <linearGradient id={`topRim-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2e1065" />
              <stop offset="100%" stopColor="#581c87" />
            </linearGradient>

            {/* Clip path for the cylinder body */}
            <clipPath id={`cupClip-${id}`}>
              <path d="M 12 15 L 88 15 L 82 108 A 38 12 0 0 1 18 108 Z" />
            </clipPath>
          </defs>

          {/* Cup Cylinder Body */}
          <path
            d="M 12 15 L 88 15 L 82 108 A 38 12 0 0 1 18 108 Z"
            fill={`url(#cupBody-${id})`}
          />

          {/* Star pattern stamped on the cup body (matching screenshot) */}
          <g clipPath={`url(#cupClip-${id})`} fill="#a855f7" opacity="0.35">
            {/* Star 1 */}
            <polygon
              points="30,35 34,45 45,46 37,54 40,65 30,59 20,65 23,54 15,46 26,45"
              transform="scale(0.8) translate(5, 10)"
            />
            {/* Star 2 */}
            <polygon
              points="75,40 78,48 87,49 80,55 83,64 75,59 67,64 70,55 63,49 72,48"
              transform="scale(0.65) translate(30, 20)"
            />
            {/* Star 3 (Bottom) */}
            <polygon
              points="50,70 53,78 62,79 55,85 58,94 50,89 42,94 45,85 38,79 47,78"
              transform="scale(0.9) translate(5, 5)"
            />
            {/* Star 4 (Upper Right) */}
            <polygon
              points="80,15 83,23 92,24 85,30 88,39 80,34 72,39 75,30 68,24 77,23"
              transform="scale(0.6) translate(35, -5)"
            />
          </g>

          {/* Bottom Rim Curve Highlight */}
          <ellipse cx="50" cy="108" rx="32" ry="7" fill="#3b0764" opacity="0.5" />

          {/* Top Elliptical Rim Opening */}
          <ellipse
            cx="50"
            cy="15"
            rx="38"
            ry="11"
            fill={`url(#topRim-${id})`}
            stroke="#8b5cf6"
            strokeWidth="2.5"
          />

          {/* Inner Depth Shadow in Top Rim */}
          <ellipse
            cx="50"
            cy="15"
            rx="34"
            ry="9"
            fill="#1e1b4b"
            opacity="0.75"
          />

          {/* Front Rim Edge Highlight */}
          <path
            d="M 12 15 A 38 11 0 0 0 88 15"
            stroke="#c084fc"
            strokeWidth="3"
            fill="none"
          />
        </svg>

        {/* Dynamic Glow when Guessing */}
        {isClickable && (
          <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/60 shadow-[0_0_20px_rgba(251,191,36,0.6)] pointer-events-none animate-pulse" />
        )}
      </div>

      {/* Ground Cast Shadow */}
      <div
        className="w-4/5 h-4 -mt-2 rounded-full bg-black/50 blur-[3px] transition-all group-hover:scale-90 group-hover:opacity-40"
        style={{
          transform: isLifted ? 'scale(0.5)' : undefined,
          opacity: isLifted ? 0.2 : undefined
        }}
      />
    </div>
  );
};
