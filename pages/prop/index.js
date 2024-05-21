var o = getApp(),
  e = wx.cloud.database();
Page({
  data: { userGoodsList: [] },
  onLoad: function () {
    this.getUserGoodsList();
  },
  getUserGoodsList: function () {
    var t = this;
    e.collection("userGoods")
      .where({ userId: o.globalData.user_openid })
      .get()
      .then(function (o) {
        t.setData({ userGoodsList: o.data });
      })
      .catch(function (o) {
        console.error("获取用户商品信息失败", o);
      });
  },
  buy: function (o) {
    var t = this,
      s = o.currentTarget.dataset.index,
      c = this.data.userGoodsList[s];
    wx.showModal({
      title: "请填写电话号码",
      confirmText: "确认",
      cancelText: "取消",
      editable: !0,
      placeholderText: "请输入要兑换流量的电话",
      success: function (o) {
        if (o.confirm) {
          e.collection("userGoods")
            .doc(c._id)
            .remove()
            .then(function () {
              t.getUserGoodsList(),
                wx.showToast({ title: "商品兑换成功", icon: "success" });
            })
            .catch(function (o) {
              console.error("删除商品失败", o),
                wx.showToast({ title: "商品兑换失败，请重试", icon: "none" });
            });
        } else o.cancel && console.log("用户取消填写电话号码");
      },
    });
  },
});
