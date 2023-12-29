"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
import { useState } from "react";

import { Store } from 'lucide-react';
import useUser from "@/hooks/userUsers";
type Props={
  userstate:string,
  userId:string,
}

function FiltChatNavbarLink({userstate,userId}:Props) {
  const {updateUser}=useUser();
  const[nowPage,setNowPage]=useState(userstate);
  const handleChangeNowPage=async(page:string)=>{
    setNowPage(page);
    await updateUser({
      id:userId,
      userChatRoomState:page,
    });
  }
  return (
    <nav className="flex  flex-col bg-slate-100 pb-10 bg-slate-800 no-scrollbar">
      
      <section className="flex  flex-col pt-3 ">

          <Link href={"/homepage/Chat"}>
            {/* <Button
            className={`flex my-2 bg-slate-800 hover:bg-slate-800 hover:text-orange-500 m-2 ${nowPage === "personal" ? 'text-orange-500' : ''}`}
            onClick={() => handleChangeNowPage("personal")}
            > */}
                <UserRound className={`flex bg-slate-800 text-slate-100 hover:bg-slate-800 hover:text-orange-500 m-4 ${nowPage === "personal" ? 'text-orange-500' : ''}`}
            onClick={() => handleChangeNowPage("personal")} />
            {/* </Button> */}
          </Link> 

          <Link href={"/homepage/Chat"}>
            
              <Store 
              className={`flex bg-slate-800 text-slate-100 hover:bg-slate-800 hover:text-orange-500 m-4 ${nowPage === "market" ? 'text-orange-500' : ''}`}
            onClick={() => handleChangeNowPage("market")}   /> 
       
          </Link>
          
      </section>
      
    </nav>
  );
}
export default FiltChatNavbarLink;