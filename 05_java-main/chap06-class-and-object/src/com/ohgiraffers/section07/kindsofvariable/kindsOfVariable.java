package com.ohgiraffers.section07.kindsofvariable;

public class kindsOfVariable {

    /* 클래스 영역에 작성하는 변수를 필드라고 한다. */
    // 인스턴스 변수(non-static)는 객체마다 따로 만들어지며 객체가 존재하는 동안 유지된다.
    /*-new로 객체를 만들 때 heap 메모리에 생성
    * 같은클래스 내어느메서드에서든 접근가능
    * 객체가 살아있는동안만 존재*/
    private int instanceNum;

    //static 변수는 클래스가 초기화 될 때 하나 만들어지며 같은 클래스 모든 객체가 공유한다.
    /*프로그램 시작시 static영역에 단하나만 생성
    * 모든 인스턴스(객체)가 공유하며 프로그램 종료시까지 사라지지않는다*/
    private static int staticNum;

    //지역 변수 -> 메서드 안에 선언하는 변수
    public void method(int num) {
        // num : 매개변수도 지역변수의 일종

        // 메서드가 호출 될 때 stack메모리에 생성ㅋ된다
        // '}'를 만나는 순간 즉시 사라진다.
        int localNum;

        System.out.println(num);
        //System.out.println(localNum); //초기화 전 사용 불가

        // 인스턴스 변수 : 같은 클래스 내 어디서든 접근 가능
        System.out.println(instanceNum);
        // 클래스 변수 : 프로그램 전체에서 접근 가능
        System.out.println(staticNum);

    }
    public void method2() {
        System.out.println(instanceNum);
        System.out.println(staticNum);
        //System.out.println(localNum); //지역 변수는 해당지역(블럭)안에서만 사용가능
    }
}
