//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    const T = this;
    // 登录
    // wx.login({
    //   success: res => {
    //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
    //   console.log(res);
    //     var code = res.code;
    //     wx.request({
    //       url: 'http://localhost:8080/xghweb/member/getOpenId?code=' + code,
    //         success:function(res){
    //             var rep = res.data;
    //             if(rep.status == "1"){
    //               var userId = rep.data;
    //                 T.globalData.userId = userId;
    //               console.log('----用户id： '+ userId);
    //
    //               //==================
    //
    //             //=============
    //
    //             }else{
    //               //获取userId失败
    //                 wx.showToast({
    //                     title: rep.msg,
    //                     icon: 'info',
    //                     duration: 2000
    //                 })
    //             }
    //
    //         },
    //         fail:function(e){
    //             console.log('================>',e)
    //         }
    //     })
    //   }
    // })


      // 获取用户信息
      wx.getSetting({
              success: res => {
              if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
                  success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  console.log("obationSetting",res);
          T.globalData.userInfo = res.userInfo;

          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
          }
      }
      })
      }
  }
  })

  },


    //采用Promise
    getUserId:function(){
        const T = this;
        //登入
      return new Promise(function(resolve,reject){
          wx.login({
                  success: res => {
                  // 发送 res.code 到后台换取 openId, sessionKey, unionId
                  console.log("76876==>",res);
          var code = res.code;
          wx.request({
              url: 'http://10.141.20.175:8080/xghweb/member/getOpenId?code=' + code,
              success:function(res){
                  var rep = res.data;
                  if(rep.status == "1"){
                      var userId = rep.data;
                      T.globalData.userId = userId;
                        resolve(userId);

                  }else{
                      //获取userId失败
                      wx.showToast({
                          title: rep.msg,
                          icon: 'info',
                          duration: 2000
                      })
                  }
              },
              fail:function(e){
                  console.log('++++++++++====>',e)
              }
          })
      }
      })
      })
    },

    getUser:function(userId){
        const T = this;
        return new Promise(function(resolve,reject) {
                // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                wx.getUserInfo({
                        success: res => {
                        // 可以将 res 发送给后台解码出 unionId
                        console.log("obationSetting", res);
                T.globalData.userInfo = res.userInfo;

                resolve({"userInfo":res.userInfo,"userId":userId});
            }
            })
        })
    },


  onError:function (msg) {
      console.log(JSON.stringify(msg));
      wx.showToast({
          title: msg,
          icon: 'info',
          duration: 2000
      })
  },

  globalData: {
    userInfo: null,
    userId:null
  }
})