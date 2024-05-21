var e = getApp();
Page({
  data: { imageSrc: "", location: "", latitude: 0, longitude: 0, mapName: "" },
  chooseImage: function () {
    var e = this;
    wx.chooseImage({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      success: function (o) {
        var a = o.tempFilePaths[0];
        wx.chooseLocation({
          success: function (e) {
            console.log(e.name);
            var o = e.name;
            this.setData({ mapName: o }),
              this.updateUserScore(),
              this.saveToCloudDatabase(a, o),
              this.sendToServer(a);
          }.bind(e),
          fail: function (e) {
            console.log(e);
          },
        });
      },
    });
  },
  updateUserScore: function () {
    var o = wx.cloud.database(),
      a = o.command;
    o.collection("userInfo")
      .where({ _openid: e.globalData.user_openid })
      .update({
        data: { user_score: a.inc(1) },
        success: function (o) {
          console.log("用户积分增加成功", o),
            console.log("score", e.globalData.score),
            (e.globalData.score = e.globalData.score + 1),
            console.log("score", e.globalData.score),
            wx.showToast({ title: "积分+1", icon: "success", duration: 2e3 });
        },
        fail: function (e) {
          console.error("用户积分增加失败", e);
        },
      });
  },
  saveToCloudDatabase: function (e, o) {
    wx.cloud
      .database()
      .collection("images")
      .add({
        data: { fileID: e, location: o, uploadTime: new Date() },
        success: function (e) {
          console.log("存储到云数据库成功1", e);
        },
        fail: function (e) {
          console.error("存储到云数据库失败1", e);
        },
      });
  },
  sendToServer: function (e) {
    var o = this;
    wx.uploadFile({
      url: "http://172.18.45.81:5050/detect",
      filePath: e,
      name: "file",
      success: function (e) {
        console.log("上传成功", e);
        var a = "data:image/jpeg;base64," + JSON.parse(e.data).image;
        o.setData({ imageSrc: a }),
          o.saveToCloudDatabaseImg(a),
          o.gotonewPicturePage(a);
      },
      fail: function (e) {
        console.error("上传失败", e);
      },
    });
  },
  saveToCloudDatabaseImg: function (e) {
    var o = this;
    wx.cloud
      .database()
      .collection("serverImg")
      .add({
        data: { imageUrl: e, uploadTime: new Date() },
        success: function (a) {
          console.log("存储到云数据库成功2", a), o.setData({ imageSrc: e });
        },
        fail: function (e) {
          console.error("存储到云数据库失败2", e);
        },
      });
  },
  gotonewPicturePage: function (e) {
    wx.navigateTo({
      url: "/pages/newpage/index?imageUrl=" + encodeURIComponent(e),
    });
  },
});
