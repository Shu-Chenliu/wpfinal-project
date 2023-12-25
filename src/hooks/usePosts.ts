import { useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function usePosts() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postProduct = async ({
    title,
    description,
    authorId,
    price,
    left,
  }: {
    title: string;
    description?: string;
    authorId: string;
    price: number;
    left: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        authorId,
        price,
        left,
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
    postProduct,
    loading,
  };
}
