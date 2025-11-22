import React, { useRef, useState, useCallback } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { RoastData, Badge, RoastPoint } from '../types';

// Page component for the book
const Page = React.forwardRef<HTMLDivElement, { children: React.ReactNode, number?: number }>(({ children, number }, ref) => (
    <div className="bg-gray-900 text-gray-300 border border-gray-700 shadow-lg p-6 overflow-y-auto" ref={ref}>
        <div className="relative h-full">
            {children}
            {number && <div className="absolute bottom-2 right-4 text-sm text-gray-500">{number}</div>}
        </div>
    </div>
));

const CoverPage = React.forwardRef<HTMLDivElement, { children: React.ReactNode }>(({ children }, ref) => (
     <div className="bg-gray-800 text-gray-200 border border-red-700 shadow-2xl p-6 flex items-center justify-center" ref={ref}>
        {children}
    </div>
));

const ScoreBar: React.FC<{ label: string; score: number }> = ({ label, score }) => {
    const bgColor = score < 30 ? 'bg-red-600' : score < 60 ? 'bg-yellow-500' : 'bg-green-500';
    return (
        <div>
            <div className="flex justify-between items-baseline mb-1">
                <span className="text-sm font-medium text-gray-300">{label}</span>
                <span className={`text-sm font-bold ${score < 30 ? 'text-red-400' : score < 60 ? 'text-yellow-400' : 'text-green-400'}`}>{score}/100</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div className={`${bgColor} h-2.5 rounded-full`} style={{ width: `${score}%` }}></div>
            </div>
        </div>
    );
};

const BadgeCard: React.FC<{ badge: Badge }> = ({ badge }) => (
    <div className="bg-gray-800 p-3 rounded-lg text-center border border-gray-700 h-full flex flex-col justify-center">
        <p className="text-3xl">{badge.emoji}</p>
        <p className="mt-2 text-sm font-bold text-orange-400">{badge.title}</p>
        <p className="mt-1 text-xs text-gray-400">{badge.description}</p>
    </div>
);

const RoastPointCard: React.FC<{ point: RoastPoint }> = ({ point }) => {
    const severityIcons = Array(5).fill(0).map((_, i) => (
        <span key={i} className={i < point.severity ? 'text-red-500' : 'text-gray-600'}>🔥</span>
    ));

    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h3 className="text-lg font-bold text-red-400">{point.category}</h3>
            <div className="flex items-center my-1">
                <span className="text-xs font-semibold mr-2">Severity:</span>
                <div className="flex space-x-0.5">{severityIcons}</div>
            </div>
            <blockquote className="border-l-4 border-gray-600 pl-3 my-2">
                <p className="text-gray-400 italic text-sm">"{point.quote}"</p>
            </blockquote>
            <p className="text-gray-200 leading-relaxed text-sm">{point.reality}</p>
        </div>
    );
};


