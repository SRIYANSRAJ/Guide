import React from 'react';
import { Heart, Sparkles, Binary, BookOpen, Layers, Cpu, Zap } from 'lucide-react';

interface FooterProps {
  onSelectChapter: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectChapter }) => {
  return (
    <footer className="mt-16 sm:mt-24 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-300">
      {/* Zero-Knowledge Conceptual Knowledge Vault */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-wider mb-3">
            <BookOpen className="w-4 h-4" /> Conceptual Knowledge Base
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Essential Computer Science Concepts Explained
          </h3>
          <p className="text-xs sm:text-base text-slate-500 dark:text-slate-400 mt-2 font-normal">
            Everything you need to know about number systems even if you start with zero background knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm leading-relaxed">
          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5 font-black text-slate-900 dark:text-white mb-2.5 text-base">
              <Cpu className="w-5 h-5 text-blue-500" /> 1. Why Computers Use Binary (Base 2)
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Electronic microprocessors consist of billions of microscopic transistors acting as switches. A switch has only 2 stable states: <strong>OFF (0V / logic 0)</strong> and <strong>ON (+5V or +3.3V / logic 1)</strong>. Binary matches physical semiconductor physics directly.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5 font-black text-slate-900 dark:text-white mb-2.5 text-base">
              <Layers className="w-5 h-5 text-purple-500" /> 2. Why Octal &amp; Hexadecimal Exist
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Long binary strings like <code className="text-blue-500 font-mono font-bold">1111111111110000₂</code> are unreadable to humans. Because 2³ = 8 and 2⁴ = 16, every 3 binary bits collapse directly into 1 Octal digit, and every 4 binary bits collapse into 1 Hex digit (<code className="text-amber-500 font-mono font-bold">FFF0₁₆</code>).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5 font-black text-slate-900 dark:text-white mb-2.5 text-base">
              <Zap className="w-5 h-5 text-amber-500" /> 3. What Carry &amp; Borrow Truly Mean
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              When a column sum reaches or exceeds the base value, the single position overflows and bundles a complete unit of the next power (Carry). When a top digit is smaller than the bottom digit, it unbundles 1 unit from the left, which dissolves into exactly +base units in the current column (Borrow).
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5 font-black text-slate-900 dark:text-white mb-2.5 text-base">
              <Binary className="w-5 h-5 text-emerald-500" /> 4. The Complements Subtraction Trick
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Building separate physical subtraction circuits inside a CPU Arithmetic Logic Unit (ALU) is costly and inefficient. By converting subtrahend B into its Two&apos;s Complement (B* = invert(B) + 1), the hardware calculates A − B as simple addition A + B*.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5 font-black text-slate-900 dark:text-white mb-2.5 text-base">
              <Sparkles className="w-5 h-5 text-rose-500" /> 5. Fractional Radix Points
            </div>
            <p className="text-slate-600 dark:text-slate-400">
              Just as numbers to the left of the point have weights b⁰, b¹, b², positions to the right have fractional weights b⁻¹ = 1/b, b⁻² = 1/b², b⁻³ = 1/b³. For binary: 0.1₂ = 0.5₁₀, 0.01₂ = 0.25₁₀, 0.001₂ = 0.125₁₀.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2.5 font-black text-slate-900 dark:text-white mb-2.5 text-base">
              <BookOpen className="w-5 h-5 text-indigo-500" /> 6. Universal Power Polynomial Rule
            </div>
            <p className="text-slate-600 dark:text-slate-400 font-mono text-xs">
              Number = dₙ·bⁿ + ... + d₁·b¹ + d₀·b⁰ + d₋₁·b⁻¹ + ...
              <br />
              <span className="font-sans text-slate-500 mt-2 block">
                This exact mathematical equation holds true without exception across all positional number systems.
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Main Dedicated Attribution Footer Bar */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-10 bg-slate-50 dark:bg-slate-950 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 font-black text-base text-slate-900 dark:text-white">
              <span>NumVisual Interactive Laboratory</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
              With passion and precision crafted by{' '}
              <strong className="text-slate-900 dark:text-slate-100 font-black">
                Sriyans And Devashish
              </strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm font-black text-slate-600 dark:text-slate-400">
            <button
              onClick={() => onSelectChapter('chapter1')}
              className="hover:text-blue-600 transition-colors"
            >
              Basics
            </button>
            <button
              onClick={() => onSelectChapter('chapter3')}
              className="hover:text-blue-600 transition-colors"
            >
              Conversions
            </button>
            <button
              onClick={() => onSelectChapter('subtraction_borrow')}
              className="hover:text-rose-600 transition-colors"
            >
              Slow-Mo Borrow Lab
            </button>
            <button
              onClick={() => onSelectChapter('practice')}
              className="hover:text-emerald-600 transition-colors"
            >
              Practice
            </button>
            <button
              onClick={() => onSelectChapter('reference')}
              className="hover:text-indigo-600 transition-colors"
            >
              Cheat Sheet
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
