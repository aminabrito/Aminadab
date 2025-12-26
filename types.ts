
export interface GenreComponent {
  name: string;
  percentage: number;
  description: string;
}

export interface MusicAnalysis {
  title: string;
  artist: string;
  genres: GenreComponent[];
  bpm: number;
  key: string;
  mood: string[];
  instrumentation: string[];
  historicalContext: string;
  technicalAnalysis: string;
  similarArtists: string[];
  vibeDescription: string;
  drumAnalysis: string;
  bassAnalysis: string;
  rhythmAnalysis: string;
  styleAnalysis: string;
  harmonicInstruments: string[];
  timbreAnalysis: string;
  dynamicsAnalysis: string;
  chordProgression: string;
  tonalityAnalysis: string;
  vocalRange: string;
  vocalTimbre: string;
  vocalTechnique: string;
  environment: string;
  productionAnalysis: string;
  mixAnalysis: string;
  masteringAnalysis: string;
  lyricsAnalysis: string;
  stylePrompt: string;
  sunoStyleDescription: string;
  detailedMusicalStyle: string;
  suggestedMixStyle: string; // Novo campo para sugestão de fusão
  structureAnalysis: string;
  singerGenreStyle: string;
  youtubeLink?: string;
  referenceLinks?: { title: string; url: string }[];
}

export enum AnalysisType {
  TEXT = 'TEXT',
  AUDIO = 'AUDIO'
}

export interface HistoryItem {
  id: string;
  query: string;
  timestamp: number;
  result: MusicAnalysis;
}
