import SpinningWheel from "./components/SpinningWheel";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
export default async function Home() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SpinningWheel userId={userId}/>
    </main>
  );
}
