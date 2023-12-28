import { db } from "@/db";


export const getMessages=async (chatRoomId:string)=>{
  const Messages=await db.query.messagesTable.findMany({
    where:(messagesTable, { eq }) => eq(messagesTable.chatRoomId, chatRoomId),
    orderBy: (messagesTable, { asc }) => [asc(messagesTable.sendAt)],
    columns:{
      id:true,
      text:true,
      authorId:true,
    }
  });
  return Messages;
}
export const getOtherPeople=async(username:string,chatRoomId:string)=>{
  const chatRoom=await db.query.chatRoom.findFirst({
    where:(chatRoom, { eq }) => eq(chatRoom.displayId, chatRoomId),
    columns:{
      sellerName:true,
      buyerName:true,
    }
  });
  if(!chatRoom) return;
  else if(username===chatRoom.buyerName){
    return chatRoom.sellerName;
  }
  else {
    return chatRoom.buyerName;
  }
}