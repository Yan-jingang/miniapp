import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({
  data: {
    goodslist:[],
    msgList:[
      {
        title:""
      },]
  },
  returnNum:{
    tid:""
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {msgList}=this.data;
    msgList[0].title=options.tstype;
    this.setData({msgList})
    this.returnNum.tid=options.tid;
    this.getGoodslist();
  },
  async getGoodslist(){
    const res=await request({url:"/goodsList",data:this.returnNum});
    this.setData({
      goodslist:res
    })
    wx-wx.stopPullDownRefresh();
  },
  onPullDownRefresh(){
    this.setData({
      goodslist:[]
    })
    this.getGoodslist();
  },
  onReachBottom(){
    wx.showToast({
      title: "没有更多了，亲",
    })
  }
})