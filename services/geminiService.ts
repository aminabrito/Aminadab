
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { MusicAnalysis } from "../types";

const GEMINI_API_KEY = process.env.API_KEY;

if (!GEMINI_API_KEY) {
  console.error("API Key is missing. Make sure process.env.API_KEY is available.");
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    artist: { type: Type.STRING },
    genres: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          percentage: { type: Type.NUMBER },
          description: { type: Type.STRING }
        },
        required: ["name", "percentage", "description"]
      }
    },
    bpm: { type: Type.NUMBER },
    key: { type: Type.STRING },
    mood: { type: Type.ARRAY, items: { type: Type.STRING } },
    instrumentation: { type: Type.ARRAY, items: { type: Type.STRING } },
    historicalContext: { type: Type.STRING },
    technicalAnalysis: { type: Type.STRING },
    similarArtists: { type: Type.ARRAY, items: { type: Type.STRING } },
    vibeDescription: { type: Type.STRING },
    drumAnalysis: { type: Type.STRING },
    bassAnalysis: { type: Type.STRING },
    rhythmAnalysis: { type: Type.STRING },
    styleAnalysis: { type: Type.STRING },
    harmonicInstruments: { type: Type.ARRAY, items: { type: Type.STRING } },
    timbreAnalysis: { type: Type.STRING },
    dynamicsAnalysis: { type: Type.STRING },
    chordProgression: { type: Type.STRING },
    tonalityAnalysis: { type: Type.STRING },
    vocalRange: { type: Type.STRING },
    vocalTimbre: { type: Type.STRING },
    vocalTechnique: { type: Type.STRING },
    environment: { type: Type.STRING },
    productionAnalysis: { type: Type.STRING },
    mixAnalysis: { type: Type.STRING },
    masteringAnalysis: { type: Type.STRING },
    lyricsAnalysis: { type: Type.STRING },
    structureAnalysis: { type: Type.STRING },
    singerGenreStyle: { type: Type.STRING },
    stylePrompt: { type: Type.STRING },
    sunoStyleDescription: { 
      type: Type.STRING, 
      description: "DNA de Produção OBRIGATÓRIO para Suno AI. DEVE incluir BPM, Tom e Vibe/Humor no início. Máximo 1000 caracteres." 
    },
    detailedMusicalStyle: { 
      type: Type.STRING, 
      description: "Descrição fiel do estilo musical para o campo correspondente em outros modelos de geração." 
    },
    suggestedMixStyle: {
      type: Type.STRING,
      description: "Sugestão de um estilo musical complementar ou inovador que combinaria bem com o DNA original para criar um crossover único."
    },
    youtubeLink: { type: Type.STRING },
    referenceLinks: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          url: { type: Type.STRING }
        },
        required: ["title", "url"]
      }
    }
  },
  required: [
    "title", "artist", "genres", "bpm", "key", "mood", "instrumentation", 
    "historicalContext", "technicalAnalysis", "similarArtists", "vibeDescription", 
    "drumAnalysis", "bassAnalysis", "rhythmAnalysis", "styleAnalysis",
    "harmonicInstruments", "timbreAnalysis", "dynamicsAnalysis", "chordProgression", "tonalityAnalysis",
    "vocalRange", "vocalTimbre", "vocalTechnique", "environment", "productionAnalysis", "mixAnalysis",
    "masteringAnalysis", "lyricsAnalysis", "structureAnalysis", "singerGenreStyle", "stylePrompt", 
    "sunoStyleDescription", "detailedMusicalStyle", "suggestedMixStyle"
  ]
};

const SUNO_DNA_PROMPT_GUIDELINES = `
REGRAS PARA O 'sunoStyleDescription' (DNA DE PRODUÇÃO SUNO AI):
- O INÍCIO DO PROMPT DEVE SEGUIR ESTA ORDEM: [BPM], [TOM], [VIBE/HUMOR PRINCIPAL].
- CONSTRUA UM PROMPT DE ESTILO TÉCNICO DE ATÉ 1000 CARACTERES REAIS.
- Use vírgulas para separar as tags. Foque em termos que o Suno AI interpreta bem.
- ESTRUTURA COMPLETA: [BPM], [TOM], [VIBE/MOOD], [GÊNEROS], [INSTRUMENTAÇÃO TÉCNICA], [ESTILO VOCAL], [EFEITOS DE MIXAGEM], [AMBIÊNCIA].
- PROIBIÇÃO: Jamais cite nomes de artistas.
`;

