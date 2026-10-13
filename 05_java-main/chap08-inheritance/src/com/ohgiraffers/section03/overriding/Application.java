package com.ohgiraffers.section03.overriding;

public class Application {
    public static void main(String[] args) {

        CoffeeVendingMachine coffeeVendingMachine = new CoffeeVendingMachine();

        System.out.println(coffeeVendingMachine);
        coffeeVendingMachine.clean();
        coffeeVendingMachine.powerOn();

    }
}
