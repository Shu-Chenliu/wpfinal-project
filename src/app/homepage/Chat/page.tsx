import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";

import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";
import {getAllChatOfSeller,getAllChatOfBuyer}from "./components/actions"
type Props = {

};
async function NotificationPage() {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username=session.user.username;
  
  const userId=session.user.id;
  const chatOfSeller=await getAllChatOfSeller(userId);
  const chatOfBuyer=await getAllChatOfBuyer(userId);
  return (
    <>
      
    </>
  );
}
export default NotificationPage;