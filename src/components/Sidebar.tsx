import React from 'react';
import {
  Home,
  Boxes,
  Gauge,
  Layers,
  ArrowLeftRight,
  GitFork,
  Binary,
  Divide,
  Dot,
  PlusCircle,
  Link2,
  RefreshCw,
  XCircle,
  Award,
  BookMarked,
  BarChart3,
  X,
} from 'lucide-react';

export interface NavItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge?: string;
  badgeColor?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

interface SidebarProps {
  currentChapter: string;
  onSelectChapter: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentChapter,
  onSelectChapter,
  isOpen,
  onClose,
}) => {
  const sections: NavSection[] = [
    {
      title: 'FOUNDATIONS',
      items: [
        { id: 'home', title: 'Interactive Overview', icon: <Home className="w-5 h-5" /> },
        { id: 'chapter1', title: '1. What is a Base?', icon: <Boxes className="w-5 h-5" />, badge: 'Core' },
        { id: 'chapter2', title: '2. Base Odometer & Overflow', icon: <Gauge className="w-5 h-5" /> },
        { id: 'digits', title: '3. Digits & Symbols Chart', icon: <Layers className="w-5 h-5" /> },
      ],
    },
    {
      title: 'CONVERSION LABORATORY',
      items: [
        { id: 'chapter3', title: '4. Universal Matrix Converter', icon: <ArrowLeftRight className="w-5 h-5" />, badge: 'All Pairs' },
        { id: 'bin_oct_hex', title: '5. Fast Bit-Grouping (3 & 4 bits)', icon: <GitFork className="w-5 h-5" /> },
        { id: 'decimal_interchange', title: '6. Decimal Division & Power Ladders', icon: <Divide className="w-5 h-5" /> },
        { id: 'radix_points', title: '7. Radix Points & Fractions', icon: <Dot className="w-5 h-5" /> },
      ],
    },
    {
      title: 'ARITHMETIC & VISUAL ANIMATIONS',
      items: [
        { id: 'addition', title: '8. Column Addition & Carry', icon: <PlusCircle className="w-5 h-5" /> },
        { id: 'subtraction_borrow', title: '9. Slow-Mo Chain Borrow & Strike', icon: <Link2 className="w-5 h-5" />, badge: 'Slow-Mo', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
        { id: 'complements', title: '10. r’s & (r−1)’s Complements', icon: <RefreshCw className="w-5 h-5" /> },
        { id: 'multiplication', title: '11. Multiplication & Shifts', icon: <XCircle className="w-5 h-5" /> },
      ],
    },
    {
      title: 'MASTERY & REFERENCE',
      items: [
        { id: 'practice', title: '12. Adaptive Practice & Quiz', icon: <Award className="w-5 h-5" />, badge: 'Live' },
        { id: 'reference', title: '13. Master Reference Cheat Sheet', icon: <BookMarked className="w-5 h-5" /> },
        { id: 'progress', title: '14. Learning Diagnostic', icon: <BarChart3 className="w-5 h-5" /> },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/70 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[85vw] bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
              <Binary className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-100 tracking-tight">NumVisual Master</h2>
              <p className="text-xs text-slate-400">Chapters &amp; Lab Suite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 active:scale-95"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-thin">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="px-3 text-xs font-black tracking-wider text-slate-400 uppercase mb-2">
                {section.title}
              </div>
              <div className="space-y-1">
                {section.items.map((item) => {
                  const isActive = currentChapter === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectChapter(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-[13px] font-semibold transition-all group min-h-[44px] ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`shrink-0 transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="truncate text-left">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                            item.badgeColor ||
                            (isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/30')
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-semibold">Bases Supported</span>
            <span className="font-mono text-xs font-black text-amber-400">2 • 8 • 10 • 16</span>
          </div>
        </div>
      </aside>
    </>
  );
};
