// import { useRef, useState } from "react";
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";
import { Star, StarHalf } from "lucide-react";
export type ProductButtonProps = {
  id: number;
  displayId:string;
  title: string;
  category: string;
  price: number;
  likes:number;
  left: number;
};

export default function ProductButton({id, displayId,title, category, price,likes, left}:ProductButtonProps) {
  // const [open, setOpen] = useState(false);
  const router = useRouter();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const viewProduct=()=>{
    router.push(`/homepage/${displayId}`);
  }

  let imageSrc;

  switch (category) {
    case "Clothing":
      imageSrc = "./Clothing.jpg";
      break;
    case "Food":
      imageSrc = "./Food.jpg";
      break;
    case "Electronics":
      imageSrc = "./Electronics.jpg";
      break;
    case "EE related":
      imageSrc = "./EE_related.jpg";
      break;
    case "Others":
      imageSrc = "./Others.jpg";
      break;
  }
  

  return (
    <>
      <div 
      className={`flex gap-2 flex-col border border-black rounded-md p-2 mx-2 my-2 w-1/3 ${left === 0 ? 'bg-slate-200' : ''}`} >
        {left ===0 && <p className="font-bold flex text-lg text-red-700" > Sold out!!! </p>}
        <p className="flex text-lg font-semibold text-yellow-500" > {title} </p>
        
        {/* <p className="flex text-lg font-semibold text-yellow-500"></p> */}
        {/* <p>{displayId}</p> */}
        {/* <p className="flex w-full font-semibold text-slate-900 w-20vw" >
          <img src={imageSrc} alt="Product" />        
        </p> */}

        <p className="flex  font-semibold text-slate-900">
          <img src={imageSrc} alt="Product" className="w-50 h-auto"/>
        </p>

        <p className="flex w-full font-semibold text-slate-900" > Category: {category}</p>
        <p className="flex w-full font-semibold text-slate-900" >Price: {price}</p>
        <p className="flex w-full font-semibold text-slate-900" >left: {left}</p>
        <div className="flex">
          <button className="flex">
            {likes >= 0.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : likes >= 0.25 ? (
              <StarHalf fill="orange-800" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {likes >= 1.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : likes >= 1.25 ? (
              <StarHalf fill="orange" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {likes >= 2.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : likes >= 2.25 ? (
              <StarHalf fill="orange" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {likes >= 3.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : likes >= 3.25 ? (
              <StarHalf fill="orange" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {likes >= 4.75 ? (
              <Star fill="orange" strokeWidth={0} />
            ) : likes >= 4.25 ? (
              <StarHalf fill="orange" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
        </div>
        <Button className="font-bold bg-slate-800  hover:bg-yellow-500 hover:text-slate-800" onClick={viewProduct}>Show more</Button>      </div>
      {/* <ViewProductDialog
        onClose={() => setOpen(false)}        
      /> */}

    </>
  );
}