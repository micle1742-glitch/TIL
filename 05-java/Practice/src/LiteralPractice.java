public class LiteralPractice {

    public static void main(String[] args) {
        int num1 = 20;
        int num2 = 30;
        System.out.println(num1 + num2);
        System.out.println(num1 - num2);
        System.out.println(num1 * num2);
        System.out.println(num1 / num2);
        System.out.println(num1 % num2);


        double width = 12.5;
        double height = 36.4;

        double area = width * height;
        double perimeter = (width + height) * 2;

        System.out.println(area);
        System.out.println(perimeter);

        char A = 'a';
        System.out.println("문자 a의 unucode : "+ (int) A);

        double korean = 80.5;
        double math = 50.6;
        double english = 70.8;

        System.out.println("총점 : "+(int)(korean + math + english));
        System.out.println("평균 : "+(int)((korean + math + english) / 3));
    }

}