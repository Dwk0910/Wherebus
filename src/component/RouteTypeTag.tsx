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
            className={"rounded-[5px] p-1 h-7 font-suite flex items-center"}
            style={{
                backgroundColor: str.bgColor,
                color: str.textColor,
            }}
        >
            {str.name}
        </span>
    );
}
