package com.my.servlets;

import com.google.gson.Gson;
import com.my.model.Img;
import com.my.service.detailsService;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Writer;
import java.util.List;

@WebServlet("/swiper")
public class detailswiperServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("utf-8");
        resp.setCharacterEncoding("utf-8");
        resp.setContentType("text/html;charset=utf-8");
        resp.setHeader("Acess-Control-Allow-Origin","*");
        resp.setHeader("Acess-Control-Allow-Methods","GET,POST");
        int gid= Integer.parseInt(req.getParameter("gid"));
        detailsService service = new detailsService();
        List<Img> ImgList=service.searchSwiper(gid);
        Gson gson = new Gson();
        String ImgJson=gson.toJson(ImgList);
        Writer out=resp.getWriter();
        out.write(ImgJson);
        out.flush();
    }
}
