import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useChatrooms() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postChatroom = async ({
    sellerName,
    buyerName,
  }: {
    sellerName: string,
    buyerName: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/chatRoom", {
      method: "POST",
      body: JSON.stringify({
        sellerName,
        buyerName,
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
  const updateChatroom = async ({
    id,
    isFirstMessage,
  }: {
    id: string,
    isFirstMessage: boolean,
  }) => {
    setLoading(true);

    const res = await fetch("/api/chatRoom", {
      method: "PUT",
      body: JSON.stringify({
        id,
        isFirstMessage,
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
  const deleteChatroom = async ({
    id,
  }: {
    id: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/chatRoom", {
      method: "DELETE",
      body: JSON.stringify({
        id,
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
    postChatroom,
    updateChatroom,
    deleteChatroom,
    loading,
  };
}
