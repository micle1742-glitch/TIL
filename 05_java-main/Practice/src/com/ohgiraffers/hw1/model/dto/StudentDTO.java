package com.ohgiraffers.hw1.model.dto;

public class StudentDTO {
    private int grade;
    private int classroom;
    private String name;
    private int kor;
    private int eng;
    private int math;

    public StudentDTO () {
    }

    public StudentDTO(int grade, int classroom, String name, int kor, int eng, int math) {
        this.grade = grade;
        this.classroom = classroom;
        this.name = name;
        this.kor = kor;
        this.eng = eng;
        this.math = math;

    }

    public String getInformation () {
        return grade + ", " + classroom + ", " + name
                + ", " + kor + ", " + eng + ", " + math
                + ", 평균: " + (kor + eng + math) / 3.0;
    }


}
