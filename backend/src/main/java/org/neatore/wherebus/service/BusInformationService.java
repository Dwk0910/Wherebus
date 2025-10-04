package org.neatore.wherebus.service;

import org.neatore.wherebus.Wherebus;
import org.neatore.wherebus.Util;

import org.springframework.stereotype.Service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import java.nio.file.Files;
import java.nio.file.Path;
import java.util.HashMap;
import java.util.Map;

@Service
public class BusInformationService {
    public Map<String, Object> getBuses(String route_id) {
        Map<String, Object> buses = new HashMap<>();
        try {
//            URL url = new URI("http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=%s&routeId=%s".formatted(System.getenv("WHEREBUS_APIKEY_DATAGOKR"), route_id)).toURL();
//            try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream()))) {
            File f = Path.of(Wherebus.dataFolder.toString(), "test_arrival.xml").toFile();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(Files.newInputStream(f.toPath())))) {
                JSONObject response = XML.toJSONObject(reader);
                JSONArray stations = response.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONArray("itemList");
                for (Object o : stations) {
                    JSONObject station = new JSONObject(o.toString());
                    if (!Util.isEmpty(station.getString("plainNo1"))) {
                        Map<String, Object> stationMap = station.toMap();
                        Map<String, String> newMap = new HashMap<>();
                        newMap.put("plate", station.getString("plainNo1"));
                        newMap.put("arrmsg", station.getString("arrmsg1"));
                        newMap.put("currentstop", station.getString("stNm1"));
                        
                        buses.put(station.get("plainNo1").toString(), );
                    }
                }
            }
//        } catch (URISyntaxException | IOException e) {
        } catch (IOException e) {
            Wherebus.LOGGER.error(e.toString());
        }

        return buses;
    }
}
