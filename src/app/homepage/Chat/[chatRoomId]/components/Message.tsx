"use client";


import React from "react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";


type MessageProps = {
  id: number;
  isSender: boolean;
  content: string;
};

export default function Message({
  id,
  isSender,
  content,
}: MessageProps) {
  
  
  return (
    <>
    {/* {content} */}
      <div
        className={`my-2 mx-2 flex flex-row items-end gap-2 ${
          isSender && "justify-end"
        }`}
      >
        <div
          className={` rounded-2xl px-3 py-1 leading-6 ${
            isSender ? "bg-purple-300 text-white" : " bg-blue-300 text-white"
          }`}
        >
          {content}
        </div>
      </div>

    </>
  );
}

