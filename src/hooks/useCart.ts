import { useState } from "react";
import { useRouter} from "next/navigation";

export default function useCart() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deleteCart = async ({
    userId,
    postId,
  }: {
    userId: string,
    postId: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/users_to_cart", {
      method: "DELETE",
      body: JSON.stringify({
        userId,
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
  

  return {
    deleteCart,
    loading,
  };
}
