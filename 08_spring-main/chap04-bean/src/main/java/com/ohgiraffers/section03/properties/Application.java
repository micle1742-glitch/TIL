package com.ohgiraffers.section03.properties;

import com.ohgiraffers.common.Beverage;
import com.ohgiraffers.common.Product;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Application {

    public static void main(String[] args) {

        AnnotationConfigApplicationContext context =
                new AnnotationConfigApplicationContext(ContextConfiguration.class);

        Object carpBread = context.getBean("carpBread, Bread.class");
        Product milk = context.getBean("milk", Beverage.class);
        Product water = context.getBean("water", Beverage.class);

        System.out.println(carpBread);
        System.out.println(milk);
        System.out.println(water);


        context.close();
    }
}