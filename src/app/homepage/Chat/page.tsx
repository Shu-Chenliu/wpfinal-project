

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";

async function NotificationPage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-semibold text-slate-700">
            Select a chatroom to chat!!!
          </p>
        </div>
      </div>
    </div>
  );
}
export default NotificationPage;