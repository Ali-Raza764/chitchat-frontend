"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";
import { pusherServer, toPusherKey } from "@/lib/pusher/pusher";

const sendMessage = async (payload) => {
  try {
    const session = await auth();
    if (!session) throw new Error("Not authenticated");

    const { text, chatId } = payload;
    const message = {
      id: Date.now().toString(),
      senderId: session.user.id,
      content: text,
      timestamp: new Date().toISOString(),
    };

    const redisKey = `chat:${chatId}:messages`;

    // Add message to the beginning of the list
    await db.lpush(redisKey, JSON.stringify(message));

    await pusherServer.trigger(toPusherKey(redisKey), "messages", message);

    return {
      status: 200,
      message: "Messaage sent successfully",
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
export default sendMessage;
