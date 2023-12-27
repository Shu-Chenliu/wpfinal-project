"use client";
import { Button } from "@/components/ui/button";
import useChatrooms from "@/hooks/useChatroom";
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
  const {postChatroom}=useChatrooms();
  const handleAddChatRoom =()=>{
    addChatRoom(userId,seller);
  }
  return (
    <div>
      <Button
        onClick={handleAddChatRoom}
      >
        talk to seller
      </Button>
    </div>
  );
}
