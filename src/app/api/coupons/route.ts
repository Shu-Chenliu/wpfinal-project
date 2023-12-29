import { NextResponse, type NextRequest } from "next/server";

import {eq } from "drizzle-orm";

import { db } from "@/db";
import { coupons} from "@/db/schema";


import { z } from "zod";
const postCouponSchema = z.object({
  owner:z.string(),
  percent:z.number(),
});
const deleteCouponSchema = z.object({
  id:z.number(),
});
type PostCouponRequest = z.infer<typeof postCouponSchema>;
type deleteCouponRequest = z.infer<typeof deleteCouponSchema>;
export async function POST(request: NextRequest) {
  const data = await request.json();
  try {
    postCouponSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { owner,percent} = data as PostCouponRequest;
  await db
    .insert(coupons)
    .values({
      owner,
      percent,
    })
  return new NextResponse("OK", { status: 200 });
}
export async function DELETE(request: NextRequest) {
  const data = await request.json();
  try {
    deleteCouponSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id } = data as deleteCouponRequest;
  await db
    .delete(coupons)
    .where(eq(coupons.id, id))
    .execute()
  return new NextResponse("OK", { status: 200 });
}