package com.tcm.jsjsjds.controller;


import com.tcm.jsjsjds.common.R;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/img")
public class ImageController {

    private int maxSize = 3000;

    @GetMapping("/data")
    public R<String> getPixel(String path) throws IOException {
        log.info(path);
        int scale = 1;
        StringBuilder res= new StringBuilder();
        BufferedImage img = ImageIO.read(new File(path));
        int width = img.getWidth();
        int height = img.getHeight();
        for (scale = 1; scale < 100 ; scale++) {
            if(width / scale * height / scale < maxSize) break;
        }
        width /=scale;
        height /= scale;
        res.append(width).append("\t");
        res.append(height).append("\t");
        for(int i=0;i<height;i++) {
            for (int j=0;j<width;j++) {
                Object data = img.getRaster().getDataElements(j*scale + scale/2, i*scale + scale/2, null);
                int opa = img.getColorModel().getAlpha(data);
                res.append(opa).append("\t");
                int red = img.getColorModel().getRed(data);
                res.append(red).append("\t");
                int green = img.getColorModel().getGreen(data);
                res.append(green).append("\t");
                int blue = img.getColorModel().getBlue(data);
                res.append(blue).append("\t");
            }
        }
        //log.info(res.toString());
        return R.success(res.toString());
    }

}
