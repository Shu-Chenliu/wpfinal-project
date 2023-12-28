import { getProduct,addToCart,createChatRoom } from "./components/actions";
import {db}from "@/db";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import AddToCartButton from "./components/AddToCartButton";
import CommentBar from "./components/CommentBar";
import { getComments,getMyShoppingCart,getChatRoom } from "./components/actions";
import { publicEnv } from "@/lib/env/public";
import { ArrowLeft } from 'lucide-react';
import AddChatRoomButton from "./components/AddChatRoomButton";
import { Store } from 'lucide-react';
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
  const userId = session.user.id;
  const username=session.user.username;
  const Product= await getProduct(postId);
  const comments=await getComments(postId);
  const shoppingCart=await getMyShoppingCart(userId);
  const chatRooms=await getChatRoom();
  const liked = false;
  const handleAddToCart = async (userId:string,postId:string)=>{
    "use server";
    await addToCart(userId,postId);
    revalidatePath("/homepage");
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/homepage/ShoppingCart`);
  }
  const handleAddChatRoom =async(userId:string,sellerId:string)=>{
    "use server";
    for(const chatRoom of chatRooms){
      if(chatRoom.buyerName===username&&chatRoom.sellerName===Product?.author.sellername){
        revalidatePath("/homepage");
        redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/homepage/Chat/${chatRoom.displayId}`);
      }
    }
    const newChatRoomId = await createChatRoom(userId,sellerId,Product?.author.username!,username);
    revalidatePath("/homepage/Chat");
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/homepage/Chat/${newChatRoomId}`);
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
            className="flex font-semibold bg-slate-300 hover:bg-slate-400 text-slate-900 hover:text-slate-100"
          ><ArrowLeft />
          </Button>
        </Link>
        {Product?.left!==0 ? (
        <>
        <AddToCartButton 
          addToCart={handleAddToCart} 
          userId={userId?userId:""} 
          postId={postId}
          cartpostId={shoppingCart.map((cart)=>(cart.postId))}
        />
        
        </>
          
        ):(
          <Button
            className="flex font-semibold bg-slate-200 text-slate-100 hover:bg-slate-200 hover:text-slate-100 ml-auto"
    
          >
            Add to cart
          </Button>

        ) 
        }
        
        

      </div>
      
      <div className="flex gap-4">
        <p className="flex font-semibold text-yellow-500 p-2 text-4xl">{Product?.title}</p>
        {Product?.left ===0 && <p className="flex text-4xl font-bold text-red-700" > Sold out!!! </p>}
      </div>

      <div className="flex">
          <img src={imageSrc} alt="Product" className="w-1/4 h-auto" /> 

          {/* <div className="w-full rounded-md p-2 hover:bg-white/10 ">
            {Product?.description}
          </div> */}
          <div className="block mx-5">
            
            <p className="flex w-full font-semibold text-slate-900 ">Category: {Product?.category}</p>
            <p className="flex w-full font-semibold text-slate-900 ">Price: {Product?.price}</p>
            <p className="flex w-full font-semibold text-slate-900 ">Number left: {Product?.left}</p>
            <br /> <br />
            <div className="flex">
              <Store className=" mx-2 mr-5" size={40}/>
              <div className="block">
                <p className="flex w-full font-semibold text-slate-900 ">Market: {Product?.author.username}</p>
                <p className="flex w-full font-semibold text-slate-900 ">Market Address: {"address"}</p>

                
              </div>
              <AddChatRoomButton userId={userId} seller={Product?.author.displayId!} addChatRoom={handleAddChatRoom}/>
              

            </div>
            
          </div>
          

          

      </div>

      <div className="p-2">
        <p className="w-full rounded-md p-2 hover:bg-white/10 overflow-wrap-normal mx-3">
          {Product?.description}
        </p>
        

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
