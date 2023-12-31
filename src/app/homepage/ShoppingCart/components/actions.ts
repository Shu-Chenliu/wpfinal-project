import { db } from "@/db";
import { eq } from 'drizzle-orm';
import { coupons } from "@/db/schema";
export const getMyShoppingCart = async(userId:string) => {
  const Cart=await db.query.usersToCart.findMany({
    where:(usersToCart, { eq }) => eq(usersToCart.userId, userId),
    with:{
      posts: {
        columns:{
          id:true,
          displayId:true,
          title:true,
          category:true,
          price:true,
          left:true,
          likes:true,
          imageUrl:true,
        },
        with:{
          author:{
            columns:{
              username:true,
              sellername:true,
            }
          }
        }
      },
    }
  })
  return Cart;
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

export const getAddress=async(userId:string)=>{
  const userAddress=await db.query.usersTable.findFirst({
    where:(usersTable,{eq})=>eq(usersTable.displayId,userId),
    columns:{
      address:true,
    }
  });
  return userAddress;
}