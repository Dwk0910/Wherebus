import { clsx } from "clsx";

// icons
import { FaGithub, FaBug } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { GiBusStop } from "react-icons/gi";
import { CiRoute } from "react-icons/ci";
import { PiPencilLine } from "react-icons/pi";

export default function Menubar({
    open,
    isAnimating,
    setOpen,
    setIsAnimating,
}: {
    open: boolean;
    isAnimating: boolean;
    setOpen: (open: boolean) => void;
    setIsAnimating: (animating: boolean) => void;
}) {
    return (
        <div className={"flex flex-col"}>
            <div
                className={clsx(
                    "fixed w-full h-[70vh] bg-black z-10 transition-opacity duration-300",
                    !open && "pointer-events-none"
                )}
                onClick={() => {
                    setIsAnimating(true);
                    setOpen(false);
                    setTimeout(() => {
                        setIsAnimating(false);
                    }, 300);
                }}
                style={{
                    opacity: open ? "0.7" : "0",
                }}
            ></div>
            <div
                className={clsx(
                    "fixed transition-[margin-top] duration-300 mt-[100vh] w-full h-[70vh] bg-neutral-800 text-white z-20",
                    "flex flex-col",
                    !open && "pointer-events-none"
                )}
                style={{
                    marginTop: open ? "30vh" : "100vh",
                    opacity: !isAnimating && !open ? "0" : "1",
                    borderRadius: "30px 30px 0px 0px",
                }}
            >
                <div className={"flex flex-row w-full items-center"}>
                    <span className={"grow pl-10 flex items-center"}>
                        <span className={"font-SeoulNamsan text-[1.7rem]"}>
                            메뉴
                        </span>
                        <span className={"ml-4 font-suite text-gray-300"}>
                            MENU
                        </span>
                    </span>
                    <IoClose
                        className={
                            "text-5xl m-7 text-gray-400 hover:text-gray-600 cursor-pointer"
                        }
                        onClick={() => {
                            setIsAnimating(true);
                            setOpen(false);
                            setTimeout(() => {
                                setIsAnimating(false);
                            }, 300);
                        }}
                    />
                </div>
                <div
                    className={clsx(
                        "flex flex-col px-6 mr-[5px] h-full",
                        "overflow-y-scroll scrollbar scrollbar-thumb-neutral-700 scrollbar-hover:scrollbar-thumb-neutral-500",
                        "[&::-webkit-scrollbar]:[width:6px]"
                    )}
                >
                    <span
                        className={
                            "font-SeoulNamsan text-[1.2rem] mb-3 text-gray-300"
                        }
                    >
                        버스정보검색
                    </span>
                    <div className={"flex flex-row"}>
                        <div
                            className={clsx(
                                "w-30 h-30 font-suite flex flex-col justify-center items-center rounded-[15px] border-gray-300 border-1 transition-all duration-200",
                                "hover:scale-105 hover:shadow-2xl cursor-pointer"
                            )}
                        >
                            <GiBusStop className={"text-[3.5rem]"} />
                            <span className={"text-gray-300"}>
                                정류소 도착정보
                            </span>
                        </div>
                        <div
                            className={clsx(
                                "w-30 h-30 font-suite flex flex-col justify-center items-center rounded-[15px] border-gray-300 border-1 transition-all duration-200",
                                "hover:scale-105 hover:shadow-2xl cursor-pointer",
                                "ml-4"
                            )}
                        >
                            <CiRoute className={"text-[3.5rem]"} />
                            <span className={"text-gray-300"}>
                                노선 도착정보
                            </span>
                        </div>
                    </div>

                    <span
                        className={
                            "font-SeoulNamsan text-[1.2rem] mt-8 mb-3 text-gray-300"
                        }
                    >
                        기타
                    </span>
                    <div className={"flex flex-row"}>
                        <div
                            className={clsx(
                                "w-30 h-30 font-suite flex flex-col justify-center items-center rounded-[15px] border-gray-300 border-1 transition-all duration-200",
                                "hover:scale-105 hover:shadow-2xl cursor-pointer"
                            )}
                        >
                            <FaGithub className={"text-[3rem] mb-2"} />
                            <span className={"text-gray-300"}>GitHub</span>
                        </div>
                        <div
                            className={clsx(
                                "w-30 h-30 font-suite flex flex-col justify-center items-center rounded-[15px] border-gray-300 border-1 transition-all duration-200",
                                "hover:scale-105 hover:shadow-2xl cursor-pointer",
                                "ml-4"
                            )}
                        >
                            <PiPencilLine className={"text-[3.5rem]"} />
                            <span className={"text-gray-300"}>
                                정보수정요청
                            </span>
                        </div>
                        <div
                            className={clsx(
                                "w-30 h-30 font-suite flex flex-col justify-center items-center rounded-[15px] border-gray-300 border-1 transition-all duration-200",
                                "hover:scale-105 hover:shadow-2xl cursor-pointer",
                                "ml-4"
                            )}
                        >
                            <FaBug className={"text-[3rem] mb-3"} />
                            <span className={"text-gray-300"}>버그제보</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
