import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from "@ai-sdk/openai";
import { convertToModelMessages, streamText, UIMessage } from "ai";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;
export const dynamic = "force-dynamic";

// ── Helpers ─────────────────────────────────────────────────────────────────────
function extractMessageText(message: UIMessage): string {
  if (!message.parts || !Array.isArray(message.parts)) {
    return "";
  }

  return message.parts
    .filter((part) => part.type === "text")
    .map((part: any) => part.text || "")
    .join(" ")
    .trim();
}

// ── System Prompt ──────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are RouterVia, an expert AI networking assistant and WiFi troubleshooting specialist.
Your goal is to guide users to fix WiFi, router, and internet problems with professional, beginner-friendly, and actionable step-by-step instructions.

You specialize in:
1. Router configuration, administration, and default login credentials.
2. WiFi diagnostics, signal improvement, and resolving connectivity issues.
3. Network concepts like IP addresses, DNS, subnet masks, and DHCP.
4. Advanced recovery, such as router firmware recovery, TFTP flash, and hard factory resets.
5. Explaining complex networking terms in simple, everyday language.

Key router default admin details:
- TP-Link: 192.168.0.1 or tplinkwifi.net, default: admin/admin
- Huawei: 192.168.1.1 or 192.168.100.1, default: admin/admin or telecomadmin/admintelecom
- ZTE: 192.168.1.1, default: admin/admin
- D-Link: 192.168.0.1, default: Admin/(blank)
- ASUS: 192.168.1.1 or router.asus.com, default: admin/admin
- Netgear: 192.168.1.1 or routerlogin.net, default: admin/password
- Linksys: 192.168.1.1, default: admin/admin or admin/(blank)
- Xiaomi: 192.168.31.1, default: (configured during setup)

