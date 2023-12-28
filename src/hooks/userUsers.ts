import { useState } from "react";
import { useRouter,useSearchParams } from "next/navigation";

export default function useUsers() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const updateUser = async ({
    id,
    address,
    imageURL,
    username,
    email,
    sellername,
    selleraddress,
    marketDescription,
    marketMessage,
    marketUrl,
    userChatRoomState,
  }: {
    id: string,
    address?: string,
    imageURL?: string,
    username?:string,
    email?:string,
    sellername?:string,
    selleraddress?:string,
    marketDescription?:string,
    marketMessage?:string,
    marketUrl?:string,
    userChatRoomState?:string,
  }) => {
    setLoading(true);

    const res = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({
        id,
        address,
        imageURL,
        username,
        email,
        sellername,
        selleraddress,
        marketDescription,
        marketMessage,
        marketUrl,
        userChatRoomState,
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
    updateUser,
    loading,
  };
}
