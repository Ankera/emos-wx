"use strict";
const components_uniPopup_message = require("./message.js");
const config = {
  // 顶部弹出
  top: "top",
  // 底部弹出
  bottom: "bottom",
  // 居中弹出
  center: "center",
  // 消息提示
  message: "top",
  // 对话框
  dialog: "center",
  // 分享
  share: "bottom"
};
const popup = {
  data() {
    return {
      config
    };
  },
  mixins: [components_uniPopup_message.message]
};
exports.popup = popup;
