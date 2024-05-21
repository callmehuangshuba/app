Page({
  data: { photoList: [] },
  onLoad: function () {
    this.fetchImageData();
  },
  fetchImageData: function () {
    var t = this;
    wx.cloud
      .database()
      .collection("images")
      .get({
        success: function (a) {
          console.log("从云数据库获取图片数据成功", a.data);
          var o = a.data.map(function (t) {
            return (t.uploadTime = t.uploadTime.toLocaleString()), t;
          });
          t.setData({ photoList: o });
        },
        fail: function (t) {
          console.error("从云数据库获取图片数据失败", t);
        },
      });
  },
});
