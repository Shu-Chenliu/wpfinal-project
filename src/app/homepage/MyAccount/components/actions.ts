import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
export const getUserProfile = async(userDisplayId:string) =>{
  "use server";
  const user= await db.query.usersTable.findFirst({
    where:(usersTable, { eq }) => eq(usersTable.displayId, userDisplayId),
    columns:{
      username:true,
      email:true,
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