Rules of engagement:
- **Clarify & Diagnose**: Always ask clarifying questions if the user's issue is ambiguous (e.g., what brand of router they use, what light indicators are on).
- **Step-by-Step Guidance**: Provide numbered, clear, step-by-step instructions.
- **Explicit URLs**: When guiding users to the admin interface, explicitly write the URL/IP (e.g., http://192.168.1.1) as a clear link or plain text.
- **Tone**: Keep it supportive, highly technical but translated to clear, friendly terms. Avoid robotic jargon.
- **ISP Fallback**: If an issue is physical or line-related (e.g., DSL/Fiber line light is solid red/orange), suggest calling their ISP if standard troubleshooting fails.`;

// ── Rate Limiting ─────────────────────────────────────────────────────────────
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 12;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];
  const activeTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (activeTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true; // rate limited
  }

  activeTimestamps.push(now);
  rateLimitMap.set(ip, activeTimestamps);
  return false;
}

// ── RAG Stub ──────────────────────────────────────────────────────────────────
/**
 * Hook to inject relevant troubleshooting documents/articles for future RAG capability.
 * This can query semantic search indices when expanded.
 */
async function injectRAGContext(userQuery: string): Promise<string> {
  // Placeholder for future RAG pipeline using RouterVia internal knowledge base.
  // Can invoke SearchOrchestratorService.search(userQuery) in the future.
  console.log(`[RAG Hook] Analysing query for article injection: "${userQuery.substring(0, 50)}..."`);
  return "";
}

// ── POST Handler ──────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const startTime = Date.now();
  const ip =
    req.headers.get("x-forwarded-for") ||
    req.headers.get("x-real-ip") ||
    "anonymous";

  console.log(`[Chat API] [START] Incoming request from IP: ${ip}`);

  // 1. Rate Limiting
  if (checkRateLimit(ip)) {
    console.warn(`[Chat API] [RATE LIMIT] Rejected request from IP: ${ip}`);
    return new Response(
      JSON.stringify({
        error: "Too many requests. Please wait a minute before sending another message.",
      }),
      { status: 429, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const messages: UIMessage[] = body.messages;

    // 2. Body Validation
    if (!messages || !Array.isArray(messages)) {
      console.warn(`[Chat API] [BAD REQUEST] Invalid messages array.`);
      return new Response(
        JSON.stringify({ error: "Invalid messages array" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 3. Prompt Guards
    if (messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Empty conversation message history is invalid." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const latestMessage = messages[messages.length - 1];
    const latestMessageText = extractMessageText(latestMessage);

    if (!latestMessageText) {
      return new Response(
        JSON.stringify({ error: "Your message content cannot be empty." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (latestMessageText.length > 4000) {
      return new Response(
        JSON.stringify({
          error: "Message length exceeds maximum allowable limit of 4000 characters.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // 4. Provider Selection
    const providerSetting = (process.env.AI_PROVIDER || "gemini").toLowerCase();
    const geminiKey =
      process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
    const openaiKey = process.env.OPENAI_API_KEY;
    const hasGeminiKey = !!geminiKey;
    const hasOpenaiKey = !!openaiKey;

    let selectedModel;
    let providerName = "";

    if (providerSetting === "openai" || (hasOpenaiKey && !hasGeminiKey)) {
      // ── OpenAI / OpenRouter branch ──
      if (!hasOpenaiKey) {
        console.error(
          "[Chat API] [CONFIG ERROR] OpenAI requested but OPENAI_API_KEY is missing!"
        );
        return new Response(
          JSON.stringify({
            error:
              "OpenAI is not configured. Please add your OPENAI_API_KEY environment variable in Railway.",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      const apiKey = openaiKey!;
      const isOpenRouter = apiKey.startsWith("sk-or-");
      providerName = isOpenRouter ? "OpenRouter" : "OpenAI";

      const openaiProvider = createOpenAI({
        apiKey,
        baseURL: process.env.OPENAI_BASE_URL ||
          (isOpenRouter
            ? "https://openrouter.ai/api/v1"
            : "https://api.openai.com/v1"),
        // Pass OpenRouter required headers via the `headers` option
        headers: isOpenRouter
          ? {
              "HTTP-Referer": "https://routervia.com",
              "X-Title": "RouterVia Assistant",
            }
          : undefined,
      });

      selectedModel = openaiProvider("gpt-4o-mini");
    } else {
      // ── Google Gemini branch (default) ──
      if (!hasGeminiKey) {
        console.error(
          "[Chat API] [CONFIG ERROR] Gemini requested but GEMINI_API_KEY / GOOGLE_GENERATIVE_AI_API_KEY is missing!"
        );
        return new Response(
          JSON.stringify({
            error:
              "AI Provider API keys are missing. Please add GEMINI_API_KEY or OPENAI_API_KEY in your Railway environment variables.",
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }

      providerName = "Google Gemini";
      // Note: createGoogleGenerativeAI is the correct export from @ai-sdk/google
      const googleProvider = createGoogleGenerativeAI({
        apiKey: geminiKey,
      });

      selectedModel = googleProvider("gemini-2.5-flash");
    }

    console.log(
      `[Chat API] [PROVIDER] Selected "${providerName}" to service prompt. Messages: ${messages.length}`
    );

    // 5. RAG Context Injection (future capability stub)
    const ragContext = await injectRAGContext(latestMessageText);
    const enrichedSystemPrompt = ragContext
      ? `${SYSTEM_PROMPT}\n\n[RAG TROUBLESHOOTING CONTEXT]\n${ragContext}`
      : SYSTEM_PROMPT;

    // 6. Stream via AI SDK
    const result = streamText({
      model: selectedModel,
      system: enrichedSystemPrompt,
      messages: await convertToModelMessages(messages),
      onChunk({ chunk }) {
        if (chunk.type === "text-delta") {
          // Compact streaming progress indicator
          process.stdout.write(".");
        }
      },
      onFinish(event) {
        const duration = Date.now() - startTime;
        console.log("\n"); // newline after dot stream
        console.log(
          `[Chat API] [FINISH] Provider: ${providerName}. Duration: ${duration}ms. ` +
            `Reason: ${event.finishReason}. Tokens: ${JSON.stringify(event.usage)}`
        );
      },
      onError(error) {
        console.error(
          `\n[Chat API] [STREAM ERROR] Model streaming error:`,
          error
        );
      },
    });

    // 7. Return UI Message Stream Response
    // toUIMessageStreamResponse() produces the SSE protocol that @ai-sdk/react useChat() expects
    return result.toUIMessageStreamResponse();
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(
      `[Chat API] [FATAL] Crash after ${duration}ms:`,
      error
    );
    return new Response(
      JSON.stringify({
        error:
          "A critical server error occurred while generating the assistant response.",
        details: error instanceof Error ? error.message : String(error),
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
