import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

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

    const controller = new AbortController();
    const timeout = setTimeout(() => {
      controller.abort();
    }, 8000);

    const response = await fetch(url, {
      cache: "no-store",
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch IP details from ipwho.is: ${response.statusText}`);
    }

    const data = await response.json();

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
