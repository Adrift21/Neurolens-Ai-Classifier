import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (dataUrl: string, mimeType: string, file: File) => void;
  isProcessing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, isProcessing }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    // Max size check (e.g., 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('File size too large. Please upload an image under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      // result is the full Data URL: "data:image/jpeg;base64,/9j/..."
      
      // Extract mime type cleanly using regex or string manipulation
      const mimeType = result.match(/data:([^;]+);/)?.[1] || file.type;
      
      // Pass the FULL result (Data URL) to the parent. 
      // The parent (App.tsx) expects a Data URL to display the image correctly
      // and will handle extracting the raw base64 for the API.
      onImageSelected(result, mimeType, file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  }, [onImageSelected]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`
        relative w-full h-64 border-2 border-dashed rounded-2xl transition-all duration-300 ease-in-out flex flex-col items-center justify-center cursor-pointer overflow-hidden group
        ${isDragging 
          ? 'border-cyan-400 bg-cyan-900/20' 
          : 'border-gray-700 hover:border-cyan-500/50 hover:bg-gray-800/50'
        }
        ${isProcessing ? 'pointer-events-none opacity-50' : ''}
      `}
    >
      <input
        type="file"
        accept="image/*"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        onChange={handleFileInput}
        disabled={isProcessing}
      />
      
      <div className="z-0 flex flex-col items-center space-y-4 text-center p-4">
        <div className={`p-4 rounded-full bg-gray-800/80 transition-transform duration-300 group-hover:scale-110 ${isDragging ? 'scale-110 bg-cyan-900/40' : ''}`}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-cyan-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-200">
            {isDragging ? 'Drop Image Here' : 'Upload Image to Classify'}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            Drag & drop or click to browse (JPG, PNG, WebP)
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageUploader;