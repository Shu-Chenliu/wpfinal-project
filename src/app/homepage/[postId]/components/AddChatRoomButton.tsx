"use client";
import { Button } from "@/components/ui/button";
import { MessagesSquare } from "lucide-react";
import useMessages from "@/hooks/useMessage";
type AddChatRoomButtonProps = {
  userId:string,
  seller:string,
  addChatRoom:(userId:string,sellerId:string)=>void,
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function AddChatRoomButton({
  userId,seller,addChatRoom
}: AddChatRoomButtonProps) {
  const {postMessage} = useMessages();
  const handleAddChatRoom =async()=>{
    addChatRoom(userId,seller);
  }
  return (
    <div>
      <Button
        onClick={handleAddChatRoom}
        className="mt-3 flex font-semibold bg-slate-600  hover:bg-yellow-500 hover:text-slate-700"
      ><MessagesSquare className="m-2" />
        Chat with seller
      </Button>
    </div>
  );
}
