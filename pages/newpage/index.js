Page({
  data: { imageSrc: null },
  onLoad: function (n) {
    if (n.imageUrl) {
      var o = decodeURIComponent(n.imageUrl);
      this.setData({ imageSrc: o });
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
});
