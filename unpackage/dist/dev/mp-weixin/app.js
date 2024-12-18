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
