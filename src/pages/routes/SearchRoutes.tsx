import $ from "jquery";

import RouteTypeTag from "../../component/RouteTypeTag.tsx";

import { useState } from "react";
import { clsx } from "clsx";

interface Route {
    route_id: string;
    route_name: string;
    length: string;
    term: string;
    type: string;
    start: string;
    end: string;
}

export default function SearchRoutes() {
    const [searchInput, setSearchInput] = useState<string>("");
    const [routes, setRoutes] = useState<Array<Route>>([]);

    const search: (query: string) => void = (query) => {
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/searchRoute",
            data: { query },
            dataType: "json",
        }).then((res) => {
            setRoutes(res);
        });
    };

    return (
        <div className={"flex flex-col items-center"}>
            <span className={"font-suite text-3xl my-10"}>
                노선을 검색해 주세요
            </span>
            <div className="flex flex-row items-center">
                <input
                    type={"search"}
                    placeholder={"노선 이름 입력"}
                    className={
                        "p-4 bg-neutral-900 border-neutral-400 border-1 rounded-[5px] h-15 w-[70vw]"
                    }
                    value={searchInput}
                    onChange={(e) => {
                        setSearchInput(e.target.value);
                    }}
                />
                <input
                    type={"button"}
                    value={"검색"}
                    className={clsx(
                        "ml-3 px-3 font-suite bg-neutral-700 border-neutral-400 border-1 rounded-[5px] h-15 w-20",
                        "cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-2xl"
                    )}
                    onClick={() => {
                        if (searchInput) search(searchInput);
                    }}
                />
            </div>
            <div className={"flex flex-col items-center py-5"}>
                {routes &&
                    routes.map((item: Route, idx: number) => (
                        <div
                            key={idx}
                            className={clsx(
                                "flex flex-row items-end",
                                "p-3 mt-5 w-[94vw]",
                                "bg-gray-700 border-gray-500 border-1 rounded-[5px]",
                                "transition-all duration-200 hover:scale-102 hover:shadow-2xl cursor-pointer"
                            )}
                            onClick={() => {
                                window.location.assign(
                                    `/routes/${item.route_id}`
                                );
                            }}
                        >
                            <div className={"flex flex-row grow items-center"}>
                                <div className={"mr-3"}>
                                    <RouteTypeTag type={item.type} />
                                </div>
                                <span
                                    className={clsx(
                                        "font-suite min-w-20 max-w-35 text-nowrap overflow-hidden text-4xl"
                                        // item.route_name.length > 4
                                        //     ? "text-2xl"
                                        //     : "text-4xl"
                                    )}
                                >
                                    {item.route_name
                                        .split("")
                                        .map((item_str, idx) => {
                                            if (/^[\x00-\x7F]+$/.test(item_str))
                                                if (
                                                    item.route_name.length > 4
                                                ) {
                                                    return (
                                                        <span
                                                            key={idx}
                                                            className={
                                                                "text-2xl"
                                                            }
                                                        >
                                                            {item_str}
                                                        </span>
                                                    );
                                                } else {
                                                    return (
                                                        <span key={idx}>
                                                            {item_str}
                                                        </span>
                                                    );
                                                }
                                            else
                                                return (
                                                    <span
                                                        key={idx}
                                                        className={
                                                            "text-[1.1rem]"
                                                        }
                                                    >
                                                        {item_str}
                                                    </span>
                                                );
                                        })}
                                </span>
                            </div>
                            <div
                                className={
                                    "flex flex-row items-center mb-1 mr-4"
                                }
                            >
                                <span
                                    className={"ml-5 font-suite flex flex-row"}
                                >
                                    <span className={"text-gray-300 min-w-22"}>
                                        평균 배차간격
                                    </span>
                                    <div className={"ml-3 w-11"}>
                                        {item.term}분
                                    </div>
                                </span>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
}
