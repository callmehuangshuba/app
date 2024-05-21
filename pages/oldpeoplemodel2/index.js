Page({
  data: {},
  onLoad: function (n) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  gotoKnowledge: function () {
    wx.navigateTo({ url: "/pages/index-old/index" });
  },
  gotoPicture: function () {
    wx.navigateTo({ url: "/pages/picture-old/index" });
  },
  gotoShopping: function () {
    wx.navigateTo({ url: "/pages/shopping-old/index" });
  },
  gotoUserCenter: function () {
    wx.switchTab({ url: "/pages/user-center/index" });
  },
});
