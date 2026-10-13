package com.ohgiraffers.section01.extend;

public class Car {

    private boolean runnungStatus;

    //기본 생성자
    public Car() {
        System.out.println("Car 클래스의 기본 생성자 호출..");
    }

    public void run() {
        runnungStatus = true;
        System.out.println("자동차가 달립니다.");

    }

    public void stop() {
        runnungStatus = false;
        System.out.println("자동차가 멈춥니다.");
    }

    public void soundHorn() {
        if (isRunning()) {
            System.out.println("빵빵");
        } else {
            System.out.println("주행중이 아닙니다");
        }
    }

    /* protected : 같은 패키지에서 접근 할 수 있ㅇ며,
    * 다른 패키지에서는 상속받은 자식클래스가 사용할 수 있다*/
    protected boolean isRunning() {
        return runnungStatus;
    }
}
