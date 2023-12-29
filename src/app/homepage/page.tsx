import ProductButton from "./ProductButton";
import {getAllProducts} from "./actions"
import { Ghost } from "lucide-react";
async function HomePage() {
  const Products=await getAllProducts();

  return (
    <>
      <div className="flex flex-col h-[90vh] w-full">
      <div className="flex items-center justify-top text-3xl m-2 p-2 font-bold text-orange-600 hover:text-orange-700 ">
        <Ghost size={32}/>
        <p className="text-3xl m-2  font-bold text-orange-600 hover:text-orange-700">Welcome to shopEE</p>
      </div>

      <div className="flex flex-wrap gap-4 ">
          {Products.map((product)=>(
            <div key={product.id}>
              <ProductButton 
                id={product.id} 
                displayId={product.displayId} 
                title={product.title}
                category={product.category}
                price={product.price}
                likes={product.likes}
                left={product.left}
                imageUrl={product.imageUrl!}

              />
            </div>
            ))}
      </div>
      </div>

    </>

  );
}
export default HomePage;