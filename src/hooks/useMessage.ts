import { useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function useCoupons() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

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
