import { db } from "@/lib/db";
import { auth } from "@/auth";
import Chats from "./Chats";

const SideBarChatComponent = async () => {
  const session = await auth();

  let friends = [];

  try {
    // Assuming friends are stored in a set, use SMEMBERS instead of GET
    const friendIds = await db.smembers(`user:${session.user.id}:friends`);

    // Fetch friend details in parallel
    friends = await Promise.all(
      friendIds.map(async (id) => {
        const userData = await db.get(`user:${id}`);
        return userData;
      })
    );
  } catch (error) {
    console.error("An error occurred while fetching the chats", error);
  }

  return <Chats friends={friends} sessionId={session.user.id} />;
};

export default SideBarChatComponent;
