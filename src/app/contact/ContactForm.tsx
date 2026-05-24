"use client";

import { useState, FormEvent } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, User, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Category = "technical" | "feedback" | "business";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState<Category>("technical");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setStatus("loading");

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
      setStatus("success");
      setName("");
      setEmail("");
      setCategory("technical");
      setMessage("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-card p-10 text-center animate-fade-in-up">
        <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} className="text-emerald-400" />
        </div>
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">Message Sent!</h2>
        <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
          Thank you for contacting RouterVia. We have received your inquiry and our support team will get back to you within 24–48 hours.
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6 animate-fade-in-up">
      {status === "error" && (
        <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/20 text-red-400 text-sm">
          Something went wrong. Please check your network connection and try again.
        </div>
      )}

      {/* Name Input */}
      <div>
        <label htmlFor="contact-name" className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
          Your Name
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            <User size={16} />
          </div>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] hover:border-[var(--border-strong)] focus:border-[var(--brand-500)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm transition-all focus:outline-none"
          />
        </div>
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="contact-email" className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
          Email Address
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            <Mail size={16} />
          </div>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] hover:border-[var(--border-strong)] focus:border-[var(--brand-500)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm transition-all focus:outline-none"
          />
        </div>
      </div>

      {/* Category Select */}
      <div>
        <label htmlFor="contact-category" className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
          Inquiry Category
        </label>
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
            <HelpCircle size={16} />
          </div>
          <select
            id="contact-category"
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="w-full pl-11 pr-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] hover:border-[var(--border-strong)] focus:border-[var(--brand-500)] rounded-xl text-[var(--text-primary)] text-sm transition-all focus:outline-none appearance-none cursor-pointer"
          >
            <option value="technical">Technical Issue</option>
            <option value="feedback">Feedback</option>
            <option value="business">Business Inquiry</option>
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--text-muted)]">
            ▼
          </div>
        </div>
      </div>

      {/* Message Input */}
      <div>
        <label htmlFor="contact-message" className="block text-xs font-semibold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
          Message
        </label>
        <div className="relative">
          <div className="absolute left-4 top-4 text-[var(--text-muted)]">
            <MessageSquare size={16} />
          </div>
          <textarea
            id="contact-message"
            required
            rows={5}
            placeholder="Describe your issue or feedback in detail..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-[var(--bg-elevated)] border border-[var(--border-default)] hover:border-[var(--border-strong)] focus:border-[var(--brand-500)] rounded-xl text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm transition-all focus:outline-none resize-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        loading={status === "loading"}
        className="py-3.5"
      >
        <Send size={16} /> {status === "loading" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}
