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

export const getRouteById = async (routeId: string) => {
    return $.ajax({
        type: "POST",
        url: "http://localhost:8080/getRoute",
        data: { routeId },
        dataType: "json",
    });
};
