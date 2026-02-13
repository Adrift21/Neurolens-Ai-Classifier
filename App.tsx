import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ClassificationResultView from './components/ClassificationResultView';
import { classifyImage } from './services/geminiService';
import { ClassificationResult } from './types';

const App: React.FC = () => {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = async (dataUrl: string, mimeType: string, file: File) => {
    // dataUrl is the full string "data:image/png;base64,..."
    // We set this directly for display (<img> src expects full Data URL)
    setCurrentImage(dataUrl);
    setIsProcessing(true);
    setResult(null);
    setError(null);

    try {
      // For the API, we need ONLY the raw base64 string, so we split at the comma.
      // We add a safety check just in case the string is already raw.
      const base64Data = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
      
      const classification = await classifyImage(base64Data, mimeType);
      setResult(classification);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to analyze image. Please check your API key and try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetApp = () => {
    setCurrentImage(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-gray-950 to-black text-white p-4 md:p-8">
      
      {/* Header */}
      <header className="max-w-6xl mx-auto mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
             </svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
            NeuroLens
          </h1>
        </div>
        {result && (
          <button 
            onClick={resetApp}
            className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
            </svg>
            New Analysis
          </button>
        )}
      </header>

      <main className="max-w-6xl mx-auto">
        
        {/* Intro / Upload State */}
        {!result && !isProcessing && !currentImage && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 animate-in fade-in duration-500">
            <div className="text-center max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                  AI-Powered
                </span> Image Analysis
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed">
                Upload any image to classify its contents, detect objects, and analyze technical composition using the power of Gemini 2.5 Flash.
              </p>
            </div>
            
            <div className="w-full max-w-xl">
              <ImageUploader onImageSelected={handleImageSelected} isProcessing={isProcessing} />
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span> Object Detection
              </span>
              <span className="flex items-center gap-1.5 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500"></span> Scene Classification
              </span>
              <span className="flex items-center gap-1.5 bg-gray-900/50 px-3 py-1.5 rounded-full border border-gray-800">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Tech Analysis
              </span>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isProcessing && currentImage && (
          <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8 animate-in fade-in duration-500">
             <div className="relative w-64 h-64 rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                <img src={currentImage} alt="Processing" className="w-full h-full object-cover opacity-50 blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                   <div className="relative flex items-center justify-center">
                     <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
                     <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 bg-cyan-500/10 rounded-full animate-pulse"></div>
                     </div>
                   </div>
                </div>
                {/* Scanning line animation */}
                <div className="absolute inset-x-0 h-1 bg-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-[scan_2s_linear_infinite] top-0"></div>
             </div>
             
             <div className="text-center space-y-2">
               <h3 className="text-xl font-medium text-white">Analyzing Visual Data...</h3>
               <p className="text-gray-500">Identifying patterns, objects, and composition</p>
             </div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-xl mx-auto mt-10 p-6 bg-red-950/30 border border-red-900/50 rounded-2xl text-center animate-in slide-in-from-bottom-4">
             <div className="w-12 h-12 bg-red-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-red-400">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
               </svg>
             </div>
             <h3 className="text-lg font-semibold text-red-200 mb-2">Analysis Failed</h3>
             <p className="text-red-300/80 mb-6">{error}</p>
             <button 
                onClick={resetApp}
                className="px-6 py-2 bg-red-900/50 hover:bg-red-800/50 border border-red-800 text-red-200 rounded-lg transition-colors"
             >
                Try Again
             </button>
          </div>
        )}

        {/* Results State */}
        {result && currentImage && (
          <ClassificationResultView result={result} imageSrc={currentImage} />
        )}

      </main>
      
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default App;