package com.my.model;

import java.util.List;

public class secondcategory {
    private int sid;
    private String stype;
    private int fid;
    private List<thirdcategory> list;

    public int getSid() {
        return sid;
    }

    public void setSid(int sid) {
        this.sid = sid;
    }

    public String getStype() {
        return stype;
    }

    public void setStype(String stype) {
        this.stype = stype;
    }

    public int getFid() {
        return fid;
    }

    public void setFid(int fid) {
        this.fid = fid;
    }

    public List<thirdcategory> getList() {
        return list;
    }

    public void setList(List<thirdcategory> list) {
        this.list = list;
    }
}
