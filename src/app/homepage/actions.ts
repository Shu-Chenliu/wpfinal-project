import { db } from "@/db";
export const getAllProducts = async() =>{
  "use server";
  const Products= await db.query.posts.findMany({
    columns:{
      id:true,
      displayId:true,
      title:true,
      price:true,
      left:true,
      category:true,
      likes:true,
      imageUrl:true,      
    },
    with:{
      author: {
        columns: {
          username:true,
        }
      }
    }
  })
  return Products;
}
export const getUnreadNotificationsOfSeller = async(userId:string) =>{
  "use server";
  const unreadNotifications= await db.query.notifications.findMany({
    where:(notifications, { eq,and }) => and(eq(notifications.seller,userId),eq(notifications.readBySeller,false)),
  })
  return unreadNotifications;
}
export const getUnreadNotificationsOfBuyer = async(userId:string) =>{
  "use server";
  const notifications= await db.query.notifications.findMany({
    where:(notifications, { eq,and }) => and(eq(notifications.buyer, userId), eq(notifications.readByBuyer,false),eq(notifications.shipped,true)),
  })
  return notifications;
}
export const getShoppingCart=async(userId:string)=>{
  "use server";
  const shoppingCart=await db.query.usersToCart.findMany({
    where:(usersToCart, { eq}) => eq(usersToCart.userId,userId),
  });
  return shoppingCart;
}
export const getUnreadMessages=async(userId:string)=>{
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
  for(let i=0;i<buyerchatRooms.length;i++){
    unreadMessages+=buyerchatRooms[i].chatRoomId.messages.length;
  }
  return unreadMessages;
};