// pages/address/address.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addressinfos:[],
    judgeorigin:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let judgeorigin = options.judgeorigin;
    this.setData({
      judgeorigin
    })
  },

  onShow(){
    let addressinfos =
    wx.getStorageSync('addressinfos')||[];
    this.setData({
      addressinfos,
    })
  },

  Addaddress(){
    wx.navigateTo({
      url: '/pages/editaddress/editaddress',
    })
  },

  chooseIndex(e){
    let index = e.currentTarget.dataset.index;
    console.log(index)
    wx.redirectTo({
      url: '/pages/pay/pay?index='+index,
    })
  }
})