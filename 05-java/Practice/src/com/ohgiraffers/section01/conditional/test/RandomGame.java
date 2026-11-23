package com.ohgiraffers.section01.conditional.test;

import java.util.Scanner;

public class RandomGame {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int random = (int)(Math.random() * 100) + 1;
        int count = 0;

        while (true) {
            System.out.print("정수를 입력하세요 : ");
            int num = sc.nextInt();
            count++;

            if (num > random) {
                System.out.println("입력하신 정수보다 작습니다.");
            } else if (num < random) {
                System.out.println("입력하신 정수보다 큽니다.");
            } else {
                System.out.println("정답입니다. " + count + "회만에 정답을 맞추셨습니다.");
                break;
            }
        }

        sc.close();
    }
}
