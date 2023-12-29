import { db } from "@/db";
export const getAllNotificationsOfSeller = async(username:string) =>{
  "use server";
  const notification= await db.query.notifications.findMany({
    where:(notifications, { eq }) => (eq(notifications.seller, username)),
    orderBy: (notifications, { desc }) => [desc(notifications.sendAt)],
    columns:{
      id:true,
      text:true,
      buyer:true,
      money:true,
      address:true,
      readBySeller:true,
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
          imageUrl:true,
        }
      }
    }
  });
  return notification;
}