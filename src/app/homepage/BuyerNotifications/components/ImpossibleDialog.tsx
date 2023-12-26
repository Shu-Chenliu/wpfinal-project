import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState,useRef } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import  usePost from "@/hooks/usePosts";
import useComments from "@/hooks/useComments";
type ImpossibleDialogProps={
  open: boolean,
  onClose: ()=>void,

}
export default function ImpossibleDialog({open,onClose}:ImpossibleDialogProps){
  return(
    <Dialog open={open}>
      <DialogContent
        className="flex flex-col gap-4 w-3/4 bg-red-500"
        style={{ width: "500px" }}
      >
        <DialogHeader>
          <DialogTitle className="text-white">Impossible :)</DialogTitle>
          
        </DialogHeader>
        

        <div className="flex w-full justify-end ">
        <Button
          className="font-semibold text-slate-100 bg-slate-700 hover:bg-slate-600 mx-2"
          onClick={async() => {onClose(); }} 
        >
          Close
        </Button>
        
        </div>      
      </DialogContent>
    </Dialog>
  );
}