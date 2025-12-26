
import React, { useState, useRef } from 'react';
import { Search, Upload, Music, X, Youtube, Link as LinkIcon } from 'lucide-react';

interface InputSectionProps {
  onAnalyzeText: (text: string) => void;
  onAnalyzeAudio: (file: File) => void;
  onAnalyzeYoutube: (url: string) => void;
  isLoading: boolean;
}

export const InputSection: React.FC<InputSectionProps> = ({ 
  onAnalyzeText, 
  onAnalyzeAudio, 
  onAnalyzeYoutube,
  isLoading 
}) => {
  const [query, setQuery] = useState('');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'audio' | 'youtube'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === 'text' && query.trim()) {
      onAnalyzeText(query);
    } else if (activeTab === 'youtube' && youtubeUrl.trim()) {
      onAnalyzeYoutube(youtubeUrl);
    } else if (activeTab === 'audio' && selectedFile) {
      onAnalyzeAudio(selectedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type.startsWith('audio/') || file.type.startsWith('video/')) {
        setSelectedFile(file);
      } else {
        alert("Por favor, selecione um arquivo de áudio válido.");
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-12">
      <div className="bg-card-bg/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 shadow-2xl shadow-purple-900/10">
        {/* Tabs */}
        <div className="flex flex-wrap gap-1 p-1 mb-4 bg-slate-900/50 rounded-xl w-fit mx-auto">
          <button
            onClick={() => setActiveTab('text')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'text' 
                ? 'bg-gradient-to-r from-neon-purple to-indigo-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Search size={14} /> Busca
          </button>
          <button
            onClick={() => setActiveTab('youtube')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'youtube' 
                ? 'bg-red-600 text-white shadow-lg shadow-red-900/20' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Youtube size={14} /> YouTube
          </button>
          <button
            onClick={() => setActiveTab('audio')}
            className={`px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
              activeTab === 'audio' 
                ? 'bg-gradient-to-r from-neon-cyan to-teal-600 text-black shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Upload size={14} /> Upload
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 pb-4">
          
          {/* Text Search Input */}
          {activeTab === 'text' && (
            <div className="relative group animate-fade-in-up">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ex: 'Bohemian Rhapsody' ou 'Evolução do Jazz anos 50'..."
                className="w-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple transition-all"
                disabled={isLoading}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-neon-purple transition-colors" size={20} />
              
              <button
                type="submit"
                disabled={!query.trim() || isLoading}
                className="absolute right-2 top-2 bottom-2 bg-slate-800 hover:bg-neon-purple text-white px-6 rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>Analisar <span className="hidden sm:inline">→</span></>
                )}
              </button>
            </div>
          )}

          {/* YouTube URL Input */}
          {activeTab === 'youtube' && (
            <div className="relative group animate-fade-in-up">
              <input
                type="text"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="Cole o link do vídeo aqui (Ex: https://youtube.com/watch?v=...)"
                className="w-full bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 rounded-xl py-4 pl-12 pr-32 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                disabled={isLoading}
              />
              <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-500 group-focus-within:text-red-600 transition-colors" size={20} />
              
              <button
                type="submit"
                disabled={!youtubeUrl.trim() || isLoading}
                className="absolute right-2 top-2 bottom-2 bg-slate-800 hover:bg-red-600 text-white px-6 rounded-lg font-medium text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                ) : (
                  <>Processar <span className="hidden sm:inline">→</span></>
                )}
              </button>
            </div>
          )}

          {/* Audio Upload Input */}
          {activeTab === 'audio' && (
            <div className="relative border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-neon-cyan transition-colors bg-slate-900/30 animate-fade-in-up">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="audio/*,video/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                disabled={isLoading}
              />
              
              {selectedFile ? (
                <div className="flex flex-col items-center z-10 relative pointer-events-none">
                   <div className="bg-neon-cyan/10 p-4 rounded-full mb-3 text-neon-cyan animate-pulse">
                    <Music size={32} />
                  </div>
                  <p className="text-white font-medium mb-1">{selectedFile.name}</p>
                  <p className="text-xs text-slate-400 mb-4">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  
                  <div className="flex gap-3 pointer-events-auto">
                     <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); clearFile(); }}
                        className="bg-slate-800 hover:bg-red-900/50 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg text-xs font-bold transition-all z-20 flex items-center gap-2"
                      >
                        <X size={14} /> Remover
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading}
                        onClick={(e) => { e.stopPropagation(); handleSubmit(e); }}
                        className="bg-neon-cyan text-black hover:bg-cyan-300 px-6 py-2 rounded-lg text-sm font-bold transition-all shadow-lg shadow-cyan-900/20 z-20"
                      >
                        {isLoading ? 'Processando...' : 'Analisar Arquivo'}
                      </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center pointer-events-none">
                  <div className="bg-slate-800 p-4 rounded-full mb-3 text-slate-400 group-hover:text-neon-cyan">
                    <Upload size={24} />
                  </div>
                  <p className="text-slate-300 font-medium">Clique ou arraste um arquivo de áudio aqui</p>
                  <p className="text-xs text-slate-500 mt-2">MP3, WAV, AAC (Max 10MB)</p>
                </div>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
