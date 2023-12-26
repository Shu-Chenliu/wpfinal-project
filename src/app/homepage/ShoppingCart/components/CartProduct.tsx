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
};

export default function CartProduct(
  {id, displayId,title, category, price}:CartProductProps
  ) {
  // const [open, setOpen] = useState(false);
  const router = useRouter();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
 
  const viewProduct=()=>{
    // router.push(`/homepage/${displayId}`);
  }

  return (
    <>
    <div className="w-full flex gap-4  border rounded-md p-2 mx-2 my-2" >
    <div      
        // className="w-full flex flex-col gap-4  border rounded-md p-2 mx-2 my-2"
      >
        <p className="flex  font-semibold text-slate-900" >
          Want to buy: 
          {title}
        </p>
        {/* <p>{displayId}</p> */}
        <p className="flex font-semibold text-slate-900" >
          (Image)
          {/* {image} */}
        </p>
       
        <p className="flex font-semibold text-slate-900" >
          Price:
          {price}
        </p>
        
      </div>
      <div>
      {/* <Button 
        className="flex font-semibold hover:bg-orange-700 hover:text-black "
        onClick={viewProduct}>
          Buy Now
      </Button> */}
      <BuyNowDialog/>
      </div>
    </div>
      
      {/* <ViewProductDialog
        onClose={() => setOpen(false)}        
      /> */}

    </>
  );
}