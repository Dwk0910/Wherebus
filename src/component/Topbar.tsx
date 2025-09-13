import { IoMenu } from "react-icons/io5";

export default function Topbar() {
    return (
        <div className={"flex flex-row fixed items-center"}>
            <div
                className={
                    "bg-gray-700 m-3 px-6 pb-3 pt-4 rounded-3xl shadow-2xl"
                }
            >
                <span
                    className={
                        "font-bold text-[1.2rem] text-white font-SeoulNamsan grow"
                    }
                >
                    어디쯤버스
                </span>
            </div>
            <div className={"flex bg-neutral-700 p-3 rounded-2xl shadow-2xl"}>
                <IoMenu className={"text-white text-3xl cursor-pointer"} />
            </div>
        </div>
    );
}
