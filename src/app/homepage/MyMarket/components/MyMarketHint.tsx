"use client";
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';

export default function MyMarketHint() {
const [showHint,setShowHint]=useState(false);
return(
    <>
    <div className=" flex ml-auto ">
        {showHint &&
        <p className="mt-5 text-sm text-slate-500 ml-auto justify-end ">You can view all your posts here. <br /> Press "Add Product" to post what you want to sell. </p>
        }
        <Lightbulb onClick={()=>{setShowHint(!showHint)}}  className={`ml-auto mt-1 mr-1 text-${showHint ? 'cyan' : 'slate'}-500`} size={20}/>
        </div>
    </>
    )
}