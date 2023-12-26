"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState,useRef } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import ConfirmDialog from "./ConfirmDialog";

type BuyerNotiBarProps = {
  id:number,
  postId:string,
  title:string,
  left:number,
  author:string,
  sold:number,
  likes:number,
  userId:string,
  username:string,
  number:number,
  address:string,
};


// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function BuyerNotiBar({
  id, postId,title, left, author,sold,likes,userId,username,number,address
}: BuyerNotiBarProps) {
  const [openNewCheckDialog, setOpenNewCheckDialog] = useState(false);
  const [openNewReceiveDialog, setOpenNewReceiveDialog] = useState(false);
  const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);
  const inputRefProductComment = useRef<HTMLTextAreaElement>(null);
  const [liked,setLiked]=useState(0);

  const handleAddComment = async()=>{
    setOpenNewCommentDialog(false);
  }

  return (
    <>
      <div className="border w-full mr-4 p-4 flex h-40 ">
        <div>
          <img src="/image.jpg" alt="Product" className="w-44 h-auto" />
        </div>
        <div className="px-4">
          <div className="mb-4 ">
            <p className="flex w-full font-semibold text-slate-900"> Package Delivered!</p>
            <p className="flex w-full text-slate-900"> Product Name: {title}</p>   
            <p className="flex w-full text-slate-900"> Product number: {number}</p>
            <p className="flex w-full text-slate-900"> Product Seller: {author} </p>
          </div>
        </div>
        <Button
          className="ml-auto text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100 text-white bg-slate-700 hover:bg-orange-700 hover:text-slate-900"
          onClick={() => setOpenNewReceiveDialog(true)}
        >
          Receive Product
        </Button>
      </div>

      <ConfirmDialog 
        open={openNewReceiveDialog} 
        onClose={()=>setOpenNewReceiveDialog(false)}
        id={id}
        postId={postId} 
        title={title} 
        left={left} 
        author={author}
        sold={sold}
        likes={likes}
        userId={userId}
        username={username}
        number={number}
        address={address}
      />
    </>
  );
}
