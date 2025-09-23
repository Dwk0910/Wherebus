package org.neatore.wherebus;

import org.json.JSONObject;
import org.json.XML;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class Test {
    public static void main(String[] args) {
        Path p = Path.of(Wherebus.dataFolder.toString(), "testData.xml");
        try {
            JSONObject obj = XML.toJSONObject(Files.readString(p));
            System.out.println(obj.toString(4));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
