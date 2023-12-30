

import BuyerNotiBar from "./components/BuyerNotiBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { publicEnv } from "@/lib/env/public";
import { getAllNotificationsOfBuyer } from "./components/actions";
import Hint from "./components/Hint";
import { BellRing } from "lucide-react";

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
    

      <div className="flex items-center justify-top text-3xl m-2 p-2  text-yellow-500 hover:text-yellow-600 ">
        <BellRing size={32}/>
        <p className="text-2xl m-2  font-bold text-yellow-500 hover:text-yellow-600">Buying Notifications</p>
        <Hint/>
      </div>
      {notifications.length===0&&
        <div className="flex w-full items-center justify-center h-[75vh]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-slate-700">
              No Notification
            </p>
          </div>
        </div>
      }
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