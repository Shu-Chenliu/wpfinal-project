import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { useState,useRef } from "react";
import { Star } from "lucide-react";
import  usePost from "@/hooks/usePosts";
import useComments from "@/hooks/useComments";
import useNotification from "@/hooks/useNotifications";
import Link from "next/link";
type ConfirmDialogProps={
  open: boolean,
  onClose: ()=>void,
  id: number,
  postId:string,
  left: number,
  sold: number,
  likes: number,
  userId: string,
  username: string,
  buyerNumber: number,
  title: string,
}
export default function ConfirmDialog({open,onClose,id,postId,likes,username,buyerNumber, title}:ConfirmDialogProps){
  const inputRefProductComment = useRef<HTMLTextAreaElement>(null);
  const [liked,setLiked]=useState(0);
  const {updateProduct}=usePost();
  const {postComment}=useComments();
  const {updateNotification}=useNotification();
  const handleAddComment = async()=>{
    if(!inputRefProductComment.current)return;
    await updateProduct({
      id:postId,
      likes:(likes*(buyerNumber-1)+liked)/(buyerNumber),
    });
    if(inputRefProductComment.current.value){
      await postComment({
        text:inputRefProductComment.current.value,
        author:username,
        postId,
        stars:liked,
      })
    }
    else{
      await postComment({
        author:username,
        postId,
        stars:liked,
      })
    }
    await updateNotification({
      id,
      commented:true,
    });
    onClose();
  }
  return(
    <Dialog open={open}>
      <DialogContent
        className="flex flex-col gap-4 w-3/4"
        style={{ width: "500px" }}
      >
        <DialogHeader>
          <DialogTitle className="text-yellow-500 text-xl ">Comment Product* (optional)</DialogTitle>
          <DialogDescription>Woud you like to leave a comment?</DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900">
            What you've bought: {title}
          </p>
        </div>

        <div className="flex">
        <button className="flex" onClick={()=>{setLiked(1)}}>
          {(liked>=1)?<Star fill="orange" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
        <button className="flex" onClick={()=>{setLiked(2)}}>
          {(liked>=2)?<Star fill="orange" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
        <button className="flex" onClick={()=>{setLiked(3)}}>
          {(liked>=3)?<Star fill="orange" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
        <button className="flex" onClick={()=>{setLiked(4)}}>
          {(liked>=4)?<Star fill="orange" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
        <button className="flex" onClick={()=>{setLiked(5)}}>
          {(liked>=5)?<Star fill="orange" strokeWidth={0} />:<Star fill="black" strokeWidth={0} />}
        </button>
      </div>

        <div className="flex items-center">
          <p className="flex w-full font-semibold text-slate-900">Your comment</p>
          <textarea
            className="bg-white/0 p-2 w-full outer-glow border border-slate-500 rounded-md"
            autoFocus
            placeholder="comment......"
            ref={inputRefProductComment}
          />
        </div>

        </div>

        <div className="flex w-full justify-end ">
        <Button
          className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
          onClick={async() => {onClose(); }} 
        >
          Close
        </Button>
        <Link href={`/homepage/${postId}`}>
          <Button
            className="text-sm font-semibold text-slate-100 bg-slate-700 hover:bg-yellow-500 mx-2 hover:text-slate-900"
            onClick={handleAddComment}
          >
            Comment
          </Button>
        </Link>
        </div>      
      </DialogContent>
    </Dialog>
  );
}