package org.neatore.wherebus.controller;

import org.neatore.wherebus.object.Route;
import org.neatore.wherebus.service.RouteInformationService;
import org.neatore.wherebus.service.RouteListService;

import org.jetbrains.annotations.NotNull;

import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class RteController {
    final RouteListService routeListService;
    final RouteInformationService routeInformationService;

    public RteController(RouteListService routeListService, RouteInformationService busArrivalService) {
        this.routeListService = routeListService;
        this.routeInformationService = busArrivalService;
    }

    @PostMapping("/getRoute")
    public ResponseEntity<@NotNull Map<String, Object>> getRoute(@RequestParam("routeId") String routeId) {
        Route route = routeInformationService.getRoute(routeId);
        if (route == null) return ResponseEntity.badRequest().build();
        return ResponseEntity.status(200).body(route.toMap());
    }

    @PostMapping("/searchRoute")
    public ResponseEntity<@NotNull List<Object>> get(@RequestParam("query") String query) {
        /*
        TODO: API요청은 맨 마지막에 작성
        TODO: http://openapi.seoul.go.kr:8088/{Service Key}/json/busRoute/1/1000
        각 API에 요청 한 번씩만 넣어보고 데이터 두, 세개만 받아서 작업 -> 이후 연동테스트
        (개발시에는 API이용횟수 제한이 걸려있음)
         */

        // ** TEST (SAMPLE DATA) **
        // JSONObject data = new JSONObject("...");

        JSONObject data = new JSONObject(routeListService.getRouteList());

        if (data.isEmpty()) return ResponseEntity.status(500).build();

        // Search item
        JSONArray result = new JSONArray();
        for (Object o : data.getJSONObject("busRoute").getJSONArray("row")) {
            JSONObject obj = new JSONObject(o.toString());
            if (obj.getString("RTE_NM").contains(query)) {
                Route route = routeInformationService.getRoute(obj.getString("RTE_ID"));
                if (route != null) result.put(route.toMap());
            }
        }

        return ResponseEntity.ok(result.toList());
    }

    @PostMapping("/route/getLiveBus")
    public ResponseEntity<@NotNull List<Map<String, Object>>> getLiveBus(@RequestParam("routeId") String routeId) {
        return ResponseEntity.ok(routeInformationService.getLiveBus(routeId));
    }
}
