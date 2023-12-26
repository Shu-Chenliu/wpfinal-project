import { db } from "@/db";
import { notifications } from "@/db/schema";
export const getAllNotificationsOfBuyer = async(userId:string) =>{
  "use server";
  const notifications= await db.query.notifications.findMany({
    where:(notifications, { eq }) => eq(notifications.buyer, userId),
    columns:{
      id:true,
      text:true,
      buyer:true,
      seller:true,
      money:true,
      address:true,
    },
  })
  return notifications;
}