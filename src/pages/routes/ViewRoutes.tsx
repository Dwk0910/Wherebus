import $ from "jquery";

import { type ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { type Route, getRouteById } from "../../Util";

import RouteTypeTag from "../../component/RouteTypeTag";

export default function ViewRoutes() {
    const { routeId } = useParams();
    const [routeInfo, setRouteInfo] = useState<Route | null | undefined>(null);
    const [route, setRoute] = useState<Array<Object>>([{}]);

    useEffect(() => {
        getRouteById(routeId as string).then((res) => {
            if (res === null) setRouteInfo(undefined);
            setRouteInfo(res);
        });

        $.ajax({
            type: "POST",
            url: "http://localhost:8080/getRoute",
            data: { routeId },
            dataType: "json",
        }).then((res) => {
            setRoute(JSON.parse(res["routes"]));
        });
    }, []);

    let content: ReactNode;

    if (routeInfo === undefined) window.location.assign("/error/404");
    else if (routeInfo) {
        console.log(route);
        content = (
            <div className={"w-full flex flex-col px-4"}>
                <div
                    className={
                        "w-full h-10 mt-1 flex flex-row justify-start items-center pt-7"
                    }
                >
                    <RouteTypeTag type={routeInfo.type} />
                    <span className={"font-suite text-4xl ml-3"}>
                        {routeInfo.route_name}
                    </span>
                </div>
                <div className={"grow overflow-y-hidden"}>
                    {/* INFO AREA */}
                    <div className={"flex flex-col mt-6 ml-5"}>
                        <span
                            className={
                                "text-neutral-200 font-suite text-[1.1rem]"
                            }
                        >
                            {routeInfo.corpName}
                        </span>
                        <span className={"flex flex-row mt-3"}>
                            <span className={"font-suite text-gray-400 w-17"}>
                                기점
                            </span>
                            <span
                                className={
                                    "text-gray-300 font-suite text-[1.1rem]"
                                }
                            >
                                {routeInfo.start}
                            </span>
                        </span>
                        <span className={"flex flex-row"}>
                            <span className={"font-suite text-gray-400 w-17"}>
                                종점
                            </span>
                            <span
                                className={
                                    "text-gray-300 font-suite text-[1.1rem]"
                                }
                            >
                                {routeInfo.end}
                            </span>
                        </span>
                        <span className={"flex flex-row"}>
                            <span className={"font-suite text-gray-400 w-17"}>
                                노선길이
                            </span>
                            <span
                                className={
                                    "text-gray-300 font-suite text-[1.1rem]"
                                }
                            >
                                {routeInfo.length}km
                            </span>
                        </span>
                        <span className={"flex flex-row"}>
                            <span className={"font-suite text-gray-400 w-17"}>
                                평균배차
                            </span>
                            <span
                                className={
                                    "text-gray-300 font-suite text-[1.1rem]"
                                }
                            >
                                {routeInfo.term}분
                            </span>
                        </span>
                    </div>

                    {/* MAIN AREA */}
                </div>
            </div>
        );
    } else content = <span>로딩 중입니다...</span>;

    return <div className={"w-full h-full flex justify-center"}>{content}</div>;
}
