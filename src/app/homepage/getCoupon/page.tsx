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
        <Radius className="text-yellow-500 hover:text-yellow-600" size={32}/>
        <p className="text-3xl m-2 p-2 font-bold text-yellow-500 hover:text-yellow-600">Lucky Spin Wheel</p>
        
      </div>
      <br/><br/>
      <SpinningWheel userId={userId}/>
    </main>
  );
}