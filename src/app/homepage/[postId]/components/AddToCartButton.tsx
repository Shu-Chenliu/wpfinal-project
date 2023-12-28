"use client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

type AddToCartButtonProps={
  addToCart:(userId:string,postId:string)=>void,
  userId:string,
  postId:string,
  cartpostId:string[],
}
export default function AddToCartButton({addToCart,userId,postId,cartpostId}: AddToCartButtonProps){
    const { toast } = useToast()
    const handleAddToCart=async(userId:string,postId:string)=>{
    if(userId===""){
      return;
    }
    for(const id of cartpostId){
      if(id===postId){
        // alert("this item is already in the cart");
        toast({
          variant: "destructive",
          title: " Fail to add to cart ",
          description: "this item is already in the cart",
        })
        return;
      }
    }
    addToCart(userId,postId);
  }
  return(
    <Button
      className="flex font-semibold bg-slate-600  hover:bg-yellow-500 hover:text-slate-700 ml-auto"
      onClick={()=>handleAddToCart(userId,postId)}
    >
      Add to cart
    </Button>
  );
}