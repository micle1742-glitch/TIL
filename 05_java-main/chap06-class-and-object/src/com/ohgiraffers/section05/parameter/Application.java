package com.ohgiraffers.section05.parameter;

public class Application {
    public static void main(String[] args) {

        /*파라미터 전달 방식
        * 1. 값 복사 (pass by value)
        * 2. 주소 복사 (pass by Reference
        * */
        MethodParameter mp = new MethodParameter();

        int num = 20;
        System.out.println("호출 전 main num:" +num);
        mp.primitiveType(num);
        System.out.println("호출 후 main의 num" +num);

        System.out.println("호출 전 main num : " + num);
        mp.primitiveType(num);  // '값'인 20을 복사해서 전달
        System.out.println("호출 후 main의 num : " + num);  // 원본에 영향 없음

    }
}
