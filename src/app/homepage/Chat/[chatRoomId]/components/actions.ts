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
      sendFirstMessage:true,
    }
  });
  if(!chatRoom) return;
  else if(username===chatRoom.buyerName){
    return [chatRoom.sellerName,"seller"];
  }
  else {
    return [chatRoom.buyerName,"buyer"];
  }
}
export const getChatRoom=async(chatRoomId:string)=>{
  const chatRoom=await db.query.chatRoom.findFirst({
    where:(chatRoom, { eq }) => eq(chatRoom.displayId, chatRoomId),
    columns:{
      sendFirstMessage:true,
    }
  });
  return chatRoom;
}
export const getOtherPeopleInfo = async(username:string)=>{
  const otherPeople=await db.query.usersTable.findFirst({
    where:(usersTable,{eq,or})=>or(eq(usersTable.sellername,username),eq(usersTable.username,username)),
    columns:{
      displayId:true,
      marketMessage:true,
    }
  });
  return otherPeople;
}