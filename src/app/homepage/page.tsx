import { BiError } from "react-icons/bi";
import ProductButton from "./ProductButton";
import { auth } from "@/lib/auth";
import {getAllProducts} from "./actions"
async function HomePage() {
  const Products=await getAllProducts();
  return (
    <div className="flex h-[90vh] w-full mg-2 pd-2 flex-wrap">
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
          />
        </div>
      ))}
      <div className="flex flex-col items-center justify-center">
        
      </div>
    </div>
  );
}
export default HomePage;