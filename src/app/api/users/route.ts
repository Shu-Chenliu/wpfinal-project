import { NextResponse, type NextRequest } from "next/server";

import {  eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { z } from "zod";

const updateUserSchema=z.object({
  id:z.string(),
  address:z.string().optional(),
  username:z.string().optional(),
  imageURL:z.string().optional(),
  sellername:z.string().optional(),
  selleraddress:z.string().optional(),
  marketDescription:z.string().optional(),
  marketMessage:z.string().optional(),
  marketUrl:z.string().optional(),
  userChatRoomState:z.string().optional(),
});

type updateUserRequest = z.infer<typeof updateUserSchema>;

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,address,imageURL,username,sellername,selleraddress,marketDescription,marketMessage,marketUrl,userChatRoomState } = data as updateUserRequest;
  await db
    .update(usersTable)
    .set({address,imageURL,username,sellername,selleraddress,marketDescription,marketMessage,marketUrl,userChatRoomState})
    .where(eq(usersTable.displayId, id))
  return new NextResponse("OK", { status: 200 });
}