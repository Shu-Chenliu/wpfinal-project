import { NextResponse, type NextRequest } from "next/server";

import Pusher from "pusher";

import { db } from "@/db";
import { messagesTable} from "@/db/schema";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";
import {eq } from "drizzle-orm";
import { z } from "zod";
const postMessageSchema = z.object({
  text:z.string().max(100),
  authorId:z.string(),
  chatRoomId:z.string(),
});
const updateMessageSchema =z.object({
  id:z.number(),
  read:z.boolean(),
});
type PostMessageRequest = z.infer<typeof postMessageSchema>;
type updateMessageRequest = z.infer<typeof updateMessageSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postMessageSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { text,authorId,chatRoomId} = data as PostMessageRequest;
  await db
    .insert(messagesTable)
    .values({
      text,
      authorId,
      chatRoomId
    })
    const pusher = new Pusher({
      appId: privateEnv.PUSHER_ID,
      key: publicEnv.NEXT_PUBLIC_PUSHER_KEY,
      secret: privateEnv.PUSHER_SECRET,
      cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
      useTLS: true,
    });
    // Private channels are in the format: private-...
    await pusher.trigger(`private-${chatRoomId}`, "chatRoom:update", {
      senderId:authorId,
    });
  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateMessageSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,read } = data as updateMessageRequest;
  await db
    .update(messagesTable)
    .set({read})
    .where(eq(messagesTable.id, id))
  return new NextResponse("OK", { status: 200 });
}