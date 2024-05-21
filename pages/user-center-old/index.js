var e = getApp();
Page({
  data: { openId: "", userInfo: null, showUploadTip: !1, welcomeMessage: "" },
  getOpenId: function () {
    var e = this;
    wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          data: { type: "getOpenId" },
        })
        .then(function (o) {
          console.log(o),
            e.setData({ haveGetOpenId: !0, openId: o.result.openid }),
            wx.hideLoading();
        })
        .catch(function (o) {
          e.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  login: function () {
    var o = this;
    wx.getUserProfile({
      desc: "获取用户信息",
      success: function (a) {
        var t = a.userInfo;
        (e.globalData.userInfo = t),
          o.setData({ userInfo: t }),
          wx.cloud
            .database()
            .collection("userInfo")
            .where({ _openid: e.globalData.user_openid })
            .get({
              success: function (a) {
                a.data[0]
                  ? (console.log(a.data[0].user_score),
                    (e.globalData.score = a.data[0].user_score),
                    o.setData({
                      userInfo: a.data[0],
                      welcomeMessage: "欢迎登录~",
                    }))
                  : wx.cloud
                      .database()
                      .collection("userInfo")
                      .add({
                        data: {
                          avatarUrl: t.avatarUrl,
                          nickName: t.nickName,
                          user_score: 10,
                        },
                        success: function (e) {
                          wx.showToast({ title: "登录成功", icon: "none" }),
                            o.setData({ welcomeMessage: "欢迎登录~" });
                        },
                      });
              },
            });
      },
    });
  },
  gotoHistory: function () {
    wx.navigateTo({ url: "/pages/history/index" });
  },
  gotoOldPeopleModel: function () {
    wx.navigateTo({ url: "/pages/oldpeoplemodel2/index" });
  },
  logout: function () {
    (e.globalData.userInfo = null),
      (e.globalData.score = 0),
      this.setData({ userInfo: null });
  },
  gotoWxCodePage: function () {},
});
