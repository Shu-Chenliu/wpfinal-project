import AddProductDialog from "./components/AddProductDialog";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getAllProductsPostedByUser} from "./components/actions"
import MyMarketProductButton from "./components/MyMarketProductButton";
import MyMarketHint from "./components/MyMarketHint";
import { Store } from "lucide-react";
async function HomePage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userDisplayId = session?.user?.id;
  const ProductsPostedByUser = await getAllProductsPostedByUser(userDisplayId);
  return (

    <div className="flex flex-col h-[90vh] w-full">
      {/* <div className="flex justify-top ">
        <p className=" text-2xl m-2 p-2 font-semibold text-cyan-500">My Market</p>
        <MyMarketHint/>
        <AddProductDialog userDisplayId={userDisplayId} />
      </div> */}

      <div className="flex items-center justify-top text-3xl m-2 p-2  text-cyan-500 hover:text-cyan-600 ">
        <Store size={32}/>
        <p className=" text-2xl m-2 p-2 font-semibold text-cyan-500">My Market</p>
        <MyMarketHint/>
        <AddProductDialog userDisplayId={userDisplayId} />
      </div>

      <div className="flex flex-wrap gap-4 ">
        {ProductsPostedByUser.map((product) => (
          <MyMarketProductButton
            key={product.id}
            id={product.id}
            displayId={product.displayId}
            title={product.title}
            category={product.category}
            price={product.price}
            likes={product.likes}
            left={product.left}
            imageUrl={product.imageUrl!}
          />
        ))}
      </div>
    </div>

  );
}
export default HomePage;