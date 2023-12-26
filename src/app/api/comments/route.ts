import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { comments } from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

import { z } from "zod";

const postCommentSchema = z.object({
  text: z.string().min(1).max(280).optional(),
  authorId: z.string().min(1).max(50),
  postId: z.string(),
  stars:z.number().min(0).max(5),
});
type PostCommentRequest = z.infer<typeof postCommentSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postCommentSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { text,authorId,postId,stars} = data as PostCommentRequest;
  await db
    .insert(comments)
    .values({
      text,
      authorId: authorId,
      postId: postId,
      stars: stars,
    })
  return new NextResponse("OK", { status: 200 });
}