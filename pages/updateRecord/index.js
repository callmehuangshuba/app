Page({
  data: { showUploadTip: !1, haveGetRecord: !1, envId: "", record: "" },
  onLoad: function (t) {
    this.setData({ envId: t.envId });
  },
  onShow: function () {
    var t = this;
    wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          config: { env: this.data.envId },
          data: { type: "selectRecord" },
        })
        .then(function (e) {
          t.setData({ record: e.result.data }), wx.hideLoading();
        })
        .catch(function (e) {
          console.log(e), t.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  updateRecord: function () {
    wx.navigateTo({
      url: "/pages/updateRecordResult/index?envId=".concat(this.data.envId),
    });
  },
});
