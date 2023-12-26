import { db } from "@/db";
import { notifications } from "@/db/schema";
import { eq } from 'drizzle-orm';
export const getAllNotificationsOfSeller = async(username:string) =>{
  "use server";
  const notification= await db.query.notifications.findMany({
    where:(notifications, { eq }) => (eq(notifications.seller, username)),
    columns:{
      id:true,
      text:true,
      buyer:true,
      money:true,
      address:true,
    },
    with:{
      post:{
        columns:{
          displayId:true,
          title:true,
          authorId:true,
          price:true,
          left:true,
          sold:true,
          likes:true,
          buyerNumber:true,
          category:true,
        }
      }
    }
  });
  return notification;
}