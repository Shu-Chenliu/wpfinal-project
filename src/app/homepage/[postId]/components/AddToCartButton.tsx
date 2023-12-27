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
      console.log("sign in");
      return;
    }
    for(const id of cartpostId){
      console.log(id);
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
      className="flex font-semibold bg-slate-800  hover:bg-orange-700 hover:text-slate-900 ml-auto"
      onClick={()=>handleAddToCart(userId,postId)}
    >
      Add to cart
    </Button>
  );
}