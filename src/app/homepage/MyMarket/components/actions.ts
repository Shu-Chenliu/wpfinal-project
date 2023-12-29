import { db } from "@/db";
export const getAllProductsPostedByUser = async(userId:string) =>{
  "use server";
  const Products= await db.query.posts.findMany({
    where:(posts, { eq }) => eq(posts.authorId, userId),
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
    columns:{
      id:true,
      title:true,
      price:true,
      left:true,
      category:true,
      displayId:true,
      likes:true,
      imageUrl:true,
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