import { db } from "@/lib/db";
import { createConsistentChatId } from "@/utils/createChatId";

async function fetchInitialData(currentUserId) {
  const friendIds = await db.smembers(`user:${currentUserId}:friends`);

  // Fetch friend details in parallel
  const friends = await Promise.all(
    friendIds.map(async (id) => {
      const userData = await db.get(`user:${id}`);
      return userData;
    })
  );

  // Use Promise.all with map instead of reduce
  const chats = await Promise.all(
    friends.map(async (friend) => {
      const chatId = createConsistentChatId(currentUserId, friend.id);
      const messages = await db.lrange(`chat:${chatId}:messages`, 0, -1);

      return {
        ...friend,
        unseenCount: messages.length,
        messages,
      };
    })
  );

  const requestIds = await db.smembers(
    `user:${currentUserId}:receivedRequests`
  );
  // Fetch user details for each request
  const friendRequests = await Promise.all(
    requestIds.map(async (id) => {
      const userData = await db.get(`user:${id}`);
      return userData;
    })
  );

  return {
    chats,
    friendRequests,
  };
}
export default fetchInitialData;
