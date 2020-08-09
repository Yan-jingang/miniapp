
Page({
  data:{
    car:[],
    order:[],
    collected:[],
    addressinfos:[]
  },
  GetUserInfo(e){
    const {userInfo}=e.detail;
    wx.setStorageSync('userinfo', userInfo);
    wx.navigateBack({
      delta:1
    });
    let public_car=wx.getStorageSync('public_car')||[];
    let public_order=wx.getStorageSync('public_order')||[];
    let public_collected=wx.getStorageSync('public_collected')||[];
    let public_address=wx.getStorageSync('public_address')||[];
    let {car,order,collected,addressinfos}=this.data;
    car=public_car.filter(v=>v.nickName===userInfo.nickName);
    order=public_order.filter(v=>v.nickName===userInfo.nickName);
    collected=public_collected.filter(v=>v.nickName===userInfo.nickName);
    addressinfos=public_address.filter(v=>v.nickName===userInfo.nickName);
    wx.setStorageSync('car', car);
    wx.setStorageSync('order', order);
    wx.setStorageSync('collected', collected);
    wx.setStorageSync('addressinfos', addressinfos)
  }
})