import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 mins
const RATE_LIMIT_MAX_REQUESTS = 5;
const clientRequests: Record<string, { count: number; windowStart: number }> = {};

// Phase 2 & 4: Comprehensive native voice mappings with intelligent family-based assignment
const NATIVE_VOICES = {
  // MAJOR WORLD LANGUAGES - Top quality voices optimized for native pronunciation
  "english": "pNInz6obpgDQGcFmaJgB", // Rachel - native English clarity
  "spanish": "iP95p4xoKVk53GoZ742B", // Chris - native Spanish clarity  
  "french": "cgSgspJ2msm6clMCkdW9", // Jessica - native French elegance
  "german": "nPczCjzI2devNBz1zQrb", // Brian - native German authority
  "italian": "AZnzlk1XvdvUeBnXmlld", // Domi - native Italian expressiveness
  "portuguese": "cjVigY5qzO86Huf0OWal", // Eric - native Portuguese warmth
  "russian": "bIHbv24MWmeRgasZH58o", // Will - deep Slavic pronunciation
  "japanese": "XrExE9yKIg1WjnnlVkGX", // Matilda - precise Japanese articulation
  "chinese": "Xb7hH8MSUJpSbSDYk0k2", // Alice - better for tonal pronunciation
  "arabic": "onwK4e9ZLuTAKqWW03F9", // Daniel - native Arabic pronunciation
  
  // INDIAN SUBCONTINENT - Optimized for complex phonetics
  "hindi": "pFZP5JQG7iQjIQuC4Bku", // Lily - clear articulation for Hindi
  "bengali": "Xb7hH8MSUJpSbSDYk0k2", // Alice - precise Bengali pronunciation
  "tamil": "TX3LPaxmHKxFdv7VOQHJ", // Liam - strong Tamil articulation
  "telugu": "cgSgspJ2msm6clMCkdW9", // Jessica - clear Telugu pronunciation
  "marathi": "pFZP5JQG7iQjIQuC4Bku", // Lily - natural Marathi flow
  "gujarati": "Xb7hH8MSUJpSbSDYk0k2", // Alice - clear Gujarati tones
  "punjabi": "TX3LPaxmHKxFdv7VOQHJ", // Liam - expressive Punjabi
  "urdu": "onwK4e9ZLuTAKqWW03F9", // Daniel - sophisticated Urdu
  
  // EUROPEAN LANGUAGES - Native speaker voices
  "dutch": "N2lVS1w4EtoT3dr4eOWO", // Callum - native Dutch pronunciation
  "polish": "bIHbv24MWmeRgasZH58o", // Will - strong Polish articulation
  "czech": "IKne3meq5aSn9XLyUdCD", // Charlie - Czech precision
  "slovak": "IKne3meq5aSn9XLyUdCD", // Charlie - Slovak clarity
  "hungarian": "JBFqnCBsd6RMkjVDRZzb", // George - distinct Hungarian
  "romanian": "AZnzlk1XvdvUeBnXmlld", // Domi - Romance Romanian
  "bulgarian": "bIHbv24MWmeRgasZH58o", // Will - Bulgarian depth
  "croatian": "IKne3meq5aSn9XLyUdCD", // Charlie - Croatian clarity
  "serbian": "bIHbv24MWmeRgasZH58o", // Will - Serbian strength
  "ukrainian": "JBFqnCBsd6RMkjVDRZzb", // George - Ukrainian authority
  "greek": "XB0fDUnXU5powFXDhCwa", // Charlotte - Greek expressiveness
  "danish": "SAz9YHcvj6GT2YYXdXww", // River - Nordic Danish
  "finnish": "N2lVS1w4EtoT3dr4eOWO", // Callum - Finnish precision
  "swedish": "SAz9YHcvj6GT2YYXdXww", // River - Swedish clarity
  "norwegian": "N2lVS1w4EtoT3dr4eOWO", // Callum - Norwegian naturalness
  
  // AFRICAN LANGUAGES - Phase 2 additions
  "swahili": "pNInz6obpgDQGcFmaJgB", // Rachel - clear articulation
  "zulu": "pNInz6obpgDQGcFmaJgB", // Rachel - strong pronunciation
  "afrikaans": "D38z5RcWu1voky8WS1ja", // Fin - Germanic similarity
  
  // ASIAN LANGUAGES - Optimized for tonal accuracy
  "korean": "pqHfZKP75CvOlQylNhV4", // Bill - precise Korean tones
  "vietnamese": "XB0fDUnXU5powFXDhCwa", // Charlotte - Vietnamese tonal accuracy
  "thai": "pFZP5JQG7iQjIQuC4Bku", // Lily - Thai tonal precision
  "turkish": "cjVigY5qzO86Huf0OWal", // Eric - native Turkish expression
  
  // PACIFIC ISLAND LANGUAGES - Phase 2 with culturally appropriate voices
  "tagalog": "D38z5RcWu1voky8WS1ja", // Fin - friendly, warm
  "samoan": "29vD33N1CtxCmqQRPOHJ", // Drew - natural, relaxed
  "fijian": "D38z5RcWu1voky8WS1ja", // Fin - friendly hospitality
  "tongan": "29vD33N1CtxCmqQRPOHJ", // Drew - warm, respectful
  "chamorro": "ErXwobaYiN019PkySvjV", // Antoni - versatile
  "māori": "29vD33N1CtxCmqQRPOHJ", // Drew - respectful
  "maori": "29vD33N1CtxCmqQRPOHJ", // Drew - respectful
  
  // NORDIC/EUROPEAN ISLAND LANGUAGES
  "icelandic": "2EiwWnXFnvU5JabPnv8n", // Clyde - deep Nordic
  "faroese": "CYw3kZ02Hs0563khs1Fj", // Dave - Nordic similarity
  "maltese": "AZnzlk1XvdvUeBnXmlld", // Domi - Mediterranean
  "corsican": "AZnzlk1XvdvUeBnXmlld", // Domi - Italian-like
  "sicilian": "AZnzlk1XvdvUeBnXmlld", // Domi - Italian regional
  
  // CARIBBEAN LANGUAGES
  "jamaican patois": "ErXwobaYiN019PkySvjV", // Antoni - expressive
  "haitian creole": "pNInz6obpgDQGcFmaJgB", // Rachel - French influence
  "papiamento": "ErXwobaYiN019PkySvjV", // Antoni - multi-lingual
  "spanish (cuba)": "ErXwobaYiN019PkySvjV", // Antoni - Caribbean
  "spanish (dominican republic)": "ErXwobaYiN019PkySvjV", // Antoni - Caribbean
  
  // INDIAN OCEAN & OCEANIC
  "sinhala": "EXAVITQu4vr4xnSDxMaL", // Sarah - clear tones
  "dhivehi": "EXAVITQu4vr4xnSDxMaL", // Sarah - Arabic influence
  "mauritian creole": "pNInz6obpgDQGcFmaJgB", // Rachel - French-based
  "seychellois creole": "pNInz6obpgDQGcFmaJgB", // Rachel - French-based
  "tok pisin": "D38z5RcWu1voky8WS1ja", // Fin - friendly English-based
  
  // MIDDLE EASTERN & PERSIAN
  "farsi": "ErXwobaYiN019PkySvjV", // Antoni - sophisticated
  "persian": "ErXwobaYiN019PkySvjV", // Antoni - sophisticated
  "hebrew": "ErXwobaYiN019PkySvjV", // Antoni - Semitic versatility
  
  // CELTIC LANGUAGES
  "irish": "pNInz6obpgDQGcFmaJgB", // Rachel - Celtic clarity
  "gaeilge": "pNInz6obpgDQGcFmaJgB", // Rachel - Celtic authenticity
  "scottish": "pNInz6obpgDQGcFmaJgB", // Rachel - Celtic warmth
  "scottish gaelic": "pNInz6obpgDQGcFmaJgB", // Rachel - Celtic tradition
  
  // AFRICAN MINORITY LANGUAGES
  "mali": "pNInz6obpgDQGcFmaJgB", // Rachel - clear articulation
  "bambara": "pNInz6obpgDQGcFmaJgB", // Rachel - West African
  
  // SPANISH VARIANTS
  "colombian spanish": "ErXwobaYiN019PkySvjV", // Antoni - Latin American
  "mexican spanish": "ErXwobaYiN019PkySvjV", // Antoni - expressive
  "costa rican spanish": "ErXwobaYiN019PkySvjV", // Antoni - Central American
  
  // ENGLISH VARIANTS
  "english (south africa)": "pNInz6obpgDQGcFmaJgB", // Rachel - clear English
};

