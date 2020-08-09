package com.my.dao;

import com.my.model.Img;
import com.my.utils.JDBC;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class swiperDao {
    public List<Img> selectSwiper(int gid) {
        Connection conn = JDBC.getConnection();
        String sql = "select * from img where gid=?";
        PreparedStatement ps=null;
        ResultSet result=null;
        try{
            ps=conn.prepareStatement(sql);
            ps.setObject(1,gid);
            result=ps.executeQuery();
            List<Img> list=new ArrayList<>();
            while (result.next()){
                int img_id=result.getInt("img_id");
                String path=result.getString("path");
                Img img=new Img();
                img.setImg_id(img_id);
                img.setPath(path);
                list.add(img);
            }
            return list;
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            JDBC.close(conn,ps,result);
        }
        return null;
    }
}
