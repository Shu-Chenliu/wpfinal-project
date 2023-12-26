import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { posts } from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

import { z } from "zod";

const postProductSchema = z.object({
  title: z.string().min(1).max(100),
  description:z.string().optional(),
  authorId: z.string().min(1).max(50),
  category: z.string(),
  price:z.number().positive(),
  left:z.number().nonnegative(),
});
const updateProductSchema=z.object({
  id:z.string(),
  left:z.number().nonnegative().optional(),
  sold:z.number().nonnegative().optional(),
  likes:z.number().optional(),
  buyerNumber:z.number().nonnegative().optional(),
});
type PostProductRequest = z.infer<typeof postProductSchema>;
type updateProductRequest = z.infer<typeof updateProductSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postProductSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { title,description,authorId,price,left,category} = data as PostProductRequest;
  await db
    .insert(posts)
    .values({
      title,
      description: description,
      authorId: authorId,
      category: category,
      price: price,
      left: left,
    })

  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateProductSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,left,sold,likes,buyerNumber } = data as updateProductRequest;
  await db
    .update(posts)
    .set({left,sold,likes,buyerNumber})
    .where(eq(posts.displayId, id))
  return new NextResponse("OK", { status: 200 });
}