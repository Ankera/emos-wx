"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
if (!Math) {
  (uniPopupDialog + uniPopup)();
}
const uniPopup = () => "../../components/uni-popup/uni-popup.js";
const uniPopupDialog = () => "../../components/uni-popup/uni-popup-dialog.js";
const _sfc_main = {
  __name: "meeting",
  setup(__props) {
    const members = common_vendor.ref([]);
    common_vendor.ref(false);
    const canEdit = common_vendor.ref(true);
    const title = common_vendor.ref();
    const date = common_vendor.ref();
    const start = common_vendor.ref();
    const end = common_vendor.ref();
    const desc = common_vendor.ref();
    const place = common_vendor.ref();
    const typeIndex = common_vendor.ref(0);
    const typeArray = common_vendor.ref(["线上会议", "线下会议"]);
    const popupPlace = common_vendor.ref();
    const popupDesc = common_vendor.ref();
    const id = common_vendor.ref();
    const app = common_vendor.getCurrentInstance();
    const power01 = common_vendor.ref(false);
    const properties = app.appContext.config.globalProperties;
    power01.value = properties.$checkPermission(["ROOT", "MEETING:INSERT", "MEETING:UPDATE"]);
    common_vendor.onShow(() => {
      const app2 = common_vendor.getCurrentInstance();
      const options = app2.proxy.$scope.options;
      id.value = options.id;
      const pages = getCurrentPages();
      const currPage = pages[pages.length - 1];
      if (!currPage.hasOwnProperty("finishMembers") || !currPage.finishMembers) {
        if (options.opt == "insert") {
          let now = /* @__PURE__ */ new Date();
          now.setTime(now.getTime() + 30 * 60 * 1e3);
          date.value = now.format("yyyy-MM-dd");
          start.value = now.format("hh:mm");
          now.setTime(now.getTime() + 60 * 60 * 1e3);
          end.value = now.format("hh:mm");
        } else if (options.opt === "edit") {
          utils_request.request(utils_request.API_URL.searchMeetingById, "POST", { id: id.value }, (resp) => {
            const data = resp.data.result;
            title.value = data.title;
            date.value = data.date;
            start.value = data.start;
            end.value = data.end;
            desc.value = data.desc;
            place.value = data.place;
            typeIndex.value = +data.type === 1 ? 0 : 1;
            const bers = JSON.parse(data.members || "[]");
            utils_request.request(utils_request.API_URL.searchUserGroupByDept, "POST", { keyworkd: "" }, (resp2) => {
              const list = resp2.data.result;
              const newMembers = [];
              for (let dept of list) {
                for (let member of dept.members) {
                  if (bers.indexOf(member.userId) !== -1) {
                    newMembers.push({
                      ...member,
                      id: member.userId
                    });
                  }
                }
              }
              members.value = newMembers;
            });
          });
        }
      } else {
        utils_request.request(utils_request.API_URL.searchMembers, "POST", { members: currPage.members.join() }, (resp) => {
          members.value = resp.data.result;
        });
      }
    });
    const toMembersPage = () => {
      let array = [];
      for (let one of members.value) {
        array.push(one.id);
      }
      common_vendor.index.navigateTo({
        url: "../members/members?members=" + array.join(",")
      });
    };
    const dateChange = (e) => {
      date.value = e.target.value;
    };
    const startChange = (e) => {
      start.value = e.target.value;
    };
    const endChange = (e) => {
      end.value = e.target.value;
    };
    const typeChange = (e) => {
      typeIndex.value = e.target.value;
    };
    const editPlace = () => {
      if (!canEdit.value) {
        return;
      }
      popupPlace.value.open();
    };
    const editDesc = () => {
      if (!canEdit.value) {
        return;
      }
      popupDesc.value.open();
    };
    const finishPlace = (done, value) => {
      if (value) {
        place.value = value;
        done();
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: "地点不能为空"
        });
      }
    };
    const finishDesc = (done, value) => {
      if (value) {
        desc.value = value;
        done();
      } else {
        common_vendor.index.showToast({
          icon: "none",
          title: "内容不能为空"
        });
      }
    };
    const save = () => {
      let array = [];
      for (let one of members.value) {
        array.push(one.id);
      }
      let data = {
        title: title.value,
        date: date.value,
        start: start.value,
        end: end.value,
        type: Number(typeIndex.value) + 1,
        place: place.value,
        members: JSON.stringify(array),
        desc: desc.value,
        id: id.value
        // instanceId: instanceId
      };
      const API = id.value === "null" ? utils_request.API_URL.insertMeeting : utils_request.API_URL.updateMeetingInfo;
      utils_request.request(API, "POST", data, () => {
        common_vendor.index.showToast({
          icon: "success",
          title: "保存成功",
          complete: function() {
            setTimeout(function() {
              common_vendor.index.navigateBack({});
            }, 2e3);
          }
        });
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: power01.value
      }, power01.value ? common_vendor.e({
        b: title.value,
        c: common_vendor.o(($event) => title.value = $event.detail.value),
        d: common_assets._imports_0$6,
        e: canEdit.value
      }, canEdit.value ? {
        f: common_vendor.t(date.value),
        g: date.value,
        h: common_vendor.o(dateChange)
      } : {}, {
        i: !canEdit.value
      }, !canEdit.value ? {
        j: common_vendor.t(date.value)
      } : {}, {
        k: canEdit.value
      }, canEdit.value ? {
        l: common_vendor.t(start.value),
        m: start.value,
        n: common_vendor.o(startChange)
      } : {}, {
        o: !canEdit.value
      }, !canEdit.value ? {
        p: common_vendor.t(start.value)
      } : {}, {
        q: canEdit.value
      }, canEdit.value ? {
        r: common_vendor.t(end.value),
        s: end.value,
        t: common_vendor.o(endChange)
      } : {}, {
        v: !canEdit.value
      }, !canEdit.value ? {
        w: common_vendor.t(end.value)
      } : {}, {
        x: canEdit.value
      }, canEdit.value ? {
        y: common_vendor.t(typeArray.value[typeIndex.value]),
        z: typeIndex.value,
        A: typeArray.value,
        B: common_vendor.o(typeChange)
      } : {}, {
        C: !canEdit.value
      }, !canEdit.value ? {
        D: common_vendor.t(typeArray.value[typeIndex.value])
      } : {}, {
        E: typeArray.value[typeIndex.value] == "线下会议"
      }, typeArray.value[typeIndex.value] == "线下会议" ? {
        F: common_vendor.t(place.value),
        G: common_vendor.o(editPlace)
      } : {}, {
        H: common_vendor.t(desc.value),
        I: common_vendor.o(editDesc),
        J: common_vendor.t(members.value.length),
        K: common_vendor.f(members.value, (one, k0, i0) => {
          return {
            a: one.photo,
            b: common_vendor.t(one.name),
            c: one.id,
            d: common_vendor.o(($event) => _ctx.deleteMember(one.id), one.id)
          };
        }),
        L: common_assets._imports_1$3,
        M: common_vendor.o(($event) => toMembersPage()),
        N: common_vendor.o(save),
        O: common_vendor.o(finishPlace),
        P: common_vendor.p({
          mode: "input",
          title: "编辑文字内容",
          placeholder: "输入会议地点",
          value: place.value
        }),
        Q: common_vendor.sr(popupPlace, "c3d6e1be-0", {
          "k": "popupPlace"
        }),
        R: common_vendor.p({
          type: "dialog"
        }),
        S: common_vendor.o(finishDesc),
        T: common_vendor.p({
          mode: "input",
          title: "编辑文字内容",
          placeholder: "输入会议内容",
          value: desc.value
        }),
        U: common_vendor.sr(popupDesc, "c3d6e1be-2", {
          "k": "popupDesc"
        }),
        V: common_vendor.p({
          type: "dialog"
        })
      }) : {});
    };
  }
};
wx.createPage(_sfc_main);
