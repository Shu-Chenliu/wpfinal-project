"use client";
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';

export default function ShoppingCartHint() {
const [showHint,setShowHint]=useState(false);
return(
    <>
    <div className=" flex ml-auto ">
        {showHint &&
        <p className=" mt-5 text-sm text-slate-500 ml-auto justify-end ">Press buy now to place your orders. <br /> You can add products to Shopping Cart at homepage. </p>
        }
        <Lightbulb onClick={()=>{setShowHint(!showHint)}} className="  ml-auto mt-1 mr-1 text-slate-500" size={20}/>
        </div>
    </>
    )
}