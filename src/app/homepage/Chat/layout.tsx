
import ChatRoomNavbar from "./ChatRoomNavbar";
import FiltChatNavbar from "./FiltChatNavbar";

type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <div className="w-full">
      <main className="flex-rows top-0 flex h-screen overflow-hidden">
        <nav className="bg-slate-800 flex flex-col  pb-10 no-scrollbar">
          {/* <Title/> */}
          <FiltChatNavbar />
  
        </nav>
        <nav className="bg-slate-700 flex w-1/4 flex-col  pb-10 no-scrollbar">
          {/* <Title/> */}
          <ChatRoomNavbar />
        </nav>
        
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="w-full ">{children}</div>
      </main>

    </div>
    
  );
}


export default DocsLayout;