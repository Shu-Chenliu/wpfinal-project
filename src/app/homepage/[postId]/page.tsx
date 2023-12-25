import { getProduct } from "./components/actions";
import {db}from "@/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";



type ProductPageProps = {
  params: {
    postId: string;
  };
};
async function ProductPage({params:{postId}}: ProductPageProps) {
  const session = await auth();
  const username = session?.user?.username;
  const Product= await getProduct(postId);
  const liked = false;


  return (
    <div className="w-full">
      <div className="flex">
        <Link href={"/homepage"}>
              <Button
                className="flex font-semibold hover:bg-orange-700 hover:text-black "
              >Back to homepage
              </Button>
        </Link>
        <Button
        className="flex font-semibold hover:bg-orange-700 hover:text-black "
        >
          Add to cart
        </Button>

        {/* <button
          style={{
            backgroundColor: liked ? 'limegreen  ' : 'gray',
            color: 'white',
            border: 'none',
            padding: '5px 5px',
            textAlign: 'center',
            width: '200px',
            cursor: liked ? 'default' : 'pointer',
          }}
          className="flex items-center gap-1 hover:text-brand rounded "
          
          // onClick={handleClick}
          // disabled={loading}
        >
          <div
            className="flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10"
          >
            <CheckSquare size={18} />
            {liked ? "Added" : "Add to Cart?"}       
          </div>
        </button> */}



      </div>
      
      <div className="flex gap-4">
        <p className="flex w-full font-semibold text-orange-700">{Product?.title}</p>
      </div>
      <div className="flex">
          <img 
          // src="/image/microphone.jpg"
           className="w-1/4 border"/>          
          <p className="w-full rounded-md p-2 hover:bg-white/10">
            {Product?.description}
          </p>
        </div>
      <div>
        <p className="flex w-full font-semibold text-slate-900">Seller: {Product?.author.username}</p>
        <p className="flex w-full font-semibold text-slate-900">Price: {Product?.price}</p>
        <p className="flex w-full font-semibold text-slate-900">Category: {Product?.category}</p>
        <p className="flex w-full font-semibold text-slate-900">Number left: {Product?.left}</p>

      </div>
      
      
    </div>
  );
}

export default ProductPage;
