import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBus } from "../../Util";

interface Bus {
    busType: number;
    lastStnId: bigint;
    stId: bigint;
    stopFlag: number;
    vehId: bigint;
    plainNo: string;
}

export default function BusDetail() {
    const { busId } = useParams();
    const [busInfo, setBusInfo] = useState<Bus | null>(null);

    let contents;

    useEffect(() => {
        const refresh = async () => {
            await getBus(busId as string).then((res: Bus) => {
                setBusInfo(res);
            });
        };

        void refresh();

        const refresh_interval = setInterval(refresh, 10000);
        return () => clearInterval(refresh_interval);
    }, []);

    if (busInfo) {
        contents = (
            <div className={"flex flex-col"}>
                <span>{busInfo.plainNo}</span>
            </div>
        );
    } else {
        contents = <span>로딩 중입니다...</span>;
    }

    return <div className={"w-full flex justify-center"}>{contents}</div>;
}
