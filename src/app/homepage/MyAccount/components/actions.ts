import { db } from "@/db";
import { coupons } from "@/db/schema";
import { eq } from "drizzle-orm";
export const getUserProfile = async(userDisplayId:string) =>{
  "use server";
  const user= await db.query.usersTable.findFirst({
    where:(usersTable, { eq }) => eq(usersTable.displayId, userDisplayId),
    columns:{
      username:true,
      email:true,
      imageURL:true,
      address:true,
      sellername:true,
      selleraddress:true,
      marketDescription:true,
      marketMessage:true,
      marketUrl:true,
    },
    with:{
      posts:{
        columns:{
          id:true,
          title:true,
        }
      }
    }
  });
  return user;
}
export const getMyCoupon=async(userId:string)=>{
  const Coupons=await db
    .select({
      id:coupons.id,
      percent:coupons.percent,
    })
    .from(coupons)
    .where(eq(coupons.owner,userId))
    .execute()
  return Coupons;
}