import { db } from "@/db";
import { usersTable,posts,postsRelations,usersToCart,comments,chatRoom,usersToChatofSeller,usersToChatofBuyer} from "@/db/schema";

export const getProduct=async (postId:string)=>{
  const Product=await db.query.posts.findFirst({
    where:(posts, { eq }) => eq(posts.displayId, postId),
    columns: {
      title:true,
      description:true,
      category:true,
      price:true,
      left:true,
      sold:true,
      likes:true,
    },
    with:{
      author:{
        columns:{
          displayId:true,
          username:true,
        }
      }
    }
  });
  return Product;
}
export const addToCart=async(userId:string,postId:string)=>{
  "use server";
  await db
    .insert(usersToCart)
    .values({
      userId:userId,
      postId:postId
    })
    .execute();
}
export const getComments=async(postId:string)=>{
  "use server";
  const comments=await db.query.comments.findMany({
    where:(comments, { eq }) => eq(comments.postId, postId),
      columns:{
        id:true,
        text:true,
        author:true,
        stars:true,
      }
  });
  return comments;
}
export const getMyShoppingCart = async(userId:string) => {
  const Cart=await db.query.usersToCart.findMany({
    where:(usersToCart, { eq }) => eq(usersToCart.userId, userId),
  })
  return Cart;
}
export const createChatRoom = async (userId: string,sellerId:string,sellerName:string,buyerName:string) => {
  "use server";

  const newChatroomId = await db.transaction(async (tx) => {
    const [newChatroom] = await tx
      .insert(chatRoom)
      .values({
        sellerName,
        buyerName
      })
      .returning();
    await tx.insert(usersToChatofSeller).values({
      sellerId,
      chatRoomId: newChatroom.displayId,
    });
    await tx.insert(usersToChatofBuyer).values({
      buyerId:userId,
      chatRoomId:newChatroom.displayId,
    });
    return newChatroom.displayId;
  });
  return newChatroomId;
};