import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import FiltChatNavbarLink from "./FiltChatNavbarLink";
import {getUserState,getUnreadMessagesOfBuyer,getUnreadMessagesOfSeller} from "./components/actions";
async function FiltChatNavbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId=session.user.id;
  const userstate=await getUserState(userId);
  const unreadMessagesOfBuyer=await getUnreadMessagesOfBuyer(userId);
  const unreadMessagesOfSeller=await getUnreadMessagesOfSeller(userId);
  return (
    <nav className="flex  flex-col bg-slate-100 pb-10 bg-slate-800 no-scrollbar">
      
      <section className="flex  flex-col pt-3 ">

          <FiltChatNavbarLink 
            userstate={userstate?.userChatRoomState?(userstate?.userChatRoomState):"personal"} 
            userId={userId}
            sellerUnread={unreadMessagesOfSeller}
            buyerUnread={unreadMessagesOfBuyer}
          />
      </section>
      
    </nav>
  );
}
export default FiltChatNavbar;