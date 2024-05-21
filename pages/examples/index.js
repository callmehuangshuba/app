var e = require("../../envList.js").envList;
Page({
  data: {
    showUploadTip: !1,
    powerList: [
      {
        title: "云函数",
        tip: "安全、免鉴权运行业务代码",
        showItem: !1,
        item: [
          { type: "getOpenId", title: "获取OpenId" },
          { type: "getMiniProgramCode", title: "生成小程序码" },
        ],
      },
      {
        title: "数据库",
        tip: "安全稳定的文档型数据库",
        showItem: !1,
        item: [
          { type: "createCollection", title: "创建集合" },
          { type: "selectRecord", title: "查询记录" },
          { title: "更新记录", page: "updateRecord" },
          { title: "聚合操作", page: "sumRecord" },
        ],
      },
      {
        title: "云存储",
        tip: "自带CDN加速文件存储",
        showItem: !1,
        item: [{ type: "uploadFile", title: "上传文件" }],
      },
      {
        type: "singleTemplate",
        title: "云模板",
        tip: "基于页面模板，快速配置、搭建小程序页面",
        tag: "new",
      },
      {
        type: "cloudBackend",
        title: "云后台",
        tip: "开箱即用的小程序后台管理系统",
      },
      {
        title: "云托管",
        tip: "不限语言的全托管容器服务",
        link: "https://cloud.weixin.qq.com/cloudrun",
      },
    ],
    envList: e,
    selectedEnv: null == e ? void 0 : e[0],
    haveCreateCollection: !1,
  },
  onClickPowerInfo: function (e) {
    var t = e.currentTarget.dataset.index,
      i = this.data.powerList,
      a = i[t];
    if (((a.showItem = !a.showItem), a.link))
      wx.navigateTo({
        url: "../web/index?url=".concat(a.link, "&title=").concat(a.title),
      });
    else if (a.type) {
      var n;
      wx.navigateTo({
        url: "/pages/exampleDetail/index?envId="
          .concat(
            null === (n = this.data.selectedEnv) || void 0 === n
              ? void 0
              : n.envId,
            "&type=",
          )
          .concat(a.type),
      });
    } else
      a.page
        ? wx.navigateTo({ url: "/pages/".concat(a.page, "/index") })
        : "数据库" !== a.title || this.data.haveCreateCollection
          ? this.setData({ powerList: i })
          : this.onClickDatabase(i);
  },
  onChangeShowEnvChoose: function () {
    var e = this;
    wx.showActionSheet({
      itemList: this.data.envList.map(function (e) {
        return e.alias;
      }),
      success: function (t) {
        e.onChangeSelectedEnv(t.tapIndex);
      },
      fail: function (e) {
        console.log(e.errMsg);
      },
    });
  },
  onChangeSelectedEnv: function (e) {
    var t, i, a;
    if (
      (null === (t = this.data.selectedEnv) || void 0 === t
        ? void 0
        : t.envId) !==
      (null === (i = this.data.envList) ||
      void 0 === i ||
      null === (a = i[e]) ||
      void 0 === a
        ? void 0
        : a.envId)
    ) {
      var n = this.data.powerList;
      n.forEach(function (e) {
        e.showItem = !1;
      }),
        this.setData({
          selectedEnv: this.data.envList[e],
          powerList: n,
          haveCreateCollection: !1,
        });
    }
  },
  jumpPage: function (e) {
    var t,
      i,
      a = e.currentTarget.dataset,
      n = a.type,
      o = a.page;
    n
      ? wx.navigateTo({
          url: "/pages/exampleDetail/index?envId="
            .concat(
              null === (t = this.data.selectedEnv) || void 0 === t
                ? void 0
                : t.envId,
              "&type=",
            )
            .concat(n),
        })
      : wx.navigateTo({
          url: "/pages/"
            .concat(o, "/index?envId=")
            .concat(
              null === (i = this.data.selectedEnv) || void 0 === i
                ? void 0
                : i.envId,
            ),
        });
  },
  onClickDatabase: function (e) {
    var t,
      i = this;
    wx.showLoading({ title: "" }),
      wx.cloud
        .callFunction({
          name: "quickstartFunctions",
          config: {
            env:
              null === (t = this.data.selectedEnv) || void 0 === t
                ? void 0
                : t.envId,
          },
          data: { type: "createCollection" },
        })
        .then(function (t) {
          t.result.success && i.setData({ haveCreateCollection: !0 }),
            i.setData({ powerList: e }),
            wx.hideLoading();
        })
        .catch(function (e) {
          console.log(e), i.setData({ showUploadTip: !0 }), wx.hideLoading();
        });
  },
});
