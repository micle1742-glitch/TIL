package com.ohgiraffers.section2.userexception;

import com.ohgiraffers.section2.userexception.exception.MoneyNegativeException;
import com.ohgiraffers.section2.userexception.exception.NotEnoughMoneyException;
import com.ohgiraffers.section2.userexception.exception.PriceNegativeException;

public class Application {
    public static void main(String[] args) {

        ExceptionTest et = new ExceptionTest();

        try {
            et.checkEnoughMoney(30000, 50000);
        } catch (PriceNegativeException | MoneyNegativeException e) {
            System.out.println(e.getClass().getSimpleName() +"가격 오류 : " + e.getMessage());
        }  catch (NotEnoughMoneyException e) {
            System.out.println(e.getClass().getSimpleName() +"구매 불가 : " + e.getMessage());
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            /* 성공 여부와 관계 없이 finally가 실행된다
            * 반드시 수행해야 하는 마무리 작업을 작성 할 수 있다.*/
        }

        System.out.println("프로그램을 종료합니다.");
    }
}