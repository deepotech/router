import { NextRequest, NextResponse } from "next/server";
import net from "net";

export async function GET(request: NextRequest) {
  const host = request.nextUrl.searchParams.get("host");
  const portStr = request.nextUrl.searchParams.get("port");

  if (!host || !portStr) {
    return NextResponse.json({ error: "Missing host or port" }, { status: 400 });
  }

  const port = parseInt(portStr);
  if (isNaN(port) || port < 1 || port > 65535) {
    return NextResponse.json({ error: "Invalid port" }, { status: 400 });
  }

  const open = await new Promise<boolean>((resolve) => {
    const socket = new net.Socket();
    const timeout = 3000;

    socket.setTimeout(timeout);
    socket.once("connect", () => { socket.destroy(); resolve(true); });
    socket.once("error", () => { socket.destroy(); resolve(false); });
    socket.once("timeout", () => { socket.destroy(); resolve(false); });

    socket.connect(port, host);
  });

  return NextResponse.json({ host, port, open });
}
