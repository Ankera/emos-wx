"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_request = require("../../utils/request.js");
if (!Math) {
  uniCalendar();
}
const uniCalendar = () => "../../components/uni-calendar/uni-calendar.js";
const _sfc_main = {
  __name: "my_checkin",
  setup(__props) {
    const list = common_vendor.ref([]);
    const sum_1 = common_vendor.ref(0);
    const sum_2 = common_vendor.ref(0);
    const sum_3 = common_vendor.ref(0);
    const year = common_vendor.ref(2024);
    const month = common_vendor.ref(12);
    const handleRequest = () => {
      utils_request.request(utils_request.API_URL.searchMonthCheckin, "POST", {
        year: year.value,
        month: month.value
      }, (resp) => {
        if (resp.statusCode === 200) {
          const data = resp.data;
          sum_1.value = data.sum_1;
          sum_2.value = data.sum_2;
          sum_3.value = data.sum_3;
          let newList = [];
          for (let one of data.list) {
            if (one.status != null && one.status != "") {
              let color = "";
              if (one.status == "正常") {
                color = "green";
              } else if (one.status == "迟到") {
                color = "orange";
              } else if (one.status == "缺勤") {
                color = "red";
              }
              newList.push({
                date: one.date,
                info: one.status,
                color
              });
            }
          }
          console.log("==newList==", newList);
          list.value = newList;
        }
      });
    };
    common_vendor.onMounted(() => {
      handleRequest();
    });
    const changeMonth = (y, m) => {
      console.log("yy", y, m);
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$3,
        b: common_vendor.t(sum_1.value),
        c: common_vendor.t(sum_1.value),
        d: common_vendor.t(sum_2.value),
        e: common_vendor.t(sum_3.value),
        f: common_vendor.o(changeMonth),
        g: common_vendor.o(changeMonth),
        h: common_vendor.p({
          insert: true,
          lunar: false,
          selected: list.value
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
