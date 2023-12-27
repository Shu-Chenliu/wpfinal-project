
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
    
import { BellRing, Ticket, LogOut, MessageCircle, MessagesSquare } from 'lucide-react';
    
import { ShoppingCart } from 'lucide-react';
    
import { Store } from 'lucide-react';
    
import { BellPlus } from 'lucide-react';
    
import { Eye } from 'lucide-react';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import NavbarLink from "./NavbarLink";
import {getUnreadNotificationsOfSeller,getUnreadNotificationsOfBuyer}from "./actions"
async function Navbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username=session.user.username;
  const userId=session.user.id;
  const unreadNotificationOfSeller=await getUnreadNotificationsOfSeller(userId);
  const unreadNotificationOfBuyer=await getUnreadNotificationsOfBuyer(userId);

  return (
    <nav className="flex w-full flex-col bg-slate-100 pb-10 bg-slate-900">
      <nav className="sticky top-0 flex flex-col items-center justify-between bg-slate-800 pb-2 ">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            {/* <RxAvatar  /> */}
            <p className="text-slate-100 font-semibold m-2 p-2">Welcome to shopEE, {username}.</p>
          </div>
          
        </div>

      </nav>
      <section className="flex w-full flex-col pt-3 ">
        <NavbarLink sellerUnread={unreadNotificationOfSeller.length} buyerUnread={unreadNotificationOfBuyer.length}/>
      </section>
      
    </nav>

  );
}
export default Navbar;