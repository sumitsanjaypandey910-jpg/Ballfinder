import React from 'react';
import { BallSkin } from '../types.ts';
import { BALL_SKINS } from '../utils/skins.ts';
import { BallElement } from './BallElement.tsx';
import { X, Check } from 'lucide-react';

interface BallPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSkinId: string;
  onSelectSkin: (skinId: string) => void;
}

export const BallPickerModal: React.FC<BallPickerModalProps> = ({
  isOpen,
  onClose,
  selectedSkinId,
  onSelectSkin
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in" id="ball-picker-modal">
      <div className="relative w-full max-w-sm p-6 rounded-3xl bg-slate-900 border-2 border-red-900/60 shadow-2xl text-slate-100 flex flex-col">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-xl font-extrabold text-amber-300">
              Choose Ball Pattern
            </h2>
            <p className="text-xs text-slate-400">
              Pick your lucky magic ball
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4">
          {BALL_SKINS.map((skin) => {
            const isSelected = skin.id === selectedSkinId;
            return (
              <button
                key={skin.id}
                id={`skin-btn-${skin.id}`}
                onClick={() => {
                  onSelectSkin(skin.id);
                  onClose();
                }}
                className={`relative p-3 rounded-2xl flex flex-col items-center gap-2 border-2 transition-all ${
                  isSelected
                    ? 'bg-amber-950/40 border-amber-400 shadow-lg scale-105'
                    : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 active:scale-95'
                }`}
              >
                <div className="my-1">
                  <BallElement skin={skin} size={50} isRevealed={true} />
                </div>
                <div className="text-center">
                  <p className="font-bold text-xs text-white">
                    {skin.name}
                  </p>
                  <p className="text-[10px] text-slate-400">
                    {skin.description}
                  </p>
                </div>

                {isSelected && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
