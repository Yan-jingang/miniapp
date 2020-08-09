package com.my.dao;

import com.my.utils.JDBC;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class updateDao {
    public int update(String sql,Object o[]) throws SQLException {
        Connection conn = JDBC.getConnection();
        //预编译
        PreparedStatement ps=conn.prepareStatement(sql);
        if(o.length>0){
            for(int i=1;i<=o.length;i++){
                //设置占位符
                ps.setObject(i,o[i-1]);
            }
        }
        int line=ps.executeUpdate();
        JDBC.updateclose(conn,ps);
        return line;
    }
    public void updategoods(int gid,int count) {
        String sql = "UPDATE goods SET count = ? WHERE gid = ?";
        Integer cond[]={count,gid};
        int b= 0;
        try {
            b = update(sql,cond);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}
