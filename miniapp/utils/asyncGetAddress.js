export const getSetting=()=>{
  return new Promise((success,fail)=>{
    wx.getSetting({
      success: (res) => {
        success(res);
      },
      fail: (err) => {
        fail(err)
      },
    })
  }
)}

export const chooseAddress=()=>{
  return new Promise((success,fail)=>{
    wx.chooseAddress({
      success: (res) => {
        success(res);
      },
      fail: (err) => {
        fail(err)
      },
    })
  }
)}

export const openSetting=()=>{
  return new Promise((success,fail)=>{
    wx.openSetting({
      success: (res) => {
        success(res);
      },
      fail: (err) => {
        fail(err)
      },
    })
  }
)}