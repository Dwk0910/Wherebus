import { type ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { type Route, type Station, getRouteById } from "../../Util";

import RouteTypeTag, { getColor } from "../../component/RouteTypeTag";

import { IoCaretDownCircleOutline } from "react-icons/io5";
import { FaBus } from 'react-icons/fa';

interface Bus {
    pos: string;
    plate: string;
}

export default function ViewRoutes() {
    const { routeId } = useParams();

    const [route, setRoute] = useState<Route | null | undefined>(null);
    const [stations, setStations] = useState<Array<Station>>([]);
    const [buses, setBuses] = useState<Array<Bus>>([]);

    useEffect(() => {
        // Register route info
        getRouteById(routeId as string).then((res) => {
            if (res === null) setRoute(undefined);
            else {
                setRoute(res);
                setStations(res.stations);
            }
        });

        // TODO: Scheduler for live bus info

        // **TEST**
        setBuses([{
            pos: "0.5",
            plate: "서울74아1275"
        }, {
            pos: "5",
            plate: "서울74사2577"
        }])
    }, [routeId]);

    let content: ReactNode;

    if (route === undefined) window.location.assign("/error/404");
    else if (route) {
        content = (
            <div className={"w-full flex flex-col px-4"}>
                <div
                    className={
                        "w-full h-15 mt-1 pl-5 flex flex-row justify-start items-center pt-13 pb-10"
                    }
                >
                    <RouteTypeTag type={route.type} />
                    <span className={"font-suite text-4xl ml-3"}>
                        {route.route_name}
                    </span>
                </div>
                <div
                    className={
                        "grow mb-6 overflow-y-auto overflow-x-auto scrollbar scrollbar-thumb-neutral-600 [&::-webkit-scrollbar]:[width:6px] [&::-webkit-scrollbar]:[height:6px]"
                    }
                >
                    {/* INFO AREA */}
                    <div className={"flex flex-col my-6 ml-5"}>
                        <span
                            className={
                                "text-neutral-200 font-suite text-[1.1rem]"
                            }
                        >
                            {route.corpName}
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
                                {route.start}
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
                                {route.end}
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
                                {route.length}km
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
                                {route.term}분
                            </span>
                        </span>
                    </div>

                    {/* MAIN AREA */}
                    {stations.length !== 0 ? stations.map((item, idx) => {
                        return (
                            <div
                                className={"flex flex-row items-center"}
                                key={idx}
                            >

                                {/*Line&Circle Layer*/}
                                <div className={"flex flex-col items-start"}>
                                    <div className={"flex flex-row"}>
                                        {/*Bus (Station) Layer*/}
                                        <div className={"w-10 mt-0.5 ml-5 mr-[-15px]"}>
                                            {buses.map(bus => {
                                                if (bus.pos === idx.toString()) return (
                                                    <FaBus key={idx} style={{ color: getColor(route.type) }}/>
                                                );
                                            })}
                                        </div>
                                        <IoCaretDownCircleOutline size={20} />
                                    </div>
                                    <div className={"flex flex-row"}>
                                        {/*Bus (Line) Layer*/}
                                        <div className={"relative w-10 mt-[12px] ml-5 mr-[-15px]"}>
                                            {buses.map(bus => {
                                                if (bus.pos === idx.toString() + ".5") return (
                                                    <FaBus key={idx} style={{ color: getColor(route.type) }}/>
                                                );
                                            })}
                                        </div>
                                        {idx < stations.length - 1 ? (
                                            <div
                                                className={
                                                    "w-1.5 h-11 bg-gray-400 mt-[-2px] mb-[-5px] ml-[6.6px]"
                                                }
                                            ></div>
                                        ) : (
                                            <div
                                                className={
                                                    "w-1.5 h-11 mt-[-2px] mb-[-2px]"
                                                }
                                            ></div>
                                        )}
                                    </div>
                                </div>

                                {/*Content Layer*/}
                                <div className={"h-15 ml-3 flex flex-col"}>
                                    <span className={"font-SeoulNamsan font-bold text-nowrap max-w-50"}>
                                        {item.stationNm}
                                    </span>
                                    <span className={"font-SeoulNamsan text-gray-400"}>{item.arsId}</span>
                                </div>
                            </div>
                        );
                    }) : (
                        <div>경로를 불러오는 중입니다...</div>
                    )}
                </div>
            </div>
        );
    } else content = <span>로딩 중입니다...</span>;

    return <div className={"w-full h-full flex justify-center"}>{content}</div>;
}
