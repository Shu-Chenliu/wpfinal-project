import { NextResponse, type NextRequest } from "next/server";

import { db } from "@/db";
import { comments } from "@/db/schema";


import { z } from "zod";

const postCommentSchema = z.object({
  text: z.string().min(1).max(280).optional(),
  author: z.string().min(1).max(50),
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
  const { text,author,postId,stars} = data as PostCommentRequest;
  await db
    .insert(comments)
    .values({
      text,
      author: author,
      postId: postId,
      stars: stars,
    })
  return new NextResponse("OK", { status: 200 });
}