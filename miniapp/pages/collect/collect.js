
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collected:[]
  },
  onShow(){
    const collected=wx.getStorageSync('collected')||[];
    this.setData({
      collected
    })
  }
})