"use server";

import { db } from "@/lib/db";
import { auth } from "@/auth";

const sendMessage = async (payload) => {
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

  return message;
};
export default sendMessage;