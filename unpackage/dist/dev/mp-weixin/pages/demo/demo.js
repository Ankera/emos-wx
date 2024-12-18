"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "demo",
  setup(__props) {
    const username = common_vendor.ref("Tom");
    const list = common_vendor.ref(["121", "232", "323"]);
    const modelValue = common_vendor.ref();
    const handleList = () => {
      list.value.push(getRandomString());
    };
    function getRandomString(length = 10) {
      let result = "";
      const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(username.value),
        b: common_vendor.f(list.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index
          };
        }),
        c: common_vendor.o(handleList),
        d: modelValue.value,
        e: common_vendor.o(($event) => modelValue.value = $event.detail.value),
        f: common_vendor.t(modelValue.value)
      };
    };
  }
};
wx.createPage(_sfc_main);
