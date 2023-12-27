import { db } from "@/db";
import { usersToChatofSeller,usersToChatofBuyer } from "@/db/schema";
export const getAllChatOfSeller = async(userId:string) =>{
  "use server";
  const ChatOfSeller= await db.query.usersToChatofSeller.findMany({
    where:(usersToChatofSeller, { eq }) => eq(usersToChatofSeller.sellerId, userId),
    with:{
      chatRoomId:{
        columns:{
          displayId:true,
        }
      }
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
        }
      }
    }
  })
  return ChatOfBuyer;
}