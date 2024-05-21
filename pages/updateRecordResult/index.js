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
          data: { type: "selectRecord" },
        })
        .then(function (t) {
          a.setData({ record: t.result.data }), wx.hideLoading();
        })
        .catch(function (t) {
          console.log(t), a.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  updateRecord: function () {
    var t = this;
    wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          config: { env: this.data.envId },
          data: { type: "updateRecord", data: this.data.record },
        })
        .then(function (t) {
          wx.navigateTo({ url: "/pages/updateRecordSuccess/index" }),
            wx.hideLoading();
        })
        .catch(function (a) {
          console.log(a), t.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  bindInput: function (t) {
    var a = t.currentTarget.dataset.index,
      e = this.data.record;
    (e[a].sales = Number(t.detail.value)), this.setData({ record: e });
  },
});
