package com.ohgiraffers.section01.polymorphism;

public class Tiger extends Animal {

    @Override
    public void eat() {
        System.out.println("호랑이가 고기를 먹고 있습니다");
    }

    @Override
    public void run() {
        System.out.println("호랑이가 빠르게 달려갑니다");
    }

    @Override
    public void cry() {
        System.out.println("호랑이가 어흥하고 울음소리를 냅니다");
    }

    public void bite() {
        System.out.println("호랑이가 사냥을 합니다~!!");
    }
}