// Phase 4: Enhanced language-optimized voice settings with family-based optimization
const LANGUAGE_VOICE_SETTINGS = {
  // GERMANIC FAMILY - Authoritative, controlled
  "german": { stability: 0.6, similarityBoost: 0.9, style: 0.1 },
  "dutch": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "english": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "swedish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "norwegian": { stability: 0.7, similarityBoost: 0.9, style: 0.05 },
  "danish": { stability: 0.7, similarityBoost: 0.9, style: 0.05 },
  "icelandic": { stability: 0.8, similarityBoost: 0.9, style: 0.1 },
  "faroese": { stability: 0.7, similarityBoost: 0.8, style: 0.1 },
  "afrikaans": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  
  // ROMANCE FAMILY - Expressive, warm
  "spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "french": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "italian": { stability: 0.5, similarityBoost: 0.9, style: 0.4 },
  "portuguese": { stability: 0.6, similarityBoost: 0.8, style: 0.3 },
  "romanian": { stability: 0.5, similarityBoost: 0.9, style: 0.3 },
  "corsican": { stability: 0.5, similarityBoost: 0.9, style: 0.3 },
  "sicilian": { stability: 0.5, similarityBoost: 0.9, style: 0.4 },
  
  // SLAVIC FAMILY - Deep, controlled
  "russian": { stability: 0.7, similarityBoost: 0.9, style: 0.1 },
  "polish": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "czech": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "slovak": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "bulgarian": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "croatian": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "serbian": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "ukrainian": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  
  // INDIC FAMILY - Clear, precise
  "hindi": { stability: 0.7, similarityBoost: 0.8, style: 0.1 },
  "bengali": { stability: 0.7, similarityBoost: 0.8, style: 0.1 },
  "tamil": { stability: 0.8, similarityBoost: 0.7, style: 0.1 },
  "telugu": { stability: 0.7, similarityBoost: 0.8, style: 0.1 },
  "marathi": { stability: 0.7, similarityBoost: 0.8, style: 0.1 },
  "gujarati": { stability: 0.7, similarityBoost: 0.8, style: 0.1 },
  "punjabi": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "urdu": { stability: 0.6, similarityBoost: 0.9, style: 0.2 },
  "sinhala": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  
  // TONAL LANGUAGES - Precise, controlled
  "chinese": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "japanese": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "korean": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "vietnamese": { stability: 0.8, similarityBoost: 0.7, style: 0.1 },
  "thai": { stability: 0.8, similarityBoost: 0.7, style: 0.1 },
  
  // SEMITIC FAMILY - Sophisticated
  "arabic": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "hebrew": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "farsi": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "persian": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  
  // PACIFIC FAMILY - Warm, expressive
  "tagalog": { stability: 0.4, similarityBoost: 0.9, style: 0.4 },
  "samoan": { stability: 0.3, similarityBoost: 0.8, style: 0.5 },
  "fijian": { stability: 0.4, similarityBoost: 0.8, style: 0.4 },
  "tongan": { stability: 0.5, similarityBoost: 0.8, style: 0.3 },
  "chamorro": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "māori": { stability: 0.5, similarityBoost: 0.9, style: 0.2 },
  "maori": { stability: 0.5, similarityBoost: 0.9, style: 0.2 },
  "tok pisin": { stability: 0.4, similarityBoost: 0.8, style: 0.3 },
  
  // CARIBBEAN FAMILY - Expressive, dynamic
  "jamaican patois": { stability: 0.3, similarityBoost: 0.9, style: 0.6 },
  "haitian creole": { stability: 0.4, similarityBoost: 0.8, style: 0.4 },
  "papiamento": { stability: 0.4, similarityBoost: 0.9, style: 0.4 },
  "spanish (cuba)": { stability: 0.4, similarityBoost: 0.9, style: 0.4 },
  "spanish (dominican republic)": { stability: 0.3, similarityBoost: 0.9, style: 0.5 },
  
  // OCEANIC FAMILY
  "dhivehi": { stability: 0.6, similarityBoost: 0.8, style: 0.3 },
  "mauritian creole": { stability: 0.4, similarityBoost: 0.8, style: 0.3 },
  "seychellois creole": { stability: 0.4, similarityBoost: 0.8, style: 0.3 },
  
  // CELTIC FAMILY - Traditional, respectful
  "irish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "gaeilge": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "scottish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "scottish gaelic": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  
  // AFRICAN LANGUAGES
  "swahili": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "zulu": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "mali": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "bambara": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  
  // OTHERS
  "turkish": { stability: 0.5, similarityBoost: 0.8, style: 0.3 },
  "finnish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "hungarian": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "greek": { stability: 0.5, similarityBoost: 0.9, style: 0.4 },
  "maltese": { stability: 0.5, similarityBoost: 0.9, style: 0.3 },
  
  // SPANISH VARIANTS
  "colombian spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "mexican spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "costa rican spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  
  // ENGLISH VARIANTS
  "english (south africa)": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
};

