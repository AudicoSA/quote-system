
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, sessionId, messages } = body;

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: "Message and sessionId are required" },
        { status: 400 }
      );
    }

    // Save user message to database
    await db.chatSession.upsert({
      where: { sessionId },
      update: { updatedAt: new Date() },
      create: {
        sessionId,
        title: message.substring(0, 50),
        status: "active",
      },
    });

    await db.message.create({
      data: {
        sessionId,
        role: "user",
        content: message,
      },
    });

    // Prepare messages for LLM API
    const systemMessage = {
      role: "system",
      content: `You are an expert audio visual consultant with extensive knowledge of AV equipment, setup, installation, and troubleshooting. You provide professional, detailed advice on:

- Audio equipment (speakers, headphones, microphones, audio interfaces, mixers)
- Visual equipment (displays, projectors, cameras, video interfaces)
- AV system integration and setup
- Home theater systems
- Professional recording and streaming setups
- Troubleshooting common AV issues
- Equipment recommendations based on budget and use case
- Installation and configuration guidance

Provide detailed, helpful responses with specific product recommendations when appropriate. Be professional yet approachable, and always consider the user's specific needs and budget constraints. If you need more information to provide better advice, ask clarifying questions.`
    };

    const llmMessages = [
      systemMessage,
      ...messages.slice(-10) // Keep last 10 messages for context
    ];

    // Call LLM API with streaming
    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: llmMessages,
        stream: true,
        max_tokens: 3000,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      throw new Error(`LLM API error: ${response.status}`);
    }

    const encoder = new TextEncoder();
    let assistantResponse = '';

    const readable = new ReadableStream({
      async start(controller) {
        try {
          const reader = response.body?.getReader();
          if (!reader) {
            throw new Error('No response body');
          }

          const decoder = new TextDecoder();
          
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n');
            
            for (const line of lines) {
              if (line.startsWith('data: ')) {
                const data = line.slice(6);
                if (data === '[DONE]') {
                  // Save assistant response to database
                  await db.message.create({
                    data: {
                      sessionId,
                      role: "assistant",
                      content: assistantResponse,
                    },
                  });
                  
                  controller.enqueue(encoder.encode('data: [DONE]\n\n'));
                  controller.close();
                  return;
                }
                
                try {
                  const parsed = JSON.parse(data);
                  const content = parsed.choices?.[0]?.delta?.content || '';
                  if (content) {
                    assistantResponse += content;
                    controller.enqueue(encoder.encode(`data: ${JSON.stringify({content})}\n\n`));
                  }
                } catch (e) {
                  // Skip invalid JSON
                }
              }
            }
          }
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      }
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
      },
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
