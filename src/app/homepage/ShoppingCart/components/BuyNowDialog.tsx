"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRef,useState} from "react";
import useNotifications from "@/hooks/useNotifications"
import useCart from "@/hooks/useCart";
type Props = {
  title:string,
  username:string,
  seller:string,
  money:number,
  postId:string,
  left:number,
  userId:string,
};
function BuyNowDialog({ title,username,seller,money,postId,left,userId}:Props) {
  const [openBuyNowDialog,setOpenBuyNowDialog]=useState(false);
  const [totalPrice,setTotalPrice]=useState(money);
  const {postNotification}=useNotifications();
  const {deleteCart}=useCart();
  const inputRefProductNumber = useRef<HTMLInputElement>(null); 
  const inputRefAddress = useRef<HTMLInputElement>(null);
  
  const handleBuy=async()=>{
    if(!inputRefProductNumber.current||!inputRefAddress.current){
      alert("Please enter something");
      return;
    }
    if(left<parseInt(inputRefProductNumber.current.value)){
      alert("you buy too many");
      return;
    }
    await postNotification({
      text:title,
      buyer:username,
      seller,
      money:totalPrice,
      address:inputRefAddress.current.value,
      postId,
      number:parseInt(inputRefProductNumber.current.value),
    });
    await deleteCart({
      userId,
      postId,
    });
    setOpenBuyNowDialog(false)
  }
  return (
    <>
    <Button 
        className="flex font-semibold hover:bg-orange-700 hover:text-black "
        variant={"outline"}
        onClick={() => setOpenBuyNowDialog(true)}
        >Buy Now
        </Button>
      <Dialog open={openBuyNowDialog}>
      
      {/* <DialogTrigger asChild>
        
      </DialogTrigger> */}
      <DialogContent
        className="flex flex-col gap-4 w-3/4"
        style={{ width: "500px" }}
      >
        <DialogHeader>
          <DialogTitle>View My Order</DialogTitle>
          <DialogDescription>Place your order now. </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900 text-2xl"> {title}</p>
        </div>
        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">Product Image</p>
          {/* <input
            className="flex w-full rounded-md border border-slate-900"
            type="text" //TODO: change to image
            placeholder="Product Image"
          /> */}

        </div>
        <div className="flex items-center">
            <p className="flex w-full font-semibold text-slate-900 " >Price (for each): </p>
            <p>{money}</p>
        </div>

        <div className="flex items-center">
            <p className="flex w-full font-semibold text-slate-900 " >Number to buy</p>
            <Input
              autoFocus
              className="grow"
              placeholder="Product number"
              type="number"
              defaultValue={1}
              ref={inputRefProductNumber}
              onChange={(e)=>setTotalPrice(money*parseInt(e.target.value))}
            />
        </div>
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900 " >Address</p>
          <Input
            autoFocus
            className="grow"
            placeholder="address"
            ref={inputRefAddress}
          />
        </div>
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900">Total Payment</p>
          <p>{totalPrice}</p>
        </div>

        
        </div>

        <div className="flex w-full justify-end ">
        <Button
            className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
            onClick={async() => {setOpenBuyNowDialog(false)}} 
          >
            Close
          </Button>
          <Button 
          className="flex font-semibold hover:bg-orange-700 hover:text-black "
          onClick={handleBuy}
          >
            Place order
          </Button>
        </div>      
      </DialogContent>
    </Dialog>
    </>
  );
}
export default BuyNowDialog;