// src/app/api/sse/route.ts
import { NextRequest } from "next/server";
import { addClient, removeClient } from "./sseManager";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("sessionId");
  if (!sessionId) return new Response("Missing session ID", { status: 400 });

  return new Response(
    new ReadableStream({
      start(controller) {
        addClient(sessionId, controller);
        controller.enqueue(
          new TextEncoder().encode('data: {"status":"connected"}\n\n')
        );

        req.signal.onabort = () => {
          removeClient(sessionId);
          controller.close();
        };
      },
    }),
    {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    }
  );
}
