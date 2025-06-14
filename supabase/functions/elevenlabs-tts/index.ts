import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const RATE_LIMIT_WINDOW_MS = 2 * 60 * 1000; // 2 mins
const RATE_LIMIT_MAX_REQUESTS = 5;
const clientRequests: Record<string, { count: number; windowStart: number }> = {};

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
    let { text, voiceId } = body;
    if (typeof text !== "string" || text.trim().length === 0 || text.length > 120) {
      return new Response(JSON.stringify({ error: "Invalid text length." }), { status: 400, headers: corsHeaders });
    }
    // [Additional: Log all TTS usage server-side (no PII!)]
    console.log(`[TTS] Voice: ${voiceId} | Text length: ${text.length} | Client: ${clientId}`);

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");

    const DEFAULT_VOICE_ID = "9BWtsMINqrJLrRacOk9x"; // Aria
    const ELEVENLABS_MODEL_ID = "eleven_multilingual_v2"; // Most natural

    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || DEFAULT_VOICE_ID}`,
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
      },
    });
  } catch (err) {
    console.error("[TTS] ElevenLabs Error:", err);
    return new Response(JSON.stringify({ error: "Failed to process TTS request." }), { status: 500, headers: corsHeaders });
  }
});
