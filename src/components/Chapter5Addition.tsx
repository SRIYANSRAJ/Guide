import React, { useState } from 'react';
import { PlusCircle, Play, RotateCcw, Sparkles, ChevronRight, CheckCircle2 } from 'lucide-react';
import { BaseType } from '../types';
import { BASES, isValidNumberString, generateAdditionSteps, valueToChar } from '../utils/numberSystems';

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
    }, 1000);
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
    <div className="space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
          <PlusCircle className="w-4 h-4" /> Chapter 5 • Arithmetic Synthesis
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Column Addition &amp; Carry Propagation
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Whenever column sum S ≥ base, the output digit is S mod base and carry ⌊S/base⌋ rolls left to the next power column.
        </p>
      </div>

      {/* Base Toggle Chips */}
      <div className="flex flex-wrap gap-2">
        {([2, 8, 10, 16] as BaseType[]).map((b) => (
          <button
            key={b}
            onClick={() => handleSelectBase(b)}
            className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all ${
              activeBase === b
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {BASES[b].name} (Base {b})
          </button>
        ))}
      </div>

      {/* Inputs & Visual Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        {/* Custom Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Addend A (Base {activeBase})
            </label>
            <input
              type="text"
              value={numA}
              onChange={(e) => {
                setNumA(e.target.value.toUpperCase());
                setCurrentStepIndex(-1);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
              Addend B (Base {activeBase})
            </label>
            <input
              type="text"
              value={numB}
              onChange={(e) => {
                setNumB(e.target.value.toUpperCase());
                setCurrentStepIndex(-1);
              }}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg"
            />
          </div>
        </div>

        {/* Step Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 mb-8">
          <div className="text-xs font-mono font-bold text-slate-600 dark:text-slate-300">
            Step {currentStepIndex + 1} of {steps.length}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleAutoPlay}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3.5 h-3.5" /> Auto-Solve (1s / step)
            </button>
            <button
              onClick={handleNextStep}
              disabled={currentStepIndex >= steps.length - 1}
              className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-white font-bold text-xs flex items-center gap-1 disabled:opacity-40"
            >
              Next Column <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 text-slate-600 dark:text-slate-400 font-bold text-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Live Step Explanation Alert */}
        {currentStepIndex >= 0 && currentStepIndex < steps.length && (
          <div className="p-4 rounded-2xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-xs font-mono text-blue-950 dark:text-blue-200 mb-8 flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider text-[10px] mb-0.5">
                {steps[currentStepIndex].colName}
              </div>
              {steps[currentStepIndex].explanation}
            </div>
          </div>
        )}

        {/* Multi-Column Visualizer */}
        <div className="overflow-x-auto py-4">
          <div className="flex items-end justify-center gap-3 min-w-max">
            {steps.slice().reverse().map((step, revIdx) => {
              const actualIdx = steps.length - 1 - revIdx;
              const isProcessed = actualIdx <= currentStepIndex;
              const isCurrent = actualIdx === currentStepIndex;

              return (
                <div
                  key={actualIdx}
                  className={`flex flex-col items-center p-3 sm:p-4 rounded-2xl border-2 transition-all duration-300 ${
                    isCurrent
                      ? 'border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 scale-105 shadow-md'
                      : isProcessed
                      ? 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800'
                      : 'border-dashed border-slate-200 dark:border-slate-800 opacity-40'
                  }`}
                >
                  {/* Carry In Tag */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold mb-2 ${
                      step.carryIn > 0 && isProcessed
                        ? 'bg-amber-400 text-slate-900 animate-pulse'
                        : 'bg-transparent text-transparent'
                    }`}
                  >
                    {step.carryIn > 0 ? step.carryIn : ''}
                  </div>

                  {/* Digit A */}
                  <div className="font-mono font-black text-2xl text-slate-800 dark:text-slate-100 mb-1">
                    {step.digitA}
                  </div>

                  {/* Digit B */}
                  <div className="font-mono font-black text-2xl text-slate-800 dark:text-slate-100 mb-2">
                    {step.digitB}
                  </div>

                  <div className="w-full border-t-2 border-slate-800 dark:border-slate-200 my-1" />

                  {/* Sum Result */}
                  <div
                    className={`font-mono font-black text-2xl mt-1 ${
                      isProcessed ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-300 dark:text-slate-700'
                    }`}
                  >
                    {isProcessed ? step.sumDigit : '?'}
                  </div>

                  <div className="text-[9px] font-mono text-slate-400 mt-2 font-semibold">
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
