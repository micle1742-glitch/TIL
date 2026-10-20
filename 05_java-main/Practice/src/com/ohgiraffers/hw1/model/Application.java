package com.ohgiraffers.hw1.model.dto;

public class Application {
    public static void main(String[] args) {
         BookDTO book = new BookDTO();
         book.printInformation();

         BookDTO book2 = new BookDTO("자바의 정석", "도우출판", "남궁성");
         book2.printInformation();

         BookDTO book3 = new BookDTO("홀길동전","활빈당","허균",500000,0.5);
         book3.printInformation();



    }
}
