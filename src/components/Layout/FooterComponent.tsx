import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function FooterComponent() {
  const router = useRouter()

  return (
    <footer className="w-full py-20 font-medium text-grey100 ">
      <div className="flex w-full gap-[1.88rem] px-[8.88rem]">
        <Link href={'/'} target="_blank">
          <span className="cursor-pointer">문의하기</span>
        </Link>
        <Link href={'/'} target="_blank">
          <span className="">이용약관</span>
        </Link>
        <Link href={'/'} target="_blank">
          <span className="">개인정보처리방침</span>
        </Link>
      </div>
      <hr className="my-[1.2rem]" />

      <div className=" px-[8.875rem]">
        <Link href={'/'}>
          <Image src={'/assets/intro/footerLogo.svg'} width={109} height={20} alt="logo" className="" />
        </Link>
        <div className="flex flex-col pt-[0.57rem]">
          <div className="flex gap-4">
            <span className="text-grey100 leading-[1.5rem]">
              Trackers ㅣ 대표 : 신유나 ㅣ 개인정보관리책임자 : 윤제민
              <br/>주소 : 경기 용인시 수지구 광교중앙로 296번길 10 ㅣ 메일 : youna010808@gmail.com
            </span>
          </div>
          <div className="flex gap-x-6 pt-[0.44rem]">
            <span className="">Copyright ⓒ 2024. Aurora All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
