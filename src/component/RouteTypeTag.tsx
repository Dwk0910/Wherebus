import { type ReactElement } from "react";

export default function RouteTypeTag({ type }: { type: string }): ReactElement {
    let str: { bgColor: string; textColor: string; name: string };
    switch (type) {
        case "간선버스":
            str = {
                bgColor: "#3D5BAB",
                textColor: "#FFFFFF",
                name: "간선버스",
            };
            break;
        case "지선버스":
            str = {
                bgColor: "#2ee73f",
                textColor: "#FFFFFF",
                name: "지선버스",
            };
            break;
        case "순환버스":
            str = {
                bgColor: "#f79c1c",
                textColor: "#FFFFFF",
                name: "순환버스",
            };
            break;
        case "광역버스":
            str = {
                bgColor: "#f52f08",
                textColor: "#FFFFFF",
                name: "광역버스",
            };
            break;
        default:
            str = {
                bgColor: "#595959",
                textColor: "#FFFFFF",
                name: "알수없음",
            };
            break;
    }

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
