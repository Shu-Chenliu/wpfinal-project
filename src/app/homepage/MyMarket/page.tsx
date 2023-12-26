import AddProductDialog from "./components/AddProductDialog";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getAllProductsPostedByUser} from "./components/actions"
import MyMarketProductButton from "./components/MyMarketProductButton";
async function HomePage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userDisplayId = session?.user?.id;
  const ProductsPostedByUser = await getAllProductsPostedByUser(userDisplayId);
  return (
    <div className="flex h-[90vh] w-full ">

      <div className="block items-center justify-top">
        <p className="text-sm font-semibold text-slate-700">
          Welcome to My Market
        </p>

        <AddProductDialog userDisplayId={userDisplayId}/>
        <div className="flex flex-col h-[90vh] w-full mg-2 pd-2 flex-wrap">
        {ProductsPostedByUser.map((product)=>(
          <div key={product.id}>
            <MyMarketProductButton
              id={product.id} 
              displayId={product.displayId} 
              title={product.title}
              category={product.category}
              price={product.price}
              likes={product.likes}
            />
          </div>
        ))}

        </div>

      </div>
    </div>
  );
}
export default HomePage;