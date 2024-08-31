import { auth } from "@/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import FriendRequests from "./FriendRequests";

const FriendRequestsPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const receivedRequestsKey = `user:${session.user.id}:receivedRequests`;

  const requestIds = await db.smembers(receivedRequestsKey);

  // Fetch user details for each request
  const requests = await Promise.all(
    requestIds.map(async (id) => {
      const userData = await db.get(`user:${id}`);
      return userData;
    })
  );

  return (
    <div>
      <h1 className="text-3xl font-semibold">Incoming Requests</h1>
      <div className="container flex items-center justify-center flex-col p-6">
        <FriendRequests requests={requests} userId={session.user.id} />
      </div>
    </div>
  );
};

export default FriendRequestsPage;
