import { db } from "@/db";
import { posts,postsRelations } from "@/db/schema";
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
    where:(notifications, { eq }) => (eq(notifications.seller, userId), eq(notifications.readBySeller,false)),
  })
  return unreadNotifications;
}
export const getUnreadNotificationsOfBuyer = async(userId:string) =>{
  "use server";
  const unreadNotifications= await db.query.notifications.findMany({
    where:(notifications, { eq }) => (eq(notifications.buyer, userId), eq(notifications.readByBuyer,false)),
  })
  return unreadNotifications;
}