import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState,useRef } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import AddCommentDialog from "./AddCommentDialog";
type ConfirmDialogProps={
  open: boolean,
  onClose: ()=>void,
}
export default function ConfirmDialog({open,onClose}:ConfirmDialogProps){
  const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);
  return(
    <>
      <Dialog open={open}>
        <DialogContent
          className="flex flex-col gap-4 w-3/4"
          style={{ width: "500px" }}
        >
          <DialogHeader>
            <DialogTitle>Receive Order</DialogTitle>
            <DialogDescription>Please receive your package</DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            <p className="flex w-full font-semibold text-slate-900">
              Product Name:{"title"}
            </p>
          </div>

          <div className="flex items-center">

            <p className="flex w-full font-semibold text-slate-900">
              Product Description:{"description"}
            </p>

          </div>

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

            <p className="flex w-full font-semibold text-slate-900 " >
              Product Seller:{"seller"}
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
              onClose();
              setOpenNewCommentDialog(true);
            }}
          >
            Receive
          </Button>
          </div>      
        </DialogContent>
      </Dialog>
      <AddCommentDialog open={openNewCommentDialog} onClose={()=>setOpenNewCommentDialog(false)}/>
    </>
  );
}