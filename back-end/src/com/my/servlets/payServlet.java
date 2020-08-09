package com.my.servlets;

import com.google.gson.*;
import com.my.model.payinfo;
import com.my.service.updateService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;

@WebServlet("/payinfo")
public class payServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        resp.setHeader("Acess-Control-Allow-Origin","*");
        resp.setHeader("Acess-Control-Allow-Methods","GET,POST");
        String payinfo=req.getParameter("payinfo");
        Gson gson = new Gson();
        JsonParser parser = new JsonParser();
        JsonArray json = parser.parse(payinfo).getAsJsonArray();
        ArrayList<payinfo> paylist = new ArrayList<>();
        for (JsonElement jsonElement : json){
            paylist.add(gson.fromJson(jsonElement, payinfo.class));
        }

        updateService service = new updateService();
        for (int i=0;i<=paylist.size()-1;i++){
            int gid = paylist.get(i).getGid();
            int count = paylist.get(i).getCount();
            service.updateservice(gid,count);
        }
    }
}
