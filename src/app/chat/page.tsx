import ChatAurora from '@/components/Chat/ChatAurora'

export default function auroraChat() {
    return (
        <div className="flex w-full flex-col justify-center pt-[5rem]">
        <div className="flex w-full justify-center bg-[#F4F6FA] pb-[2.94rem] pt-[2.38rem]">
          <div className="flex w-full justify-center gap-[1.5rem]">
            <ChatAurora />
          </div>
        </div>
      </div>
    )   
}