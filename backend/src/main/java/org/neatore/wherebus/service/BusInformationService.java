package org.neatore.wherebus.service;

import org.neatore.wherebus.Wherebus;

import org.springframework.stereotype.Service;

import org.json.JSONException;
import org.json.JSONArray;
import org.json.JSONObject;
import org.json.XML;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.Map;
import java.util.Objects;

@Service
public class BusInformationService {
    public Map<String, Object> getBus(String busId) {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new URI("http://ws.bus.go.kr/api/rest/buspos/getBusPosByVehId?serviceKey=%s&vehId=%s".formatted(System.getenv("WHEREBUS_APIKEY_DATAGOKR"), busId)).toURL().openConnection().getInputStream()))) {
            JSONObject response_ = XML.toJSONObject(reader);
            JSONObject response = response_.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONObject("itemList");
            return response.toMap();
        } catch (IOException | URISyntaxException e) {
            Wherebus.LOGGER.error(e.toString());
        } catch (JSONException e) {
            return null;
        }
        return null;
    }

    public Map<String, Object> getBuses(String route_id) {
        JSONObject response = getBuses_(route_id);
        return response.toMap();
    }

    private JSONObject getBuses_(String routeId) {
        final JSONObject result = new JSONObject();
        JSONObject response_ = null;
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(new URI("http://ws.bus.go.kr/api/rest/buspos/getBusPosByRtid?serviceKey=%s&busRouteId=%s".formatted(System.getenv("WHEREBUS_APIKEY_DATAGOKR"), routeId)).toURL().openConnection().getInputStream()))) {
            response_ = XML.toJSONObject(reader);
            JSONArray response = response_.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONArray("itemList");
            for (Object o : response) {
                JSONObject bus = new JSONObject(o.toString());
                JSONObject generated = new JSONObject();
                generated.put("id", bus.get("vehId"));
                generated.put("plate", bus.get("plainNo"));
                generated.put("bustype", bus.get("busType"));
                generated.put("route", routeId);
                generated.put("nextStop", bus.get("nextStId"));
                generated.put("sectpos", (bus.getInt("sectOrd") - 1) + (bus.get("stopFlag").toString().equals("0") ? ".5" : ""));
                result.put(generated.get("id").toString(), generated);
            }
        } catch (URISyntaxException | IOException e) {
            Wherebus.LOGGER.error(e.toString());
        } catch (JSONException e) {
            Wherebus.LOGGER.error(Objects.requireNonNull(response_).toString(4));
        }
        return result;
    }
}
