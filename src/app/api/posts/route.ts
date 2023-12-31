import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schema";


import { z } from "zod";

const postProductSchema = z.object({
  title: z.string().min(1).max(100),
  description:z.string().optional(),
  authorId: z.string().min(1).max(50),
  category: z.string(),
  price:z.number().positive(),
  left:z.number().nonnegative(),
  imageUrl: z.string().optional(),
});
const updateProductSchema=z.object({
  id:z.string(),
  title:z.string().optional(),
  description:z.string().optional(),
  left:z.number().nonnegative().optional(),
  sold:z.number().nonnegative().optional(),
  likes:z.number().optional(),
  buyerNumber:z.number().nonnegative().optional(),
});
const deleteProductSchema=z.object({
  id:z.string(),
});
type PostProductRequest = z.infer<typeof postProductSchema>;
type updateProductRequest = z.infer<typeof updateProductSchema>;
type deleteProductRequest = z.infer<typeof deleteProductSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postProductSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { title,description,authorId,price,left,category,imageUrl} = data as PostProductRequest;
  await db
    .insert(posts)
    .values({
      title,
      description: description,
      authorId: authorId,
      category: category,
      price: price,
      left: left,
      imageUrl,
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
  const { id,left,sold,likes,buyerNumber,title,description } = data as updateProductRequest;
  await db
    .update(posts)
    .set({left,sold,likes,buyerNumber,title,description})
    .where(eq(posts.displayId, id))
  return new NextResponse("OK", { status: 200 });
}
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteProductSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id } = data as deleteProductRequest;
  await db
    .delete(posts)
    .where(eq(posts.displayId, id))
  return new NextResponse("OK", { status: 200 });
}