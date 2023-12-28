

import BuyerNotiBar from "./components/BuyerNotiBar";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { getAllNotificationsOfBuyer } from "./components/actions";
type Props = {

};
async function NotificationPage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username=session.user.username;
  
  const userId=session.user.id;
  const notifications=await getAllNotificationsOfBuyer(username);
  return (
    <>
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
          />
        </div>
      ))}
    </>
  );
}
export default NotificationPage;