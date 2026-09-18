import React from 'react';
import { Trophy, RotateCcw, Sparkles } from 'lucide-react';

interface GameOverModalProps {
  isOpen: boolean;
  score: number;
  correctRounds: number;
  totalRounds: number;
  onRestart: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  isOpen,
  score,
  correctRounds,
  totalRounds,
  onRestart
}) => {
  if (!isOpen) return null;

  const stars =
    correctRounds >= totalRounds * 0.85
      ? 3
      : correctRounds >= totalRounds * 0.6
      ? 2
      : 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" id="game-over-modal">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 border-4 border-amber-400/80 shadow-2xl text-center text-slate-100 overflow-hidden">
        {/* Glow ambient background */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Big Golden Trophy */}
        <div className="relative mx-auto w-20 h-20 mb-3 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 shadow-lg flex items-center justify-center animate-bounce">
          <div className="w-full h-full rounded-full bg-slate-900/50 flex items-center justify-center">
            <Trophy className="w-10 h-10 text-yellow-200" />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-sky-300">
          Magic Show Complete!
        </h2>
        <p className="text-sm font-bold text-amber-300 mt-1">
          You watched like a master magician!
        </p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-2 my-5 text-4xl">
          {Array.from({ length: 3 }).map((_, i) => (
            <span
              key={i}
              className={`transform transition-all ${
                i < stars
                  ? 'scale-110 drop-shadow-[0_0_12px_rgba(250,204,21,0.8)]'
                  : 'opacity-25 grayscale'
              }`}
            >
              ⭐
            </span>
          ))}
        </div>

        {/* Stats card */}
        <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-slate-800/80 border border-slate-700">
          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400">Coins Won</span>
            <span className="text-2xl font-extrabold text-amber-400 flex items-center gap-1">
              <span>🪙</span>
              <span>{score}</span>
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xs text-slate-400">Accuracy</span>
            <span className="text-2xl font-extrabold text-emerald-400">
              {correctRounds} / {totalRounds}
            </span>
          </div>
        </div>

        {/* Play Again Button */}
        <button
          id="btn-play-again-modal"
          onClick={onRestart}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 active:scale-95 text-slate-950 font-extrabold text-base flex items-center justify-center gap-2 transition shadow-xl border border-amber-300"
        >
          <RotateCcw className="w-5 h-5 text-slate-950" />
          <span>Play Again</span>
        </button>
      </div>
    </div>
  );
};
