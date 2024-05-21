getApp();
Page({
  onLoad: function (t) {
    this,
      null != t.url
        ? (this.setData({ webUrl: t.url }),
          null != t.title && wx.setNavigationBarTitle({ title: t.title }))
        : wx.navigateBack({ delta: 1 });
  },
});
