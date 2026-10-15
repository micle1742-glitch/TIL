package com.ohgiraffers.section02.set;

import com.ohgiraffers.section01.list.dto.BookDTO;

import java.util.Set;
import java.util.TreeSet;

public class Application3 {
    public static void main(String[] args) {

        /*
        * TreeSet
        * - '중복 불가' 의 특징과 함께, 요소를 저장할 때마다 자동으로 오름차순 정렬을 해준다*/

        /*
        * 요소가 Comparable을 구현해 기본 정렬 기준을 제공하거나,
        * TreeSet을 만들 때 별도의 Comparator를 전달해야 한다.*/

        TreeSet<String> test = new TreeSet<>();

        test.add("java");
        test.add("css");
        test.add("mysql");
        test.add("html");
        test.add("java");
        System.out.println(test);

        TreeSet<BookDTO> bookSet = new TreeSet<>();
        bookSet.add(new BookDTO(2, "목민심서", "정약용", 30000));
        bookSet.add(new BookDTO(1, "홍길동전", "허균", 50000));
        bookSet.add(new BookDTO(4, "동의보감", "허준", 40000));
        bookSet.add(new BookDTO(2, "다른 책", "다른 저자", 10000));

        System.out.println("BookDTO TreeSet 결과 : ");
        for (BookDTO book : bookSet) {
            System.out.println(book);
        }

        /* TreeSet을 활용한 로또 번호 생성기 */
        Set<Integer> lotto = new TreeSet<>();

        while(lotto.size() < 6) {
            lotto.add((int)(Math.random() * 45) + 1);
        }
        /*
         * [Set]
         * - 순서를 보장하지 않는다.
         * - 중복을 허용하지 않는다.
         *
         * HashSet        : 중복 제거, 순서 보장 X
         * LinkedHashSet  : 중복 제거 + 입력 순서 유지
         * TreeSet        : 중복 제거 + 비교 기준으로 정렬
         * */
    }
}
