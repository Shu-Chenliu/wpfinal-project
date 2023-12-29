"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import Image from "next/image";
import useNotifications from "@/hooks/useNotifications";
import usePosts from "@/hooks/usePosts";
type SellerNotiBarProps = {
  id:number,
  text:string,
  buyer:string,
  money:number,
  address:string,
  category:string,
  read:boolean,
  left:number,
  imageUrl:string,
  number:number,
  postId:string,
  sold:number,
  buyerNumber:number,
};


// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function SellerNotiBar({
  id,text,buyer,money,address,category,read,left,imageUrl,number,postId,sold,buyerNumber
}: SellerNotiBarProps) {
  const [openNewCheckDialog, setOpenNewCheckDialog] = useState(false);
  const {updateNotification}=useNotifications();
  const {updateProduct}=usePosts();
  const handleCheckOrder = async()=>{
    await updateProduct({
      id:postId,
      left:left-number,
      sold:sold+number,
      buyerNumber:buyerNumber+1,
    })
    await updateNotification({
      id,
      shipped:true,
      readBySeller:true,
    });

    setOpenNewCheckDialog(false);
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
      <div className="w-40 h-40 relative">
        <Image
          src={imageSrc!}
          alt="Product"
          fill={true}
          className="object-contain"
        />
        {/* <img src={imageSrc} alt="Product" className="w-auto h-32" /> */}
      </div>
      <div className="px-4">
        <div className="mb-4 ">
          {/* <p className="flex w-full font-semibold text-slate-900"> Product Name: {text} </p> */}
          <p className="flex font-semibold text-cyan-500 text-xl">Order recieved!</p>
          <p className="flex w-full font-bold text-slate-900"> {text}</p>
          <p className="flex w-full font-semibold text-slate-900"> Buyer: {buyer}</p>
          <p className="flex w-full font-semibold text-slate-900"> Buyer Address: {address}</p>
          <p className="flex w-full font-semibold text-slate-900"> Payment recieve: {money}</p>
        </div>
      </div>

      <Button
        className={!read?"ml-auto bg-slate-700 hover:bg-cyan-500 hover:text-slate-900 text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100":"ml-auto bg-slate-200 hover:bg-slate-200 text-white font-bold py-1 px-2 rounded-md text-sm transition duration-100"}
        onClick={() => {
          if(read){
            return;
          }
          setOpenNewCheckDialog(true);
        }}
        disabled={left<=0}
      >
        Check Order
      </Button>
 
    </>

  );

  return (
    <>
    {read?
    (<div className="w-full flex flex-row gap-4  border rounded-md p-2 mx-2 my-2 bg-slate-200">
      {contentToRender}
    </div>)
    :
    (<div className="w-full flex flex-row gap-4  border rounded-md p-2 mx-2 my-2">
      {contentToRender}
    </div>

    )

      
    }
      <Dialog open={openNewCheckDialog}>

        <DialogContent
          className="flex flex-col gap-4 w-3/4"
          style={{ width: "500px" }}
          onInteractOutside={()=>{setOpenNewCheckDialog(false);}}
        >
          <DialogHeader>
            <DialogTitle className="text-cyan-600">Are you sure to ship your product?</DialogTitle>
            <br />
            <DialogDescription className="ml-3"> {text} will be send to {buyer} immediately.</DialogDescription>
            
          </DialogHeader>
       
          <div className="flex w-full justify-end ">
          <Button
            className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
            onClick={async() => {setOpenNewCheckDialog(false); }} 
          >
            Close
          </Button>

          <Button
            className="text-sm font-semibold bg-slate-600  hover:text-slate-900 hover:bg-cyan-500"
            onClick={handleCheckOrder}
          >
            Check
          </Button>

          </div>      
        </DialogContent>
      </Dialog>
    </>
  );
}
