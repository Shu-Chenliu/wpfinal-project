// import { useRef, useState } from "react";
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import BuyNowDialog from "./BuyNowDialog";
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
};

export default function CartProduct(
  {id, displayId,title, category, price,username,seller,left,userId}:CartProductProps
  ) {
  // const [open, setOpen] = useState(false);
  const router = useRouter();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
 
  const viewProduct=()=>{
    // router.push(`/homepage/${displayId}`);
  }
  let imageSrc;

  switch (category) {
    case "Clothing":
      imageSrc = "../../Clothing.jpg";
      break;
    case "Food":
      imageSrc = "../../Food.jpg";
      break;
    case "Electronics":
      imageSrc = "../../Electronics.jpg";
      break;
    case "EE related":
      imageSrc = "../../EE_related.jpg";
      break;
    case "Others":
      imageSrc = "../../Others.jpg";
      break;
  }
  return (
    <>
      <div className="w-full flex flex-row gap-4  border rounded-md p-2 mx-2 my-2" >
        <div className=" w-full mr-4 p-4 flex h-[1/4]">
          <div>
          <img src={imageSrc} alt="Product" className="w-48 h-auto" />
          </div>

          <div className="px-4">
            <p className="flex font-semibold text-slate-900 ">{title}</p>
            <p className="flex text-slate-900">Price: {price}</p>
            <p className="flex text-slate-900">Number left: {"left"}</p>
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
            />
          </div>
        </div>
      </div>
    </>
  );
}