"use client";
import { Button } from "@/components/ui/button";
type AddToCartButtonProps={
  addToCart:(userId:string,postId:string)=>void,
  userId:string,
  postId:string,
}
export default function AddToCartButton({addToCart,userId,postId}: AddToCartButtonProps){
  const handleAddToCart=async(userId:string,postId:string)=>{
    if(userId===""){
      console.log("sign in");
      return;
    }
    addToCart(userId,postId);
  }
  return(
    <Button
      className="flex font-semibold hover:bg-orange-700 hover:text-black ml-auto"
      onClick={()=>handleAddToCart(userId,postId)}
    >
      Add to cart
    </Button>
  );
}