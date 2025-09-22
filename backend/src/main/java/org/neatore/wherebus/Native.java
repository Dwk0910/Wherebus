package org.neatore.wherebus;

import org.jetbrains.annotations.NotNull;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
