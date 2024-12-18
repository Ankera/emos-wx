"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const registerCode = common_vendor.ref();
    const register = () => {
      common_vendor.index.login({
        provider: "weixin",
        success(data) {
          if (!registerCode.value) {
            common_vendor.index.showToast({
              icon: "none",
              title: "邀请码不能为空"
            });
            return;
          } else if (!/^[0-9]{6}$/.test(registerCode.value)) {
            common_vendor.index.showToast({
              icon: "none",
              title: "邀请码必须是6位数字"
            });
            return;
          }
          const code = data.code;
          common_vendor.index.getUserInfo({
            provider: "weixin",
            success: (data2) => {
              const params = {
                code,
                nickname: data2.userInfo.nickName,
                photo: data2.userInfo.avatarUrl,
                registerCode: registerCode.value
              };
              utils_request.request(utils_request.API_URL.register, "POST", params, (resp) => {
                const permission = resp.data.permission;
                common_vendor.index.setStorageSync("permission", permission);
                common_vendor.index.switchTab({
                  url: "../index/index"
                });
              });
            }
          });
        },
        fail(data) {
          console.log("fail data", data);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$2,
        b: registerCode.value,
        c: common_vendor.o(($event) => registerCode.value = $event.detail.value),
        d: common_vendor.o(($event) => register())
      };
    };
  }
};
wx.createPage(_sfc_main);
