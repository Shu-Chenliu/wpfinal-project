
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState,useCallback } from "react";

import { useSession } from "next-auth/react";
import { pusherClient } from "@/lib/pusher/client";
import type { User } from "@/lib/types/db";
type PusherPayload = {
  senderId: User["id"];
  messageId:number,
};
export default function useMessages() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { chatRoomId } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  
  const postMessage = async ({
    text,
    authorId,
    chatRoomId,
  }: {
    text:string,
    authorId:string,
    chatRoomId:string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/messages", {
      method: "POST",
      body: JSON.stringify({
        text,
        authorId,
        chatRoomId,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();

    setLoading(false);
    
  };
  const updateMessage = useCallback(async ({
    id,
    read,
  }: {
    id: number,
    read: boolean,
  }) => {
    setLoading(true);

    const res = await fetch("/api/messages", {
      method: "PUT",
      body: JSON.stringify({
        id,
        read,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }   // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  },[router])
  useEffect(()=>{
    if (!chatRoomId) return;
    // Private channels are in the format: private-...
    const channelName = `private-${chatRoomId}`;
    try {
      const channel = pusherClient.subscribe(channelName);
      channel.bind("chatRoom:update", async({ senderId,messageId }: PusherPayload) => {
        if (senderId === userId) {
          return;
        }
        router.refresh();
        await updateMessage({
          id:messageId,
          read: true,
        });
        const messageContainer = window.document.getElementById("messages container");
        if (messageContainer) {
          messageContainer.scrollTop = messageContainer.scrollHeight-messageContainer.clientHeight+10;
        }
      });
    } catch (error) {
      console.error(error);
      router.push("/homepage/Chat");
    }
    return () => {
      pusherClient.unsubscribe(channelName);
    };
    // Unsubscribe from pusher events when the component unmounts
  },[router,chatRoomId,userId,updateMessage]);
  return {
    postMessage,
    updateMessage,
    loading,
  };
}
