// import { useRef, useState } from "react";
"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Star, StarHalf } from "lucide-react";
import Divider from "@mui/material/Divider";
import Image from 'next/image';
import Paper from "@mui/material/Paper";
import { Trash2 } from 'lucide-react';
import { Dialog , DialogContent } from "@/components/ui/dialog";
import usePosts from "@/hooks/usePosts";
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

export default function MyMarketProductButton({ displayId,title, category, price,likes,left,imageUrl}:MyMarketProductButtonProps) {
  // const [open, setOpen] = useState(false);
  const router = useRouter();
  const {deleteProduct}=usePosts();
  const viewProduct=()=>{
    router.push(`/homepage/${displayId}`);
  }
  const [open, setOpen] = useState(false);
  const handleDeletePost=async()=>{
    await deleteProduct({
      id:displayId,
    });
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
    }
  }
  else{
    imageSrc = imageUrl;
  }

  return (
      <>
        <Paper className={`rounded-md p-2 mx-2 my-2 w-60 flex flex-col  ${left === 0 ? 'bg-slate-200' : ''}`}>
          
          {/* <div className="flex w-full gap-4"> */}
            {/* 標題 */}
            <div className={`flex gap-2 flex-col  rounded-md p-2 mx-2 my-2  ${left === 0 ? 'bg-slate-200' : ''}`} >

              <div className="flex items-center justify-top text-3xl m-2 p-2 font-bold text-cyan-600 hover:text-cyan-700 ">
                <p className="text-3xl m-2  font-bold text-cyan-600 hover:text-cyan-700">{title}</p>
                <Trash2 className=" hover:text-cyan-700" onClick={()=>{setOpen(true)}}/>
              </div>

            <Dialog open={open}>
            <DialogContent>
              <p className="font-semibold text-lg">Do you want to remove this post? </p>
              <div className="flex w-full justify-end ">
                <Button
                  className="text-sm font-semibold text-slate-900 border bg-slate-200 hover:bg-slate-100 mx-2"
                  onClick={() => setOpen(false)}
                >
                  Close
                </Button>
                
                
                  <Button
                    // variant={"ghost"}
                    type={"submit"}
                    className="bg-slate-800 text-slate-100 hover:text-orange-500"
                    onClick={handleDeletePost}
                  >
                    <Trash2 className="m-2"/>
                    Delete
                  </Button>
                

              </div>
              
            </DialogContent>
          </Dialog>
              
            {/* 圖片 */}
            <div className="grid relative" style={{ width: '200px', height: '250px' }}>
              <Image
                src={imageSrc!}
                alt="Product"
                fill={true}
                className="object-contain"
              />
              {/* <img src={imageSrc} alt="Product" className="w-96 h-auto" /> */}
            </div>


            {/* 分隔線 */}
            <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />

            <div className="flex flex-col gap-4 w-full">
            <p className="flex w-full font-semibold text-slate-900" > Category: {category}</p>
            <p className="flex w-full font-semibold text-slate-900" >Price: {price}</p>
            {left<=0 && (
              <p className="flex w-full font-semibold text-red-500" >left: {left}</p>
            )
            }
            {left>0 && (
            <p className="flex w-full font-semibold text-slate-900 " >left: {left}</p>
            )
            }

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
            <Button className="font-bold bg-slate-800  hover:bg-cyan-500 hover:text-slate-800" onClick={viewProduct}>Show more</Button>
            
            </div>
          </div>
        </Paper>


    </>
  );
}