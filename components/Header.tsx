
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">LinkedIn Profile Roaster</span>
        <span className="ml-2">🔥</span>
      </h1>
      <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-400">
        Your profile is probably terrible. Let's fix that. Paste your details, pick your poison, and prepare for a roast so savage, you'll thank me later.
      </p>
    </header>
  );
};

export default Header;
