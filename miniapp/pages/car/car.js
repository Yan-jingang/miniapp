Page({
  data:{
    car:[],
    Allchecked:true,
    totalPrice:0,
    totalnum:0
  },
  onShow(){
    let Impaycar = [];
    wx.setStorageSync('impaycar', Impaycar)
    const car=wx.getStorageSync('car')||[];
    this.carState(car);
  },
  
  //商品是否选中
  itemCheckchange(e){
    const gid=e.currentTarget.dataset.gid;
    let {car} = this.data;
    let index=car.findIndex(v=>v.gid===gid);
    car[index].checked=!car[index].checked;
    this.carState(car);
  },
  //改变购物车状态并计算价格
  carState(car){
    let Allchecked=true;
    let totalPrice=0;
    let totalnum=0;
    car.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.price;
        totalnum+=v.num;
      }else{
        Allchecked=false;
      }
    });
    Allchecked=car.length!=0?Allchecked:false;
     
    this.setData({
      car,
      Allchecked,
      totalPrice,
      totalnum
    });
    wx.setStorageSync('car', car);
  },
  //全选与反选
  AllchexkedChange(){
    let {car,Allchecked}=this.data;
    Allchecked=!Allchecked;
    car.forEach(v=>v.checked=Allchecked);
    this.carState(car);
  },
  //设置数量
  editNum(e){
    const {gid,operation}=e.currentTarget.dataset;
    let {car}=this.data;
    const index=car.findIndex(v=>v.gid===gid);
    if (car[index].num===1&&operation===-1) {
      wx.showModal({
        title:"提示",
        content:"是否删除该商品",
        success :(res) =>{
          if (res.confirm) {
            car.splice(index,1);
            this.carState(car);
          } else if (res.cancel) { 
          } 
        }
      }) 
    } else {
      car[index].num=car[index].num+operation;
      this.carState(car);
    }
  },
  //支付
  pay(){
    const {totalnum} =this.data;
    const car =wx.getStorageSync('car');
    if (totalnum===0&&car.length===0) {
      wx.showToast({
        title: '购物车空空如也呢',
      });
      return;
    }else if (totalnum===0&&car.length!==0) {
      wx.showToast({
        title: '请选择要支付的商品',
      });
      return;
    };
    wx.navigateTo({
      url: '/pages/pay/pay',
    })
  },
  //删除商品
  delete(e){
    const {delete_gid}=e.currentTarget.dataset
    let {car}=this.data;
    const index=car.findIndex(v=>v.gid===delete_gid);
    wx.showModal({
      title:"提示",
      content:"是否删除该商品",
      success :(res) =>{
        if (res.confirm) {
          car.splice(index,1);
          this.carState(car);
        } else if (res.cancel) { 
        } 
      }
    }) 
  },
  
})