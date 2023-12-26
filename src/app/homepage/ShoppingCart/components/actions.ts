import { db } from "@/db";
import { usersTable,posts,postsRelations,usersToCart } from "@/db/schema";
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
        }
      }
    }
  })
  return Cart;
}