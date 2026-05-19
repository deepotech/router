# NetDoctor AI: SearchGPT & LLM Dominance Strategy

Traditional SEO targets the Google Index. NetDoctor AI targets **Retrieval-Augmented Generation (RAG) Crawlers** (SearchGPT, Perplexity, Gemini, Claude).

To dominate AI search, our pages must function as **Semantic Extraction Nodes**.

## 1. Retrieval-Ready Formatting
AI crawlers do not care about long introductory paragraphs or "fluff." They look for dense, structured data blocks.
- **The "Answer Block" Strategy:** Every problem page begins with the `RetrievalSummary` component. This component outputs `<div class="whitespace-pre-wrap">` containing strict Markdown (Bullet points, bold text, H2s).
- **Semantic Density:** Maintain a high ratio of technical nouns (IP addresses, firmware versions, MAC addresses) to verbs.

## 2. Trust Metadata Exposure
AI search engines use algorithms to rank "Trustworthiness" before citing a source.
- We natively render the `TrustSignals` component on the frontend.
- By exposing `Semantic Trust Score: 92% - AI Governed` directly in the DOM and injecting it into the `TechArticle` JSON-LD schema, we explicitly signal to RAG systems that this dataset is deterministically vetted, increasing citation likelihood.

## 3. Backlink & Embed Strategy (Utility-First)
AI models rank sources higher if they are linked organically. Programmatic SEO sites struggle to get organic backlinks because they lack utility.
- **Action:** Expose the internal tools (Speed Test, DNS Lookup, Router Password Generator) as **embeddable widgets**.
- Provide `<iframe src="...">` code snippets on the tools pages. When tech blogs embed our tools, we gain high-authority utility backlinks, instantly boosting the Domain Authority of the entire Semantic Graph.
