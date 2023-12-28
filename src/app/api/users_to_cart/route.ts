import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { usersToCart } from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

import { z } from "zod";
const deleteCartSchema=z.object({
  userId:z.string(),
  postId:z.string(),
});
type deleteCartRequest = z.infer<typeof deleteCartSchema>;
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteCartSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { userId,postId } = data as deleteCartRequest;
  await db
    .delete(usersToCart)
    .where(and(
      eq(usersToCart.userId, userId),
      eq(usersToCart.postId, postId)
    ))
    .execute()
  return new NextResponse("OK", { status: 200 });
}