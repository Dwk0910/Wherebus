package org.neatore.wherebus;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;

public class Util {
    public static File getFile(File f) {
        try {
            if (!f.exists()) Files.createFile(f.toPath());
            return f;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public static <T> T getContent(String fileName, Class<T> returnType) {
        File f = new File(Wherebus.dataFolder + File.separator + fileName);
        if (!f.exists()) throw new IllegalArgumentException("File " + fileName + " does not exist.");

        T t = null;

        try {
            switch (returnType.getSimpleName()) {
                case "JSONObject" -> {
                    try {
                        JSONObject object = new JSONObject(Files.readString(f.toPath()));
                        t = returnType.cast(object);
                    } catch (JSONException e) {
                        throw new IllegalArgumentException("This cannot be parsed to JSONObject: " + e.getMessage());
                    }
                }

                case "JSONArray" -> {
                    try {
                        JSONArray object = new JSONArray(Files.readString(f.toPath()));
                        t = returnType.cast(object);
                    } catch (JSONException e) {
                        throw new IllegalArgumentException("This cannot be parsed to JSONArray: " + e.getMessage());
                    }
                }

                case "String" -> t = returnType.cast(Files.readString(f.toPath()));

                default ->
                        throw new IllegalArgumentException("return type " + returnType.getSimpleName() + " is not supported.");
            }
        } catch (IOException e) {
            Wherebus.LOGGER.error(e.toString());
        }

        return t;
    }
}
