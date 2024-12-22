"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "message",
  setup(__props) {
    const sendTime = common_vendor.ref("");
    const msg = common_vendor.ref("");
    const instance = common_vendor.getCurrentInstance();
    common_vendor.onMounted(() => {
      const params = instance.proxy.$scope.options;
      const userId = params.id;
      utils_request.request(utils_request.API_URL.searchMessageById, "POST", { id: userId }, (resp) => {
        sendTime.value = resp.data.result.sendTime;
        msg.value = resp.data.result.msg;
      });
      utils_request.request(utils_request.API_URL.updateUnreadMessage, "POST", { id: userId }, () => {
      });
    });
    const deleteMsg = () => {
      common_vendor.index.showModal({
        title: "提示信息",
        content: "是否要删除这条消息？",
        success(resp) {
          const params = instance.proxy.$scope.options;
          const userId = params.id;
          if (resp.confirm) {
            utils_request.request(utils_request.API_URL.deleteMessageRefById, "POST", { id: userId }, (resp2) => {
              common_vendor.index.showToast({
                icon: "success",
                title: "删除成功",
                complete() {
                  setTimeout(() => {
                    common_vendor.index.navigateBack({
                      delta: 1
                    });
                  }, 1500);
                }
              });
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(sendTime.value),
        b: common_vendor.o(($event) => deleteMsg()),
        c: common_vendor.t(msg.value)
      };
    };
  }
};
wx.createPage(_sfc_main);
