"use client";

import { useChat } from "@ai-sdk/react";
import { UIMessage, DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { Bot, User, Send, AlertTriangle, RefreshCw, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/layout/Breadcrumb";

const breadcrumbs = [{ label: "AI Assistant", href: "/assistant" }];

const PRESETS = [
  "What's the default IP and password for a TP-Link router?",
  "My WiFi says 'Connected but no internet'. How do I fix it?",
  "How do I change my WiFi password on a Huawei router?",
  "My internet is really slow today. What should I check?",
];

// Minimal markdown → HTML converter for AI chat responses
function markdownToHtml(md: string): string {
  return md
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^(\d+)\. (.+)$/gm, "<li>$2</li>")
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul class='list-disc pl-5 my-2 space-y-1'>$1</ul>")
    .replace(/\n\n/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
}

// Extract readable text from a UIMessage's parts array
function getMessageText(message: UIMessage): string {
  return message.parts
    .filter((p) => p.type === "text")
    .map((p) => (p as { type: "text"; text: string }).text)
    .join("");
}

// Initial welcome message conforming to UIMessage shape
const WELCOME_MESSAGE: UIMessage = {
  id: "welcome",
  role: "assistant",
  parts: [
    {
      type: "text",
      text: "Hi! I'm RouterVia. I can help you fix WiFi problems, access your router admin page, or configure your network settings. What issue are you experiencing today?",
    },
  ],
};

export default function AssistantPage() {
  const { messages, sendMessage, status, error, stop, regenerate } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
    messages: [WELCOME_MESSAGE],
  });

  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "streaming" || status === "submitted";
  const canSubmit = input.trim().length > 0 && !isLoading;

  // Auto-scroll to the newest message whenever messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    // sendMessage({ text }) is the correct API for AI SDK v6
    sendMessage({ text });
    setInput("");
  };

  const handlePresetClick = (preset: string) => {
    if (isLoading) return;
    setInput(preset);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col min-h-[calc(100vh-160px)]">
      <Breadcrumb items={breadcrumbs} className="mb-8" />

      {/* Header */}
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

      {/* Chat Card */}
      <div className="flex-1 glass-card flex flex-col overflow-hidden relative">
        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 min-h-[400px] max-h-[600px] custom-scrollbar">

          {messages.map((m) => {
            const text = getMessageText(m);
            const isUser = m.role === "user";

            return (
              <div
                key={m.id}
                className={`flex gap-4 max-w-[85%] ${isUser ? "ml-auto flex-row-reverse" : "mr-auto"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1 ${
                    isUser
                      ? "bg-[var(--bg-hover)] border border-[var(--border-subtle)]"
                      : "bg-[var(--brand-900)] border border-[var(--brand-800)]"
                  }`}
                >
                  {isUser ? (
                    <User size={16} className="text-[var(--text-muted)]" />
                  ) : (
                    <Bot size={16} className="text-[var(--brand-400)]" />
                  )}
                </div>

                {/* Message Bubble */}
                <div
                  className={`rounded-2xl p-4 ${
                    isUser
                      ? "bg-[var(--bg-hover)] border border-[var(--border-subtle)] text-[var(--text-primary)]"
                      : "bg-[var(--bg-elevated)] border border-[var(--border-default)] prose-dark"
                  }`}
                >
                  {isUser ? (
                    <p className="text-sm whitespace-pre-wrap">{text}</p>
                  ) : (
                    <div
                      className="text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }}
                    />
                  )}
                </div>
              </div>
            );
          })}

          {/* Typing Indicator — shown when AI is generating */}
          {isLoading && (
            <div className="flex gap-4 max-w-[85%] mr-auto">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-900)] border border-[var(--brand-800)] flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={16} className="text-[var(--brand-400)]" />
              </div>
              <div className="rounded-2xl p-4 bg-[var(--bg-elevated)] border border-[var(--border-default)] flex items-center gap-2">
                <span
                  className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce"
                  style={{ animationDelay: "0ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce"
                  style={{ animationDelay: "150ms" }}
                />
                <span
                  className="w-2 h-2 rounded-full bg-[var(--brand-500)] animate-bounce"
                  style={{ animationDelay: "300ms" }}
                />
              </div>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="flex gap-4 max-w-[90%] mx-auto">
              <div className="rounded-2xl p-4 bg-red-900/20 border border-red-800/50 flex items-center gap-3 w-full">
                <AlertTriangle size={20} className="text-red-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-red-400 font-semibold mb-1">
                    Something went wrong
                  </p>
                  <p className="text-xs text-[var(--text-secondary)] break-words">
                    {error.message}
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => regenerate()}
                  className="flex-shrink-0"
                >
                  <RefreshCw size={14} />
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-[var(--border-subtle)] bg-[var(--bg-surface)]">
          {/* Preset Suggestions — shown only at conversation start */}
          {messages.length <= 2 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {PRESETS.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  disabled={isLoading}
                  className="text-xs px-3 py-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--brand-700)] transition-colors text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {preset}
                </button>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex gap-3 relative">
            <input
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                // Allow Shift+Enter for newlines; plain Enter submits
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }}
              placeholder="Ask about your router, WiFi, or network issues..."
              disabled={isLoading}
              autoComplete="off"
              className="flex-1 pl-4 pr-12 py-3.5 bg-[var(--bg-base)] border border-[var(--border-default)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-500)] focus:ring-1 focus:ring-[var(--brand-500)] text-sm transition-all shadow-inner disabled:opacity-60"
            />

            {isLoading ? (
              <Button
                type="button"
                variant="danger"
                size="md"
                onClick={stop}
                className="absolute right-2 top-1.5 h-[calc(100%-12px)] rounded-lg px-4"
                title="Stop generation"
              >
                <StopCircle size={16} />
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={!canSubmit}
                className="absolute right-2 top-1.5 h-[calc(100%-12px)] rounded-lg px-4"
                title="Send message"
              >
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
