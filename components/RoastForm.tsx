import React, { useState } from 'react';
import { RoastLevel } from '../types';

interface RoastFormProps {
  onRoast: (headline: string, about: string, experience: string, roastLevel: RoastLevel) => void;
  isLoading: boolean;
  onLevelSelect: (emoji: string) => void;
}

const RoastForm: React.FC<RoastFormProps> = ({ onRoast, isLoading, onLevelSelect }) => {
  const [headline, setHeadline] = useState('');
  const [about, setAbout] = useState('');
  const [experience, setExperience] = useState('');
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(RoastLevel.Medium);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!headline.trim() && !about.trim()) {
        alert("Please provide at least a headline or an about section to roast!");
        return;
    }
    onRoast(headline, about, experience, roastLevel);
  };

  const handleLevelClick = (level: RoastLevel) => {
    setRoastLevel(level);
    const emoji = level.match(/(\p{Emoji})/u)?.[0];
    if (emoji) {
        onLevelSelect(emoji);
    }
  };

  const roastLevels = Object.values(RoastLevel);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800/50 p-6 md:p-8 rounded-2xl border border-gray-700 shadow-lg">
      <div>
        <label htmlFor="headline" className="block text-sm font-medium text-gray-300 mb-2">Headline</label>
        <input
          id="headline"
          type="text"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          placeholder="e.g., Passionate Innovator & Synergy Enthusiast"
          className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>
      <div>
        <label htmlFor="about" className="block text-sm font-medium text-gray-300 mb-2">About Section</label>
        <textarea
          id="about"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          rows={5}
          placeholder="Tell me about how you're a results-driven team player who thinks outside the box..."
          className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>
      </div>
      <div>
        <label htmlFor="experience" className="block text-sm font-medium text-gray-300 mb-2">Experience (Optional)</label>
        <textarea
          id="experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          rows={5}
          placeholder="Paste a recent job description or two. Let's see that corporate jargon."
          className="w-full bg-gray-900 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        ></textarea>
      </div>
      <div>
         <label className="block text-sm font-medium text-gray-300 mb-3">Roast Intensity</label>
         <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {roastLevels.map(level => (
                 <button 
                    key={level}
                    type="button"
                    onClick={() => handleLevelClick(level)}
                    className={`px-4 py-3 rounded-md text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-orange-500 ${roastLevel === level ? 'bg-orange-600 text-white shadow-lg' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                >
                    {level}
                 </button>
            ))}
         </div>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500"
        >
          {isLoading ? 'Roasting in progress...' : `Roast Me (${roastLevel.split(' ')[0]})`}
        </button>
      </div>
    </form>
  );
};

export default RoastForm;