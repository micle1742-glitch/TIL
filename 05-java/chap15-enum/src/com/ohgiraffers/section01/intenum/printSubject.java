package com.ohgiraffers.section01.intenum;

public class printSubject {
    public static void printSubject(int subjectNumber) {
        String subject = "";
        switch (subjectNumber) {
            case Subjects.JAVA: subject = "JAVA";
                break;
            case Subjects.MYSQL: subject = "MYSQL";
                break;
            case Subjects.JDBC: subject = "JDBC";
                break;
        }
        System.out.println("전달받은 과목 : " + subject);
    }
}
