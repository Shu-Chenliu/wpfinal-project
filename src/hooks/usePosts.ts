import { useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function usePosts() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postProduct = async ({
    title,
    description,
    authorId,
    category,
    price,
    left,
  }: {
    title: string;
    description?: string;
    authorId: string;
    category: string;
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
        category,
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
  const updateProduct = async ({
    id,
    left,
    sold,
    likes,
    commentlike,
  }: {
    id: string,
    left: number,
    sold: number,
    likes: number,
    commentlike: number,
  }) => {
    setLoading(true);

    const res = await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify({
        id,
        left:left-1,
        sold:sold+1,
        likes:(likes*sold+commentlike)/(sold+1),
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
