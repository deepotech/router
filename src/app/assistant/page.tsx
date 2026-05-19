"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef, useState } from "react";
import { Bot, User, Send, AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const breadcrumbs = [
  { label: "AI Assistant", href: "/assistant" },
];

const PRESETS = [
  "What's the default IP and password for a TP-Link router?",
  "My WiFi says 'Connected but no internet'. How do I fix it?",
  "How do I change my WiFi password on a Huawei router?",
  "My internet is really slow today. What should I check?",
];

export default function AssistantPage() {
  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    // @ts-ignore - type definition mismatch in current ai version
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hi! I'm RouterVia. I can help you fix WiFi problems, access your router admin page, or configure your network settings. What issue are you experiencing today?",
        parts: [
          {
            type: "text",
            text: "Hi! I'm RouterVia. I can help you fix WiFi problems, access your router admin page, or configure your network settings. What issue are you experiencing today?",
          },
        ],
      },
    ],
  });

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    // @ts-ignore - type definition mismatch in current ai version
    sendMessage({ role: "user", content: text, parts: [{ type: "text", text }] });
    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col min-h-[calc(100vh-160px)]">
      <Breadcrumb items={breadcrumbs} className="mb-8" />

      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center animate-pulse-glow">
            <Bot size={20} className="text-[var(--brand-400)]" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[var(--text-primary)]">
            RouterVia Assistant
          </h1>
        </div>
        <p className="text-[var(--text-secondary)]">
          Describe your router or networking problem, and our AI will provide step-by-step fixes.
        </p>
      </div>

      <div className="flex-1 glass-card flex flex-col overflow-hidden relative">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-[400px] max-h-[600px] custom-scrollbar">
          {messages.map((m) => (
            <div key={m.id} className={`flex gap-4 max-w-[85%] ${m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"}`}>
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${
                m.role === "user" ? "bg-[var(--bg-hover)] border border-[var(--border-subtle)]" : "bg-[var(--brand-900)] border border-[var(--brand-800)]"
              }`}>
                {m.role === "user" ? <User size={16} className="text-[var(--text-muted)]" /> : <Bot size={16} className="text-[var(--brand-400)]" />}
              </div>

              {/* Message Bubble */}
              <div className={`rounded-2xl p-4 ${
                m.role === "user"
                  ? "bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                  : "bg-[var(--bg-elevated)] border border-[var(--border-default)] prose-dark"
              }`}>
                {m.role === "user" ? (
                  // @ts-ignore - content property exists in runtime
                  <p className="text-sm whitespace-pre-wrap">{m.content || (m.parts && m.parts[0]?.text)}</p>
                ) : (
                  // @ts-ignore - content property exists in runtime
                  <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: markdownToHtml(m.content || (m.parts && m.parts[0]?.text) || "") }} />
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-4 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={16} className="text-[var(--brand-400)]" />
              </div>
              <div className="rounded-2xl p-4 bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          {error && (
            <div className="flex gap-4 max-w-[85%] mx-auto">
              <div className="rounded-2xl p-4 bg-red-900/20 border border-red-800/50 flex items-center gap-3 w-full">
                <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-red-400 font-semibold mb-1">An error occurred</p>
                  <p className="text-xs text-[var(--text-secondary)]">{error.message}</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => regenerate()}>
                  <RefreshCw size={14} /> Retry
                </Button>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          {/* Presets (only show if few messages) */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setInput(preset)}
                  className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand-700)] transition-colors text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3 relative">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your router, WiFi, or network issues..."
              className="flex-1 pl-4 pr-12 py-3.5 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all shadow-inner"
              disabled={isLoading}
            />
            {isLoading ? (
              <Button type="button" variant="danger" size="md" onClick={stop} className="absolute right-2 top-1.5 h-[calc(100%-12px)] rounded-lg px-4">
                Stop
              </Button>
            ) : (
              <Button type="submit" variant="primary" size="md" disabled={!input.trim()} className="absolute right-2 top-1.5 h-[calc(100%-12px)] rounded-lg px-4">
                <Send size={16} />
              </Button>
            )}
          </form>
          <div className="text-center mt-2">
            <span className="text-[10px] text-[var(--text-muted)]">
              AI can make mistakes. Please verify networking configuration changes.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Minimal markdown converter for AI chat
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/g, "<ol className='list-decimal pl-4 my-2 space-y-1'>$1</ol>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}
