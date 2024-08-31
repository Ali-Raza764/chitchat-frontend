import Sidebar from "@/components/shared/SideBar";
import fetchInitialData from "@/lib/fetch/fetchInitialData";
import { Toaster } from "react-hot-toast";
import { auth } from "@/auth";
import StoreInitializer from "@/components/StoreInitializer";
import { redirect } from "next/navigation";
import Loading from "./loading";
import { Suspense } from "react";

export default function ChatLayout({ children }) {
  return (
    <Suspense fallback={<Loading />}>
      <LayoutContent>{children}</LayoutContent>
    </Suspense>
  );
}

async function LayoutContent({ children }) {
  const session = await auth();
  if (!session) redirect("/");
  const data = await fetchInitialData(session.user.id);

  return (
    <Sidebar>
      <Toaster />
      <StoreInitializer initialData={data} currentUser={session.user} />
      {children}
    </Sidebar>
  );
}
