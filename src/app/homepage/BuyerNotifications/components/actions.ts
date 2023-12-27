import { db } from "@/db";
import { notifications } from "@/db/schema";
export const getAllNotificationsOfBuyer = async(username:string) =>{
  "use server";
  const notifications= await db.query.notifications.findMany({
    where:(notifications, { eq }) => (eq(notifications.buyer, username), eq(notifications.shipped,true)),
    columns:{
      id:true,
      text:true,
      seller:true,
      money:true,
      address:true,
      readByBuyer:true,
      number:true,
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
  })
  return notifications;
}