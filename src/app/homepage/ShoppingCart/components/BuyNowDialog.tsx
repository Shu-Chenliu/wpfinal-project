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

type Props = {

};
function BuyNowDialog() {
  const [openBuyNowDialog,setOpenBuyNowDialog]=useState(false);
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
          <p className="flex w-full font-semibold text-slate-900">Product Name</p>

          
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
            <p className="flex w-full font-semibold text-slate-900 " >Number to buy</p>
            <Input
              autoFocus
              className="grow"
              placeholder="Product number"
              type="number"
              // ref={inputRefProductNumber}
            />
        </div>
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900 " >Address</p>
          <Input
            autoFocus
            className="grow"
            placeholder="address"
          />
        </div>
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900">Total Payment</p>
          <p>{}</p>
        </div>

        
        </div>

        <div className="flex w-full justify-end ">
          <Button 
          className="flex font-semibold hover:bg-orange-700 hover:text-black "
          onClick={() => setOpenBuyNowDialog(false)}
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