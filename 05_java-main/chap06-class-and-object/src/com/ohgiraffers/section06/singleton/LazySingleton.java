package com.ohgiraffers.section06.singleton;

public class LazySingleton {

        // 처음에는 비워둔다
        private static LazySingleton lazy;

        private LazySingleton() {}

        public static LazySingleton getInstance() {
        if(lazy == null) {
            lazy = new LazySingleton();
        }
        return lazy;
        }
}
