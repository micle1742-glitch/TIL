import java.util.Scanner;

public class array {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        System.out.print("홀수인 양의 정수를 입력하세요 : ");
        int num = sc.nextInt();

        if (num % 2 == 1 && num>0) {
            int[] arr = new int[num];
            for (int i = 0; i < num; i++) {

                if (i<num/2){
                    arr[i] = i+1;
                }else {
                    arr[i] = num -i;
                }
                System.out.println(arr[i] + " ");
            }
        } else System.out.println("양수 혹은 홀수만 입력해야 합니다");
    }
}

