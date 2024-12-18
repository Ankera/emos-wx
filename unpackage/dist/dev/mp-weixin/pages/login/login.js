"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const login = () => {
      common_vendor.index.login({
        provider: "weixin",
        success: function(res) {
          const code = res.code;
          utils_request.request(utils_request.API_URL.login, "POST", { code }, (resp) => {
            const permission = resp.data.permission;
            common_vendor.index.setStorageSync("permission", permission);
            common_vendor.index.switchTab({
              url: "../index/index"
            });
          });
        },
        fail: function(e) {
          common_vendor.index.showToast({
            icon: "none",
            title: "执行异常"
          });
        }
      });
    };
    const toRegister = () => {
      common_vendor.index.navigateTo({
        url: "../register/register"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(($event) => login()),
        c: common_vendor.o(($event) => toRegister())
      };
    };
  }
};
wx.createPage(_sfc_main);
