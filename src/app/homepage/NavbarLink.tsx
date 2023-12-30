"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
    
import { BellRing, Ticket, LogOut, MessagesSquare } from 'lucide-react';
    
import { ShoppingCart } from 'lucide-react';
    
import { Store } from 'lucide-react';
    
import { BellPlus } from 'lucide-react';
import { Dialog } from "@/components/ui/dialog";
import { DialogContent } from "@/components/ui/dialog";
import { Home } from 'lucide-react';



import { useState } from 'react';
type NavbarLinkProp={
  sellerUnread:number,
  buyerUnread:number,
  shoppingCartLength:number,
  unread:number,
}
function NavbarLink({sellerUnread,buyerUnread,shoppingCartLength,unread}:NavbarLinkProp) {

  const [nowPage,setNowPage]=useState("View All product");
  const [open, setOpen] = useState(false);
  const handleChangeNowPage=(page:string)=>{
    
    setNowPage(page);
  }

  return (
    <>
          <Link href={"/homepage"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "View All products" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("View All products");}}
            >
            <Home className="m-2" /> <span className="max-[1000px]:hidden">View All products</span>
            </Button>
          </Link>

          <Link href={"/homepage/ShoppingCart"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Shopping Cart" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Shopping Cart")}}
            >
              <ShoppingCart className="m-2" /> <span className="max-[1000px]:hidden">Shopping Cart</span>
              <span className=" text-orange-500 hover:text-orange-500  m-2 px-1  rounded-full">{shoppingCartLength}</span>
            </Button>
          </Link>

          <Link href={"/homepage/getCoupon"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Get Coupon" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Get Coupon")}}
            ><Ticket className="m-2"/><span className="max-[1000px]:hidden">Get Coupon</span>
              </Button>
          </Link> 

          <Link href={"/homepage/BuyerNotifications"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Buying Notifications" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Buying Notifications")}}
            ><BellRing className="m-2" /><span className="max-[1000px]:hidden">Buying Notifications</span>
            <span className=" text-orange-500 hover:text-orange-500  m-2 px-1  rounded-full">{buyerUnread}</span>
            </Button>
          </Link>

          

          <Link href={"/homepage/MyMarket"}>
            <Button
            className={`my-2 hover:text-cyan-500 m-2 ${nowPage === "My market" ? 'text-cyan-500' : ''}`}
            onClick={() => {handleChangeNowPage("My market")}}
            >
              <Store className="m-2" /> <span className="max-[1000px]:hidden">My market</span>
            </Button>
          </Link>

          <Link href={"/homepage/SellerNotifications"}>
            <Button
            className={`my-2 hover:text-cyan-500 m-2 ${nowPage === "Market Notifications" ? 'text-cyan-500' : ''}`}
            onClick={() => {handleChangeNowPage("Market Notifications")}}

            ><BellPlus className="m-2" /> <span className="max-[1000px]:hidden">Market Notifications</span>
            <span className=" text-orange-500 hover:text-cyan-500  m-2 px-1  rounded-full">{sellerUnread}</span>
            </Button>
          </Link>

          <Link href={"/homepage/Chat"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Chatroom" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("Chatroom")}}
            ><MessagesSquare className="m-2" /><span className="max-[1000px]:hidden">Chatroom</span>
            <span className=" text-orange-500 hover:text-orange-500  m-2 px-1  rounded-full">{unread}</span>
            </Button>
          </Link> 

          <Link href={"/homepage/MyAccount"}>
            <Button
            className={`my-2 hover:text-orange-500 m-2 ${nowPage === "My account" ? 'text-orange-500' : ''}`}
            onClick={() => {handleChangeNowPage("My account")}}
            ><UserRound className="m-2" /><span className="max-[1000px]:hidden">My account</span></Button>
          </Link> 
          
          <div className="mr-auto">
            <Button
              // variant={"ghost"}
              // type={"submit"}
              className={`my-2 hover:text-orange-500 m-2 ${nowPage === "Sign Out" ? 'text-orange-500' : ''}`}
              onClick={() => setOpen(true)}
            >
              <LogOut className="m-2"/>
              <span className="max-[1000px]:hidden">Sign Out</span>
              {open}
            </Button>
            </div>

            <Dialog open={open}>
            <DialogContent>
              <p className="font-semibold text-lg">Are you sure to sign out?</p>
              <div className="flex w-full justify-end ">
                <Button
                  className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                
                <Link href={`/auth/signout`}>
                  <Button
                    // variant={"ghost"}
                    type={"submit"}
                    className={` bg-slate-800 text-slate-100 hover:text-orange-500  ${nowPage === "Sign Out" ? 'text-orange-500' : ''}`}
                    onClick={() => {handleChangeNowPage("Sign Out")}}
                  >
                    <LogOut className="m-2"/>
                    Sign Out
                  </Button>
                </Link>

              </div>
              
            </DialogContent>
          </Dialog>



      </>
      
  );
}
export default NavbarLink;