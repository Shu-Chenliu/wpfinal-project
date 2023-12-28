import {getAllNotificationsOfSeller} from "./components/actions"
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import SellerNotiBar from "./components/SellerNotiBar"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
type Props = {

};
async function Notification() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username = session.user.sellerName;
  const notifications=await getAllNotificationsOfSeller(username);
  return (
    <>
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
          />
        </div>
      ))}
    </>
  );
}
export default Notification;