import $ from "jquery";

export interface Route {
    id: number;
    route_name: string;
    corpName: string;
    type: string;
    stations: Array<Station>;
    start: string;
    end: string;
    length: string;
    term: string;
}

export interface Station {
    seq: number;
    direction: string;
    gpsX: string;
    gpsY: string;
    stationNm: string;
    transYn: string;
    arsId: number;
}

export const getRouteById = async (routeId: string): Promise<Route> => {
    return $.ajax({
        type: "POST",
        url: "http://localhost:8080/getRoute",
        data: { routeId },
        dataType: "json",
    });
};

export const getStations = async (routeId: string): Promise<Array<Station>> => {
    return $.ajax({
        type: "POST",
        url: "http://localhost:8080/getStations",
        data: { routeId },
        dataType: "json",
    });
};

export const getBus = async (routeId: string): Promise<string> => {
    return $.ajax({
        url: "http://localhost:8080/getBus",
        method: "POST",
        data: { routeId },
        dataType: "json",
    });
};
