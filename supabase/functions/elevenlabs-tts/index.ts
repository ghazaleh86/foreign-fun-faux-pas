import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 mins
const RATE_LIMIT_MAX_REQUESTS = 5;
const clientRequests: Record<string, { count: number; windowStart: number }> = {};

// Enhanced native voice mappings for island countries
const NATIVE_VOICES = {
  "german": "2EiwWnXFnvU5JabPnv8n",
  "spanish": "ErXwobaYiN019PkySvjV",
  "french": "pNInz6obpgDQGcFmaJgB",
  "japanese": "EXAVITQu4vr4xnSDxMaL",
  "italian": "AZnzlk1XvdvUeBnXmlld",
  "portuguese": "29vD33N1CtxCmqQRPOHJ",
  "dutch": "D38z5RcWu1voky8WS1ja",
  "swedish": "CYw3kZ02Hs0563khs1Fj",
  "norwegian": "29vD33N1CtxCmqQRPOHJ",
  "arabic": "ErXwobaYiN019PkySvjV",
  "chinese": "EXAVITQu4vr4xnSDxMaL",
  "english": "pNInz6obpgDQGcFmaJgB",
  "korean": "EXAVITQu4vr4xnSDxMaL",
  "polish": "2EiwWnXFnvU5JabPnv8n",
  "russian": "2EiwWnXFnvU5JabPnv8n",
  "turkish": "ErXwobaYiN019PkySvjV",
  "vietnamese": "EXAVITQu4vr4xnSDxMaL",
  "thai": "EXAVITQu4vr4xnSDxMaL",
  "czech": "2EiwWnXFnvU5JabPnv8n",
  "afrikaans": "D38z5RcWu1voky8WS1ja",
  
  // PACIFIC ISLAND LANGUAGES - Culturally appropriate voices
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
  "spanish (dominican republic)": "ErXwobaYiN019PkySvjV", // Antoni
  
  // INDIAN OCEAN & OCEANIC
  "sinhala": "EXAVITQu4vr4xnSDxMaL", // Sarah - clear tones
  "dhivehi": "EXAVITQu4vr4xnSDxMaL", // Sarah - Arabic influence
  "mauritian creole": "pNInz6obpgDQGcFmaJgB", // Rachel - French-based
  "seychellois creole": "pNInz6obpgDQGcFmaJgB", // Rachel - French-based
  "tok pisin": "D38z5RcWu1voky8WS1ja", // Fin - friendly English-based
  
  // Additional languages and variants
  "farsi": "ErXwobaYiN019PkySvjV",
  "persian": "ErXwobaYiN019PkySvjV",
  "mali": "pNInz6obpgDQGcFmaJgB",
  "bambara": "pNInz6obpgDQGcFmaJgB",
  "irish": "pNInz6obpgDQGcFmaJgB",
  "gaeilge": "pNInz6obpgDQGcFmaJgB",
  "scottish": "pNInz6obpgDQGcFmaJgB",
  "scottish gaelic": "pNInz6obpgDQGcFmaJgB",
  "hebrew": "ErXwobaYiN019PkySvjV",
  "finnish": "CYw3kZ02Hs0563khs1Fj",
  "danish": "29vD33N1CtxCmqQRPOHJ",
  "greek": "AZnzlk1XvdvUeBnXmlld",
  "slovak": "2EiwWnXFnvU5JabPnv8n",
  "swahili": "pNInz6obpgDQGcFmaJgB",
  "zulu": "pNInz6obpgDQGcFmaJgB",
  "colombian spanish": "ErXwobaYiN019PkySvjV",
  "mexican spanish": "ErXwobaYiN019PkySvjV",
  "costa rican spanish": "ErXwobaYiN019PkySvjV",
  "english (south africa)": "pNInz6obpgDQGcFmaJgB",
};

