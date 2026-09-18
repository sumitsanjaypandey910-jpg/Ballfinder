export type GamePhase =
  | 'ready'
  | 'reveal'
  | 'cover'
  | 'shuffling'
  | 'guessing'
  | 'result'
  | 'game_over';

export type DifficultyLevel = 'easy' | 'medium' | 'hard';

export interface DifficultyConfig {
  name: string;
  description: string;
  cupCount: number;
  shuffleCount: (round: number) => number;
  shuffleSpeedMs: (round: number) => number;
}

export interface CupItem {
  id: number; // Persistent identifier for cup
  slotIndex: number; // Current visual position on stage (0, 1, 2...)
  isLifted: boolean;
  hasBall: boolean;
}

export interface BallSkin {
  id: string;
  name: string;
  description: string;
  emoji: string;
  pattern: 'striped' | 'stars' | 'dots' | 'swirl';
  primaryColor: string;
  secondaryColor: string;
}

export interface SwapStep {
  cupAId: number;
  cupBId: number;
  slotA: number;
  slotB: number;
}

export interface RoundResult {
  round: number;
  isCorrect: boolean;
  chosenCupId: number;
  correctCupId: number;
  coinsEarned: number;
}
