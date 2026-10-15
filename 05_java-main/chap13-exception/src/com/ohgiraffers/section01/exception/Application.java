package com.ohgiraffers.section01.exception;

public class Application {
    public static void main(String[] args) throws Exception {

        ExceptionTest et = new ExceptionTest();
        et.checkEnoughMoney(10000, 50000);
        et.checkEnoughMoney(50000, 10000);
        System.out.println("프로그램을 종료합니다.");

    }
}
