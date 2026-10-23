import java.util.Scanner;

public class Main {

    public static String josa(String word, String withBatchim, String withoutBatchim) {
        // (지금 완성한 코드 그대로)
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        while (true) {
            System.out.print("반려동물 이름 (끝내려면 q) > ");
            String name = sc.nextLine().trim();

            if (name.equals("q")) break;

            System.out.println(josa(name, "이", "가") + " 꼬리를 흔듭니다.");
            System.out.println();
        }
    }
}