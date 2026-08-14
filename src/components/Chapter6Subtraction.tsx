import React, { useState, useEffect, useRef } from 'react';
import {
  Link2,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Zap,
  ArrowRight,
  Info,
} from 'lucide-react';
import { BaseType } from '../types';
import {
  BASES,
  isValidNumberString,
  generateChainBorrowSubtractionSteps,
} from '../utils/numberSystems';

export const Chapter6Subtraction: React.FC = () => {
  const [activeBase, setActiveBase] = useState<BaseType>(2);
  const [numA, setNumA] = useState<string>('10000');
  const [numB, setNumB] = useState<string>('00001');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1800); // Very comfortable slow-motion speed

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const isValidA = isValidNumberString(numA, activeBase);
  const isValidB = isValidNumberString(numB, activeBase);
  const canCalculate = isValidA && isValidB;

  const steps = canCalculate ? generateChainBorrowSubtractionSteps(numA, numB, activeBase) : [];
  const currentStep = steps[currentStepIndex] || null;

  // Auto-play timer
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, speedMs);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, speedMs]);

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  // Presets
  const presets: { label: string; base: BaseType; a: string; b: string }[] = [
    { label: 'Binary 4-Zero Cascade (10000₂ − 1₂)', base: 2, a: '10000', b: '00001' },
    { label: 'Binary Chain Borrow (10010₂ − 01011₂)', base: 2, a: '10010', b: '01011' },
    { label: 'Octal 3-Zero Cascade (1000₈ − 7₈)', base: 8, a: '1000', b: '0007' },
    { label: 'Decimal 3-Zero Cascade (1000₁₀ − 1₁₀)', base: 10, a: '1000', b: '0001' },
    { label: 'Hex 3-Zero Cascade (1000₁₆ − F₁₆)', base: 16, a: '1000', b: '000F' },
    { label: 'Hex Mixed Borrow (30A2₁₆ − 1FA5₁₆)', base: 16, a: '30A2', b: '1FA5' },
  ];

  const maxLen = Math.max(numA.length, numB.length);
  const paddedA = numA.padStart(maxLen, '0');
  const paddedB = numB.padStart(maxLen, '0');

  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-1.5">
          <Link2 className="w-5 h-5" /> Chapter 6 • Slow-Motion Animation Laboratory
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Slow-Motion Chain Borrowing &amp; Strike-Through Simulator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
          Watch in slow motion how a borrow propagates left to find a non-zero donor, strikes through the donor, travels across consecutive zeroes (turning each into base − 1), and empowers the target column by +base!
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="space-y-2">
        <div className="text-xs font-black text-slate-500 uppercase tracking-wider">
          Recommended Interactive Scenarios:
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-2.5">
          {presets.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setActiveBase(p.base);
                setNumA(p.a);
                setNumB(p.b);
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold border transition-all active:scale-95 ${
                activeBase === p.base && numA === p.a && numB === p.b
                  ? 'bg-rose-600 text-white border-rose-600 shadow-md scale-102'
                  : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400 hover:bg-rose-50/50'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulator Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm">
        {/* Top Control Bar: Base Selection, Speed Selection */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
          {/* Base Selector */}
          <div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">
              Select Number Base:
            </span>
            <div className="flex flex-wrap items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
              {([2, 8, 10, 16] as BaseType[]).map((b) => (
                <button
                  key={b}
                  onClick={() => {
                    setActiveBase(b);
                    setCurrentStepIndex(0);
                    setIsPlaying(false);
                    if (b === 2) {
                      setNumA('10000');
                      setNumB('00001');
                    } else if (b === 8) {
                      setNumA('1000');
                      setNumB('0007');
                    } else if (b === 10) {
                      setNumA('1000');
                      setNumB('0001');
                    } else {
                      setNumA('1000');
                      setNumB('000F');
                    }
                  }}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-mono font-black transition-all ${
                    activeBase === b
                      ? 'bg-rose-600 text-white shadow-md'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {BASES[b].name} ({b})
                </button>
              ))}
            </div>
          </div>

          {/* Speed Selector */}
          <div>
            <span className="text-xs font-black text-slate-400 uppercase tracking-wider block mb-2">
              Animation Speed:
            </span>
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
              <button
                onClick={() => setSpeedMs(2500)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  speedMs === 2500
                    ? 'bg-rose-600 text-white font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Ultra Slow (2.5s)
              </button>
              <button
                onClick={() => setSpeedMs(1400)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  speedMs === 1400
                    ? 'bg-rose-600 text-white font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Slow (1.4s)
              </button>
              <button
                onClick={() => setSpeedMs(700)}
                className={`px-3 py-1.5 rounded-xl transition-all ${
                  speedMs === 700
                    ? 'bg-rose-600 text-white font-black shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Normal (0.7s)
              </button>
            </div>
          </div>
        </div>

        {/* Custom Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
              Minuend Top Number (Base {activeBase})
            </label>
            <input
              type="text"
              value={numA}
              onChange={(e) => {
                setNumA(e.target.value.toUpperCase());
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-black text-xl sm:text-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
              Subtrahend Bottom Number (Base {activeBase})
            </label>
            <input
              type="text"
              value={numB}
              onChange={(e) => {
                setNumB(e.target.value.toUpperCase());
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-black text-xl sm:text-2xl text-slate-900 dark:text-white focus:ring-2 focus:ring-rose-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Playback Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-6 py-3 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 ${
                isPlaying
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isPlaying ? 'Pause Simulation' : 'Play Slow-Mo'}
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white disabled:opacity-30 hover:bg-slate-300 active:scale-95 transition-all"
              title="Previous Step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex >= steps.length - 1}
              className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-black text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-30 hover:bg-slate-300 active:scale-95 transition-all"
            >
              Next Step <ChevronRight className="w-5 h-5" />
            </button>
            <button
              onClick={handleReset}
              className="p-3 rounded-2xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:text-slate-900 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
              title="Reset to Step 1"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="text-xs sm:text-sm font-mono font-black px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
        </div>

        {/* Live Step Explanation Callout */}
        {currentStep && (
          <div
            className={`p-5 sm:p-6 rounded-3xl border-2 text-sm sm:text-base font-mono mb-10 flex items-start gap-4 transition-all duration-300 shadow-md ${
              currentStep.actionType === 'strike_source'
                ? 'bg-rose-50 dark:bg-rose-950/50 border-rose-400 dark:border-rose-700 text-rose-950 dark:text-rose-100'
                : currentStep.actionType === 'strike_intermediate'
                ? 'bg-amber-50 dark:bg-amber-950/50 border-amber-400 dark:border-amber-700 text-amber-950 dark:text-amber-100'
                : currentStep.actionType === 'transfer_target'
                ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-400 dark:border-indigo-700 text-indigo-950 dark:text-indigo-100'
                : currentStep.actionType === 'subtract'
                ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 dark:border-emerald-700 text-emerald-950 dark:text-emerald-100'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-slate-100'
            }`}
          >
            <div className="w-9 h-9 rounded-2xl bg-rose-500/20 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="font-black uppercase tracking-wider text-xs sm:text-sm opacity-90 mb-1 flex items-center gap-2">
                <span>Action: {currentStep.actionType.replace('_', ' ').toUpperCase()}</span>
              </div>
              <p className="leading-relaxed font-bold">{currentStep.explanation}</p>
            </div>
          </div>
        )}

        {/* VISUAL STRIKE-THROUGH AND BORROW ARROW COLUMNS */}
        <div className="overflow-x-auto py-6 px-2 bg-slate-50/50 dark:bg-slate-950/40 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-end justify-center gap-3 sm:gap-6 min-w-max px-4">
            {Array.from({ length: maxLen }).map((_, colOffset) => {
              const charIdx = colOffset;
              const colPower = maxLen - 1 - charIdx;

              const origDigitA = paddedA[charIdx];
              const origDigitB = paddedB[charIdx];

              const strikethroughInfo = currentStep?.strikethroughs[colPower];
              const isStrikethrough = !!strikethroughInfo;

              const resultDigit = currentStep?.resultDigits[colPower];
              const isActiveColumn = currentStep?.activeCol === colPower;

              return (
                <div
                  key={colOffset}
                  className={`relative flex flex-col items-center p-4 sm:p-6 rounded-3xl border-2 min-w-[5rem] sm:min-w-[6.5rem] transition-all duration-300 ${
                    isActiveColumn
                      ? 'border-rose-500 bg-rose-50/90 dark:bg-rose-950/50 shadow-xl scale-108 z-10'
                      : isStrikethrough
                      ? 'border-amber-400 dark:border-amber-600/70 bg-amber-50/50 dark:bg-amber-950/30'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  {/* TOP BADGE: NEW REVISED VALUE AFTER STRIKE */}
                  <div className="h-10 flex items-center justify-center mb-2">
                    {isStrikethrough && (
                      <div
                        className={`text-xs sm:text-sm font-mono font-black px-3 py-1 rounded-xl border-2 shadow-sm animate-bounce ${
                          strikethroughInfo.stage === 'source'
                            ? 'bg-rose-500 text-white border-rose-600'
                            : strikethroughInfo.stage === 'path'
                            ? 'bg-amber-500 text-white border-amber-600'
                            : 'bg-indigo-600 text-white border-indigo-700'
                        }`}
                      >
                        {strikethroughInfo.newVal}
                      </div>
                    )}
                  </div>

                  {/* MINUEND DIGIT (A) with strike line */}
                  <div className="relative font-mono font-black text-4xl sm:text-6xl text-slate-900 dark:text-white">
                    <span
                      className={`inline-block transition-all ${
                        isStrikethrough
                          ? 'line-through text-slate-400 dark:text-slate-500 decoration-rose-600 decoration-[5px] sm:decoration-[7px]'
                          : ''
                      }`}
                    >
                      {origDigitA}
                    </span>
                  </div>

                  {/* SUBTRAHEND DIGIT (B) */}
                  <div className="font-mono font-black text-4xl sm:text-6xl text-slate-700 dark:text-slate-300 my-3">
                    {origDigitB}
                  </div>

                  <div className="w-full border-t-3 border-slate-900 dark:border-slate-100 my-2" />

                  {/* RESULT DIFFERENCE DIGIT */}
                  <div
                    className={`font-mono font-black text-4xl sm:text-6xl mt-1 h-14 flex items-center justify-center ${
                      resultDigit
                        ? 'text-emerald-600 dark:text-emerald-400 scale-115 animate-fadeIn'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  >
                    {resultDigit || '·'}
                  </div>

                  {/* Position Weight */}
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mt-3 font-black">
                    {activeBase}
                    <sup>{colPower}</sup>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Rule Box */}
        <div className="mt-10 p-6 sm:p-8 rounded-3xl bg-slate-900 text-slate-100 text-sm leading-relaxed space-y-3 border border-slate-800 shadow-lg">
          <div className="text-xs font-black text-amber-400 uppercase tracking-widest mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" /> Golden Rules of Positional Borrowing (All Bases):
          </div>
          <p>
            • <strong>When Top &lt; Bottom</strong>: You must borrow 1 unit from the nearest non-zero column to the left.
          </p>
          <p>
            • <strong>Strike Donor</strong>: The donor digit drops by 1 (e.g. 1 ➔ 0, 3 ➔ 2).
          </p>
          <p>
            • <strong>Intermediate Zeroes</strong>: Each zero in between becomes (base − 1) because it receives base and immediately passes 1 group of base to the next position to its right!
          </p>
          <p>
            • <strong>Target Arrival</strong>: The target column receives exactly +base units (+2 in Binary, +8 in Octal, +10 in Decimal, +16 in Hex).
          </p>
        </div>
      </div>
    </div>
  );
};
