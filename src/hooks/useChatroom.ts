import { useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function useChatrooms() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postChatroom = async ({

  }: {
  }) => {
    setLoading(true);

    const res = await fetch("/api/chatRoom", {
      method: "POST",
      body: JSON.stringify({
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
    deleteChatroom,
    loading,
  };
}
