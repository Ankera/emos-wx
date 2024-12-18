"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "checkin_result",
  setup(__props) {
    const photo = common_vendor.ref("https://img1.baidu.com/it/u=2453992804,444441020&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1734368400&t=7dac2b7d6096cb6a349224237e652daa");
    const name = common_vendor.ref("");
    const deptName = common_vendor.ref("");
    const date = common_vendor.ref(null);
    const attendanceTime = common_vendor.ref("");
    const checkinTime = common_vendor.ref("");
    const status = common_vendor.ref("");
    const address = common_vendor.ref("");
    const risk = common_vendor.ref("");
    const closingTime = common_vendor.ref("");
    const checkinDays = common_vendor.ref("");
    const weekCheckin = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      utils_request.request(utils_request.API_URL.searchTodayCheckin, "GET", null, (resp) => {
        console.log("==resp==", resp);
        let result = resp.data.result;
        name.value = result.name;
        date.value = result.date;
        deptName.value = result.deptName;
        attendanceTime.value = result.attendanceTime;
        checkinTime.value = result.checkinTime || "08:20";
        status.value = result.status;
        address.value = result.address;
        risk.value = result.risk;
        closingTime.value = result.closingTime;
        checkinDays.value = result.checkinDays;
        weekCheckin.value = result.weekCheckin;
      });
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: photo.value,
        b: common_vendor.t(name.value),
        c: common_vendor.t(deptName.value == null ? "" : deptName.value),
        d: common_vendor.t(date.value),
        e: common_assets._imports_0$4,
        f: common_assets._imports_0$4,
        g: common_vendor.t(attendanceTime.value),
        h: common_vendor.t(checkinTime.value),
        i: status.value == "正常"
      }, status.value == "正常" ? {
        j: common_vendor.t(status.value)
      } : {}, {
        k: status.value == "迟到"
      }, status.value == "迟到" ? {
        l: common_vendor.t(status.value)
      } : {}, {
        m: common_assets._imports_1$1,
        n: common_vendor.t(address.value),
        o: risk.value == "低风险"
      }, risk.value == "低风险" ? {
        p: common_vendor.t(risk.value)
      } : {}, {
        q: risk.value == "中风险"
      }, risk.value == "中风险" ? {
        r: common_vendor.t(risk.value)
      } : {}, {
        s: risk.value == "高风险"
      }, risk.value == "高风险" ? {
        t: common_vendor.t(risk.value)
      } : {}, {
        v: common_assets._imports_2$1,
        w: common_vendor.t(closingTime.value),
        x: common_assets._imports_0$3,
        y: common_vendor.t(checkinDays.value),
        z: common_vendor.f(weekCheckin.value, (one, k0, i0) => {
          return common_vendor.e({
            a: one.type == "工作日"
          }, one.type == "工作日" ? {
            b: common_assets._imports_4$1
          } : {}, {
            c: one.type == "节假日"
          }, one.type == "节假日" ? {
            d: common_assets._imports_5$1
          } : {}, {
            e: common_vendor.t(one.day),
            f: one.status == "正常"
          }, one.status == "正常" ? {
            g: common_vendor.t(one.status)
          } : {}, {
            h: one.status == "迟到"
          }, one.status == "迟到" ? {
            i: common_vendor.t(one.status)
          } : {}, {
            j: one.status == "缺勤"
          }, one.status == "缺勤" ? {
            k: common_vendor.t(one.status)
          } : {}, {
            l: one
          });
        })
      });
    };
  }
};
wx.createPage(_sfc_main);
