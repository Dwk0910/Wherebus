import { type ReactElement } from "react";

const typeDefs = {
    "간선버스": {
        bgColor: "#3D5BAB",
        textColor: "#FFFFFF",
        name: "간선버스",
    },
    "지선버스": {
        bgColor: "#26aa32",
        textColor: "#FFFFFF",
        name: "지선버스",
    },
    "순환버스": {
        bgColor: "#c57f18",
        textColor: "#FFFFFF",
        name: "순환버스",
    },
    "광역버스": {
        bgColor: "#f52f08",
        textColor: "#FFFFFF",
        name: "광역버스",
    },
    "알수없음": {
        bgColor: "#595959",
        textColor: "#FFFFFF",
        name: "알수없음",
    }
}

export const getColor = (type: string): string => {
    let str = typeDefs[type];
    if (str === null) str = typeDefs["알수없음"];
    return str.bgColor;
}

export default function RouteTypeTag({ type }: { type: string }): ReactElement {
    let str = typeDefs[type];
    if (str === null) str = typeDefs["알수없음"];

    return (
        <span
            className={
                "rounded-[8px] p-1 pt-1.5 h-8 w-17 text-[0.9rem] font-suite flex items-center justify-center"
            }
            style={{
                backgroundColor: str.bgColor,
                color: str.textColor,
                letterSpacing: "0.05em",
            }}
        >
            {str.name}
        </span>
    );
}
