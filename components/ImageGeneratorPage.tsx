
import React, { useState, useCallback } from 'react';
import { generateImage } from '../services/geminiService';
import { AspectRatio } from '../types';
import ControlPanel from './ControlPanel';
import ImageCard from './ImageCard';

interface ImageGeneratorPageProps {
  onLogout: () => void;
}

const ImageGeneratorPage: React.FC<ImageGeneratorPageProps> = ({ onLogout }) => {
  const [prompt, setPrompt] = useState<string>('A photorealistic image of a majestic lion wearing a crown, cinematic lighting, 8k');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>(AspectRatio.SQUARE);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateImage = useCallback(async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImageUrl(null);

    try {
      const imageUrl = await generateImage(prompt, aspectRatio);
      setGeneratedImageUrl(imageUrl);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      console.error('Image generation failed:', errorMessage);
      setError(`Failed to generate image. Please try again. Error: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <header className="w-full max-w-6xl flex items-center justify-between mb-8">
        <div className="w-12 sm:w-28"></div> {/* Spacer to balance the logout button */}
        <div className="text-center flex-grow">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            AI Image Generator
          </h1>
          <p className="text-gray-400 mt-2">Powered by Google's Imagen 3 Model</p>
        </div>
        <div className="w-12 sm:w-28 flex justify-end">
            <button
              onClick={onLogout}
              className="bg-gray-700 text-gray-300 hover:bg-red-600 hover:text-white font-semibold p-2 sm:px-4 rounded-lg transition-colors duration-200 flex items-center gap-2"
              aria-label="Logout"
            >
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
             </svg>
             <span className="hidden sm:inline">Logout</span>
            </button>
        </div>
      </header>

      <main className="w-full max-w-6xl flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <ControlPanel
            prompt={prompt}
            setPrompt={setPrompt}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
            isLoading={isLoading}
            onGenerate={handleGenerateImage}
          />
        </div>
        <div className="lg:w-2/3">
          <ImageCard
            imageUrl={generatedImageUrl}
            isLoading={isLoading}
            error={error}
            prompt={prompt}
          />
        </div>
      </main>
    </div>
  );
};

export default ImageGeneratorPage;
