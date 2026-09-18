import React from 'react';
import { GamePhase, DifficultyLevel } from '../types.ts';
import { Volume2, VolumeX, Music, RotateCcw, Palette, HelpCircle } from 'lucide-react';

interface GameHUDProps {
  score: number;
  currentRound: number;
  totalRounds: number;
  gamePhase: GamePhase;
  timerProgress: number; // 0 to 1 for circular pie timer
  difficulty: DifficultyLevel;
  onSelectDifficulty: (diff: DifficultyLevel) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isBGMActive: boolean;
  onToggleBGM: () => void;
  onOpenBallPicker: () => void;
  onOpenHelp: () => void;
  onRestartGame: () => void;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  score,
  currentRound,
  totalRounds,
  gamePhase,
  timerProgress,
  difficulty,
  onSelectDifficulty,
  isMuted,
  onToggleMute,
  isBGMActive,
  onToggleBGM,
  onOpenBallPicker,
  onOpenHelp,
  onRestartGame
}) => {
  // Title prompt based on phase
  let phaseTitle = 'Track the ball';
  let phaseSubtitle = 'Keep your eyes on the moving cups';

  if (gamePhase === 'reveal') {
    phaseTitle = 'Here is the ball!';
    phaseSubtitle = 'Remember which cup it is under!';
  } else if (gamePhase === 'shuffling') {
    phaseTitle = 'Shuffling... Watch closely!';
    phaseSubtitle = 'Follow the cup as they swap!';
  } else if (gamePhase === 'guessing') {
    phaseTitle = 'Which cup is the ball in?';
    phaseSubtitle = 'Tap the cup to make your guess!';
  } else if (gamePhase === 'result') {
    phaseTitle = 'Round Complete!';
    phaseSubtitle = 'Get ready for the next round!';
  }

  // Circular timer SVG path calculations
  const radius = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - Math.max(0, Math.min(1, timerProgress)));

  return (
    <header className="relative w-full z-30 flex flex-col items-center pt-2 sm:pt-3 px-3 sm:px-6 select-none" id="game-hud">
      {/* Top Controls & Status Row (Matching Screenshot Top) */}
      <div className="w-full flex items-center justify-between">
        {/* Left: Settings, Difficulty & Ball Skin */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Difficulty Selector */}
          <div className="flex items-center bg-black/40 rounded-2xl p-1 border border-red-900/50 backdrop-blur-sm">
            {(['easy', 'medium', 'hard'] as DifficultyLevel[]).map((d) => (
              <button
                key={d}
                id={`btn-diff-${d}`}
                disabled={gamePhase === 'shuffling'}
                onClick={() => onSelectDifficulty(d)}
                className={`px-2 py-1 rounded-xl text-xs font-bold transition-all ${
                  difficulty === d
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'text-rose-200 hover:text-white'
                }`}
              >
                {d === 'easy' ? '3 Cups' : d === 'medium' ? '4 Cups' : '5 Cups'}
              </button>
            ))}
          </div>

          {/* Ball Skin Picker */}
          <button
            id="btn-ball-picker-hud"
            onClick={onOpenBallPicker}
            title="Change Ball Pattern"
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-amber-300 border border-red-900/50 backdrop-blur-sm active:scale-95 transition"
          >
            <Palette className="w-4 h-4" />
          </button>

          {/* Sound FX Toggle */}
          <button
            id="btn-sfx-toggle"
            onClick={onToggleMute}
            title={isMuted ? 'Unmute' : 'Mute'}
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-rose-200 hover:text-white border border-red-900/50 backdrop-blur-sm active:scale-95 transition"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          {/* Music Toggle */}
          <button
            id="btn-bgm-toggle"
            onClick={onToggleBGM}
            title="Circus Melody"
            className={`p-2 rounded-xl border border-red-900/50 backdrop-blur-sm active:scale-95 transition ${
              isBGMActive ? 'bg-amber-500/30 text-amber-300' : 'bg-black/40 text-rose-200 hover:text-white'
            }`}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* How to play */}
          <button
            id="btn-help-modal"
            onClick={onOpenHelp}
            title="How to Play"
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-rose-200 hover:text-white border border-red-900/50 backdrop-blur-sm active:scale-95 transition"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Restart Game */}
          <button
            id="btn-restart-hud"
            onClick={onRestartGame}
            title="Restart Show"
            className="p-2 rounded-xl bg-black/40 hover:bg-black/60 text-rose-200 hover:text-white border border-red-900/50 backdrop-blur-sm active:scale-95 transition"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Coins, Round Counter (1 / 8), and Circular Timer (Matching Screenshot) */}
        <div className="flex items-center gap-3 bg-black/45 px-3 py-1.5 rounded-2xl border border-red-900/60 backdrop-blur-sm shadow-md">
          {/* Coins earned (screenshot: gold bean/coin shape + count) */}
          <div className="flex items-center gap-1.5 font-extrabold text-sm sm:text-base text-amber-400">
            <span className="text-lg">🪙</span>
            <span>{score}</span>
          </div>

          <div className="h-4 w-px bg-red-800/60" />

          {/* Round counter: e.g. "1 / 8" */}
          <div className="flex items-center gap-1 text-sm sm:text-base font-bold text-rose-100">
            <span className="text-amber-300">{currentRound}</span>
            <span className="text-rose-400/80">/</span>
            <span className="text-rose-300">{totalRounds}</span>
          </div>

          {/* Circular Pie Timer Indicator (matching screenshot top-right) */}
          <div className="relative w-6 h-6 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r={radius}
                className="stroke-red-950/60"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="16"
                cy="16"
                r={radius}
                className="stroke-emerald-400 transition-all duration-150"
                strokeWidth="4"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Center Theater Title Prompt ("Track the ball") */}
      <div className="mt-2 text-center animate-fade-in">
        <h1 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300 drop-shadow-md tracking-tight">
          {phaseTitle}
        </h1>
        <p className="text-xs sm:text-sm font-bold text-rose-200/90 drop-shadow">
          {phaseSubtitle}
        </p>
      </div>
    </header>
  );
};
