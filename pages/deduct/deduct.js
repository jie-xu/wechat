const app = getApp()
var consumeAmtParam = ""
var consumePointParam = 0

Page({
    data:{
        consumeAmt:"",
        consumePoint:""
    },

    bindKeyInput:function(e){
        console.log("========> " + e.detail.value);
        this.setData({
            consumeAmt:e.detail.value
        });
        consumeAmtParam = e.detail.value;
    },

    //输入积分
    bindKeyInputPoint:function(e){
        console.log("========> " + e.detail.value);
        this.setData({
            consumePoint:e.detail.value
        });
        consumePointParam = e.detail.value;
    },

    //调用微信扫码接口
    bindDeduct:function () {
        if(consumeAmtParam == '' || consumeAmtParam == null){
            wx.showToast({
                title: "请输入消费金额",
                icon: 'info',
                duration: 2000
            })
            return;
        }
        //最少10个积分才能使用
        if(consumePointParam >0 && consumePointParam < 10){
            wx.showToast({
                title: "至少10个积分才能抵扣",
                icon: 'info',
                duration: 2000
            })
            return;
        }

        wx.scanCode({
            onlyFromCamera:true,

            success:function (res) {
                console.log(res);
                var url = res.result;
                url = url + "&amt=" + consumeAmtParam + "&consumePoint=" + consumePointParam;
                //请求扣款操作
                wx.request({
                    url: url,
                    success:function(res){
                        var rep = res.data;
                        if(rep.status == "1"){
                            console.log('=========》扣款成功');
                            wx.showToast({
                                title: rep.msg,
                                icon: 'success',
                                duration: 2000
                            });
                            return;
                        }else{
                            wx.showToast({
                                title: rep.msg,
                                icon: 'info',
                                duration: 2000
                            })
                        }
                    }})
            }
        });
    }
})