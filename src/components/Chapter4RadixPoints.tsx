import React, { useState } from 'react';
import { Dot, Layers, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { BaseType } from '../types';
import { BASES, convertBetweenBases } from '../utils/numberSystems';

export const Chapter4RadixPoints: React.FC = () => {
  const [activeBase, setActiveBase] = useState<BaseType>(2);
  const [fractionInput, setFractionInput] = useState<string>('0.625');

  const binaryEq = convertBetweenBases(fractionInput, 10, 2);
  const octalEq = convertBetweenBases(fractionInput, 10, 8);
  const hexEq = convertBetweenBases(fractionInput, 10, 16);

  const fractionalWeights = [
    { power: -1, formula: '2⁻¹', decVal: 0.5, name: 'Half' },
    { power: -2, formula: '2⁻²', decVal: 0.25, name: 'Quarter' },
    { power: -3, formula: '2⁻³', decVal: 0.125, name: 'Eighth' },
    { power: -4, formula: '2⁻⁴', decVal: 0.0625, name: 'Sixteenth' },
    { power: -5, formula: '2⁻⁵', decVal: 0.03125, name: 'Thirty-second' },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-teal-600 dark:text-teal-400 mb-1">
          <Dot className="w-5 h-5" /> Chapter 4 • Fractional Precision
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Radix Points &amp; Negative Power Weights
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          The point separates the whole integer powers ($b^0, b^1, b^2 \dots$) on the left from the fractional inverse powers ($b^{-1}, b^{-2}, b^{-3} \dots$) on the right.
        </p>
      </div>

      {/* Binary Negative Powers Reference */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">
          Binary Fractional Powers Reference (2⁻ᵏ)
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Just like $10^{-1} = 0.1$ and $10^{-2} = 0.01$ in decimal, binary powers divide by 2 for every step to the right of the radix point.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {fractionalWeights.map((w) => (
            <div
              key={w.power}
              className="p-4 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800/60 text-center"
            >
              <div className="font-mono font-black text-xl text-teal-700 dark:text-teal-300">
                {w.formula}
              </div>
              <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300 mt-1">
                = {w.decVal}
              </div>
              <div className="text-[10px] text-slate-500 mt-1 font-semibold uppercase tracking-wider">
                {w.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Radix Arithmetic Alignment Guide */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Fractional Binary Addition
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Rule: <strong>Always align the radix points vertically</strong> before column addition!
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-sm">
            <div className="text-right tracking-widest text-slate-300">  101.101</div>
            <div className="text-right tracking-widest text-blue-400">+ 010.011</div>
            <div className="border-t border-slate-700 my-2" />
            <div className="text-right tracking-widest font-black text-emerald-400"> 1000.000₂</div>
          </div>
          <p className="text-[11px] text-slate-500 mt-3">
            In decimal: $5.625 + 2.375 = 8.000_{10}$.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-3 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Fractional Multi-Base Equivalents
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-4">
            Try entering any decimal fraction (e.g. 0.625, 0.75, 0.125):
          </p>

          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 font-sans font-bold">Decimal:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">{fractionInput}₁₀</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 font-sans font-bold">Binary:</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">{binaryEq}₂</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 font-sans font-bold">Octal:</span>
              <span className="font-bold text-purple-600 dark:text-purple-400">{octalEq}₈</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 font-sans font-bold">Hexadecimal:</span>
              <span className="font-bold text-amber-600 dark:text-amber-400">{hexEq}₁₆</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
