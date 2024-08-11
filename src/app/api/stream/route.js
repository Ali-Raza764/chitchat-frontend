import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const chatId = searchParams.get("chatId");
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const sendMessage = async () => {
        const redisKey = `chat:${chatId}:messages`;
        const messagesData = await db.lrange(redisKey, 0, -1);
        const messages = messagesData.reverse();
        console.log(messages);
        
        controller.enqueue(encoder.encode(messages));
      };

      // Send a message immediately
      sendMessage();

      // Send a message every 5 seconds
      // const intervalId = setInterval(sendMessage, 5000);

      // Clean up the interval when the client closes the connection
      // request.signal.addEventListener("abort", () => {
        // clearInterval(intervalId);
        // controller.close();
      // });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
