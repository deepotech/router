import { NextResponse } from "next/server";
import https from "https";

export const dynamic = "force-dynamic";

function fetchIpDetails(url: string, timeoutMs: number = 8000): Promise<any> {
  return new Promise((resolve, reject) => {
    const req = https.get(
      url,
      {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        }
      },
      (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to fetch IP details: HTTP ${res.statusCode}`));
          return;
        }

        let rawData = "";
        res.on("data", (chunk) => { rawData += chunk; });
        res.on("end", () => {
          try {
            const parsedData = JSON.parse(rawData);
            resolve(parsedData);
          } catch (e) {
            reject(new Error("Failed to parse JSON response from ipwho.is"));
          }
        });
      }
    );

    const timeout = setTimeout(() => {
      req.destroy();
      reject(new Error("IP check request timed out"));
    }, timeoutMs);

    req.on("error", (err) => {
      clearTimeout(timeout);
      reject(err);
    });

    req.on("close", () => {
      clearTimeout(timeout);
    });
  });
}

export async function GET(request: Request) {
  try {
    const forwardedFor = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    const clientIp = forwardedFor?.split(",")[0]?.trim() || realIp || "";
    const normalizedIp = clientIp.replace("::ffff:", "");

    const isLocalOrInvalid =
      !normalizedIp ||
      normalizedIp === "127.0.0.1" ||
      normalizedIp === "::1" ||
      normalizedIp === "anonymous";

    const url = isLocalOrInvalid
      ? "https://ipwho.is/"
      : `https://ipwho.is/${normalizedIp}`;

    console.log(`[IP API] Fetching location data for IP: "${normalizedIp || "local"}" (URL: ${url})`);

    const data = await fetchIpDetails(url, 8000);

    if (data.success === false) {
      throw new Error(`ipwho.is API error: ${data.message || "Unknown error"}`);
    }

    // Temporary Railway debugging log (matches the plan)
    console.log("IP API RESPONSE:", {
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      isp: data.connection?.isp,
    });

    return NextResponse.json({
      ip: data.ip,
      city: data.city,
      region: data.region,
      country: data.country,
      isp: data.connection?.isp || data.connection?.org || "N/A",
      timezone: data.timezone?.id || "N/A",
    });
  } catch (error) {
    console.error("IP CHECK ERROR:", error);
    return NextResponse.json(
      { error: "Unable to retrieve IP information right now. Please try again in a few seconds." },
      { status: 500 }
    );
  }
}
