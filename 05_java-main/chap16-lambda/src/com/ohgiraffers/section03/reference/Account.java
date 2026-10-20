package com.ohgiraffers.section03.reference;

public class Account {

    private String ownerName;
    private int balance;

    public Account() {
        System.out.println("기본 생성자 호출됨");
    }

    public Account(String ownerName) {
        this.ownerName = ownerName;
        System.out.println("Strig 생성자 호출됨");
    }

    public Account(String ownerName, int balance) {
        this.ownerName = ownerName;
        this.balance = balance;
        System.out.println("string balance");

    }

    @Override
    public String toString() {
        String toString = "";
        return "Account{" +
                "ownerName='" + ownerName + '\'' +
                ", balance=" + balance +
                ", toString='" + toString + '\'' +
                '}';
    }

}
