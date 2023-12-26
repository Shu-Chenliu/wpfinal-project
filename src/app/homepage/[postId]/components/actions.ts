import { db } from "@/db";
import { usersTable,posts,postsRelations,usersToCart } from "@/db/schema";

export const getProduct=async (postId:string)=>{
  const Product=await db.query.posts.findFirst({
    where:(posts, { eq }) => eq(posts.displayId, postId),
    columns: {
      title:true,
      description:true,
      category:true,
      price:true,
      left:true,
      sold:true,
      likes:true,
    },
    with:{
      author:{
        columns:{
          displayId:true,
          username:true,
        }
      }
    }
  });
  return Product;
}
export const addToCart=async(userId:string,postId:string)=>{
  "use server";
  await db
    .insert(usersToCart)
    .values({
      userId:userId,
      postId:postId
    })
    .execute();
}