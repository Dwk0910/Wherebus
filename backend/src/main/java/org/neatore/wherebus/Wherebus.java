package org.neatore.wherebus;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

@SpringBootApplication
public class Wherebus {
    public static final Logger LOGGER = LoggerFactory.getLogger(Wherebus.class);
    public static final Path dataFolder = Path.of(System.getProperty("user.dir"), "data");

    public static void main(String[] args) throws IOException {
        if (!dataFolder.toFile().exists()) Files.createDirectories(dataFolder);
        SpringApplication.run(Wherebus.class, args);
    }
}
