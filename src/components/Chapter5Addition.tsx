import React, { useState } from 'react';
import { PlusCircle, Play, RotateCcw, Sparkles, ChevronRight, CheckCircle2, ChevronLeft } from 'lucide-react';
import { BaseType } from '../types';
import { BASES, isValidNumberString, generateAdditionSteps } from '../utils/numberSystems';

export const Chapter5Addition: React.FC = () => {
  const [activeBase, setActiveBase] = useState<BaseType>(2);
  const [numA, setNumA] = useState<string>('1011');
  const [numB, setNumB] = useState<string>('0110');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(-1);

  const isValidA = isValidNumberString(numA, activeBase);
  const isValidB = isValidNumberString(numB, activeBase);
  const canCalculate = isValidA && isValidB;

  const steps = canCalculate ? generateAdditionSteps(numA, numB, activeBase) : [];

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > -1) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStepIndex(-1);
  };

  const handleAutoPlay = () => {
    setCurrentStepIndex(0);
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      if (idx < steps.length) {
        setCurrentStepIndex(idx);
      } else {
        clearInterval(interval);
      }
    }, 1200);
  };

  // Base Presets
  const handleSelectBase = (b: BaseType) => {
    setActiveBase(b);
    setCurrentStepIndex(-1);
    if (b === 2) {
      setNumA('1011');
      setNumB('0110');
    } else if (b === 8) {
      setNumA('753');
      setNumB('467');
    } else if (b === 10) {
      setNumA('678');
      setNumB('495');
    } else {
      setNumA('3A7');
      setNumB('8CF');
    }
  };

  return (
    <div className="space-y-8 sm:space-y-10 animate-fadeIn">
      {/* Chapter Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1.5">
          <PlusCircle className="w-5 h-5" /> Chapter 5 • Arithmetic Synthesis
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
          Column Addition &amp; Carry Propagation
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
          Whenever column sum S ≥ base, the output digit is S mod base and carry ⌊S/base⌋ rolls left to the next power column.
        </p>
      </div>

      {/* Base Toggle Chips */}
      <div>
        <span className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
          Select Radix:
        </span>
        <div className="flex flex-wrap gap-2.5">
          {([2, 8, 10, 16] as BaseType[]).map((b) => (
            <button
              key={b}
              onClick={() => handleSelectBase(b)}
              className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-mono font-black transition-all active:scale-95 ${
                activeBase === b
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400'
              }`}
            >
              {BASES[b].name} (Base {b})
            </button>
          ))}
        </div>
      </div>

      {/* Inputs & Visual Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-8 md:p-10 shadow-sm">
        {/* Custom Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
              Addend A (Base {activeBase})
            </label>
            <input
              type="text"
              value={numA}
              onChange={(e) => {
                setNumA(e.target.value.toUpperCase());
                setCurrentStepIndex(-1);
              }}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-black text-xl sm:text-2xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
          <div>
            <label className="text-xs font-black text-slate-500 uppercase tracking-wider block mb-2">
              Addend B (Base {activeBase})
            </label>
            <input
              type="text"
              value={numB}
              onChange={(e) => {
                setNumB(e.target.value.toUpperCase());
                setCurrentStepIndex(-1);
              }}
              className="w-full px-5 py-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-black text-xl sm:text-2xl focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="text-xs sm:text-sm font-mono font-black px-4 py-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleAutoPlay}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-black text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-blue-600/30 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4" /> Auto-Solve (1.2s / step)
            </button>
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex < 0}
              className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white disabled:opacity-30 hover:bg-slate-300 active:scale-95 transition-all"
              title="Previous Step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex >= steps.length - 1}
              className="px-5 py-3 rounded-2xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white font-black text-xs sm:text-sm flex items-center gap-1.5 disabled:opacity-40 active:scale-95 transition-all"
            >
              Next Column <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={handleReset}
              className="p-3 rounded-2xl border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
              title="Reset"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Step Explanation Alert */}
        {currentStepIndex >= 0 && currentStepIndex < steps.length && (
          <div className="p-5 sm:p-6 rounded-3xl bg-blue-50/90 dark:bg-blue-950/50 border-2 border-blue-300 dark:border-blue-800 text-sm sm:text-base font-mono text-blue-950 dark:text-blue-100 mb-10 flex items-start gap-3.5 shadow-md">
            <Sparkles className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="font-black text-blue-900 dark:text-blue-300 uppercase tracking-wider text-xs sm:text-sm mb-1">
                Column Evaluation: {steps[currentStepIndex].colName}
              </div>
              <p className="font-bold leading-relaxed">{steps[currentStepIndex].explanation}</p>
            </div>
          </div>
        )}

        {/* Multi-Column Visualizer */}
        <div className="overflow-x-auto py-6 px-2 bg-slate-50/50 dark:bg-slate-950/40 rounded-3xl border border-slate-200 dark:border-slate-800">
          <div className="flex items-end justify-center gap-3 sm:gap-6 min-w-max px-4">
            {steps.slice().reverse().map((step, revIdx) => {
              const actualIdx = steps.length - 1 - revIdx;
              const isProcessed = actualIdx <= currentStepIndex;
              const isCurrent = actualIdx === currentStepIndex;

              return (
                <div
                  key={actualIdx}
                  className={`flex flex-col items-center p-4 sm:p-6 rounded-3xl border-2 min-w-[5rem] sm:min-w-[6.5rem] transition-all duration-300 ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/90 dark:bg-blue-950/50 scale-108 shadow-xl z-10'
                      : isProcessed
                      ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                      : 'border-dashed border-slate-200 dark:border-slate-800 opacity-40'
                  }`}
                >
                  {/* Carry In Tag */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-mono text-sm sm:text-base font-black mb-2 shadow-sm ${
                      step.carryIn > 0 && isProcessed
                        ? 'bg-amber-400 text-slate-950 animate-bounce'
                        : 'bg-transparent text-transparent'
                    }`}
                  >
                    {step.carryIn > 0 ? step.carryIn : ''}
                  </div>

                  {/* Digit A */}
                  <div className="font-mono font-black text-4xl sm:text-6xl text-slate-900 dark:text-slate-100 mb-1.5">
                    {step.digitA}
                  </div>

                  {/* Digit B */}
                  <div className="font-mono font-black text-4xl sm:text-6xl text-slate-800 dark:text-slate-200 mb-2">
                    {step.digitB}
                  </div>

                  <div className="w-full border-t-3 border-slate-800 dark:border-slate-200 my-2" />

                  {/* Sum Result */}
                  <div
                    className={`font-mono font-black text-4xl sm:text-6xl mt-1 h-14 flex items-center justify-center ${
                      isProcessed ? 'text-emerald-600 dark:text-emerald-400 scale-110 animate-fadeIn' : 'text-slate-300 dark:text-slate-700'
                    }`}
                  >
                    {isProcessed ? step.sumDigit : '?'}
                  </div>

                  <div className="text-xs font-mono text-slate-400 mt-3 font-black">
                    {activeBase}
                    <sup>{step.positionPower}</sup>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
