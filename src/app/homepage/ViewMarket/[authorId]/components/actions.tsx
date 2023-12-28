import { db } from "@/db";
import { posts,postsRelations,notifications } from "@/db/schema";
export const getAllproductOfUser=async(authorId:string)=>{
  "use server";
  const products=await db.query.posts.findMany({
    where:(posts,{eq})=>(eq(posts.authorId,authorId)),
    columns:{
      id:true,
      displayId:true,
      title:true,
      price:true,
      left:true,
      category:true,
      likes:true,
      imageUrl:true,
    }
  })
  return products;
}
export const getSellerInfo=async(userId:string)=>{
  "use server";
  const userInfo=await db.query.usersTable.findFirst({
    where:(usersTable,{eq})=>(eq(usersTable.displayId,userId)),
    columns:{
      sellername:true,
      selleraddress:true,
      marketDescription:true,
      marketUrl:true,
    }
  });
  return userInfo;
}