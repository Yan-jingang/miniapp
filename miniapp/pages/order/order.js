import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

// pages/order/order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order:[]
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const order=wx.getStorageSync('order')||[];
    this.setData({
      order
    })
    wx.setStorageSync('order', order);
  },
})