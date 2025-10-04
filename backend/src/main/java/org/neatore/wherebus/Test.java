package org.neatore.wherebus;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URI;
import java.net.URL;

public class Test {
    public static void main(String[] args) {
        try {
            URL url = new URI("http://ws.bus.go.kr/api/rest/arrive/getArrInfoByRouteAll?serviceKey=%s&routeId=%s".formatted(System.getenv("WHEREBUS_APIKEY_DATAGOKR"), "100100001")).toURL();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream()))) {
                char[] buffer = new char[16384];
                int bytesRead;
                StringBuilder response = new StringBuilder();
                while ((bytesRead = reader.read(buffer)) != -1) {
                    response.append(buffer, 0, bytesRead);
                }

                System.out.println(response);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
