import React from 'react';
import { CupItem, BallSkin, GamePhase } from '../types.ts';
import { MagicCup } from './MagicCup.tsx';
import { BallElement } from './BallElement.tsx';
import { AudienceSilhouettes } from './AudienceSilhouettes.tsx';

interface TheaterStageProps {
  cups: CupItem[];
  ballSkin: BallSkin;
  ballCupId: number;
  gamePhase: GamePhase;
  onCupClick: (cupId: number) => void;
  activeSwapInfo?: {
    cupAId: number;
    cupBId: number;
  } | null;
  transitionDurationMs: number;
  revealedCupId: number | null;
}

export const TheaterStage: React.FC<TheaterStageProps> = ({
  cups,
  ballSkin,
  ballCupId,
  gamePhase,
  onCupClick,
  activeSwapInfo,
  transitionDurationMs,
  revealedCupId
}) => {
  const totalCups = cups.length;
  const ballCup = cups.find((c) => c.id === ballCupId);
  const isBallRevealed = Boolean(ballCup?.isLifted);

  return (
    <div
      className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#7f1d1d] via-[#991b1b] to-[#450a0a] select-none"
      id="theater-stage-container"
    >
      {/* Top Red Curtains Valance (Swags) */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-20 z-20 pointer-events-none">
        <svg viewBox="0 0 1000 100" preserveAspectRatio="none" className="w-full h-full">
          <defs>
            <linearGradient id="valanceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7f1d1d" />
              <stop offset="40%" stopColor="#b91c1c" />
              <stop offset="100%" stopColor="#991b1b" />
            </linearGradient>
            <filter id="valanceShadow" x="-5%" y="-5%" width="110%" height="130%">
              <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Scalloped drapes matching screenshot */}
          <path
            d="M 0 0 L 1000 0 L 1000 30 
               Q 900 85 800 30 
               Q 700 85 600 30 
               Q 500 85 400 30 
               Q 300 85 200 30 
               Q 100 85 0 30 Z"
            fill="url(#valanceGrad)"
            filter="url(#valanceShadow)"
          />
          {/* Inner drape curve lines */}
          <path
            d="M 200 30 Q 300 70 400 30 M 400 30 Q 500 70 600 30 M 600 30 Q 700 70 800 30"
            stroke="#ef4444"
            strokeWidth="3"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Side Velvet Curtains (Left & Right Flanks) */}
      <div className="absolute top-0 left-0 bottom-24 w-16 sm:w-28 z-10 pointer-events-none">
        <svg viewBox="0 0 120 600" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 0 0 Q 70 200 40 400 Q 80 500 0 600 L 0 0 Z"
            fill="#7f1d1d"
            opacity="0.95"
          />
          <path
            d="M 0 0 Q 110 250 60 600 L 0 600 Z"
            fill="#991b1b"
            opacity="0.7"
          />
          <path
            d="M 0 0 Q 140 300 80 600 L 0 600 Z"
            fill="#b91c1c"
            opacity="0.5"
          />
        </svg>
      </div>

      <div className="absolute top-0 right-0 bottom-24 w-16 sm:w-28 z-10 pointer-events-none">
        <svg viewBox="0 0 120 600" preserveAspectRatio="none" className="w-full h-full">
          <path
            d="M 120 0 Q 50 200 80 400 Q 40 500 120 600 L 120 0 Z"
            fill="#7f1d1d"
            opacity="0.95"
          />
          <path
            d="M 120 0 Q 10 250 60 600 L 120 600 Z"
            fill="#991b1b"
            opacity="0.7"
          />
          <path
            d="M 120 0 Q -20 300 40 600 L 120 600 Z"
            fill="#b91c1c"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Bright Golden Spotlight Cone (Centered as in screenshot) */}
      <div className="absolute inset-0 pointer-events-none flex justify-center z-0 overflow-hidden">
        <div
          className="w-full max-w-2xl h-full opacity-80"
          style={{
            background: 'radial-gradient(ellipse 65% 85% at 50% 25%, rgba(254, 240, 138, 0.45) 0%, rgba(251, 191, 36, 0.25) 45%, rgba(220, 38, 38, 0) 75%)'
          }}
        />
      </div>

      {/* Center Stage Play Area (The Table) */}
      <div className="relative flex-1 flex flex-col justify-end w-full max-w-4xl mx-auto px-4 sm:px-12 z-10">
        {/* Wooden Stage Floor Table (Matching Screenshot Colors) */}
        <div
          className="relative w-full h-44 sm:h-56 rounded-t-3xl border-t-4 border-amber-400/40 shadow-2xl"
          style={{
            background: 'linear-gradient(to bottom, #f97316 0%, #ea580c 25%, #c2410c 70%, #9a3412 100%)'
          }}
        >
          {/* Wood Planks Perspective Lines */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="w-full h-full border-b border-amber-950/40" />
            <div className="absolute top-1/3 left-0 right-0 h-px bg-amber-950/40" />
            <div className="absolute top-2/3 left-0 right-0 h-px bg-amber-950/40" />
            {/* Perspective scratches / floor marks like in screenshot */}
            <div className="absolute top-1/4 left-1/4 w-12 h-1 bg-amber-950/30 rounded-full" />
            <div className="absolute top-3/5 right-1/3 w-16 h-1 bg-amber-950/30 rounded-full" />
            <div className="absolute bottom-6 left-1/2 w-20 h-1.5 bg-amber-950/30 rounded-full" />
          </div>

          {/* The Hidden/Revealed Ball */}
          {ballCup && (
            <div
              className="absolute bottom-5 select-none transition-all pointer-events-none"
              style={{
                left: `${((ballCup.slotIndex + 0.5) / totalCups) * 100}%`,
                transform: 'translateX(-50%)',
                zIndex: 5, // Behind lifted cups, but above floor
                transition: `left ${transitionDurationMs}ms cubic-bezier(0.4, 0, 0.2, 1), opacity 150ms ease`,
                opacity: isBallRevealed ? 1 : 0
              }}
            >
              <BallElement
                skin={ballSkin}
                size={totalCups <= 3 ? 62 : totalCups === 4 ? 54 : 46}
                isRevealed={isBallRevealed}
              />
            </div>
          )}

          {/* Result Feedback Banner */}
          {gamePhase === 'result' && (
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-30 animate-bounce whitespace-nowrap">
              {revealedCupId === ballCupId ? (
                <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm sm:text-base shadow-xl border-2 border-emerald-200 flex items-center gap-1.5">
                  <span>🎉</span>
                  <span>Found It! +100 Coins 🪙</span>
                </div>
              ) : (
                <div className="px-4 py-1.5 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-400 text-slate-950 font-black text-sm sm:text-base shadow-xl border-2 border-amber-200 flex items-center gap-1.5">
                  <span>🎩</span>
                  <span>It was here!</span>
                </div>
              )}
            </div>
          )}

          {/* The Magic Cups */}
          <div className="relative w-full h-full">
            {cups.map((cup) => {
              const isSwappingA = activeSwapInfo?.cupAId === cup.id;
              const isSwappingB = activeSwapInfo?.cupBId === cup.id;

              // Shuffle depth & arc: cupA sweeps forward, cupB sweeps backward
              let offsetY = 0;
              let scale = 1;
              let zIndex = 15;

              if (isSwappingA) {
                offsetY = 16; // Move forward towards audience
                scale = 1.05;
                zIndex = 25;
              } else if (isSwappingB) {
                offsetY = -16; // Move backward away
                scale = 0.95;
                zIndex = 10;
              }

              const isClickable = gamePhase === 'guessing';

              return (
                <MagicCup
                  key={cup.id}
                  id={cup.id}
                  slotIndex={cup.slotIndex}
                  totalCups={totalCups}
                  isLifted={cup.isLifted}
                  isClickable={isClickable}
                  onClick={() => onCupClick(cup.id)}
                  offsetY={offsetY}
                  scale={scale}
                  zIndex={zIndex}
                  transitionDurationMs={transitionDurationMs}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* Audience Silhouette Row (Matching Screenshot Bottom) */}
      <AudienceSilhouettes />
    </div>
  );
};
