package com.ohgiraffers.section02.set;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;

public class Application {
    public static void main(String[] args) {

        /*
        * [set]
        * - 순서를 보장하지 않는다.
        * - 중복을 허용하지 않는다.
        * */

        List<String> alist = new ArrayList<>();
        alist.add("java");
        alist.add("mysql");
        alist.add("java");

        HashSet<String> hset = new HashSet<>();
        hset.add("java");
        hset.add("html");
        hset.add("css");
        hset.add("java");

        System.out.println("ArrayList : " + alist);
        System.out.println("HashSet : " + hset);

        System.out.println("향상된 for문으로 순회");
        for (String value : hset) {
            System.out.println(value);
        }

        System.out.println("Iterator로 순회");
        Iterator<String> iter = hset.iterator();
        while ((iter.hasNext())) { // 다음에 꺼낼 요소가 있다면 true
            System.out.println(iter.next());
        }
    }
}
