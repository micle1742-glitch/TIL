package com.ohgiraffers.section01.xmlconfig;

import com.ohgiraffers.common.MemberDAO;
import com.ohgiraffers.common.MemberDTO;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.GenericApplicationContext;
import org.springframework.context.support.GenericXmlApplicationContext;

public class Application {

    public static void main(String[] args) {

        ApplicationContext context =
                new GenericXmlApplicationContext("section01/xmlconfig/spring-context.xml");

        // bean의 id와 클래스 기대하는 반환타입을 함께 전달하여 가져온다
        MemberDTO member = context.getBean("member", MemberDTO.class);
        System.out.println(member);

    }
}
