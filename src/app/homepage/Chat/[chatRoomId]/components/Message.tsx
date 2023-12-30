"use client";
import React from "react";
import { Ghost } from "lucide-react";
import Image from 'next/image';
type MessageProps = {
  id: number;
  isSender: boolean;
  content: string;
  imageUrl?: string,
};

export default function Message({
  isSender,
  content,
  imageUrl,
}: MessageProps) {
  return (
    <>
    {/* {content} */}
      <div
        className={`mx-2 flex flex-row items-end gap-2 ${
          isSender && "ml-auto mx-4"
        }`}
      >
      
      {!isSender&&(imageUrl&&imageUrl!==""?<Image
        src={imageUrl}
        alt="Photo"
        width={16}
        height={16}
      />
      :<Ghost className="text-blue-400"/>)}

        <div
          className={` rounded-2xl px-3 py-1 leading-6 ${
            isSender ? "bg-purple-300 text-white" : " bg-blue-300 text-white"
          }`}
        >
          
          {content}
        </div>
        {isSender&&(imageUrl&&imageUrl!==""?<Image
          src={imageUrl}
          alt="Photo"
          width={16}
          height={16}
        />
        :<Ghost className="text-blue-400"/>)}
      </div>

    </>
  );
}