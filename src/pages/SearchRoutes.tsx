import $ from "jquery";

import { useState } from "react";
import { clsx } from "clsx";

interface Route {
    RTE_ID: string;
    RTE_NM: string;
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
                        "p-4 bg-neutral-900 border-neutral-400 border-1 rounded-[5px] h-15 w-80"
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
                    onClick={() => search(searchInput)}
                />
            </div>
            {routes &&
                routes.map((item: Route, idx: number) => (
                    <h1 key={idx}>{item["RTE_ID"]}</h1>
                ))}
        </div>
    );
}
