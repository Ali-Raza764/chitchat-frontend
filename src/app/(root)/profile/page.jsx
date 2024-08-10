import { auth } from "@/auth";
import LogOutButton from "@/components/auth/LogOutButton";
import ProfileDetails from "./ProfileDetails";

const Profile = async () => {
  const session = await auth();
  console.log(session);

  if (!session) {
    return <div className="text-center text-gray-400">Not signed in</div>;
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-6 bg-gray-900 text-white">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <ProfileDetails session={session} />
        <LogOutButton className="mt-4" />
      </div>
    </div>
  );
};

export default Profile;
