package com.ohgiraffers.section01.init;

public class Car {

    private String modelName;
    private int maxSpeed;

    public Car(String modelName, int maxSpeed) {
        this.modelName = modelName;
        this.maxSpeed = maxSpeed;
    }

    public void driveMaxSpeed() {
        System.out.println(this.modelName + "이" + this.maxSpeed + "로 쌩~ 달려갑니다!");
    }

    // 최대 속도 반환
    public int getMaxSpeed() {
        return this.maxSpeed;
    }

    // 모델명 반환
    public String getModelName() {
        return this.modelName;
    }
}
