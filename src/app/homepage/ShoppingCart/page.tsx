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
  const username = session.user.username;
  const userId = session.user.id;
  const Cart=await getMyShoppingCart(userId);
  return (
    <div>
      {Cart.map((product) =>(
        <div key={product.postId}>
          <CartProduct 
            id={product.posts.id} 
            displayId={product.posts.displayId} 
            category={product.posts.category}
            title={product.posts.title} 
            price={product.posts.price}
            username={username}
            seller={product.posts.author.username} 
          />
        </div>
      ))}
    </div>
  );
}
export default ShoppingCartPage;