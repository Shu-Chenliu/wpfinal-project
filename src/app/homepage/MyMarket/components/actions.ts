import { db } from "@/db";
import { posts,postsRelations } from "@/db/schema";
export const getAllProductsPostedByUser = async(userId:string) =>{
  "use server";
  const Products= await db.query.posts.findMany({
    where:(posts, { eq }) => eq(posts.authorId, userId),
    columns:{
      id:true,
      title:true,
      price:true,
      left:true,
      category:true,
    },
    with:{
      author: {
        columns: {
          username:true,
        }
      }
    }
  })
  return Products;
}