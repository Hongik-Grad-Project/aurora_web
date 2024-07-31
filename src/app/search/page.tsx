import SearchBar from '@/components/Search/searchBar'

export default function projectSearch() {
    return (
        <div className="flex flex-col justify-center pt-[5rem] bg=[#FEFEFE]">
            <h1 className="text-center text-[2.5rem] font-semibold mt-[5.19rem] mb-[5.06rem]">
                어떤 방식의
                <br />
                프로젝트를 찾고 있나요?
            </h1>
            <SearchBar />
        </div>
    )
}