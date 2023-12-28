import { useState } from "react";
import { useRouter } from "next/navigation";

export default function useCoupons() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postCoupon = async ({
    owner,
    percent,
  }: {
    owner:string,
    percent:number,
  }) => {
    setLoading(true);

    const res = await fetch("/api/coupons", {
      method: "POST",
      body: JSON.stringify({
        owner,
        percent,
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
  const deleteCoupons = async ({
    id,
  }: {
    id: number,
  }) => {
    setLoading(true);

    const res = await fetch("/api/coupons", {
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
    postCoupon,
    deleteCoupons,
    loading,
  };
}
