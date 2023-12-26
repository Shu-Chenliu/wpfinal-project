import { useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function useNotifications() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postNotification = async ({
    text,
    buyer,
    seller,
    money,
    address,
    postId,
  }: {
    text:string,
    buyer:string,
    seller:string,
    money:number,
    address:string,
    postId:string
  }) => {
    setLoading(true);

    const res = await fetch("/api/notifications", {
      method: "POST",
      body: JSON.stringify({
        text,
        buyer,
        seller,
        money,
        address,
        postId,
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
  const updateNotification = async ({
    id,
    shipped,
    received,
  }: {
    id: number,
    shipped?: boolean,
    received?: boolean,
  }) => {
    setLoading(true);

    const res = await fetch("/api/notifications", {
      method: "PUT",
      body: JSON.stringify({
        id,
        shipped,
        received,
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
    postNotification,
    updateNotification,
    loading,
  };
}
