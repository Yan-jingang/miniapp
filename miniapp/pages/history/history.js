// pages/history/history.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    history:[],
    edit:true,
    Allchecked:false
  },
  onShow(){
    let history=wx.getStorageSync('history')||[];
    this.setData({history});
  },
  dianji(){
    let {edit}=this.data;
    this.setData({
      edit:!edit,
    })
  },
  AllchexkedChange(){
    let {history,Allchecked}=this.data;
    Allchecked=!Allchecked;
    history.forEach(v=>v.checked=Allchecked);
    this.setData({history,Allchecked});
  },
  itemCheckchange(e){
    const gid=e.currentTarget.dataset.gid;
    let {Allchecked,history} = this.data;
    let index=history.findIndex(v=>v.gid===gid);
    history[index].checked=!history[index].checked;
    history.forEach(v=>{
      if(v.checked){
        Allchecked=true;
      }else{
        Allchecked=false;
      }
    });
    this.setData({history,Allchecked});
  },
  delete(){
    let {Allchecked,history}=this.data;
    wx.showModal({
      title:"提示",
      content:"是否删除该商品",
      success :(res) =>{
        if (res.confirm) {
          history=history.filter(v=>!v.checked); 
        } else if (res.cancel) {
          history.forEach(v=>v.checked=false);
          Allchecked=false;
        } 
        wx.setStorageSync('history', history);
        this.setData({Allchecked,history});
      }
    });
  },
})