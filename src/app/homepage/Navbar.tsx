import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserRound } from 'lucide-react';
    
import { BellRing } from 'lucide-react';
    
import { ShoppingCart } from 'lucide-react';
    
import { Store } from 'lucide-react';
    
import { BellPlus } from 'lucide-react';
    
import { Eye } from 'lucide-react';
    
async function Navbar() {

  return (
    <nav className="flex w-full flex-col bg-slate-100 pb-10 bg-slate-900">
      <nav className="sticky top-0 flex flex-col items-center justify-between border-b bg-slate-800 pb-2">
        <div className="flex w-full items-center justify-between px-3 py-1">
          <div className="flex items-center gap-2">
            <RxAvatar />
          </div>
          <Link href={`/auth/signout`}>
            <Button
              // variant={"ghost"}
              type={"submit"}
              className="hover:bg-orange-500"
            >
              Sign Out
            </Button>
          </Link>
        </div>

      </nav>
      <section className="flex w-full flex-col pt-3 ">
        
          <Link href={"/homepage"}>
            <Button
              className=" w-full my-2  hover:bg-orange-500 m-2"
            >
              <Eye /> View All products
            </Button>
          </Link>

          <Link href={"/homepage/ShoppingCart"}>
            <Button
            className="flex my-2 w-full hover:bg-orange-500 m-2">
              <ShoppingCart /> Shopping Cart
            </Button>
          </Link>

          <Link href={"/homepage/MyMarket"}>
            <Button
            className="flex my-2 w-full hover:bg-orange-500 m-2">
              <Store /> My market
            </Button>
          </Link>
          <Link href={"/homepage/SellerNotifications"}>
            <Button
            className="flex w-full my-2 hover:bg-orange-500 m-2"
            ><BellPlus />Notifications for Seller</Button>
          </Link>
        

          <Link href={"/homepage/BuyerNotifications"}>
            <Button
            className="flex w-full my-2 hover:bg-orange-500 m-2"
            ><BellRing />Notifications for buyer</Button>
          </Link>

          <Link href={"/homepage/MyAccount"}>
            
            <Button
            className="flex w-full my-2 hover:bg-orange-500 m-2"
            ><UserRound />My account</Button>
          </Link>     
      </section>
    </nav>
  );
}
export default Navbar;