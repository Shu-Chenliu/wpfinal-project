"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { Input } from "@/components/ui/input";

type Props = {

};
function Notification() {
  const [openNewCheckDialog, setOpenNewCheckDialog] = useState(false);
  return (
    <>
    <div className="border border-black p-4 flex justify-top">
      <div>
        {/* <img src="/image.jpg" className="w-32 h-auto" /> */}
      </div>
      <div className="flex-grow px-4">
        <div className="mb-4">
          <span>product name: {"product name"}</span>
          <span>product number: {"product number"}</span>
        </div>
        <div>
          <span>buyer: {"buyer"}</span>
          <span>address: {"address"}</span>
        </div>
      </div>


      <Button
        className="w-full bg-black hover:bg-orange-500 text-white font-bold py-2 px-4 rounded-md transition duration-300"
        onClick={() => setOpenNewCheckDialog(true)}
      >
        Check Order
      </Button>
    </div>

    <Dialog open={openNewCheckDialog}>

      <DialogContent
        className="flex flex-col gap-4 w-3/4"
        style={{ width: "500px" }}
      >
        <DialogHeader>
          <DialogTitle>Check Order</DialogTitle>
          <DialogDescription>Please check your order</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900">
            Product Name:{"title"}
          </p>
        </div>

        {/* <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">Product description</p>
          <textarea
            className="bg-white/0 p-2 w-full outer-glow border border-slate-500 rounded-md"
            autoFocus
            placeholder="Product description"
          />
        </div> */}

        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">
            Product Category:{"category"}
          </p>

        </div>

        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">
            Product Price:{"price"}
          </p>

        </div>

        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900 " >
            Product number:{"orderNumber"}
          </p>

        </div>

        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">Product Image</p>
          {/* <input
            className="flex w-full rounded-md border border-slate-900"
            type="text" //TODO: change to image
            placeholder="Product Image"
          /> */}

        </div>
        </div>

        <div className="flex w-full justify-end ">
        <Button
          className="text-sm font-semibold text-slate-100 bg-slate-700 hover:bg-orange-400"
          onClick={async() => {
            // await handleCheckOrder();
            setOpenNewCheckDialog(false);
          }}
        >
          Check
        </Button>

        </div>      
      </DialogContent>
    </Dialog>
    </>
  );
}
export default Notification;