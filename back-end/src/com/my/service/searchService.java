package com.my.service;

import com.my.dao.goodsDao;
import com.my.model.goods;

import java.util.List;

public class searchService {
    public List<goods> searchByname(String name){
        goodsDao dao =new goodsDao();
        List<goods> list=dao.selectByname(name);
        return list;
    }
}
