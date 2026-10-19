package com.ohgiraffers.section01;

import java.io.File;
import java.io.IOException;

public class Application {
    public static void main(String[] args) {

        File file = new File("chap14-Io/src/com/ohgiraffers/section01/test.txt");

        try {
            file.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
            System.out.println("파일 생성 실패 : " + e.getMessage());
        }
        System.out.println("file크기 = " + file.length() + "byte");
        System.out.println("file.경로 = " + file.getPath());
        System.out.println("file.절대경로= " + file.getAbsolutePath());

        boolean deleteSuccess = file.delete();

        System.out.println(deleteSuccess);
    }
}
