import React from 'react';
import { X } from 'lucide-react';

interface HowToPlayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToPlayModal: React.FC<HowToPlayModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" id="how-to-play-modal">
      <div className="relative w-full max-w-md p-6 rounded-3xl bg-slate-900 border-2 border-red-900/80 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-xl font-extrabold text-amber-300">
            How to Play - Magic Cup Shuffle
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4 text-sm text-slate-300 py-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">👀</span>
            <div>
              <strong className="text-white block font-bold">1. Spot the Ball:</strong>
              At the start of each round, a cup lifts up to reveal the hidden ball. Remember which cup it is under!
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">🔀</span>
            <div>
              <strong className="text-white block font-bold">2. Track the Shuffles:</strong>
              The cups will swap positions smoothly across the stage. Keep your eyes locked on the moving cup!
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-2xl">👆</span>
            <div>
              <strong className="text-white block font-bold">3. Pick the Cup:</strong>
              When shuffling stops, hover over the cups and tap the one hiding the ball to win golden coins! 🪙
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-sm shadow-md transition active:scale-95"
        >
          Let's Play!
        </button>
      </div>
    </div>
  );
};
