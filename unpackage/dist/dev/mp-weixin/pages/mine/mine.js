"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Math) {
  (uniListItem + uniList)();
}
const uniList = () => "../../components/uni-list/uni-list.js";
const uniListItem = () => "../../components/uni-list-item/uni-list-item.js";
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const name = common_vendor.ref("");
    const photo = common_vendor.ref("");
    const deptName = common_vendor.ref("");
    common_vendor.onMounted(() => {
      console.log("resquest");
      utils_request.request(utils_request.API_URL.searchUserSummary, "GET", null, (resp) => {
        if (resp.statusCode === 200) {
          name.value = resp.data.result.name;
          photo.value = resp.data.result.photo;
          deptName.value = resp.data.result.deptName;
        }
      });
    });
    const app = common_vendor.getCurrentInstance();
    const power01 = common_vendor.ref(false);
    const power02 = common_vendor.ref(false);
    const power03 = common_vendor.ref(false);
    const properties = app.appContext.config.globalProperties;
    power01.value = properties.$checkPermission(["ROOT", "EMPLOYEE:SELECT"]);
    power02.value = properties.$checkPermission(["ROOT", "DEPT:SELECT"]);
    power03.value = properties.$checkPermission(["ROOT", "ROLE:SELECT"]);
    return (_ctx, _cache) => {
      return {
        a: photo.value,
        b: common_vendor.t(name.value),
        c: common_vendor.t(deptName.value),
        d: common_vendor.p({
          title: "个人资料",
          link: true,
          to: ""
        }),
        e: common_vendor.p({
          title: "我的考勤",
          link: true,
          to: "/pages/my_checkin/my_checkin"
        }),
        f: common_vendor.p({
          title: "罚款记录",
          link: true,
          to: ""
        }),
        g: power01.value,
        h: common_vendor.p({
          title: "员工管理",
          link: true,
          to: ""
        }),
        i: power02.value,
        j: common_vendor.p({
          title: "部门管理",
          link: true,
          to: ""
        }),
        k: power03.value,
        l: common_vendor.p({
          title: "权限管理",
          link: true,
          to: ""
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
