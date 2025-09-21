package org.neatore.wherebus;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Wherebus {
    public static final Logger LOGGER = LoggerFactory.getLogger(Wherebus.class);
    public static void main(String[] args) {
        SpringApplication.run(Wherebus.class, args);
    }
}
