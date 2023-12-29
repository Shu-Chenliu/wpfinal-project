import { useState } from "react";
import { useRouter } from "next/navigation";

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
    imageUrl,
  }: {
    title: string;
    description?: string;
    authorId: string;
    category: string;
    price: number;
    left: number;
    imageUrl?: string,
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
        imageUrl,
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
    buyerNumber,
    title,
    description,
  }: {
    id: string,
    left?: number,
    sold?: number,
    likes?: number,
    buyerNumber?: number,
    title?: string,
    description?: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify({
        id,
        left:left,
        sold:sold,
        likes:likes,
        buyerNumber:buyerNumber,
        title,
        description,
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
  const deleteProduct = async ({
    id,
  }: {
    id: string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/posts", {
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
    postProduct,
    updateProduct,
    deleteProduct,
    loading,
  };
}
