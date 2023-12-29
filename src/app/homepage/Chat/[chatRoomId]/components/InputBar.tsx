"use client";
import {useState,useRef,useCallback,useEffect}from "react"
import useMessage from "@/hooks/useMessage";
import useChatRoom from "@/hooks/useChatroom";
type Props={
  userId:string,
  chatRoomId:string,
  isFirstMessage:boolean,
  isBuyer:boolean,
  marketMessage:string,
  sellerId:string,
}
function InputBar({userId,chatRoomId,isFirstMessage,isBuyer,marketMessage,sellerId}:Props) {
  const {postMessage}=useMessage();
  const {updateChatroom}=useChatRoom();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSend=async()=>{
    if(inputRef.current&&inputRef.current.value.length>0){
      await postMessage({
        text:inputRef.current.value,
        authorId:userId,
        chatRoomId,
      });
      if((!isFirstMessage)&&isBuyer){
        await updateChatroom({
          id:chatRoomId,
          isFirstMessage:true,
        });
        await postMessage({
          text:marketMessage,
          authorId:sellerId,
          chatRoomId,
        });
      }
      // setLatestText(inputRef.current.value);
      inputRef.current.value="";
      const messageContainer = window.document.getElementById("messages container");
      console.log(messageContainer);
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight-messageContainer.clientHeight+10;
      }
    }
  }
  const handleUserKeyPress = useCallback(async(e: KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  },[handleSend]);
  
  useEffect(() => {
    window.addEventListener("keydown", handleUserKeyPress);
    return () => {
      window.removeEventListener("keydown", handleUserKeyPress);
    };
}, [handleUserKeyPress]);
  return (
      <nav className="relative sticky bottom-0 flex w-full justify-between p-2 shadow-sm">
        <input
          ref={inputRef}
          placeholder="Your message..."
          className="w-full mx-1 text-md flex-1 border border-gray-300 p-1 rounded-md outline-none focus:border-gray-600 transition duration-200 ease-in-out rounded-lg px-2 py-1 outline-0 focus:bg-slate-100"
        />
        <button
          className="font-semibold bg-slate-600 text-slate-100 hover:text-yellow-500 hover:bg-slate-700 rounded-lg px-2 py-1 my-1  outline-0 " 
          onClick={handleSend}
        >send</button>
      </nav> 
  );
}

export default InputBar;
