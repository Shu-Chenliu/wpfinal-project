import CartProduct from "./components/CartProduct";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { getMyShoppingCart,getMyCoupon , getAddress }from "./components/actions"
import { revalidatePath } from "next/cache";
import ShoppingCartHint from "./components/ShoppingCartHint";


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
      <div className="flex w-full">
        <p className="text-2xl m-2 p-2 font-semibold text-slate-700">My ShoppingCart</p>
          <ShoppingCartHint/>
      </div>
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
            useraddress={address?.address?address?.address:""}
            imageUrl={product.posts.imageUrl!}
          />
        </div>
      ))}
    </div>
  );
}
export default ShoppingCartPage;