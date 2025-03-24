// src/app/api/sse/sseManager.ts

const clients = new Map<string, ReadableStreamDefaultController>();

export function sendProgress(sessionId: string, progress: number) {
  const controller = clients.get(sessionId);
  if (controller) {
    const message = JSON.stringify({ progress: Number(progress.toFixed(2)) });
    controller.enqueue(new TextEncoder().encode(`data: ${message}\n\n`));
  }
}

export function sendMessage(sessionId: string, msg: string) {
  const controller = clients.get(sessionId);
  if (controller) {
    const message = JSON.stringify({ message: msg });
    controller.enqueue(new TextEncoder().encode(`data: ${message}\n\n`));
  }
}

export function addClient(
  sessionId: string,
  controller: ReadableStreamDefaultController
) {
  clients.set(sessionId, controller);
}

export function removeClient(sessionId: string) {
  clients.delete(sessionId);
}
