package com.ohgiraffers.hw1.model;

import com.ohgiraffers.hw1.model.dto.BookDTO;
import com.ohgiraffers.hw1.model.dto.StudentDTO;

import java.util.Scanner;

public class Application {
    public static void main(String[] args) {
         BookDTO book = new BookDTO();
         book.printInformation();

         BookDTO book2 = new BookDTO("자바의 정석", "도우출판", "남궁성");
         book2.printInformation();

         BookDTO book3 = new BookDTO("홀길동전","활빈당","허균",500000,0.5);
         book3.printInformation();

        Scanner scanner = new Scanner(System.in);
        StudentDTO[] students = new StudentDTO[10];

        int count = 0;
        String answer;

        do {
            System.out.print("학년 : ");
            int grade = scanner.nextInt();

            System.out.print("반 : ");
            int classroom = scanner.nextInt();

            scanner.nextLine(); // 숫자 입력 뒤 남은 줄바꿈 처리

            System.out.print("이름 : ");
            String name = scanner.nextLine();

            System.out.print("국어점수 : ");
            int kor = scanner.nextInt();

            System.out.print("영어점수 : ");
            int eng = scanner.nextInt();

            System.out.print("수학점수 : ");
            int math = scanner.nextInt();

            students[count] = new StudentDTO(
                    grade, classroom, name, kor, eng, math
            );
            count++;

            scanner.nextLine();

            System.out.print("계속 추가할 겁니까? (y/n) : ");
            answer = scanner.nextLine();

        } while (answer.equalsIgnoreCase("y") && count < 10);

        System.out.println("----- 입력 생략 -----");

        for (int i = 0; i < count; i++) {
            System.out.println(students[i].getInformation());
        }

        scanner.close();




    }
    
}
