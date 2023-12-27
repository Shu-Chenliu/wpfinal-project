"use client";
import {useState,useRef,useCallback,useEffect}from "react"
import useMessage from "@/hooks/useMessage";
type Props={
  userId:string,
  chatRoomId:string,
}
function InputBar({userId,chatRoomId}:Props) {
  const {postMessage}=useMessage();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleSend=async()=>{
    if(inputRef.current&&inputRef.current.value.length>0){
      await postMessage({
        text:inputRef.current.value,
        authorId:userId,
        chatRoomId,
      });
      // setLatestText(inputRef.current.value);
      inputRef.current.value="";
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
          className="bg-slate-200 hover:bg-slate-400 rounded-lg px-2 py-1 my-1 text-slate-700 outline-0 " 
          onClick={handleSend}
        >send</button>
      </nav> 
  );
}

export default InputBar;
