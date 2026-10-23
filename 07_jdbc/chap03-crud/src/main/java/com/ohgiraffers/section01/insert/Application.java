package com.ohgiraffers.section01.insert;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.InvalidPropertiesFormatException;
import java.util.Properties;

import static com.ohgiraffers.common.JDBCTemplate.close;
import static com.ohgiraffers.common.JDBCTemplate.getConnection;

public class Application {
    public static void main(String[] args) {

        Connection con = getConnection();
        PreparedStatement pstmt = null;
        int result = 0;

        Properties prop = new Properties();

        try {
            FileInputStream queryStream = new FileInputStream("src/main/java/com/ohgiraffers/mapper/menu-query.xml");
            prop.loadFromXML(queryStream);
            String query = prop.getProperty("insertMenu");
            pstmt = con.prepareStatement(query);

            pstmt.setString(1,"봉골레파스타");
            pstmt.setInt(2,14000);
            pstmt.setInt(3,6);
            pstmt.setString(4,"y");

            result = pstmt.executeUpdate(); //DML 작업을 하면 DML 작업이 일어난 행 (row)의 갯수를 반환(int)

            pstmt = con.prepareStatement(query);
        }
        catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (InvalidPropertiesFormatException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        } finally {
            close(pstmt);
            close(con);
        }

    }
}
