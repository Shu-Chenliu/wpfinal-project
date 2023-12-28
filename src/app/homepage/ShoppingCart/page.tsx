import CartProduct from "./components/CartProduct";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { getMyShoppingCart,getMyCoupon , getAddress }from "./components/actions"
import { revalidatePath } from "next/cache";


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
    <div className="h-[100vh]">
      <p className="flex font-semibold text-slate-900 text-2xl p-3">My Shopping Cart</p>
      {Cart.map((product) =>(
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
            useraddress={address?.address!}
          />
        </div>
      ))}
    </div>
  );
}
export default ShoppingCartPage;