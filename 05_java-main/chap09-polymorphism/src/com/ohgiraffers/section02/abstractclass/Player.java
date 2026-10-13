package com.ohgiraffers.section02.abstractclass;

public abstract class Player {
    /*
     * [추상 클래스]
     * - abstract 키워드로 선언
     * - 일반 메소드와 추상 메소드를 모두 가질 수 있다.
     * - 추상 메소드는 몸체가 없으며 자식 클래스에서 반드시 오버라이딩 해야한다.
     * - 참조변수 타입으로는 사용할 수 있다 - 다형성 적용 가능
     */

    public abstract void attack();

    public void defend() {
        System.out.println("공격을 방어합니다.");
    }
}