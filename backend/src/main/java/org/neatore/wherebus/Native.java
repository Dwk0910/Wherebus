package org.neatore.wherebus;

import org.jetbrains.annotations.NotNull;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicReference;

@RestController
public class Native {
    @GetMapping("/error")
    public ResponseEntity<@NotNull String> error() {
        return ResponseEntity.status(200).body("Error");
    }

    @GetMapping("/health")
    public ResponseEntity<@NotNull String> health() {
        return ResponseEntity.ok("OK");
    }

    @GetMapping("/notification")
    public ResponseEntity<@NotNull Map<String, String>> getNotification() {
        File f = Path.of(Wherebus.dataFolder.toString(), "notification.md").toFile();
        try {
            if (!f.exists()) throw new JSONException("");
            String content = Files.readString(f.toPath());
            JSONObject obj = new JSONObject(content.split("<<CONT>>")[0]);
            AtomicReference<Map<String, String>> result = new AtomicReference<>(new ConcurrentHashMap<>());
            obj.toMap().forEach((k, v) -> result.get().put(k, v.toString()));
            result.get().put("status", "ok");
            result.get().put("content", content.split("<<CONT>>")[1]);
            return ResponseEntity.ok(result.get());
        } catch (IOException | JSONException e) {
            return ResponseEntity.ok(Map.of("status", "notfound"));
        }
    }
}
