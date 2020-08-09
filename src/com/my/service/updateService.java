package com.my.service;

import com.my.dao.updateDao;

public class updateService {
    public void updateservice(int gid,int count){
        updateDao dao =new updateDao();
        dao.updategoods(gid,count);
    }
}
