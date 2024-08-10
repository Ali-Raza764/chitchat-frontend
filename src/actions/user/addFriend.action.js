"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { validateEmail } from "@/lib/validations/validateEmail";

export const addFriend = async (payload) => {
  try {
    const session = await auth();
    if (!session) {
      return {
        status: 401,
        message: "Not Authorized",
      };
    }

    const { email } = payload;

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

    if (friendId === session.user.id) {
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
    await db.sadd(receivedRequestsKey, session.user.id);

    return {
      status: 200,
      message: "Friend request sent successfully",
    };
  } catch (error) {
    console.error("Error in addFriend:", error);
    return {
      status: 500,
      message: "An error occurred: " + error.message,
    };
  }
};

export const confirmFriend = async (payload) => {
  try {
    const session = await auth();
    if (!session) {
      return {
        status: 401,
        message: "Not Authorized",
      };
    }

    const { id: friendId } = payload;

    if (!friendId) {
      return {
        status: 400,
        message: "Friend ID is required",
      };
    }

    const currentUserId = session.user.id;
    if (!currentUserId) {
      return {
        status: 500,
        message: "Current user ID is missing",
      };
    }

    // Remove friend request from received requests
    const receivedRequestsKey = `user:${currentUserId}:receivedRequests`;
    const removalResult = await db.srem(receivedRequestsKey, friendId);

    if (removalResult === 0) {
      return {
        status: 404,
        message: "Friend request not found",
      };
    }

    // Add friend to current user's friend list
    const userFriendsKey = `user:${currentUserId}:friends`;
    await db.sadd(userFriendsKey, friendId);

    // Add current user to friend's friend list
    const friendFriendsKey = `user:${friendId}:friends`;
    await db.sadd(friendFriendsKey, currentUserId);

    return {
      status: 200,
      message: "Friend request confirmed successfully",
    };
  } catch (error) {
    console.error("Error in confirmFriend:", error);
    return {
      status: 500,
      message: "An error occurred: " + error.message,
    };
  }
};

export const denyFriendRequest = async (payload) => {
  try {
    const session = await auth();
    if (!session) {
      return {
        status: 401,
        message: "Not Authorized",
      };
    }

    const { id: friendId } = payload;

    if (!friendId) {
      return {
        status: 400,
        message: "Friend ID is required",
      };
    }

    const currentUserId = session.user.id;
    if (!currentUserId) {
      return {
        status: 500,
        message: "Current user ID is missing",
      };
    }

    //* Deny a Friend Request
    const receivedRequestsKey = `user:${currentUserId}:receivedRequests`;
    const removalResult = await db.srem(receivedRequestsKey, friendId);

    if (removalResult === 0) {
      return {
        status: 404,
        message: "Friend request not found",
      };
    }
    return {
      status: 200,
      message: "Request Denied Successfully",
    };
  } catch (error) {
    console.error("Error in confirmFriend:", error);
    return {
      status: 500,
      message: "An error occurred: " + error.message,
    };
  }
};

export const removeFriend = async () => {
  try {
    const session = await auth();
    if (!session) {
      return {
        status: 401,
        message: "Not Authorized",
      };
    }

    const { id: friendId } = payload;

    if (!friendId) {
      return {
        status: 400,
        message: "Friend ID is required",
      };
    }

    const currentUserId = session.user.id;
    if (!currentUserId) {
      return {
        status: 500,
        message: "Current user ID is missing",
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
    return {
      status: 404,
      message: "An error occurred: " + error.message,
    };
  }
};
