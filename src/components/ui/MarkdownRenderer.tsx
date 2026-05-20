"use client";

import React from "react";

// ─── Inline Markdown Parser ──────────────────────────────────────────────────
function parseInline(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  while (remaining.length > 0) {
    // Bold + Italic ***text***
    const boldItalic = remaining.match(/^(.*?)\*\*\*(.*?)\*\*\*/);
    if (boldItalic) {
      if (boldItalic[1]) parts.push(<span key={key++}>{parseInline(boldItalic[1])}</span>);
      parts.push(<strong key={key++} className="font-bold italic text-white">{boldItalic[2]}</strong>);
      remaining = remaining.slice(boldItalic[0].length);
      continue;
    }

    // Bold **text**
    const bold = remaining.match(/^(.*?)\*\*(.*?)\*\*/);
    if (bold) {
      if (bold[1]) parts.push(<span key={key++}>{parseInline(bold[1])}</span>);
      parts.push(<strong key={key++} className="font-semibold text-white">{bold[2]}</strong>);
      remaining = remaining.slice(bold[0].length);
      continue;
    }

    // Italic *text*
    const italic = remaining.match(/^(.*?)\*(.*?)\*/);
    if (italic) {
      if (italic[1]) parts.push(<span key={key++}>{italic[1]}</span>);
      parts.push(<em key={key++} className="italic text-neutral-300">{italic[2]}</em>);
      remaining = remaining.slice(italic[0].length);
      continue;
    }

    // Inline code `code`
    const code = remaining.match(/^(.*?)`(.*?)`/);
    if (code) {
      if (code[1]) parts.push(<span key={key++}>{parseInline(code[1])}</span>);
      parts.push(
        <code
          key={key++}
          className="px-1.5 py-0.5 bg-neutral-800 text-blue-300 rounded text-sm font-mono border border-neutral-700"
        >
          {code[2]}
        </code>
      );
      remaining = remaining.slice(code[0].length);
      continue;
    }

    // No more patterns — output remaining as-is
    parts.push(<span key={key++}>{remaining}</span>);
    break;
  }

  return parts;
}

// ─── Block Markdown Parser ───────────────────────────────────────────────────
export function MarkdownRenderer({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // ── Code block ```
    if (line.trimStart().startsWith("```")) {
      const lang = line.replace(/^`+/, "").trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(
        <div key={key++} className="my-4 rounded-xl overflow-hidden border border-neutral-700">
          {lang && (
            <div className="px-4 py-1.5 bg-neutral-800 border-b border-neutral-700 text-xs text-neutral-400 font-mono">
              {lang}
            </div>
          )}
          <pre className="p-4 bg-neutral-900 overflow-x-auto">
            <code className="text-sm text-green-300 font-mono leading-relaxed">
              {codeLines.join("\n")}
            </code>
          </pre>
        </div>
      );
      i++;
      continue;
    }

    // ── Headings
    const h3 = line.match(/^###\s+(.*)/);
    if (h3) {
      elements.push(
        <h3 key={key++} className="text-lg font-semibold text-white mt-6 mb-2">
          {parseInline(h3[1])}
        </h3>
      );
      i++;
      continue;
    }

    const h2 = line.match(/^##\s+(.*)/);
    if (h2) {
      elements.push(
        <h2 key={key++} className="text-xl font-bold text-white mt-8 mb-3 pb-2 border-b border-neutral-800">
          {parseInline(h2[1])}
        </h2>
      );
      i++;
      continue;
    }

    const h1 = line.match(/^#\s+(.*)/);
    if (h1) {
      elements.push(
        <h1 key={key++} className="text-2xl font-bold text-white mt-6 mb-4">
          {parseInline(h1[1])}
        </h1>
      );
      i++;
      continue;
    }

    // ── Blockquote
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <blockquote key={key++} className="my-4 pl-4 border-l-4 border-blue-500 bg-blue-950/30 py-3 pr-4 rounded-r-lg">
          <p className="text-blue-200 text-sm italic">{parseInline(quoteLines.join(" "))}</p>
        </blockquote>
      );
      continue;
    }

    // ── Horizontal rule
    if (line.match(/^[-*_]{3,}$/)) {
      elements.push(<hr key={key++} className="my-6 border-neutral-800" />);
      i++;
      continue;
    }

    // ── Unordered list
    if (line.match(/^[-*+]\s+/)) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].match(/^[-*+]\s+/)) {
        listItems.push(lines[i].replace(/^[-*+]\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-neutral-300">
              <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>{parseInline(item)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // ── Ordered list
    if (line.match(/^\d+\.\s+/)) {
      const listItems: string[] = [];
      let num = 1;
      while (i < lines.length && lines[i].match(/^\d+\.\s+/)) {
        listItems.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
        num++;
      }
      elements.push(
        <ol key={key++} className="my-4 space-y-3">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-neutral-300">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600/80 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                {idx + 1}
              </span>
              <span className="pt-0.5">{parseInline(item)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // ── Empty line → paragraph break
    if (line.trim() === "") {
      i++;
      continue;
    }

    // ── Regular paragraph
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^#{1,3}\s/) &&
      !lines[i].startsWith("```") &&
      !lines[i].match(/^[-*+]\s+/) &&
      !lines[i].match(/^\d+\.\s+/) &&
      !lines[i].startsWith(">") &&
      !lines[i].match(/^[-*_]{3,}$/)
    ) {
      paraLines.push(lines[i]);
      i++;
    }

    if (paraLines.length > 0) {
      elements.push(
        <p key={key++} className="text-neutral-300 leading-relaxed my-3">
          {parseInline(paraLines.join(" "))}
        </p>
      );
    }
  }

  return <div className="markdown-content space-y-1">{elements}</div>;
}
