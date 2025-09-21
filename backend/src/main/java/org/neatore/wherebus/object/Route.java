package org.neatore.wherebus.object;

import java.util.HashMap;
import java.util.Map;

public record Route(String route_id, String route_name, String corpName, String start, String end, String term,
                    String length, String type) {
    public Map<String, String> toMap() {
        final Map<String, String> result = new HashMap<>();
        result.put("route_id", route_id);
        result.put("route_name", route_name);
        result.put("corpName", corpName);
        result.put("start", start);
        result.put("end", end);
        result.put("term", term);
        result.put("length", length);
        result.put("type", switch (type) {
            case "1" -> "공항버스";
            case "2" -> "마을버스";
            case "3" -> "간선버스";
            case "4" -> "지선버스";
            case "5" -> "순환버스";
            case "6" -> "광역버스";
            case "7" -> "인천";
            case "8" -> "경기";
            case "9" -> "폐지";
            case "0" -> "공용";
            default -> null;
        });
        return result;
    }
}
