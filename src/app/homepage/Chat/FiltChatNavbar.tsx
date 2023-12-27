import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
    
import { BellRing, Ticket, LogOut, MessageCircle, MessagesSquare } from 'lucide-react';
    
import { ShoppingCart } from 'lucide-react';
    
import { Store } from 'lucide-react';
    

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";

async function FiltChatNavbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username=session.user.username;
  return (
    <nav className="flex  flex-col bg-slate-100 pb-10 bg-slate-800 no-scrollbar">
      
      <section className="flex  flex-col pt-3 ">
          
            

          <Link href={"/homepage/Chat"}>
            <Button
            className="flex my-2 bg-slate-800 hover:text-orange-500 m-2">
              <Store className="m-2" /> 
            </Button>
          </Link>
          
          <Link href={"/homepage/Chat"}>
            <Button
            className="flex my-2 bg-slate-800 hover:text-orange-500 m-2"
            ><UserRound className="m-2" /></Button>
          </Link> 
          
      </section>
      
    </nav>
  );
}
export default FiltChatNavbar;