
import  Navbar  from "./components/Naavbar";
import  LeftSidebar from "./components/LeftSidebar";
import  ChatArea  from "./components/Chat";
import RightSidebar from "./components/RightSidebar";

export default function DocumentChatApp() {
  
  return (
    <div className="flex h-[100vh] bg-background overflow-hidden">
      <Navbar />
      <LeftSidebar/>
      <ChatArea />
      <RightSidebar />
   
    </div>
  );
}
