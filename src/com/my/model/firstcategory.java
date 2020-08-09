package com.my.model;

import java.util.List;

public class firstcategory {
    private int fid;
    private String type;
    private List<secondcategory> list;
    private List<thirdcategory> list1;

    public List<thirdcategory> getList1() {
        return list1;
    }

    public void setList1(List<thirdcategory> list1) {
        this.list1 = list1;
    }

    public List<secondcategory> getList() {
        return list;
    }

    public void setList(List<secondcategory> list) {
        this.list = list;
    }

    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }


}
