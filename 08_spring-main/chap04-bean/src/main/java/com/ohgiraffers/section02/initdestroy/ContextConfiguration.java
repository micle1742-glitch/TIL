package com.ohgiraffers.section02.initdestroy;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ContextConfiguration {

    @Bean(initMethod = "openShop")
    public  Owner owner() {
        return new Owner();
    }
}
