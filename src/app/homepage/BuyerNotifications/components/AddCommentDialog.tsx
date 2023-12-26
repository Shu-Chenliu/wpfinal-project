import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState,useRef } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
type ConfirmDialogProps={
  open: boolean,
  onClose: ()=>void,
}
export default function ConfirmDialog({open,onClose}:ConfirmDialogProps){
  const inputRefProductComment = useRef<HTMLTextAreaElement>(null);
  const [liked,setLiked]=useState(0);
  const handleAddComment = async()=>{
    onClose();
  }
  return(
    <Dialog open={open}>
      <DialogContent
        className="flex flex-col gap-4 w-3/4"
        style={{ width: "500px" }}
      >
        <DialogHeader>
          <DialogTitle>Comment Product</DialogTitle>
          <DialogDescription>Please comment the product you receive</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900">
            Product Name:{"title"}
          </p>
        </div>

        <div className="flex">
        <button className="flex" onClick={()=>{setLiked(1)}}>
          {(liked>=1)?<Star fill="yellow" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
        <button className="flex" onClick={()=>{setLiked(2)}}>
          {(liked>=2)?<Star fill="yellow" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
        <button className="flex" onClick={()=>{setLiked(3)}}>
          {(liked>=3)?<Star fill="yellow" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
        <button className="flex" onClick={()=>{setLiked(4)}}>
          {(liked>=4)?<Star fill="yellow" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
        <button className="flex" onClick={()=>{setLiked(5)}}>
          {(liked>=5)?<Star fill="yellow" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
      </div>

        <div className="flex items-center">

          <p className="flex w-full font-semibold text-slate-900">Product description</p>
          <textarea
            className="bg-white/0 p-2 w-full outer-glow border border-slate-500 rounded-md"
            autoFocus
            placeholder="Product comment"
            ref={inputRefProductComment}
          />
        </div>

        {/* <div className="flex items-center"> */}

          {/* <p className="flex w-full font-semibold text-slate-900">Product Image</p> */}
          {/* <input
            className="flex w-full rounded-md border border-slate-900"
            type="text" //TODO: change to image
            placeholder="Product Image"
          /> */}

        {/* </div> */}
        {/* upload image here */}

        </div>

        <div className="flex w-full justify-end ">
        <Button
          className="text-sm font-semibold text-slate-100 bg-slate-700 hover:bg-orange-400"
          onClick={handleAddComment}
        >
          Comment
        </Button>

        </div>      
      </DialogContent>
    </Dialog>
  );
}