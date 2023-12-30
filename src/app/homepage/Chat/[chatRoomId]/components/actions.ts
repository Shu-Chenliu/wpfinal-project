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
    },
  });
  if(!chatRoom) return["0",""];
  else if(username===chatRoom.buyerName){
    return [chatRoom.sellerName,"buyer"];
  }
  else {
    return [chatRoom.sellerName,"seller"];
  }
}
export const getChatRoom=async(chatRoomId:string)=>{
  const chatRoom=await db.query.chatRoom.findFirst({
    where:(chatRoom, { eq }) => eq(chatRoom.displayId, chatRoomId),
    columns:{
      sendFirstMessage:true,
    }
  });
  if(!chatRoom){
    return true;
  }
  else{
    return chatRoom.sendFirstMessage;
  }
}
export const getOtherPeopleInfo = async(username:string)=>{
  const otherPeople=await db.query.usersTable.findFirst({
    where:(usersTable,{eq,or})=>or(eq(usersTable.sellername,username),eq(usersTable.username,username)),
    columns:{
      displayId:true,
      marketMessage:true,
      imageURL:true,
      marketUrl:true,
    }
  });
  return otherPeople;
}
export const getUserInfo=async(username:string)=>{
  const userInfo=await db.query.usersTable.findFirst({
    where:(usersTable,{eq,or})=>or(eq(usersTable.sellername,username),eq(usersTable.username,username)),
    columns:{
      displayId:true,
      marketMessage:true,
      imageURL:true,
      marketUrl:true,
    }
  });
  return userInfo;
}