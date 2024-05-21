Page({
  data: { showUploadTip: !1, haveGetRecord: !1, envId: "", record: "" },
  onLoad: function (t) {
    var e = this;
    this.setData({ envId: t.envId }),
      wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          config: { env: this.data.envId },
          data: { type: "selectRecord" },
        })
        .then(function (t) {
          e.setData({ record: t.result.data }), wx.hideLoading();
        })
        .catch(function (t) {
          console.log(t), e.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  sumRecord: function () {
    wx.navigateTo({
      url: "/pages/sumRecordResult/index?envId=".concat(this.data.envId),
    });
  },
});
