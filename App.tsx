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
    <div className="min-h-screen text-gray-200 font-sans">
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

          {roastData && !isLoading && (
            <div className="mt-12 animate-fade-in">
              <RoastResult data={roastData} />
            </div>
          )}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Built with savage intentions by a world-class senior frontend React engineer.</p>
        <p>&copy; {new Date().getFullYear()} LinkedIn Roaster. All rights reserved (to roast).</p>
      </footer>
    </div>
  );
};

export default App;