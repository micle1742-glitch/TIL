package com.ohgiraffers.section01.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Aspect
@Component
public class LoggingAspect {

    /* @Pointcut: 공통 기능을 적용할 메소드의 조건을 이름 붙여 보관 */
    @Pointcut("execution(* com.ohgiraffers.section01.aop.*Service.*(..))")
    public void serviceMethods() {
    }

    @Before("serviceMethods()")
    // Advice: 실행할 공통 기능
    public void logBefore(JoinPoint joinPoint) {
        System.out.println("[Before] " + joinPoint.getSignature().getName()
                + " args = " + Arrays.toString(joinPoint.getArgs()));
    }

    @AfterReturning(pointcut = "serviceMethods()", returning = "result")
    public void logAfterReturning(JoinPoint joinPoint, Object result) {
        System.out.println("[AfterReturning] " + joinPoint.getSignature().getName()
                + " result = " + result);
    }

    @AfterThrowing(pointcut = "serviceMethods()", throwing = "exception")
    public void logAfterThrowing(JoinPoint joinPoint, Throwable exception) {
        System.out.println("[AfterThrowing] " + joinPoint.getSignature().getName()
                + " exception = " + exception);
    }

    @After("serviceMethods()")
    public void logAfter(JoinPoint joinPoint) {
        System.out.println("[After] " + joinPoint.getSignature().getName());
    }

    @Around("serviceMethods()")
    public Object logExecutionTime(ProceedingJoinPoint joinPoint) throws Throwable {
        long startTime = System.nanoTime();

        try {
            // proceed()를 호출해야 원래 Service 메소드가 실제로 실행된다.
            return joinPoint.proceed();
        } finally {
            long elapsedTime = System.nanoTime() - startTime;
            System.out.println("[Around] " + elapsedTime + "ns");
        }
    }
}