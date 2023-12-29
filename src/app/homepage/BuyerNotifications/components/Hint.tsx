"use client";
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';

export default function Hint() {
const [showHint,setShowHint]=useState(false);
return(
    <>
        <div className=" flex ml-auto ">

        {showHint &&
        <p className=" mt-5 text-sm text-slate-500 ml-auto justify-end ">Confirm whether you have received the goods. <br /> After confirmation, you may leave your coment for the product. </p>
        }
        <Lightbulb onClick={()=>{setShowHint(!showHint)}}  className={`ml-auto mt-1 mr-1 text-${showHint ? 'yellow' : 'slate'}-500`} size={20}/>
      
 
        </div>
    </>
    )
}