// Phase 4: Enhanced model selection for different language families
const getOptimalModel = (language: string): string => {
  const languageModelMap: Record<string, string> = {
    // Multilingual v2 for European languages with complex phonetics
    'icelandic': 'eleven_multilingual_v2',
    'faroese': 'eleven_multilingual_v2',
    'maltese': 'eleven_multilingual_v2',
    'corsican': 'eleven_multilingual_v2',
    'sicilian': 'eleven_multilingual_v2',
    'greek': 'eleven_multilingual_v2',
    'finnish': 'eleven_multilingual_v2',
    'hungarian': 'eleven_multilingual_v2',
    
    // Multilingual v2 for Indian languages
    'hindi': 'eleven_multilingual_v2',
    'bengali': 'eleven_multilingual_v2',
    'tamil': 'eleven_multilingual_v2',
    'telugu': 'eleven_multilingual_v2',
    'marathi': 'eleven_multilingual_v2',
    'gujarati': 'eleven_multilingual_v2',
    'punjabi': 'eleven_multilingual_v2',
    'urdu': 'eleven_multilingual_v2',
    'sinhala': 'eleven_multilingual_v2',
    
    // Turbo v2.5 for creole/pidgin languages needing flexibility
    'jamaican patois': 'eleven_turbo_v2_5',
    'haitian creole': 'eleven_turbo_v2_5',
    'mauritian creole': 'eleven_turbo_v2_5',
    'seychellois creole': 'eleven_turbo_v2_5',
    'tok pisin': 'eleven_turbo_v2_5',
    'papiamento': 'eleven_turbo_v2_5',
    
    // Multilingual v2 for Pacific languages
    'tagalog': 'eleven_multilingual_v2',
    'samoan': 'eleven_multilingual_v2',
    'fijian': 'eleven_multilingual_v2',
    'tongan': 'eleven_multilingual_v2',
    'chamorro': 'eleven_multilingual_v2',
    'māori': 'eleven_multilingual_v2',
    'maori': 'eleven_multilingual_v2',
    
    // Multilingual v2 for African languages
    'swahili': 'eleven_multilingual_v2',
    'zulu': 'eleven_multilingual_v2',
    'afrikaans': 'eleven_multilingual_v2',
    
    // Default multilingual for others
    default: 'eleven_multilingual_v2'
  };
  
  return languageModelMap[language] || languageModelMap.default;
};

