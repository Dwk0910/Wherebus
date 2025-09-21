package org.neatore.wherebus.controller;

import org.neatore.wherebus.Util;
import org.jetbrains.annotations.NotNull;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.charset.StandardCharsets;

import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
public class RteController {
    @PostMapping("/getRoute")
    public ResponseEntity<@NotNull Map<String, String>> getRoute(@RequestParam("routeId") String routeId) {
        JSONArray routes = new JSONArray();

        JSONObject data;

        // Test data
        Resource testData = new ClassPathResource("testData.xml");
        try {
            byte[] fileData = FileCopyUtils.copyToByteArray(testData.getInputStream());
            String xmldata = new String(fileData, StandardCharsets.UTF_8);
            data = XML.toJSONObject(xmldata);
        } catch (IOException ignored) {
            return ResponseEntity.notFound().build();
        }

        for (Object o : data.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONArray("itemList")) {
            routes.put(o);
        }

        final Map<String, String> result = Util.getRouteById(routeId).toMap();
        result.put("routes", routes.toString());
        return ResponseEntity.status(200).body(result);
    }

    @PostMapping("/searchRoute")
    public String get(@RequestParam("query") String query) {
        /*
        TODO: API요청은 맨 마지막에 작성
        TODO: http://openapi.seoul.go.kr:8088/{Service Key}/json/busRoute/1/1000
        각 API에 요청 한 번씩만 넣어보고 데이터 두, 세개만 받아서 작업 -> 이후 연동테스트
        (개발시에는 API이용횟수 제한이 걸려있음)
         */

        // ** TEST (SAMPLE DATA) **
        JSONObject data = new JSONObject("{\"busRoute\":{\"list_total_count\":683,\"RESULT\":{\"CODE\":\"INFO-000\",\"MESSAGE\":\"정상 처리되었습니다\"},\"row\":[{\"RTE_NM\":\"0017\",\"RTE_ID\":\"100100124\"},{\"RTE_NM\":\"01A\",\"RTE_ID\":\"100100001\"},{\"RTE_NM\":\"01B\",\"RTE_ID\":\"106000004\"},{\"RTE_NM\":\"0411\",\"RTE_ID\":\"104000012\"},{\"RTE_NM\":\"100\",\"RTE_ID\":\"100100549\"},{\"RTE_NM\":\"101\",\"RTE_ID\":\"100100006\"},{\"RTE_NM\":\"1014\",\"RTE_ID\":\"100100129\"},{\"RTE_NM\":\"1017\",\"RTE_ID\":\"100100130\"},{\"RTE_NM\":\"102\",\"RTE_ID\":\"100100007\"},{\"RTE_NM\":\"1020\",\"RTE_ID\":\"100100131\"},{\"RTE_NM\":\"103\",\"RTE_ID\":\"100100008\"},{\"RTE_NM\":\"104\",\"RTE_ID\":\"100100009\"},{\"RTE_NM\":\"105\",\"RTE_ID\":\"100100010\"},{\"RTE_NM\":\"106\",\"RTE_ID\":\"100100011\"},{\"RTE_NM\":\"107\",\"RTE_ID\":\"100100012\"},{\"RTE_NM\":\"109\",\"RTE_ID\":\"100100014\"},{\"RTE_NM\":\"110A고려대\",\"RTE_ID\":\"100100016\"},{\"RTE_NM\":\"110B국민대\",\"RTE_ID\":\"100100015\"},{\"RTE_NM\":\"111\",\"RTE_ID\":\"104000009\"},{\"RTE_NM\":\"1111\",\"RTE_ID\":\"100100132\"},{\"RTE_NM\":\"1112\",\"RTE_ID\":\"107000007\"},{\"RTE_NM\":\"1113\",\"RTE_ID\":\"100100133\"},{\"RTE_NM\":\"1114\",\"RTE_ID\":\"100100134\"},{\"RTE_NM\":\"1115\",\"RTE_ID\":\"100100566\"},{\"RTE_NM\":\"1116\",\"RTE_ID\":\"107000001\"},{\"RTE_NM\":\"1119\",\"RTE_ID\":\"100100137\"},{\"RTE_NM\":\"1120\",\"RTE_ID\":\"100100138\"},{\"RTE_NM\":\"721\",\"RTE_ID\":\"100100112\"}]}}");

        // Search item
        JSONArray result = new JSONArray();
        for (Object o : data.getJSONObject("busRoute").getJSONArray("row")) {
            JSONObject obj = new JSONObject(o.toString());
            if (obj.getString("RTE_NM").contains(query))
                result.put(Util.getRouteById(obj.getString("RTE_ID")).toMap());
        }

        return result.toString();
    }
}
