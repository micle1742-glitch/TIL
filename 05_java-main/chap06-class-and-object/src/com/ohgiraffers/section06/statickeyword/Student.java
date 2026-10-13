package com.ohgiraffers.section06.statickeyword;

public class Student {

    private int personalLockerCount;
    private static int sharedLockerCount;

    public int getPersonalLockerCount() {
        return this.personalLockerCount;
    }

    public int getSharedLockerCount() {
        return Student.sharedLockerCount;
    }

    public void increasePL() {
        this.personalLockerCount++;
    }

    public void increaseSL() {
        Student.sharedLockerCount++;
    }
}