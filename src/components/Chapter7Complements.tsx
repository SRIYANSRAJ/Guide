import React, { useState } from 'react';
import { RefreshCw, Sparkles, Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { BaseType } from '../types';
import { BASES, getComplementDetails, isValidNumberString } from '../utils/numberSystems';

export const Chapter7Complements: React.FC = () => {
  const [activeBase, setActiveBase] = useState<BaseType>(2);
  const [inputVal, setInputVal] = useState<string>('1010');
  const [bitWidth, setBitWidth] = useState<number>(8);

  const isValid = isValidNumberString(inputVal, activeBase);
  const comp = isValid ? getComplementDetails(inputVal, activeBase, bitWidth) : null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
          <RefreshCw className="w-4 h-4" /> Chapter 7 • Complements Architecture
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          $r$’s &amp; $(r-1)$’s Complements Method
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Computers perform subtraction using only addition circuitry via complements!
        </p>
      </div>

      {/* Base Selector */}
      <div className="flex flex-wrap gap-2">
        {([2, 8, 10, 16] as BaseType[]).map((b) => (
          <button
            key={b}
            onClick={() => {
              setActiveBase(b);
              if (b === 2) setInputVal('1010');
              else if (b === 8) setInputVal('452');
              else if (b === 10) setInputVal('729');
              else setInputVal('3A7');
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-mono font-bold transition-all ${
              activeBase === b
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            {BASES[b].name} ({b})
          </button>
        ))}
      </div>

      {/* Interactive Complement Laboratory */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Input Number (Base {activeBase})
            </label>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-lg text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Register Bit/Digit Width
            </label>
            <select
              value={bitWidth}
              onChange={(e) => setBitWidth(parseInt(e.target.value))}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-sm text-slate-900 dark:text-white"
            >
              <option value={4}>4 Digits</option>
              <option value={8}>8 Digits (1 Byte)</option>
              <option value={12}>12 Digits</option>
              <option value={16}>16 Digits</option>
            </select>
          </div>
        </div>

        {comp && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Diminished Radix (r - 1)'s Complement */}
            <div className="p-6 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-indigo-900 dark:text-indigo-300">
                  {comp.diminishedName}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-indigo-200 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  Subtract from {activeBase - 1}
                </span>
              </div>
              <div className="font-mono font-black text-2xl text-indigo-700 dark:text-indigo-300 tracking-widest mb-3">
                {comp.diminishedValue}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Formed by subtracting every digit from the maximum base symbol ($b - 1$). For binary, this is simply inverting all 0s to 1s and 1s to 0s (1's complement).
              </p>
            </div>

            {/* Radix r's Complement */}
            <div className="p-6 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
              <div className="flex items-center justify-between mb-3">
                <span className="font-extrabold text-sm text-emerald-900 dark:text-emerald-300">
                  {comp.radixName}
                </span>
                <span className="text-[10px] uppercase font-mono font-bold px-2 py-0.5 rounded bg-emerald-200 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200">
                  (r−1)'s + 1
                </span>
              </div>
              <div className="font-mono font-black text-2xl text-emerald-700 dark:text-emerald-300 tracking-widest mb-3">
                {comp.radixValue}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Formed by taking the $(r-1)$'s complement and adding $+1$ to the least significant position. This represents negative numbers in two's complement computer hardware.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
