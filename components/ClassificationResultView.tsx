import React from 'react';
import { ClassificationResult } from '../types';

interface Props {
  result: ClassificationResult;
  imageSrc: string;
}

const ClassificationResultView: React.FC<Props> = ({ result, imageSrc }) => {
  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Left Column: Image & Main Stats */}
      <div className="space-y-6">
        <div className="relative rounded-2xl overflow-hidden border border-gray-700 shadow-2xl group">
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60 z-10 pointer-events-none" />
          <img 
            src={imageSrc} 
            alt="Analyzed" 
            className="w-full h-auto object-cover max-h-[500px]" 
          />
          <div className="absolute bottom-4 left-4 z-20">
             <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 backdrop-blur-md">
                Analyzed
             </span>
          </div>
        </div>

        {/* Main Category Card */}
        <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-cyan-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-32 h-32 text-cyan-500">
               <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
            </svg>
          </div>
          <h2 className="text-gray-400 text-sm uppercase tracking-wider font-semibold mb-1">Classification</h2>
          <div className="flex items-baseline gap-4">
            <h1 className="text-3xl font-bold text-white">{result.mainCategory}</h1>
            <div className="flex items-center gap-2">
               <span className="text-2xl font-mono text-cyan-400">{result.confidence}%</span>
               <span className="text-xs text-gray-500">Confidence</span>
            </div>
          </div>
          <p className="mt-4 text-gray-300 leading-relaxed">
            {result.description}
          </p>
        </div>
      </div>

      {/* Right Column: Details */}
      <div className="space-y-6">
        
        {/* Technical Details */}
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-violet-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
            </svg>
            Technical Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
               <span className="block text-xs text-gray-500 uppercase">Lighting</span>
               <span className="text-sm text-gray-200">{result.technicalDetails.lighting}</span>
            </div>
            <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700">
               <span className="block text-xs text-gray-500 uppercase">Composition</span>
               <span className="text-sm text-gray-200">{result.technicalDetails.composition}</span>
            </div>
          </div>
          <div className="mt-4">
             <span className="block text-xs text-gray-500 uppercase mb-2">Dominant Palette</span>
             <div className="flex gap-2">
                {result.technicalDetails.colorPalette.map((color, idx) => (
                  <div key={idx} className="group relative">
                     <div 
                        className="w-8 h-8 rounded-full border border-gray-600 shadow-sm cursor-help"
                        style={{ backgroundColor: color }}
                     />
                     <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-xs rounded text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {color}
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Objects Detected */}
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-emerald-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 13.5 9.375v-4.5Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75ZM6.75 16.5h.75v.75h-.75v-.75ZM16.5 6.75h.75v.75h-.75v-.75M13.5 13.5h.75v.75h-.75v-.75ZM13.5 19.5h.75v.75h-.75v-.75ZM19.5 13.5h.75v.75h-.75v-.75ZM19.5 19.5h.75v.75h-.75v-.75ZM16.5 16.5h.75v.75h-.75v-.75Z" />
            </svg>
            Detected Objects
          </h3>
          <ul className="space-y-3">
             {result.detectedObjects.map((obj, idx) => (
                <li key={idx} className="flex justify-between items-center text-sm border-b border-gray-800 pb-2 last:border-0 last:pb-0">
                   <span className="text-gray-200">{obj.name}</span>
                   <span className="text-gray-500 italic text-xs">{obj.approximateLocation}</span>
                </li>
             ))}
          </ul>
        </div>

        {/* Tags */}
        <div className="glass-panel p-6 rounded-2xl">
           <h3 className="text-lg font-medium text-white mb-4">Semantic Tags</h3>
           <div className="flex flex-wrap gap-2">
              {result.tags.map((tag, idx) => (
                 <span key={idx} className="px-3 py-1 rounded-full text-sm bg-gray-800 text-gray-300 border border-gray-700 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
                    #{tag}
                 </span>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default ClassificationResultView;
