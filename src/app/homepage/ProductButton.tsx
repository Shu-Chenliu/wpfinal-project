// import { useRef, useState } from "react";
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export type ProductButtonProps = {
  id: number;
  displayId:string;
  title: string;
  category: string;
  price: number;
};

export default function ProductButton({id, displayId,title, category, price}:ProductButtonProps) {
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
        </p>
       
        <p className="flex w-full font-semibold text-slate-900" >
          Category:
          {category}
        </p>
        <p className="flex w-full font-semibold text-slate-900" >
          Price:
          {price}
        </p>
        <Button onClick={viewProduct}>Show more</Button>
      </div>
      {/* <ViewProductDialog
        onClose={() => setOpen(false)}        
      /> */}

    </>
  );
}