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

import static com.tcm.jsjsjds.util.URLUtils.getContent;

@Slf4j
@RestController
@RequestMapping("/vcl")
public class VocalController {


    @GetMapping("/get")
    public R<String> getVocal() throws IOException {
        String path = "http://127.0.0.1:5050/";
        String resStr = getContent(path,"GET");
        //log.info(resStr);
        return R.success(resStr);
    }

}
