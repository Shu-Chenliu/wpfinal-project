

import BuyerNotiBar from "./components/BuyerNotiBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { publicEnv } from "@/lib/env/public";
import { getAllNotificationsOfBuyer } from "./components/actions";
import Hint from "./components/Hint";

async function NotificationPage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username=session.user.username;
  
  const userId=session.user.id;
  const notifications=await getAllNotificationsOfBuyer(username);
  const toPostId=async(postId:string)=>{
    "use server";
    revalidatePath("/homepage");
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/homepage/${postId}`);
  }
  return (
    <>
      <div className="flex w-full border">
          <p className="text-2xl m-2 p-2 font-semibold text-slate-700  w-1/2">Buying Notifications</p>
          <Hint/>
        </div>
      {notifications.map((notification)=>(
        <div key={notification.id}>
          <BuyerNotiBar
            id={notification.id}
            postId={notification.post.displayId} 
            title={notification.post.title} 
            left={notification.post.left} 
            author={notification.seller}
            sold={notification.post.sold}
            likes={notification.post.likes}
            userId={userId}
            username={username}
            number={notification.number}
            address={notification.address}
            buyerNumber={notification.post.buyerNumber}
            category={notification.post.category}
            read={notification.readByBuyer}
            imageUrl={notification.post.imageUrl!}
            commented={notification.commented}
            toPostId={toPostId}
          />
        </div>
      ))}
    </>
  );
}
export default NotificationPage;