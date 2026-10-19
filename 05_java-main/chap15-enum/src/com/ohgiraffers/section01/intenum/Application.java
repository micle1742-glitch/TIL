package com.ohgiraffers.section01.intenum;

public class Application {
    public static void main(String[] args) {
        int subject1 = Subjects.JAVA;
        int subject2 = Subjects.HTML;

        if (subject1 == subject2) {
            System.out.println(" 두 과목은 같은 과목입니다. ");
        }
        printSubject(Subjects.MYSQL);
        printSubject(2);
        printSubject(100);

    }
    public static void printSubject(int subjectNumber) {
        System.out.println("과목 번호 : " + subjectNumber);
    }

}
