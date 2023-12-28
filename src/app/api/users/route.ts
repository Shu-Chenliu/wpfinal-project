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
  username:z.string().optional(),
  email:z.string().optional(),
  imageURL:z.string().optional(),
  sellername:z.string().optional(),
  selleraddress:z.string().optional(),
  marketDescription:z.string().optional(),
  marketMessage:z.string().optional(),
  marketUrl:z.string().optional(),
  userChatRoomState:z.string().optional(),
});

type updateUserRequest = z.infer<typeof updateUserSchema>;

export async function PUT(request: NextRequest) {
  const data = await request.json();
  try {
    updateUserSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const { id,address,imageURL,username,email,sellername,selleraddress,marketDescription,marketMessage,marketUrl,userChatRoomState } = data as updateUserRequest;
  await db
    .update(usersTable)
    .set({address,imageURL,username,email,sellername,selleraddress,marketDescription,marketMessage,marketUrl})
    .where(eq(usersTable.displayId, id))
  return new NextResponse("OK", { status: 200 });
}