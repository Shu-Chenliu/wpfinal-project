"use client";
import useMessage from "@/hooks/useMessage";
import {Button}from "@/components/ui/button";
type Props={
  buyerName:string,
  messagesId:number[],
}
function LinkButton({buyerName,messagesId}:Props) {
  const {updateMessage}=useMessage();
  const handleClick = async()=>{
    for(const id of messagesId){
      await updateMessage({
        id:id,
        read:true,
      });
    }
  }
  return (
    <Button className="flex my-2 bg-slate-700 hover:bg-slate-700 hover:text-orange-500 m-2"
      onClick={handleClick}
     >
      {buyerName}<span className=" text-orange-500 hover:text-orange-500  m-2 px-1  rounded-full">{messagesId.length}</span>
    </Button>  
  );
}

export default LinkButton;
