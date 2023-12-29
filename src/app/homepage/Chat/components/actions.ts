import { db } from "@/db";

export const getAllChatOfSeller = async(userId:string) =>{
  "use server";
  const ChatOfSeller= await db.query.usersToChatofSeller.findMany({
    where:(usersToChatofSeller, { eq }) => eq(usersToChatofSeller.sellerId, userId),
    with:{
      chatRoomId:{
        columns:{
          displayId:true,
          buyerName:true,
        },
        with:{
          messages:{
            where:(messages, { eq,and,ne }) => and(eq(messages.read, false), ne(messages.authorId,userId)),
          },
        }
      },
    }
  })
  return ChatOfSeller;
}
export const getAllChatOfBuyer = async(userId:string) =>{
  "use server";
  const ChatOfBuyer= await db.query.usersToChatofBuyer.findMany({
    where:(usersToChatofBuyer, { eq }) => eq(usersToChatofBuyer.buyerId, userId),
    with:{
      chatRoomId:{
        columns:{
          displayId:true,
          sellerName:true,
        },
        with:{
          messages:{
            where:(messages, { eq,and,ne }) => and(eq(messages.read, false), ne(messages.authorId,userId)),
          },
        }
      }
    }
  })
  return ChatOfBuyer;
}
export const getUserState=async(userId:string)=>{
  "use server";
  const ChatRoomState=await db.query.usersTable.findFirst({
    where:(usersTable, { eq }) => eq(usersTable.displayId, userId),
    columns:{
      userChatRoomState:true,
    }
  })
  return ChatRoomState;
}
export const getUnreadMessagesOfSeller=async(userId:string)=>{
  "use server";
  const sellerchatRooms=await db.query.usersToChatofSeller.findMany({
    where:(usersToChatofSeller, { eq,and }) => and(eq(usersToChatofSeller.sellerId,userId)),
    with:{
      chatRoomId:{
        with:{
          messages:{
            where:(messages, { eq,and,ne }) => and(eq(messages.read,false),ne(messages.authorId,userId)),
          }
        }
      }
    }
  });
  let unreadMessages=0;
  for(let i=0;i<sellerchatRooms.length;i++){
    unreadMessages+=sellerchatRooms[i].chatRoomId.messages.length;
  }
  return unreadMessages;
};
export const getUnreadMessagesOfBuyer=async(userId:string)=>{
  const buyerchatRooms=await db.query.usersToChatofBuyer.findMany({
    where:(usersToChatofBuyer, { eq,and }) => and(eq(usersToChatofBuyer.buyerId,userId)),
    with:{
      chatRoomId:{
        with:{
          messages:{
            where:(messages, { eq,and,ne }) => and(eq(messages.read,false),ne(messages.authorId,userId)),
          }
        }
      }
    }
  });
  let unreadMessages=0;
  for(let i=0;i<buyerchatRooms.length;i++){
    unreadMessages+=buyerchatRooms[i].chatRoomId.messages.length;
  }
  return unreadMessages;
}
export const getChatRoomMessages=async(chatRoomId:string)=>{
  const messages=await db.query.messagesTable.findMany({
    where:(messagesTable,{eq})=>eq(messagesTable.chatRoomId,chatRoomId),
    columns:{
      id:true,
      read:true,
    }
  });
  return messages;
}