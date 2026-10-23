package com.ohgiraffers.section01.statement;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import static com.ohgiraffers.common.JDBCTemplate.close;
import static com.ohgiraffers.common.JDBCTemplate.getConnection;

public class Application {
    public static void main(String[] args) {

        //트랜잭션 처리를 위한 DBMS 연동용 커넥션 객체 생성
        Connection con = getConnection();

        //쿼리를 운반하고 결과를 반환하는 객체
        Statement stmt = null;

        //SELECT 결과집합을 받아올 용도의 인터페이스
        ResultSet rset = null;


        try {
            stmt = con.createStatement();
            rset = stmt.executeQuery("SELECT MENU_NAME, MENU_PRICE FROM TBL_MENU");

            while (rset.next()) {
                System.out.println(rset.getString("MENU_NAME") + "." +
                rset.getInt("MENU_PRICE"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            close(reset);
            close(stmt);
            close(con);

        }
    }
}
