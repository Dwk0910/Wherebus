import { type JSX, type ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { clsx } from "clsx";

import { type Route, type Station, getRouteById, getBus } from "../../Util";

import RouteTypeTag, { getColor } from "../../component/RouteTypeTag";

import { IoIosRefresh } from "react-icons/io";
import { MdOutlineUTurnLeft } from "react-icons/md";
import { IoCaretDownCircleOutline } from "react-icons/io5";
import { FaBus } from "react-icons/fa";

interface Bus {
    pos: string;
    plate: string;
}

export default function ViewRoutes() {
    const { routeId } = useParams();

    const [route, setRoute] = useState<Route | null | undefined>(null);
    const [stations, setStations] = useState<Array<Station>>([]);
    const [buses, setBuses] = useState<Array<Bus>>([]);
    const [lastRefresh, setLastRefresh] = useState<string>("");

    const refreshBus = async () => {
        await getBus(routeId as string).then((data: Object) => {
            let busList: Array<Bus> = [];
            for (const [_, v] of Object.entries(data)) {
                busList.push({
                    pos: v["sectpos"],
                    plate: v["plate"],
                });
            }

            setBuses(busList);

            const date_formatter = new Intl.DateTimeFormat("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "Asia/Seoul",
            });

            setLastRefresh(date_formatter.format(Date.now()));
        });
    };

    const getBusElement = (idx: string): JSX.Element | "" => {
        for (const bus of buses) {
            if (bus.pos === idx) {
                return (
                    <>
                        <FaBus
                            key={idx}
                            style={{ color: getColor(route!.type) }}
                        />
                        <div className={"text-[0.7rem]"}>
                            {bus.plate.match(/.(\d+)$/)![1]}
                        </div>
                    </>
                );
            }
        }
        return "";
    };

    useEffect(() => {
        // Register route info
        getRouteById(routeId as string).then(async (res) => {
            if (res === null) setRoute(undefined);
            else {
                setRoute(res);
                setStations(res.stations);
            }

            await refreshBus();
        });

        const interval_refresh = setInterval(refreshBus, 10000);
        return () => clearInterval(interval_refresh);
    }, [routeId]);

    let content: ReactNode;

    if (route === undefined) window.location.assign("/error/404");
    else if (route) {
        content = (
            <div className={"w-full flex flex-col px-4"}>
                <div
                    className={
                        "w-full h-15 mt-1 pl-5 flex flex-row justify-start items-center pt-13 pb-7"
                    }
                >
                    <RouteTypeTag type={route.type} />
                    <span className={"font-suite text-4xl ml-3"}>
                        {route.route_name}
                    </span>
                </div>
                <div className={"flex flex-row ml-5 pb-1"}>
                    <span className={"font-suite text-[1.2rem] text-gray-300"}>
                        마지막 새로고침
                    </span>
                    <span
                        className={"mt-1 ml-2 text-[1.2rem] cursor-pointer"}
                        onClick={async () => {
                            await refreshBus();
                        }}
                    >
                        <IoIosRefresh />
                    </span>
                    <span
                        className={"font-SeoulNamsan text-[1.2rem] ml-3 mt-0.5"}
                    >
                        {lastRefresh}
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
                    {stations.length !== 0 ? (
                        stations.map((item, idx) => {
                            return (
                                <div
                                    className={
                                        "relative flex flex-row items-center"
                                    }
                                    key={idx}
                                >
                                    {/*Line&Circle Layer*/}
                                    <div
                                        className={"flex flex-col items-start"}
                                    >
                                        <div className={"flex flex-row"}>
                                            {/*Bus (Station & stopped bus element) Layer*/}
                                            <div
                                                className={
                                                    "absolute flex flex-col justify-start items-center w-10 mt-0.5"
                                                }
                                            >
                                                {getBusElement(idx.toString())}
                                            </div>
                                            <IoCaretDownCircleOutline
                                                size={20}
                                                className={"ml-[45px]"}
                                            />
                                        </div>
                                        <div className={"flex flex-row"}>
                                            {/*Bus (Line & moving bus element) Layer*/}
                                            <div
                                                className={clsx(
                                                    "absolute flex flex-col justify-start items-center w-10",
                                                    item.transYn === "Y"
                                                        ? "mt-[40px]"
                                                        : "mt-[12px]"
                                                )}
                                            >
                                                {getBusElement(
                                                    idx.toString() + ".5"
                                                )}
                                            </div>

                                            {idx < stations.length - 1 ? (
                                                <div
                                                    className={clsx(
                                                        "w-1.5 bg-gray-400 mt-[-2px] mb-[-5px] ml-13 relative",
                                                        item.transYn === "Y"
                                                            ? "h-25"
                                                            : "h-11"
                                                    )}
                                                >
                                                    <div
                                                        className={
                                                            "bg-white absolute w-15 text-black ml-[-10px] mt-10 rounded-[15px] font-suite"
                                                        }
                                                    >
                                                        {item.transYn ===
                                                        "Y" ? (
                                                            <div
                                                                className={
                                                                    "flex flex-row items-center justify-center"
                                                                }
                                                            >
                                                                <MdOutlineUTurnLeft
                                                                    className={
                                                                        "ml-[-4px]"
                                                                    }
                                                                />
                                                                회차
                                                            </div>
                                                        ) : (
                                                            ""
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div
                                                    className={
                                                        "w-1.5 h-11 mt-[-2px] mb-[-2px] ml-13"
                                                    }
                                                ></div>
                                            )}
                                        </div>
                                    </div>

                                    {/*Content Layer*/}
                                    <div
                                        className={clsx(
                                            "ml-3 flex flex-col",
                                            item.transYn === "Y"
                                                ? "h-28.5"
                                                : "h-15"
                                        )}
                                    >
                                        <span
                                            className={
                                                "font-SeoulNamsan font-bold text-nowrap max-w-50"
                                            }
                                        >
                                            {item.stationNm}
                                        </span>
                                        <span
                                            className={
                                                "font-SeoulNamsan text-gray-400"
                                            }
                                        >
                                            {item.arsId}
                                        </span>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>경로를 불러오는 중입니다...</div>
                    )}
                </div>
            </div>
        );
    } else content = <span>로딩 중입니다...</span>;

    return <div className={"w-full h-full flex justify-center"}>{content}</div>;
}
