package com.my.dao;

import com.my.model.firstcategory;
import com.my.model.secondcategory;
import com.my.model.thirdcategory;
import com.my.utils.JDBC;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class categoryDao {
    public List<firstcategory> selectAll() {
        Connection conn = JDBC.getConnection();
        String sql = "select * from firstcategory,secondcategory,thirdcategory where firstcategory.fid=secondcategory.fid and secondcategory.sid=thirdcategory.sid";
        PreparedStatement ps=null;
        ResultSet result=null;
        try {
            ps=conn.prepareStatement(sql);
            result=ps.executeQuery();
            List<firstcategory> list=new ArrayList<>();
            List<secondcategory> lists=new ArrayList<>();
            List<thirdcategory> listes=new ArrayList<>();
            while (result.next()){
                int fid=result.getInt("fid");
                int sid=result.getInt("sid");
                int tid=result.getInt("tid");
                String type=result.getString("type");
                String stype=result.getString("stype");
                String tstype=result.getString("tstype");
                String icon=result.getString("icon");
                firstcategory frist=new firstcategory();
                frist.setFid(fid);
                frist.setType(type);
                secondcategory second =new secondcategory();
                second.setSid(sid);
                second.setFid(fid);
                second.setStype(stype);
                thirdcategory third=new thirdcategory();
                third.setTid(tid);
                third.setSid(sid);
                third.setFid(fid);
                third.setIcon(icon);
                third.setTstype(tstype);
                list.add(frist);
                lists.add(second);
                listes.add(third);
            }
            List<firstcategory> resultList=new ArrayList<>();
            for (int i=0;i<list.size();i++){
                if (i==0||list.get(i).getFid()!=list.get(i-1).getFid()){
                    resultList.add(list.get(i));
                    List<secondcategory> ls=new ArrayList<>();
                }
            }
            for (int i = 0; i<resultList.size(); i++){
                List<secondcategory> l2=new ArrayList<>();
                for(int j=0;j<lists.size();j++) {
                    if (j==0&&lists.get(j).getFid() == resultList.get(i).getFid()){
                        l2.add(lists.get(0));
                        List<thirdcategory> ls1=new ArrayList<>();
                    }else if (lists.get(j).getFid() == resultList.get(i).getFid()&&lists.get(j).getSid()!=lists.get(j-1).getSid()){
                        l2.add(lists.get(j));
                        List<thirdcategory> ls1=new ArrayList<>();
                    }
                }
                for(int j=0;j<l2.size();j++){
                    List<thirdcategory> l3=new ArrayList<>();
                    for(int k=0;k<listes.size();k++) {
                        if (listes.get(k).getSid() == l2.get(j).getSid()){
                            l3.add(listes.get(k));
                        }
                    }
                    l2.get(j).setList(l3);
                }
                resultList.get(i).setList(l2);
            }
            list=null;
            lists=null;
            listes=null;
            return resultList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }finally {
            JDBC.close(conn,ps,result);
        }
    }
}
