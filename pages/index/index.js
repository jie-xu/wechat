//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    avaAmt:0,
    point:0,
    role:"",
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  onLoad: function () {
      const T = this;

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

      app.getUserId().then(userId => {
        return  app.getUser(userId)
      })

      .then(function (res) {
        console.log("userInfores", res);
          wx.request({
              url: 'http://10.141.20.175:8080/xghweb/member/getUserInfo',
              method:"POST",
            data: { "userId": res.userId, "nickName":res.userInfo.nickName},
              header: {
                  'content-type': 'application/json'
              },
              success:function(res){
                  var rep = res.data;
                  if(rep.status == "1"){
                      T.setData({
                          avaAmt: rep.data.avaAmt,
                          role: rep.data.role,
                          point:rep.data.point
                      })
                      return;
                  }else{
                      //获取userId失败
                      wx.showToast({
                          title: rep.msg,
                          icon: 'info',
                          duration: 2000
                      })
                  }

              }})
      });
  },

    // onReady: function() {
    //     var userId = app.globalData.userId;
    //     var userInfo = app.globalData.userInfo;
    //     console.log(userInfo,'========>userId：',userId);
    //     const T = this;
    //     wx.request({
    //         url: 'http://10.141.20.175:8080/xghweb/member/getUserInfo',
    //             method:"POST",
    //             data:{"userId": userId,"nickName":userInfo.nickName},
    //             header: {
    //                 'content-type': 'application/json'
    //         },
    //         success:function(res){
    //             var rep = res.data;
    //             if(rep.status == "1"){
    //                 T.setData({
    //                     avaAmt: rep.avaAmt,
    //                     role: rep.role
    //                 })
    //                 return;
    //             }else{
    //                 //获取userId失败
    //                 wx.showToast({
    //                     title: rep.msg,
    //                     icon: 'info',
    //                     duration: 2000
    //                 })
    //             }
    //
    //         }})
    //
    // },

  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  //点击充值
  bindDeposit:function () {
      wx.navigateTo({
          url: '../deposit/deposit'
      })
  },

  //点击消费
    bindConsume:function(){
        wx.navigateTo({
            url: '../consume/consume'
        })
    },

    //跳到扣款页
    bindDeductPage: function () {
        wx.navigateTo({
            url: '../deduct/deduct'
        })
    }
})
