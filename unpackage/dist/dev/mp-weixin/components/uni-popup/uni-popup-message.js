"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "UniPopupMessage",
  props: {
    /**
     * 主题 success/warning/info/error	  默认 success
     */
    type: {
      type: String,
      default: "success"
    },
    /**
     * 消息文字
     */
    message: {
      type: String,
      default: ""
    },
    /**
     * 显示时间，设置为 0 则不会自动关闭
     */
    duration: {
      type: Number,
      default: 3e3
    }
  },
  inject: ["popup"],
  data() {
    return {};
  },
  created() {
    this.popup.childrenMsg = this;
  },
  methods: {
    open() {
      if (this.duration === 0)
        return;
      clearTimeout(this.popuptimer);
      this.popuptimer = setTimeout(() => {
        this.popup.close();
      }, this.duration);
    },
    close() {
      clearTimeout(this.popuptimer);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.message),
    b: common_vendor.n("uni-popup__" + [$props.type] + "-text"),
    c: common_vendor.n("uni-popup__" + [$props.type])
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-dcb9c949"]]);
wx.createComponent(Component);
