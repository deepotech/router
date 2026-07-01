"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

interface CopyCodeButtonProps {
  contentSelector: string;
}

export default function CopyCodeButton({ contentSelector }: CopyCodeButtonProps) {
  const pathname = usePathname();

  useEffect(() => {
    const container = document.querySelector(contentSelector);
    if (!container) return;

    // Scan strictly inside the scoped container for pre tags
    const preElements = container.querySelectorAll("pre");

    preElements.forEach((pre) => {
      // Skip if already processed or already wrapped
      if (
        pre.querySelector(".copy-button") || 
        pre.parentElement?.classList.contains("pre-wrapper")
      ) {
        return;
      }

      // Check if it contains a code block structure (Prism/MDX style or default)
      const hasCode = pre.querySelector("code") !== null;
      if (!hasCode && !pre.classList.contains("code-block")) {
        // Only target code blocks
        return;
      }

      // Create a relative container wrapper
      const wrapper = document.createElement("div");
      wrapper.className = "relative group pre-wrapper w-full";

      pre.parentNode?.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);

      // Create a sleek copy button
      const button = document.createElement("button");
      button.className = 
        "copy-button absolute top-2.5 right-2.5 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 px-2 py-1 rounded bg-slate-800/80 border border-slate-700/50 text-slate-300 text-[10px] font-bold tracking-wider uppercase hover:bg-slate-700 hover:text-white pointer-events-auto cursor-pointer shadow-md select-none z-10";
      button.innerText = "Copy";

      button.addEventListener("click", (e) => {
        e.preventDefault();

        // Extract raw code text securely
        const codeElement = pre.querySelector("code");
        const codeText = codeElement ? codeElement.innerText : pre.innerText;

        navigator.clipboard.writeText(codeText.trim()).then(() => {
          button.innerText = "Copied!";
          button.classList.add("bg-emerald-800/80", "border-emerald-600", "text-emerald-200");
          button.classList.remove("bg-slate-800/80", "border-slate-700/50", "text-slate-300");

          setTimeout(() => {
            button.innerText = "Copy";
            button.classList.remove("bg-emerald-800/80", "border-emerald-600", "text-emerald-200");
            button.classList.add("bg-slate-800/80", "border-slate-700/50", "text-slate-300");
          }, 2000);
        });
      });

      wrapper.appendChild(button);
    });
  }, [pathname, contentSelector]);

  return null;
}
