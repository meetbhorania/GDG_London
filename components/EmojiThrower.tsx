import React, { useState, useEffect } from 'react';

const EmojiParticle: React.FC<{ emoji: string; style: React.CSSProperties }> = ({ emoji, style }) => (
  <div style={style} className="emoji-particle">
    {emoji}
  </div>
);


const EmojiThrower: React.FC<{ emoji: string; trigger: number }> = ({ emoji, trigger }) => {
  const [particles, setParticles] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  useEffect(() => {
    if (!trigger) return;

    const newParticles = Array.from({ length: 35 }).map((_, i) => ({
      id: Date.now() + i,
      style: {
        '--start-x': `${Math.random() * 80 - 40}px`,
        '--start-y': `${Math.random() * 80 - 40}px`,
        '--end-y': `${-250 - Math.random() * 150}px`, // Fly higher
        '--end-x-jitter': `${Math.random() * 300 - 150}px`, // Wider spread
        '--scale': `${0.7 + Math.random()}`,
        '--rotation': `${Math.random() * 720 - 360}deg`,
        '--delay': `${Math.random() * 0.4}s`, // More staggered
        fontSize: `${1.5 + Math.random()}rem`,
      },
    }));

    setParticles(newParticles);

    const timeoutId = setTimeout(() => {
      setParticles([]);
    }, 2000); // Animation is 1.5s + max delay 0.4s

    return () => clearTimeout(timeoutId);
  }, [trigger, emoji]);

  return (
    <div className="fixed inset-0 flex justify-center items-center pointer-events-none z-50">
      <div className="relative">
        {particles.map((p) => (
          <EmojiParticle key={p.id} emoji={emoji} style={p.style} />
        ))}
      </div>
    </div>
  );
};

export default EmojiThrower;