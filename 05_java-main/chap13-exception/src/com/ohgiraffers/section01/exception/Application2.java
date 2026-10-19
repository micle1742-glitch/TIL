package com.ohgiraffers.section01.exception;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.NoSuchElementException;

public class Application2 {
    public static void main(String[] args) {

        ExceptionTest et = new ExceptionTest();
        try {
            et.checkEnoughMoney(50000, 10000);   // 돈 부족하게 해야 예외 남
        } catch (Exception e) {
            System.out.println("돈이 부족하여 상품 구입 불가" + e.getMessage());
//                                                            ^^   // "돈이 부족합니다!!" 출력
        }

        try {
            et.checkEnoughMoney(1000,500);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            e.printStackTrace();
            /* 예외가 발생해 전달된 호출경로 확인
            * 실제 서비스에서는 보통 로깅 도구를 이용하여 필요한 정보를 기록 */
        }
        System.out.println("프로그램을 종료합니다.");  // 이제 이것도 실행됨

        Deque<Integer> stack = new ArrayDeque<>();

        try {
            stack.pop();
        } catch (NoSuchElementException e) {
            System.out.println("빈 스택에서는 값을 꺼낼 수 없습니다");
        }
        /*
        * [Checked Exception]
        * - 컴파일러가 처리 여부를 검사한다.
        * - try-catch로 처리하거나 throws로 위임하지 않으면 컴파일 에러가 발생한다.
        * - RuntimeException을 제외한 Exception 계열 (ex: Exception, IOException)
        *
        * [Unchecked Exception]
        * - 컴파일러가 처리를 강제하지 않으며, 주로 실행 중에 발견된다.
        * - RuntimeException과 그 자손 클래스들
        *   (ex: NullPointerException, ArithmeticException, ClassCastException,
        *        ArrayIndexOutOfBoundsException,*/

    }

}
