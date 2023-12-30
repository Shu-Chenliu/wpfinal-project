import CartProduct from "./components/CartProduct";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { getMyShoppingCart,getMyCoupon , getAddress }from "./components/actions"
import { revalidatePath } from "next/cache";
import ShoppingCartHint from "./components/ShoppingCartHint";
import { ShoppingCart } from "lucide-react";


async function ShoppingCartPage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const handleGetCoupon = async()=>{
    "use server";
    revalidatePath("/homepage");
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/homepage/getCoupon`);
  }

  const username = session.user.username;
  const userId = session.user.id;
  const Cart=await getMyShoppingCart(userId);
  const Coupons=await getMyCoupon(userId);
  const address=await getAddress(userId);
  return (
    <div className="h-auto">
      
      <div className="flex items-center justify-top text-3xl m-2 p-2  text-yellow-500 hover:text-yellow-600 ">
        <ShoppingCart size={32}/>
        <p className="text-2xl m-2  font-bold text-yellow-500 hover:text-yellow-600">My Shopping Cart</p>
        <ShoppingCartHint/>
      </div>
      {Cart.length===0?
        <div className="flex w-full items-center justify-center h-[75vh]">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg font-semibold text-slate-700">
              Empty Shopping Cart!!!
            </p>
          </div>
        </div>
        :
      (Cart.map((product) =>(
        <div key={product.postId}>
          <CartProduct 
            id={product.posts.id} 
            displayId={product.posts.displayId} 
            category={product.posts.category}
            title={product.posts.title} 
            price={product.posts.price}
            username={username}
            userId={userId}
            seller={product.posts.author.sellername} 
            left={product.posts.left} 
            coupons={Coupons}
            getCoupon={handleGetCoupon}
            useraddress={address?.address?address?.address:""}
            imageUrl={product.posts.imageUrl!}
          />
        </div>
      )))}
    </div>
  );
}
export default ShoppingCartPage;