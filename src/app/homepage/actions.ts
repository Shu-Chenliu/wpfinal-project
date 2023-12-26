import { db } from "@/db";
import { posts,postsRelations } from "@/db/schema";
export const getAllProducts = async() =>{
  "use server";
  const Products= await db.query.posts.findMany({
    columns:{
      id:true,
      displayId:true,
      title:true,
      price:true,
      left:true,
      category:true,
      likes:true,
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