package com.ohgiraffers.section02;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

public class Application {
    public static void main(String[] args) {

        List<OnlineCourse> courses = Arrays.asList(
                new OnlineCourse("java의 정석", "Programming", 120, false),
                new OnlineCourse("Spring 완전 정복", "Programming", 300, false),
                new OnlineCourse("JPA 끝장내기", "Programming", 240, true),
                new OnlineCourse("포토샵 마스터", "Design", 90, true),
                new OnlineCourse("일러스트레이터 시작하기", "Design", 150, false),
                new OnlineCourse("SQL 첫걸음", "Database", 80, true),
                new OnlineCourse("데이터베이스 모델링", "Database", 150, false)
        );

        // Programming 강의 중 200분을 초과하는 강의 찾기
        for (OnlineCourse c : courses) {
            if("Programming".equals(c.getCategory()) && c.getDuration() > 200){
                System.out.println(c.getTitle());
            }
        }

         courses.stream()
                 .filter(c-> "Programing".equals(c.getCategory()))
                 .filter(c->c.getDuration() > 200)
                 .map(OnlineCourse::getTitle)
                 .forEach(System.out::println);

        // 조건에 맞는 첫 번째 추천 강의 찾기
        Optional<OnlineCourse> firstRecommendedCourse = courses.stream()
                .filter(c -> "Programming".equals(c.getCategory()))
                .filter(c -> c.getDuration() > 200)
                .findFirst();   // 조건에 맞는 요소 중 첫번째 요소 반환

        // 무료 강의를 수강 시간순으로 정렬하기
        courses.stream()
                .filter(OnlineCourse::isFree)
                .sorted((c1, c2) -> Integer.compare(c1.getDuration(), c2.getDuration()))
                .forEach(System.out::println);

        // 중복 없이 카테고리 목록 만들기
        courses.stream()
                .map(OnlineCourse::getCategory)
                .distinct()
                .forEach(System.out::println);

        // 무료 강의의 전체 수강 시간 계산하기
        /* count() : 스트림에 남아있는 요소 개수 확인
        * sum() : 남은 요소 합계
        * average() : 남은 요소 평균
        * */
        int totalDurationOfFree = courses.stream()
                .filter(OnlineCourse::isFree)
                .mapToInt(OnlineCourse::getDuration)
                .sum();
        System.out.println("무료 강의 총 시간 : " + totalDurationOfFree);

        // 카테고리별로 강의 묶기
        Map<String, List<OnlineCourse>> courseByCategory = courses.stream()
                .collect(Collectors.groupingBy(OnlineCourse::getCategory));
        courseByCategory.forEach((category, courseList) -> {
            System.out.println("[" + category + "]");
            courseList.forEach(c -> System.out.println("- " + c.getTitle()));
        });

    }
}
