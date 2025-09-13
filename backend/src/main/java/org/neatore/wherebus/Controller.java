package org.neatore.wherebus;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = {"http://localhost:5173"})
public class Controller {
    @PostMapping("/get")
    public String get() {
        JSONObject result = new JSONObject();
        
    }
}
