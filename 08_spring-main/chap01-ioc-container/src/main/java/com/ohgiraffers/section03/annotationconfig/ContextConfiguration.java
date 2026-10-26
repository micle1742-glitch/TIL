package com.ohgiraffers.section03.annotationconfig;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

/*
* ComponentScan
* basePakages로 설정된 하위 경로에 특정 어노테이션(@Component)을 가지고 있는 클래스르르 bean으로 등록한다.
* 목적에 따라 세부 기능을 제공하는 @Controller, @Service, @Repository, @Configuration등을 사용한다.
* */
@Configuration
@ComponentScan(basePackages = "com.ohgiraffers.common")
public class ContextConfiguration {
}
