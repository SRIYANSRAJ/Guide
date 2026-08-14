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
  UploadCloud,
  MinusCircle,
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
        { id: 'home', title: 'Interactive Overview', icon: <Home className="w-4 h-4" /> },
        { id: 'chapter1', title: '1. What is a Base?', icon: <Boxes className="w-4 h-4" />, badge: 'Core' },
        { id: 'chapter2', title: '2. Base Odometer & Overflow', icon: <Gauge className="w-4 h-4" /> },
        { id: 'digits', title: '3. Digits & Symbols Chart', icon: <Layers className="w-4 h-4" /> },
      ],
    },
    {
      title: 'CONVERSION LABORATORY',
      items: [
        { id: 'chapter3', title: '4. Universal Matrix Converter', icon: <ArrowLeftRight className="w-4 h-4" />, badge: 'All Pairs' },
        { id: 'bin_oct_hex', title: '5. Fast Bit-Grouping (3 & 4 bits)', icon: <GitFork className="w-4 h-4" /> },
        { id: 'decimal_interchange', title: '6. Decimal Division & Power Ladders', icon: <Divide className="w-4 h-4" /> },
        { id: 'radix_points', title: '7. Radix Points & Fractions', icon: <Dot className="w-4 h-4" /> },
      ],
    },
    {
      title: 'ARITHMETIC & VISUAL ANIMATIONS',
      items: [
        { id: 'addition', title: '8. Column Addition & Carry', icon: <PlusCircle className="w-4 h-4" /> },
        { id: 'subtraction_borrow', title: '9. Slow-Mo Chain Borrow & Strike', icon: <Link2 className="w-4 h-4" />, badge: 'Slow-Mo', badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
        { id: 'complements', title: '10. r’s & (r−1)’s Complements', icon: <RefreshCw className="w-4 h-4" /> },
        { id: 'multiplication', title: '11. Multiplication & Shifts', icon: <XCircle className="w-4 h-4" /> },
      ],
    },
    {
      title: 'MASTERY & REFERENCE',
      items: [
        { id: 'practice', title: '12. Adaptive Practice & Quiz', icon: <Award className="w-4 h-4" />, badge: 'Live' },
        { id: 'reference', title: '13. Master Reference Cheat Sheet', icon: <BookMarked className="w-4 h-4" /> },
        { id: 'progress', title: '14. Learning Diagnostic', icon: <BarChart3 className="w-4 h-4" /> },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-sm">
              <Binary className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-extrabold text-sm text-slate-100 tracking-tight">NumVisual Master</h2>
              <p className="text-[11px] text-slate-400">Chapters &amp; Lab Suite</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
          {sections.map((section) => (
            <div key={section.title}>
              <div className="px-3 text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1.5">
                {section.title}
              </div>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const isActive = currentChapter === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectChapter(item.id);
                        onClose();
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all group ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 font-bold'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span
                          className={`transition-colors ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-400'
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span className="truncate">{item.title}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                            item.badgeColor ||
                            (isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-blue-500/10 text-blue-300 border border-blue-500/20')
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
        <div className="p-3.5 border-t border-slate-800 bg-slate-950/50 text-[11px] text-slate-400">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-medium">Bases Supported</span>
            <span className="font-mono text-xs font-bold text-amber-400">2 • 8 • 10 • 16</span>
          </div>
        </div>
      </aside>
    </>
  );
};
