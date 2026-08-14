import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { ChapterHome } from './components/ChapterHome';
import { Chapter1Basics } from './components/Chapter1Basics';
import { Chapter2BaseCounter } from './components/Chapter2BaseCounter';
import { ChapterDigitsChart } from './components/ChapterDigitsChart';
import { Chapter3Conversions } from './components/Chapter3Conversions';
import { Chapter4RadixPoints } from './components/Chapter4RadixPoints';
import { Chapter5Addition } from './components/Chapter5Addition';
import { Chapter6Subtraction } from './components/Chapter6Subtraction';
import { Chapter7Complements } from './components/Chapter7Complements';
import { Chapter8Multiplication } from './components/Chapter8Multiplication';
import { Chapter9Practice } from './components/Chapter9Practice';
import { Chapter10Reference } from './components/Chapter10Reference';
import { ChapterProgress } from './components/ChapterProgress';
import { Footer } from './components/Footer';
import { TopicProgress } from './types';

export default function App() {
  const [currentChapter, setCurrentChapter] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const [totalAttempts, setTotalAttempts] = useState<number>(0);
  const [totalSolved, setTotalSolved] = useState<number>(0);
  const [topicProgress, setTopicProgress] = useState<Record<string, TopicProgress>>({
    conversions: { attempted: 0, correct: 0, streak: 0 },
    addition: { attempted: 0, correct: 0, streak: 0 },
    subtraction: { attempted: 0, correct: 0, streak: 0 },
    complements: { attempted: 0, correct: 0, streak: 0 },
    fractions: { attempted: 0, correct: 0, streak: 0 },
  });

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentChapter(hash);
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleSelectChapter = (chapterId: string) => {
    setCurrentChapter(chapterId);
    window.location.hash = chapterId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateStats = (isCorrect: boolean, category: string) => {
    setTotalAttempts((prev) => prev + 1);
    if (isCorrect) setTotalSolved((prev) => prev + 1);

    setTopicProgress((prev) => {
      const current = prev[category] || { attempted: 0, correct: 0, streak: 0 };
      return {
        ...prev,
        [category]: {
          attempted: current.attempted + 1,
          correct: current.correct + (isCorrect ? 1 : 0),
          streak: isCorrect ? current.streak + 1 : 0,
        },
      };
    });
  };

  const renderActiveChapter = () => {
    switch (currentChapter) {
      case 'home':
        return <ChapterHome onSelectChapter={handleSelectChapter} />;
      case 'chapter1':
        return <Chapter1Basics />;
      case 'chapter2':
        return <Chapter2BaseCounter />;
      case 'digits':
        return <ChapterDigitsChart />;
      case 'chapter3':
      case 'bin_oct_hex':
      case 'decimal_interchange':
        return <Chapter3Conversions />;
      case 'radix_points':
        return <Chapter4RadixPoints />;
      case 'addition':
        return <Chapter5Addition />;
      case 'subtraction_borrow':
        return <Chapter6Subtraction />;
      case 'complements':
        return <Chapter7Complements />;
      case 'multiplication':
        return <Chapter8Multiplication />;
      case 'practice':
        return (
          <Chapter9Practice
            onUpdateStats={handleUpdateStats}
            topicProgress={topicProgress}
          />
        );
      case 'reference':
        return <Chapter10Reference />;
      case 'progress':
        return (
          <ChapterProgress
            totalAttempts={totalAttempts}
            totalSolved={totalSolved}
            topicProgress={topicProgress}
            onSelectChapter={handleSelectChapter}
          />
        );
      default:
        return <ChapterHome onSelectChapter={handleSelectChapter} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Header */}
      <Header
        currentChapter={currentChapter}
        totalSolved={totalSolved}
        totalAttempts={totalAttempts}
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onSelectChapter={handleSelectChapter}
      />

      <div className="flex-1 flex">
        {/* Navigation Sidebar */}
        <Sidebar
          currentChapter={currentChapter}
          onSelectChapter={handleSelectChapter}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
          <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-8 py-8">
            {renderActiveChapter()}
          </div>

          {/* Footer with Dedicated Attribution */}
          <Footer onSelectChapter={handleSelectChapter} />
        </main>
      </div>
    </div>
  );
}
