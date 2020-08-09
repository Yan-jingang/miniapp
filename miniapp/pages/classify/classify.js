import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({
  data: {
    //左侧导航数据
    leftMenuList:[],
    //右侧分类
    rightContent:[],
    //被选中的左侧导航
    leftMenuIndex:0,
    scrolltop:0,
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
      },]
  },
  Cates:[],
  Msgs:[],
  onLoad: function (options) {
    //处理缓存信息
    const Msgs=wx.getStorageSync('msgs');
    if(!Msgs){
      this.getClassify();
    }else{
      if(Date.now()-Msgs.time>1000*10000){
        this.getClassify();
      }else{
        this.Cates=Msgs.data;
        let leftMenuList=this.Cates.map(v=>v.type);
        let rightContent=this.Cates[0].list;
        this.setData({
        leftMenuList,
        rightContent
        })
      }
    }
    
  },
  async getClassify(){
      const res = await request({url:"/classify"});
      this.Cates = res;
      this.Msgs=res;
      wx.setStorageSync('msg', {time:Date.now(),data:this.Msgs});
      let leftMenuList = this.Cates.map(v=>v.type);
      let rightContent = this.Cates[0].list;
      this.setData({
        leftMenuList,
        rightContent
      })
  },
  //左侧导航点击事件
  changeMenu(e){
    const {index}=e.currentTarget.dataset;
    let rightContent=this.Cates[index].list;this.setData({
      leftMenuIndex:index,
      rightContent,
      scrolltop:0
    })   
  }
})