// Enhanced language-optimized voice settings
const LANGUAGE_VOICE_SETTINGS = {
  "german": { stability: 0.6, similarityBoost: 0.9, style: 0.1 },
  "spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "french": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "japanese": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "italian": { stability: 0.5, similarityBoost: 0.9, style: 0.4 },
  "portuguese": { stability: 0.6, similarityBoost: 0.8, style: 0.3 },
  "dutch": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "swedish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "norwegian": { stability: 0.7, similarityBoost: 0.9, style: 0.05 },
  "arabic": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "chinese": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "english": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "korean": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "polish": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "russian": { stability: 0.7, similarityBoost: 0.9, style: 0.1 },
  "turkish": { stability: 0.5, similarityBoost: 0.8, style: 0.3 },
  "vietnamese": { stability: 0.8, similarityBoost: 0.7, style: 0.1 },
  "thai": { stability: 0.8, similarityBoost: 0.7, style: 0.1 },
  "czech": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "afrikaans": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  
  // PACIFIC ISLAND SETTINGS - Warm, expressive
  "tagalog": { stability: 0.4, similarityBoost: 0.9, style: 0.4 },
  "samoan": { stability: 0.3, similarityBoost: 0.8, style: 0.5 },
  "fijian": { stability: 0.4, similarityBoost: 0.8, style: 0.4 },
  "tongan": { stability: 0.5, similarityBoost: 0.8, style: 0.3 },
  "chamorro": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "māori": { stability: 0.5, similarityBoost: 0.9, style: 0.2 },
  "maori": { stability: 0.5, similarityBoost: 0.9, style: 0.2 },
  
  // NORDIC SETTINGS - Controlled, clear
  "icelandic": { stability: 0.8, similarityBoost: 0.9, style: 0.1 },
  "faroese": { stability: 0.7, similarityBoost: 0.8, style: 0.1 },
  "maltese": { stability: 0.5, similarityBoost: 0.9, style: 0.3 },
  "corsican": { stability: 0.5, similarityBoost: 0.9, style: 0.3 },
  "sicilian": { stability: 0.5, similarityBoost: 0.9, style: 0.4 },
  
  // CARIBBEAN SETTINGS - Expressive, dynamic
  "jamaican patois": { stability: 0.3, similarityBoost: 0.9, style: 0.6 },
  "haitian creole": { stability: 0.4, similarityBoost: 0.8, style: 0.4 },
  "papiamento": { stability: 0.4, similarityBoost: 0.9, style: 0.4 },
  "spanish (cuba)": { stability: 0.4, similarityBoost: 0.9, style: 0.4 },
  "spanish (dominican republic)": { stability: 0.3, similarityBoost: 0.9, style: 0.5 },
  
  // INDIAN OCEAN & OCEANIC SETTINGS
  "sinhala": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "dhivehi": { stability: 0.6, similarityBoost: 0.8, style: 0.3 },
  "mauritian creole": { stability: 0.4, similarityBoost: 0.8, style: 0.3 },
  "seychellois creole": { stability: 0.4, similarityBoost: 0.8, style: 0.3 },
  "tok pisin": { stability: 0.4, similarityBoost: 0.8, style: 0.3 },
  
  // Additional languages
  "farsi": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "persian": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "mali": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "bambara": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "irish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "gaeilge": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "scottish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "scottish gaelic": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "hebrew": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "finnish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "danish": { stability: 0.7, similarityBoost: 0.9, style: 0.05 },
  "greek": { stability: 0.5, similarityBoost: 0.9, style: 0.4 },
  "slovak": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "swahili": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "zulu": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "colombian spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "mexican spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "costa rican spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "english (south africa)": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
};

// Enhanced model selection for different language families
const getOptimalModel = (language: string): string => {
  const languageModelMap: Record<string, string> = {
    // Multilingual v2 for European languages with complex phonetics
    'icelandic': 'eleven_multilingual_v2',
    'faroese': 'eleven_multilingual_v2',
    'maltese': 'eleven_multilingual_v2',
    'corsican': 'eleven_multilingual_v2',
    'sicilian': 'eleven_multilingual_v2',
    
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
    
    // Default multilingual for others
    default: 'eleven_multilingual_v2'
  };
  
  return languageModelMap[language] || languageModelMap.default;
};

function getClientIdentifier(req: Request) {
  // Prefer authenticated user if available via headers, else fall back to IP
  const auth = req.headers.get("Authorization");
  if (auth && auth.startsWith("Bearer ")) return auth.slice(7, 50); // short hash for anon key
  // Fallback to remote address if available (Deno specific)
  try { return (req as any).conn?.remoteAddr?.hostname ?? "unknown"; } catch { return "unknown"; }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting protection
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
    
    // Enhanced normalize language variants for island countries
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
        "finnish": "finnish",
        "danish": "danish", 
        "greek": "greek",
        "slovak": "slovak",
        "swahili": "swahili",
        "zulu": "zulu",
      };
      return variantMappings[normalized] || normalized;
    };

    // Use culturally appropriate voice and settings for island languages
    const normalizedLanguage = normalizeLanguageVariant(language.toLowerCase());
    const selectedVoiceId = voiceId || NATIVE_VOICES[normalizedLanguage] || NATIVE_VOICES["english"];
    
    // Use island-optimized settings if not specified
    const languageSettings = LANGUAGE_VOICE_SETTINGS[normalizedLanguage] || LANGUAGE_VOICE_SETTINGS["english"];
    const finalStability = stability !== undefined ? stability : languageSettings.stability;
    const finalSimilarityBoost = similarityBoost !== undefined ? similarityBoost : languageSettings.similarityBoost;
    const finalStyle = style !== undefined ? style : languageSettings.style;
    
    // Use optimal model for language family
    const selectedModel = getOptimalModel(normalizedLanguage);
    
    // Enhanced logging for island languages
    console.log(`[TTS] Island Language: ${language} (${normalizedLanguage}) | Voice: ${selectedVoiceId} | Model: ${selectedModel} | Text length: ${text.length}`);

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    
    if (!ELEVENLABS_API_KEY) {
      console.error("[TTS] ❌ ELEVENLABS_API_KEY not found in environment");
      return new Response(JSON.stringify({ error: "ElevenLabs API key not configured. Please add ELEVENLABS_API_KEY to your Supabase edge function secrets." }), { 
        status: 500, 
        headers: corsHeaders 
      });
    }
    
    console.log(`[TTS] ✅ API key found, making request to ElevenLabs with island-optimized settings...`);

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
          model_id: selectedModel, // Use optimal model for language
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
      return new Response(JSON.stringify({ error: errText }), { status: 500, headers: corsHeaders });
    }

    const arrayBuffer = await response.arrayBuffer();
    return new Response(arrayBuffer, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=3600" // Cache for 1 hour
      },
    });
  } catch (err) {
    console.error("[TTS] ElevenLabs Error:", err);
    return new Response(JSON.stringify({ error: "Failed to process TTS request." }), { status: 500, headers: corsHeaders });
  }
});
