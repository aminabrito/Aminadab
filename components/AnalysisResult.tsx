
import React, { useState } from 'react';
import { MusicAnalysis } from '../types';
import { GenreRadar, GenreBar } from './AnalysisCharts';
import { InfoCard } from './InfoCard';
import { 
  Music2, 
  Activity, 
  Clock, 
  Mic2, 
  Sliders,
  Disc,
  Layers,
  Speaker,
  Waves,
  Hash,
  KeyRound,
  Piano,
  Mic,
  AudioWaveform,
  Cloud,
  Sparkles,
  Copy,
  Check,
  Quote,
  Layout,
  UserCheck,
  Youtube,
  Zap,
  Target,
  FileText,
  Smile,
  Heart,
  Combine,
  FlaskConical,
  ToggleLeft,
  ToggleRight,
  Wand2,
  ExternalLink,
  BookOpen
} from 'lucide-react';

interface AnalysisResultProps {
  data: MusicAnalysis | null;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data }) => {
  const [copied, setCopied] = useState<'prompt' | 'suno' | 'style' | 'vibe' | 'mix' | 'combined' | null>(null);
  const [isFusionEnabled, setIsFusionEnabled] = useState(false);

  if (!data) return null;

  const handleCopy = (text: string, type: 'prompt' | 'suno' | 'style' | 'vibe' | 'mix' | 'combined') => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Base do prompt com BPM e Tom
  const basePrompt = data.sunoStyleDescription.toLowerCase().includes('bpm') 
    ? data.sunoStyleDescription 
    : `${data.bpm}bpm, ${data.key}, ${data.mood[0]}, ${data.sunoStyleDescription}`;

  // DNA Adaptativo (Principal)
  const activeSunoPrompt = isFusionEnabled 
    ? `${basePrompt}, ${data.suggestedMixStyle}` 
    : basePrompt;

  const vibeTags = data.mood.join(', ');

  // Filter unique reference links
  const uniqueLinks = Array.from(new Set((data.referenceLinks || []).map(l => l.url)))
    .map(url => data.referenceLinks?.find(l => l.url === url))
    .filter(Boolean);

  return (
    <div className="w-full max-w-6xl mx-auto animate-fade-in-up pb-20">
      
      {/* Header Info */}
      <div className="text-center mb-10">
        <div className="flex flex-col items-center gap-4 mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
            {data.title}
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <h3 className="text-xl md:text-2xl text-neon-purple font-medium flex items-center gap-2">
              <Mic2 size={20} />
              {data.artist}
            </h3>
            {data.youtubeLink && (
              <a 
                href={data.youtubeLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-full text-sm font-bold transition-all shadow-lg shadow-red-900/20"
              >
                <Youtube size={18} /> Ouvir no YouTube
              </a>
            )}
          </div>
        </div>
        <p className="mt-4 text-slate-400 max-w-2xl mx-auto italic border-l-2 border-neon-cyan pl-4 text-left md:text-center md:border-l-0">
          "{data.vibeDescription}"
        </p>
      </div>

      {/* DNA DE PRODUÇÃO (SUNO AI) - ADAPTATIVO */}
      <div className="mb-10 animate-fade-in-up">
        <div className={`bg-gradient-to-br from-indigo-900/40 to-slate-900/80 border ${isFusionEnabled ? 'border-neon-cyan/50 shadow-cyan-900/30' : 'border-neon-purple/50 shadow-purple-900/30'} rounded-2xl p-6 relative overflow-hidden group shadow-2xl transition-all duration-500`}>
          <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${isFusionEnabled ? 'from-neon-cyan via-teal-400 to-indigo-500' : 'from-neon-purple via-indigo-500 to-neon-cyan'} animate-pulse`}></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
            <div className="flex items-center gap-4">
              <div className={`${isFusionEnabled ? 'bg-neon-cyan/20 text-neon-cyan ring-neon-cyan/30' : 'bg-neon-purple/20 text-neon-purple ring-neon-purple/30'} p-4 rounded-2xl shadow-lg transition-all ring-1`}>
                {isFusionEnabled ? <FlaskConical size={28} /> : <Zap size={28} />}
              </div>
              <div>
                <h3 className="text-white font-black text-2xl tracking-tighter uppercase">
                  {isFusionEnabled ? 'DNA de Produção Híbrido' : 'Prompt Suno AI (DNA)'}
                </h3>
                <p className={`text-[11px] ${isFusionEnabled ? 'text-neon-cyan' : 'text-indigo-300'} uppercase tracking-widest font-bold flex items-center gap-1`}>
                  <Activity size={12} /> {isFusionEnabled ? 'Fusão Criativa Ativa' : 'BPM, Tom & Vibe Otimizados'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => handleCopy(activeSunoPrompt, 'suno')}
              className={`w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-2xl ${isFusionEnabled ? 'bg-gradient-to-r from-neon-cyan to-teal-500 text-black' : 'bg-gradient-to-r from-neon-purple to-indigo-600 text-white'} transition-all font-black text-lg shadow-xl hover:scale-[1.02] active:scale-95 border border-white/10`}
            >
              {copied === 'suno' ? <Check size={24} /> : <Copy size={24} />}
              {copied === 'suno' ? 'Copiado!' : 'Copiar DNA Final'}
            </button>
          </div>
          
          <div className="bg-black/80 rounded-2xl p-6 border border-slate-700/50 font-mono text-indigo-100 text-lg leading-relaxed shadow-inner min-h-[160px] relative transition-all">
             <div className="absolute top-3 right-4 text-[10px] text-slate-600 font-bold uppercase tracking-widest">
               {isFusionEnabled ? 'Mixed Crossover' : 'Original Reference DNA'}
             </div>
             {activeSunoPrompt}
          </div>
          
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-3">
               <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-2 text-slate-400 font-bold uppercase border border-slate-700/50">
                 <Activity size={12} className="text-neon-cyan"/> {data.bpm} BPM
               </span>
               <span className="bg-slate-800/80 px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-2 text-slate-400 font-bold uppercase border border-slate-700/50">
                 <KeyRound size={12} className="text-neon-purple"/> {data.key} Key
               </span>
               {isFusionEnabled && (
                 <span className="bg-teal-900/30 px-3 py-1.5 rounded-lg text-[10px] flex items-center gap-2 text-neon-cyan font-bold uppercase border border-neon-cyan/30 animate-pulse">
                   <Combine size={12} /> Mixed Style
                 </span>
               )}
            </div>
            <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-black ${activeSunoPrompt.length > 900 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-800/80 text-slate-400 border border-slate-700'}`}>
              <FileText size={14} />
              {activeSunoPrompt.length} / 1000
            </div>
          </div>
        </div>
      </div>

      {/* MIXER: FUSÃO SUGERIDA COM OPÇÃO SIM/NÃO */}
      <div className="mb-10 animate-fade-in-up">
        <div className="bg-gradient-to-r from-teal-900/20 to-slate-900/60 border border-slate-800 rounded-2xl p-6 relative shadow-xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-slate-800 p-3 rounded-xl text-neon-cyan border border-slate-700">
                <FlaskConical size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg uppercase tracking-tight">Mixer: Fusão Sugerida</h3>
                <p className="text-xs text-slate-500">Combine o DNA analisado com uma nova tendência</p>
              </div>
            </div>

            <div className="bg-slate-900/80 p-1.5 rounded-2xl border border-slate-700 flex items-center gap-1 w-full md:w-auto shadow-inner">
               <span className="text-[10px] uppercase font-black text-slate-500 px-3 hidden sm:inline">Fundir Estilos?</span>
               <button 
                onClick={() => setIsFusionEnabled(false)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-xl text-xs font-black uppercase transition-all ${!isFusionEnabled ? 'bg-slate-800 text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 Não
               </button>
               <button 
                onClick={() => setIsFusionEnabled(true)}
                className={`flex-1 md:flex-none px-8 py-2 rounded-xl text-xs font-black uppercase transition-all flex items-center justify-center gap-2 ${isFusionEnabled ? 'bg-gradient-to-r from-neon-cyan to-teal-500 text-black shadow-lg shadow-cyan-900/20' : 'text-slate-500 hover:text-slate-300'}`}
               >
                 {isFusionEnabled && <Wand2 size={12} />} Sim
               </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
             <div className="md:col-span-1 bg-black/40 p-4 rounded-xl border border-teal-500/10">
                <div className="text-[9px] text-teal-400 font-black uppercase mb-1 flex items-center gap-2">
                  <Sparkles size={10} /> Estilo de Mistura
                </div>
                <div className="text-lg font-bold text-white tracking-tight">{data.suggestedMixStyle}</div>
             </div>
             <div className="md:col-span-2 bg-black/40 p-4 rounded-xl border border-white/5 flex items-center">
                <p className="text-slate-400 text-xs italic leading-relaxed">
                  "Esta fusão adiciona elementos de <span className="text-neon-cyan font-bold">{data.suggestedMixStyle}</span> ao DNA original, criando uma sonoridade única para o Suno AI."
                </p>
             </div>
          </div>
        </div>
      </div>

      {/* SEÇÃO DE VIBE & HUMOR TAGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 animate-fade-in-up">
        <div className="bg-slate-900/40 border border-neon-purple/20 rounded-2xl p-6 group transition-all hover:bg-slate-900/60">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-neon-purple/10 p-2 rounded-xl text-neon-purple">
                <Heart size={20} />
              </div>
              <h3 className="text-white font-bold text-base uppercase tracking-wider">Tags de Vibe & Humor</h3>
            </div>
            <button 
              onClick={() => handleCopy(vibeTags, 'vibe')}
              className="text-[10px] flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-neon-purple hover:text-white rounded-xl transition-all text-slate-400 font-black uppercase border border-slate-700/50"
            >
              {copied === 'vibe' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'vibe' ? 'Copiado' : 'Copiar Tags'}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.mood.map((tag, i) => (
              <span key={i} className="px-3 py-1 bg-neon-purple/10 border border-neon-purple/20 rounded-lg text-xs font-medium text-neon-purple">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/40 border border-neon-cyan/20 rounded-2xl p-6 group transition-all hover:bg-slate-900/60">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-neon-cyan/10 p-2 rounded-xl text-neon-cyan">
                <Target size={20} />
              </div>
              <h3 className="text-white font-bold text-base uppercase tracking-wider">Estilo Musical Detalhado</h3>
            </div>
            <button 
              onClick={() => handleCopy(data.detailedMusicalStyle, 'style')}
              className="text-[10px] flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-neon-cyan hover:text-black rounded-xl transition-all text-slate-400 font-black uppercase border border-slate-700/50"
            >
              {copied === 'style' ? <Check size={14} /> : <Copy size={14} />}
              {copied === 'style' ? 'Copiado' : 'Copiar Estilo'}
            </button>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed italic line-clamp-3">
            {data.detailedMusicalStyle}
          </p>
        </div>
      </div>

      {/* ANÁLISE VOCAL E DETALHES TÉCNICOS */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-900/10 to-slate-900/50 border border-purple-500/20 rounded-2xl p-6">
           <h3 className="text-neon-purple text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-3">
             <div className="w-1 h-6 bg-neon-purple rounded-full"></div>
             Análise Vocal Detalhada
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800">
                <div className="text-slate-500 text-[10px] uppercase font-black mb-2 flex items-center gap-2">
                  <AudioWaveform size={14} className="text-neon-purple"/> Registro / Alcance
                </div>
                <div className="text-white font-bold text-lg">{data.vocalRange}</div>
              </div>
              <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800">
                 <div className="text-slate-500 text-[10px] uppercase font-black mb-2 flex items-center gap-2">
                  <Waves size={14} className="text-neon-purple"/> Timbre & Caráter
                </div>
                <div className="text-white font-bold text-lg">{data.vocalTimbre}</div>
              </div>
               <div className="bg-slate-900/80 rounded-xl p-5 border border-slate-800">
                 <div className="text-slate-500 text-[10px] uppercase font-black mb-2 flex items-center gap-2">
                  <Mic size={14} className="text-neon-purple"/> Técnica Vocal
                </div>
                <div className="text-white font-bold text-lg">{data.vocalTechnique}</div>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="space-y-6">
           <div className="bg-card-bg border border-slate-800 rounded-2xl p-6 shadow-lg">
             <h3 className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-6 flex items-center gap-2">
               <Activity size={16} className="text-neon-cyan" /> Parâmetros Técnicos
             </h3>
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                  <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">BPM</div>
                  <span className="text-3xl font-black text-white tracking-tighter">{data.bpm}</span>
                </div>
                <div className="bg-slate-900/50 p-5 rounded-2xl border border-slate-800/50">
                   <div className="text-slate-500 text-[10px] uppercase font-bold mb-1">Tom Principal</div>
                  <span className="text-3xl font-black text-white tracking-tighter">{data.key}</span>
                </div>
             </div>
           </div>
           <InfoCard title="Estrutura & Dinâmica" content={data.structureAnalysis} icon={Layout} color="text-emerald-400" className="rounded-2xl" />
           <InfoCard title="Design de Bateria" content={data.drumAnalysis} icon={Disc} color="text-red-400" className="rounded-2xl" />
           <InfoCard title="Baixo & Sub-Frequência" content={data.bassAnalysis} icon={Speaker} color="text-violet-400" className="rounded-2xl" />
        </div>

        <div className="lg:col-span-1 flex flex-col gap-6">
           <div className="bg-card-bg border border-slate-800 rounded-2xl p-6 flex flex-col justify-center relative overflow-hidden min-h-[360px] shadow-lg">
             <GenreRadar genres={data.genres} />
             <GenreBar genres={data.genres} />
           </div>
           <InfoCard title="Textura & Timbre" content={data.timbreAnalysis} icon={Waves} color="text-sky-400" className="rounded-2xl" />
           <InfoCard title="Mixagem & Espacialidade" content={data.mixAnalysis} icon={Sliders} color="text-slate-300" className="rounded-2xl" />
           <InfoCard title="Environment & FX" content={data.environment} icon={Cloud} color="text-indigo-300" className="rounded-2xl" />
        </div>

        <div className="space-y-6">
           <InfoCard title="Assinatura Artística" content={data.singerGenreStyle} icon={UserCheck} color="text-purple-400" className="rounded-2xl" />
           <InfoCard title="Lírica & Mensagem" content={data.lyricsAnalysis} icon={Quote} color="text-green-400" className="rounded-2xl" />
           <InfoCard title="Arquitetura Harmônica" content={data.harmonicInstruments} icon={Piano} color="text-fuchsia-400" className="rounded-2xl" />
           <InfoCard title="Progressão Harmônica" content={data.chordProgression} icon={Hash} color="text-rose-400" className="rounded-2xl" />
           <InfoCard title="Contexto & Era" content={data.historicalContext} icon={Clock} color="text-orange-400" className="rounded-2xl" />
           <InfoCard title="Nuances Estilísticas" content={data.styleAnalysis} icon={Layers} color="text-blue-400" className="rounded-2xl" />
        </div>
      </div>

      {/* SEÇÃO DE FONTES DE FUNDAMENTAÇÃO (REQUISITO GOOGLE SEARCH) */}
      {uniqueLinks.length > 0 && (
        <div className="mt-12 p-8 bg-slate-900/30 border border-slate-800 rounded-3xl animate-fade-in">
           <div className="flex items-center gap-3 mb-6">
              <BookOpen className="text-neon-cyan" size={24} />
              <h3 className="text-white font-bold text-xl tracking-tight uppercase">Fontes de Pesquisa & Metadados</h3>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {uniqueLinks.map((link, idx) => (
                <a 
                  key={idx} 
                  href={link!.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 bg-slate-800/40 hover:bg-slate-800 rounded-xl border border-slate-700/50 transition-all hover:border-neon-cyan/40"
                >
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-xs text-slate-400 font-bold uppercase tracking-widest truncate">{link!.title}</span>
                    <span className="text-[10px] text-slate-500 truncate">{new URL(link!.url).hostname}</span>
                  </div>
                  <ExternalLink size={16} className="text-slate-600 group-hover:text-neon-cyan transition-colors" />
                </a>
              ))}
           </div>
           <p className="mt-6 text-[10px] text-slate-600 text-center italic">
             Informações técnicas fundamentadas via Google Search Grounding.
           </p>
        </div>
      )}
      
    </div>
  );
};
