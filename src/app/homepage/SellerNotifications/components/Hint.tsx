"use client";
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';

export default function Hint() {
const [showHint,setShowHint]=useState(false);
return(
    <>
    <div className=" flex ml-auto ">
        {showHint &&
            <p className="ml-auto text-sm text-slate-500 mt-4 p-2 ">
                After checking orders, your products will be send to buyers immediately. 
            </p>
        }
        <Lightbulb onClick={()=>{setShowHint(!showHint)}}  className={`ml-auto mt-1 mr-1 text-${showHint ? 'cyan' : 'slate'}-500`} size={20}/>
    </div>
    </>
    )
}