import { NextResponse, type NextRequest } from "next/server";

import {  eq } from "drizzle-orm";


import { db } from "@/db";
import { chatRoom} from "@/db/schema";


import { z } from "zod";
const postChatSchema = z.object({
  sellerName:z.string().max(100),
  buyerName:z.string().max(100),
});
const updateChatRoomSchema=z.object({
  id:z.string(),
  isFirstMessage:z.boolean(),
});
const deleteChatSchema = z.object({
  id:z.string(),
});
type PostChatRequest = z.infer<typeof postChatSchema>;
type updateChatRequest = z.infer<typeof updateChatRoomSchema>;
type deleteChatRequest = z.infer<typeof deleteChatSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postChatSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const {sellerName,buyerName } = data as PostChatRequest;
  await db
    .insert(chatRoom)
    .values({
      sellerName:sellerName,
      buyerName:buyerName,
    })
  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateChatRoomSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,isFirstMessage } = data as updateChatRequest;
  await db
    .update(chatRoom)
    .set({
      sendFirstMessage: isFirstMessage,
    })
    .where(eq(chatRoom.displayId, id))
    .execute()
  return new NextResponse("OK", { status: 200 });
}
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteChatSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id } = data as deleteChatRequest;
  await db
    .delete(chatRoom)
    .where(eq(chatRoom.displayId, id))
    .execute()
  return new NextResponse("OK", { status: 200 });
}