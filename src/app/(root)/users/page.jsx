import Link from "next/link";

const UsersPage = () => {
  // return <SearchUser />;
  return (
    <main className="h-full w-full p-6">
      <h1 className="w-full text-center text-3xl font-bold font-sans">
        Check Your Friends
      </h1>
      <div className="flex gap-6 w-full">
        <Link href={"/users/add"}>
          <div className="h-11 w-max text-md font-semibold border p-2 rounded-md bg-white text-black">
            Add Friends
          </div>
        </Link>
        <Link href={"/users/requests"}>
          <div className="h-11 w-max text-md font-semibold border p-2 rounded-md bg-white text-black">
            Check Requests
          </div>
        </Link>
      </div>
    </main>
  );
};

export default UsersPage;
