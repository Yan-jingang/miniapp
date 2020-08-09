import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:{},
    img:[],
    iscollected:false,
    Impaycar:[],
    Model:true,
    judge:"",
    color:[{
      id:0,
      colorItem:"紫色",
      isActive:true
    },{
      id:1,
      colorItem:"红色",
      isActive:false
    },{
      id:2,
      colorItem:"蓝色",
      isActive:false
    }]
  },
  returnNum:{
    gid:""
  },
  GoodsInfo:{},
  Img:[],
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages=getCurrentPages();
    let currentpage=pages[pages.length-1];
    let options=currentpage.options;
    this.returnNum.gid = options.gid;
    this.getSwiper();
    this.getDetail();
  },
  //请求商品详情的轮播图数据
  async getSwiper(){
    const res = await request({url:"/swiper",data:this.returnNum});
    this.Img=res;
    this.setData({
      img:res
    })
  },
  //获取商品详情
  async getDetail(){
    const userinfo=wx.getStorageSync('userinfo');
    const res = await request({url:"/details",data:this.returnNum});
    let {goods}=this.data;
    this.GoodsInfo=res[0];
    goods=res[0];
    goods.num=1;
    if(userinfo){
    this.GoodsInfo.nickName=userinfo.nickName;}
    //判断是否被收藏
    let collected=wx.getStorageSync('collected')||[];
    let iscollected=collected.some(v=>v.gid===this.GoodsInfo.gid);
    this.setData({
      goods,
      iscollected
    });
    //添加到历史纪录
    let history = wx.getStorageSync("history")||[];
    let index = history.findIndex(v=>v.gid===this.GoodsInfo.gid);
    if(index===-1){
      this.GoodsInfo.checked=false;
      history.push(this.GoodsInfo);
    };
    wx.setStorageSync('history', history);
  },
  //预览图片
  prevewImg(e){
    const urls = this.Img.map(v => v.path);
    const current=e.currentTarget.dataset.url;
    wx-wx.previewImage({
      current,
      urls
    })
  },
  //底部弹出框
  model(e){
    var animation=wx.createAnimation({
      duration:200,
      timingFunction:"linear",
      delay: 0,
    });
    this.animation=animation;
    animation.translateY(300).step;
    this.setData({
      animationData:animation.export(),
      Model:false
    });
    setTimeout(() =>{
      animation.translateY(0).step;
      this.setData({
        animationData:animation.export()
      })
    },200);
    let {goods}=this.data;
    goods.num=1;
    let {judge}=e.currentTarget.dataset;
    this.setData({goods,judge}); 
  },
  hindModel(){
    var animation=wx.createAnimation({
      duration:200,
      timingFunction:"linear",
      delay: 0,
    });
    this.animation=animation;
    animation.translateY(300).step;
    this.setData({
      animationData:animation.export(),   
    });
    setTimeout(function () {
      animation.translateY(0).step;
      this.setData({
        animationData:animation.export(),
        Model:true
      })
    }.bind(this),200)
  },
  //在弹出框选择数量和颜色
  editNum(e){
    const {operation}=e.currentTarget.dataset;
    let {goods}=this.data;
    if (goods.num===1&&operation===-1) {
      wx.showModal({
        title:"提示",
        content:"商品数量不能为0", 
      });
    }else{
      goods.num=goods.num+operation;
    }
    this.setData({goods});
    this.GoodsInfo.num=goods.num;
  },
  checkColor(e){
    let colorId=e.currentTarget.dataset.colorid;
    let {color}=this.data;
    color.forEach(v=>v.id===colorId?v.isActive=true:v.isActive=false);
    this.GoodsInfo.color=color[colorId].colorItem;
    this.setData({color});   
  },
  //加入购物车
  AddCar(){
    this.hindModel();
    const userinfo=wx.getStorageSync('userinfo');
    if(!userinfo){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
    let car = wx.getStorageSync("car")||[];
    let index = car.findIndex(v=>v.gid===this.GoodsInfo.gid);
    if(index===-1){
      this.GoodsInfo.checked=true;
      car.push(this.GoodsInfo);
    }else{
      car[index].num+=this.GoodsInfo.num;
    }
    wx.setStorageSync('car', car);
    wx.showToast({
      title: '加入成功',
      icon:"success",
      mask:true
    })
    }
  },
  //收藏
  collect(){
    const userinfo=wx.getStorageSync('userinfo');
    if(!userinfo){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
    let iscollected=false;
    let collected=wx.getStorageSync("collected")||[];
    let index=collected.findIndex(v=>v.gid===this.GoodsInfo.gid);
    if (index!==-1) {
      collected.splice(index,1);
      iscollected=false;
      wx.showToast({
        title: "已取消收藏",
        icon:"success",
        mask:"true"
      })
    } else {
      collected.push(this.GoodsInfo);
      iscollected=true;
      wx.showToast({
        title: "已收藏",
        icon:"success",
        mask:"true"
      })
    }
    wx.setStorageSync("collected", collected);
    this.setData({iscollected})
    }
  },
  Impay(){
    this.hindModel();
    const userinfo=wx.getStorageSync('userinfo');
    if(!userinfo){
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }else{
    let Impaycar=null||[];
    Impaycar.push(this.GoodsInfo);
    wx.setStorageSync('impaycar', Impaycar);
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  }
  },
})