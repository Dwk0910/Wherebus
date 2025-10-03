import { useState, useEffect } from "react";
import $ from "jquery";

import { clsx } from "clsx";
import { type Notice } from "./Notice";
import isometric from "../assets/images/isometric.png";
import { AiTwotoneNotification } from "react-icons/ai";

export default function Main() {
    const [notice, setNotice] = useState<Notice | null>(null);

    useEffect(() => {
        $.ajax({
            url: "http://localhost:8080/notification",
            method: "GET",
        }).then((res) => {
            if (res.status !== "notfound") setNotice(res);
        });
    }, []);

    return (
        <div className={"flex flex-col h-full"}>
            {notice ? (
                <div
                    className={
                        "mt-3 mx-3.5 p-1 px-3 rounded-[7px] bg-gray-600 flex items-center h-10 cursor-pointer"
                    }
                    onClick={() => window.location.assign("/notice")}
                >
                    <AiTwotoneNotification size={20} />
                    <div
                        className={
                            "mx-3 font-suite bg-red-400 rounded-[4px] w-13 flex justify-center"
                        }
                    >
                        공지
                    </div>
                    <span
                        className={
                            "font-suite overflow-hidden text-ellipsis whitespace-nowrap grow"
                        }
                    >
                        {notice.title}
                    </span>
                </div>
            ) : (
                ""
            )}
            <div className={"w-full flex justify-center slideIn"}>
                <img src={isometric} alt={"des"} className={"w-79"} />
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
                        value={"정류소 도착정보"}
                        className={clsx(
                            "p-3 m-3 font-suite bg-gray-700 rounded-[5px] transition-all duration-200",
                            "cursor-pointer hover:bg-gray-500 hover:scale-105"
                        )}
                        onClick={() => window.location.assign("/stops")}
                    />
                    <input
                        type={"button"}
                        value={"노선 도착정보"}
                        className={clsx(
                            "p-3 my-3 mr-3 font-suite bg-gray-700 rounded-[5px] transition-all duration-200",
                            "cursor-pointer hover:bg-gray-500 hover:scale-105"
                        )}
                        onClick={() => window.location.assign("/routes")}
                    />
                </div>
            </div>
            <div
                className={"grow w-full flex flex-col justify-end items-center"}
            >
                <span
                    className={"font-SeoulNamsan text-gray-400 text-[1.03rem]"}
                >
                    Wherebus [어디쯤버스] PROJECT
                </span>
                <span className={"font-SeoulNamsan mb-2 text-gray-500"}>
                    (C) 2025. Dwk0910 All rights reserved.
                </span>
                <span className={"font-suite mb-5 text-gray-500"}>
                    This project is also available on{" "}
                    <span
                        className={clsx(
                            "underline cursor-pointer hover:text-gray-400",
                            "transition-all duration-200"
                        )}
                        onClick={() =>
                            window.location.assign(
                                "https://github.com/Dwk0910/Wherebus"
                            )
                        }
                    >
                        GitHub repository.
                    </span>
                </span>
            </div>
        </div>
    );
}
