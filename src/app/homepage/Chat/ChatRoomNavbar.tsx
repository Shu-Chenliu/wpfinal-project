import { RxAvatar } from "react-icons/rx";
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
import {getAllChatOfSeller,getAllChatOfBuyer}from "./components/actions"
async function ChatRoomNavbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId=session.user.id;
  const username=session.user.username;
  const chatOfSeller=await getAllChatOfSeller(userId);
  const chatOfBuyer=await getAllChatOfBuyer(userId);
  return (
    <nav className="flex  flex-col pb-10 no-scrollbar w-full">
      <nav className="sticky top-0 flex flex-col items-center justify-between  bg-slate-800 pb-2 ">
        <div className="flex w-full items-center justify-between px-3 py-1 ">
          <div className="flex items-center gap-2">
            {/* <RxAvatar  /> */}
            <p className="text-slate-100 font-semibold mx-2 p-2">(Market/personal) + message</p>
          </div>
          
        </div>

      </nav>
      
      <section className="flex bg-slate-700  flex-col pt-3  justify-center item-center">
        
        
        {chatOfSeller.map((chat)=>(
          <div key={chat.chatRoomId.displayId}>
            <Link href={`/homepage/Chat/${chat.chatRoomId.displayId}`}> 
              <Button className="flex my-2 bg-slate-700 hover:bg-slate-700 hover:text-orange-500 m-2" >
                  {chat.chatRoomId.buyerName}
              </Button>  
            </Link>
          </div>
          
        ))}
        {chatOfBuyer.map((chat)=>(
          <div key={chat.chatRoomId.displayId}>
            <Link href={`/homepage/Chat/${chat.chatRoomId.displayId}`}> 
              <Button className="flex my-2 bg-slate-700 hover:bg-slate-700 hover:text-orange-500 m-2" >
                  {chat.chatRoomId.sellerName}
              </Button>  
            </Link>
          </div>
        ))}

      </section>
      
    </nav>
  );
}
export default ChatRoomNavbar;