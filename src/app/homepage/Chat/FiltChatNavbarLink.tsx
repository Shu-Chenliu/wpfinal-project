"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
import { useState } from "react";

import { Store } from 'lucide-react';


function FiltChatNavbarLink() {

  const[nowPage,setNowPage]=useState("Personal");
  const handleChangeNowPage=(page:string)=>{
      setNowPage(page);
  }
  return (
    <nav className="flex  flex-col bg-slate-100 pb-10 bg-slate-800 no-scrollbar">
      
      <section className="flex  flex-col pt-3 ">

          <Link href={"/homepage/Chat"}>
            <Button
            className={`flex my-2 bg-slate-800 hover:bg-slate-800 hover:text-orange-500 m-2 ${nowPage === "Personal" ? 'text-orange-500' : ''}`}
            onClick={() => handleChangeNowPage("Personal")}
            >
                <UserRound className="m-2" />
            </Button>
          </Link> 

          <Link href={"/homepage/Chat"}>
            <Button
            className={`flex my-2 bg-slate-800 hover:bg-slate-800 hover:text-orange-500 m-2 ${nowPage === "Market" ? 'text-orange-500' : ''}`}
            onClick={() => handleChangeNowPage("Market")}            
            >
              <Store className="m-2" /> 
            </Button>
          </Link>
          
      </section>
      
    </nav>
  );
}
export default FiltChatNavbarLink;