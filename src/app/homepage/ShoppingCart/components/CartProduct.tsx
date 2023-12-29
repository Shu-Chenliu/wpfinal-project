// import { useRef, useState } from "react";
"use client";
import BuyNowDialog from "./BuyNowDialog";
import { Trash2 } from 'lucide-react';
import useCart from "@/hooks/useCart";
import Image from "next/image";
export type CartProductProps = {
  id: number;
  displayId:string;
  title: string;
  category: string;
  price: number;
  username: string;
  seller:string;
  left: number,
  userId: string,
  coupons:{id:number,percent:number}[],
  getCoupon:()=>void,
  useraddress: string,
  imageUrl:string
};

export default function CartProduct(
  {displayId,title, category, price,username,seller,left,userId,coupons,getCoupon, useraddress,imageUrl}:CartProductProps
  ) {
  // const [open, setOpen] = useState(false);
  
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
 
  const {deleteCart}=useCart();
  const handleDelete=async()=>{
    await deleteCart({
      userId,
      postId:displayId,
    });
  }
  
  let imageSrc;
  if(!imageUrl){
  switch (category) {
    case "Clothing":
      imageSrc = "/../../Clothing.jpg";
      break;
    case "Food":
      imageSrc = "/../../Food.jpg";
      break;
    case "Electronics":
      imageSrc = "/../../Electronics.jpg";
      break;
    case "EE related":
      imageSrc = "/../../EE_related.jpg";
      break;
    case "Others":
      imageSrc = "/../../Others.jpg";
      break;
  }}
  else{
    imageSrc = imageUrl;
  }
  return (
    <>
      <div className="w-full flex flex-row gap-4  border rounded-md p-2 mx-2 my-2" >
        <div className=" w-full mr-4 p-4 flex h-[1/4]">
          <div className="w-48 h-48 relative">
            <Image
              src={imageSrc!}
              alt="Product"
              fill={true}
              className="object-contain"
            />
            {/* <img src={imageSrc} alt="Product" className="w-48 h-auto" /> */}
          </div>

          <div className="px-4">
            <p className="flex font-semibold text-yellow-500 text-xl">{title}</p>
            <p className="flex text-slate-900 mx-1 my-1">Price: ${price} /each</p>
            <p className="flex text-slate-900 mx-1 my-1">Number left: {left}</p>
          </div>

          <div className="ml-auto">
            <BuyNowDialog 
              title={title} 
              username={username} 
              seller={seller} 
              money={price} 
              postId={displayId}
              left={left}
              userId={userId}
              coupons={coupons}
              handleGetCoupon={getCoupon}
              useraddress={useraddress}
            />
          </div>

            <Trash2 
            onClick={handleDelete}
            />

        </div>
      </div>
    </>
  );
}