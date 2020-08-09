package com.my.servlets;

import com.google.gson.Gson;
import com.my.model.firstcategory;
import com.my.service.classifyService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

@WebServlet("/classify")
public class classifyServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        resp.setHeader("Acess-Control-Allow-Origin","*");
        resp.setHeader("Acess-Control-Allow-Methods","GET,POST");
        classifyService service = new classifyService();
        List<firstcategory> list = service.selectAllCategory();
        Gson gson = new Gson();
        String json=gson.toJson(list);
        Writer out=resp.getWriter();
        out.write(json);
        out.flush();
    }
}