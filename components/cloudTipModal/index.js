var o = require("../../envList.js").isMac;
Component({
  data: {
    showUploadTip: !1,
    tipText: o ? "sh ./uploadCloudFunction.sh" : "./uploadCloudFunction.bat",
  },
  properties: { showUploadTipProps: Boolean },
  observers: {
    showUploadTipProps: function (o) {
      this.setData({ showUploadTip: o });
    },
  },
  methods: {
    onChangeShowUploadTip: function () {
      this.setData({ showUploadTip: !this.data.showUploadTip });
    },
    copyShell: function () {
      wx.setClipboardData({ data: this.data.tipText });
    },
  },
});
