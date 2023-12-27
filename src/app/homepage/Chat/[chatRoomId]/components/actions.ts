import { db } from "@/db";
import { usersToCart,comments,chatRoom,usersToChatofSeller,usersToChatofBuyer,messagesTable} from "@/db/schema";

export const getMessages=async (chatRoomId:string)=>{
  const Messages=await db.query.messagesTable.findMany({
    where:(messagesTable, { eq }) => eq(messagesTable.chatRoomId, chatRoomId),
    columns:{
      id:true,
      text:true,
      authorId:true,
      sendAt:true,
    }
  });
  return Messages;
}