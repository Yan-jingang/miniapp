import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({
  data:{
    addressinfo:{},
    car:[],
    totalPrice:0,
    totalnum:0,
    paycar:[],
    imlen:0,
    adrsindex:-1
  },
  returnValue: {
    payinfo:[]
  },
  onLoad(option){
    if(option.index){
      let adrsindex = option.index;
      this.setData({adrsindex})
    }  
  },
  onShow(){
    let addressinfos = wx.getStorageSync('addressinfos')
    if(addressinfos.length>0){
      this.setAddress();
    }
    let {totalPrice,totalnum,imlen}=this.data;
    let paycar = wx.getStorageSync('paycar')||[];
    let car=wx.getStorageSync('car')||[];
    let Impaycar=wx.getStorageSync('impaycar')||[];
    //选出要支付的商品
    if (Impaycar.length===1) {
      paycar=Impaycar;
      imlen=1;      
    }
    else{
    paycar=car.filter(v=>v.checked);
    }
    paycar.forEach(v=>{
        totalPrice+=v.num*v.price;
        totalnum+=v.num; 
    });
    this.setData({
      paycar,
      totalPrice,
      totalnum,
      imlen
    });
    wx.setStorageSync('paycar', paycar);
    wx.setStorageSync('impaycar', Impaycar);
  },  
  pay(e){
    let addressinfos=wx.getStorageSync('addressinfos')||[];
    if (addressinfos.length===0){
      wx.showToast({
        title: '您还没有添加收货地址',
      });
      return
    } else {
      wx.showModal({
      title:"提示",
      content:"确认支付？",
      success :(res) =>{
        if (res.confirm) {
          wx.showToast({
            title: '支付成功',
          });
          let Impaycar=[];
          wx.setStorageSync('impaycar', Impaycar);
          let {totalnum} =this.data;
          let paycar=wx.getStorageSync('paycar')||[];
          let time=Date(Date.now()*1000).toLocaleString();
          time=time.substring(0,time.length-17); paycar=paycar.map(v=>({...v,time:time}));
          let order=wx.getStorageSync('order')||[];
          order=order.concat(paycar);
          let temporary=paycar;
          temporary.forEach(v=>{
            this.returnValue.payinfo.push(    {gid:v.gid,count:v.count-v.num})
          });
          this.send();
          wx.setStorageSync('order', order);
          totalnum=0;
          paycar=null;
          wx.setStorageSync('paycar', paycar);
          wx.redirectTo({
            url: "/pages/order/order",
          });
          let {imlen}=e.currentTarget.dataset;
          if (imlen===0) {
            let car=wx.getStorageSync('car')||[];
            car=car.filter(v=>!v.checked);
            this.setData({
              paycar,
              totalnum
            })
            wx.setStorageSync('car', car);
          }else{
            imlen=0;
          }
        } else if (res.cancel) { 
        } 
      }
    })
  }
  },
  //将支付信息返回给后端更新数据库
  async send(){
    await request({
      url:'/payinfo',
      data:this.returnValue
    })
  },
  //获取地址
  Addaddress(){
    this.setData({
      totalPrice:0,
      totalnum:0
    });
    wx.redirectTo({
      url: '/pages/address/address?judgeorigin=1',
    })
  },
  //设置地址
  setAddress(){
    let {adrsindex} = this.data;
    let addressinfos=wx.getStorageSync('addressinfos')||[];
    let len = addressinfos.length;
    if(adrsindex==-1){
      this.setData({
      addressinfo:addressinfos[len-1]
      });
    }else{
      this.setData({
        addressinfo:addressinfos[adrsindex],
        index:-1
      })
    }   
  }
})