import React, { useState, useEffect, useRef } from 'react';
import {
  Link2,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { BaseType } from '../types';
import {
  BASES,
  isValidNumberString,
  generateChainBorrowSubtractionSteps,
  charToValue,
  valueToChar,
} from '../utils/numberSystems';

export const Chapter6Subtraction: React.FC = () => {
  const [activeBase, setActiveBase] = useState<BaseType>(2);
  const [numA, setNumA] = useState<string>('10000');
  const [numB, setNumB] = useState<string>('00001');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [speedMs, setSpeedMs] = useState<number>(1500); // Ultra slow default

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
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-rose-600 dark:text-rose-400 mb-1">
          <Link2 className="w-4 h-4" /> Chapter 6 • Slow-Motion Animation Laboratory
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Slow-Motion Chain Borrowing &amp; Strike-Through Simulator
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Watch in slow motion how a borrow propagates left to find a non-zero donor, strikes through the donor, travels across consecutive zeroes (turning them into base − 1), and empowers the target column by +base!
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-500 self-center mr-1">Presets:</span>
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
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
              activeBase === p.base && numA === p.a && numB === p.b
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-rose-400'
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Simulator Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Top Control Bar: Base Selection, Speed Selection */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 mb-6">
          {/* Base Selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
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
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  activeBase === b
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {BASES[b].name} ({b})
              </button>
            ))}
          </div>

          {/* Speed Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Speed:
            </span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
              <button
                onClick={() => setSpeedMs(2200)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  speedMs === 2200
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Ultra Slow (2.2s)
              </button>
              <button
                onClick={() => setSpeedMs(1200)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  speedMs === 1200
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Slow (1.2s)
              </button>
              <button
                onClick={() => setSpeedMs(600)}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  speedMs === 600
                    ? 'bg-rose-600 text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Normal (0.6s)
              </button>
            </div>
          </div>
        </div>

        {/* Custom Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-lg text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
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
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Playback Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-sm transition-all ${
                isPlaying
                  ? 'bg-amber-500 text-white'
                  : 'bg-rose-600 hover:bg-rose-500 text-white'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isPlaying ? 'Pause Simulation' : 'Play Slow-Mo Animation'}
            </button>
            <button
              onClick={handlePrev}
              disabled={currentStepIndex === 0}
              className="p-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white disabled:opacity-30 hover:bg-slate-300"
              title="Previous Step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              disabled={currentStepIndex >= steps.length - 1}
              className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-1 disabled:opacity-30 hover:bg-slate-300"
            >
              Next Step <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:text-slate-900"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs font-mono font-bold text-slate-500">
            Step {currentStepIndex + 1} / {steps.length}
          </div>
        </div>

        {/* Live Step Explanation Callout */}
        {currentStep && (
          <div
            className={`p-4 rounded-2xl border text-xs sm:text-sm font-mono mb-8 flex items-start gap-3 transition-all duration-300 ${
              currentStep.actionType === 'strike_source'
                ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-200'
                : currentStep.actionType === 'strike_intermediate'
                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 text-amber-950 dark:text-amber-200'
                : currentStep.actionType === 'transfer_target'
                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-800 text-indigo-950 dark:text-indigo-200'
                : currentStep.actionType === 'subtract'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
                : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
            }`}
          >
            <Zap className="w-5 h-5 shrink-0 mt-0.5 text-rose-500" />
            <div>
              <div className="font-extrabold uppercase tracking-wider text-[11px] opacity-80 mb-1">
                Action: {currentStep.actionType.replace('_', ' ').toUpperCase()}
              </div>
              <p className="leading-relaxed font-semibold">{currentStep.explanation}</p>
            </div>
          </div>
        )}

        {/* VISUAL STRIKE-THROUGH AND BORROW ARROW COLUMNS */}
        <div className="overflow-x-auto py-6">
          <div className="flex items-end justify-center gap-3 sm:gap-5 min-w-max">
            {Array.from({ length: maxLen }).map((_, colOffset) => {
              const charIdx = colOffset;
              const colPower = maxLen - 1 - charIdx;

              const origDigitA = paddedA[charIdx];
              const origDigitB = paddedB[charIdx];

              const strikethroughInfo = currentStep?.strikethroughs[colPower];
              const isStrikethrough = !!strikethroughInfo;

              const intermediateVal = currentStep?.intermediateValues[colPower];
              const resultDigit = currentStep?.resultDigits[colPower];
              const isActiveColumn = currentStep?.activeCol === colPower;

              const isArrowOrigin = currentStep?.arrowActive?.from === colPower;
              const isArrowTarget = currentStep?.arrowActive?.to === colPower;

              return (
                <div
                  key={colOffset}
                  className={`relative flex flex-col items-center p-3 sm:p-4 rounded-3xl border-2 transition-all duration-300 ${
                    isActiveColumn
                      ? 'border-rose-500 bg-rose-50/60 dark:bg-rose-950/30 shadow-lg scale-105'
                      : isStrikethrough
                      ? 'border-amber-300 dark:border-amber-700/60 bg-amber-50/30 dark:bg-amber-950/20'
                      : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                  }`}
                >
                  {/* TOP BADGE: NEW REVISED VALUE AFTER STRIKE */}
                  <div className="h-8 flex items-center justify-center mb-1">
                    {isStrikethrough && (
                      <div
                        className={`text-xs font-mono font-black px-2 py-0.5 rounded-md border shadow-xs animate-bounce ${
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
                  <div className="relative font-mono font-black text-3xl sm:text-4xl text-slate-900 dark:text-white">
                    <span
                      className={`inline-block transition-all ${
                        isStrikethrough
                          ? 'line-through text-slate-400 dark:text-slate-500 decoration-rose-500 decoration-4'
                          : ''
                      }`}
                    >
                      {origDigitA}
                    </span>
                  </div>

                  {/* SUBTRAHEND DIGIT (B) */}
                  <div className="font-mono font-black text-3xl sm:text-4xl text-slate-700 dark:text-slate-300 my-2">
                    {origDigitB}
                  </div>

                  <div className="w-full border-t-2 border-slate-900 dark:border-slate-200 my-1" />

                  {/* RESULT DIFFERENCE DIGIT */}
                  <div
                    className={`font-mono font-black text-3xl sm:text-4xl mt-1 h-10 flex items-center justify-center ${
                      resultDigit
                        ? 'text-emerald-600 dark:text-emerald-400 scale-110'
                        : 'text-slate-300 dark:text-slate-700'
                    }`}
                  >
                    {resultDigit || '·'}
                  </div>

                  {/* Position Weight */}
                  <div className="text-[10px] font-mono text-slate-400 mt-2 font-bold">
                    {activeBase}
                    <sup>{colPower}</sup>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step-by-Step Rule Box */}
        <div className="mt-8 p-5 rounded-2xl bg-slate-900 text-slate-100 text-xs leading-relaxed space-y-2 border border-slate-800">
          <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider mb-1">
            Golden Rules of Positional Borrowing (All Bases):
          </div>
          <p>
            • <strong>When Top &lt; Bottom</strong>: You must borrow 1 group from the nearest non-zero column to the left.
          </p>
          <p>
            • <strong>Strike Donor</strong>: The donor digit drops by 1 (e.g. 1 ➔ 0, 3 ➔ 2).
          </p>
          <p>
            • <strong>Intermediate Zeroes</strong>: Each zero in between becomes (base − 1) because it receives base and immediately passes 1 to the next right position!
          </p>
          <p>
            • <strong>Target Arrival</strong>: The target column receives exactly +base units (+2 in Binary, +8 in Octal, +10 in Decimal, +16 in Hex).
          </p>
        </div>
      </div>
    </div>
  );
};
