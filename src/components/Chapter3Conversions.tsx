import React, { useState } from 'react';
import {
  ArrowLeftRight,
  ArrowDown,
  Sparkles,
  Layers,
  Divide,
  GitFork,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { BaseType } from '../types';
import {
  BASES,
  isValidNumberString,
  convertBetweenBases,
  parseNumberToDecimal,
  getSuccessiveDivisionSteps,
  getSuccessiveMultiplicationSteps,
  getBitGroupingBreakdown,
  getPowerExpansionDetails,
} from '../utils/numberSystems';

export const Chapter3Conversions: React.FC = () => {
  const [fromBase, setFromBase] = useState<BaseType>(10);
  const [toBase, setToBase] = useState<BaseType>(2);
  const [inputValue, setInputValue] = useState<string>('25.625');

  const isValid = isValidNumberString(inputValue, fromBase);
  const convertedResult = isValid ? convertBetweenBases(inputValue, fromBase, toBase) : 'Invalid';

  // Preset scenarios
  const presets = [
    { label: 'Decimal 25.625 ➔ Binary', from: 10 as BaseType, to: 2 as BaseType, val: '25.625' },
    { label: 'Hex 3A7 ➔ Octal (via Binary)', from: 16 as BaseType, to: 8 as BaseType, val: '3A7' },
    { label: 'Octal 725 ➔ Binary', from: 8 as BaseType, to: 2 as BaseType, val: '725' },
    { label: 'Binary 11010110 ➔ Hex', from: 2 as BaseType, to: 16 as BaseType, val: '11010110' },
    { label: 'Hex FF.8 ➔ Decimal', from: 16 as BaseType, to: 10 as BaseType, val: 'FF.8' },
  ];

  // Detailed breakdown calculations
  const parts = inputValue.trim().split('.');
  const intStr = parts[0] || '0';
  const fracStr = parts[1] || '';

  const decimalVal = isValid ? parseNumberToDecimal(inputValue, fromBase) : 0;
  const decimalInt = Math.floor(decimalVal);
  const decimalFrac = +(decimalVal - decimalInt).toFixed(8);

  const divisionSteps = isValid && toBase !== fromBase && toBase !== 10
    ? getSuccessiveDivisionSteps(fromBase === 10 ? parseInt(intStr || '0', 10) : decimalInt, toBase)
    : [];

  const multiplicationSteps = isValid && decimalFrac > 0 && toBase !== 10
    ? getSuccessiveMultiplicationSteps(decimalFrac, toBase)
    : [];

  const powerExpansion = isValid && toBase === 10
    ? getPowerExpansionDetails(inputValue, fromBase)
    : null;

  const isPowerOfTwoPair = (fromBase === 2 || fromBase === 8 || fromBase === 16) && (toBase === 2 || toBase === 8 || toBase === 16);
  const bitGrouping = isPowerOfTwoPair && (toBase === 8 || toBase === 16)
    ? getBitGroupingBreakdown(convertBetweenBases(inputValue, fromBase, 2), toBase)
    : null;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-1">
          <ArrowLeftRight className="w-4 h-4" /> Chapter 3 • Universal Radix Laboratory
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Universal Base Conversion Matrix
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Convert seamlessly between Binary, Octal, Decimal, and Hexadecimal with comprehensive step-by-step mathematical breakdowns.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap gap-2">
        <span className="text-xs font-bold text-slate-500 self-center mr-1">Quick Presets:</span>
        {presets.map((p, idx) => (
          <button
            key={idx}
            onClick={() => {
              setFromBase(p.from);
              setToBase(p.to);
              setInputValue(p.val);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all text-slate-700 dark:text-slate-300"
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Main Converter Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* FROM BASE */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Source Base (From)
              </label>
              <span className="text-xs font-bold font-mono" style={{ color: BASES[fromBase].color }}>
                Base {fromBase} ({BASES[fromBase].name})
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              {([2, 8, 10, 16] as BaseType[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setFromBase(b)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    fromBase === b
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {BASES[b].symbol}
                </button>
              ))}
            </div>

            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value.toUpperCase())}
              placeholder="Enter number..."
              className={`w-full px-4 py-3 rounded-2xl border font-mono font-bold text-xl focus:outline-hidden focus:ring-2 ${
                isValid
                  ? 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-blue-500'
                  : 'border-rose-400 bg-rose-50 text-rose-700 focus:ring-rose-400'
              }`}
            />
            {!isValid && (
              <p className="text-xs text-rose-500 font-semibold">
                Invalid characters for Base {fromBase}. Allowed: {BASES[fromBase].digits.join(', ')}
              </p>
            )}
          </div>

          {/* SWAP ICON */}
          <div className="lg:col-span-2 flex justify-center">
            <button
              onClick={() => {
                const tempB = fromBase;
                setFromBase(toBase);
                setToBase(tempB);
                if (isValid && convertedResult !== 'Invalid') {
                  setInputValue(convertedResult);
                }
              }}
              className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 transition-all shadow-xs hover:scale-110 active:scale-95"
              title="Swap From and To Bases"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>
          </div>

          {/* TO BASE */}
          <div className="lg:col-span-5 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">
                Target Base (To)
              </label>
              <span className="text-xs font-bold font-mono" style={{ color: BASES[toBase].color }}>
                Base {toBase} ({BASES[toBase].name})
              </span>
            </div>

            <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
              {([2, 8, 10, 16] as BaseType[]).map((b) => (
                <button
                  key={b}
                  onClick={() => setToBase(b)}
                  className={`py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                    toBase === b
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  {BASES[b].symbol}
                </button>
              ))}
            </div>

            <div className="w-full px-4 py-3 rounded-2xl border border-emerald-300 dark:border-emerald-700/60 bg-emerald-50/70 dark:bg-emerald-950/30 text-emerald-950 dark:text-emerald-300 font-mono font-black text-xl flex items-center justify-between">
              <span className="truncate">{convertedResult}</span>
              <span className="text-xs font-bold opacity-70 ml-2">
                ({BASES[toBase].symbol}
                <sub>{toBase}</sub>)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* METHOD 1: SUCCESSIVE DIVISION LADDER (INTEGER CONVERSION) */}
      {divisionSteps.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">
                Integer Conversion Method
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Divide className="w-5 h-5 text-blue-500" /> Successive Division Ladder
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold font-mono">
              Divide by {toBase}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Divide repeatedly by the target radix ({toBase}). Record each remainder. Read the remainders from <strong>bottom to top (MSB to LSB)</strong>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="pb-2 px-3">Operation</th>
                  <th className="pb-2 px-3">Quotient</th>
                  <th className="pb-2 px-3 text-right">Remainder</th>
                  <th className="pb-2 px-3">Symbol</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {divisionSteps.map((step, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                      {step.dividend} ÷ {step.divisor}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                      = {step.quotient}
                    </td>
                    <td className="py-3 px-3 text-right text-slate-500 font-bold">
                      rem {step.remainder}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 font-black">
                        {step.remainderSymbol}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 flex items-center justify-between text-xs font-mono font-bold text-blue-900 dark:text-blue-300">
            <span>Read Bottom ➔ Top:</span>
            <span className="text-sm font-black text-blue-700 dark:text-blue-200">
              {divisionSteps.map((s) => s.remainderSymbol).reverse().join('')}
              <sub>{toBase}</sub>
            </span>
          </div>
        </div>
      )}

      {/* METHOD 2: SUCCESSIVE MULTIPLICATION LADDER (FRACTION CONVERSION) */}
      {multiplicationSteps.length > 0 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-wider">
                Fractional Conversion Method
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-indigo-500" /> Successive Multiplication Ladder
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold font-mono">
              Multiply by {toBase}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Multiply the fractional part repeatedly by the target radix ({toBase}). Extract the whole integer part at each step and continue with the remaining fraction. Read the extracted digits from <strong>top to bottom</strong>.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-mono text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                  <th className="pb-2 px-3">Multiplication</th>
                  <th className="pb-2 px-3">Product</th>
                  <th className="pb-2 px-3">Extracted Integer</th>
                  <th className="pb-2 px-3">Remainder Fraction</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {multiplicationSteps.map((step, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="py-3 px-3 text-slate-700 dark:text-slate-300">
                      0.{step.fraction.toString().split('.')[1] || '0'} × {step.multiplier}
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                      = {step.product}
                    </td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 font-black">
                        {step.integerSymbol}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-500">
                      0.{step.remainingFraction.toString().split('.')[1] || '0'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 flex items-center justify-between text-xs font-mono font-bold text-indigo-900 dark:text-indigo-300">
            <span>Read Top ➔ Bottom:</span>
            <span className="text-sm font-black text-indigo-700 dark:text-indigo-200">
              0.{multiplicationSteps.map((s) => s.integerSymbol).join('')}
              <sub>{toBase}</sub>
            </span>
          </div>
        </div>
      )}

      {/* METHOD 3: FAST BIT GROUPING (FOR OCTAL & HEX) */}
      {bitGrouping && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
                Fast Bit-Grouping Method
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <GitFork className="w-5 h-5 text-amber-500" />{' '}
                {toBase === 8 ? '3-Bit Octal Grouping' : '4-Bit Hex Nibble Grouping'}
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-bold font-mono">
              Group size = {toBase === 8 ? '3 bits' : '4 bits'}
            </span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-400 mb-6">
            Integer bits are grouped starting from the <strong>radix point moving LEFT</strong> (padded with leading zeros if incomplete). Fractional bits are grouped moving <strong>RIGHT</strong> (padded with trailing zeros).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/60">
            {bitGrouping.intGroups.map((grp, i) => (
              <div
                key={i}
                className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs"
              >
                <div className="font-mono text-sm font-bold text-slate-600 dark:text-slate-300 tracking-widest mb-1">
                  {grp.groupBits}
                </div>
                <ArrowDown className="w-3.5 h-3.5 text-slate-400 my-0.5" />
                <div className="font-mono text-lg font-black text-amber-600 dark:text-amber-400">
                  {grp.digitSymbol}
                </div>
                {grp.padded && (
                  <span className="text-[9px] text-amber-600 font-semibold mt-1 font-mono">
                    (zero padded)
                  </span>
                )}
              </div>
            ))}

            {bitGrouping.fracGroups.length > 0 && (
              <>
                <div className="font-black text-2xl text-slate-400 px-1">.</div>
                {bitGrouping.fracGroups.map((grp, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 shadow-xs"
                  >
                    <div className="font-mono text-sm font-bold text-slate-600 dark:text-slate-300 tracking-widest mb-1">
                      {grp.groupBits}
                    </div>
                    <ArrowDown className="w-3.5 h-3.5 text-slate-400 my-0.5" />
                    <div className="font-mono text-lg font-black text-amber-600 dark:text-amber-400">
                      {grp.digitSymbol}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* METHOD 4: POWER EXPANSION (CONVERTING TO DECIMAL) */}
      {powerExpansion && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                Polynomial Evaluation Method
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-500" /> Power-of-Radix Expansion
              </h3>
            </div>
            <span className="text-xs px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold font-mono">
              Radix = {fromBase}
            </span>
          </div>

          <div className="space-y-2 font-mono text-xs sm:text-sm bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800">
            {powerExpansion.intTerms.map((term, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400 font-semibold">{term.formula}</span>
                <span className="text-amber-400 font-bold">= {term.expanded}</span>
              </div>
            ))}
            {powerExpansion.fracTerms.map((term, i) => (
              <div key={i} className="flex items-center justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-400 font-semibold">{term.formula}</span>
                <span className="text-indigo-400 font-bold">= {term.expanded}</span>
              </div>
            ))}
            <div className="pt-3 flex items-center justify-between text-emerald-400 font-extrabold text-sm sm:text-base">
              <span>Total Decimal Sum:</span>
              <span>= {powerExpansion.total}₁₀</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
