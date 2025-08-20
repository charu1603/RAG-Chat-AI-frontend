import Image from "next/image";
import UploadFile from "./components/UploadFile";
import Chat from "./components/Chat";

export default function Home() {
  return (
    <div className="min-h-screen w-screen flex ">
      <div className="w-[30vw] min-h-screen flex items-center">
        <UploadFile />
      </div>
      <div className="w-[70vw] min-h-screen border-l-2">
        <Chat />
      </div>
    </div>
  );
}
