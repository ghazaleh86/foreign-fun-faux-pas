
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 mins
const RATE_LIMIT_MAX_REQUESTS = 5;
const clientRequests: Record<string, { count: number; windowStart: number }> = {};

// Native voice mappings for better language support
const NATIVE_VOICES = {
  "german": "2EiwWnXFnvU5JabPnv8n", // Clyde - warm German-friendly voice
  "spanish": "ErXwobaYiN019PkySvjV", // Antoni - warm Spanish-friendly voice
  "french": "pNInz6obpgDQGcFmaJgB", // Rachel - clear French pronunciation
  "japanese": "EXAVITQu4vr4xnSDxMaL", // Sarah - clear Japanese pronunciation
  "italian": "AZnzlk1XvdvUeBnXmlld", // Domi - confident Italian voice
  "portuguese": "29vD33N1CtxCmqQRPOHJ", // Drew - natural Portuguese voice
  "dutch": "D38z5RcWu1voky8WS1ja", // Fin - friendly Dutch voice
  "swedish": "CYw3kZ02Hs0563khs1Fj", // Dave - conversational Swedish voice
  "norwegian": "CYw3kZ02Hs0563khs1Fj", // Dave - Swedish voice works for Norwegian
  "arabic": "ErXwobaYiN019PkySvjV", // Antoni - works well for Arabic
  "chinese": "EXAVITQu4vr4xnSDxMaL", // Sarah - clear pronunciation for Chinese
  "english": "pNInz6obpgDQGcFmaJgB", // Rachel - default English
};

// Language-optimized voice settings
const LANGUAGE_VOICE_SETTINGS = {
  "german": { stability: 0.6, similarityBoost: 0.9, style: 0.1 },
  "spanish": { stability: 0.4, similarityBoost: 0.9, style: 0.3 },
  "french": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "japanese": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "italian": { stability: 0.5, similarityBoost: 0.9, style: 0.4 },
  "portuguese": { stability: 0.6, similarityBoost: 0.8, style: 0.3 },
  "dutch": { stability: 0.6, similarityBoost: 0.8, style: 0.2 },
  "swedish": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "norwegian": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
  "arabic": { stability: 0.6, similarityBoost: 0.9, style: 0.3 },
  "chinese": { stability: 0.7, similarityBoost: 0.7, style: 0.1 },
  "english": { stability: 0.5, similarityBoost: 0.8, style: 0.2 },
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
    
    // Use native voice for language if not specified
    const normalizedLanguage = language.toLowerCase();
    const selectedVoiceId = voiceId || NATIVE_VOICES[normalizedLanguage] || NATIVE_VOICES["english"];
    
    // Use language-optimized settings if not specified
    const languageSettings = LANGUAGE_VOICE_SETTINGS[normalizedLanguage] || LANGUAGE_VOICE_SETTINGS["english"];
    const finalStability = stability !== undefined ? stability : languageSettings.stability;
    const finalSimilarityBoost = similarityBoost !== undefined ? similarityBoost : languageSettings.similarityBoost;
    const finalStyle = style !== undefined ? style : languageSettings.style;
    
    // [Additional: Log all TTS usage server-side (no PII!)]
    console.log(`[TTS] Language: ${language} | Voice: ${selectedVoiceId} | Text length: ${text.length} | Client: ${clientId}`);

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    // Use the better quality multilingual model
    const ELEVENLABS_MODEL_ID = "eleven_multilingual_v2";

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
          model_id: ELEVENLABS_MODEL_ID,
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
