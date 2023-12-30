import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import NavbarLink from "./NavbarLink";

import HeaderLink from "./HeaderLink";
import {getUnreadNotificationsOfSeller,getUnreadNotificationsOfBuyer, getShoppingCart,getUnreadMessages}from "./actions"
async function Navbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username=session.user.username;
  const userId=session.user.id;
  const userSellerName=session.user.sellerName;
  const unreadNotificationOfSeller=await getUnreadNotificationsOfSeller(userSellerName);
  const unreadNotificationOfBuyer=await getUnreadNotificationsOfBuyer(username);
  const shoppingCart=await getShoppingCart(userId);
  const unreadMessages=await getUnreadMessages(userId);
  return (
    <nav className="flex w-full  flex-col bg-slate-100 pb-10 bg-slate-900">
      <nav className="sticky top-0 flex flex-col items-center justify-between bg-slate-800 pb-2 ">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            {/* <RxAvatar  /> */}
            <HeaderLink username={username}/>
          </div>
          
        </div>

      </nav>
      <section className="flex w-full flex-col pt-3 ">
        <NavbarLink 
          sellerUnread={unreadNotificationOfSeller.length} 
          buyerUnread={unreadNotificationOfBuyer.length} 
          shoppingCartLength={shoppingCart.length}
          unread={unreadMessages}
        />
      </section>
      
    </nav>

  );
}
export default Navbar;