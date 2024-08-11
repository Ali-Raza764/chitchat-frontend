import Chat from "./Chat";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

function createConsistentChatId(id1, id2) {
  return [id1, id2]
    .sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" })
    )
    .join("_");
}

const ChattingPage = async ({ params }) => {
  const { friendId } = params;

  const session = await auth();
  if (!session) redirect("/");

  //! This function createConsistentChatId() will always create a same id for two users by using sorting technioques
  const chatId = createConsistentChatId(friendId, session.user.id);

  // Fetch messages from Redis
  const redisKey = `chat:${chatId}:messages`;
  const messagesData = await db.lrange(redisKey, 0, -1);

  const friendData = await db.get(`user:${friendId}`);
  const messages = messagesData.reverse();

  return (
    <Chat
      messages={messages}
      userId={session.user.id}
      friendId={friendId}
      chatId={chatId}
      friendData={friendData}
    />
  );
};

export default ChattingPage;
