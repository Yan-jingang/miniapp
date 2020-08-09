import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

wx-Page({
  /**
   * 页面的初始数据
   */
  data: {
    msgList:[
      {
        title:"手机支架"
      },
      {
        title:"笔记本"
      },
      {
        title:"连衣裙"
      },
      {
        title:"华为"
      },],
    swiperList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow() {
    this.getSwiper(); 
  },
  async getSwiper(){
    const res = await request({
      url:'/index'
    })
    this.setData({
      swiperList:res
    })
  }
})