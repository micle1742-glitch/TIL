package com.ohgiraffers.section01.extend;

public class RacingCar extends Car{

    @Override
    public void run() {
        super.run(); //부모의 메소드 호출
        System.out.println("매우 빠르게 달립니다.");
    }
}
