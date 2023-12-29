"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from 'next/image';
import ConfirmDialog from "./ConfirmDialog";
import AddCommentDialog from "./AddCommentDialog"

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
  buyerNumber:number,
  category:string,
  read:boolean,
  imageUrl:string,
  commented:boolean,
  toPostId:(postId:string)=>void,
};


// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function BuyerNotiBar({
  id, postId,title, left, author,sold,likes,userId,username,number,address,buyerNumber,category,read,imageUrl,commented,toPostId
}: BuyerNotiBarProps) {
  const [openNewReceiveDialog, setOpenNewReceiveDialog] = useState(false);
  const [openNewCommentDialog, setOpenNewCommentDialog] = useState(false);

  const handleAddComment = ()=>{
    if(commented){
      toPostId(postId);
      return;
    }
    setOpenNewCommentDialog(true);
  }
  
  let imageSrc;
  if(!imageUrl){
  switch (category) {
    case "Clothing":
      imageSrc = "/Clothing.jpg";
      break;
    case "Food":
      imageSrc = "/Food.jpg";
      break;
    case "Electronics":
      imageSrc = "/Electronics.jpg";
      break;
    case "EE related":
      imageSrc = "/EE_related.jpg";
      break;
    case "Others":
      imageSrc = "/Others.jpg";
      break;
  }}
  else{
    imageSrc = imageUrl;
  }
  const contentToRender = (
    <>
      <div className="w-36 h-32 relative">
        <Image
          src={imageSrc!}
          alt="Product"
          fill={true}
          className="object-contain"
        />
        {/* <img src={imageSrc} alt="Product" className="h-32 w-auto" /> */}
      </div>
      <div className="px-4">
        <div className="mb-4 ">
          {/* <p className="flex w-full font-semibold text-slate-900"> Package Delivered!</p> */}
          <p className="flex font-semibold text-yellow-500 text-xl">Package Delivered!</p>
          <p className="flex w-full font-semibold text-slate-900">  {title}</p>   
          <p className="flex w-full text-slate-900"> Product number: {number}</p>
          <p className="flex w-full text-slate-900"> Product Seller: {author} </p>
        </div>
      </div>
      <div className="flex flex-col ml-auto">
        <Button
          className={read?"ml-auto text-sm my-2 font-semibold text-slate-300 bg-slate-100 hover:bg-slate-100 mx-2 hover:text-slate-300"
            :"ml-auto text-sm my-2 font-semibold text-slate-100 bg-slate-700 hover:bg-yellow-500 mx-2 hover:text-slate-900"
          }
          onClick={() => {
            if(read){
              return;
            }
            setOpenNewReceiveDialog(true)
          }}
        >
          Receive Product
        </Button>
        <Button
          className="ml-auto text-sm my-2 font-semibold text-slate-100 bg-slate-700 hover:bg-yellow-500 mx-2 hover:text-slate-900"
          onClick={handleAddComment}
          disabled={!read}
        >
          {commented?"View Your Comment":"Comment"}
        </Button>

      </div>

    </>
  );

  return (
    <>
    {read?
    <div className="w-full flex flex-row gap-4  border rounded-md p-2 mx-2 my-2 bg-slate-200">
      {contentToRender}
    </div>
    :   
    <div className="w-full flex flex-row gap-4  border rounded-md p-2 mx-2 my-2 ">
      {contentToRender}
    </div>    
    }
  
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
        buyerNumber={buyerNumber}
      />
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
        title={title}
      />
    </>
  );
}


