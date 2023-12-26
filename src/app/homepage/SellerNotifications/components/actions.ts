import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq } from 'drizzle-orm';
export const getAllNotificationsOfSeller = async(username:string) =>{
  "use server";
  const notification= await db
    .select({
      id:notifications.id,
      text: notifications.text,
      buyer: notifications.buyer,
      money: notifications.money,
      address: notifications.address,
    })
    .from(notifications)
    .where(eq(notifications.seller,username))
    .execute();
  return notification;
}