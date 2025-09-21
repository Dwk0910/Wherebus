package org.neatore.wherebus.service;

import org.json.JSONException;
import org.json.JSONObject;
import org.neatore.wherebus.Wherebus;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RouteListService {
    private final Map<String, Object> busList = new ConcurrentHashMap<>();
    public Map<String, Object> getBusList() {
        if (busList.isEmpty() || System.currentTimeMillis() - Long.parseLong(busList.get("data_at").toString()) > 43_200_000L) {
            try {
                // Call API
                URL url = new URI("http://openapi.seoul.go.kr:8088/%s/json/busRoute/1/1000".formatted(System.getenv("WHEREBUS_APIKEY_BUSLIST"))).toURL();
                try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream()))) {
                    int bytesRead;
                    char[] buffer = new char[16384];

                    StringBuilder contentBuilder = new StringBuilder();
                    while((bytesRead = reader.read(buffer)) != -1) {
                        contentBuilder.append(buffer, 0, bytesRead);
                    }

                    try {
                        JSONObject obj = new JSONObject(contentBuilder.toString());
                        obj.put("data_at", System.currentTimeMillis());

                        // Apply it to original map
                        for (String key : obj.keySet()) {
                            busList.put(key, obj.get(key));
                        }
                    } catch (JSONException e) {
                        return new HashMap<>();
                    }
                }
            } catch (URISyntaxException | IOException e) {
                Wherebus.LOGGER.error(e.toString());
            }
        }

        return busList;
    }
}
