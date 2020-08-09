import { request } from "../../request/index.js"

// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOk:true,
    a:[]
  },
  jsonsz: {
    a: [{id:5,name:'kij'},{id:9,name:'hdbjb'}]
  },
  onShow(){
    
  },
  send(){
    let b={a:"j",b:"d"};
    let {a}=this.data;
    a.push(b);
    console.log(a);
    let c={a:"j",b:"d"};
    a.push(c);
    console.log(a);
  },
})
