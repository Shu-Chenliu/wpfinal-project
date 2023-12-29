import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import AddCommentDialog from "./AddCommentDialog";
import useNotifications from "@/hooks/useNotifications";
import  usePost from "@/hooks/usePosts";
import ImpossibleDialog from "./ImpossibleDialog";
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
  buyerNumber:number,
}
export default function ConfirmDialog({open,onClose,id,postId,title,left,author,sold,likes,userId,username,number,address,buyerNumber}:ConfirmDialogProps){
  const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);
  const [openImpossibleDialog, setOpenImpossibleDialog] = useState(false);
  const {updateNotification}=useNotifications();
  const {updateProduct}=usePost();
  const handleReceive=async()=>{
    await updateProduct({
      id:postId,
      left:left-number,
      sold:sold+number,
      buyerNumber:buyerNumber+1,
    })
    await updateNotification({
      id,
      received:true,
      readByBuyer:true,
    });
    onClose();
    setOpenNewCommentDialog(true);
  }
  const handleHaventReceive=async()=>{
    setOpenImpossibleDialog(true);
  }
  return(
    <>
      <Dialog open={open}>
        <DialogContent
          className="flex flex-col gap-4 w-3/4"
          style={{ width: "500px" }}
        >
          <DialogHeader>
            <DialogTitle>Have you recieved your package? </DialogTitle>
            {/* <DialogDescription>Have you recieved your package? </DialogDescription> */}
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
          className="text-sm font-semibold text-slate-100 bg-slate-700 hover:bg-red-400 mx-2 hover:text-slate-900"
          // onClick={async() => {onClose();}} 
          onClick={handleHaventReceive}
        >
          Haven't Receive?
        </Button>
          <Button
            className="text-sm font-semibold text-slate-100 bg-slate-700 hover:bg-green-300 mx-2 hover:text-slate-900"
            onClick={handleReceive}
          >
            Received
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
        buyerNumber={buyerNumber}
      />
      <ImpossibleDialog 
        open={openImpossibleDialog} 
        onClose={()=>setOpenImpossibleDialog(false)}
        
      />
    </>
  );
}