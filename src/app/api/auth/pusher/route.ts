import { type NextRequest, NextResponse } from "next/server";

import { and, eq } from "drizzle-orm";

import { db } from "@/db";
import { usersToChatofSeller,usersToChatofBuyer} from "@/db/schema";
import { auth } from "@/lib/auth";
import { pusherServer } from "@/lib/pusher/server";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user?.email || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const socketId = data.get("socket_id") as string;
    const channel = data.get("channel_name") as string;

    // channel name is in the format: private-<docId>
    const chatRoomId = channel.slice(8);
    if (!chatRoomId) {
      return NextResponse.json(
        { error: "Invalid channel name" },
        { status: 400 },
      );
    }

    // Get the document from the database
    const [chatRoomSeller] = await db
      .select()
      .from(usersToChatofSeller)
      .where(
        and(
          eq(usersToChatofSeller.sellerId, session.user.id),
          eq(usersToChatofSeller.chatRoomId, chatRoomId),
        )
      );
    const [chatRoomBuyer] =await db
      .select()
      .from(usersToChatofBuyer)
      .where(
        and(
          eq(usersToChatofBuyer.buyerId, session.user.id),
          eq(usersToChatofBuyer.chatRoomId, chatRoomId),
        )
      )
    if ((!chatRoomSeller)&&(!chatRoomBuyer)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userData = {
      user_id: session.user.email,
    };

    const authResponse = pusherServer.authorizeChannel(
      socketId,
      channel,
      userData,
    );

    return NextResponse.json(authResponse);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      {
        status: 500,
      },
    );
  }
}
