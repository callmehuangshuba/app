Component({
  data: { modalVisible: !1 },
  properties: { visible: Boolean, imageSrc: String },
  observers: {
    visible: function (i) {
      this.setData({ modalVisible: i });
    },
  },
  methods: {
    onClose: function () {
      this.setData({ modalVisible: !1 });
    },
  },
});
