import { useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function useComments() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postComment = async ({
    text,
    authorId,
    postId,
    stars,
  }: {
    text?: string,
    authorId: string,
    postId:string,
    stars:number,
  }) => {
    setLoading(true);

    const res = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({
        text,
        authorId,
        postId,
        stars,
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
    postComment,
    loading,
  };
}
