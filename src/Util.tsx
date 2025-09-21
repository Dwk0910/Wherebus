import $ from "jquery";

export interface BasicRouteInfo {
    corpName: string;
    route_id: string;
    route_name: string;
    length: string;
    term: string;
    type: string;
    start: string;
    end: string;
}

export interface Route {
    corpName: string;
    route_id: string;
    route_name: string;
    length: string;
    term: string;
    type: string;
    start: string;
    end: string;
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

export interface Station {
    stNm: string;
    arsId: number;
}

export const getRouteInfoById = async (routeId: string): Promise<Route> => {
    return $.ajax({
        type: "POST",
        url: "http://localhost:8080/getRouteInfo",
        data: { routeId },
        dataType: "json",
    });
};

export const getStations = async (routeId: string): Promise<Array<Station>> => {
    return $.ajax({
        type: "POST",
        url: "http://localhost:8080/getStations",
        data: { routeId },
        dataType: "json"
    })
}

