package com.tcm.jsjsjds.util;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Objects;

public class URLUtils {
    public static String getContent(String url,String method) throws IOException {
        BufferedReader reader = null;
        String bookHSONString = null;

        HttpURLConnection conn = null;
        URL requestUrl = new URL(url);
        conn = (HttpURLConnection) requestUrl.openConnection();
        conn.setRequestMethod(method);
        conn.setConnectTimeout(5000);
        conn.connect();

        InputStream inputstream = conn.getInputStream();

        reader = new BufferedReader(new InputStreamReader(inputstream));

        StringBuilder builder = new StringBuilder();

        String line;
        while((line= reader.readLine())!=null){
            builder.append(line);
            builder.append("\n");
        }
        if(builder.length()==0){
            return null;
        }

        conn.disconnect();
        reader.close();
        return builder.toString();
    }
}
