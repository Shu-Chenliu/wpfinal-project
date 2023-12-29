import SpinningWheel from "./components/SpinningWheel";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { Radius } from 'lucide-react';

export default async function Home() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  return (
    <main className="flex flex-col  justify-between pt-5 pl-8">
      <div className="flex items-center">
        <p className="text-3xl m-2 p-2 font-bold text-slate-700">Lucky Spin Wheel</p>
        <Radius size={32}/>
      </div>
      <br/><br/>
      <SpinningWheel userId={userId}/>
    </main>
  );
}