package com.my.service;

import com.my.dao.categoryDao;
import com.my.model.firstcategory;

import java.util.List;

public class classifyService {
    public List<firstcategory> selectAllCategory(){
        categoryDao dao=new categoryDao();
        List<firstcategory> list=dao.selectAll();
        return list;
    }
}
