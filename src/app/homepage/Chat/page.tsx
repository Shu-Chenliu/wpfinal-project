

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";

type Props = {
  params: {
    chatRoomId: string;
  };
};
async function NotificationPage({params:{chatRoomId}}: Props) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId=session.user.id;
  return (
    <div className="w-full">
      
    </div>
  );
}
export default NotificationPage;