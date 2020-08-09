package com.my.utils;

import java.io.InputStream;
import java.sql.*;
import java.util.Properties;

public class JDBC {
    private static String driver;
    private static String url;
    private static String username;
    private static String password;
    //静态语句块
    static {
            InputStream is=JDBC.class.getClassLoader().getResourceAsStream("db.properties");
            Properties p=new Properties();
        try {
            p.load(is);
            driver = p.getProperty("driver");
            url=p.getProperty("url");
            username=p.getProperty("username");
            password=p.getProperty("password");
            //加载驱动
            Class.forName(driver);
            System.out.println("驱动加载成功");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    //获得连接对象
    public static Connection getConnection(){
        try {
            return DriverManager.getConnection(url,username,password);
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("数据库加载失败");
        }
        return null;
    }
    public static void close(Connection conn,PreparedStatement ps,ResultSet result){
        try {
            if(result!=null){
                    result.close();
                    result=null;
                }
            if(ps!=null){
                ps.close();
                ps=null;
            }
            if(conn!=null){
                conn.close();
                conn=null;
            }
            } catch (SQLException e) {
                e.printStackTrace();
        }
     }

    public static void updateclose(Connection conn,PreparedStatement ps){
        try {
            if(ps!=null){
                ps.close();
                ps=null;
            }
            if(conn!=null){
                conn.close();
                conn=null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}

