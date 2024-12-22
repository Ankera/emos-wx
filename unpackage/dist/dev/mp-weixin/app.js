"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/demo/demo.js";
  "./pages/index/index.js";
  "./pages/login/login.js";
  "./pages/register/register.js";
  "./pages/meeting_list/meeting_list.js";
  "./pages/contacts/contacts.js";
  "./pages/mine/mine.js";
  "./pages/document/document.js";
  "./pages/checkin/checkin.js";
  "./pages/checkin_result/checkin_result.js";
  "./pages/my_checkin/my_checkin.js";
  "./pages/message/message.js";
  "./pages/message_list/message_list.js";
  "./pages/meeting/meeting.js";
  "./pages/members/members.js";
  "./pages/video_meeting/video_meeting.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
Date.prototype.format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1,
    //月份 
    "d+": this.getDate(),
    //日 
    "h+": this.getHours(),
    //小时 
    "m+": this.getMinutes(),
    //分 
    "s+": this.getSeconds(),
    //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3),
    //季度 
    "S": this.getMilliseconds()
    //毫秒 
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return fmt;
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.config.globalProperties.$checkPermission = function(perms = []) {
    let permission = common_vendor.index.getStorageSync("permission");
    let result = false;
    for (let one of perms) {
      if (permission.indexOf(one) != -1) {
        result = true;
        break;
      }
    }
    return result;
  };
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
