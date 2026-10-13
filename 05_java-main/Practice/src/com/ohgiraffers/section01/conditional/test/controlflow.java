package com.ohgiraffers.section01.conditional.test;

import java.util.Scanner;

public class controlflow {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("국어 점수를 입력하세요 : ");
        int korean = sc.nextInt();

        System.out.print("영어 점수를 입력하세요 : ");
        int english = sc.nextInt();

        System.out.print("수학 점수를 입력하세요 : ");
        int math = sc.nextInt();

        // 평균 계산
        double avg = ((korean + english + math) / 3.0);

// 평균 미달
        if (avg < 60) {
            System.out.println("평균 점수 미달로 불합격입니다.");
        }

// 과목별 과락
        if (korean < 40) {
            System.out.println("국어 점수 미달로 불합격입니다.");
        }

        if (english < 40) {
            System.out.println("영어 점수 미달로 불합격입니다.");
        }

        if (math < 40) {
            System.out.println("수학 점수 미달로 불합격입니다.");
        }

// 합격 조건
        if (avg >= 60 && korean >= 40 && english >= 40 && math >= 40) {
            System.out.println("합격입니다!");
        }
    }

    public class SalesSalary {
        public static void main(String[] args) {
            Scanner sc = new Scanner(System.in);

            System.out.print("월 급여 입력 : ");
            int salary = sc.nextInt();

            System.out.print("매출액 입력 : ");
            int sales = sc.nextInt();

            // 보너스율
            double bonusRate;

            if (sales >= 50000000) {
                bonusRate = sales * 0.05;
            } else if (sales >= 30000000) {
                bonusRate = sales * 0.03;
            } else if (sales >= 10000000) {
                bonusRate = sales * 0.01;
            } else {
                bonusRate = 0.0;
            }

            // 보너스 금액과 총 급여 계산
            int bonus = (int) (sales * bonusRate);
            int totalSalary = salary + bonus;

            System.out.println("======================");
            System.out.println("매출액 : " + sales);
            System.out.println("보너스율 : " + (int) (bonusRate * 100) + "%");
            System.out.println("월 급여 : " + salary);
            System.out.println("보너스 금액 : " + bonus);
            System.out.println("======================");
            System.out.println("총 급여 : " + totalSalary);
        }
    }




}


