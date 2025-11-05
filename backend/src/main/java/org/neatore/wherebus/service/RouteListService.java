package org.neatore.wherebus.service;

import org.jetbrains.annotations.NotNull;
import org.neatore.wherebus.Wherebus;
import org.neatore.wherebus.Util;

import org.json.JSONObject;

import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;

import java.io.PrintWriter;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;

import java.net.URISyntaxException;
import java.net.URI;
import java.net.URL;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

@Service
public class RouteListService {
    private final Map<String, Object> routeIdList = new ConcurrentHashMap<>();

    @SuppressWarnings("HttpUrlsUsage")
    private @NotNull JSONObject requestApi() {
        try {
            // Call API
            URL url = new URI("http://openapi.seoul.go.kr:8088/%s/json/busRoute/1/1000".formatted(System.getenv("WHEREBUS_APIKEY_ROUTEIDLIST"))).toURL();
            try (BufferedReader reader = new BufferedReader(new InputStreamReader(url.openConnection().getInputStream()))) {
                char[] buffer = new char[16384];
                int bytesRead;
                StringBuilder response = new StringBuilder();
                while ((bytesRead = reader.read(buffer)) != -1) {
                    response.append(buffer, 0, bytesRead);
                }

                JSONObject oobj = new JSONObject(response.toString());
                oobj.put("data_at", System.currentTimeMillis());

                return oobj;
            }
        } catch (IOException | URISyntaxException e) {
            Wherebus.LOGGER.error(e.toString());
            return new JSONObject();
        }
    }

    public Map<String, Object> getRouteList() {

        // Map binding required
        if (routeIdList.isEmpty()) {
            File f = Util.getFile(new File(Wherebus.dataFolder + File.separator + "RouteIdList.dat"));
//            JSONObject fobj = new JSONObject();
            AtomicReference<JSONObject> fobj = new AtomicReference<>();

            Runnable refresh = () -> {
                try (Writer writer = new PrintWriter(f, StandardCharsets.UTF_8)) {
                    JSONObject response = requestApi();
                    writer.write(response.toString(4));
                    fobj.set(response);
                } catch (IOException e) {
                    Wherebus.LOGGER.error(e.toString());
                }
            };

            try {
                if (Files.readString(f.toPath()).isEmpty()) refresh.run();
                else {
                    JSONObject obj = new JSONObject(Files.readString(f.toPath()));
                    if (System.currentTimeMillis() - obj.getLong("data_at") > 172_800_000L) refresh.run();
                    else {
                        fobj.set(obj);
                    }
                }
            } catch (IOException e) {
                Wherebus.LOGGER.error(e.toString());
            }

            // Binded
            for (String key : fobj.get().keySet()) {
                routeIdList.put(key, fobj.get().get(key));
            }
        }

        return routeIdList;
    }
}
