var c = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  e = require("../../@babel/runtime/helpers/asyncToGenerator"),
  a = getApp(),
  t = wx.cloud.database();
Page({
  data: {
    userInfo: null,
    goodsList: [
      {
        _id: "1",
        title: "100MB小时包",
        price: 10,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/100mb.png",
      },
      {
        _id: "2",
        title: "200MB小时包",
        price: 20,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/200mb.png",
      },
      {
        _id: "3",
        title: "1G定向流量包",
        price: 100,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/1G.jpg",
      },
      {
        _id: "4",
        title: "2G定向流量包",
        price: 190,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/2G.jpg",
      },
      {
        _id: "5",
        title: "1G流量日包",
        price: 30,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/1Gday.png",
      },
      {
        _id: "6",
        title: "100MB加油包",
        price: 50,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/100mbf.png",
      },
      {
        _id: "7",
        title: "500MB加油包",
        price: 200,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/500mbf.png",
      },
      {
        _id: "8",
        title: "2GB加油包",
        price: 600,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/2Gf.png",
      },
      {
        _id: "9",
        title: "30元话费",
        price: 300,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/30.jpg",
      },
      {
        _id: "10",
        title: "50元话费",
        price: 480,
        imgsrc:
          "cloud://cloud1-0gdm8ga3ea780c52.636c-cloud1-0gdm8ga3ea780c52-1325470626/SHOPPINGlist/50.jpg",
      },
    ],
    isLoading: !1,
    this_score: 0,
  },
  onLoad: function () {
    this.setData({ this_score: 0 });
  },
  onShow: function () {
    this.setData({
      this_score: a.globalData.score,
      userInfo: a.globalData.userInfo,
    });
  },
  buy: function (o) {
    var i = this;
    return e(
      c().mark(function e() {
        var l, r, d;
        return c().wrap(function (c) {
          for (;;)
            switch ((c.prev = c.next)) {
              case 0:
                if (
                  ((l = o.currentTarget.dataset.index),
                  (r = i.data.goodsList[l]),
                  (d = r.price),
                  t.command,
                  !(a.globalData.score < d))
                ) {
                  c.next = 7;
                  break;
                }
                return (
                  wx.showToast({ title: "积分不足", icon: "none" }),
                  c.abrupt("return")
                );
              case 7:
                (a.globalData.score -= d),
                  i.setData({ this_score: a.globalData.score }),
                  wx.showToast({ title: "购买成功", icon: "success" }),
                  t
                    .collection("userInfo")
                    .where({ _openid: a.globalData.user_openid })
                    .update({
                      data: { user_score: a.globalData.score },
                      success: function (c) {
                        console.log("用户积分扣除成功", c);
                      },
                      fail: function (c) {
                        console.error("用户积分扣除失败", res);
                      },
                    });
              case 11:
              case "end":
                return c.stop();
            }
        }, e);
      }),
    )();
  },
});
