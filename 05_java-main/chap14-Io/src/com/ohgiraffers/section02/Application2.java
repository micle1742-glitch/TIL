package com.ohgiraffers.section02;

import java.io.FileOutputStream;
import java.io.IOException;

public class Application2 {
    public static void main(String[] args) {
        /*
         * try-with-resources 구문
         * try 괄호 안에서 스트림을 만들면 try 블록이 끝날 때 자동으로 close()가 호출된다.
         * */

        /* new FileOutputStream(path)의 기본 동작은 덮어쓰기이다.
         * 이어쓰기가 필요하다면 new FileOutputStream(path, true) 처럼 append 옵션을 선택해야 한다. */

        try (FileOutputStream fos = new FileOutputStream("chap14-Io/src/com/ohgiraffers/section02/testOuputStrem.txt")) {
            fos.write(97);                 // 'a' 한 바이트 쓰기
            fos.write("hello\n".getBytes());

            /*byte 배열을 이용하여 여러 바이트를 한 번에 기록
            * 10 : 개행문자 (엔터)*/
            byte[] bar = new byte[] {98, 99, 100, 101, 10, 102};
            fos.write(bar);
        } catch (IOException e) {
            e.printStackTrace();
        }

    }
}
