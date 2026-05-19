export class QueryNormalizationService {
  private static readonly TYPO_MAP: Record<string, string> = {
    "routr": "router",
    "roter": "router",
    "rotuer": "router",
    "tp lnik": "tp-link",
    "tplink": "tp-link",
    "tp link": "tp-link",
    "netger": "netgear",
    "net gear": "netgear",
    "interent": "internet",
    "wify": "wifi",
    "wi-fi": "wifi",
    "passwrd": "password",
    "passowrd": "password",
    "pass word": "password",
    "cnt": "cannot",
    "cant": "cannot",
    "acess": "access",
    "acces": "access",
    "admin oage": "admin page",
    "log in": "login",
    "conect": "connect",
    "conected": "connected",
    "conection": "connection",
    "conecting": "connecting",
    "disconneted": "disconnected",
    "disconectng": "disconnecting",
    "disconect": "disconnect",
    "rebotin": "rebooting",
    "oraneg": "orange",
    "frequncy": "frequency",
    "frequecy": "frequency",
    "modem router": "router",
  };

  private static readonly INTENT_MAP: Record<string, string> = {
    "internet broken": "no internet",
    "wifi issue": "wifi connection problem",
    "router not working": "router down",
    "red light": "red light error",
  };

  /**
   * Normalizes a raw user query before it enters the retrieval cascade.
   * Performs IP sanitation, typo correction, and basic intent mapping.
   */
  public static normalize(rawQuery: string): string {
    if (!rawQuery) return "";

    let normalized = rawQuery.toLowerCase().trim();

    // 0. Digit-lookalike OCR correction
    // Handles cases like "192.168.l.l" or "192.168 l l" where letter l is used as digit 1
    // Applied ONLY within IP-like patterns to avoid corrupting real words
    normalized = normalized.replace(
      /\b(\d{1,3})[.\s](\d{1,3})[.\s]([ol\d]{1,3})[.\s]([ol\d]{1,3})\b/gi,
      (_, a, b, c, d) => `${a}.${b}.${c.replace(/[ol]/gi, "1")}.${d.replace(/[ol]/gi, "1")}`
    );

    // 1. IP Address Normalization
    // Fix common IP format mistakes like "192 168 1 1" or "192.168.01.1"
    normalized = normalized.replace(/\b(\d{1,3})[ ._-](\d{1,3})[ ._-](\d{1,3})[ ._-](\d{1,3})\b/g, "$1.$2.$3.$4");

    // 2. Tokenize and Typo Correction
    let tokens = normalized.split(/\s+/);
    
    // Multi-word typo corrections (e.g. "tp lnik" -> "tp-link")
    // We do a simple string replace for multi-word typos before token-level
    for (const [typo, correction] of Object.entries(this.TYPO_MAP)) {
      if (typo.includes(" ")) {
        // use regex with word boundaries for multi-word
        const regex = new RegExp(`\\b${typo}\\b`, "g");
        normalized = normalized.replace(regex, correction);
      }
    }

    // Re-tokenize after multi-word replace
    tokens = normalized.split(/\s+/);

    // Single-word typo correction
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];
      if (this.TYPO_MAP[token] && !this.TYPO_MAP[token].includes(" ")) {
        tokens[i] = this.TYPO_MAP[token];
      }
    }

    normalized = tokens.join(" ");

    // 3. Intent Expansion / Canonical Mapping
    for (const [intent, canonical] of Object.entries(this.INTENT_MAP)) {
      const regex = new RegExp(`\\b${intent}\\b`, "g");
      normalized = normalized.replace(regex, canonical);
    }

    // 4. Remove excessive whitespace and special chars that break search
    // Keep alphanumeric, dots (for IPs), dashes (for brands)
    normalized = normalized.replace(/[^\w\s.-]/g, "").replace(/\s+/g, " ").trim();

    return normalized;
  }
}
