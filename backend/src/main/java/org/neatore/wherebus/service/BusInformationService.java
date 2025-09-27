package org.neatore.wherebus.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class BusInformationService {
    public Map<String, Object> getBuses(String route_id) {
        return new HashMap<>();
    }
}
