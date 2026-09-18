import { BallSkin } from '../types.ts';

export const BALL_SKINS: BallSkin[] = [
  {
    id: 'striped_classic',
    name: 'Teal Ribbon',
    description: 'Classic Striped Marble',
    emoji: '🎪',
    pattern: 'striped',
    primaryColor: '#06b6d4', // Teal cyan
    secondaryColor: '#f43f5e' // Rose/magenta stripes (as in screenshot)
  },
  {
    id: 'golden_sun',
    name: 'Sun Gold',
    description: 'Bright Golden Star',
    emoji: '⭐',
    pattern: 'stars',
    primaryColor: '#f59e0b',
    secondaryColor: '#fbbf24'
  },
  {
    id: 'ladybug',
    name: 'Ladybug Spot',
    description: 'Cute Red Polka Dots',
    emoji: '🐞',
    pattern: 'dots',
    primaryColor: '#ef4444',
    secondaryColor: '#0f172a'
  },
  {
    id: 'rainbow_swirl',
    name: 'Rainbow Wave',
    description: 'Vibrant Cosmic Swirl',
    emoji: '🌈',
    pattern: 'swirl',
    primaryColor: '#8b5cf6',
    secondaryColor: '#38bdf8'
  }
];
