package com.my.service;

import com.my.dao.goodsDao;
import com.my.model.goods;

import java.util.List;

public class indexService {
    public List<goods> indexswiper(){
        goodsDao dao =new goodsDao();
        List<goods> list=dao.searchswiper();
        return list;
    }
}