function getClientIdentifier(req: Request) {
  const auth = req.headers.get("Authorization");
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7, 50);
  try { return (req as any).conn?.remoteAddr?.hostname ?? "unknown"; } catch { return "unknown"; }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientId = getClientIdentifier(req);
  const now = Date.now();
  if (!clientRequests[clientId] || now - clientRequests[clientId].windowStart > RATE_LIMIT_WINDOW_MS) {
    clientRequests[clientId] = { count: 1, windowStart: now };
  } else {
    clientRequests[clientId].count += 1;
    if (clientRequests[clientId].count > RATE_LIMIT_MAX_REQUESTS) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please wait." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  try {
    const body = await req.json();
    let { 
      text, 
      voiceId, 
      language = "english",
      stability, 
      similarityBoost, 
      style, 
      useSpeakerBoost = true 
    } = body;
    
    if (typeof text !== "string" || text.trim().length === 0 || text.length > 120) {
      return new Response(JSON.stringify({ error: "Invalid text length." }), { status: 400, headers: corsHeaders });
    }
    
    // Phase 2: Enhanced normalize language variants
    const normalizeLanguageVariant = (lang: string): string => {
      const normalized = lang.toLowerCase();
      const variantMappings: Record<string, string> = {
        "colombian spanish": "spanish",
        "mexican spanish": "spanish", 
        "costa rican spanish": "spanish",
        "english (south africa)": "english",
        "spanish (cuba)": "spanish (cuba)", // Keep Cuban distinct
        "spanish (dominican republic)": "spanish (dominican republic)", // Keep Dominican distinct
        "filipino": "tagalog", // Filipino is based on Tagalog
        "mandarin": "chinese", // Mandarin is a variant of Chinese
      };
      return variantMappings[normalized] || normalized;
    };

    // Phase 4: Use comprehensive voice and settings selection
    const normalizedLanguage = normalizeLanguageVariant(language.toLowerCase());
    const selectedVoiceId = voiceId || NATIVE_VOICES[normalizedLanguage] || NATIVE_VOICES["english"];
    
    // Use comprehensive language-optimized settings
    const languageSettings = LANGUAGE_VOICE_SETTINGS[normalizedLanguage] || LANGUAGE_VOICE_SETTINGS["english"];
    const finalStability = stability !== undefined ? stability : languageSettings.stability;
    const finalSimilarityBoost = similarityBoost !== undefined ? similarityBoost : languageSettings.similarityBoost;
    const finalStyle = style !== undefined ? style : languageSettings.style;
    
    // Use optimal model for language family
    const selectedModel = getOptimalModel(normalizedLanguage);
    
    // Phase 5: Enhanced logging for comprehensive language support
    console.log(`[TTS] Enhanced Language Processing: ${language} (${normalizedLanguage}) | Voice: ${selectedVoiceId} | Model: ${selectedModel} | Settings: stability=${finalStability}, similarity=${finalSimilarityBoost}, style=${finalStyle}`);

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    
    if (!ELEVENLABS_API_KEY) {
      console.error("[TTS] ❌ ELEVENLABS_API_KEY not found in environment");
      return new Response(JSON.stringify({ error: "ElevenLabs API key not configured. Please add ELEVENLABS_API_KEY to your Supabase edge function secrets." }), { 
        status: 500, 
        headers: corsHeaders 
      });
    }
    
    console.log(`[TTS] ✅ API key found, making request to ElevenLabs with optimized settings...`);

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoiceId}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg",
        },
        body: JSON.stringify({
          text: text,
          model_id: selectedModel,
          voice_settings: {
            stability: Math.max(0, Math.min(1, finalStability)),
            similarity_boost: Math.max(0, Math.min(1, finalSimilarityBoost)),
            style: Math.max(0, Math.min(1, finalStyle)),
            use_speaker_boost: useSpeakerBoost
          }
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      console.error(`[TTS] ❌ ElevenLabs API Error: ${response.status} - ${errText}`);
      return new Response(JSON.stringify({ 
        error: `ElevenLabs API Error (${response.status}): ${errText}`,
        details: {
          status: response.status,
          language: normalizedLanguage,
          voiceId: selectedVoiceId,
          model: selectedModel
        }
      }), { 
        status: response.status >= 500 ? 500 : 400, 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }

    const arrayBuffer = await response.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600"
      },
    });
  } catch (err) {
    console.error("[TTS] ElevenLabs Error:", err);
    return new Response(JSON.stringify({ error: "Failed to process TTS request." }), { status: 500, headers: corsHeaders });
  }
});
