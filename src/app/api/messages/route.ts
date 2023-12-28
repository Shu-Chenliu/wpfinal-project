import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { messagesTable} from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

import { z } from "zod";
const postMessageSchema = z.object({
  text:z.string().max(100),
  authorId:z.string(),
  chatRoomId:z.string(),
});

type PostMessageRequest = z.infer<typeof postMessageSchema>;
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
