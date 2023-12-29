import Link from "next/link";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getAllChatOfSeller,getAllChatOfBuyer}from "./components/actions";
import {getUserState} from "./components/actions";
import LinkButton from "./components/LinkButton";
async function ChatRoomNavbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId=session.user.id;
  const username=session.user.username;
  const sellerName=session.user.sellerName;
  const chatOfSeller=await getAllChatOfSeller(userId);
  const chatOfBuyer=await getAllChatOfBuyer(userId);
  const userstate=await getUserState(userId);
  return (
    <nav className="flex  flex-col pb-10 no-scrollbar w-full">
      <nav className="sticky w-full top-0 flex flex-col items-center justify-center bg-slate-800 max-[500px]:hidden">
          <div className="flex items-center gap-2 ">
            <p className="text-slate-100 font-semibold m-2 p-2 ">
              {userstate?.userChatRoomState === "personal" ? (username) : (sellerName)}'s Chatroom
            </p>
          </div>
      </nav>
      
      <section className="flex bg-slate-700 w-full flex-col pt-3  justify-center item-center">
      {userstate?.userChatRoomState==="market"?    
        (chatOfSeller.map((chat)=>(
          <div key={chat.chatRoomId.displayId}>
            <Link href={`/homepage/Chat/${chat.chatRoomId.displayId}`}> 
              <LinkButton
                buyerName={chat.chatRoomId.buyerName}
                messagesId={chat.chatRoomId.messages.map((message)=>(message.id))}
              /> 
            </Link>
          </div>
          
        )))
        :
        (chatOfBuyer.map((chat)=>(
          <div key={chat.chatRoomId.displayId}>
            <Link href={`/homepage/Chat/${chat.chatRoomId.displayId}`}> 
            <LinkButton
                buyerName={chat.chatRoomId.sellerName}
                messagesId={chat.chatRoomId.messages.map((message)=>(message.id))}
              />  
            </Link>
          </div>
        )))
      }
      </section>
      
    </nav>
  );
}
export default ChatRoomNavbar;