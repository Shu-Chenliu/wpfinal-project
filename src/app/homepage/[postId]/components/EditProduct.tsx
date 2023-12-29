"use client";
import { useState } from "react";

import ClickAwayListener from "@mui/material/ClickAwayListener";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import { Pencil , Lightbulb } from 'lucide-react';
import usePosts from "@/hooks/usePosts";



// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type Props={
  postId:string,
  editThing:string,
  left?:number,
  title?:string,
  description?:string,
}


export default function EditProfile({postId,editThing,left,title,description}:Props) {
  const {updateProduct}=usePosts();

  const [editting, setEditting] = useState(false);
  const toEdit=editThing==="title"?title:editThing==="left"?left:description;
  const [content,setContent]=useState(toEdit);

  const [showHint, setShowHint] = useState(false);

  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const handleClickAway=async()=>{
    if(!content)return;
    if(editThing==="title"&&typeof content==="string"){
      await updateProduct({
        id:postId,
        title:content,
      });
    }
    else if(editThing==="description"&&typeof content==="string"){
      await updateProduct({
        id:postId,
        description:content,
      });
    }
    else if(editThing==="left"&&typeof content==="string"){
      if(isNaN(parseInt(content))){
        alert("left must be a number");
        return;
      }
      await updateProduct({
        id:postId,
        left:parseInt(content),
      });
    }
    else if(typeof content==="number"){
      await updateProduct({
        id:postId,
        left:content,
      });
    }
  }

  return (
    <>
        {editting ? (
          <>
        <ClickAwayListener    
          onClickAway={() => {
            setEditting(false);
            handleClickAway();
          }}
        >
          <Input
            autoFocus
            type={editThing==="left"?"number":"text"}
            defaultValue={content}
            onChange={(e) => setContent(e.target.value)}
            className="grow mx-2 flex w-full font-semibold text-slate-900"
            placeholder={"Enter your "+(editThing==="title"?"title":editThing==="left"?"product number":"description")}
          />
        </ClickAwayListener>
        <Pencil className="mx-1 " size={10} />
        </>
      ) : (
        <button
          onClick={() => setEditting(true)}
          className="mx-2 w-40 flex w-full font-semibold text-slate-900"
        >
          <Typography className="text-start">{content}</Typography>
          <Pencil className="mx-1 " size={10} />
        </button>

      )}
    </>
    

  );
}
