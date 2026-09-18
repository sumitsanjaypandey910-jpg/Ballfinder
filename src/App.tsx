/**
 * Track the Ball (Magic Cups Shell Game)
 * @license Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GamePhase, DifficultyLevel, CupItem, BallSkin } from './types.ts';
import { BALL_SKINS } from './utils/skins.ts';
import { sound } from './utils/audio.ts';
import { TheaterStage } from './components/TheaterStage.tsx';
import { GameHUD } from './components/GameHUD.tsx';
import { GameOverModal } from './components/GameOverModal.tsx';
import { BallPickerModal } from './components/BallPickerModal.tsx';
import { HowToPlayModal } from './components/HowToPlayModal.tsx';

const TOTAL_ROUNDS = 8; // Exact match to "1 / 8" in user's screenshot

export default function App() {
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('easy');
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [score, setScore] = useState<number>(0);
  const [correctRounds, setCorrectRounds] = useState<number>(0);
  const [gamePhase, setGamePhase] = useState<GamePhase>('ready');

  // Ball Skin
  const [selectedSkinId, setSelectedSkinId] = useState<string>('striped_classic');
  const ballSkin: BallSkin =
    BALL_SKINS.find((s) => s.id === selectedSkinId) || BALL_SKINS[0];

  // Cups State
  const cupCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
  const [cups, setCups] = useState<CupItem[]>(() =>
    Array.from({ length: 3 }, (_, i) => ({
      id: i,
      slotIndex: i,
      isLifted: false,
      hasBall: i === 0
    }))
  );

  const [ballCupId, setBallCupId] = useState<number>(0);
  const [activeSwapInfo, setActiveSwapInfo] = useState<{
    cupAId: number;
    cupBId: number;
  } | null>(null);

  const [revealedCupId, setRevealedCupId] = useState<number | null>(null);

  // Audio State
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isBGMActive, setIsBGMActive] = useState<boolean>(false);

  // Modals
  const [isGameOverOpen, setIsGameOverOpen] = useState<boolean>(false);
  const [isBallPickerOpen, setIsBallPickerOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  // Circular Timer
  const [timerProgress, setTimerProgress] = useState<number>(1);
  const timerRef = useRef<number | null>(null);
  const roundActiveRef = useRef<boolean>(false);

  // Transition Duration in ms (scales slightly with rounds)
  const getTransitionDuration = useCallback(() => {
    const base = difficulty === 'easy' ? 520 : difficulty === 'medium' ? 460 : 400;
    // Speed up slightly as rounds progress
    const speedUp = Math.min(currentRound * 15, 120);
    return Math.max(300, base - speedUp);
  }, [difficulty, currentRound]);

  // Initialize or reset cups when difficulty changes
  const initCups = useCallback(
    (count: number) => {
      const initialBallId = Math.floor(Math.random() * count);
      setBallCupId(initialBallId);
      const newCups: CupItem[] = Array.from({ length: count }, (_, i) => ({
        id: i,
        slotIndex: i,
        isLifted: false,
        hasBall: i === initialBallId
      }));
      setCups(newCups);
      setRevealedCupId(null);
      setActiveSwapInfo(null);
    },
    []
  );

  // Start a new Round
  const startRound = useCallback(
    async (roundNum: number, currentCupCount: number) => {
      roundActiveRef.current = true;
      setTimerProgress(1);
      setRevealedCupId(null);
      setActiveSwapInfo(null);

      // 1. Pick a random cup for the ball
      const chosenBallCupId = Math.floor(Math.random() * currentCupCount);
      setBallCupId(chosenBallCupId);

      // Set cups on stage
      setCups((prev) =>
        prev.map((c) => ({
          ...c,
          isLifted: false,
          hasBall: c.id === chosenBallCupId
        }))
      );

      // 2. Reveal Phase: Lift the cup with the ball
      await new Promise((r) => setTimeout(r, 300));
      if (!roundActiveRef.current) return;

      setGamePhase('reveal');
      sound.playCupLift();
      setCups((prev) =>
        prev.map((c) => (c.id === chosenBallCupId ? { ...c, isLifted: true } : c))
      );

      // Display ball to player for 1.2 seconds
      await new Promise((r) => setTimeout(r, 1200));
      if (!roundActiveRef.current) return;

      // 3. Cover Phase: Lower cup onto ball
      setGamePhase('cover');
      sound.playCupDrop();
      setCups((prev) => prev.map((c) => ({ ...c, isLifted: false })));

      await new Promise((r) => setTimeout(r, 450));
      if (!roundActiveRef.current) return;

      // 4. Shuffling Phase: Perform sequential swaps
      setGamePhase('shuffling');

      // Determine number of swaps for this round
      const minSwaps = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 4 : 5;
      const swapCount = minSwaps + Math.floor((roundNum - 1) * 0.7);
      const durationMs = getTransitionDuration();

      let currentCupsState = Array.from({ length: currentCupCount }, (_, i) => ({
        id: i,
        slotIndex: i
      }));

      for (let s = 0; s < swapCount; s++) {
        if (!roundActiveRef.current) return;

        // Pick two distinct cups to swap
        const idxA = Math.floor(Math.random() * currentCupCount);
        let idxB = Math.floor(Math.random() * (currentCupCount - 1));
        if (idxB >= idxA) idxB++;

        const cupA = currentCupsState[idxA];
        const cupB = currentCupsState[idxB];

        setActiveSwapInfo({ cupAId: cupA.id, cupBId: cupB.id });
        sound.playShuffleSwap();

        // Swap their slotIndex
        const tempSlot = cupA.slotIndex;
        cupA.slotIndex = cupB.slotIndex;
        cupB.slotIndex = tempSlot;

        setCups((prev) =>
          prev.map((c) => {
            if (c.id === cupA.id) return { ...c, slotIndex: cupA.slotIndex };
            if (c.id === cupB.id) return { ...c, slotIndex: cupB.slotIndex };
            return c;
          })
        );

        await new Promise((r) => setTimeout(r, durationMs + 40));
        setActiveSwapInfo(null);
        await new Promise((r) => setTimeout(r, 30));
      }

      if (!roundActiveRef.current) return;

      // 5. Guessing Phase: Waiting for child to tap a cup
      setGamePhase('guessing');

      // Start countdown timer for the round (15 seconds total)
      const startTime = Date.now();
      const totalTimeMs = 15000;

      const runTimer = () => {
        const elapsed = Date.now() - startTime;
        const remain = Math.max(0, 1 - elapsed / totalTimeMs);
        setTimerProgress(remain);

        if (remain > 0 && roundActiveRef.current) {
          timerRef.current = requestAnimationFrame(runTimer);
        }
      };
      timerRef.current = requestAnimationFrame(runTimer);
    },
    [difficulty, getTransitionDuration]
  );

  // Start initial game
  useEffect(() => {
    initCups(cupCount);
    startRound(1, cupCount);

    return () => {
      roundActiveRef.current = false;
      if (timerRef.current) cancelAnimationFrame(timerRef.current);
    };
  }, [cupCount, initCups, startRound]);

  // Handle player clicking a cup
  const handleCupClick = useCallback(
    async (clickedCupId: number) => {
      if (gamePhase !== 'guessing') return;

      if (timerRef.current) {
        cancelAnimationFrame(timerRef.current);
        timerRef.current = null;
      }

      setGamePhase('result');
      setRevealedCupId(clickedCupId);

      const isCorrect = clickedCupId === ballCupId;

      // Lift the chosen cup
      sound.playCupLift();
      setCups((prev) =>
        prev.map((c) => (c.id === clickedCupId ? { ...c, isLifted: true } : c))
      );

      if (isCorrect) {
        // Player found the ball!
        sound.playCorrect();
        setScore((prev) => prev + 100);
        setCorrectRounds((prev) => prev + 1);

        // Wait, then progress
        await new Promise((r) => setTimeout(r, 2000));
      } else {
        // Player chose empty cup
        sound.playWrong();
        await new Promise((r) => setTimeout(r, 600));

        // Reveal the actual cup with the ball
        sound.playCupLift();
        setCups((prev) =>
          prev.map((c) => (c.id === ballCupId ? { ...c, isLifted: true } : c))
        );

        await new Promise((r) => setTimeout(r, 2200));
      }

      // Check if finished all 8 rounds
      if (currentRound >= TOTAL_ROUNDS) {
        setGamePhase('game_over');
        setIsGameOverOpen(true);
      } else {
        const nextRoundNum = currentRound + 1;
        setCurrentRound(nextRoundNum);
        startRound(nextRoundNum, cupCount);
      }
    },
    [gamePhase, ballCupId, currentRound, cupCount, startRound]
  );

  // Restart entire game
  const handleRestartGame = () => {
    roundActiveRef.current = false;
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setIsGameOverOpen(false);
    setCurrentRound(1);
    setScore(0);
    setCorrectRounds(0);
    initCups(cupCount);
    startRound(1, cupCount);
  };

  // Switch difficulty
  const handleSelectDifficulty = (diff: DifficultyLevel) => {
    roundActiveRef.current = false;
    if (timerRef.current) cancelAnimationFrame(timerRef.current);
    setDifficulty(diff);
    setCurrentRound(1);
    setScore(0);
    setCorrectRounds(0);
    const count = diff === 'easy' ? 3 : diff === 'medium' ? 4 : 5;
    initCups(count);
    startRound(1, count);
  };

  // Sound toggles
  const handleToggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setMuted(next);
  };

  const handleToggleBGM = () => {
    const active = sound.toggleBGM();
    setIsBGMActive(active);
  };

  return (
    <div
      className="relative w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-['Fredoka',sans-serif]"
      id="track-the-ball-app"
    >
      {/* Top HUD: Score, Round, Circular Timer (Matching Screenshot) */}
      <GameHUD
        score={score}
        currentRound={currentRound}
        totalRounds={TOTAL_ROUNDS}
        gamePhase={gamePhase}
        timerProgress={timerProgress}
        difficulty={difficulty}
        onSelectDifficulty={handleSelectDifficulty}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isBGMActive={isBGMActive}
        onToggleBGM={handleToggleBGM}
        onOpenBallPicker={() => setIsBallPickerOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onRestartGame={handleRestartGame}
      />

      {/* Main Theater Stage with Cups, Ball, and Audience */}
      <main className="relative flex-1 w-full h-full overflow-hidden">
        <TheaterStage
          cups={cups}
          ballSkin={ballSkin}
          ballCupId={ballCupId}
          gamePhase={gamePhase}
          onCupClick={handleCupClick}
          activeSwapInfo={activeSwapInfo}
          transitionDurationMs={getTransitionDuration()}
          revealedCupId={revealedCupId}
        />
      </main>

      {/* Ball Pattern Customizer */}
      <BallPickerModal
        isOpen={isBallPickerOpen}
        onClose={() => setIsBallPickerOpen(false)}
        selectedSkinId={selectedSkinId}
        onSelectSkin={setSelectedSkinId}
      />

      {/* How to Play Rules */}
      <HowToPlayModal
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
      />

      {/* Game Over / Grand Finale Modal */}
      <GameOverModal
        isOpen={isGameOverOpen}
        score={score}
        correctRounds={correctRounds}
        totalRounds={TOTAL_ROUNDS}
        onRestart={handleRestartGame}
      />
    </div>
  );
}
