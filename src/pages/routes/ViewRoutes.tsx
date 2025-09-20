import $ from "jquery";

import { type ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { clsx } from "clsx";

import { type Route, type LiveRoute, getRouteById } from "../../Util";

import RouteTypeTag from "../../component/RouteTypeTag";

import { IoCaretDownCircleOutline } from "react-icons/io5";

export default function ViewRoutes() {
    const { routeId } = useParams();
    const [routeInfo, setRouteInfo] = useState<Route | null | undefined>(null);
    const [route, setRoute] = useState<Array<LiveRoute>>([]);

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
        content = (
            <div className={"w-full flex flex-col px-4"}>
                <div
                    className={
                        "w-full h-15 mt-1 flex flex-row justify-start items-center pt-13 pb-10"
                    }
                >
                    <RouteTypeTag type={routeInfo.type} />
                    <span className={"font-suite text-4xl ml-3"}>
                        {routeInfo.route_name}
                    </span>
                </div>
                <div className={"grow overflow-y-auto"}>
                    {/* INFO AREA */}
                    <div className={"flex flex-col my-6 ml-5"}>
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
                    {route.map((item) => {
                        return (
                            <div className={"flex flex-row items-center"}>
                                {/*Bus Layer*/}
                                <div className={"w-15"}></div>

                                {/*Line&Circle Layer*/}
                                <div className={"flex flex-col items-center"}>
                                    <IoCaretDownCircleOutline size={20} />
                                    <div
                                        className={
                                            "w-1.5 h-11 bg-gray-400 mt-[-2px] mb-[-2px]"
                                        }
                                    ></div>
                                </div>

                                {/*Content Layer*/}
                                <div className={"h-15 ml-3"}>
                                    <span className={"font-suite font-bold"}>
                                        {item.stNm}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    } else content = <span>로딩 중입니다...</span>;

    return <div className={"w-full h-full flex justify-center"}>{content}</div>;
}
