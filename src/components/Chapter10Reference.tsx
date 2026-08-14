import React, { useState } from 'react';
import { BookMarked, Copy, Check, Sparkles, Calculator } from 'lucide-react';
import { BaseType } from '../types';
import { BASES, convertBetweenBases, isValidNumberString } from '../utils/numberSystems';

export const Chapter10Reference: React.FC = () => {
  const [quickInput, setQuickInput] = useState<string>('255');
  const [quickBase, setQuickBase] = useState<BaseType>(10);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const isValid = isValidNumberString(quickInput, quickBase);

  const binVal = isValid ? convertBetweenBases(quickInput, quickBase, 2) : '—';
  const octVal = isValid ? convertBetweenBases(quickInput, quickBase, 8) : '—';
  const decVal = isValid ? convertBetweenBases(quickInput, quickBase, 10) : '—';
  const hexVal = isValid ? convertBetweenBases(quickInput, quickBase, 16) : '—';

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  const powersOfTwo = [
    { p: 0, val: 1 },
    { p: 1, val: 2 },
    { p: 2, val: 4 },
    { p: 3, val: 8 },
    { p: 4, val: 16 },
    { p: 5, val: 32 },
    { p: 6, val: 64 },
    { p: 7, val: 128 },
    { p: 8, val: 256 },
    { p: 9, val: 512 },
    { p: 10, val: 1024 },
    { p: 11, val: 2048 },
    { p: 12, val: 4096 },
    { p: 16, val: 65536 },
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title */}
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-1">
          <BookMarked className="w-4 h-4" /> Chapter 10 • Quick Lookup &amp; Cheat Sheet
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white">
          Master Reference Center &amp; Instant Multi-Base Converter
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">
          Keep this visual reference open during your studies and system design tasks.
        </p>
      </div>

      {/* Instant Multi-Base Converter Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2 flex items-center gap-2">
          <Calculator className="w-5 h-5 text-indigo-500" /> Instant Multi-Base Synchronizer
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Type any number in any base to see all 4 representations instantly update with copyable values.
        </p>

        {/* Input */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
            {([2, 8, 10, 16] as BaseType[]).map((b) => (
              <button
                key={b}
                onClick={() => {
                  setQuickBase(b);
                  if (b === 2) setQuickInput('11111111');
                  else if (b === 8) setQuickInput('377');
                  else if (b === 10) setQuickInput('255');
                  else setQuickInput('FF');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                  quickBase === b
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Base {b}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value.toUpperCase())}
            placeholder="Type value..."
            className="flex-1 px-4 py-2.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono font-bold text-lg text-slate-900 dark:text-white"
          />
        </div>

        {/* Output Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Binary (Base 2)', val: binVal, base: 2, color: 'text-blue-600 dark:text-blue-400' },
            { label: 'Octal (Base 8)', val: octVal, base: 8, color: 'text-purple-600 dark:text-purple-400' },
            { label: 'Decimal (Base 10)', val: decVal, base: 10, color: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Hexadecimal (Base 16)', val: hexVal, base: 16, color: 'text-amber-600 dark:text-amber-400' },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col justify-between"
            >
              <div>
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                  {item.label}
                </span>
                <div className={`font-mono font-black text-xl break-all ${item.color}`}>
                  {item.val}
                </div>
              </div>
              <button
                onClick={() => copyToClipboard(item.val, item.label)}
                className="mt-3 py-1 px-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[10px] font-bold text-slate-600 dark:text-slate-300 flex items-center justify-center gap-1 hover:bg-slate-100"
              >
                {copiedKey === item.label ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                {copiedKey === item.label ? 'Copied' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Powers of 2 Lookup Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm">
        <h3 className="font-black text-xl text-slate-900 dark:text-white mb-2">
          Essential Powers of 2 Reference
        </h3>
        <p className="text-xs text-slate-500 mb-6">
          Every computer scientist memorizes these key binary power boundaries ($2^0$ to $2^{16}$).
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {powersOfTwo.map((item) => (
            <div
              key={item.p}
              className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center"
            >
              <div className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                2<sup>{item.p}</sup>
              </div>
              <div className="font-mono font-black text-base text-slate-900 dark:text-white mt-0.5">
                {item.val.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
