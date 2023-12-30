import { auth } from "@/lib/auth";
import Message from "./components/Message";
import InputBar from "./components/InputBar";
import { getMessages,getOtherPeople,getChatRoom,getOtherPeopleInfo,getUserInfo } from "./components/actions";
import { publicEnv } from "@/lib/env/public";
import { redirect } from "next/navigation";
type DocPageProps = {
  params: {
    chatRoomId: string;
  };
};

async function DocPage({params: {chatRoomId}}: DocPageProps) {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  const username = session.user.username;
  const userId = session.user.id;
  const messages=await getMessages(chatRoomId);
  const userInfo=await getUserInfo(username);
  const otherPeople=await getOtherPeople(username,chatRoomId);
  const isFirstMessage=await getChatRoom(chatRoomId);
  const otherPeopleInfo=await getOtherPeopleInfo(otherPeople?otherPeople[0]:"");
  return (
    <div className="w-full">
      <p className="font-bold py-2 mg-2 flex justify-between p-2 shadow-sm px-2 py-1 border-b text-cyan-700">{otherPeople?otherPeople[0]:""}</p>
      <div 
        id="messages container"
        className="h-[86vh] overflow-y-auto ">
        {messages.map((message) => (
          <div key={message.id} className="flex w-full justify-between p-2 ">
           <Message
              id={message.id}
              isSender={message.authorId === userId}
              content={message.text}
              imageUrl={message.authorId === userId?(otherPeople[1]==="buyer"?userInfo?.marketUrl!:userInfo?.imageURL!):(otherPeople[1]==="buyer"?otherPeopleInfo?.marketUrl!:otherPeopleInfo?.imageURL!)}
           />
          </div>
        ))}
      </div>

      <InputBar 
        userId={userId} 
        chatRoomId={chatRoomId} 
        isFirstMessage={isFirstMessage}
        isBuyer={otherPeople[1]==="buyer"}
        marketMessage={otherPeopleInfo?.marketMessage?otherPeopleInfo?.marketMessage:""}
        sellerId={otherPeopleInfo?.displayId?otherPeopleInfo?.displayId:"null"}
      />

    </div>
  );
}

export default DocPage;