import React, { useState } from 'react';
import { XCircle, Divide, Sparkles } from 'lucide-react';
import { BaseType } from '../types';
import { BASES, isValidNumberString, parseNumberToDecimal, convertDecimalToBase } from '../utils/numberSystems';

export const Chapter8Multiplication: React.FC = () => {
  const [activeBase, setActiveBase] = useState<BaseType>(2);
  const [numA, setNumA] = useState<string>('101');
  const [numB, setNumB] = useState<string>('11');

  const isValidA = isValidNumberString(numA, activeBase);
  const isValidB = isValidNumberString(numB, activeBase);
  const canCalc = isValidA && isValidB;

  const decA = canCalc ? parseNumberToDecimal(numA, activeBase) : 0;
  const decB = canCalc ? parseNumberToDecimal(numB, activeBase) : 0;
  const decProduct = decA * decB;
  const baseProduct = canCalc ? convertDecimalToBase(decProduct, activeBase) : '0';

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1">
          <XCircle className="w-4 h-4" /> Chapter 8 • Shift-and-Add Multiplication
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Multi-Base Multiplication &amp; Shift Matrix
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          In binary, multiplication reduces to simple AND gates and left-shifts: multiplying by $1$ copies the multiplicand; multiplying by $0$ yields all zeroes!
        </p>
      </div>

      {/* Inputs Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Multiplicand A (Base {activeBase})
            </label>
            <input
              type="text"
              value={numA}
              onChange={(e) => setNumA(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-lg text-slate-900 dark:text-white"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-1">
              Multiplier B (Base {activeBase})
            </label>
            <input
              type="text"
              value={numB}
              onChange={(e) => setNumB(e.target.value.toUpperCase())}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-lg text-slate-900 dark:text-white"
            />
          </div>
        </div>

        {/* Long Multiplication Visual Box */}
        <div className="p-6 rounded-2xl bg-slate-900 text-slate-100 font-mono text-sm sm:text-base border border-slate-800 flex flex-col items-center">
          <div className="w-full max-w-xs text-right space-y-1">
            <div className="text-2xl font-bold tracking-widest text-slate-200">{numA}</div>
            <div className="text-2xl font-bold tracking-widest text-amber-400">× {numB}</div>
            <div className="border-t-2 border-slate-700 my-2" />

            {/* Partial products */}
            {Array.from(numB).reverse().map((bDigit, idx) => {
              const shift = ' '.repeat(idx);
              const part = bDigit === '1' ? numA : '0'.repeat(numA.length);
              return (
                <div key={idx} className="text-slate-400 tracking-widest">
                  {part}
                  {shift}
                </div>
              );
            })}

            <div className="border-t-2 border-slate-700 my-2" />
            <div className="text-3xl font-black tracking-widest text-emerald-400">
              {baseProduct}
              <sub className="text-xs">{BASES[activeBase].subscript}</sub>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 text-center font-sans">
            In decimal: {decA} × {decB} = {decProduct}₁₀
          </div>
        </div>
      </div>
    </div>
  );
};
