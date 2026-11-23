public class operator {
    public static void main(String[] args) {
        int num1 = 20;
        int num2 = 10;

        int max = (num1 > num2) ? num1 : num2;

        System.out.println("두 수 중 큰 수는 " + max + "입니다.");

        int score;
        score = 80;
        String result = (score >= 60) ? "합격입니다" : "불합격입니다";
        System.out.println(result);

        int num;
        num =7;
        String result1 = (num % 2 == 0) ? "짝수" : "홀수" ;
        System.out.println(result1);

        int month = 8;
        int day = 20;
        String name = "조길동";

        String gift = (month <=6 && day <=15) ? "배민 쿠폰"
                : (month <=12 && day <=30) ? "스타벅스 커피"
                : "사탕";
        System.out.println(name + "의 선물은 " + gift + " 입니다.");
    }
}
