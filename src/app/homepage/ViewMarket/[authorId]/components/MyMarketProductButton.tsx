// import { useRef, useState } from "react";
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import { Star, StarHalf } from "lucide-react";
import Divider from "@mui/material/Divider";

import Paper from "@mui/material/Paper";


export type MyMarketProductButtonProps = {
  id: number;
  displayId:string;
  title: string;
  category: string;
  price: number;
  likes:number;
  left: number;
  imageUrl: string;
};

export default function MyMarketProductButton({id, displayId,title, category, price,likes,left,imageUrl}:MyMarketProductButtonProps) {
  // const [open, setOpen] = useState(false);
  const router = useRouter();

  const viewProduct=()=>{
    router.push(`/homepage/${displayId}`);
  }

  let imageSrc;
  if(!imageUrl){
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
  }
  else{
    imageSrc = imageUrl;
  }

  return (
      <>
        <Paper className={`rounded-md p-2 mx-2 my-2 w-80 flex flex-col  ${left === 0 ? 'bg-slate-200' : ''}`}>
          
          {/* <div className="flex w-full gap-4"> */}
            {/* 標題 */}
            <div className={`flex gap-2 flex-col  rounded-md p-2 mx-2 my-2  ${left === 0 ? 'bg-slate-200' : ''}`} >
              <div className="flex">
                <p className="flex text-2xl font-semibold text-yellow-500" > {title} </p>
                {left === 0 && <p className="ml-auto font-bold flex text-4xl text-red-700" > Sold out!!! </p>}

              </div>
              
            {/* 圖片 */}
            <div className="grid place-items-center w-60 h-60" >
              <p className="flex font-semibold text-slate-900">
                <img src={imageSrc} alt="Product" className="w-auto h-52 " />
              </p>
            </div>


            {/* 分隔線 */}
            <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />

            <div className="flex flex-col gap-4 w-full">
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
            <Button className="font-bold bg-slate-800  hover:bg-yellow-500 hover:text-slate-800" onClick={viewProduct}>Show more</Button>
            
            </div>
          </div>
        </Paper>


    </>
  );
}