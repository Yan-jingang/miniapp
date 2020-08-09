
// let ajaxtimes=0;
export const request=(params)=>{
  // ajaxtimes++;
  wx.showLoading({
    title: '正在加载，请稍等',
    mask:true
  });
  const publicUrl="http://10.28.66.25:8080/hpustore_war_exploded";
  return new Promise((resolve,reject)=>{
    wx-wx.request({
      ...params,
      url:publicUrl+params.url,
      success:(result)=>{
        resolve(result.data);
      },
      fail:(err)=>{
        reject(err);
      },
      complete:()=>{
        // ajaxtimes--;
        // if(ajaxtimes===0){}
          wx.hideLoading() 
        
      }
    });
  })
}
