// pages/set/set.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{},
    public_car:[],
    public_order:[],
    public_collected:[],
    public_address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  Addaddress(){
    wx.navigateTo({
      url: '/pages/address/address?judgeorigin=-1',
    })
  },
  exit(){
    wx.showModal({
      title:"提示",
      content:"确定退出登录吗？",
      success :(res)=>{
        if (res.confirm) {
          let userinfo=wx.getStorageSync('userinfo');
          let addressinfos=wx.getStorageSync('addressinfos');
          let car=wx.getStorageSync('car');
          let order=wx.getStorageSync('order');
          let collected=wx.getStorageSync('collected')
          let {public_car,public_order,public_collected,public_address}=this.data;
          public_car=public_car.concat(car);
          public_order=public_order.concat(order);
          public_collected=public_collected.concat(collected);
          public_address=public_address.concat(addressinfos);
          userinfo=null;
          addressinfos=null;
          car=null;
          order=null;
          collected=null;
          wx.setStorageSync('userinfo', userinfo);
          wx.setStorageSync('addressinfos', addressinfos);
          wx.setStorageSync('car', car);
          wx.setStorageSync('order', order);
          wx.setStorageSync('public_car', public_car);
          wx.setStorageSync('public_order', public_order);
          wx.setStorageSync('public_collected', public_collected);
          wx.setStorageSync('public_address', public_address);
          wx.switchTab({
            url: '/pages/mine/mine',
          })
        }else if (res.cancel) {  
        }
      }
    })
  },
})