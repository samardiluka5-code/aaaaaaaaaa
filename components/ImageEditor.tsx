
import React, { useState, useCallback, useRef } from 'react';
import { Upload, Wand2, RefreshCw, Trash2, Download, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';
import { ImageState } from '../types';

export const ImageEditor: React.FC = () => {
  const [state, setState] = useState<ImageState>({
    original: null,
    edited: null,
    prompt: '',
    isProcessing: false,
    error: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        setState(prev => ({
          ...prev,
          original: readerEvent.target?.result as string,
          edited: null,
          error: null
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!state.original || !state.prompt.trim()) return;

    setState(prev => ({ ...prev, isProcessing: true, error: null }));
    try {
      const editedBase64 = await editImageWithGemini(state.original, state.prompt);
      setState(prev => ({
        ...prev,
        edited: editedBase64,
        isProcessing: false
      }));
    } catch (err: any) {
      setState(prev => ({
        ...prev,
        error: err.message || "Failed to edit image.",
        isProcessing: false
      }));
    }
  };

  const reset = () => {
    setState({
      original: null,
      edited: null,
      prompt: '',
      isProcessing: false,
      error: null,
    });
  };

  const downloadImage = () => {
    if (!state.edited) return;
    const link = document.createElement('a');
    link.href = state.edited;
    link.download = 'snapedit-ai-result.png';
    link.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Editor Controls */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-indigo-600" />
              Edit Instructions
            </h2>
            
            <div className="space-y-6">
              {!state.original ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-indigo-400 hover:bg-indigo-50/30 cursor-pointer transition-all"
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-900 font-medium">Upload product photo</p>
                  <p className="text-gray-500 text-sm mt-1">PNG, JPG up to 10MB</p>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleFileUpload} 
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative group">
                    <img 
                      src={state.original} 
                      alt="Original" 
                      className="w-full h-48 object-cover rounded-xl border border-gray-200" 
                    />
                    <button 
                      onClick={reset}
                      className="absolute top-2 right-2 p-2 bg-white/90 rounded-full text-red-500 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">What should we do?</label>
                    <textarea
                      value={state.prompt}
                      onChange={(e) => setState(prev => ({ ...prev, prompt: e.target.value }))}
                      placeholder="e.g., 'Remove the background and add a soft shadow', 'Add a retro filter', 'Clean up reflections'"
                      className="w-full h-32 p-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none resize-none transition-all"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {['Remove background', 'Clean up shadows', 'Retro style', 'Vivid colors'].map(chip => (
                      <button
                        key={chip}
                        onClick={() => setState(prev => ({ ...prev, prompt: chip }))}
                        className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium hover:bg-indigo-100 hover:text-indigo-600 transition-colors"
                      >
                        {chip}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={handleEdit}
                    disabled={state.isProcessing || !state.prompt.trim()}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all disabled:opacity-50 shadow-lg shadow-indigo-100"
                  >
                    {state.isProcessing ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Wand2 className="w-5 h-5" />
                    )}
                    {state.isProcessing ? 'Processing...' : 'Enhance Photo'}
                  </button>
                  
                  {state.error && (
                    <p className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                      {state.error}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right: Preview Canvas */}
        <div className="lg:col-span-7">
          <div className="bg-gray-100 rounded-[2.5rem] p-4 lg:p-8 min-h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">Result Preview</h3>
              {state.edited && (
                <button 
                  onClick={downloadImage}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-gray-900 rounded-full text-sm font-bold shadow-sm hover:shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download
                </button>
              )}
            </div>

            <div className="flex-grow flex items-center justify-center relative overflow-hidden bg-white/50 backdrop-blur rounded-3xl border border-gray-200/50">
              {!state.original ? (
                <div className="text-center p-8 text-gray-400">
                  <ImageIcon className="w-16 h-16 mx-auto mb-4 opacity-20" />
                  <p>Upload a photo to start editing</p>
                </div>
              ) : state.isProcessing ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-indigo-600 font-medium animate-pulse">Gemini is polishing your photo...</p>
                </div>
              ) : (
                <div className="w-full h-full p-4 flex flex-col gap-4">
                  <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative group">
                      <span className="absolute top-2 left-2 px-2 py-1 bg-black/50 text-white text-[10px] font-bold rounded uppercase tracking-wider backdrop-blur-sm">Before</span>
                      <img src={state.original} alt="Before" className="w-full h-full object-contain rounded-xl" />
                    </div>
                    <div className="relative group">
                      <span className="absolute top-2 left-2 px-2 py-1 bg-indigo-600/80 text-white text-[10px] font-bold rounded uppercase tracking-wider backdrop-blur-sm">After</span>
                      {state.edited ? (
                        <img src={state.edited} alt="After" className="w-full h-full object-contain rounded-xl" />
                      ) : (
                        <div className="w-full h-full bg-gray-200/50 rounded-xl flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-300">
                          <p className="text-xs">Click Enhance to see magic</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className="h-24 bg-white/30 rounded-2xl border border-gray-200/30 flex items-center justify-center">
                    <ImageIcon className="w-6 h-6 text-gray-300" />
                 </div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Sparkles = ({ className }: { className: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);
