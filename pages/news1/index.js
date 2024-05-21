require("../../envList").envList;
var e = require("./constants"),
  t = e.QuickStartPoints,
  a = e.QuickStartSteps;
Page({
  data: { knowledgePoints: t, steps: a },
  copyCode: function (e) {
    var t,
      a,
      n =
        (null === (t = e.target) ||
        void 0 === t ||
        null === (a = t.dataset) ||
        void 0 === a
          ? void 0
          : a.code) || "";
    wx.setClipboardData({
      data: n,
      success: function () {
        wx.showToast({ title: "已复制" });
      },
      fail: function (e) {
        console.error("复制失败-----", e);
      },
    });
  },
  discoverCloud: function () {
    wx.switchTab({ url: "/pages/examples/index" });
  },
  gotonewsPage1: function () {
    wx.navigateTo({ url: "/pages/news1/index" });
  },
  redirectToNews: function (e) {
    var t = e.currentTarget.dataset.id;
    wx.navigateTo({ url: "/pages/news" + t + "/index" });
  },
});
