import React, { useState, useCallback } from 'react';
import { RoastLevel, RoastData } from './types';
import { generateRoast } from './services/geminiService';
import Header from './components/Header';
import RoastForm from './components/RoastForm';
import Loader from './components/Loader';
import RoastResult from './components/RoastResult';
import EmojiThrower from './components/EmojiThrower';

const App: React.FC = () => {
  const [roastData, setRoastData] = useState<RoastData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [emojiThrow, setEmojiThrow] = useState<{ emoji: string; trigger: number } | null>(null);

  const handleRoast = useCallback(async (headline: string, about: string, experience: string, roastLevel: RoastLevel) => {
    setIsLoading(true);
    setError(null);
    setRoastData(null);

    // Add a small delay to let the user see the loader
    await new Promise(res => setTimeout(res, 1000));

    try {
      const result = await generateRoast(headline, about, experience, roastLevel);
      setRoastData(result);
    } catch (e) {
      console.error(e);
      setError('The AI had a meltdown trying to process that profile. Please check your inputs and try again. It might be too powerful (or too cringe).');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleLevelSelect = (emoji: string) => {
    setEmojiThrow({ emoji, trigger: Date.now() });
  };

  return (
    <div className="min-h-screen text-gray-200 font-sans relative">
      {emojiThrow && <EmojiThrower emoji={emojiThrow.emoji} trigger={emojiThrow.trigger} />}
      <main className="container mx-auto px-4 py-8 md:py-12">
        <Header />
        <div className="max-w-4xl mx-auto mt-8">
          <RoastForm onRoast={handleRoast} isLoading={isLoading} onLevelSelect={handleLevelSelect} />

          {isLoading && <Loader />}

          {error && (
            <div className="mt-8 p-4 bg-red-900/50 border border-red-600 rounded-lg text-center">
              <p className="font-bold text-red-400">🔥 Ouch, a critical hit! 🔥</p>
              <p className="mt-2 text-red-300">{error}</p>
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Build by Meet Bhorania for GDG AI Innovation Hub</p>
        <p>&copy; {new Date().getFullYear()} LinkedIn Roaster. All rights reserved (to roast).</p>
      </footer>

      {/* Roast Result Modal */}
      {roastData && !isLoading && (
        <div className="fixed inset-0 z-[100] overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
           <div className="flex min-h-full items-center justify-center p-4 md:p-8">
            <button 
                onClick={() => setRoastData(null)}
                className="fixed top-6 right-6 z-[110] bg-gray-800/80 hover:bg-red-600 text-gray-300 hover:text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm border border-gray-600 shadow-lg"
                title="Close Roast"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            
            <div className="relative w-full max-w-[90rem] flex flex-col items-center justify-center">
                <RoastResult data={roastData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;