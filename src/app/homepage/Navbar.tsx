import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
    
import { BellRing } from 'lucide-react';
    
import { ShoppingCart } from 'lucide-react';
    
import { Store } from 'lucide-react';
    
import { BellPlus } from 'lucide-react';
    
import { Eye } from 'lucide-react';
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
async function Navbar() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username=session.user.username;
  return (
    <nav className="flex w-full flex-col bg-slate-100 pb-10 bg-slate-900">
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-slate-800 pb-2">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            {/* <RxAvatar  /> */}
            <p className="text-slate-100 font-semibold m-2 p-2">Welcome to shopEE, {username}.</p>
          </div>
          
        </div>

      </nav>
      <section className="flex w-full flex-col pt-3 ">
        
          <Link href={"/homepage"}>
            <Button
              className=" w-full my-2 hover:bg-orange-500 m-2"
            >
              <Eye className="m-2" /> View All products
            </Button>
          </Link>

          <Link href={"/homepage/ShoppingCart"}>
            <Button
            className="flex my-2 w-full hover:bg-orange-500 m-2">
              <ShoppingCart className="m-2" /> Shopping Cart
            </Button>
          </Link>

          <Link href={"/homepage/MyMarket"}>
            <Button
            className="flex my-2 w-full hover:bg-orange-500 m-2">
              <Store className="m-2" /> My market
            </Button>
          </Link>
          <Link href={"/homepage/SellerNotifications"}>
            <Button
            className="flex w-full my-2 hover:bg-orange-500 m-2"
            ><BellPlus className="m-2" />Market Notifications </Button>
          </Link>
        

          <Link href={"/homepage/BuyerNotifications"}>
            <Button
            className="flex w-full my-2 hover:bg-orange-500 m-2"
            ><BellRing className="m-2" />Buying Notifications</Button>
          </Link>

          <Link href={"/homepage/Chat"}>
            <Button
            className="flex w-full my-2 hover:bg-orange-500 m-2"
            ><UserRound className="m-2" />Chat</Button>
          </Link> 

          <Link href={"/homepage/MyAccount"}>
            <Button
            className="flex w-full my-2 hover:bg-orange-500 m-2"
            ><UserRound className="m-2" />My account</Button>
          </Link> 
          <Link href={"/homepage/getCoupon"}>
            <Button
            className="flex w-full my-2 hover:bg-orange-500 m-2"
            >Get Coupon</Button>
          </Link> 
          <Link href={`/auth/signout`}>
            <Button
              // variant={"ghost"}
              type={"submit"}
              className="w-full hover:bg-orange-500 m-2"
            >
              Sign Out
            </Button>
          </Link>
      </section>
      
    </nav>
  );
}
export default Navbar;