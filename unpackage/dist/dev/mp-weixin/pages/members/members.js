"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "members",
  setup(__props) {
    const list = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      const app = common_vendor.getCurrentInstance();
      const members = app.proxy.$scope.options.members;
      utils_request.request(utils_request.API_URL.searchUserGroupByDept, "POST", { keyworkd: "" }, (resp) => {
        list.value = resp.data.result;
        for (let dept of list.value) {
          for (let member of dept.members) {
            if (members.indexOf(member.userId + "") != -1) {
              member.checked = true;
            } else {
              member.checked = false;
            }
          }
        }
      });
    });
    const selected = (e) => {
      const pages = getCurrentPages();
      const prevPage = pages[pages.length - 2];
      prevPage.members = e.detail.value;
      prevPage.finishMembers = true;
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (dept, k0, i0) => {
          return {
            a: common_vendor.t(dept.deptName),
            b: common_vendor.t(dept.count),
            c: common_vendor.f(dept.members, (member, k1, i1) => {
              return {
                a: common_vendor.t(member.name),
                b: member.userId,
                c: member.checked,
                d: member.userId
              };
            }),
            d: dept.id
          };
        }),
        b: common_vendor.o(selected)
      };
    };
  }
};
wx.createPage(_sfc_main);
