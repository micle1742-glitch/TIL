package com.ohgiraffers.section05.overloading;

public class Calculator {

    public int addTwoInts(int num1, int num2) {
        return num1 + num2;
    }

    public double addTwoDoubles(double num1, double num2) {
        return num1 + num2;
    }

    public int add(int num1, int num2) {
        System.out.println("정수 2개를 더하는 add()");
        return num1 + num2;
    }

    public double add(double num1, double num2) {
        System.out.println("실수 2개를 더하는 add()");
        return num1 + num2;
    }

    //개수가 달라서 오버로딩 성립!
    public int add(int num1, int num2, int num3) {
        return num1 + num2 + num3;
    }

}