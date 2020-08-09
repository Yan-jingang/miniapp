
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    collectedNum:0,
    historyNum:0,
    public_car:[],
    public_order:[],
    public_collected:[],
    public_address:[]
  },
  onShow(){
    const userinfo=wx.getStorageSync('userinfo');
    const collected=wx.getStorageSync('collected')||[];
    const history=wx.getStorageSync('history')||[];
    this.setData({
      userinfo,
      collectedNum:collected.length,
      historyNum:history.length
    })
  },                                 
  
  
  set(){
    wx.navigateTo({
      url: '/pages/set/set',
    })
  }
})