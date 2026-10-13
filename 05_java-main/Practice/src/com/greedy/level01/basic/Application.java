package com.greedy.level01.basic;

public class Application {
    public static void main(String[] args) {
        Calculator calc = new Calculator();

        calc.checkMethod();

        System.out.println("1부터 10까지의 합 : " + calc.sum1to10());

        calc.checkMaxNumber(10,20);

        System.out.println("10과 20의 합은 : " + calc.sumTwoNumber(10,20));

        System.out.println("10과 5의 차는 : " + calc. minusTwoNumber(10,5));
    }
}
