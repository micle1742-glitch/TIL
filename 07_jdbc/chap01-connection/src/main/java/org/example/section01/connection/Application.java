package org.example.section01.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class Application {
    public static void main(String[] args) {

        /*
         * Connection
         * - 자바 어플리케이션과 DB사이에 만들어지는 연결통로
         * - DriverManager를 통해 DB 접속 정보를 전달하면 Connection 객체를 얻을 수 있다
         */

        Connection con = null;

        try {
            // 사용할 JDBC Driver 클래스를 로딩한다
            Class.forName("com.mysql.cj.jdbc.Driver");

            // DriverManager를 이용해 Connection 객체 생성
            con = DriverManager.getConnection(
                    "jdbc:mysql://localhost/menudb",  // 접속 주소/DB명
                    "ohgiraffers",                          // 계정
                    "ohgiraffers"                           // 비밀번호 (네 설정에 맞게 수정)
            );

            System.out.println("con = " + con);

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 사용한 Connection 닫기
            try {
                if (con != null && !con.isClosed()) {
                    con.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}