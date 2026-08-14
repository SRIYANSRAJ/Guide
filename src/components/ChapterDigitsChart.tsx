import React from 'react';
import { Layers, HelpCircle, Sparkles } from 'lucide-react';
import { BASES, charToValue } from '../utils/numberSystems';

export const ChapterDigitsChart: React.FC = () => {
  const hexDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Chapter Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400 mb-1">
          <Layers className="w-4 h-4" /> Digits &amp; Symbols Reference
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Base Symbols &amp; Decimal Equivalents
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          In bases larger than 10 (like Hexadecimal Base 16), alphabetic characters $A \dots F$ represent single-digit values $10 \dots 15$.
        </p>
      </div>

      {/* Hexadecimal Special Cards Grid */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">
          Hexadecimal 16-Digit Matrix
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Hover over or tap each symbol to inspect its 4-bit binary nibble and decimal value.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {hexDigits.map((hex) => {
            const decVal = charToValue(hex);
            const binary4Bit = decVal.toString(2).padStart(4, '0');
            const isLetter = hex >= 'A';

            return (
              <div
                key={hex}
                className={`p-3.5 rounded-2xl border text-center transition-all duration-200 hover:scale-105 shadow-xs ${
                  isLetter
                    ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-300 dark:border-amber-700/60'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div
                  className={`font-mono font-black text-2xl mb-1 ${
                    isLetter ? 'text-amber-600 dark:text-amber-400' : 'text-slate-900 dark:text-white'
                  }`}
                >
                  {hex}
                </div>
                <div className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  = {decVal}
                  <sub className="text-[9px]">10</sub>
                </div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 mt-1.5 px-1.5 py-0.5 rounded bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                  {binary4Bit}
                  <sub className="text-[8px]">2</sub>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comparison Reference Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-4">
          All Bases 0 to 15 Comparison Chart
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] font-bold">
                <th className="pb-3 px-3">Decimal (Base 10)</th>
                <th className="pb-3 px-3">Binary (Base 2)</th>
                <th className="pb-3 px-3">Octal (Base 8)</th>
                <th className="pb-3 px-3">Hex (Base 16)</th>
                <th className="pb-3 px-3">4-Bit Nibble</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-800 dark:text-slate-200">
              {Array.from({ length: 16 }, (_, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-2.5 px-3 font-bold text-emerald-600 dark:text-emerald-400">{i}</td>
                  <td className="py-2.5 px-3 text-blue-600 dark:text-blue-400">{i.toString(2)}</td>
                  <td className="py-2.5 px-3 text-purple-600 dark:text-purple-400">{i.toString(8)}</td>
                  <td className="py-2.5 px-3 font-bold text-amber-600 dark:text-amber-400">
                    {i.toString(16).toUpperCase()}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{i.toString(2).padStart(4, '0')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
