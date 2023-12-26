import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState,useRef } from "react";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import AddCommentDialog from "./AddCommentDialog";
import useNotifications from "@/hooks/useNotifications";
type ConfirmDialogProps={
  open: boolean,
  onClose: ()=>void,
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
}
export default function ConfirmDialog({open,onClose,id,postId,title,left,author,sold,likes,userId,username,number,address}:ConfirmDialogProps){
  const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);
  const {updateNotification}=useNotifications();
  const handleReceive=async()=>{
    onClose();
    await updateNotification({
      id,
      received:true,
    });
    setOpenNewCommentDialog(true);
  }
  return(
    <>
      <Dialog open={open}>
        <DialogContent
          className="flex flex-col gap-4 w-3/4"
          style={{ width: "500px" }}
        >
          <DialogHeader>
            <DialogTitle>Package Delivered!</DialogTitle>
            <DialogDescription>Have you recieved your package? </DialogDescription>
          </DialogHeader>
          <div className="flex w-full flex-col gap-1">
          <div className="flex items-center">
            {/* <p className="flex w-full font-semibold text-slate-900"> Product Name:{"title"}</p>   
            <p className="flex w-full font-semibold text-slate-900"> Product number:{"orderNumber"}</p>
            <p className="flex w-full font-semibold text-slate-900"> Product Seller:{"seller"} </p> */}
            <p className="flex w-full  text-slate-900"> {author} has delivered {number} {title}(s) to {address}</p>
          </div>
          </div>

          <div className="flex w-full justify-end ">
          <Button
          className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
          onClick={async() => {onClose();}} 
        >
          Close
        </Button>
          <Button
            className="text-sm font-semibold text-slate-100 bg-slate-700 hover:bg-orange-700 mx-2 hover:text-slate-900"
            onClick={handleReceive}
          >
            Receive
          </Button>
          </div>      
        </DialogContent>
      </Dialog>
      <AddCommentDialog 
        open={openNewCommentDialog} 
        onClose={()=>setOpenNewCommentDialog(false)}
        id={id}
        postId={postId}
        left={left}
        sold={sold}
        likes={likes}
        userId={userId}
        username={username}
      />
    </>
  );
}