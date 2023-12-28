import { db } from "@/db";
import { usersToChatofSeller,usersToChatofBuyer,usersTable } from "@/db/schema";
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