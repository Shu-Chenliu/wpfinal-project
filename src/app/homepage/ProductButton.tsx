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
};

export default function ProductButton({id, displayId,title, category, price,likes}:ProductButtonProps) {
  // const [open, setOpen] = useState(false);
  const router = useRouter();
  // const handleClickOpen = () => {
  //   setOpen(true);
  // };
  const viewProduct=()=>{
    router.push(`/homepage/${displayId}`);
  }

  return (
    <>
      <div 
        // onClick={handleClickOpen} 
        // className="text-start block" 
        // id={id}
        className="flex flex-col gap-4 w-1/4 border rounded-md p-2 mx-2 my-2"
        // width="500px"
      >
        <p className="flex w-full font-semibold text-slate-900" >
          Product Name: 
          {title}
        </p>
        <p>{displayId}</p>
        <p className="flex w-full font-semibold text-slate-900" >
          (Image)
          {/* {image} */}
          {likes}
        </p>
       
        <p className="flex w-full font-semibold text-slate-900" >
          Category:
          {category}
        </p>
        <p className="flex w-full font-semibold text-slate-900" >
          Price:
          {price}
        </p>
        <div className="flex">
          <button className="flex">
            {likes >= 0.75 ? (
              <Star fill="yellow" strokeWidth={0} />
            ) : likes >= 0.25 ? (
              <StarHalf fill="yellow" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {likes >= 1.75 ? (
              <Star fill="yellow" strokeWidth={0} />
            ) : likes >= 1.25 ? (
              <StarHalf fill="yellow" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {likes >= 2.75 ? (
              <Star fill="yellow" strokeWidth={0} />
            ) : likes >= 2.25 ? (
              <StarHalf fill="yellow" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {likes >= 3.75 ? (
              <Star fill="yellow" strokeWidth={0} />
            ) : likes >= 3.25 ? (
              <StarHalf fill="yellow" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
          <button className="flex">
            {likes >= 4.75 ? (
              <Star fill="yellow" strokeWidth={0} />
            ) : likes >= 4.25 ? (
              <StarHalf fill="yellow" strokeWidth={0} />
            ) : (
              <Star fill="black" strokeWidth={0} />
            )}
          </button>
        </div>
        <Button onClick={viewProduct}>Show more</Button>
      </div>
      {/* <ViewProductDialog
        onClose={() => setOpen(false)}        
      /> */}

    </>
  );
}