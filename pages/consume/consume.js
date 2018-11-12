const app = getApp()

Page({
    data:{
        qrcodeImage:"",
        point:0,
        avaAmt:0
    },

    onReady: function() {
        const T = this;
        var userId = app.globalData.userId;
        wx.request({
            url: 'http://10.141.20.175:8080/xghweb/wallet/getQRCodeImage',
            method:"POST",
            data:{"userId": userId},
            header: {
                'content-type': 'application/json'
            },
            success:function(res){
                var rep = res.data;
                var result = rep.data;
                console.log('=======>' + JSON.stringify(result));
                if(rep.status == "1"){
                    T.setData({
                        qrcodeImage: result.qrcodeImage,
                        point:result.point,
                        avaAmt:result.avaAmt
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
    },
})