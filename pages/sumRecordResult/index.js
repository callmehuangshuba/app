Page({
  data: { showUploadTip: !1, haveGetRecord: !1, envId: "", record: "" },
  onLoad: function (t) {
    var a = this;
    this.setData({ envId: t.envId }),
      wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          config: { env: this.data.envId },
          data: { type: "sumRecord" },
        })
        .then(function (t) {
          a.setData({ record: t.result.list }), wx.hideLoading();
        })
        .catch(function (t) {
          console.log(t), a.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  goBack: function () {
    wx.navigateBack();
  },
});
