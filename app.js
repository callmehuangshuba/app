App({
  onLaunch: function () {
    var o = this;
    wx.cloud
      ? (wx.cloud.init({ traceUser: !0 }),
        wx.cloud.callFunction({
          name: "getOpenId",
          success: function (e) {
            (o.globalData.user_openid = e.result.openid),
              console.log(o.globalData.user_openid);
          },
        }))
      : console.error("请使用 2.2.3 或以上的基础库以使用云能力"),
      (this.globalData = { user_openid: "", userInfo: null, score: 0 });
  },
});
