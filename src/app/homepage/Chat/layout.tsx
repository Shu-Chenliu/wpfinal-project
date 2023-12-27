
import ChatRoomNavbar from "./ChatRoomNavbar";
import FiltChatNavbar from "./FiltChatNavbar";

type Props = {
  children: React.ReactNode;
};

function DocsLayout({ children }: Props) {
  return (
    // overflow-hidden for parent to hide scrollbar
    <main className="flex-rows fixed top-0 flex h-screen overflow-hidden">
      <nav className="bg-slate-800 flex w-1/9 flex-col  pb-10 no-scrollbar">
        {/* <Title/> */}
        <FiltChatNavbar />
 
      </nav>
      <nav className="bg-slate-700 flex w-1/4 flex-col  pb-10 no-scrollbar">
        {/* <Title/> */}
        <ChatRoomNavbar />
      </nav>
      
      {/* overflow-y-scroll for child to show scrollbar */}
      <div className="w-full overflow-y-scroll">{children}</div>
    </main>
  );
}


export default DocsLayout;