// import { useRef, useState } from "react";
"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash2 } from 'lucide-react';
import { Dialog , DialogContent } from "@/components/ui/dialog";
import usePosts from "@/hooks/usePosts";
export type MyMarketProductButtonProps = {
  displayId:string;
};

export default function DeleteButton({ displayId}:MyMarketProductButtonProps) {
  // const [open, setOpen] = useState(false);
  const {deleteProduct}=usePosts();
  const [open, setOpen] = useState(false);
  const handleDeletePost=async()=>{
    await deleteProduct({
      id:displayId,
    });
  }

  return (
      <>
        <div className={`flex gap-2 flex-col  rounded-md p-2 mx-2 my-2`} >

          <div className="flex items-center justify-top text-3xl m-2 p-2 font-bold text-cyan-600 hover:text-cyan-700 ">
            <Trash2 className=" hover:text-cyan-700" onClick={()=>{setOpen(true)}}/>
          </div>

          <Dialog open={open}>
            <DialogContent>
              <p className="font-semibold text-lg">Do you want to remove this post? </p>
              <div className="flex w-full justify-end ">
                <Button
                  className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                
                
                  <Button
                    // variant={"ghost"}
                    type={"submit"}
                    className="bg-slate-800 text-slate-100 hover:text-orange-500"
                    onClick={handleDeletePost}
                  >
                    <Trash2 className="m-2"/>
                    Delete
                  </Button>
                

              </div>
              
            </DialogContent>
          </Dialog>
        </div>
    </>
  );
}