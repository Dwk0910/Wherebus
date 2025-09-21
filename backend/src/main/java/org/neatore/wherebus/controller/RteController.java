package org.neatore.wherebus.controller;

import org.neatore.wherebus.service.RouteInformationService;
import org.neatore.wherebus.service.RouteListService;

import org.jetbrains.annotations.NotNull;

import org.json.JSONArray;
import org.json.JSONObject;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
public class RteController {
    final RouteListService routeListService;
    final RouteInformationService routeInformationService;

    public RteController(RouteListService routeListService, RouteInformationService busArrivalService) {
        this.routeListService = routeListService;
        this.routeInformationService = busArrivalService;
    }

    @PostMapping("/getStations")
    public ResponseEntity<@NotNull List<Map<String, Object>>> getStations(@RequestParam("routeId") String routeId) {
        return ResponseEntity.status(200).body(routeInformationService.getStations(routeId));
    }

    @PostMapping("/getRouteInfo")
    public ResponseEntity<@NotNull Map<String, String>> getRoute(@RequestParam("routeId") String routeId) {
        return ResponseEntity.status(200).body(routeInformationService.getRoute(routeId).toMap());
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

        JSONObject data = new JSONObject(routeListService.getBusList());

        if (data.isEmpty()) return ResponseEntity.status(500).build();

        // Search item
        JSONArray result = new JSONArray();
        for (Object o : data.getJSONObject("busRoute").getJSONArray("row")) {
            JSONObject obj = new JSONObject(o.toString());
            if (obj.getString("RTE_NM").contains(query))
                result.put(routeInformationService.getRoute(obj.getString("RTE_ID")).toMap());
        }

        return ResponseEntity.ok(result.toList());
    }
}