const RoastResult: React.FC<{ data: RoastData }> = ({ data }) => {
  const bookRef = useRef<any>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 6;

  const handleFlip = useCallback((e: any) => {
    setCurrentPage(e.data);
  }, []);

  const goNextPage = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const goPrevPage = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  return (
    <div className="flex flex-col items-center">
        <div className="w-full max-w-sm md:max-w-4xl" style={{aspectRatio: '2 / 1.3'}}>
            <HTMLFlipBook
                width={500}
                height={650}
                size="stretch"
                minWidth={315}
                maxWidth={1000}
                minHeight={420}
                maxHeight={1300}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={handleFlip}
                className="mx-auto"
                ref={bookRef}
            >
                {/* Cover Page */}
                <CoverPage>
                    <div className="text-center">
                         <h2 className="text-3xl font-bold text-white mb-3">Your Roast Report</h2>
                        <div className="bg-gradient-to-br from-red-900/50 to-orange-900/50 p-4 rounded-xl border border-red-700">
                            <h3 className="text-xl font-bold text-white mb-2">First Impression</h3>
                            <p className="text-md text-red-200 italic">"{data.first_impression}"</p>
                        </div>
                    </div>
                </CoverPage>

                {/* Page 1 */}
                <Page number={1}>
                     <h2 className="text-xl font-bold text-center mb-4">Roast Scorecard</h2>
                     <div className="space-y-6">
                        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                             <p className="text-center text-gray-400 mb-4 italic text-sm">"{data.score_comment}"</p>
                            <div className="space-y-3">
                                <ScoreBar label="Overall" score={data.scores.overall} />
                                <ScoreBar label="Headline" score={data.scores.headline} />
                                <ScoreBar label="About Section" score={data.scores.about} />
                                <ScoreBar label="Originality" score={data.scores.originality} />
                            </div>
                        </div>
                        <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                            <h3 className="text-lg font-bold text-white mb-3 text-center">Achievements Unlocked</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {data.badges.map(badge => <BadgeCard key={badge.title} badge={badge} />)}
                            </div>
                        </div>
                         <div className="bg-gray-800 p-4 rounded-xl border border-gray-700">
                             <h3 className="text-lg font-bold text-white mb-2 text-center">LinkedIn Twins</h3>
                             <p className="text-4xl font-extrabold text-center text-orange-500">{data.linkedin_twins.estimated_count.toLocaleString()}</p>
                             <p className="text-center text-gray-400 mt-2 text-sm">{data.linkedin_twins.roast_comment}</p>
                        </div>
                    </div>
                </Page>

                {/* Page 2 */}
                <Page number={2}>
                     <h2 className="text-2xl font-bold text-center text-white mb-4">The Roast</h2>
                     <div className="space-y-4">
                        {data.roast_points.map((point, index) => <RoastPointCard key={index} point={point} />)}
                     </div>
                </Page>
                
                 {/* Page 3 */}
                <Page number={3}>
                     <h2 className="text-2xl font-bold text-center text-green-400 mb-4">The Glow-Up Plan</h2>
                     <div className="space-y-6">
                        <div>
                            <h3 className="text-lg font-semibold text-white mb-2">New Headline:</h3>
                            <p className="bg-gray-800 p-3 rounded-md text-green-300 italic text-sm">"{data.improvements.headline.improved_version}"</p>
                            <p className="text-xs text-gray-400 mt-2">{data.improvements.headline.why_it_works}</p>
                        </div>
                         <div>
                            <h3 className="text-lg font-semibold text-white mb-2">New About Section Vibe:</h3>
                            <p className="bg-gray-800 p-3 rounded-md text-green-300 italic text-sm">"{data.improvements.about.improved_version}"</p>
                             <p className="text-xs text-gray-400 mt-2">{data.improvements.about.why_it_works}</p>
                        </div>
                    </div>
                </Page>

                 {/* Page 4 */}
                <Page number={4}>
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-white mb-3 text-center">Key Changes:</h3>
                        <ul className="space-y-2 max-w-md mx-auto text-sm">
                            {data.improvements.key_changes.map((change, index) => (
                                 <li key={index} className="flex items-start">
                                    <span className="text-green-500 mr-2 mt-1">✅</span>
                                    <span className="text-gray-300">{change}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-8 text-center bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <h2 className="text-xl font-bold text-orange-400 mb-2">Final Words</h2>
                        <p className="text-md text-gray-300 max-w-3xl mx-auto">{data.final_words}</p>
                    </div>
                </Page>

                 {/* Back Cover */}
                <CoverPage>
                     <div className="text-center">
                         <p className="text-3xl">🔥</p>
                         <h2 className="text-2xl font-bold text-white mt-2">The End</h2>
                         <p className="text-gray-400 mt-2">Now go fix your profile.</p>
                     </div>
                </CoverPage>
            </HTMLFlipBook>
        </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center space-x-4">
        <button onClick={goPrevPage} disabled={currentPage === 0} className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600 transition">Prev</button>
        <span className="text-gray-400 text-sm">Page {currentPage} of {totalPages - 2}</span>
        <button onClick={goNextPage} disabled={currentPage >= totalPages - 2} className="px-4 py-2 bg-orange-600 text-white rounded-md disabled:opacity-50 hover:bg-orange-500 transition">Next</button>
      </div>
    </div>
  );
};

export default RoastResult;
