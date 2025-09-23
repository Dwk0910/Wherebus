package org.neatore.wherebus.service;

import org.jetbrains.annotations.Nullable;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.XML;
import org.json.JSONObject;

import org.neatore.wherebus.Wherebus;
import org.neatore.wherebus.object.Route;
import org.neatore.wherebus.object.Station;

import org.springframework.stereotype.Service;

import java.net.URISyntaxException;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.net.URI;
import java.net.URL;

import java.io.File;
import java.io.PrintWriter;
import java.io.Writer;
import java.io.IOException;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

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

    public @Nullable Route getRoute(String route_id) {
        /*
        dataFolder에서 route_id로 된 dat파일을 찾고, 없으면 새로 만듦.
        dat폴더 안에는 data.go.kr 노선정보조회 Open API 내용 중 getRouteInfoItem의 결과를 JSON으로 변형하여 넣고,
        data_at과 stations 필드를 만들어서 data_at에서는 현재 밀리초 기재, stations필드에는 getStationsByRouteList 결과를 JSON(Array)으로 변형하여 저장.

        data_at 값을 비교하여 이틀(172_800_000L)이 지나면 자동 갱신
         */

        // Create new path and file instances
        Path routeInfoPath = Path.of(Wherebus.dataFolder.toString(), "routeinfo");
        File f = Path.of(routeInfoPath.toString(), route_id + ".dat").toFile();

        // Create file or directory if they don't exist.
        try {
            if (!routeInfoPath.toFile().exists()) Files.createDirectories(routeInfoPath);
            if (!f.exists()) Files.createFile(f.toPath());
        } catch (IOException e) {
            Wherebus.LOGGER.error(e.toString());
        }

        // Create JSONObject instance as AtomicReference (Lambda will use this)
        AtomicReference<JSONObject> obj = new AtomicReference<>();
        AtomicReference<Boolean> no_result = new AtomicReference<>(false);

        // Update the file and memory
        Runnable update = () -> {
            try {
                final JSONObject result = new JSONObject();

                // Get basic route info (base of result object)
                URL url = new URI("http://ws.bus.go.kr/api/rest/busRouteInfo/getRouteInfo?serviceKey=%s&busRouteId=%s".formatted(System.getenv("WHEREBUS_APIKEY_DATAORKR"), route_id)).toURL();
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream()))) {

                    JSONObject o_resp = XML.toJSONObject(reader);
                    if (o_resp.getJSONObject("ServiceResult").getJSONObject("msgHeader").getInt("headerCd") == 4) {
                        Files.deleteIfExists(f.toPath());
                        no_result.set(true);
                        return;
                    }

                    JSONObject response = o_resp.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONObject("itemList");
                    result.put("type", response.get("routeType"));
                    result.put("route_name", response.get("busRouteNm"));
                    result.put("route_id", response.get("busRouteId"));
                    result.put("corpNm", response.get("corpNm"));
                    result.put("start", response.get("stStationNm"));
                    result.put("end", response.get("edStationNm"));
                    result.put("length", response.get("length"));
                    result.put("term", response.get("term"));
                }

                // Get stations
                url = new URI("http://ws.bus.go.kr/api/rest/busRouteInfo/getStaionByRoute?serviceKey=%s&busRouteId=%s".formatted(System.getenv("WHEREBUS_APIKEY_DATAORKR"), route_id)).toURL();
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream()))) {
                    JSONArray stations = XML.toJSONObject(reader).getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONArray("itemList");
                    result.put("stations", stations);
                }

                // Write time
                result.put("data_at", System.currentTimeMillis());

                // Bind to file
                try (Writer writer = new PrintWriter(f, StandardCharsets.UTF_8)) {
                    writer.write(result.toString(4));
                }

                // Bind to object
                obj.set(result);
            } catch (URISyntaxException | IOException e) {
                Wherebus.LOGGER.error(e.toString());
            }
        };

        // Read the file & bind
        try {
            obj.set(new JSONObject(Files.readString(f.toPath())));
        } catch (JSONException e) {
            update.run();
        } catch (IOException e) {
            Wherebus.LOGGER.error(e.toString());
        }

        // check if the file is valid
        if (!no_result.get()) {
            if (System.currentTimeMillis() - obj.get().getLong("data_at") > 172_800_000L) update.run();

            final List<Station> stations = new ArrayList<>();
            for (Object o : obj.get().getJSONArray("stations")) {
                JSONObject stn_obj = new JSONObject(o.toString());
                stations.add(new Station(
                        stn_obj.get("arsId").toString(),
                        stn_obj.get("direction").toString(),
                        stn_obj.get("stationNm").toString(),
                        stn_obj.get("transYn").toString(),
                        stn_obj.get("gpsX").toString(),
                        stn_obj.get("gpsY").toString()
                ));
            }

            return new Route(
                    obj.get().get("route_id").toString(),
                    obj.get().get("route_name").toString(),
                    obj.get().get("corpNm").toString(),
                    obj.get().get("start").toString(),
                    obj.get().get("end").toString(),
                    obj.get().get("term").toString(),
                    obj.get().get("length").toString(),
                    obj.get().get("type").toString(),
                    stations
            );
        } else return null;
    }
}
