const app = getApp()
var flag = 0;
var typeArray = [];
Page({
    data:{
        amtTypes:[]
    },


    onReady: function() {
        const T = this;
        wx.request({
            url: 'http://10.141.20.175:8080/xghweb/wallet/listAmountTypes',
            success:function(res){
                var rep = res.data;
                if(rep.status == "1"){
                    console.log('-------获取充值额度类型，'+rep);
                    T.setData({
                        amtTypes: rep.data
                    })
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

    //获取选中的值
    checkboxChange:function (e) {
        console.log('checkbox发生change事件，携带value值为：', e);
        var  amtTypeParam = e.detail.value;
        console.log("==========>amtTypeParam:",amtTypeParam);
        var inx = e.target.dataset.index;
        console.log("========>index:",inx);
        if(amtTypeParam.length == 0){
            if(flag > 0){
                --flag;
                typeArray.sort();
                if(typeArray.length == 1){
                    inx = 0;
                }
                typeArray.splice(inx,1);
            }
        }else{
            typeArray.push(amtTypeParam);
            typeArray.sort();
            ++flag;
        }
        console.log("=====flag",flag)
    },

    bindDeposit:function () {
        console.log('checkbox 携带value值为：',typeArray.toString());

        if(flag != 1){
            wx.showToast({
                title: "请选择一项充值的额度！",
                icon: 'info',
                duration: 2000
            })
            return;
        }
        var userId = app.globalData.userId;
        const T = this;
        wx.request({
            url: 'http://10.141.20.175:8080/xghweb/wallet/newdeposit',
            method:"POST",
            data:{"userId": userId,"amtType":typeArray.toString()},
            header: {
                'content-type': 'application/json'
            },
            success:function(res){
                var rep = res.data;
                if(rep.status == "1"){
                    console.log('-------获取充值额度类型，'+rep);
                    wx.showToast({
                        title: rep.msg,
                        icon: 'success',
                        duration: 2000
                    });

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
    }
})