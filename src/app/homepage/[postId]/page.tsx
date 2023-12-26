import { getProduct,addToCart } from "./components/actions";
import {db}from "@/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddToCartButton from "./components/AddToCartButton";
import CommentBar from "./components/CommentBar";
import { getComments,getMyShoppingCart } from "./components/actions";
import { publicEnv } from "@/lib/env/public";
type ProductPageProps = {
  params: {
    postId: string;
  };
};
async function ProductPage({params:{postId}}: ProductPageProps) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const userId = session?.user?.id;
  const Product= await getProduct(postId);
  const comments=await getComments(postId);
  const shoppingCart=await getMyShoppingCart(userId);
  const liked = false;
  const handleAddToCart = async (userId:string,postId:string)=>{
    "use server";
    await addToCart(userId,postId);
  }
  let imageSrc;

  switch (Product?.category) {
    case "Clothing":
      imageSrc = "../../Clothing.jpg";
      break;
    case "Food":
      imageSrc = "../../Food.jpg";
      break;
    case "Electronics":
      imageSrc = "../../Electronics.jpg";
      break;
    case "EE related":
      imageSrc = "../../EE_related.jpg";
      break;
    case "Others":
      imageSrc = "../../Others.jpg";
      break;
  }
  return (
    <div className="w-full">
      <div className="flex">
        <Link href={"/homepage"}>
          <Button
            className="flex font-semibold bg-slate-800 hover:bg-orange-700 hover:text-slate-900 "
          >Back to homepage
          </Button>
        </Link>
        <AddToCartButton 
          addToCart={handleAddToCart} 
          userId={userId?userId:""} 
          postId={postId}
          cartpostId={shoppingCart.map((cart)=>(cart.postId))}
        />

      </div>
      
      <div className="flex gap-4">
        <p className="flex w-full font-semibold text-orange-700 p-2 text-4xl">{Product?.title}</p>
      </div>

      <div className="flex">
          <img src={imageSrc} alt="Product" className="w-1/4 h-auto" />

          {/* <div className="w-full rounded-md p-2 hover:bg-white/10 ">
            {Product?.description}
          </div> */}

          <p className="w-full rounded-md p-2 hover:bg-white/10 overflow-wrap-normal">
            {Product?.description}
          </p>

      </div>

      <div className="p-2">
        <p className="flex w-full font-semibold text-slate-900">Seller: {Product?.author.username}</p>
        <p className="flex w-full font-semibold text-slate-900">Price: {Product?.price}</p>
        <p className="flex w-full font-semibold text-slate-900">Category: {Product?.category}</p>
        <p className="flex w-full font-semibold text-slate-900">Number left: {Product?.left}</p>

      </div>
      {comments.map((comment)=>(
        <div key={comment.id}>
          <CommentBar text={comment.text!} stars={comment.stars} author={comment.author}/>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;
