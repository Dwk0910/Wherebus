import { IoMenu } from "react-icons/io5";

export default function Topbar() {
    return (
        <div
            className={
                "border-gray-400 border-b-1 bg-gray-700 py-3 px-3 h-15 w-full flex items-center fixed"
            }
        >
            <span className={"font-bold text-2xl text-white grow"}>
                어디쯤버스
            </span>
            <IoMenu className={"text-white text-3xl cursor-pointer mr-1"} />
        </div>
    );
}
