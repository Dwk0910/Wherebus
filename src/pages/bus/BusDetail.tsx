import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCircle } from "react-icons/fa";

import { getBus } from "../../Util";

import RouteTypeTag from "../../component/RouteTypeTag.tsx";

interface Bus {
    busType: number;
    lastStnId: bigint;
    stId: bigint;
    stopFlag: number;
    vehId: bigint;
    plainNo: string;
    plate_0: string;
    plate_1: string;
    plate_2: string;
    plate_3: string;
}

export default function BusDetail() {
    const { busId } = useParams();
    const [busInfo, setBusInfo] = useState<Bus | null>(null);

    let contents;

    useEffect(() => {
        const refresh = async () => {
            return await getBus(busId as string).then((res: Bus) => {
                res.plate_0 = res.plainNo.substring(0, 2);
                res.plate_1 = res.plainNo.substring(2, 4);
                res.plate_2 = res.plainNo.substring(4, 5);
                res.plate_3 = res.plainNo.substring(5, 9);
                setBusInfo(res);
            });
        };

        void refresh();

        const refresh_interval = setInterval(refresh, 10000);
        return () => clearInterval(refresh_interval);
    }, []);

    if (busInfo) {
        contents = (
            <div className={"flex flex-col w-full items-center"}>
                <div
                    className={
                        "w-110 h-100 border-gray-400 border-3 rounded-[10px] mt-5 relative"
                    }
                >
                    <div
                        className={
                            "absolute border-gray-400 border-3 rounded-[10px] right-[-3px] bottom-[-3px] w-42 h-22"
                        }
                    >
                        <div
                            className={
                                "flex flex-col w-38.5 h-18.5 m-1 border-black border-2 rounded-[5px] bg-yellow-400 text-black"
                            }
                        >
                            <div
                                className={
                                    "w-full flex justify-center items-center tracking-[0.08rem] text-[1.25rem]"
                                }
                            >
                                <FaCircle
                                    className={
                                        "text-[0.8rem] text-neutral-700 mr-2"
                                    }
                                />
                                <span className={"font-hyhead"}>
                                    {busInfo.plate_0}
                                </span>
                                <span className={"font-hyhead ml-1"}>
                                    {busInfo.plate_1}
                                </span>
                                <FaCircle
                                    className={
                                        "text-[0.8rem] text-neutral-700 ml-2"
                                    }
                                />
                            </div>
                            <div
                                className={
                                    "font-hyhead flex flex-row mt-[-10px] mx-1"
                                }
                            >
                                <div className={"text-[1.5rem] ml-1 mt-1"}>
                                    {busInfo.plate_2}
                                </div>
                                <div className={"text-[2.3rem] ml-1.5"}>
                                    {busInfo.plate_3.split("").map((v, idx) => {
                                        return idx === 0 ? (
                                            <span>{v}</span>
                                        ) : (
                                            <span className={"ml-0.5"}>
                                                {v}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        contents = <span>로딩 중입니다...</span>;
    }

    return <div className={"w-full flex justify-center"}>{contents}</div>;
}
