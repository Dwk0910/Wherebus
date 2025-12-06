export default function SearchBus() {
    return (
        <div className={"flex flex-col items-center justify-center"}>
            <span className={"mt-10 mb-5 font-suite text-2xl"}>
                버스 검색하기
            </span>
            <input
                type={"text"}
                placeholder={"버스 번호판"}
                className={
                    "w-80 mt-2 p-3 border-1 border-gray-200 rounded-[5px] text-center"
                }
            />
            <input
                type={"text"}
                placeholder={"노선번호"}
                className={
                    "w-80 mt-2 p-3 border-1 border-gray-200 rounded-[5px] text-center"
                }
            />
            <input
                type={"button"}
                value={"검색"}
                className={
                    "w-80 mt-12 p-3 font-suite text-black bg-gray-300 rounded-[5px] cursor-pointer"
                }
            />
        </div>
    );
}
