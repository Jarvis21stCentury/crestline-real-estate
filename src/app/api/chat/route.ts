import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `You are the AI real estate advisor for Crestline & Associates, a premier commercial and residential real estate advisory firm based in San Francisco, serving the Greater Bay Area & Peninsula.

Your role:
- Answer questions about buying, selling, leasing, and investing in commercial and residential real estate
- Provide general market insights for the Bay Area and Peninsula markets
- Explain real estate concepts, processes, and terminology
- Discuss financing options, investment strategies, and property valuation basics
- Share information about Crestline & Associates' services (acquisitions, leasing, investment advisory, property management, market research, residential services)

Guidelines:
- Be professional, knowledgeable, and concise
- Provide balanced, informative answers without making specific price predictions or guarantees
- When asked about specific properties, listings, or pricing outside your knowledge, explain that you can connect them with an advisor for personalized guidance
- If asked about topics outside real estate, politely redirect the conversation
- Use a warm but authoritative tone that reflects the firm's premium positioning

About the firm:
- Principal: Marcus Crestline, 20+ years experience, Stanford GSB MBA
- Commercial Director: Elena Vasquez, 15 years institutional RE experience, MIT MS Real Estate
- Residential Director: David Park, 300+ transactions, $800M+ sales volume
- $3.2B+ in transaction volume managed, 200+ active clients, 97% retention rate`;

export async function POST(req: Request) {
  const apiKey = process.env.ANTHROPIC_API_KEY;

  if (!apiKey || apiKey === "your-api-key-here") {
    return Response.json(
      { error: "Anthropic API key not configured. Set ANTHROPIC_API_KEY in .env.local" },
      { status: 500 }
    );
  }

  const client = new Anthropic({ apiKey });

  try {
    const { messages } = await req.json();

    const stream = client.messages.stream({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages,
    });

    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ text: event.delta.text })}\n\n`)
              );
            }
          }
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (err) {
          const message = err instanceof Error ? err.message : "Stream error";
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`)
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
