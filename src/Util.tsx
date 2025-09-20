import $ from "jquery";

export interface Route {
    corpName: string;
    route_id: string;
    route_name: string;
    length: string;
    term: string;
    type: string;
    start: string;
    end: string;
}

export interface LiveRoute {
    arrmsg1: string;
    arrmsg2: string;
    arsId: number;
    busRouteAbrv: number;
    busRouteId: number;
    nextBus: string;
    plainNo1: string;
    plainNo2: string;
    stNm: string;
}

export const getRouteById = async (routeId: string) => {
    return $.ajax({
        type: "POST",
        url: "http://localhost:8080/getRoute",
        data: { routeId },
        dataType: "json",
    });
};
