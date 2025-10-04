package org.neatore.wherebus.controller;

import org.neatore.wherebus.service.BusInformationService;

import org.jetbrains.annotations.NotNull;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class BusController {
    public final BusInformationService busInformationService;

    public BusController(BusInformationService busInformationService) {
        this.busInformationService = busInformationService;
    }

    @PostMapping("/getBus")
    public ResponseEntity<@NotNull Map<String, Object>> getBus(@RequestParam("routeId") String route_id) {
        return ResponseEntity.ok(busInformationService.getBuses(route_id));
    }
}
