import { db } from "@/db";
import { posts,postsRelations } from "@/db/schema";

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