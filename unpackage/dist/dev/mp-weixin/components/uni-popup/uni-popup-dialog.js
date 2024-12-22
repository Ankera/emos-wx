"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  name: "uniPopupDialog",
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: [String, Number],
      default: "请输入内容"
    },
    /**
     * 对话框主题 success/warning/info/error	  默认 success
     */
    type: {
      type: String,
      default: "error"
    },
    /**
     * 对话框模式 base/input
     */
    mode: {
      type: String,
      default: "base"
    },
    /**
     * 对话框标题
     */
    title: {
      type: String,
      default: "提示"
    },
    /**
     * 对话框内容
     */
    content: {
      type: String,
      default: ""
    },
    /**
     * 拦截取消事件 ，如果拦截取消事件，必须监听close事件，执行 done()
     */
    beforeClose: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogType: "error",
      focus: false,
      val: ""
    };
  },
  inject: ["popup"],
  watch: {
    type(val) {
      this.dialogType = val;
    },
    mode(val) {
      if (val === "input") {
        this.dialogType = "info";
      }
    },
    value(val) {
      this.val = val;
    }
  },
  created() {
    this.popup.mkclick = false;
    if (this.mode === "input") {
      this.dialogType = "info";
      this.val = this.value;
    } else {
      this.dialogType = this.type;
    }
  },
  mounted() {
    this.focus = true;
  },
  methods: {
    /**
     * 点击确认按钮
     */
    onOk() {
      this.$emit("confirm", () => {
        this.popup.close();
        if (this.mode === "input")
          this.val = this.value;
      }, this.mode === "input" ? this.val : "");
    },
    /**
     * 点击取消按钮
     */
    close() {
      if (this.beforeClose) {
        this.$emit("close", () => {
          this.popup.close();
        });
        return;
      }
      this.popup.close();
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($props.title),
    b: common_vendor.n("uni-popup__" + $data.dialogType),
    c: $props.mode === "base"
  }, $props.mode === "base" ? {
    d: common_vendor.t($props.content)
  } : {
    e: $props.placeholder,
    f: $data.focus,
    g: $data.val,
    h: common_vendor.o(($event) => $data.val = $event.detail.value)
  }, {
    i: common_vendor.o((...args) => $options.close && $options.close(...args)),
    j: common_vendor.o((...args) => $options.onOk && $options.onOk(...args))
  });
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-736a331c"]]);
wx.createComponent(Component);
