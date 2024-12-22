"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  _easycom_uni_list_chat2();
}
const _easycom_uni_list_chat = () => "../../components/uni-list-chat/uni-list-chat.js";
if (!Math) {
  (_easycom_uni_list_chat + uniList)();
}
const uniList = () => "../../components/uni-list/uni-list.js";
const _sfc_main = {
  __name: "message_list",
  setup(__props) {
    common_vendor.onMounted(() => {
      utils_request.request(utils_request.API_URL.searchMessageByPage, "POST", { page: 1, length: 50 }, (resp) => {
        list.value = resp.data.result;
      });
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(_ctx.list, (one, k0, i0) => {
          return {
            a: common_vendor.t(one.sendTime),
            b: one.id,
            c: "17451fa9-1-" + i0 + ",17451fa9-0",
            d: common_vendor.p({
              title: one.senderName,
              note: one.msg,
              avatar: one.senderPhoto,
              badgePositon: "left",
              badgeText: one.readFlag ? "" : "dot",
              link: "navigateTo",
              to: "../message/message?id=" + one.id + "&readFlag=" + one.readFlag + "&refId=" + one.refId
            })
          };
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
