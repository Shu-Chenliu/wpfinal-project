import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { chatRoom} from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

import { z } from "zod";
const postChatSchema = z.object({
  
});
const deleteChatSchema = z.object({
  id:z.string(),
});
type PostChatRequest = z.infer<typeof postChatSchema>;
type deleteChatRequest = z.infer<typeof deleteChatSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postChatSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { } = data as PostChatRequest;
  await db
    .insert(chatRoom)
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