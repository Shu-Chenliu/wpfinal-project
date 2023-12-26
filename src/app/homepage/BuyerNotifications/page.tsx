"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState,useRef } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import ConfirmDialog from "./components/ConfirmDialog";
type Props = {

};
function Notification() {
  const [openNewReceiveDialog, setOpenNewReceiveDialog] = useState(false);
  const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);
  const inputRefProductComment = useRef<HTMLTextAreaElement>(null);
  const [liked,setLiked]=useState(0);

  const handleAddComment = async()=>{
    setOpenNewCommentDialog(false);
  }
  
  return (
    <>
      <div className="border border-orange-600 border-2 w-full mr-4 p-4 flex h-40 justify-center items-center">
        <div>
          <img src="/image.jpg" alt="Product" className="w-44 h-auto" />
        </div>
        <div className="px-4">
          <div className="mb-4 border">
            <p>product name: {"product name"}</p>
            <p>product number: {"product number"}</p>
            <p>seller: {"seller"}</p>
          </div>
        </div>
        <Button
          className="bg-black hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100"
          onClick={() => setOpenNewReceiveDialog(true)}
        >
          Receive Product
        </Button>
      </div>

      <ConfirmDialog open={openNewReceiveDialog} onClose={()=>setOpenNewReceiveDialog(false)}/>
    </>
  );
}
export default Notification;