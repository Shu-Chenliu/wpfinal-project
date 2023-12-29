import ChatRoomNavbar from "./ChatRoomNavbar";
import FiltChatNavbar from "./FiltChatNavbar";

type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <div className="w-full">
      <main className="flex flex-row top-0 h-screen overflow-y-hidden">
        <div className="flex flex-row top-0 h-screen max-[500px]:flex-col">
          <nav className="bg-slate-800 flex flex-col pb-10 max-[500px]:h-1/4">
            {/* <Title/> */}
            <FiltChatNavbar />
    
          </nav>
          <nav className="bg-slate-700 flex flex-col pb-10 h-full">
            {/* <Title/> */}
            <ChatRoomNavbar />
          </nav>
        </div>
        {/* overflow-y-scroll for child to show scrollbar */}
        <div className="w-full">{children}</div>
      </main>

    </div>
    
  );
}


export default DocsLayout;