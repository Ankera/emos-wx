"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "meeting_list",
  setup(__props) {
    common_vendor.ref();
    const page = common_vendor.ref(1);
    const length = common_vendor.ref(20);
    const list = common_vendor.ref([
      {
        date: "2021年02月08日",
        list: [
          { id: 1, date: "2021/02/08", start: "08:30", end: "10:30", type: "线上会议", name: "张爽", place: "网络会议室", status: "未开始", title: "年终大会", desc: "年终总结大会" },
          { id: 2, date: "2021/02/08", start: "08:30", end: "10:30", type: "线上会议", name: "张爽", place: "网络会议室", status: "未开始", title: "年终大会", desc: "年终总结大会" }
        ]
      },
      {
        date: "2021年02月09日",
        list: [{ id: 3, date: "2021/02/09", start: "08:30", end: "10:30", type: "线上会议", name: "张爽", place: "网络会议室", status: "未开始", title: "年终大会", desc: "年终总结大会" }]
      }
    ]);
    common_vendor.ref(false);
    common_vendor.onMounted(() => {
      const params = {
        page: page.value,
        length: length.value
      };
      utils_request.request(utils_request.API_URL.searchMyMeetingListByPage, "POST", params, (resp) => {
        const newResult = [];
        for (var i = 0; i < (resp.data.result || []).length; i++) {
          const elt = resp.data.result[i];
          if (Array.isArray(elt.list)) {
            for (var y = 0; y < elt.list.length; y++) {
              const item = elt.list[y];
              if (+item.type === 1) {
                item.type = "线上会议";
              } else if (+item.type === 2) {
                item.type = "线下会议";
              }
              if (+item.status === 1) {
                item.status = "未开始";
              } else if (+item.status === 2) {
                item.status = "进行中";
              } else if (+item.status === 3) {
                item.status = "已结束";
              }
            }
          }
          newResult.push(elt);
        }
        list.value = newResult;
      });
    });
    const app = common_vendor.getCurrentInstance();
    const power01 = common_vendor.ref(false);
    const power02 = common_vendor.ref(false);
    const properties = app.appContext.config.globalProperties;
    power01.value = properties.$checkPermission(["ROOT", "MEETING:INSERT"]);
    power02.value = properties.$checkPermission(["ROOT", "MEETING:UPDATE"]);
    const toMeetingPage = (id, opt) => {
      common_vendor.index.navigateTo({
        url: "../meeting/meeting?id=" + id + "&opt=" + opt
      });
    };
    const enter = (id, uuid, date, start) => {
      date = date.replace("年", "/").replace("月", "/").replace("日", "");
      let begin = /* @__PURE__ */ new Date(date + " " + start + ":00");
      let now = /* @__PURE__ */ new Date();
      if (now.getTime() >= begin.getTime() - 10 * 60 * 1e3) {
        utils_request.request(utils_request.API_URL.searchRoomIdByUUID, "POST", { uuid }, function(resp) {
          let roomId = resp.data.result;
          common_vendor.index.navigateTo({
            url: "../video_meeting/video_meeting?id=" + id + "&roomId=" + roomId
          });
        });
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: "会议开始前10分钟才能进入"
        });
      }
    };
    const deleteById = (id, date, start) => {
      let now = /* @__PURE__ */ new Date();
      let meetingDate = /* @__PURE__ */ new Date(date + " " + start + ":00");
      if (now.getTime() >= meetingDate.getTime() - 20 * 60 * 1e3) {
        common_vendor.index.showToast({
          icon: "none",
          title: "该会议无法删除"
        });
        return;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$3,
        b: power01.value
      }, power01.value ? {
        c: common_assets._imports_1$1,
        d: common_vendor.o(($event) => toMeetingPage(null, "insert"))
      } : {}, {
        e: common_vendor.f(list.value, (one, k0, i0) => {
          return {
            a: common_vendor.t(one.date),
            b: common_vendor.f(one.list, (meeting, k1, i1) => {
              return common_vendor.e({
                a: meeting.type == "线上会议"
              }, meeting.type == "线上会议" ? {
                b: common_assets._imports_2$1
              } : {}, {
                c: meeting.type == "线下会议"
              }, meeting.type == "线下会议" ? {
                d: common_assets._imports_2$1
              } : {}, {
                e: common_vendor.t(meeting.type),
                f: common_vendor.t(meeting.status),
                g: common_vendor.n(meeting.status == "未开始" ? "blue" : "red"),
                h: power02.value && meeting.status == "未开始"
              }, power02.value && meeting.status == "未开始" ? {
                i: common_vendor.o(($event) => toMeetingPage(meeting.id, "edit"), meeting.id)
              } : {}, {
                j: common_vendor.t(meeting.title),
                k: common_vendor.t(meeting.start),
                l: common_vendor.t(meeting.end),
                m: common_vendor.t(meeting.name),
                n: meeting.type != "线上会议"
              }, meeting.type != "线上会议" ? {
                o: common_assets._imports_5$1,
                p: common_vendor.t(meeting.place)
              } : {}, {
                q: common_vendor.t(meeting.desc),
                r: meeting.type == "线上会议"
              }, meeting.type == "线上会议" ? {
                s: common_vendor.o(($event) => enter(meeting.id, meeting.uuid, meeting.date, meeting.start), meeting.id)
              } : {}, {
                t: meeting.id,
                v: common_vendor.o(($event) => deleteById(meeting.id, meeting.date, meeting.start), meeting.id)
              });
            }),
            c: one.date
          };
        }),
        f: common_assets._imports_3$1,
        g: common_assets._imports_4$1
      });
    };
  }
};
wx.createPage(_sfc_main);
