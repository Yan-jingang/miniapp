// pages/editaddress/editaddress.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    len:-1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let {address} =this.data;
    let len = Object.keys(address).length;
    this.setData({len});
    
  },
  //获取地址
  Addaddress(){
    wx.getSetting({
      success: (res) => {
        const scopeAddress =res.authSetting["scope.Address"];
        if (scopeAddress===true||scopeAddress===undefined) {
          wx.chooseLocation({
            success: (res1) => {
              this.setData({
                address:res1,
                len:1
              })
            },
          })
        }else{
          wx.openSetting({
            success: (res2) => {
              wx.chooseLocation({
                success: (res3) => {
                  this.setData({
                    address:res3,
                    len:1
                  })
                },
              })
            },
          })
        }
      },
    })
  },
  getinfo(e){
    let addressinfo = e.detail.value;
    let userinfo = wx.getStorageSync('userinfo');
    addressinfo.nickName = userinfo.nickName;
    let addressinfos=wx.getStorageSync('addressinfos')||[];
    if(addressinfo.name!=''){
      addressinfos.push(addressinfo);
      wx.setStorageSync('addressinfos', addressinfos);
    }
  },
  returnpage(){
    wx.navigateBack({
      url: '/pages/address/address',
    })
  }
})