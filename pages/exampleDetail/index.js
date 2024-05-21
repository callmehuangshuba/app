Page({
  data: {
    type: "",
    envId: "",
    showUploadTip: !1,
    haveGetOpenId: !1,
    openId: "",
    haveGetCodeSrc: !1,
    codeSrc: "",
    haveGetRecord: !1,
    record: "",
    haveGetImgSrc: !1,
    imgSrc: "",
  },
  onLoad: function (t) {
    this.setData({
      type: null == t ? void 0 : t.type,
      envId: null == t ? void 0 : t.envId,
    });
  },
  getOpenId: function () {
    var t = this;
    wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          config: { env: this.data.envId },
          data: { type: "getOpenId" },
        })
        .then(function (e) {
          t.setData({ haveGetOpenId: !0, openId: e.result.openid }),
            wx.hideLoading();
        })
        .catch(function (e) {
          t.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  clearOpenId: function () {
    this.setData({ haveGetOpenId: !1, openId: "" });
  },
  getCodeSrc: function () {
    var t = this;
    wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          config: { env: this.data.envId },
          data: { type: "getMiniProgramCode" },
        })
        .then(function (e) {
          t.setData({ haveGetCodeSrc: !0, codeSrc: e.result }),
            wx.hideLoading();
        })
        .catch(function (e) {
          console.log(e), t.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  clearCodeSrc: function () {
    this.setData({ haveGetCodeSrc: !1, codeSrc: "" });
  },
  getRecord: function () {
    var t = this;
    wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          config: { env: this.data.envId },
          data: { type: "selectRecord" },
        })
        .then(function (e) {
          t.setData({ haveGetRecord: !0, record: e.result.data }),
            wx.hideLoading();
        })
        .catch(function (e) {
          console.log(e), t.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
  clearRecord: function () {
    this.setData({ haveGetRecord: !1, record: "" });
  },
  uploadImg: function () {
    var t = this;
    wx.showLoading({ title: "" }),
      wx.chooseImage({
        count: 1,
        success: function (e) {
          wx.cloud
            .uploadFile({
              cloudPath: "my-photo.png",
              filePath: e.tempFilePaths[0],
              config: { env: t.data.envId },
            })
            .then(function (e) {
              console.log("上传成功", e),
                t.setData({ haveGetImgSrc: !0, imgSrc: e.fileID }),
                wx.hideLoading();
            })
            .catch(function (t) {
              console.log(t), wx.hideLoading();
            });
        },
      });
  },
  clearImgSrc: function () {
    this.setData({ haveGetImgSrc: !1, imgSrc: "" });
  },
  goOfficialWebsite: function () {
    wx.navigateTo({
      url: "../web/index?url=".concat(
        "https://docs.cloudbase.net/toolbox/quick-start",
      ),
    });
  },
});
