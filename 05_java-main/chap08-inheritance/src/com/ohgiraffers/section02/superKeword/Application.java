package com.ohgiraffers.section02.superKeword;

public class Application {
    public static void main(String[] args) {

        Product product = new Product();
        System.out.println(product.getInformation());
        Product product2 = new Product("S-1234", "갤럭시", 230000);
        System.out.println(product2.getInformation());

        Computer computer1 = new Computer();
        System.out.println(computer1.getInformation());

        Computer computer2 = new Computer("C-123", "컴퓨터", 25000, "i5",32);
        System.out.println(computer2.getInformation());

        SmartPhone smartPhone1 =new SmartPhone("C-123","핸드폰",25000,"skt");
        System.out.println(smartPhone1.getInformation());
    }
}