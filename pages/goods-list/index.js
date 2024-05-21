var e = require("../../@babel/runtime/helpers/regeneratorRuntime"),
  t = require("../../@babel/runtime/helpers/asyncToGenerator");
Page({
  data: {
    goodsList: [
      { _id: "1", title: "商品1", price: 1 },
      { _id: "2", title: "商品2", price: 2 },
    ],
  },
  onLoad: function () {},
  fetchGoodsList: function () {
    var n = this;
    return t(
      e().mark(function t() {
        var a, r, i;
        return e().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  n.setData({ isLoading: !0 }),
                  (e.next = 3),
                  wx.cloud.callFunction({
                    name: "quickstartFunctions",
                    data: { type: "fetchGoodsList" },
                  })
                );
              case 3:
                (r = e.sent),
                  (i =
                    (null == r || null === (a = r.result) || void 0 === a
                      ? void 0
                      : a.dataList) || []),
                  n.setData({ isLoading: !1, goodsList: i });
              case 6:
              case "end":
                return e.stop();
            }
        }, t);
      }),
    )();
  },
  generateMPCode: function () {
    var n = this;
    return t(
      e().mark(function t() {
        var a;
        return e().wrap(function (e) {
          for (;;)
            switch ((e.prev = e.next)) {
              case 0:
                return (
                  wx.showLoading(),
                  (e.next = 3),
                  wx.cloud.callFunction({
                    name: "quickstartFunctions",
                    data: {
                      type: "genMpQrcode",
                      pagePath: "pages/goods-list/index",
                    },
                  })
                );
              case 3:
                (a = e.sent),
                  n.setData({
                    codeModalVisible: !0,
                    codeImageSrc: null == a ? void 0 : a.result,
                  }),
                  wx.hideLoading();
              case 6:
              case "end":
                return e.stop();
            }
        }, t);
      }),
    )();
  },
});
