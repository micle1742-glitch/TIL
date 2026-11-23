package com.ohgiraffers.section1.intro;

public class Application {
    public static void main(String[] args) {

        /* 익명 클래스 덧셈 */
    Calculator anonymousAdd = new Calculator() {
        @Override
        public int operate(int a, int b) {
            return a + b;
        }
    };
    System.out.println("익명 클래스 덧셈 : " + calculate(10,19,anonymousAdd));

        /* 람다식 : 추상 메소드가 1개인 인터페이스를 짧게 구현 */
        Calculator lambdaAdd = (int a, int b) -> a + b;
        System.out.println("람다식 덧셈 : " + calculate(10, 19, lambdaAdd));

        /* 람다식을 변수에 담지 않고 매개변수로 바로 전달 */
        System.out.println("람다식 뺄셈 : " + calculate(10, 19, (int a, int b) -> a - b));
        System.out.println("람다식 곱셈 : " + calculate(10, 19, (a, b) -> a * b));   // 타입 생략 가능

        int bonus= 5;
        Calculator bonusCalculator = (a,b) -> a+b+bonus;
        //bonus = 10; //람다가 참조하는 지역변수는처음 정한뒤 다시 대입할 수 없다
        /*
         * 람다는 선언된 자리에서 지역 변수의 값을 가져가 나중에 실행될 수도 있다.
         * 그 사이 지역 변수 값이 계속 바뀐다면 람다가 어느 값을 사용해야 하는지 흐름을 이해하기 어려워진다.
         * 이러한 혼란을 막기 위해 자바는 람다가 참조하는 지역변수는 처음 정한 뒤 다시 대입하지 못하게 한다.
         * */
        System.out.println(calculate(10,20,bonusCalculator));

        /*
        * [람다식] 하나의 추상 메소드를 가진 함수형 인터페이스의 구현을
        * 간결하게 표현하는 문법이다*/
    }


    public static int calculate(int first, int second, Calculator calculator) {
        return calculator.operate(first,second);
    }
}
