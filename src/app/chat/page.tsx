import ChatAurora from '@/components/Chat/ChatAurora';
import ChatNav from '@/components/Chat/ChatNav';

export default function AuroraChatPage() {
  return (
    <div className="flex w-full h-screen relative">
      <div className="absolute left-0 top-0 h-full w-[16.25rem] pt-[70px]">
        <ChatNav />
      </div>
      <div className="flex-grow ml-[16.25rem] flex flex-col justify-center items-center pt-[70px]">
        <ChatAurora />
      </div>
    </div>
  );
}
