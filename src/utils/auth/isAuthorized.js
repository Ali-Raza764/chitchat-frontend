import { auth } from "@/auth";

const isAuthorized = async (friendId) => {
  const session = await auth();

  if (!session | !session.user.id) {
    return {
      authorized: false,
      status: 500,
      message: "Unauthorized",
      currentUserId: null,
    };
  } else if (!friendId) {
    return {
      authorized: false,
      status: 300,
      message: "Friend Id or Email is missing",
      currentUserId: session.user.id,
    };
  } else {
    return {
      authorized: true,
      status: 200,
      message: "authorized",
      currentUserId: session.user.id,
    };
  }
};
export default isAuthorized