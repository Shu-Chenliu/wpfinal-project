import {getAllNotificationsOfSeller} from "./components/actions"

import SellerNotiBar from "./components/SellerNotiBar"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import Hint from "./components/Hint";

async function Notification() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username = session.user.sellerName;
  const notifications=await getAllNotificationsOfSeller(username);
  return (
    <>
      <div className="flex w-full">
        <p className="text-2xl m-2 p-2 font-semibold text-slate-700">Market Notifications</p>
        <Hint/>
      </div>
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