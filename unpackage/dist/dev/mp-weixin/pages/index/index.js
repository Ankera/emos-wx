"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_uni_calendar2 = common_vendor.resolveComponent("uni-calendar");
  _easycom_uni_calendar2();
}
const _easycom_uni_calendar = () => "../../components/uni-calendar/uni-calendar.js";
if (!Math) {
  (_easycom_uni_calendar + uniPopupMessage + uniPopup)();
}
const uniPopup = () => "../../components/uni-popup/uni-popup.js";
const uniPopupMessage = () => "../../components/uni-popup/uni-popup-message.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const popupMsg = common_vendor.ref(null);
    common_vendor.ref(null);
    const unreadRows = common_vendor.ref(0);
    const lastRows = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      utils_request.request(utils_request.API_URL.refreshMessage, "GET", null, (resp) => {
        unreadRows.value = resp.data.unreadRows;
        lastRows.value = resp.data.lastRows;
        if (resp.data.unreadRows > 0) {
          popupMsg.value.open();
        }
      });
    });
    common_vendor.onUnmounted(() => {
      common_vendor.index.$off("showMessage");
    });
    const toPage = (name, url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.t(unreadRows.value),
        c: common_assets._imports_1,
        d: common_vendor.o(($event) => toPage("消息提醒", "/pages/message_list/message_list")),
        e: common_assets._imports_2,
        f: common_vendor.o(($event) => toPage("在线签到", "../checkin/checkin")),
        g: common_assets._imports_3,
        h: common_assets._imports_4,
        i: common_assets._imports_5,
        j: common_assets._imports_6,
        k: common_assets._imports_7,
        l: common_assets._imports_8,
        m: common_assets._imports_9,
        n: common_assets._imports_10,
        o: common_assets._imports_11,
        p: common_vendor.o(($event) => toPage("在线审批", "../approval_list/approval_list")),
        q: common_assets._imports_12,
        r: common_assets._imports_13,
        s: common_vendor.o(_ctx.changeMonth),
        t: common_vendor.p({
          insert: true,
          lunar: true,
          selected: _ctx.calendar
        }),
        v: common_vendor.f(_ctx.meetingList, (one, k0, i0) => {
          return {
            a: common_vendor.t(one.title),
            b: common_vendor.t(one.hour == 0 ? 1 : one.hour),
            c: common_vendor.t(one.date),
            d: common_vendor.t(one.start),
            e: common_vendor.t(one.type == "线上会议" ? one.type : one.place),
            f: one.photo,
            g: one.id
          };
        }),
        w: common_assets._imports_14,
        x: common_assets._imports_15,
        y: common_vendor.p({
          type: "success",
          message: "接收到" + lastRows.value + "条消息",
          duration: 2e3
        }),
        z: common_vendor.sr(popupMsg, "3e0e57e2-1", {
          "k": "popupMsg"
        }),
        A: common_vendor.p({
          type: "top"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
