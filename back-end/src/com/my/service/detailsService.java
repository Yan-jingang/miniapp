package com.my.service;

import com.my.dao.goodsDao;
import com.my.dao.swiperDao;
import com.my.model.Img;
import com.my.model.goods;

import java.util.List;

public class detailsService {
    public List<goods> searchById(int tid){
        goodsDao dao =new goodsDao();
        List<goods> list=dao.selectById(tid);
        return list;
    }
    public List<goods> searchDetailById(int gid){
        goodsDao dao =new goodsDao();
        List<goods> list=dao.selectDetailById(gid);
        return list;
    }
    public List<Img> searchSwiper(int gid){
        swiperDao dao=new swiperDao();
        List<Img> list=dao.selectSwiper(gid);
        return list;
    }
}