import { getProduct,addToCart,createChatRoom } from "./components/actions";
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
import { Store, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import EditProduct from "./components/EditProduct";
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
    const newChatRoomId = await createChatRoom(userId,sellerId,Product?.author.sellername?Product?.author.sellername:"",username);
    revalidatePath("/homepage/Chat");
    redirect(`${publicEnv.NEXT_PUBLIC_BASE_URL}/homepage/Chat/${newChatRoomId}`);
  }
  let imageSrc;
  if(!Product?.imageUrl){
  switch (Product?.category) {
    case "Clothing":
      imageSrc = "/Clothing.jpg";
      break;
    case "Food":
      imageSrc = "/Food.jpg";
      break;
    case "Electronics":
      imageSrc = "/Electronics.jpg";
      break;
    case "EE related":
      imageSrc = "/EE_related.jpg";
      break;
    case "Others":
      imageSrc = "/Others.jpg";
      break;
  }}
  else{
    imageSrc = Product?.imageUrl;
  }
  return (
    <div className={`w-full h-screen ${Product?.left === 0 && "bg-slate-200"}`}      >
      <div className="flex">
        <Link href={"/homepage"}>
          <Button
            className="flex font-semibold bg-slate-200 hover:bg-slate-100 text-slate-900 hover:text-slate-900"
          ><ArrowLeft />
          </Button>
        </Link>
        {!Product&&
          <div className="flex w-full items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-semibold text-slate-700">
                Post has been deleted!!!
              </p>
            </div>
          </div>
        }
        {Product&&Product.left!==0 ? (
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
    
          ><ShoppingCart className="mr-1"/>

            Add to cart
          </Button>

        ) 
        }
      </div>
      
      <div className="flex w-full">
        {userId===Product?.author.displayId?
          <EditProduct editThing="title" title={Product?.title} postId={postId}/>
          :<p className="flex font-semibold text-yellow-500 p-2 text-4xl">{Product?.title}</p>
        }
        {/* <p className="flex font-semibold text-yellow-500 p-2 text-4xl">{Product?.title}</p> */}
        {Product?.left ===0 && <p className="ml-auto w-1/4  flex text-4xl font-bold text-red-700" > Sold out!!! </p>}
      </div>

      <div className="flex">
          <div className="w-1/4 ml-5 h-auto relative">
            <Image
              src={imageSrc!}
              alt="Product"
              fill={true}
              className="object-contain"
            />
          </div>
          
          <div className="block mx-5">
            
            <p className="flex w-full font-semibold text-slate-900 ">Category: {Product?.category}</p>
            <p className="flex w-full font-semibold text-slate-900 ">Price:${Product?.price}/each</p>
            <div className="flex">
            <p className="w-40 font-semibold text-slate-900 ">Number left: </p>

              {userId===Product?.author.displayId?
                <EditProduct editThing="left" left={Product?.left} postId={postId}/>
                :<p className=" font-semibold text-slate-900 ">{Product?.left}</p>
              }
            </div>
            <p className="flex w-full font-semibold text-slate-900 ">Sold: {Product?.sold}</p>

            <br /> <br />
            <div className="flex">
            <Link href={`/homepage/ViewMarket/${Product?.author.displayId}`}>
              <Store className=" mx-2 mr-5 hover:text-yellow-500" size={100}/>
            </Link>
            <div className="block">
              <p className=" flex w-full font-semibold text-slate-900 ">Market: {Product?.author.sellername}</p>
              <p className=" flex w-full font-semibold text-slate-900 ">Market Address: {Product?.author.selleraddress}</p>
              <AddChatRoomButton userId={userId} seller={Product?.author.displayId?Product?.author.displayId:""} addChatRoom={handleAddChatRoom}/>
            </div>
              
              
            </div>
            
            
          </div>
      </div>

      <div className="p-2">
        {/* <p className="w-full rounded-md p-2 hover:bg-white/10 overflow-wrap-normal mx-3">
          {Product?.description}
        </p> */}
        {userId===Product?.author.displayId?
          <EditProduct editThing="description" description={Product?.description?Product?.description:""} postId={postId}/>
          :<p className="w-full rounded-md p-2 hover:bg-white/10 overflow-wrap-normal mx-3">{Product?.description}</p>
        }
        

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
