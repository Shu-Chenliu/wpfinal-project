import { auth } from "@/lib/auth";
import Message from "./components/Message";
import InputBar from "./components/InputBar";
import { getMessages,getOtherPeople } from "./components/actions";
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
  const otherPeople=await getOtherPeople(username,chatRoomId);
  return (
    <div className="w-full">
      <p className="font-bold py-2 mg-2 flex w-full justify-between p-2 shadow-sm px-2 py-1 border-b text-cyan-700">{otherPeople}</p>

      
      <div 
        id="messages container"
        className="h-[80vh] overflow-y-auto w-[110vh]">
        {messages.map((message) => (
          <div key={message.id} className="flex w-full justify-between p-2 ">
           <Message
              id={message.id}
              isSender={message.authorId === userId}
              content={message.text}
           />
          </div>
        ))}

      </div>
      <InputBar userId={userId} chatRoomId={chatRoomId}/>

      
    </div>
  );
}

export default DocPage;