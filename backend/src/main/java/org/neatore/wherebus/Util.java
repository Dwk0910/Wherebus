package org.neatore.wherebus;

import org.json.JSONObject;
import org.neatore.wherebus.object.Route;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import java.io.IOException;

public class Util {
//    public static Route getRouteById(String route_id) {
//        JSONObject data = new JSONObject();
//
//        /* Sample Data */
//        Resource resource = new ClassPathResource("testRouteInfo.json");
//        try {
//            byte[] fileData = resource.getInputStream().readAllBytes();
//            String strData = new String(fileData);
//            data = new JSONObject(strData);
//        } catch (IOException ignored) {}
//
//        Route result = null;
//        for (Object o : data.getJSONObject("ServiceResult").getJSONObject("msgBody").getJSONArray("row")) {
//            JSONObject item = new JSONObject(o.toString());
//            if (item.getString("RTE_ID").equals(route_id))
//                result = new Route(item.getString("RTE_ID"), item.getString("RTE_NM"), item.getString("corpNm"), item.getString("stStationNm"), item.getString("edStationNm"), item.getString("term"), item.getString("length"), item.getString("routeType"));
//        }
//
//        if (result == null) throw new IllegalArgumentException("route id " + route_id + " is not a valid route id.");
//        else return result;
//    }
}
