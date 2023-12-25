import AddProductDialog from "./components/AddProductDialog";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getAllProductsPostedByUser} from "./components/actions"
async function HomePage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userDisplayId = session?.user?.id;
  const ProductsPostedByUser = await getAllProductsPostedByUser(userDisplayId);
  return (
    <div className="flex h-[90vh] w-full ">
      {/* <div className="flex flex-col items-center justify-center">
        <BiError className="text-yellow-500" size={80} />
        <p className="text-sm font-semibold text-slate-700">
          Please select a document to edit
        </p>
      </div> */}
      <div className="flex flex-col items-center justify-top">
        <p className="text-sm font-semibold text-slate-700">
          Welcome to My Market
        </p>

        <AddProductDialog userDisplayId={userDisplayId}/>
        {ProductsPostedByUser.map((product)=>(
          <div key={product.id}>{product.title}</div>
        ))}
      </div>
    </div>
  );
}
export default HomePage;