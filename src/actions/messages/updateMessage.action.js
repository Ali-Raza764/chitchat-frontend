"use server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { pusherServer, toPusherKey } from "@/lib/pusher/pusher";

export const updateMessage = async (payload) => {
  const { chatId, messageId, updatedMessage } = payload;
  try {
    // use the chat id and the messageId to change the statusSeen etc or the payload fields and use Pusher to send the update
  } catch (error) {
    throw new Error("Cannot Update message status");
  }
};
