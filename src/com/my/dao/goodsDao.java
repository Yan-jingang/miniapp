package com.my.dao;

import com.my.model.goods;
import com.my.utils.JDBC;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class goodsDao {
    public List<goods> selectByCondition(String sql,Object o[]){
        Connection conn = JDBC.getConnection();
        //预编译
        PreparedStatement ps=null;
        ResultSet result=null;
        try {
            ps=conn.prepareStatement(sql);
            if(o!=null&&o.length!=0){
                for (int i=0;i<o.length;i++){
                    ps.setObject(i+1,o[i]);
                }
            }
            result=ps.executeQuery();
            List<goods> list =new ArrayList<>();
            while (result.next()){
                int gid=result.getInt("gid");
                String name=result.getString("name");
                String small_img=result.getString("small_img");
                int tid=result.getInt("tid");
                float price=result.getFloat("price");
                int count=result.getInt("count");
                int order_num= Integer.parseInt(result.getString("order_num"));
                goods g=new goods();
                g.setGid(gid);
                g.setName(name);
                g.setSmall_img(small_img);
                g.setPrice(price);
                g.setTid(tid);
                g.setCount(count);
                g.setOrder_num(order_num);
                list.add(g);
            }
            return  list;
        } catch (SQLException e) {
            e.printStackTrace();
        }finally {
            JDBC.close(conn,ps,result);
        }

        return null;
    }
    public List<goods> selectById(int id){
        String sql="select * from goods where tid=?";
        Integer ids[]={id};
        List<goods> list = selectByCondition(sql,ids);
        return list;
    }
    public List<goods> selectDetailById(int id){
        String sql="select * from goods where gid=?";
        Integer ids[]={id};
        List<goods> list = selectByCondition(sql,ids);
        return list;
    }
    public List<goods> selectByname(String name){
        String sql="SELECT * FROM goods WHERE LOWER(goods.name) LIKE ?";
        String names[]={"%"+name+"%"};
        List<goods> list = selectByCondition(sql,names);
        return list;
    }
    public List<goods> searchswiper(){
        String sql = "SELECT * from goods ORDER BY count ASC LIMIT 3";
        String Object[]={};
        List<goods> list = selectByCondition(sql,Object);
        return list;
    }
}
