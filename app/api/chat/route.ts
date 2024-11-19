import { createOllama } from "ollama-ai-provider";
import { streamText } from "ai";
import { cookies } from "next/headers";

const ollama = createOllama();

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: ollama("airene"),
    messages,
  });

  const data = result.toDataStreamResponse();
  return data;
}