export const analyzeMusicText = async (query: string): Promise<MusicAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Realize uma engenharia reversa completa da sonoridade de: "${query}".
      ${SUNO_DNA_PROMPT_GUIDELINES}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é um Especialista em Musicologia e Sound Designer. Seu objetivo é extrair o DNA técnico de uma obra para recriação sonora fiel. Retorne JSON em pt-BR."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    const data = JSON.parse(text.replace(/^```json\s*/, "").replace(/\s*```$/, "")) as MusicAnalysis;
    
    // Extract grounding URLs
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      const links = groundingChunks
        .filter(chunk => chunk.web?.uri)
        .map(chunk => ({ title: chunk.web?.title || 'Fonte de Pesquisa', url: chunk.web?.uri! }));
      data.referenceLinks = [...(data.referenceLinks || []), ...links];
    }
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const analyzeYoutubeUrl = async (url: string): Promise<MusicAnalysis> => {
  try {
    // Usando modelo PRO para melhor capacidade de raciocínio e pesquisa em múltiplas etapas
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `TAREFA CRÍTICA: IDENTIFICAÇÃO DE VÍDEO E ANÁLISE MUSICAL
      Link Alvo: "${url}"
      
      SIGA ESTES PASSOS RIGOROSAMENTE NA ORDEM:
      1. BUSCA OBRIGATÓRIA: Use o Google Search para pesquisar especificamente a URL fornecida ("${url}"). 
         - O objetivo é descobrir o Título exato do vídeo e o Nome do Canal.
         - NÃO adivinhe. Se a busca não retornar o vídeo específico, relate erro no título.
      
      2. IDENTIFICAÇÃO: Com base no título encontrado no passo 1, determine:
         - Nome da Música
         - Artista
         - Versão (Original, Remix, Live, Cover?) -> Analise a versão EXATA do vídeo.

      3. ANÁLISE TÉCNICA: Pesquise e infira os metadados musicais (BPM, Tom, Estilo) para a obra identificada.

      4. GERAÇÃO DE DNA: Crie o 'sunoStyleDescription' baseado nos dados coletados.
      
      ${SUNO_DNA_PROMPT_GUIDELINES}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        tools: [{ googleSearch: {} }],
        systemInstruction: "Você é um Auditor Musical de Precisão. Sua prioridade absoluta é garantir que a análise corresponda exatamente ao vídeo do link fornecido. Verifique o título do vídeo via busca antes de analisar."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    const data = JSON.parse(text.replace(/^```json\s*/, "").replace(/\s*```$/, "")) as MusicAnalysis;

    // Extract grounding URLs (Search Sources)
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (groundingChunks) {
      const links = groundingChunks
        .filter(chunk => chunk.web?.uri)
        .map(chunk => ({ title: chunk.web?.title || 'Referência Confirmada', url: chunk.web?.uri! }));
      data.referenceLinks = [...(data.referenceLinks || []), ...links];
    }

    if (!data.youtubeLink) data.youtubeLink = url;
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const analyzeMusicAudio = async (base64Audio: string, mimeType: string): Promise<MusicAnalysis> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: {
        parts: [
          { inlineData: { mimeType: mimeType, data: base64Audio } },
          { text: `Extraia o DNA de produção completo para o Suno AI, começando pelo BPM, Tom e Vibe/Humor.
          ${SUNO_DNA_PROMPT_GUIDELINES}` }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "Você é um especialista em síntese sonora. Analise o áudio e crie o DNA de produção com BPM e humor explícitos."
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    return JSON.parse(text.replace(/^```json\s*/, "").replace(/\s*```$/, "")) as MusicAnalysis;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
