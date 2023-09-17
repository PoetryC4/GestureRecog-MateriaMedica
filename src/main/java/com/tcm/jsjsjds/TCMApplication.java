package com.tcm.jsjsjds;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Slf4j
@MapperScan("com.tcm.jsjsjds.mapper")
@SpringBootApplication
@ServletComponentScan
@EnableTransactionManagement
public class TCMApplication {
    public static void main(String[] args) {
        SpringApplication.run(TCMApplication.class,args);
        log.info("项目启动成功...端口8026");
    }
}
//D2W23IuLI5gUkrSDc2B7CeEBgFozKmQJROzcVgYwAFCSk8SNWkLs5E5dNRhJhCEX