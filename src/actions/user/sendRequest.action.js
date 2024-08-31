"use server";
import { db } from "@/lib/db";
import { pusherServer, toPusherKey } from "@/lib/pusher/pusher";
import { validateEmail } from "@/lib/validations/validateEmail";
import isAuthorized from "@/utils/auth/isAuthorized";

export const addFriend = async (payload) => {
  try {
    const { email } = payload;
    const { authorized, status, message, currentUserId } = await isAuthorized(
      email
    );

    if (!authorized) {
      return {
        status,
        message,
      };
    }

    if (!validateEmail(email)) {
      return {
        status: 400,
        message: "Invalid email format",
      };
    }

    const friendId = await db.get(`user:email:${email}`);

    if (!friendId) {
      return {
        status: 404,
        message: "User not found",
      };
    }

    if (friendId === currentUserId) {
      return {
        status: 400,
        message: "Cannot send request to yourself",
      };
    }

    //* Check If the user is already the friend then donot send the request
    const isFriendResponse = await db.get(`user:${friendId}:friends`);
    if (isFriendResponse) {
      return {
        status: 401,
        message: "The User is Already Friend",
      };
    }

    //* Send friend request
    const receivedRequestsKey = `user:${friendId}:receivedRequests`;
    await db.sadd(receivedRequestsKey, currentUserId);

    //* Get the user data and send it immediately to the client for realtime changes
    const userData = await db.get(`user:${currentUserId}`);
    await pusherServer.trigger(
      toPusherKey(`user:${friendId}:receivedRequests`),
      "receivedRequests",
      userData
    );

    return {
      status: 200,
      message: "Friend request sent successfully",
    };
  } catch (error) {
   throw new Error("Error occured while sending friend request")
  }
};