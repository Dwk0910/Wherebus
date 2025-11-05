package org.neatore.wherebus.service;

import org.neatore.wherebus.Wherebus;

import org.springframework.stereotype.Service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.Map;

@Service
public class BusInformationService {
    public Map<String, Object> getBuses(String route_id) {
//        try {
//            // TODO: Change API to http://ws.bus.go.kr/api/rest/buspos/getBusPosByRouteSt
//            URL url = new URI("http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=%s&busRouteId=%s".formatted(System.getenv("WHEREBUS_APIKEY_DATAGOKR"), route_id)).toURL();
//            try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream()))) {
//                JSONObject response = XML.toJSONObject(reader);
//                JSONArray stations = response.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONArray("itemList");
//                for (Object o : stations) {
//                    JSONObject station = new JSONObject(o.toString());
//                    if (!Util.isEmpty(station.getString("plainNo1"))) {
//                        Map<String, Object> newMap = new HashMap<>();
//                        newMap.put("id", station.get("vehId1"));
//                        newMap.put("plate", station.get("plainNo1"));
//                        newMap.put("bustype", station.get("busType1"));
//                        newMap.put("nextstop", station.get("nstnId1"));
//                        newMap.put("inftype", station.get("rerdie_Div1"));
//                        newMap.put("inf", station.get("reride_Num1"));
//                        newMap.put("islast", Integer.parseInt(station.get("isLast1").toString()) == 1);
//                        newMap.put("isarrive", station.get("isArrive1"));
//
//                        buses.put(station.get("plainNo1").toString(), newMap);
//                    }
//                }
//            }
//        } catch (IOException | URISyntaxException e) {
//            Wherebus.LOGGER.error(e.toString());
//        }
        JSONObject response = getBuses_(route_id);
        return response.toMap();
    }

    private JSONObject getBuses_(String routeId) {
        final JSONObject result = new JSONObject();
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new URI("http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid?serviceKey=%s&busRouteId=%s".formatted(System.getenv("WHEREBUS_APIKEY_DATAGOKR"), routeId)).toURL().openConnection().getInputStream()))) {
            JSONObject response_ = XML.toJSONObject(reader);
            JSONArray response = response_.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONArray("itemList");
            for (Object o : response) {
                JSONObject bus = new JSONObject(o.toString());
                JSONObject generated = new JSONObject();
                generated.put("id", bus.get("vehId"));
                generated.put("plate", bus.get("plainNo"));
                generated.put("bustype", bus.get("busType"));
                generated.put("nextStop", bus.get("nextStId"));
                generated.put("sectpos", (bus.getInt("sectOrd") - 1) + (bus.get("stopFlag").toString().equals("0") ? ".5" : ""));
                result.put(generated.get("id").toString(), generated);
            }
        } catch (URISyntaxException | IOException e) {
            Wherebus.LOGGER.error(e.toString());
        }
        return result;
    }
}
