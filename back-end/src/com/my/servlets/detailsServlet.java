package com.my.servlets;

import com.google.gson.Gson;
import com.my.model.goods;
import com.my.service.detailsService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

@WebServlet("/details")
public class detailsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        resp.setHeader("Acess-Control-Allow-Origin","*");
        resp.setHeader("Acess-Control-Allow-Methods","GET,POST");
        int gid= Integer.parseInt(req.getParameter("gid"));
        detailsService service = new detailsService();
        List<goods> list=service.searchDetailById(gid);
        Gson gson = new Gson();
        String goods=gson.toJson(list);
        Writer out=resp.getWriter();
        out.write(goods);
        out.flush();
    }
}
