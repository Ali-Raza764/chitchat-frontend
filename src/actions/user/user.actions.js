"use server";
import { signIn, signOut } from "@/auth";

export async function signInWithGoogle() {
  const success = await signIn("google", {
    redirect: true,
    redirectTo: "/profile",
  });
}

export const LogOutUser = async () => {
  try {
    await signOut({
      redirect: true,
      redirectTo: "/",
    });
    return {
      status: 200,
    };
  } catch (err) {
    console.log(err);
    return {
      status: 500,
      message: err.message,
    };
  }
};
