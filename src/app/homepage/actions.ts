import { db } from "@/db";
import { posts,postsRelations,notifications } from "@/db/schema";
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
    where:(usersToCart, { eq,and }) => eq(usersToCart.userId,userId),
  });
  return shoppingCart;
}