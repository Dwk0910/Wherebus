import { clsx } from "clsx";
import isometric from "../assets/images/isometric.png";

export default function Main() {
    return (
        <>
            <div className={"w-full flex justify-center slideIn"}>
                <img src={isometric} alt={"des"} className={"w-80"} />
            </div>
            <div className={"w-full flex justify-center"}>
                <span
                    className={clsx(
                        "font-SeoulNamsan text-[1.9rem] mt-4 font-bold text-center",
                        "slideIn"
                    )}
                >
                    어디서든 간편하게,
                    <br />
                    버스 도착 정보 확인하기
                </span>
            </div>
            <div className={"w-full flex flex-col items-center mt-5"}>
                <span className={"font-suite text-gray-400"}>
                    지금 바로 현재 버스 정보를 확인해보세요
                </span>
                <div className={"flex flex-row mt-3"}>
                    <input
                        type={"button"}
                        value={"특정 정류소 도착정보"}
                        className={clsx(
                            "p-3 m-3 font-suite bg-gray-700 rounded-[5px] transition-all duration-200",
                            "cursor-pointer hover:bg-gray-500 hover:scale-105"
                        )}
                    />
                    <input
                        type={"button"}
                        value={"전체노선 도착정보"}
                        className={clsx(
                            "p-3 my-3 mr-3 font-suite bg-gray-700 rounded-[5px] transition-all duration-200",
                            "cursor-pointer hover:bg-gray-500 hover:scale-105"
                        )}
                    />
                </div>
            </div>
        </>
    );
}
