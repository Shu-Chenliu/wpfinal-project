import CartProduct from "./components/CartProduct";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import { getMyShoppingCart }from "./components/actions"
async function ShoppingCartPage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session.user.id;
  const Cart=await getMyShoppingCart(userId);
  return (
    <div className="block w-[155vh] h-[90vh] w-full ">
      {Cart.map((product) =>(
        <div key={product.postId}>
          <CartProduct 
            id={product.posts.id} 
            displayId={product.posts.displayId} 
            category={product.posts.category}
            title={product.posts.title} 
            price={product.posts.price}
          />
        </div>
      ))}
      <div className="flex flex-col items-center justify-center">
        
      </div>
    </div>
  );
}
export default ShoppingCartPage;