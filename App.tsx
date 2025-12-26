
import React, { useState } from 'react';
import { analyzeMusicText, analyzeMusicAudio, analyzeYoutubeUrl } from './services/geminiService';
import { MusicAnalysis } from './types';
import { InputSection } from './components/InputSection';
import { AnalysisResult } from './components/AnalysisResult';
import { AudioWaveform, Disc3, Github } from 'lucide-react';

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<MusicAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextAnalysis = async (text: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeMusicText(text);
      setAnalysis(result);
    } catch (err) {
      setError("Não foi possível realizar a análise. Tente novamente ou verifique sua API Key.");
    } finally {
      setLoading(false);
    }
  };

  const handleYoutubeAnalysis = async (url: string) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const result = await analyzeYoutubeUrl(url);
      setAnalysis(result);
    } catch (err) {
      setError("Erro ao analisar o link do YouTube. Certifique-se de que é um link válido.");
    } finally {
      setLoading(false);
    }
  };

  const handleAudioAnalysis = async (file: File) => {
    setLoading(true);
    setError(null);
    setAnalysis(null);
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      reader.onload = async () => {
        const base64String = reader.result as string;
        // Remove data url prefix (e.g., "data:audio/mp3;base64,")
        const base64Content = base64String.split(',')[1];
        const mimeType = file.type || 'audio/mp3';

        try {
          const result = await analyzeMusicAudio(base64Content, mimeType);
          setAnalysis(result);
        } catch (apiError) {
           setError("Erro ao analisar o áudio com a IA.");
        } finally {
          setLoading(false);
        }
      };

      reader.onerror = () => {
        setError("Erro ao ler o arquivo.");
        setLoading(false);
      };

    } catch (err) {
      setError("Ocorreu um erro inesperado.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-deep-bg text-slate-200 font-sans selection:bg-neon-purple selection:text-white">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col min-h-screen">
        
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-neon-purple to-neon-cyan p-2 rounded-lg">
              <AudioWaveform className="text-black" size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white">SonicGenius</h1>
              <p className="text-xs text-slate-400 tracking-widest uppercase">AI Music Lab</p>
            </div>
          </div>
          <a href="#" className="text-slate-500 hover:text-white transition-colors">
            <Github size={24} />
          </a>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex flex-col items-center">
          
          {!analysis && !loading && (
            <div className="text-center mb-12 animate-fade-in-down">
              <h2 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">
                Descubra a <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-purple via-fuchsia-500 to-neon-cyan">
                  Alma da Música
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                Utilize inteligência artificial avançada para desconstruir músicas, analisar estilos, 
                detectar instrumentos e entender o contexto histórico de qualquer faixa.
              </p>
            </div>
          )}

          <InputSection 
            onAnalyzeText={handleTextAnalysis}
            onAnalyzeAudio={handleAudioAnalysis}
            onAnalyzeYoutube={handleYoutubeAnalysis}
            isLoading={loading}
          />

          {error && (
             <div className="bg-red-500/10 border border-red-500/50 text-red-200 px-6 py-4 rounded-xl mb-8 flex items-center gap-3">
               <Disc3 className="animate-spin" />
               {error}
             </div>
          )}

          <AnalysisResult data={analysis} />
          
        </main>

        {/* Footer */}
        <footer className="mt-20 py-6 border-t border-slate-800/50 text-center text-slate-600 text-sm">
          <p>&copy; {new Date().getFullYear()} SonicGenius AI. Powered by Google Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
