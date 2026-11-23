package com.ohgiraffers.section06.finalkeyword;

public class Application {
    public static void main(String[] args) {

        //final 변수
        /*System.out.println("원주율 : " + MathConstant.PI);
        MathConstant.PI = 3.14;*/

        //final 인스턴스 필드
        Person person = new Person("000000-111111", "홍길동");

        person.setName("유관순");
        //person.ssn = "010101-222222"
    }
}
/*
 * [싱글톤 패턴]
 * 특정 클래스의 인스턴스가 하나만 생성되도록 보장하는 디자인 패턴
 *
 * 1. 생성자를 private으로 선언해 외부의 객체 생성을 제한
 * 2. private static 필드에 자기 자신의 인스턴스를 저장
 * 3. public static 메서드로 인스턴스를 반환
 *
 * 사용 예: DB 연결 설정, 로그 시스템 등
 */