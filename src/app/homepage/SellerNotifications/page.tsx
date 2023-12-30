import {getAllNotificationsOfSeller} from "./components/actions"

import SellerNotiBar from "./components/SellerNotiBar"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import Hint from "./components/Hint";
import { BellPlus } from "lucide-react";

async function Notification() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username = session.user.sellerName;
  const notifications=await getAllNotificationsOfSeller(username);
  return (
    <>
      <div className="flex items-center justify-top text-3xl m-2 p-2  text-cyan-500 hover:text-cyan-600 ">
        <BellPlus size={32}/>
        <p className="text-2xl m-2  font-bold text-cyan-500 hover:text-cyan-600">Market Notifications</p>
        <Hint/>
      </div>
      {notifications.length===0&&
        <div className="flex w-full items-center justify-center h-[75vh]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-slate-700">
              No Market Notification!!!
            </p>
          </div>
        </div>
      }
      {notifications.map((notification)=>(
        <div key={notification.id}>
          <SellerNotiBar 
            id={notification.id}
            text={notification.text} 
            buyer={notification.buyer} 
            money={notification.money} 
            address={notification.address}
            category={notification.post.category}
            read={notification.readBySeller}
            left={notification.post.left}
            imageUrl={notification.post.imageUrl!}
            number={notification.number}
            postId={notification.post.displayId}
            sold={notification.post.sold}
            buyerNumber={notification.post.buyerNumber}
          />
        </div>
      ))}
    </>
  );
}
export default Notification;