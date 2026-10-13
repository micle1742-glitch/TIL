
import java.util.Scanner;

public class Baseball {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int[] members = new int[4];

        for (int i = 0; i < members.length; i++) {
            int random;
            boolean duplicate;

            do {
                random = (int) (Math.random() * 10);
                duplicate = false;

                for (int j = 0; j < i; j++) {
                    if (members[j] == random) {
                        duplicate = true;
                    }
                }

            } while (duplicate);

            // 중복이 없으면 배열에 저장
            members[i] = random;
        }


        int[] guess = new int[4];

        int chance = 10;

        while (chance > 0) {
            System.out.print("4자리 숫자를 입력하세요: ");

            int input = sc.nextInt();
            if (input < 1000 || input > 9999) {
                System.out.println("4자리의 정수를 입력해야 합니다.");
                continue;
            }

            guess[0] = input / 1000;
            guess[1] = input / 100 % 10;
            guess[2] = input / 10 % 10;
            guess[3] = input % 10;

            int strike = 0;
            int ball = 0;

            for (int i = 0; i < members.length; i++) {
                for (int j = 0; j < guess.length; j++) {
                    if (members[i] == guess[j]) {
                        if (i == j) {
                            strike++;
                        } else {
                            ball++;
                        }
                    }


                }


            }
            System.out.println(strike + "S " + ball + "B 입니다.");
            if (strike == 4) {
                System.out.println("정답입니다.");
                break;
            }

            chance--;
        }
    }
}

