"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
    
import { BellRing, Ticket, LogOut, MessageCircle, MessagesSquare } from 'lucide-react';
    
import { ShoppingCart } from 'lucide-react';
    
import { Store } from 'lucide-react';
    
import { BellPlus } from 'lucide-react';
    
import { Eye } from 'lucide-react';

import { useState } from 'react';
type NavbarLinkProp={
  sellerUnread:number,
  buyerUnread:number,
  shoppingCartLength:number,
}
function NavbarLink({sellerUnread,buyerUnread,shoppingCartLength}:NavbarLinkProp) {

  const[nowPage,setNowPage]=useState("View All product");
  const handleChangeNowPage=(page:string)=>{
    setNowPage(page);
  }

  return (
    <>
          <Link href={"/homepage"}>

            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "View All products" ? 'text-orange-500' : ''}`}
            onClick={() => handleChangeNowPage("View All products")}
            >
            <Eye className="m-2" /> View All products
            </Button>
          </Link>

          <Link href={"/homepage/ShoppingCart"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Shopping Cart" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Shopping Cart")}}
            >
              <ShoppingCart className="m-2" /> Shopping Cart
              <span className="border border-red-600 border-2 m-2 px-1 rounded-full">{shoppingCartLength}</span>
            </Button>
          </Link>

          <Link href={"/homepage/MyMarket"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "My market" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("My market")}}
            >
              <Store className="m-2" /> My market
            </Button>
          </Link>

          <Link href={"/homepage/SellerNotifications"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Market Notifications" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Market Notifications")}}

            ><BellPlus className="m-2" />Market Notifications 
            <span className="border border-red-600 border-2 m-2 px-1 rounded-full">{sellerUnread}</span>
            </Button>
          </Link>
        

          <Link href={"/homepage/BuyerNotifications"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Buying Notifications" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Buying Notifications")}}
            ><BellRing className="m-2" />Buying Notifications
            <span className="border border-red-600 border-2 m-2 px-1 rounded-full">{buyerUnread}</span>
            </Button>
          </Link>

          <Link href={"/homepage/getCoupon"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Get Coupon" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Get Coupon")}}
            ><Ticket className="m-2"/>
              Get Coupon</Button>
          </Link> 

          <Link href={"/homepage/Chat"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Chatroom" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Chatroom")}}
            ><MessagesSquare className="m-2" />Chatroom</Button>
          </Link> 

          <Link href={"/homepage/MyAccount"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "My account" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("My account")}}
            ><UserRound className="m-2" />My account</Button>
          </Link> 
          
          <Link href={`/auth/signout`}>
            <Button
              // variant={"ghost"}
              type={"submit"}
              className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Sign Out" ? 'text-orange-500' : ''}`}
              onClick={() => {handleChangeNowPage("Sign Out")}}
            >
              <LogOut className="m-2"/>
              Sign Out
            </Button>
          </Link>
      </>
      
  );
}
export default NavbarLink;