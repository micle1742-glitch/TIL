package org.example.section02.templete;

import java.sql.Connection;

import static org.example.section02.templete.JDBCTemplate.close;
import static org.example.section02.templete.JDBCTemplate.getConnection;

public class Application {
    public static void main(String[] args) {

        Connection con = getConnection();
        System.out.println("con = " + con);
        close(con);
    }
}
