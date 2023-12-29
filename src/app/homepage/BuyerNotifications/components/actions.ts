import { db } from "@/db";
export const getAllNotificationsOfBuyer = async(username:string) =>{
  "use server";
  const notifications= await db.query.notifications.findMany({
    where:(notifications, { eq,and }) => and(eq(notifications.buyer, username), eq(notifications.shipped,true)),
    orderBy: (notifications, { desc }) => [desc(notifications.sendAt)],
    columns:{
      id:true,
      text:true,
      seller:true,
      money:true,
      address:true,
      readByBuyer:true,
      number:true,
      commented:true,
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
          imageUrl:true,
        }
      }
    }
  })
  return notifications;
}