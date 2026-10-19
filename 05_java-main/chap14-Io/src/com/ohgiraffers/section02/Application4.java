package com.ohgiraffers.section02;

import java.io.*;
import java.nio.charset.StandardCharsets;

public class Application4 {
    public static void main(String[] args) {

        /*
         * FileWriter: 문자 데이터를 텍스트 파일에 쓰는 출력 스트림
         * FileReader와 마찬가지로 실행 환경의 기본 문자셋을 사용한다
         * */

        try (FileWriter fw = new FileWriter("chap14-Io/src/com/ohgiraffers/section02/testWriter.txt")) {
            fw.write("안녕하세요\n");
            fw.write("FileWriter는 문자열을 바로 쓸 수 있다");
            fw.write(new char[]{'a', 'p', 'p', 'l', 'e'});
        }   catch (IOException e) {
            e.printStackTrace();
        }

        try (Writer writer = new OutputStreamWriter(
                new FileOutputStream("chap14-Io/src/.../test.txt"),   // 실제 바이트 통로
                StandardCharsets.UTF_8)) {                            // 어떤 규칙으로 변환할지
            writer.write("안녕하세요");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}