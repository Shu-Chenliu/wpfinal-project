import { NextResponse, type NextRequest } from "next/server";

import { and, eq } from "drizzle-orm";
import Pusher from "pusher";

import { db } from "@/db";
import { usersTable } from "@/db/schema";
import { auth } from "@/lib/auth";
import { privateEnv } from "@/lib/env/private";
import { publicEnv } from "@/lib/env/public";

import { z } from "zod";

const updateUserSchema=z.object({
  id:z.string(),
  address:z.string().optional(),
  imageURL:z.string().optional(),
});

type updateUserRequest = z.infer<typeof updateUserSchema>;

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,address,imageURL } = data as updateUserRequest;
  await db
    .update(usersTable)
    .set({address,imageURL})
    .where(eq(usersTable.displayId, id))
  return new NextResponse("OK", { status: 200 });
}