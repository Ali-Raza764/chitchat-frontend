"use server";
import { db } from "@/lib/db";
import isAuthorized from "@/utils/auth/isAuthorized";

export const removeFriend = async () => {
  try {
    const { id: friendId } = payload;
    const { authorized, status, message, currentUserId } = await isAuthorized(
      friendId
    );

    if (!authorized) {
      return {
        status,
        message,
      };
    }

    //todo remove the friend Test this endpoint
    const removeUser = await db.srem(`user:${currentUserId}:friends`, friendId);
    const removeFriend = await db.srem(
      `user:${friendId}:friends`,
      currentUserId
    );

    if (removeFriend && removeUser) {
      return {
        status: 200,
        message: "Successfully Removed Friend",
      };
    }
    return {
      status: 500,
      message: "Friend Not Found",
    };
  } catch (error) {
    throw new Error("Cannot remove Friend. An error Occured");
  }
};
