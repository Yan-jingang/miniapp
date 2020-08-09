import { request } from "../../request/index.js"
import regeneratorRuntime from "../../lib/runtime/runtime.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    //按钮状态
    isFocus:true, 
    placeholder:"",
    //输入框状态
    confirmContent:""
  },
  returnV:{
      value:""
    },
  Timer:1,
  onLoad(options){
    this.setData({placeholder:options.title})
  },
  
  confirm(e){
    var confirmContent='';
    if (e.detail.value==="") {        
      confirmContent=this.data.placeholder;
    }else{
      confirmContent=e.detail.value;
    }
    this.returnV.value=confirmContent;
    this.setData({confirmContent});
    this.Avoid(confirmContent);
  },

  Input(e){
    const {value} =e.detail;
    this.returnV.value=e.detail.value;
    this.setData({value})
    this.Avoid(value);
  },
  //防抖
  Avoid(str){
    if (!str.trim()) {
      this.setData({
        goods:[],
        isFocus:true,
      })
      return;
    }
    //防抖
    this.setData({
      isFocus:false,
    })
    clearTimeout(this.Timer);
    this.Timer=setTimeout(()=>{
      if (this.returnV.value!==null) {
        this.inputSearch(); 
      }  
    },2000)
  },

  async inputSearch(){
    console.log("0")
    console.log(this.returnV)
    const res=await request({
      url:"/search",
      data:this.returnV
      }) 
    this.setData({
      goods:res
    })
  },

  cancel(){
    this.setData({
      confirmContent:"",
      goods:[],
      isFocus:true
    })
  }
})