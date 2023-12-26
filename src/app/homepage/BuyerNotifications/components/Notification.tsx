"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState,useRef } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";
type Props = {
  id:string,
  title:string,
  left:number,
  author:string,
  sold:number,
  likes:number,
  userId:string,
};
function Notification({id, title, left, author,sold,likes,userId}:Props) {
  const [openNewReceiveDialog, setOpenNewReceiveDialog] = useState(false);
  return (
    <>
      <div className="border border-orange-600 border-2 w-full mr-4 p-4 flex h-40 justify-center items-center">
        <div>
          <img src="/image.jpg" alt="Product" className="w-44 h-auto" />
        </div>
        <div className="px-4">
          <div className="mb-4 border">
            <p>product name: {title}</p>
            <p>product number: {"number"}</p>
            <p>seller: {author}</p>
          </div>
        </div>
        <Button
          className="bg-black hover:bg-orange-500 text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100"
          onClick={() => setOpenNewReceiveDialog(true)}
        >
          Receive Product
        </Button>
      </div>

      <ConfirmDialog 
        open={openNewReceiveDialog} 
        onClose={()=>setOpenNewReceiveDialog(false)}
        id={id} 
        title={title} 
        left={left} 
        author={author}
        sold={sold}
        likes={likes}
        userId={userId}
      />
    </>
  );
}
export default Notification;