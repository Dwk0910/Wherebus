import { useEffect, useState } from "react";
import MDEditor from "@uiw/react-md-editor";

import $ from "jquery";

export interface Notice {
    status: string;
    title?: string;
    date?: string;
    content?: string;
}

export default function Notice() {
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
        <div className={"h-full"}>
            <div
                className={
                    "font-suite text-neutral-300 underline underline-offset-3 ml-5 mt-5 cursor-pointer inline-block"
                }
                onClick={() => window.location.assign(".")}
            >
                {"< 홈으로 돌아가기"}
            </div>
            {notice ? (
                <div className={"p-5"}>
                    <h1 className={"text-2xl font-SeoulNamsan font-bold mb-3"}>
                        {notice.title}
                    </h1>
                    <div className={"flex items-center"}>
                        <span
                            className={
                                "p-2 mr-3 bg-red-400 h-7 flex justify-center items-center rounded-[5px] font-suite text-[0.9rem]"
                            }
                        >
                            공지
                        </span>
                        <p
                            className={
                                "text-[0.95rem] font-suite text-gray-400"
                            }
                        >
                            {notice.date}
                        </p>
                    </div>
                    <div
                        className={"w-full border-b-2 border-gray-700 my-3"}
                    ></div>
                    <style>
                        {
                            ".wmde-markdown {background-color: transparent !important; color: white; font-size: 1.1rem;}"
                        }
                    </style>
                    <MDEditor.Markdown
                        source={notice.content}
                        className={"whitespace-pre-wrap font-suite text-lg"}
                    />
                </div>
            ) : (
                <div className={"flex justify-center items-center h-full"}>
                    <span className={"text-gray-500 font-suite mb-20"}>
                        공지사항이 없습니다.
                    </span>
                </div>
            )}
        </div>
    );
}
