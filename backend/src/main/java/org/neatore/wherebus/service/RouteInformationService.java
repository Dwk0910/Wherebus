package org.neatore.wherebus.service;

import org.json.XML;
import org.json.JSONObject;

import org.neatore.wherebus.Wherebus;
import org.neatore.wherebus.object.Route;

import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.net.URISyntaxException;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.URI;
import java.net.URL;

import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RouteInformationService {
    private final Map<String, JSONObject> info = new ConcurrentHashMap<>();

    private JSONObject request(String route_id) {
        JSONObject response = new JSONObject();

        // Generate URL (+ Query) for request API
        StringBuilder builder = new StringBuilder("http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll");
        builder.append("?serviceKey=%s".formatted(URLEncoder.encode(System.getenv("WHEREBUS_APIKEY_ARRIVEINFO"), StandardCharsets.UTF_8)));
        builder.append("&busRouteId=%s".formatted(route_id));

        try {
            URL url = new URI(builder.toString()).toURL();
            URLConnection conn = url.openConnection();

            // Start reading
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()))) {
                response = XML.toJSONObject(reader);
                response.put("data_at", System.currentTimeMillis());
            }
        } catch (URISyntaxException | IOException e) {
            Wherebus.LOGGER.error(e.toString());
        }

        return response;
    }

    public Map<String, Object> getArrivalInformation(String route_id) {
        if (info.get(route_id) == null || System.currentTimeMillis() - info.get(route_id).getLong("data_at") > 3000) {
            JSONObject response = request(route_id);
            info.put(route_id, response);
            return response.toMap();
        } else {
            return info.get(route_id).toMap();
        }
    }

    public Route getRoute(String route_id) {
        // TODO: 노선 정보 API (아직 허가가 안남) 등록해야함

        JSONObject data = new JSONObject();
        // ** TEST DATA **
        Resource testData = new ClassPathResource("testRouteInfo.json");
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(testData.getInputStream()))) {
            char[] buffer = new char[16384];
            int bytesRead;

            StringBuilder sb = new StringBuilder();
            while ((bytesRead = reader.read(buffer)) != -1) {
                sb.append(buffer, 0, bytesRead);
            }
            data = new JSONObject(sb.toString());
        } catch (IOException e) {
            Wherebus.LOGGER.error(e.toString());
        }

        Route result = null;
        for (Object o : data.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONArray("row")) {
            JSONObject item = new JSONObject(o.toString());
            if (item.getString("RTE_ID").equals(route_id))
                result = new Route(item.getString("RTE_ID"), item.getString("RTE_NM"), item.getString("corpNm"), item.getString("stStationNm"), item.getString("edStationNm"), item.getString("term"), item.getString("length"), item.getString("routeType"));
        }

        if (result == null) throw new IllegalArgumentException("route id " + route_id + " is not a valid route id.");
        else return result;
    }
}
