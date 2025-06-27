import SignInview from "@/modules/sign-in/views/sign-in-view";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (session?.user) return redirect("/chat");

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <SignInview />
    </div>
  );
}
