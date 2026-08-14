import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Plus, Sparkles, Gauge, ArrowRight } from 'lucide-react';
import { BaseType } from '../types';
import { BASES, valueToChar, convertDecimalToBase } from '../utils/numberSystems';

export const Chapter2BaseCounter: React.FC = () => {
  const [activeBase, setActiveBase] = useState<BaseType>(2);
  const [count, setCount] = useState<number>(0);
  const [autoPlay, setAutoPlay] = useState<boolean>(false);
  const [carryTriggered, setCarryTriggered] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 700);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoPlay]);

  const handleIncrement = () => {
    setCount((prev) => {
      const next = prev + 1;
      const prevStr = convertDecimalToBase(prev, activeBase);
      const nextStr = convertDecimalToBase(next, activeBase);
      if (nextStr.length > prevStr.length) {
        setCarryTriggered(true);
        setTimeout(() => setCarryTriggered(false), 800);
      }
      return next;
    });
  };

  const handleReset = () => {
    setCount(0);
    setAutoPlay(false);
  };

  // Digits formatted for active base
  const formattedActive = convertDecimalToBase(count, activeBase);
  const activeDigits = Array.from(formattedActive);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
          <Gauge className="w-4 h-4" /> Chapter 2 • Dynamic Overflow Engine
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          The Base Odometer &amp; Overflow Principle
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Every number system counts sequentially from $0$ up to $(b-1)$. When a position runs out of symbols, it resets to $0$ and triggers a <strong>Carry (+1)</strong> to the left!
        </p>
      </div>

      {/* Main Odometer Visualizer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm text-center">
        {/* Base Toggle Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {([2, 8, 10, 16] as BaseType[]).map((base) => {
            const bInfo = BASES[base];
            const isSelected = activeBase === base;
            return (
              <button
                key={base}
                onClick={() => setActiveBase(base)}
                className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                  isSelected
                    ? 'text-white shadow-md scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
                style={{
                  backgroundColor: isSelected ? bInfo.color : undefined,
                }}
              >
                {bInfo.name} (Base {base})
              </button>
            );
          })}
        </div>

        {/* Big Odometer Digit Wheels */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 my-8 overflow-x-auto py-2">
          {activeDigits.map((digit, idx) => {
            const power = activeDigits.length - 1 - idx;
            const isRightmost = idx === activeDigits.length - 1;
            return (
              <div key={idx} className="flex flex-col items-center">
                <div
                  className={`w-14 sm:w-20 h-20 sm:h-28 rounded-2xl flex items-center justify-center font-mono font-black text-3xl sm:text-5xl shadow-inner border-2 transition-all duration-300 ${
                    carryTriggered
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/40 text-amber-500 scale-105'
                      : isRightmost
                      ? 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100'
                  }`}
                >
                  {digit}
                </div>
                <div className="mt-2 text-[10px] font-mono font-bold text-slate-400">
                  {activeBase}
                  <sup>{power}</sup>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carry Notification */}
        {carryTriggered && (
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-600 dark:text-amber-300 text-xs font-bold animate-bounce mb-6">
            <Sparkles className="w-4 h-4" /> Position Overflow! Carry (+1) rolled over to the left!
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <button
            onClick={handleIncrement}
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30 transition-all hover:scale-105 active:scale-95"
          >
            <Plus className="w-5 h-5" /> Count +1
          </button>

          <button
            onClick={() => setAutoPlay(!autoPlay)}
            className={`px-5 py-3 rounded-2xl border font-bold text-sm flex items-center gap-2 transition-all ${
              autoPlay
                ? 'bg-rose-500 text-white border-rose-600'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
            }`}
          >
            {autoPlay ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {autoPlay ? 'Pause Auto-Tick' : 'Auto Tick'}
          </button>

          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-900 font-bold text-sm flex items-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
        </div>
      </div>

      {/* Side-by-Side Synchronized Ticker for All 4 Bases */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">
          Synchronized Multi-Base Equivalents
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Notice how rapidly Binary expands in width compared to Hexadecimal as value increases.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {([2, 8, 10, 16] as BaseType[]).map((b) => {
            const bInfo = BASES[b];
            const val = convertDecimalToBase(count, b);
            return (
              <div
                key={b}
                className="p-5 rounded-2xl border flex flex-col justify-between"
                style={{
                  backgroundColor: bInfo.lightBg,
                  borderColor: bInfo.borderColor,
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-extrabold text-xs text-slate-700 dark:text-slate-300">
                    {bInfo.name}
                  </span>
                  <span
                    style={{ color: bInfo.color }}
                    className="font-mono text-[11px] font-bold"
                  >
                    Base {b}
                  </span>
                </div>
                <div className="font-mono font-black text-2xl text-slate-900 dark:text-slate-900 truncate">
                  {val}
                  <sub className="text-xs font-normal ml-0.5">{bInfo.subscript}</sub>
                </div>
                <div className="text-[10px] text-slate-500 mt-2 font-mono">
                  {val.length} {val.length === 1 ? 'digit' : 'digits'} wide
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
