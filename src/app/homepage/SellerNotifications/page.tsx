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

  <div className="border border-black border-4 w-full mr-4 p-4 flex h-40">
  <div>
    <img src="/image.jpg" alt="Product" className="w-44 h-auto" />
  </div>
  <div className="px-4">
    <div className="mb-4 border">
      <p>product name: {"product name"}</p>
      <p>product number: {"product number"}</p>
      <p>buyer: {"buyer"}</p>
      <p>address: {"address"}</p>
    </div>
  </div>
  <Button
    className="bg-black hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100"
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