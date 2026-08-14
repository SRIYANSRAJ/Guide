import React, { useState } from 'react';
import { Sparkles, Calculator, Layers, HelpCircle } from 'lucide-react';
import { BaseType } from '../types';
import { BASES, charToValue } from '../utils/numberSystems';

export const Chapter1Basics: React.FC = () => {
  const [selectedBase, setSelectedBase] = useState<BaseType>(10);
  const [inputNumber, setInputNumber] = useState<string>('3527');

  const info = BASES[selectedBase];
  const digits: string[] = Array.from(inputNumber.toUpperCase()).filter((d): d is string => d !== '.');

  // Place value weights calculation
  const placeValues = digits.map((d: string, index: number) => {
    const power = digits.length - 1 - index;
    const digitVal = charToValue(d);
    const weight = Math.pow(selectedBase, power);
    const contribution = digitVal * weight;
    return {
      digit: d,
      digitVal,
      power,
      weight,
      contribution,
    };
  });

  const totalValue = placeValues.reduce((sum, p) => sum + p.contribution, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
          <Layers className="w-4 h-4" /> Chapter 1 • Fundamental Architecture
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          What Is a Positional Number System?
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          The value of a digit is determined not just by the symbol itself, but by its{' '}
          <strong>positional weight (b^k)</strong> relative to the base.
        </p>
      </div>

      {/* Core Concept Box */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60">
          <div className="font-extrabold text-blue-900 dark:text-blue-300 text-sm mb-1">
            1. The Radix (Base b)
          </div>
          <p className="text-xs text-blue-950/80 dark:text-blue-200/80 leading-relaxed">
            The base b determines the total number of unique symbols (0 ... b-1). When counting reaches b, the position overflows and creates a carry.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/60">
          <div className="font-extrabold text-indigo-900 dark:text-indigo-300 text-sm mb-1">
            2. Positional Weight (b^k)
          </div>
          <p className="text-xs text-indigo-950/80 dark:text-indigo-200/80 leading-relaxed">
            Starting from the rightmost integer index k=0, each position to the left is multiplied by b^1, b^2, b^3, ... b^k.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60">
          <div className="font-extrabold text-emerald-900 dark:text-emerald-300 text-sm mb-1">
            3. Universal Polynomial
          </div>
          <p className="text-xs text-emerald-950/80 dark:text-emerald-200/80 leading-relaxed font-mono">
            Value = Σ (d_k · b^k)
          </p>
          <p className="text-[11px] text-emerald-800 dark:text-emerald-300/80 mt-1">
            This identical rule applies whether base is 2, 8, 10, or 16!
          </p>
        </div>
      </div>

      {/* Interactive Place Value Laboratory */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h3 className="font-black text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-blue-600" /> Interactive Positional Weight Lab
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a base and enter any custom number to see its positional weights decomposed.
            </p>
          </div>

          {/* Base Selector Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            {([2, 8, 10, 16] as BaseType[]).map((b) => (
              <button
                key={b}
                onClick={() => {
                  setSelectedBase(b);
                  if (b === 2) setInputNumber('10110');
                  else if (b === 8) setInputNumber('725');
                  else if (b === 10) setInputNumber('3527');
                  else setInputNumber('3A7');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition-all ${
                  selectedBase === b
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                {BASES[b].name} ({b})
              </button>
            ))}
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
          <div className="w-full sm:w-auto text-xs font-bold text-slate-700 dark:text-slate-300">
            Number in Base {selectedBase}:
          </div>
          <input
            type="text"
            value={inputNumber}
            onChange={(e) => setInputNumber(e.target.value.toUpperCase())}
            className="w-full sm:max-w-xs px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-mono font-bold text-lg focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. 10110"
          />
          <span className="text-xs text-slate-400 font-mono">
            Valid characters: {info.digits.slice(0, 8).join(', ')}
            {info.digits.length > 8 ? '...' : ''}
          </span>
        </div>

        {/* Visual Digit Weight Boxes */}
        <div className="mb-8 overflow-x-auto pb-4">
          <div className="flex items-center justify-center gap-3 min-w-max">
            {placeValues.map((pv, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-300 hover:scale-105 shadow-sm min-w-[84px]"
                style={{
                  backgroundColor: info.lightBg,
                  borderColor: info.borderColor,
                }}
              >
                {/* Digit Value */}
                <div
                  style={{ color: info.color }}
                  className="font-mono font-black text-3xl mb-1"
                >
                  {pv.digit}
                </div>

                {/* Digit decimal value if hex letter */}
                {pv.digitVal > 9 && (
                  <div className="text-[10px] font-bold text-amber-700 dark:text-amber-300 font-mono mb-1">
                    (= {pv.digitVal})
                  </div>
                )}

                {/* Weight expression */}
                <div className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                  {selectedBase}
                  <sup>{pv.power}</sup>
                </div>

                {/* Weight number */}
                <div className="text-[10px] font-mono text-slate-500 mt-1 font-semibold">
                  × {pv.weight}
                </div>

                {/* Column Contribution */}
                <div className="mt-2 text-xs font-mono font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-300/60 w-full text-center">
                  = {pv.contribution}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mathematical Summation Equation Box */}
        <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm border border-slate-800">
          <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold mb-2">
            Polynomial Expansion Result:
          </div>
          <div className="flex flex-wrap items-center gap-2 text-slate-200">
            <span className="font-bold text-amber-400">
              ({inputNumber}){BASES[selectedBase].subscript}
            </span>
            <span>=</span>
            {placeValues.map((pv, i) => (
              <React.Fragment key={i}>
                <span className="bg-slate-800 px-2 py-1 rounded-lg border border-slate-700">
                  ({pv.digitVal} × {selectedBase}
                  <sup>{pv.power}</sup>)
                </span>
                {i < placeValues.length - 1 && <span className="text-slate-500">+</span>}
              </React.Fragment>
            ))}
          </div>

          <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between">
            <span className="text-slate-400">Total Decimal Equivalent:</span>
            <span className="text-lg font-black text-emerald-400 font-mono">
              = {totalValue}
              <sub className="text-xs">10</sub>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
