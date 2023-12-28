
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useSession } from "next-auth/react";



import { pusherClient } from "@/lib/pusher/client";
import type { chatRoom, User } from "@/lib/types/db";
type PusherPayload = {
  senderId: User["id"];
  chatRoom: chatRoom;
};
export default function useMessages() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { chatRoomId } = useParams();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  useEffect(()=>{
    if (!chatRoomId) return;
    // Private channels are in the format: private-...
    const channelName = `private-${chatRoomId}`;
    console.log("channelname",channelName);
    try {
      const channel = pusherClient.subscribe(channelName);
      console.log("channel",channel);
      channel.bind("chatRoom:update", ({ senderId }: PusherPayload) => {
        if (senderId === userId) {
          console.log("return");
          return;
        }
        router.refresh();
        console.log("refresh");
      });
    } catch (error) {
      console.error(error);
      router.push("/homepage/Chat");
    }
    return () => {
      pusherClient.unsubscribe(channelName);
    };
    // Unsubscribe from pusher events when the component unmounts
  },[router,chatRoomId]);
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
  
  return {
    postMessage,
    loading,
  };
}
