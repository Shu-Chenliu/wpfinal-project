import { NextResponse, type NextRequest } from "next/server";

import { eq } from "drizzle-orm";

import { db } from "@/db";
import { notifications} from "@/db/schema";

import { z } from "zod";
const postNotificationSchema = z.object({
  text: z.string().min(1).max(100),
  buyer: z.string().min(1).max(50),
  seller: z.string().min(1).max(50),
  number:z.number().positive(),
  postId:z.string(),
  money:z.number().positive(),
  address:z.string().min(1).max(100),
});
const updateNotificationSchema = z.object({
  id:z.number(),
  shipped:z.boolean().optional(),
  received:z.boolean().optional(),
  readBySeller:z.boolean().optional(),
  readByBuyer:z.boolean().optional(),
  commented:z.boolean().optional(),
});
type PostNotificationRequest = z.infer<typeof postNotificationSchema>;
type updateNotificationRequest = z.infer<typeof updateNotificationSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postNotificationSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { text,buyer,seller,number,money,address,postId} = data as PostNotificationRequest;
  await db
    .insert(notifications)
    .values({
      text,
      buyer,
      seller,
      number,
      money,
      address,
      postId,
    })
  return new NextResponse("OK", { status: 200 });
}
export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateNotificationSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,shipped,received,readBySeller,readByBuyer,commented } = data as updateNotificationRequest;
  await db
    .update(notifications)
    .set({shipped,received,readBySeller,readByBuyer,commented})
    .where(eq(notifications.id, id))
  return new NextResponse("OK", { status: 200 });
}