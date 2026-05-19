import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";

// Allow streaming responses up to 60 seconds
export const maxDuration = 60;

const messageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().max(4000),
});

const bodySchema = z.object({
  messages: z.array(messageSchema).max(50),
});

const SYSTEM_PROMPT = `You are RouterVia, an expert AI assistant specializing in:
- Router configuration and troubleshooting
- WiFi problems and network diagnostics
- Default router login credentials and admin pages
- Internet connectivity issues
- DNS, IP addressing, and networking concepts

You help users:
1. Diagnose WiFi and internet problems step by step
2. Access their router admin panel (you know default IPs for all major brands)
3. Configure routers (TP-Link, Huawei, ZTE, D-Link, ASUS, Netgear, Linksys, Xiaomi)
4. Fix connectivity, DNS, and speed issues
5. Understand networking concepts in simple language

Key router knowledge:
- TP-Link: 192.168.0.1 or tplinkwifi.net, admin/admin
- Huawei: 192.168.1.1 or 192.168.100.1, admin/admin or telecomadmin/admintelecom
- ZTE: 192.168.1.1, admin/admin
- D-Link: 192.168.0.1, Admin/(blank)
- ASUS: 192.168.1.1 or router.asus.com, admin/admin
- Netgear: 192.168.1.1 or routerlogin.net, admin/password

Rules:
- Always ask clarifying questions to better diagnose the issue
- Give numbered step-by-step instructions
- Be concise but thorough
- If you recommend checking a specific router page, mention the URL
- Use simple, non-technical language unless the user seems technical
- If a problem persists after your suggestions, recommend contacting their ISP`;

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = bodySchema.safeParse(body);

  if (!parsed.success) {
    return new Response("Invalid request body", { status: 400 });
  }

  const result = streamText({
    model: openai("gpt-4o-mini"),
    system: SYSTEM_PROMPT,
    messages: parsed.data.messages,
  });

  return result.toTextStreamResponse();
}
