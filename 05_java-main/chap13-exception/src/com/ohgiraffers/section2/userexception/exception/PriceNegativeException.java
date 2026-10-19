package com.ohgiraffers.section2.userexception.exception;

public class PriceNegativeException extends NegativeException {
    public PriceNegativeException(String message) {
        super(message);   // NegativeException(String message) 호출 → OK
    }
}